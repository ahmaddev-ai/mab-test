"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/Auth";
import { db, auth } from "@/firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  ImagePlus,
  Loader2,
  Save,
  ShieldCheck,
  Upload,
  X,
  FileCheck,
  AlertCircle,
} from "lucide-react";

type BookStatus = "draft" | "published";

const MAX_COVER_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 100 * 1024 * 1024;

const COVER_TYPES = ["image/jpeg", "image/png", "image/webp"];

function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function NewBookPage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("20.00");
  const [pricePkr, setPricePkr] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState("");
  const [rateLoading, setRateLoading] = useState(false);
  const [rateError, setRateError] = useState("");
  const [accessDays, setAccessDays] = useState("90");
  const [status, setStatus] = useState<BookStatus>("draft");
  const [englishPdfFile, setEnglishPdfFile] = useState<File | null>(null);
  const [urduPdfFile, setUrduPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (role === "publisher") {
      router.replace("/publisher/dashboard");
    }
  }, [user, role, authLoading, router]);

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(coverFile);
    setCoverPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [coverFile]);
  useEffect(() => {
    const usd = Number(price);

    if (price.trim() === "" || !Number.isFinite(usd) || usd < 0) {
      setPricePkr("");
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
          throw new Error("Exchange rate API request failed.");
        }

        const data: {
          rate: number;
          date: string;
        } = await response.json();

        if (!Number.isFinite(data.rate) || data.rate <= 0) {
          throw new Error("Invalid exchange rate.");
        }

        if (!cancelled) {
          setExchangeRate(data.rate);
          setRateDate(data.date);
          setPricePkr(String(Math.round(usd * data.rate)));
        }
      } catch {
        if (!cancelled) {
          setRateError(
            "Exchange rate load nahi hua. Internet check karein ya PKR manually enter karein."
          );
          setExchangeRate(null);
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
  }, [price]);

  const handleCoverChange = (file?: File) => {
    setError("");

    if (!file) return;

    if (!COVER_TYPES.includes(file.type)) {
      setError("Cover must be JPG, PNG, or WebP.");
      return;
    }

    if (file.size > MAX_COVER_SIZE) {
      setError("Cover image must be smaller than 5 MB.");
      return;
    }

    setCoverFile(file);
  };

  const handleLanguagePdfChange = (
    file: File | undefined,
    language: "en" | "ur"
  ) => {
    setError("");

    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (file.size > MAX_PDF_SIZE) {
      setError("Each PDF must be smaller than 100 MB.");
      return;
    }

    if (language === "en") {
      setEnglishPdfFile(file);
    } else {
      setUrduPdfFile(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!user || !auth.currentUser) {
      setError("Please sign in again.");
      return;
    }

    if (role !== "admin") {
      setError("Only administrators can add books.");
      return;
    }

    const cleanTitle = title.trim();
    const cleanAuthor = author.trim();
    const cleanDescription = description.trim();
    const slug = createSlug(cleanTitle);
    const priceNumber = Number(price);
    const pricePkrNumber = Number(pricePkr);
    const accessDuration = Number(accessDays);

    // Validate book information.
    if (!cleanTitle || !cleanAuthor || !cleanDescription) {
      setError("Please complete all required book details.");
      return;
    }

    if (!slug) {
      setError("Please enter a valid book title.");
      return;
    }

    if (
      !Number.isFinite(priceNumber) ||
      priceNumber < 0 ||
      !/^\d+(\.\d{1,2})?$/.test(price.trim())
    ) {
      setError("Enter a valid price with up to two decimal places.");
      return;
    }

    if (!Number.isSafeInteger(pricePkrNumber) || pricePkrNumber <= 0) {
      setError("Enter a valid PKR price in whole rupees.");
      return;
    }

    if (!Number.isInteger(accessDuration) || accessDuration <= 0) {
      setError("Access duration must be a positive number of days.");
      return;
    }

    // English PDF is required. Urdu PDF is optional.
    if (!coverFile || !englishPdfFile) {
      setError("Please upload the cover image and English PDF.");
      return;
    }

    if (status === "published" && (!coverFile || !englishPdfFile)) {
      setError("A cover image and English PDF are required to publish a book.");
      return;
    }

    setSaving(true);

    try {
      // Check slug uniqueness.
      const existingQuery = query(
        collection(db, "books"),
        where("slug", "==", slug)
      );

      const existingBooks = await getDocs(existingQuery);

      if (!existingBooks.empty) {
        setError(
          "A book with this title/slug already exists. Please choose another title."
        );
        return;
      }

      // Use the same ID for the Firestore document and Storage paths.
      const bookId = crypto.randomUUID();
      const storage = getStorage();

      const coverPath = `book-covers/${bookId}/${crypto.randomUUID()}`;
      const englishPdfPath = `private-books/${bookId}/en.pdf`;
      const urduPdfPath = urduPdfFile ? `private-books/${bookId}/ur.pdf` : null;

      // 1. Upload the public book cover.
      setUploadProgress("Uploading cover image...");

      const coverRef = ref(storage, coverPath);

      await uploadBytes(coverRef, coverFile, {
        contentType: coverFile.type,
        customMetadata: {
          bookId,
          uploadedBy: user.uid,
          assetType: "cover",
        },
      });

      const coverUrl = await getDownloadURL(coverRef);

      // 2. Upload the English PDF privately.
      setUploadProgress("Uploading English PDF...");

      await uploadBytes(ref(storage, englishPdfPath), englishPdfFile, {
        contentType: "application/pdf",
        customMetadata: {
          bookId,
          uploadedBy: user.uid,
          language: "en",
          assetType: "original-pdf",
        },
      });

      // 3. Upload the Urdu PDF if provided.
      if (urduPdfFile && urduPdfPath) {
        setUploadProgress("Uploading Urdu PDF...");

        await uploadBytes(ref(storage, urduPdfPath), urduPdfFile, {
          contentType: "application/pdf",
          customMetadata: {
            bookId,
            uploadedBy: user.uid,
            language: "ur",
            assetType: "original-pdf",
          },
        });
      }

      // 4. Save the book with a consistent Firestore document ID.
      setUploadProgress("Saving book details...");

      await setDoc(doc(db, "books", bookId), {
        title: cleanTitle,
        slug,
        author: cleanAuthor,
        description: cleanDescription,

        coverStoragePath: coverPath,
        coverUrl,

        // Language-specific private PDF paths.
        englishPdfStoragePath: englishPdfPath,
        urduPdfStoragePath: urduPdfPath,
        availableLanguages: urduPdfPath ? ["en", "ur"] : ["en"],

        // Backward compatibility for the existing reader.
        pdfStoragePath: englishPdfPath,

        priceUsdCents: Math.round(priceNumber * 100),
        pricePkr: pricePkrNumber,
        accessDurationDays: accessDuration,
        status,

        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSuccess("Book created successfully.");

      router.replace("/admin/books");
      router.refresh();
    } catch (err) {
      console.error("Failed to create book:", err);

      setError(
        "Unable to create the book. Check Firebase Storage and Firestore permissions, then try again."
      );
    } finally {
      setSaving(false);
      setUploadProgress("");
    }
  };

  if (authLoading || !user || role !== "admin") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={30}
            className="mx-auto animate-spin text-emerald-500"
          />
          <p className="mt-4 text-sm text-slate-500 dark:text-white/50">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30";

  const labelClass = "text-sm font-medium text-slate-700 dark:text-white/80";

  return (
    <section className="mx-auto max-w-6xl space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/books"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-500 dark:text-white/50"
          >
            <ArrowLeft size={16} />
            Back to Books
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
              <BookOpen size={24} className="text-emerald-500" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Add New Book
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                Add a premium book to your digital library.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]">
          <ShieldCheck size={17} className="text-emerald-500" />
          <span className="text-xs font-medium text-slate-600 dark:text-white/60">
            Administrator
          </span>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <p>{error}</p>

          <button
            type="button"
            aria-label="Dismiss error"
            onClick={() => setError("")}
            className="ml-auto"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={19} />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Book Details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0a0c12] sm:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-white/10">
            <FileText size={21} className="text-emerald-500" />
            <div>
              <h2 className="font-semibold text-slate-950 dark:text-white">
                Book Information
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
                Enter the book's basic details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="book-title" className={labelClass}>
                Book Title *
              </label>

              <input
                id="book-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Mathematics & Statistics for AI"
                className={inputClass}
                maxLength={180}
                required
              />

              <p className="mt-2 text-xs text-slate-400">
                URL slug: {createSlug(title) || "your-book-title"}
              </p>
            </div>

            <div>
              <label htmlFor="book-author" className={labelClass}>
                Author *
              </label>

              <input
                id="book-author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="Enter author name"
                className={inputClass}
                maxLength={120}
                required
              />
            </div>

            <div>
              <label htmlFor="book-status" className={labelClass}>
                Initial Status *
              </label>

              <select
                id="book-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as BookStatus)
                }
                className={inputClass}
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Book</option>
              </select>

              <p className="mt-2 text-xs text-slate-400">
                Draft books should remain hidden from the public catalogue.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="book-description" className={labelClass}>
                Description *
              </label>

              <textarea
                id="book-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the book, its topics and what readers will learn..."
                className={`${inputClass} min-h-[140px] resize-y`}
                maxLength={5000}
                required
              />

              <p className="mt-2 text-right text-xs text-slate-400">
                {description.length}/5000 characters
              </p>
            </div>
          </div>
        </div>

        {/* Files */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0a0c12] sm:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-white/10">
            <Upload size={21} className="text-emerald-500" />
            <div>
              <h2 className="font-semibold text-slate-950 dark:text-white">
                Book Files
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
                Upload the public cover and private PDF.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Cover */}
            <div>
              <label className={labelClass}>Cover Image *</label>

              <label
                htmlFor="cover-upload"
                className="mt-2 flex min-h-[240px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-emerald-500/60 dark:border-white/15 dark:bg-black/10"
              >
                {coverPreview ? (
                  <div className="flex flex-col items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverPreview}
                      alt="Selected book cover preview"
                      className="h-40 max-w-[140px] rounded-lg object-contain shadow-lg"
                    />

                    <span className="max-w-full break-all text-xs text-slate-500 dark:text-white/50">
                      {coverFile?.name}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                      <ImagePlus size={26} className="text-emerald-500" />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-white">
                      Choose cover image
                    </p>

                    <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                      JPG, PNG or WebP · Maximum 5 MB
                    </p>
                  </>
                )}
              </label>

              <input
                id="cover-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => {
                  handleCoverChange(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />

              {coverFile && (
                <button
                  type="button"
                  onClick={() => setCoverFile(null)}
                  className="mt-3 inline-flex items-center gap-2 text-xs text-red-500 hover:text-red-400"
                >
                  <X size={14} />
                  Remove cover
                </button>
              )}
            </div>

            {/* PDF */}

            <div className="grid gap-6 lg:grid-cols-2">
              {/* English PDF */}
              <div>
                <label htmlFor="english-pdf" className={labelClass}>
                  English PDF *
                </label>

                <input
                  id="english-pdf"
                  type="file"
                  accept=".pdf,application/pdf"
                  className={inputClass}
                  onChange={(event) => {
                    handleLanguagePdfChange(event.target.files?.[0], "en");
                    event.target.value = "";
                  }}
                />

                {englishPdfFile && (
                  <div className="mt-3 rounded-xl border border-emerald-500/20 p-3">
                    <p className="break-all text-sm font-medium">
                      {englishPdfFile.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatBytes(englishPdfFile.size)}
                    </p>
                    <button
                      type="button"
                      onClick={() => setEnglishPdfFile(null)}
                      className="mt-2 text-xs text-red-500"
                    >
                      Remove English PDF
                    </button>
                  </div>
                )}
              </div>

              {/* Urdu PDF */}
              <div>
                <label htmlFor="urdu-pdf" className={labelClass}>
                  Urdu PDF (Optional)
                </label>

                <input
                  id="urdu-pdf"
                  type="file"
                  accept=".pdf,application/pdf"
                  className={inputClass}
                  onChange={(event) => {
                    handleLanguagePdfChange(event.target.files?.[0], "ur");
                    event.target.value = "";
                  }}
                />

                {urduPdfFile && (
                  <div className="mt-3 rounded-xl border border-emerald-500/20 p-3">
                    <p className="break-all text-sm font-medium">
                      {urduPdfFile.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatBytes(urduPdfFile.size)}
                    </p>
                    <button
                      type="button"
                      onClick={() => setUrduPdfFile(null)}
                      className="mt-2 text-xs text-red-500"
                    >
                      Remove Urdu PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Access */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0a0c12] sm:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-white/10">
            <DollarSign size={21} className="text-emerald-500" />
            <div>
              <h2 className="font-semibold text-slate-950 dark:text-white">
                Pricing & Reading Access
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
                Configure the book's USD price and access duration.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="book-price" className={labelClass}>
                Book Price (USD) *
              </label>

              <div className="relative mt-2">
                <DollarSign
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="book-price"
                  type="number"
                  min="0"
                  step="0.01"
                  max="999999"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className={`${inputClass} mt-0 pl-10`}
                  required
                />
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                Stored as integer USD cents.
              </p>
            </div>
            <div>
              <label htmlFor="book-price-pkr" className={labelClass}>
                Book Price (PKR) *
              </label>

              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  Rs.
                </span>

                <input
                  id="book-price-pkr"
                  type="number"
                  min="1"
                  step="1"
                  max="99999999"
                  value={pricePkr}
                  onChange={(event) => setPricePkr(event.target.value)}
                  className={`${inputClass} mt-0 pl-12`}
                  placeholder="e.g. 5600"
                  required
                />
              </div>

              <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-white/40">
                {rateLoading && <p>Latest exchange rate loading...</p>}

                {exchangeRate !== null && (
                  <p>
                    Rate: 1 USD = {exchangeRate.toFixed(2)} PKR
                    {rateDate ? ` · Updated: ${rateDate}` : ""}
                  </p>
                )}

                {rateError && (
                  <p className="text-amber-600 dark:text-amber-400">
                    {rateError}
                  </p>
                )}

                <p>The PKR amount will be calculated automatically</p>
              </div>
            </div>

            <div>
              <label htmlFor="access-days" className={labelClass}>
                Reading Access Duration *
              </label>

              <div className="relative mt-2">
                <Clock3
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="access-days"
                  value={accessDays}
                  onChange={(event) => setAccessDays(event.target.value)}
                  className={`${inputClass} mt-0 pl-10`}
                >
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">365 days</option>
                </select>
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                Default: 90 days from entitlement activation.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  Payment and access policy
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-white/50">
                  The USD price is for reference. The PKR price is configured
                  separately by the administrator and will be used as the
                  expected payment amount. Payment verification is required
                  before reading access is granted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-3 z-20 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0c12]/95 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-white/40">
            {status === "draft"
              ? "The book will be saved as a draft."
              : "The book will be published after the save succeeds."}
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Link
              href="/admin/books"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving || authLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#052e16] shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}

              {saving
                ? uploadProgress || "Saving..."
                : status === "published"
                ? "Publish Book"
                : "Save as Draft"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
