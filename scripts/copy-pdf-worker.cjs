const fs = require("node:fs");
const path = require("node:path");

const source = require.resolve("pdfjs-dist/legacy/build/pdf.worker.mjs");

const destination = path.join(process.cwd(), "public", "pdf.worker.mjs");

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.copyFileSync(source, destination);

console.log("PDF.js worker copied to public/pdf.worker.mjs");
