"use client";

import { useEffect, useId, useRef } from "react";
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
  data?: any;
  readOnly?: boolean;
  onReady?: (editor: EditorJS) => void;
}

export default function Editor({ data, readOnly = true, onReady }: Props) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderId = useId();

  useEffect(() => {
    let editor: EditorJS;

    const initEditor = async () => {
      editor = new EditorJS({
        holder: holderId,
        data: data || { blocks: [] },
        readOnly,

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
                  return { success: 1, file: { url } };
                },
              },
            },
          },
        },

        onReady: () => {
          editorRef.current = editor;
          onReady?.(editor);
        },
      });
    };

    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data, readOnly, holderId]);

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-6">
      <div id={holderId} />
    </div>
  );
}
