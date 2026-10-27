"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

type Props = {
  pdfData: Uint8Array;
  zoom: number;
  onLoad: (numPages: number) => void;
  onError: (error: Error) => void;
};

// Resolve the worker from the installed PDF.js package.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function BookPdfCanvas({
  pdfData,
  zoom,
  onLoad,
  onError,
}: Props) {
  const [numPages, setNumPages] = useState(0);

  return (
    <Document
      file={{ data: pdfData }}
      onLoadSuccess={(pdf) => {
        setNumPages(pdf.numPages);
        onLoad(pdf.numPages);
      }}
      onLoadError={(error) => {
        onError(
          error instanceof Error ? error : new Error("Failed to load PDF.")
        );
      }}
      loading={
        <p className="p-6 text-center text-sm text-stone-300">
          Preparing pages...
        </p>
      }
      className="flex flex-col items-center gap-5 p-3 sm:p-5"
    >
      {Array.from({ length: numPages }, (_, index) => (
        <div
          key={index + 1}
          className="select-none bg-white shadow-xl"
          onContextMenu={(event) => event.preventDefault()}
          onCopy={(event) => event.preventDefault()}
          onCut={(event) => event.preventDefault()}
          draggable={false}
        >
          <Page
            pageNumber={index + 1}
            width={Math.round((720 * zoom) / 100)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            renderForms={false}
          />
        </div>
      ))}
    </Document>
  );
}
