import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  reactStrictMode: true,

  serverExternalPackages: ["@napi-rs/canvas", "pdfjs-dist"],

  outputFileTracingIncludes: {
    "/api/books/[bookId]/pages": [
      "./node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs",
    ],
  },
};

export default nextConfig;
