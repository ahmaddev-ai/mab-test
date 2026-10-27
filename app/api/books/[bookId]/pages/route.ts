import { NextRequest, NextResponse } from "next/server";
import { getStorage } from "firebase-admin/storage";
import { createCanvas } from "@napi-rs/canvas";
import { adminAuth, adminDb } from "@/firebase/Admin";
import { Timestamp } from "firebase-admin/firestore";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const pdfWorkerPath = path.join(process.cwd(), "public", "pdf.worker.mjs");

pdfjsLib.GlobalWorkerOptions.workerSrc = pathToFileURL(pdfWorkerPath).href;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookLanguage = "en" | "ur";

type CachedPdf = {
  bytes: Uint8Array;
  expiresAt: number;
};

const pdfCache = new Map<string, CachedPdf>();

const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES = 5;
const MAX_RENDER_SCALE = 1.5;

function toDate(value: unknown): Date | null {
  if (value instanceof Timestamp) return value.toDate();

  if (value instanceof Date) return value;

  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    const result = value.toDate();
    return result instanceof Date ? result : null;
  }

  return null;
}

function getRequestedLanguage(request: NextRequest): BookLanguage | null {
  const language = request.nextUrl.searchParams.get("lang") ?? "en";

  if (language === "en" || language === "ur") {
    return language;
  }

  return null;
}

function getLanguagePdfPath(
  book: Record<string, unknown>,
  language: BookLanguage
): string | null {
  const languageSpecificPath =
    language === "en" ? book.englishPdfStoragePath : book.urduPdfStoragePath;

  if (
    typeof languageSpecificPath === "string" &&
    languageSpecificPath.startsWith("private-books/")
  ) {
    return languageSpecificPath;
  }

  // Backward compatibility for older books.
  // Only English may fall back to the original PDF.
  if (language === "en") {
    const originalPath = book.pdfStoragePath;

    if (
      typeof originalPath === "string" &&
      originalPath.startsWith("private-books/")
    ) {
      return originalPath;
    }
  }

  return null;
}

async function getPdfBytes(
  bookId: string,
  language: BookLanguage,
  path: string
): Promise<Uint8Array> {
  const now = Date.now();

  // Include language AND path so EN and UR never share the wrong PDF cache.
  const cacheKey = `${bookId}:${language}:${path}`;
  const cached = pdfCache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    // Refresh insertion order for simple LRU-style eviction.
    pdfCache.delete(cacheKey);
    pdfCache.set(cacheKey, cached);

    return cached.bytes;
  }

  if (cached) {
    pdfCache.delete(cacheKey);
  }

  // Never accept a Storage path from the browser.
  if (!path.startsWith("private-books/")) {
    throw new Error("Invalid private PDF path.");
  }

  const [buffer] = await getStorage().bucket().file(path).download();
  const bytes = new Uint8Array(buffer);

  // Evict the least recently used entry if adding a new one.
  while (pdfCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = pdfCache.keys().next().value;

    if (oldestKey === undefined) break;

    pdfCache.delete(oldestKey);
  }

  pdfCache.set(cacheKey, {
    bytes,
    expiresAt: now + CACHE_TTL_MS,
  });

  return bytes;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ bookId: string }> }
) {
  try {
    // 1. Authenticate the user.
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const idToken = authorization.slice("Bearer ".length).trim();

    if (!idToken) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const decoded = await adminAuth.verifyIdToken(idToken);

    // 2. Validate the book ID.
    const { bookId } = await context.params;

    if (!bookId || bookId.length > 200 || bookId.includes("/")) {
      return NextResponse.json({ error: "Invalid book ID." }, { status: 400 });
    }

    // 3. Validate the requested language.
    const language = getRequestedLanguage(request);

    if (!language) {
      return NextResponse.json(
        { error: "Invalid language. Use 'en' or 'ur'." },
        { status: 400 }
      );
    }

    // 4. Verify entitlement and load the book.
    const [librarySnapshot, bookSnapshot] = await Promise.all([
      adminDb
        .collection("users")
        .doc(decoded.uid)
        .collection("library")
        .doc(bookId)
        .get(),

      adminDb.collection("books").doc(bookId).get(),
    ]);

    if (!librarySnapshot.exists) {
      return NextResponse.json(
        { error: "You have not purchased this book." },
        { status: 403 }
      );
    }

    if (!bookSnapshot.exists) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }

    const entitlement = librarySnapshot.data()!;
    const book = bookSnapshot.data()!;

    // 5. Verify that access is active and has not expired.
    const expiry = toDate(entitlement.expiresAt);

    if (
      entitlement.status !== "active" ||
      !expiry ||
      expiry.getTime() <= Date.now()
    ) {
      return NextResponse.json(
        { error: "Your book access has expired." },
        { status: 403 }
      );
    }

    // 6. Only published books can be read.
    if (book.status !== "published") {
      return NextResponse.json(
        { error: "This book is not available." },
        { status: 403 }
      );
    }

    // 7. Select the requested language's private PDF.
    const pdfPath = getLanguagePdfPath(
      book as Record<string, unknown>,
      language
    );

    if (!pdfPath) {
      return NextResponse.json(
        {
          error:
            language === "ur"
              ? "The Urdu PDF is not configured for this book."
              : "The English PDF is not configured for this book.",
        },
        {
          status: 404,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    // 8. Load the correct PDF. Language is part of the cache key.
    const bytes = await getPdfBytes(bookId, language, pdfPath);

    const pdf = await pdfjsLib.getDocument({
      data: bytes.slice(),
      useSystemFonts: true,
    }).promise;

    // 9. Return page count when requested by the reader.
    const info = request.nextUrl.searchParams.get("info");

    if (info === "1") {
      return NextResponse.json(
        {
          totalPages: pdf.numPages,
          language,
        },
        {
          headers: {
            "Cache-Control": "private, no-store, max-age=0",
          },
        }
      );
    }

    // 10. Validate the requested page number.
    const pageNumber = Number(request.nextUrl.searchParams.get("page"));

    if (
      !Number.isInteger(pageNumber) ||
      pageNumber < 1 ||
      pageNumber > pdf.numPages
    ) {
      return NextResponse.json(
        { error: "Invalid page number." },
        { status: 400 }
      );
    }

    // 11. Render the requested page.
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({
      scale: MAX_RENDER_SCALE,
    });

    // Avoid unexpectedly huge canvas allocations.
    if (
      viewport.width > 3000 ||
      viewport.height > 4000 ||
      viewport.width * viewport.height > 8_000_000
    ) {
      return NextResponse.json(
        { error: "This PDF page exceeds the rendering limit." },
        { status: 413 }
      );
    }

    const canvas = createCanvas(
      Math.ceil(viewport.width),
      Math.ceil(viewport.height)
    );

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvas: canvas as never,
      canvasContext: ctx as never,
      viewport,
    }).promise;

    // 12. Add watermark to the rendered image.
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 5);
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#555555";
    ctx.font = "bold 30px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Mian Ahmad Basit", 0, 0);
    ctx.restore();

    // 13. Return the page as a PNG image.
    const png = await canvas.encode("png");

    return new NextResponse(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.error("Protected book page request failed:", error);

    return NextResponse.json(
      { error: "Unable to load this book page." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
