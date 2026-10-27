import { useCallback, useEffect, useRef, useState } from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface UseAutosaveOptions<T> {
  key: string; // localStorage key, e.g. `draft:${blogId ?? "new"}`
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number; // ms
  enabled?: boolean;
}

/**
 * Debounced autosave: saves to localStorage instantly (for refresh recovery)
 * and calls onSave (your Firestore write) after `delay` ms of inactivity.
 */
export function useAutosave<T>({
  key,
  data,
  onSave,
  delay = 1500,
  enabled = true,
}: UseAutosaveOptions<T>) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedRef = useRef<string>("");

  useEffect(() => {
    if (!enabled) return;
    const serialized = JSON.stringify(data);
    if (serialized === savedRef.current) return;

    // instant local recovery copy
    try {
      localStorage.setItem(key, serialized);
    } catch {
      /* storage full/unavailable — ignore */
    }

    setStatus("saving");
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      try {
        await onSave(data);
        savedRef.current = serialized;
        setStatus("saved");
      } catch {
        setStatus("error");
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), enabled]);

  const recoverDraft = useCallback((): T | null => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }, [key]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, [key]);

  return { status, recoverDraft, clearDraft };
}
