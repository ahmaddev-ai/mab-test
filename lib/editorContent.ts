import type { OutputData } from "@editorjs/editorjs";

type FirestoreBlock = {
  type: string;
  id?: string;
  data: Record<string, any>;
};

/**
 * Recursively removes undefined values from objects/arrays.
 * Firestore does not accept undefined anywhere in a document,
 * including deeply nested EditorJS block data.
 */
function removeUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .filter((item) => item !== undefined)
      .map((item) => removeUndefined(item)) as T;
  }

  if (value !== null && typeof value === "object") {
    const result: Record<string, any> = {};

    Object.entries(value as Record<string, any>).forEach(([key, item]) => {
      if (item !== undefined) {
        result[key] = removeUndefined(item);
      }
    });

    return result as T;
  }

  return value;
}

export function serializeEditorContentForFirestore(
  content: OutputData
): OutputData {
  const normalized: OutputData = {
    ...content,
    blocks: (content?.blocks || []).map((block: any) => {
      if (block?.type !== "table") {
        return block;
      }

      const rows = Array.isArray(block.data?.content)
        ? block.data.content.map((row: any) => {
            if (Array.isArray(row)) {
              return {
                cells: row,
              };
            }

            if (Array.isArray(row?.cells)) {
              return {
                cells: row.cells,
              };
            }

            return {
              cells: [],
            };
          })
        : [];

      return {
        ...block,
        data: {
          ...block.data,
          content: rows,
          contentFormat: "rows",
        },
      };
    }),
  };

  // Critical: Firestore cannot store undefined,
  // even when deeply nested inside EditorJS data.
  return removeUndefined(normalized);
}

export function deserializeEditorContentFromFirestore(
  content: OutputData
): OutputData {
  return {
    ...content,
    blocks: (content?.blocks || []).map((block: any) => {
      if (block?.type !== "table") {
        return block;
      }

      const rows = Array.isArray(block.data?.content)
        ? block.data.content.map((row: any) => {
            if (Array.isArray(row)) {
              return row;
            }

            if (Array.isArray(row?.cells)) {
              return row.cells;
            }

            return [];
          })
        : [];

      return {
        ...block,
        data: {
          ...block.data,
          content: rows,
        },
      };
    }),
  };
}
