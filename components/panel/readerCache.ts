const MAX_CACHED_PAGES = 12;

const pageCache = new Map<string, Blob>();
const pendingPages = new Map<string, Promise<Blob>>();

const pageCountCache = new Map<string, number>();
const pendingPageCounts = new Map<string, Promise<number>>();

function rememberPage(key: string, blob: Blob) {
  // Refresh the entry's position for simple LRU eviction.
  pageCache.delete(key);
  pageCache.set(key, blob);

  while (pageCache.size > MAX_CACHED_PAGES) {
    const oldestKey = pageCache.keys().next().value;
    if (oldestKey === undefined) break;
    pageCache.delete(oldestKey);
  }
}

export function loadPageBlob(
  key: string,
  url: string,
  token: string
): Promise<Blob> {
  const cached = pageCache.get(key);

  if (cached) {
    // Move frequently used pages to the newest position.
    pageCache.delete(key);
    pageCache.set(key, cached);
    return Promise.resolve(cached);
  }

  const pending = pendingPages.get(key);
  if (pending) return pending;

  const request = fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to load this page.");
      }

      const blob = await response.blob();
      rememberPage(key, blob);
      return blob;
    })
    .finally(() => {
      pendingPages.delete(key);
    });

  pendingPages.set(key, request);
  return request;
}

export function loadPageCount(
  key: string,
  url: string,
  token: string
): Promise<number> {
  const cached = pageCountCache.get(key);
  if (cached !== undefined) return Promise.resolve(cached);

  const pending = pendingPageCounts.get(key);
  if (pending) return pending;

  const request = fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to verify book access.");
      }

      const info = (await response.json()) as { totalPages: number };

      if (!Number.isInteger(info.totalPages) || info.totalPages < 1) {
        throw new Error("Invalid page count returned by the server.");
      }

      pageCountCache.set(key, info.totalPages);
      return info.totalPages;
    })
    .finally(() => {
      pendingPageCounts.delete(key);
    });

  pendingPageCounts.set(key, request);
  return request;
}
