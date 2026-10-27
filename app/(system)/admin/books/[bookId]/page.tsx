"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
  limit,
  updateDoc,
  serverTimestamp,
  DocumentData,
  UpdateData,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "@/firebase/config";
import { storage } from "@/firebase/config";
import { useAuth } from "@/context/Auth";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";

type BookStatus = "draft" | "published" | "archived";

type BookFormData = {
  title: string;
  slug: string;
  author: string;
  description: string;
  price: string;
  pricePkr: string;
  accessDurationDays: string;
  status: BookStatus;
};

type BookRecord = {
  title?: string;
  slug?: string;
  author?: string;
  description?: string;
  priceUsdCents?: number;
  pricePkr?: number;
  accessDurationDays?: number;
  status?: BookStatus;
  coverUrl?: string;
  coverStoragePath?: string;

  // Legacy field for older books
  pdfStoragePath?: string;

  // New language-specific fields
  englishPdfStoragePath?: string;
  urduPdfStoragePath?: string | null;
  availableLanguages?: string[];
};

const initialForm: BookFormData = {
  title: "",
  slug: "",
  author: "",
  description: "",
  price: "20.00",
  pricePkr: "",
  accessDurationDays: "90",
  status: "draft",
};

const MAX_COVER_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 100 * 1024 * 1024;

const makeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function EditBookPage() {
  const params = useParams<{ bookId: string }>();
  const bookId = params.bookId;

  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [form, setForm] = useState<BookFormData>(initialForm);
  const [initialBook, setInitialBook] = useState<BookRecord | null>(null);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [englishPdfFile, setEnglishPdfFile] = useState<File | null>(null);
  const [urduPdfFile, setUrduPdfFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState("");
  const [rateLoading, setRateLoading] = useState(false);
  const [rateError, setRateError] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadBook = useCallback(async () => {
    if (!bookId) return;

    setPageLoading(true);
    setError("");

    try {
      const bookRef = doc(db, "books", bookId);
      const snapshot = await getDoc(bookRef);

      if (!snapshot.exists()) {
        setError("Book not found. It may have been deleted.");
        return;
      }

      const data = snapshot.data() as BookRecord;

      setInitialBook(data);
      setForm({
        title: data.title ?? "",
        slug: data.slug ?? "",
        author: data.author ?? "",
        description: data.description ?? "",
        price: ((data.priceUsdCents ?? 2000) / 100).toFixed(2),
        pricePkr:
          typeof data.pricePkr === "number" ? String(data.pricePkr) : "",
        accessDurationDays: String(data.accessDurationDays ?? 90),
        status: data.status ?? "draft",
      });

      setCoverPreview(data.coverUrl ?? "");
    } catch (err) {
      console.error("Failed to load book:", err);
      setError(
        "Unable to load this book. Check your permissions and connection."
      );
    } finally {
      setPageLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    if (!authLoading && user && role === "admin") {
      void loadBook();
    }
  }, [authLoading, user, role, loadBook]);

  useEffect(() => {
    if (!coverFile) return;

    const objectUrl = URL.createObjectURL(coverFile);
    setCoverPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [coverFile]);

  useEffect(() => {
    // Wait until the existing book data has loaded.
    if (pageLoading || !initialBook) return;

    const usd = Number(form.price);

    if (form.price.trim() === "" || !Number.isFinite(usd) || usd < 0) {
      setExchangeRate(null);
      setRateDate("");
      setRateError("");
      return;
    }

    let cancelled = false;

    const fetchRate = async () => {
      setRateLoading(true);
      setRateError("");

      try {
        const response = await fetch(
          "https://api.frankfurter.dev/v2/rate/usd/pkr",
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Exchange rate request failed.");
        }

        const data: { rate: number; date: string } = await response.json();

        if (!Number.isFinite(data.rate) || data.rate <= 0) {
          throw new Error("Invalid exchange rate.");
        }

        if (!cancelled) {
          setExchangeRate(data.rate);
          setRateDate(data.date);

          // Only auto-fill when the USD price changes.
          setForm((current) => {
            if (current.price !== form.price) return current;

            return {
              ...current,
              pricePkr: String(Math.round(usd * data.rate)),
            };
          });
        }
      } catch {
        if (!cancelled) {
          setRateError(
            "Could not load the exchange rate. You can enter the PKR price manually."
          );
        }
      } finally {
        if (!cancelled) setRateLoading(false);
      }
    };

    const timeout = setTimeout(fetchRate, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [form.price, pageLoading, initialBook]);

  const updateField = <K extends keyof BookFormData>(
    key: K,
    value: BookFormData[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setSuccess("");
  };

  const handleTitleChange = (value: string) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugManuallyEdited ? current.slug : makeSlug(value),
    }));

    setError("");
    setSuccess("");
  };

  const handleCoverChange = (file?: File) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Cover must be a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_COVER_SIZE) {
      setError("Cover image must be 5 MB or smaller.");
      return;
    }

    setCoverFile(file);
    setError("");
    setSuccess("");
  };

  const handleLanguagePdfChange = (
    file: File | undefined,
    language: "en" | "ur"
  ) => {
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (file.size > MAX_PDF_SIZE) {
      setError("Each PDF must be 100 MB or smaller.");
      return;
    }

    if (language === "en") {
      setEnglishPdfFile(file);
    } else {
      setUrduPdfFile(file);
    }

    setError("");
    setSuccess("");
  };
  const removeSelectedCover = () => {
    setCoverFile(null);
    setCoverPreview(initialBook?.coverUrl ?? "");
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Book title is required.";
    if (!form.author.trim()) return "Author name is required.";
    if (!form.slug.trim()) return "Book slug is required.";

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
      return "Slug must contain lowercase letters, numbers, and single hyphens only.";
    }

    const price = Number(form.price);
    const pricePkr = Number(form.pricePkr);

    if (
      !Number.isSafeInteger(pricePkr) ||
      pricePkr <= 0 ||
      pricePkr > 99999999
    ) {
      return "Enter a valid PKR price in whole rupees.";
    }

    if (!Number.isFinite(price) || price < 0 || price > 1000000) {
      return "Enter a valid non-negative price in USD.";
    }

    if (!Number.isInteger(price * 100)) {
      return "Price can have a maximum of two decimal places.";
    }

    if (!["90", "180", "365"].includes(form.accessDurationDays)) {
      return "Select a valid access duration.";
    }

    if (!["draft", "published", "archived"].includes(form.status)) {
      return "Select a valid publishing status.";
    }

    return "";
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || role !== "admin") {
      setError("You are not authorized to edit books.");
      return;
    }

    if (!initialBook) {
      setError("Book data has not loaded yet.");
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    let newCoverPath: string | null = null;
    let newEnglishPdfPath: string | null = null;
    let newUrduPdfPath: string | null = null;

    // Support older books that only have pdfStoragePath.
    const currentEnglishPath =
      initialBook.englishPdfStoragePath || initialBook.pdfStoragePath || null;

    const currentUrduPath = initialBook.urduPdfStoragePath || null;

    try {
      const booksRef = collection(db, "books");

      // Check whether another book already uses this slug.
      const slugQuery = query(
        booksRef,
        where("slug", "==", form.slug.trim()),
        limit(2)
      );

      const slugSnapshot = await getDocs(slugQuery);

      const slugTaken = slugSnapshot.docs.some((item) => item.id !== bookId);

      if (slugTaken) {
        setError("This slug is already being used by another book.");
        return;
      }

      const updates: UpdateData<DocumentData> = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        priceUsdCents: Math.round(Number(form.price) * 100),
        pricePkr: Number(form.pricePkr),
        accessDurationDays: Number(form.accessDurationDays),
        status: form.status,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
      };

      // 1. Replace the cover only if a new image was selected.
      if (coverFile) {
        newCoverPath = `book-covers/${bookId}/${crypto.randomUUID()}-${
          coverFile.name
        }`;

        const coverRef = ref(storage, newCoverPath);

        await uploadBytes(coverRef, coverFile, {
          contentType: coverFile.type,
          customMetadata: {
            bookId,
            uploadedBy: user.uid,
            assetType: "cover",
          },
        });

        updates.coverStoragePath = newCoverPath;
        updates.coverUrl = await getDownloadURL(coverRef);
      }

      // 2. Replace the English PDF only if a new English file was selected.
      if (englishPdfFile) {
        newEnglishPdfPath = `private-books/${bookId}/en-${crypto.randomUUID()}.pdf`;

        await uploadBytes(ref(storage, newEnglishPdfPath), englishPdfFile, {
          contentType: "application/pdf",
          customMetadata: {
            bookId,
            uploadedBy: user.uid,
            language: "en",
            assetType: "original-pdf",
          },
        });

        updates.englishPdfStoragePath = newEnglishPdfPath;

        // Keep compatibility with the existing reader.
        updates.pdfStoragePath = newEnglishPdfPath;
      }

      // 3. Replace the Urdu PDF only if a new Urdu file was selected.
      if (urduPdfFile) {
        newUrduPdfPath = `private-books/${bookId}/ur-${crypto.randomUUID()}.pdf`;

        await uploadBytes(ref(storage, newUrduPdfPath), urduPdfFile, {
          contentType: "application/pdf",
          customMetadata: {
            bookId,
            uploadedBy: user.uid,
            language: "ur",
            assetType: "original-pdf",
          },
        });

        updates.urduPdfStoragePath = newUrduPdfPath;
      }

      // 4. Preserve existing language versions when not replaced.
      const finalEnglishPath = newEnglishPdfPath || currentEnglishPath;
      const finalUrduPath = newUrduPdfPath || currentUrduPath;

      updates.availableLanguages = [
        ...(finalEnglishPath ? ["en"] : []),
        ...(finalUrduPath ? ["ur"] : []),
      ];

      // 5. Save the book changes.
      await updateDoc(doc(db, "books", bookId), updates);

      // 6. Delete replaced files only after Firestore has been updated.
      const cleanupTasks: Promise<unknown>[] = [];

      const oldCoverPath = initialBook.coverStoragePath;

      if (coverFile && oldCoverPath && oldCoverPath !== newCoverPath) {
        cleanupTasks.push(
          deleteObject(ref(storage, oldCoverPath)).catch((err) => {
            console.warn("Old cover cleanup failed:", err);
          })
        );
      }

      if (
        englishPdfFile &&
        currentEnglishPath &&
        currentEnglishPath !== newEnglishPdfPath
      ) {
        cleanupTasks.push(
          deleteObject(ref(storage, currentEnglishPath)).catch((err) => {
            console.warn("Old English PDF cleanup failed:", err);
          })
        );
      }

      if (
        urduPdfFile &&
        currentUrduPath &&
        currentUrduPath !== newUrduPdfPath
      ) {
        cleanupTasks.push(
          deleteObject(ref(storage, currentUrduPath)).catch((err) => {
            console.warn("Old Urdu PDF cleanup failed:", err);
          })
        );
      }

      await Promise.all(cleanupTasks);

      // 7. Update local state without discarding existing language paths.
      setInitialBook((current) => ({
        ...(current ?? {}),
        title: form.title.trim(),
        slug: form.slug.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        priceUsdCents: Math.round(Number(form.price) * 100),
        pricePkr: Number(form.pricePkr),
        accessDurationDays: Number(form.accessDurationDays),
        status: form.status,

        coverStoragePath: newCoverPath ?? initialBook.coverStoragePath,
        coverUrl: coverFile
          ? (updates.coverUrl as string)
          : initialBook.coverUrl,

        englishPdfStoragePath: finalEnglishPath ?? undefined,
        urduPdfStoragePath: finalUrduPath,
        availableLanguages: updates.availableLanguages as string[],

        // Legacy reader fallback.
        pdfStoragePath: finalEnglishPath ?? undefined,
      }));

      setCoverFile(null);
      setEnglishPdfFile(null);
      setUrduPdfFile(null);

      setSuccess("Book updated successfully.");
    } catch (err) {
      console.error("Failed to update book:", err);

      // Clean up newly uploaded files if saving failed.
      // Do not delete any old file here.
      const cleanupNewFiles = [
        newCoverPath,
        newEnglishPdfPath,
        newUrduPdfPath,
      ].filter((path): path is string => Boolean(path));

      await Promise.all(
        cleanupNewFiles.map((path) =>
          deleteObject(ref(storage, path)).catch((cleanupError) => {
            console.warn("New file cleanup failed:", cleanupError);
          })
        )
      );

      setError(
        "Could not update the book. Check Firebase permissions, Storage rules, and your connection."
      );
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-slate-500" />
        <span className="ml-3 text-sm text-slate-500">Loading book...</span>
      </div>
    );
  }

  if (!user || role !== "admin") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
        <h1 className="text-lg font-semibold text-red-700 dark:text-red-300">
          Access denied
        </h1>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          You need an administrator account to edit books.
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/login")}
          className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white"
        >
          Go to admin login
        </button>
      </div>
    );
  }

  if (!initialBook && !pageLoading) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
        <h1 className="mt-4 text-xl font-semibold">Book unavailable</h1>
        <p className="mt-2 text-sm text-slate-500">
          {error || "This book could not be found."}
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/books")}
          className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white"
        >
          Back to books
        </button>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-7 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/books")}
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to books
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Edit book
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Update book details, pricing, files, and publishing status.
          </p>
          <p className="mt-2 break-all font-mono text-xs text-slate-400">
            ID: {bookId}
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
            form.status === "published"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              : form.status === "archived"
              ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
          }`}
        >
          {form.status}
        </span>
      </div>

      {/* Alerts */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
        >
          <X className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-7">
        {/* Main details */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-2.5 dark:bg-indigo-950">
              <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Book information
              </h2>
              <p className="text-sm text-slate-500">
                Core details displayed on your book page.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Book title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                required
                maxLength={200}
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Mathematics & Statistics for AI"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Author <span className="text-red-500">*</span>
              </label>
              <input
                id="author"
                required
                maxLength={150}
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
                placeholder="Author name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                URL slug <span className="text-red-500">*</span>
              </label>
              <input
                id="slug"
                required
                maxLength={200}
                value={form.slug}
                onChange={(e) => {
                  setSlugManuallyEdited(true);
                  updateField("slug", makeSlug(e.target.value));
                }}
                placeholder="mathematics-statistics-ai"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Used in your book URL. Keep it unique.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                maxLength={10000}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe the book, its contents, and who it is for..."
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <p className="mt-1 text-right text-xs text-slate-400">
                {form.description.length}/10000
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Pricing and access
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Set the USD price and how long a purchase grants reading access.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Price (USD) <span className="text-red-500">*</span>
              </label>
              <div className="flex overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                  $
                </span>
                <input
                  id="price"
                  type="number"
                  required
                  min="0"
                  max="1000000"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="min-w-0 flex-1 bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Stored as integer cents in Firestore.
              </p>
            </div>

            <div>
              <label
                htmlFor="pricePkr"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Price (PKR) <span className="text-red-500">*</span>
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                  Rs.
                </span>

                <input
                  id="pricePkr"
                  type="number"
                  required
                  min="1"
                  max="99999999"
                  step="1"
                  value={form.pricePkr}
                  onChange={(e) => updateField("pricePkr", e.target.value)}
                  placeholder="e.g. 5600"
                  className="min-w-0 flex-1 bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="mt-2 space-y-1 text-xs text-slate-500">
                {rateLoading && <p>Loading exchange rate...</p>}

                {exchangeRate !== null && (
                  <p>
                    1 USD = {exchangeRate.toFixed(2)} PKR
                    {rateDate ? ` · Rate date: ${rateDate}` : ""}
                  </p>
                )}

                {rateError && (
                  <p className="text-amber-600 dark:text-amber-400">
                    {rateError}
                  </p>
                )}

                <p>
                  The PKR amount is calculated automatically. You can also
                  adjust it manually.
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Reading access duration
              </label>
              <select
                id="duration"
                value={form.accessDurationDays}
                onChange={(e) =>
                  updateField("accessDurationDays", e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="90">3 months — 90 days</option>
                <option value="180">6 months — 180 days</option>
                <option value="365">1 year — 365 days</option>
              </select>
            </div>
          </div>
        </section>

        {/* Cover */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-2.5 dark:bg-violet-950">
              <ImageIcon className="h-5 w-5 text-violet-600 dark:text-violet-300" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Cover image
              </h2>
              <p className="text-sm text-slate-500">
                Select a new cover to replace the current image.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-56 w-40 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Book cover preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-slate-300" />
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="cover"
                className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-5 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-700 dark:hover:bg-indigo-950/20"
              >
                <Upload className="mb-3 h-7 w-7 text-slate-400" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Click to upload a new cover
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  JPG, PNG, WebP — maximum 5 MB
                </span>
                <input
                  id="cover"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    handleCoverChange(e.target.files?.[0]);
                    e.currentTarget.value = "";
                  }}
                />
              </label>

              {coverFile && (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {coverFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatBytes(coverFile.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeSelectedCover}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                    aria-label="Cancel cover replacement"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {!coverFile && initialBook?.coverUrl && (
                <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400">
                  Current cover will be kept unless you select a replacement.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* PDF */}

        {/* English and Urdu PDFs */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-rose-50 p-2.5 dark:bg-rose-950">
              <FileText className="h-5 w-5 text-rose-600 dark:text-rose-300" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Book language versions
              </h2>
              <p className="text-sm text-slate-500">
                Replace English and Urdu PDFs independently. Existing files
                remain unchanged unless you upload replacements.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* English PDF */}
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2.5 dark:bg-blue-950">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    English PDF
                  </h3>
                  <p className="text-xs text-slate-500">Default language</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {englishPdfFile
                    ? englishPdfFile.name
                    : initialBook?.englishPdfStoragePath ||
                      initialBook?.pdfStoragePath
                    ? "Existing English PDF is saved"
                    : "No English PDF found"}
                </p>

                {englishPdfFile && (
                  <p className="mt-1 text-xs text-slate-500">
                    {formatBytes(englishPdfFile.size)}
                  </p>
                )}

                <p className="mt-1 break-all text-xs text-slate-500">
                  {englishPdfFile
                    ? "New file selected; save to replace the current version."
                    : "The current file will be kept unless replaced."}
                </p>
              </div>

              <label
                htmlFor="english-pdf"
                className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:bg-indigo-950/30"
              >
                <Upload className="h-4 w-4" />
                {englishPdfFile
                  ? "Choose another English PDF"
                  : "Replace English PDF"}

                <input
                  id="english-pdf"
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    handleLanguagePdfChange(event.target.files?.[0], "en");
                    event.currentTarget.value = "";
                  }}
                />
              </label>

              {englishPdfFile && (
                <button
                  type="button"
                  onClick={() => setEnglishPdfFile(null)}
                  className="mt-3 text-sm text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  Cancel English replacement
                </button>
              )}
            </div>

            {/* Urdu PDF */}
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-50 p-2.5 dark:bg-emerald-950">
                  <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Urdu PDF
                  </h3>
                  <p className="text-xs text-slate-500">اردو ورژن</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {urduPdfFile
                    ? urduPdfFile.name
                    : initialBook?.urduPdfStoragePath
                    ? "Existing Urdu PDF is saved"
                    : "No Urdu version uploaded"}
                </p>

                {urduPdfFile && (
                  <p className="mt-1 text-xs text-slate-500">
                    {formatBytes(urduPdfFile.size)}
                  </p>
                )}

                <p className="mt-1 text-xs text-slate-500">
                  {urduPdfFile
                    ? "New file selected; save to replace the current version."
                    : "Optional. Upload an Urdu version whenever it is available."}
                </p>
              </div>

              <label
                htmlFor="urdu-pdf"
                className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:bg-indigo-950/30"
              >
                <Upload className="h-4 w-4" />
                {urduPdfFile
                  ? "Choose another Urdu PDF"
                  : "Upload / Replace Urdu PDF"}

                <input
                  id="urdu-pdf"
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    handleLanguagePdfChange(event.target.files?.[0], "ur");
                    event.currentTarget.value = "";
                  }}
                />
              </label>

              {urduPdfFile && (
                <button
                  type="button"
                  onClick={() => setUrduPdfFile(null)}
                  className="mt-3 text-sm text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  Cancel Urdu replacement
                </button>
              )}
            </div>
          </div>

          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
            PDF files remain private. Select a replacement and click Save
            changes below to apply it. Uploading Urdu does not replace or delete
            the English version.
          </p>
        </section>

        {/* Publishing */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Publishing status
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose whether this book is available to readers.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {(
              [
                {
                  value: "draft",
                  title: "Draft",
                  description: "Keep the book unpublished.",
                },
                {
                  value: "published",
                  title: "Published",
                  description: "Make the book available to readers.",
                },
                {
                  value: "archived",
                  title: "Archived",
                  description: "Retire the book from sale.",
                },
              ] as const
            ).map((option) => {
              const selected = form.status === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField("status", option.value)}
                  className={`rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10 dark:bg-indigo-950/30"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {option.title}
                    </span>
                    {selected && (
                      <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          {form.status === "published" && (
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
              Publishing this book may make it visible to readers. Make sure its
              cover, PDF, price, and reading experience are ready.
            </p>
          )}
        </section>

        {/* Actions */}
        <div className="sticky bottom-4 z-10 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900/95">
          <button
            type="button"
            disabled={saving}
            onClick={() => router.push("/admin/books")}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || pageLoading || !initialBook}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving changes...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
