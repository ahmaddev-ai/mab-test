import imageCompression from "browser-image-compression";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebase/config";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export interface UploadResult {
  url: string;
  path: string;
  width?: number;
  height?: number;
}

export function validateImage(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, WEBP or GIF images are allowed.";
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `Image must be smaller than ${MAX_SIZE_MB}MB.`;
  }
  return null;
}

async function compress(file: File): Promise<File> {
  // Skip compression for gifs (would break animation)
  if (file.type === "image/gif") return file;
  try {
    return await imageCompression(file, {
      maxSizeMB: 1.2,
      maxWidthOrHeight: 2000,
      useWebWorker: true,
      initialQuality: 0.85,
    });
  } catch {
    // If compression fails for any reason, fall back to the original file
    return file;
  }
}

/**
 * Uploads an image to Firebase Storage with progress reporting.
 * folder: e.g. "blogs/featured" or "blogs/inline"
 */
export function uploadImage(
  file: File,
  folder: string,
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  return new Promise(async (resolve, reject) => {
    const err = validateImage(file);
    if (err) return reject(new Error(err));

    const compressed = await compress(file);
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
    const path = `${folder}/${Date.now()}-${safeName}`;
    const storageRef = ref(storage, path);

    const task = uploadBytesResumable(storageRef, compressed);

    task.on(
      "state_changed",
      (snapshot) => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(Math.round(pct));
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({ url, path });
      }
    );
  });
}

export async function deleteImage(path: string) {
  try {
    await deleteObject(ref(storage, path));
  } catch {
    // ignore if already deleted / not found
  }
}
