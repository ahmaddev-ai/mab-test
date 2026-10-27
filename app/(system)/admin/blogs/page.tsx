"use client";

import { useEffect, useRef, useState } from "react";
import { db, updateDailyAnalytics } from "@/firebase/config";
import { useAuth } from "@/context/Auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, Eye, Loader2, Trash2, X } from "lucide-react";
import Link from "next/link";
import EditorJS from "@editorjs/editorjs";
import Editor from "@/components/system/Editor";
import {
  deserializeEditorContentFromFirestore,
  serializeEditorContentForFirestore,
} from "@/lib/editorContent";

interface Blog {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  status: string;
  analyticsCounted?: boolean;
  analyticsPublishedCounted?: boolean;
  createdAt?: any;
  content?: any;
}

export default function BlogsPage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [editMode, setEditMode] = useState(false);
  const editorRef = useRef<EditorJS | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setEditMode(false);
      setSelectedBlog(null);

      const blogsQuery =
        role === "admin"
          ? query(collection(db, "blogs"), orderBy("createdAt", "desc"))
          : query(
              collection(db, "blogs"),
              where("authorId", "==", user?.uid),
              orderBy("createdAt", "desc")
            );

      const snapshot = await getDocs(blogsQuery);
      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })) as Blog[];

      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogDetail = async (id: string) => {
    try {
      setLoading(true);
      setEditMode(false);
      setSelectedBlog(null);

      const snapshot = await getDoc(doc(db, "blogs", id));

      if (snapshot.exists()) {
        const data = snapshot.data() as any;
        setSelectedBlog({
          id: snapshot.id,
          ...data,
          content: deserializeEditorContentFromFirestore(
            data.content || { blocks: [] }
          ),
        } as Blog);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async () => {
    const editor = editorRef.current;
    if (!editor || !selectedBlog) return;

    try {
      setSaving(true);
      await editor.isReady;
      const content = await editor.save();
      const nextTitle = selectedBlog.title;

      await updateDoc(doc(db, "blogs", selectedBlog.id), {
        title: nextTitle,
        content: serializeEditorContentForFirestore(content),
        updatedAt: serverTimestamp(),
      });

      setSelectedBlog((cur) =>
        cur
          ? {
              ...cur,
              title: nextTitle,
              content: serializeEditorContentForFirestore(content),
            }
          : cur
      );
      setEditMode(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      setDeleteError("");
      const isPublished = deleteTarget.status === "published";
      const wasCounted =
        deleteTarget.analyticsCounted === true ||
        (deleteTarget.analyticsCounted !== false && isPublished);
      const wasPublishedCounted =
        deleteTarget.analyticsPublishedCounted === true ||
        (deleteTarget.analyticsPublishedCounted !== false && isPublished);

      // Delete blog document
      await deleteDoc(doc(db, "blogs", deleteTarget.id));

      // Decrement author's stats
      const authorId = deleteTarget.authorId || user?.uid;
      if (authorId) {
        await updateDoc(doc(db, "users", authorId), {
          ...(wasCounted ? { totalBlogs: increment(-1) } : {}),
          ...(wasPublishedCounted ? { publishedBlogs: increment(-1) } : {}),
        });
      }

      // Decrement global analytics
      await setDoc(
        doc(db, "analytics", "global"),
        {
          ...(wasCounted ? { totalBlogs: increment(-1) } : {}),
          ...(wasPublishedCounted ? { totalPublishedBlogs: increment(-1) } : {}),
        },
        { merge: true }
      );
      await updateDailyAnalytics({
        ...(wasCounted ? { blogsDeleted: increment(1) } : {}),
        ...(wasPublishedCounted ? { publishedBlogsDeleted: increment(1) } : {}),
      });

      // If deleted from detail view, navigate back to list
      if (selectedBlog?.id === deleteTarget.id) {
        router.push("/admin/blogs");
        return;
      }

      setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      console.error(err);
      setDeleteError(err.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    if (blogId) {
      void fetchBlogDetail(blogId);
      return;
    }
    if (!role) return;
    void fetchBlogs();
  }, [authLoading, blogId, role, user]);

  const formatDate = (ts: any) =>
    ts?.seconds ? new Date(ts.seconds * 1000).toLocaleDateString() : "-";

  /* ── LOADING ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-black/50 dark:text-white/50">
        <Loader2 className="animate-spin mr-3" />
        {blogId ? "Loading blog..." : "Loading blogs..."}
      </div>
    );
  }

  /* ── BLOG NOT FOUND ── */
  if (blogId && !selectedBlog) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-black/50 dark:text-white/50">
        <p>Blog not found.</p>
        <button
          onClick={() => router.push("/admin/blogs")}
          className="px-4 py-2 rounded-lg bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  /* ── DETAIL VIEW ── */
  if (blogId && selectedBlog) {
    return (
      <>
        <section className="max-w-4xl mx-auto p-6 mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setEditMode(false);
                setSelectedBlog(null);
                router.push("/admin/blogs");
              }}
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition"
            >
              {"<- Back"}
            </button>
          </div>

          <div className="flex gap-3">
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-lg hover:bg-black/20 dark:hover:bg-white/20 transition"
              >
                Edit
              </button>
            )}

            {editMode && (
              <button
                onClick={updateBlog}
                disabled={saving}
                className="px-4 py-2 bg-emerald-500 text-black rounded-lg disabled:opacity-50"
              >
                <span className="inline-flex items-center gap-2">
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {saving ? "Updating..." : "Update Blog"}
                </span>
              </button>
            )}

            <button
              onClick={() => {
                setDeleteTarget(selectedBlog);
                setDeleteError("");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 hover:bg-red-500/20 transition rounded-lg"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>

          {editMode ? (
            <input
              value={selectedBlog.title || ""}
              onChange={(e) =>
                setSelectedBlog((cur) =>
                  cur ? { ...cur, title: e.target.value } : cur
                )
              }
              placeholder="Untitled blog"
              className="w-full bg-transparent text-3xl font-bold text-black dark:text-white outline-none border-b border-black/10 dark:border-white/10 pb-3"
            />
          ) : (
            <h1 className="text-3xl font-bold text-black dark:text-white">
              {selectedBlog.title}
            </h1>
          )}

          <p className="text-black/40 dark:text-white/40 text-sm">
            {formatDate(selectedBlog.createdAt)}
          </p>

          <Editor
            key={`${selectedBlog.id}-${editMode ? "edit" : "read"}`}
            data={selectedBlog.content}
            readOnly={!editMode}
            onReady={(editor) => {
              editorRef.current = editor;
            }}
          />
        </section>

        {deleteTarget && (
          <DeleteConfirmModal
            blog={deleteTarget}
            deleting={deleting}
            error={deleteError}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </>
    );
  }

  /* ── LIST VIEW ── */
  return (
    <>
      <section className="max-w-7xl mx-auto p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {role === "admin" ? "All Blogs" : "My Blogs"}
          </h1>
        </div>

        <div className="bg-white dark:bg-[#0a0c12] border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-left">
              <thead className="border-b border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 text-sm">
                <tr>
                  <th className="p-5 w-[45%]">Title</th>
                  <th className="w-[15%]">Status</th>
                  <th className="w-[18%]">Created</th>
                  <th className="w-[22%] text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition"
                  >
                    <td className="p-5 text-black dark:text-white font-medium truncate">
                      {blog.title}
                    </td>
                    <td className="text-black/70 dark:text-white/70 capitalize">
                      {blog.status}
                    </td>
                    <td className="text-black/50 dark:text-white/50 text-sm">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`?id=${blog.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 hover:bg-black/20 dark:hover:bg-white/20 transition text-sm"
                        >
                          <Eye size={14} />
                          Detail
                        </Link>
                        <button
                          onClick={() => {
                            setDeleteTarget(blog);
                            setDeleteError("");
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 hover:bg-red-500/20 transition text-sm"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-black/40 dark:text-white/40 mt-8">
            No blogs found
          </p>
        )}
      </section>

      {deleteTarget && (
        <DeleteConfirmModal
          blog={deleteTarget}
          deleting={deleting}
          error={deleteError}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

/* ── DELETE CONFIRMATION MODAL ── */
function DeleteConfirmModal({
  blog,
  deleting,
  error,
  onConfirm,
  onCancel,
}: {
  blog: Blog;
  deleting: boolean;
  error: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={() => !deleting && onCancel()}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-sm bg-white dark:bg-[#0a0c12] border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
        <button
          onClick={onCancel}
          disabled={deleting}
          className="absolute top-5 right-5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle
              size={22}
              className="text-red-500 dark:text-red-400"
            />
          </div>

          <div>
            <h2 className="text-black dark:text-white font-semibold text-lg">
              Delete Blog
            </h2>
            <p className="text-black/50 dark:text-white/50 text-sm mt-1">
              Are you sure you want to delete{" "}
              <span className="text-black dark:text-white font-medium">
                "{blog.title}"
              </span>
              ? This cannot be undone.
            </p>
          </div>

          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm w-full text-left">
              {error}
            </p>
          )}

          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              disabled={deleting}
              className="flex-1 py-3 rounded-xl border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={deleting}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {deleting && <Loader2 size={16} className="animate-spin" />}
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
