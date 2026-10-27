"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import CodeTool from "@editorjs/code";
import ImageTool from "@editorjs/image";
import Delimiter from "@editorjs/delimiter";
import Marker from "@editorjs/marker";
import Embed from "@editorjs/embed";
import { uploadImageToFirebase } from "@/firebase/config";

interface Props {
  onReady: (editor: EditorJS) => void;
  initialData?: any;
}

export default function WriteEditor({ onReady, initialData }: Props) {
  const editorInstance = useRef<EditorJS | null>(null);
  const holderId = "editorjs-holder"; // stable holder id

  useEffect(() => {
    if (editorInstance.current) return; // prevent duplicate init

    const holder = document.getElementById(holderId);
    if (!holder) return;

    // clear previous editor DOM if exists
    holder.innerHTML = "";

    const editor = new EditorJS({
      holder: holderId,
      autofocus: true,
      data: initialData || { blocks: [] },
      placeholder: "Tell your story...",

      tools: {
        header: Header,
        paragraph: {
          class: Paragraph as any,
          inlineToolbar: true,
        },
        code: CodeTool,
        delimiter: Delimiter,
        marker: Marker,
        embed: Embed,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file: File) => {
                const url = await uploadImageToFirebase(file);
                return {
                  success: 1,
                  file: { url },
                };
              },
            },
          },
        },
      },

      onReady: () => {
        editorInstance.current = editor;
        onReady(editor);
      },
    });

    return () => {
      editorInstance.current?.destroy();
      editorInstance.current = null;
    };
  }, []);

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-6">
      <div id={holderId} />
    </div>
  );
}
