"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/Auth";
import { db, updateDailyAnalytics } from "@/firebase/config";
import {
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { OutputData } from "@editorjs/editorjs";
import type EditorJS from "@editorjs/editorjs";
import { Wand2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import BlogRenderer from "@/components/editor/BlogRenderer";
import FeaturedImageUpload from "@/components/editor/FeaturedImageUpload";
import PublishToolbar from "@/components/editor/PublishToolbar";
import WriteEditor from "@/components/editor/WriteEditor";
import {
  deserializeEditorContentFromFirestore,
  serializeEditorContentForFirestore,
} from "@/lib/editorContent";
import { useAutosave } from "@/hooks/useAutosave";
import { editorStats } from "@/lib/editorUtils";
import { generateSeoMeta, slugify } from "@/lib/utils";

type Status = "draft" | "published";

interface Props {
  blogId?: string;
}

export default function CreateBlogPage({ blogId }: Props) {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<OutputData>({ blocks: [] });
  const [featuredImage, setFeaturedImage] = useState<{
    url: string;
    path: string;
  } | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [docId, setDocId] = useState<string | undefined>(blogId);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const editorRef = useRef<EditorJS | null>(null);
  const docIdRef = useRef<string | undefined>(blogId);
  const loadedExisting = useRef(false);

  const stats = editorStats(content);

  useEffect(() => {
    if (!blogId || loadedExisting.current) return;
    loadedExisting.current = true;
    (async () => {
      const snap = await getDoc(doc(db, "blogs", blogId));
      if (!snap.exists()) return;
      const data = snap.data() as any;
      setTitle(data.title || "");
      setContent(
        deserializeEditorContentFromFirestore(data.content || { blocks: [] })
      );
      setFeaturedImage(data.featuredImage || null);
      setMetaTitle(data.seo?.metaTitle || "");
      setMetaDescription(data.seo?.metaDescription || "");
      setKeywords((data.seo?.keywords || []).join(", "));
      await editorRef.current?.render(
        deserializeEditorContentFromFirestore(data.content || { blocks: [] })
      );
    })();
  }, [blogId]);

  const { status, recoverDraft, clearDraft } = useAutosave({
    key: `draft:${blogId ?? "new"}`,
    data: {
      title,
      content,
      featuredImage,
      metaTitle,
      metaDescription,
      keywords,
    },
    enabled: !!title || !!content.blocks.length,
    onSave: async (draft) => {
      if (!draft.title && !draft.content.blocks.length) return;
      const ref = docId
        ? doc(db, "blogs", docId)
        : doc(collection(db, "blogs"));
      if (!docIdRef.current) {
        docIdRef.current = ref.id;
        setDocId(ref.id);
      }
      await setDoc(
        ref,
        {
          title: draft.title,
          content: serializeEditorContentForFirestore(draft.content),
          featuredImage: draft.featuredImage,
          seo: {
            metaTitle: draft.metaTitle,
            metaDescription: draft.metaDescription,
            keywords: draft.keywords
              ? draft.keywords
                  .split(",")
                  .map((keyword: string) => keyword.trim())
                  .filter(Boolean)
              : [],
          },
          status: "draft",
          authorId: user?.uid,
          updatedAt: serverTimestamp(),
          ...(docId
            ? {}
            : {
                createdAt: serverTimestamp(),
                analyticsCounted: false,
                analyticsPublishedCounted: false,
              }),
        },
        { merge: true }
      );
    },
  });

  useEffect(() => {
    if (blogId) return;
    const recovered = recoverDraft();
    if (recovered && (recovered.title || recovered.content?.blocks?.length)) {
      setTitle(recovered.title);
      setContent(deserializeEditorContentFromFirestore(recovered.content));
      setFeaturedImage(recovered.featuredImage);
      setMetaTitle(recovered.metaTitle || "");
      setMetaDescription(recovered.metaDescription || "");
      setKeywords(recovered.keywords || "");
      editorRef.current?.render(
        deserializeEditorContentFromFirestore(recovered.content)
      );
      toast("Recovered your unsaved draft", { icon: "Edit" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDirty(!!title || !!content.blocks.length);
  }, [title, content]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!dirty || status === "saved") return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty, status]);

  const handleGenerateSeo = async () => {
    if (!title.trim()) return toast.error("Add a title first");
    const editor = editorRef.current;
    await editor?.isReady;
    const currentContent = editor ? await editor.save() : content;
    const seo = generateSeoMeta(title, currentContent);
    setMetaTitle(seo.metaTitle);
    setMetaDescription(seo.metaDescription);
    setKeywords(seo.keywords.join(", "));
  };

  const publishBlog = async (publishNow: boolean) => {
    if (publishing) return;
    if (!title.trim()) return toast.error("Add a title first");

    const editor = editorRef.current;
    await editor?.isReady;
    const finalContent = editor ? await editor.save() : content;
    if (!finalContent.blocks.length)
      return toast.error("Write something first");

    try {
      setPublishing(true);
      const slug = slugify(title);
      const seo = generateSeoMeta(title, finalContent);
      const finalMetaTitle = metaTitle.trim() || seo.metaTitle;
      const finalMetaDescription =
        metaDescription.trim() || seo.metaDescription;
      const finalKeywords = keywords.trim()
        ? keywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean)
        : seo.keywords;
      const isScheduled = !publishNow && !!scheduledAt;
      const status: Status = "published";

      const existingId = docIdRef.current;
      const ref = existingId
        ? doc(db, "blogs", existingId)
        : doc(collection(db, "blogs"));
      if (!existingId) {
        docIdRef.current = ref.id;
        setDocId(ref.id);
      }
      const previousSnap = await getDoc(ref);
      const previousData = previousSnap.exists() ? previousSnap.data() : null;
      const wasCounted =
        previousData?.analyticsCounted === true ||
        (previousData?.analyticsCounted !== false &&
          previousData?.status === "published");
      const wasPublishedCounted =
        previousData?.analyticsPublishedCounted === true;
      const shouldCountPublished = !isScheduled;
      const totalBlogsDelta = wasCounted ? 0 : 1;
      const publishedBlogsDelta =
        shouldCountPublished && !wasPublishedCounted
          ? 1
          : !shouldCountPublished && wasPublishedCounted
            ? -1
            : 0;

      const payload: Record<string, any> = {
        title,
        content: serializeEditorContentForFirestore(finalContent),
        slug,
        featuredImage,
        authorId: user?.uid,
        status: isScheduled ? "draft" : status,
        scheduledAt: isScheduled ? new Date(scheduledAt) : null,
        seo: {
          metaTitle: finalMetaTitle,
          metaDescription: finalMetaDescription,
          keywords: finalKeywords,
        },
        analyticsCounted: true,
        analyticsPublishedCounted: shouldCountPublished,
        updatedAt: serverTimestamp(),
        ...(existingId ? {} : { createdAt: serverTimestamp() }),
      };

      await setDoc(ref, payload, { merge: true });
      setMetaTitle(finalMetaTitle);
      setMetaDescription(finalMetaDescription);
      setKeywords(finalKeywords.join(", "));

      if (totalBlogsDelta || publishedBlogsDelta) {
        if (user?.uid) {
          await updateDoc(doc(db, "users", user.uid), {
            ...(totalBlogsDelta
              ? { totalBlogs: increment(totalBlogsDelta) }
              : {}),
            ...(publishedBlogsDelta
              ? { publishedBlogs: increment(publishedBlogsDelta) }
              : {}),
            lastBlogCreatedAt: serverTimestamp(),
          });
        }
        await setDoc(
          doc(db, "analytics", "global"),
          {
            ...(totalBlogsDelta
              ? { totalBlogs: increment(totalBlogsDelta) }
              : {}),
            ...(publishedBlogsDelta
              ? { totalPublishedBlogs: increment(publishedBlogsDelta) }
              : {}),
            lastBlogCreatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        await updateDailyAnalytics({
          ...(totalBlogsDelta
            ? { blogsCreated: increment(totalBlogsDelta) }
            : {}),
          ...(publishedBlogsDelta
            ? { blogsPublished: increment(publishedBlogsDelta) }
            : {}),
        });
      }

      clearDraft();
      toast.success(isScheduled ? "Scheduled" : "Blog published");
    } catch (err) {
      console.error("Publish error:", err);
      toast.error("Something went wrong publishing. Try again.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 md:py-10 lg:px-8">
      <Toaster position="top-center" />

      <PublishToolbar
        status={status}
        words={stats.words}
        characters={stats.characters}
        readingTime={stats.readingTime}
        publishing={publishing}
        onPreview={() => setShowPreview(true)}
        onPublish={() => publishBlog(true)}
        publishLabel={docId ? "Update" : "Publish"}
      />

      <div className="mt-6 space-y-6 md:space-y-8">
        <FeaturedImageUpload
          value={featuredImage}
          onChange={setFeaturedImage}
        />

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled story..."
          className="w-full bg-transparent text-2xl font-bold text-slate-950 outline-none placeholder:text-slate-400 sm:text-3xl md:text-4xl dark:text-white dark:placeholder:text-white/20"
        />

        <div className="h-px bg-slate-200 dark:bg-white/10" />

        <WriteEditor
          onReady={(editor) => (editorRef.current = editor)}
          onChange={(data) => setContent(data)}
          initialData={content}
        />

        {/* <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/5">
          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-white/80">
              Schedule publish
            </p>
            <p className="text-xs text-slate-500 dark:text-white/40">
              Leave empty to publish immediately when you hit Publish.
            </p>
          </div>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div> */}

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-medium tracking-wide text-slate-800 dark:text-white/80">
              SEO Settings
            </h2>
            <button
              type="button"
              onClick={handleGenerateSeo}
              disabled={!title.trim()}
              className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 transition hover:text-emerald-500 disabled:text-slate-300 dark:text-emerald-400 dark:hover:text-emerald-300 dark:disabled:text-white/20"
            >
              <Wand2 size={13} />
              Auto-generate
            </button>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs text-slate-500 dark:text-white/50">
                Meta Title
              </label>
              <span
                className={`text-xs ${
                  metaTitle.length > 60
                    ? "text-amber-500 dark:text-amber-400"
                    : "text-slate-400 dark:text-white/25"
                }`}
              >
                {metaTitle.length}/60
              </span>
            </div>
            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO title - 50-60 characters recommended"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/20"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs text-slate-500 dark:text-white/50">
                Meta Description
              </label>
              <span
                className={`text-xs ${
                  metaDescription.length > 160
                    ? "text-amber-500 dark:text-amber-400"
                    : "text-slate-400 dark:text-white/25"
                }`}
              >
                {metaDescription.length}/160
              </span>
            </div>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Summarize your blog for search engines - 150-160 characters"
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-slate-500 dark:text-white/50">
              Keywords{" "}
              <span className="text-slate-400 dark:text-white/25">
                (comma-separated)
              </span>
            </label>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. web development, javascript, react"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/20"
            />
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white/95 dark:bg-black/90">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            <button
              onClick={() => setShowPreview(false)}
              className="mb-6 text-sm text-slate-500 hover:text-slate-950 dark:text-white/50 dark:hover:text-white"
            >
              Close preview
            </button>
            {featuredImage?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featuredImage.url}
                alt=""
                className="mb-6 w-full rounded-xl"
              />
            )}
            <h1 className="mb-2 text-4xl font-bold text-slate-950 dark:text-white">
              {title || "Untitled story..."}
            </h1>
            <p className="mb-8 text-sm text-slate-500 dark:text-white/40">
              {stats.readingTime} min read - {stats.words} words
            </p>
            <BlogRenderer data={content} />
          </div>
        </div>
      )}
    </section>
  );
}
