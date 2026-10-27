"use client";

import { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import CodeTool from "@editorjs/code";
import ImageTool from "@editorjs/image";
import Delimiter from "@editorjs/delimiter";
import Marker from "@editorjs/marker";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import Warning from "@editorjs/warning";
import { uploadImage } from "@/lib/imageUpload";

interface Props {
  onReady: (editor: EditorJS) => void;
  onChange?: (data: OutputData) => void;
  initialData?: OutputData;
  holderId?: string;
  readOnly?: boolean;
}

export default function WriteEditor({
  onReady,
  onChange,
  initialData,
  holderId = "editorjs-holder",
  readOnly = false,
}: Props) {
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    const holder = document.getElementById(holderId);

    if (!holder || editorInstance.current) return;

    holder.innerHTML = "";

    const editor = new EditorJS({
      holder: holderId,
      autofocus: !readOnly,
      readOnly,
      data: initialData || { blocks: [] },
      placeholder: "Tell your story...",
      minHeight: 200,

      onChange: async () => {
        if (!onChange) return;

        try {
          const data = await editor.saver.save();
          onChange(data);
        } catch (error) {
          console.error("Editor save error:", error);
        }
      },

      tools: {
        header: {
          class: Header as any,
          config: {
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
        },

        paragraph: {
          class: Paragraph as any,
          inlineToolbar: true,
        },

        list: {
          class: List as any,
          inlineToolbar: true,
        },

        quote: {
          class: Quote as any,
          inlineToolbar: true,
        },

        table: {
          class: Table as any,
          inlineToolbar: true,
        },

        warning: Warning as any,

        code: CodeTool,

        delimiter: Delimiter,

        marker: Marker,

        inlineCode: InlineCode,

        embed: {
          class: Embed as any,
          config: {
            services: {
              youtube: true,
              vimeo: true,
              twitter: true,
              instagram: true,
              codepen: true,
            },
          },
        },

        image: {
          class: ImageTool as any,
          config: {
            uploader: {
              uploadByFile: async (file: File) => {
                try {
                  const result = await uploadImage(file, "blogs/inline");

                  return {
                    success: 1,
                    file: {
                      url: result.url,
                    },
                  };
                } catch (error) {
                  console.error("Inline image upload failed:", error);

                  return {
                    success: 0,
                  };
                }
              },

              uploadByUrl: async (url: string) => {
                return {
                  success: 1,
                  file: {
                    url,
                  },
                };
              },
            },
          },
        },
      },

      onReady: () => {
        onReady(editor);
      },
    });

    // IMPORTANT:
    // Set this immediately after creating EditorJS.
    // Do NOT wait for onReady.
    editorInstance.current = editor;

    return () => {
      if (editorInstance.current === editor) {
        editorInstance.current?.destroy?.();
        editorInstance.current = null;
      }
    };
    // holderId intentionally controls initialization.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holderId]);

  return (
    <div className="w-full max-w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-950 shadow-sm transition focus-within:border-emerald-500/40 sm:p-10 dark:border-white/10 dark:bg-black/30 dark:text-white">
      <div id={holderId} />
    </div>
  );
}
