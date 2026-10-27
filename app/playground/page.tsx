"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html as htmlLang } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import { javascript as jsLang } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import JSZip from "jszip";
import {
  Code2,
  Play,
  RotateCcw,
  Copy,
  Download,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  ExternalLink,
  Check,
  ChevronDown,
  Eye,
  Zap,
  PanelLeftClose,
  PanelRightClose,
  Save,
  FolderOpen,
  FilePlus2,
  Trash2,
  Pencil,
  Terminal,
  X,
  Globe,
  RefreshCw,
  Command,
  CircleAlert,
  CircleCheck,
  HardDrive,
  FileCode2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

type EditorTab = "html" | "css" | "js";
type Viewport = "desktop" | "tablet" | "mobile";
type Project = {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
  updatedAt: string;
};
type ConsoleMessage = {
  id: number;
  type: "log" | "warn" | "error" | "info";
  text: string;
};

const PROJECTS_KEY = "ahmadbasit-playground-projects-v1";
const DRAFT_KEY = "ahmadbasit-playground-draft-v1";

const initialHTML = `<div class="hero">
  <div class="badge">✦ AHmad Basit · Developer Playground</div>
  <h1>Build something<br /><span>extraordinary.</span></h1>
  <p>Write HTML, CSS and JavaScript. See your creation come to life instantly.</p>
  <button id="exploreBtn">Explore the magic <span>→</span></button>
  <div class="stats">
    <div><strong>3</strong><small>Languages</small></div>
    <div><strong>Live</strong><small>Preview</small></div>
    <div><strong>∞</strong><small>Possibilities</small></div>
  </div>
</div>`;

const initialCSS = `* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  background: #080b14;
  color: #f8fafc;
}

.hero {
  min-height: 100vh;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background:
    radial-gradient(ellipse at 50% 10%, #30236a 0%, transparent 55%),
    #080b14;
}

.badge {
  padding: 9px 16px;
  border: 1px solid #5144a8;
  border-radius: 999px;
  background: #211b43;
  color: #c4b5fd;
  font-size: 12px;
}

h1 {
  font-size: clamp(38px, 7vw, 76px);
  line-height: 1.08;
  letter-spacing: -3px;
  margin: 28px 0 18px;
}

h1 span { color: #a78bfa; }

p {
  max-width: 520px;
  color: #a1a1b5;
  line-height: 1.8;
  font-size: 16px;
}

button {
  margin-top: 24px;
  padding: 15px 24px;
  border: 0;
  border-radius: 12px;
  background: #8b5cf6;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .2s, background .2s;
}

button:hover {
  transform: translateY(-2px);
  background: #7c3aed;
}

.stats {
  display: flex;
  gap: 55px;
  margin-top: 60px;
}

.stats div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stats strong { font-size: 25px; }
.stats small { color: #85869b; }

@media (max-width: 480px) {
  .stats { gap: 24px; }
  h1 { letter-spacing: -1.5px; }
}`;

const initialJS = `const exploreBtn = document.getElementById("exploreBtn");

exploreBtn?.addEventListener("click", () => {
  exploreBtn.innerHTML = "You're ready to build! ✓";
  exploreBtn.style.background = "#059669";
  console.log("Button clicked successfully!");
});`;

const starterTemplates = {
  "Landing Page": { html: initialHTML, css: initialCSS, js: initialJS },
  "Hello World": {
    html: `<main class="card">
  <span class="eyebrow">YOUR FIRST PROJECT</span>
  <h1>Hello, World!</h1>
  <p>Your first live web experiment.</p>
  <button id="helloBtn">Click me</button>
  <p id="message"></p>
</main>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: #f1f5f9;
  color: #0f172a;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
}
.card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px #0f172a15;
  text-align: center;
}
.eyebrow { color: #6366f1; font-size: 11px; letter-spacing: 2px; }
button {
  padding: 12px 20px;
  background: #4f46e5;
  color: white;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}`,
    js: `document.getElementById("helloBtn")?.addEventListener("click", () => {
  document.getElementById("message").textContent = "It works!";
  console.log("Hello World button clicked");
});`,
  },
  "Counter App": {
    html: `<main class="counter">
  <span class="eyebrow">INTERACTIVE DEMO</span>
  <h1>Counter</h1>
  <div id="count">0</div>
  <div class="actions">
    <button id="minus">−</button>
    <button id="reset">Reset</button>
    <button id="plus">+</button>
  </div>
</main>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0f172a;
  color: white;
  font-family: system-ui;
}
.counter { text-align: center; }
.eyebrow { color: #a5b4fc; font-size: 11px; letter-spacing: 2px; }
#count { font-size: 80px; margin: 20px; }
.actions { display: flex; gap: 10px; justify-content: center; }
button {
  padding: 12px 22px;
  border: 0;
  border-radius: 10px;
  background: #6366f1;
  color: white;
  cursor: pointer;
  font-size: 18px;
}`,
    js: `let count = 0;
const output = document.getElementById("count");

document.getElementById("plus").onclick = () => {
  output.textContent = ++count;
  console.log("Count:", count);
};
document.getElementById("minus").onclick = () => {
  output.textContent = --count;
  console.log("Count:", count);
};
document.getElementById("reset").onclick = () => {
  count = 0;
  output.textContent = count;
  console.info("Counter reset");
};`,
  },
  "Blank Project": {
    html: "<!-- Write your HTML here -->\n",
    css: "/* Write your CSS here */\n",
    js: "// Write your JavaScript here\n",
  },
};

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function makeProject(
  name: string,
  html = initialHTML,
  css = initialCSS,
  js = initialJS
): Project {
  return {
    id: makeId(),
    name,
    html,
    css,
    js,
    updatedAt: new Date().toISOString(),
  };
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function makeDocument(html: string, css: string, js: string) {
  // Forward preview console messages to the parent app. Values are serialized
  // as text; the preview itself remains in a sandboxed iframe.
  const bridge = `
    (() => {
      const send = (type, args) => {
        try {
          parent.postMessage({
            source: "ahmadbasit-playground",
            type,
            text: Array.from(args).map(value => {
              if (typeof value === "string") return value;
              try { return JSON.stringify(value); }
              catch { return String(value); }
            }).join(" ")
          }, "*");
        } catch {}
      };
      for (const type of ["log", "info", "warn", "error"]) {
        const original = console[type].bind(console);
        console[type] = (...args) => {
          send(type, args);
          original(...args);
        };
      }
      window.addEventListener("error", event => {
        send("error", [event.message || "Unknown runtime error"]);
      });
      window.addEventListener("unhandledrejection", event => {
        send("error", ["Unhandled promise rejection", event.reason]);
      });
    })();
  `;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>${css}</style>
</head>
<body>
${html}
<script>${bridge}<\/script>
<script>
try {
${js}
} catch (error) {
  console.error(error);
}
<\/script>
</body>
</html>`;
}

function PlaygroundContent() {
  const [html, setHtml] = useState(initialHTML);
  const [css, setCss] = useState(initialCSS);
  const [js, setJs] = useState(initialJS);
  const [activeTab, setActiveTab] = useState<EditorTab>("html");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [autoRun, setAutoRun] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [lastRun, setLastRun] = useState(0);
  const [copied, setCopied] = useState(false);
  const [template, setTemplate] = useState("Landing Page");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentId, setCurrentId] = useState("");
  const [projectName, setProjectName] = useState("My First Project");
  const [dirty, setDirty] = useState(false);
  const [ready, setReady] = useState(false);
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [notice, setNotice] = useState("");
  const [showProjects, setShowProjects] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [saveAsOpen, setSaveAsOpen] = useState(false);
  const [saveAsValue, setSaveAsValue] = useState("");
  const [projectSearch, setProjectSearch] = useState("");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchParams = useSearchParams();

  const incomingCode = searchParams.get("code");
  const incomingLanguage = searchParams.get("language");

  const documentCode = useMemo(
    () => makeDocument(html, css, js),
    [html, css, js]
  );

  const runCode = useCallback(() => {
    setConsoleMessages([]);
    setLastRun((value) => value + 1);
  }, []);

  const notify = useCallback((message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2800);
  }, []);

  function detectLanguage(code: string): "html" | "css" | "js" {
    const trimmed = code.trim();

    if (!trimmed) return "html";

    // HTML tags: <div>, <h1>, <section>, etc.
    const htmlPattern =
      /<!doctype\s+html|<\/?[a-z][\w-]*(?:\s[^<>]*?)?\s*\/?>/i;

    // CSS declarations or selector blocks
    const cssPattern =
      /(?:^|\n)\s*(?:[.#][\w-]+|[a-z][\w-]*|\*)[^{}\n]*\{[^{}]*[a-z-]+\s*:[^{};]+;?[^{}]*\}/i;

    const cssPropertyPattern =
      /(?:^|\n)\s*(?:color|background|background-color|font-size|font-family|margin|padding|display|width|height|border|position|flex-direction|justify-content|align-items)\s*:/i;

    // Check HTML first. "class" in class="article" is an HTML attribute,
    // not a JavaScript class declaration.
    if (htmlPattern.test(trimmed)) {
      return "html";
    }

    if (
      cssPattern.test(trimmed) ||
      cssPropertyPattern.test(trimmed) ||
      /^[.#][\w-]+\s*$/m.test(trimmed)
    ) {
      return "css";
    }

    // JavaScript indicators
    const jsPattern =
      /\bdocument\s*\.|\bwindow\s*\.|\bconsole\s*\.|\b(?:const|let|var|function|return|import|export|async|await)\b|\bclass\s+[A-Za-z_$]|\bif\s*\(|=>|\.addEventListener\s*\(/;

    if (jsPattern.test(trimmed)) {
      return "js";
    }

    return "js";
  }

  useEffect(() => {
    if (!ready || incomingCode === null) return;

    const language = (incomingLanguage || "").toLowerCase().trim();

    // Use the explicit language when it is recognized.
    // Detect from code only if language is missing or generic.
    const detectedLanguage = ["html", "htm"].includes(language)
      ? "html"
      : language === "css"
      ? "css"
      : ["js", "javascript", "jsx", "ts", "tsx", "typescript"].includes(
          language
        )
      ? "js"
      : detectLanguage(incomingCode);

    console.log("Incoming language:", incomingLanguage);
    console.log("Detected language:", detectedLanguage);
    console.log("Incoming code:", incomingCode);

    if (detectedLanguage === "html") {
      setHtml(incomingCode);
      setActiveTab("html");
    } else if (detectedLanguage === "css") {
      setCss(incomingCode);
      setActiveTab("css");
    } else {
      setJs(incomingCode);
      setActiveTab("js");
    }

    setProjectName("Imported Code");
    setCurrentId("");
    setDirty(true);
    setTemplate("Custom");
  }, [ready, incomingCode, incomingLanguage]);

  // Restore saved projects and the last editing draft after hydration.
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(PROJECTS_KEY);
      const draft = localStorage.getItem(DRAFT_KEY);
      const list: Project[] = savedProjects ? JSON.parse(savedProjects) : [];
      setProjects(Array.isArray(list) ? list : []);

      if (draft) {
        const data = JSON.parse(draft);
        if (typeof data.html === "string") setHtml(data.html);
        if (typeof data.css === "string") setCss(data.css);
        if (typeof data.js === "string") setJs(data.js);
        if (typeof data.projectName === "string")
          setProjectName(data.projectName);
        if (typeof data.currentId === "string") setCurrentId(data.currentId);
        if (typeof data.template === "string") setTemplate(data.template);
        setDirty(Boolean(data.dirty));
      }
    } catch {
      notify("Unable to restore local data. Start a new project.");
    } finally {
      setReady(true);
    }
  }, [notify]);

  // Persist a recoverable draft while typing.
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({
            html,
            css,
            js,
            projectName,
            currentId,
            template,
            dirty,
          })
        );
      } catch {
        notify(
          "Browser storage is full. Export your project to keep a backup."
        );
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [html, css, js, projectName, currentId, template, dirty, ready, notify]);

  // Debounced live preview.
  useEffect(() => {
    if (!autoRun || !ready) return;
    const timer = setTimeout(runCode, 500);
    return () => clearTimeout(timer);
  }, [html, css, js, autoRun, ready, runCode]);

  // Only accept messages sent by this page's preview iframe.
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.source !== "ahmadbasit-playground") return;
      const type = ["log", "info", "warn", "error"].includes(event.data.type)
        ? event.data.type
        : "log";
      setConsoleMessages((current) => [
        ...current.slice(-199),
        {
          id: Date.now() + Math.random(),
          type,
          text: String(event.data.text ?? ""),
        },
      ]);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.ctrlKey || event.metaKey;
      if (!mod) return;
      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        saveProject();
      }
      if (event.key.toLowerCase() === "enter") {
        event.preventDefault();
        runCode();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // Event handler is installed once; use the latest state through this effect's closure
    // via the dependencies below.
  });

  const persistProjects = (list: Project[]) => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(list));
    setProjects(list);
  };

  function saveProject() {
    const name = projectName.trim() || "Untitled Project";
    const existing = projects.find((project) => project.id === currentId);
    const updated: Project = {
      id: currentId || makeId(),
      name,
      html,
      css,
      js,
      updatedAt: new Date().toISOString(),
    };

    try {
      const list = existing
        ? projects.map((project) =>
            project.id === updated.id ? updated : project
          )
        : [updated, ...projects];
      persistProjects(list);
      setCurrentId(updated.id);
      setProjectName(name);
      setDirty(false);
      notify("Project saved successfully");
    } catch {
      notify("Could not save. Browser storage may be full.");
    }
  }

  function saveAsProject() {
    const name = saveAsValue.trim();
    if (!name) return;
    const project = makeProject(name, html, css, js);
    try {
      persistProjects([project, ...projects]);
      setCurrentId(project.id);
      setProjectName(project.name);
      setDirty(false);
      setSaveAsOpen(false);
      setSaveAsValue("");
      notify("New project saved");
    } catch {
      notify("Unable to save this project");
    }
  }

  function openProject(project: Project) {
    if (
      dirty &&
      !window.confirm("You have unsaved changes. Open another project anyway?")
    )
      return;
    setHtml(project.html);
    setCss(project.css);
    setJs(project.js);
    setCurrentId(project.id);
    setProjectName(project.name);
    setDirty(false);
    setTemplate("Custom");
    setShowProjects(false);
    setConsoleMessages([]);
    runCode();
    notify(`Opened ${project.name}`);
  }

  function createProject() {
    if (
      dirty &&
      !window.confirm("Discard unsaved changes and start a new project?")
    )
      return;
    setHtml("");
    setCss("");
    setJs("");
    setProjectName("Untitled Project");
    setCurrentId("");
    setTemplate("Blank Project");
    setDirty(true);
    setConsoleMessages([]);
    setActiveTab("html");
    setShowProjects(false);
    runCode();
  }

  function renameProject() {
    const name = renameValue.trim();
    if (!name) return;
    setProjectName(name);
    setDirty(true);
    setRenameOpen(false);
    setRenameValue("");
    notify("Name updated. Save to keep the change.");
  }

  function deleteProject(id: string) {
    const project = projects.find((item) => item.id === id);
    if (
      !project ||
      !window.confirm(`Delete "${project.name}"? This cannot be undone.`)
    )
      return;
    persistProjects(projects.filter((item) => item.id !== id));
    if (id === currentId) {
      setCurrentId("");
      setProjectName("Untitled Project");
      setDirty(true);
    }
    notify("Project deleted");
  }

  function loadTemplate(name: keyof typeof starterTemplates) {
    if (
      dirty &&
      !window.confirm("Replace your current code with this template?")
    )
      return;
    const next = starterTemplates[name];
    setHtml(next.html);
    setCss(next.css);
    setJs(next.js);
    setTemplate(name);
    setProjectName(name);
    setCurrentId("");
    setDirty(true);
    setActiveTab("html");
    setConsoleMessages([]);
    runCode();
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(
        activeTab === "html" ? html : activeTab === "css" ? css : js
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      notify("Clipboard access was denied by your browser");
    }
  }

  function downloadBlob(content: BlobPart, filename: string, type: string) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadHTML() {
    downloadBlob(
      documentCode,
      `${safeFilename(projectName)}.html`,
      "text/html;charset=utf-8"
    );
    notify("HTML file exported");
  }

  async function downloadZIP() {
    try {
      const zip = new JSZip();
      zip.file(
        "index.html",
        `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="style.css">
</head>
<body>
${html}
<script src="script.js"><\/script>
</body>
</html>`
      );
      zip.file("style.css", css);
      zip.file("script.js", js);
      zip.file(
        "README.md",
        `# ${projectName}

Created with the AhmadBasit.com Code Playground.

## Run
Open index.html in your browser.
`
      );
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, `${safeFilename(projectName)}.zip`, "application/zip");
      notify("Project ZIP downloaded");
    } catch {
      notify("Could not generate ZIP file");
    }
  }

  function safeFilename(value: string) {
    return (
      value
        .trim()
        .replace(/[^a-z0-9-_]+/gi, "-")
        .replace(/^-+|-+$/g, "") || "project"
    );
  }

  function resetCode() {
    if (
      !window.confirm("Reset all three editors to the original landing page?")
    )
      return;
    setHtml(initialHTML);
    setCss(initialCSS);
    setJs(initialJS);
    setTemplate("Landing Page");
    setProjectName("Landing Page");
    setCurrentId("");
    setDirty(true);
    setActiveTab("html");
    setConsoleMessages([]);
    runCode();
  }

  const editorValue =
    activeTab === "html" ? html : activeTab === "css" ? css : js;
  const setEditorValue = (value: string) => {
    if (activeTab === "html") setHtml(value);
    else if (activeTab === "css") setCss(value);
    else setJs(value);
    setDirty(true);
    setTemplate("Custom");
  };

  const languageExtension =
    activeTab === "html"
      ? htmlLang()
      : activeTab === "css"
      ? cssLang()
      : jsLang();
  const visibleProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(projectSearch.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#080a10] text-slate-200 selection:bg-violet-500/30">
      {/* Brand header */}
      <header className="sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-white/[0.07] bg-[#0b0d14]/95 px-3 backdrop-blur-2xl sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-950/40 ring-1 ring-white/15"
          >
            <Code2 size={21} />
          </a>
          <div className="min-w-0">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="block truncate text-sm font-bold tracking-tight text-white"
            >
              AhmadBasit<span className="text-violet-400">.com</span>
            </a>
            <p className="hidden text-[10px] tracking-wide text-slate-500 sm:block">
              WEB PLAYGROUND <span className="text-slate-700">/</span> HTML ·
              CSS · JS
            </p>
          </div>
          <div className="ml-1 hidden items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 md:flex">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                ready ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            <span className="text-[10px] text-slate-400">
              {ready ? "Workspace ready" : "Loading workspace"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setAutoRun(!autoRun)}
            className={`hidden items-center gap-2 rounded-lg border px-3 py-2 text-xs transition sm:flex ${
              autoRun
                ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300"
                : "border-white/[0.08] text-slate-400 hover:bg-white/[0.05]"
            }`}
          >
            <Zap size={13} /> Auto-run {autoRun ? "On" : "Off"}
          </button>
          <button
            onClick={() => {
              setSaveAsValue("");
              setSaveAsOpen(true);
            }}
            className="hidden h-9 items-center gap-2 rounded-lg border border-white/[0.09] px-3 text-xs text-slate-300 transition hover:bg-white/[0.06] sm:flex"
          >
            <FilePlus2 size={14} /> Save as
          </button>
          <button
            onClick={saveProject}
            className="flex h-9 items-center gap-2 rounded-lg border border-violet-400/25 bg-violet-500/10 px-3 text-xs font-medium text-violet-200 transition hover:bg-violet-500/20"
          >
            <Save size={14} /> <span className="hidden sm:inline">Save</span>
          </button>
          <button
            onClick={runCode}
            className="flex h-9 items-center gap-2 rounded-lg bg-violet-500 px-3.5 text-xs font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-400 sm:px-4"
          >
            <Play size={14} fill="currentColor" /> Run
          </button>
        </div>
      </header>

      {/* Project toolbar */}
      <div className="flex min-h-[60px] flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-[#0b0d14] px-3 py-2.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={() => setShowProjects(true)}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-slate-300 transition hover:bg-white/[0.07]"
          >
            <FolderOpen size={14} />{" "}
            <span className="hidden sm:inline">Projects</span>
            <span className="rounded bg-white/[0.07] px-1.5 py-0.5 text-[10px] text-slate-400">
              {projects.length}
            </span>
          </button>
          <span className="hidden text-slate-700 sm:inline">/</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="max-w-[145px] truncate text-xs font-medium text-slate-200 sm:max-w-[220px]">
                {projectName}
              </span>
              {dirty ? (
                <span
                  title="Unsaved changes"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                />
              ) : (
                <Check size={11} className="shrink-0 text-emerald-400" />
              )}
              <button
                title="Rename project"
                onClick={() => {
                  setRenameValue(projectName);
                  setRenameOpen(true);
                }}
                className="rounded p-1 text-slate-500 hover:bg-white/[0.06] hover:text-white"
              >
                <Pencil size={11} />
              </button>
            </div>
            <p className="hidden text-[10px] text-slate-600 sm:block">
              {dirty
                ? "Unsaved changes"
                : currentId
                ? "Saved locally"
                : "Draft · not saved as a project"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <select
            value={template in starterTemplates ? template : ""}
            onChange={(event) => {
              const value = event.target.value as keyof typeof starterTemplates;
              if (value) loadTemplate(value);
            }}
            className="max-w-[125px] appearance-none rounded-lg border border-white/[0.08] bg-[#141720] px-2.5 py-2 text-xs text-slate-300 outline-none focus:border-violet-400/50 sm:max-w-none sm:px-3"
          >
            <option value="">Templates</option>
            {Object.keys(starterTemplates).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowEditor(!showEditor)}
            title="Toggle editor"
            className={`rounded-lg p-2 transition ${
              showEditor
                ? "bg-white/[0.07] text-white"
                : "text-slate-500 hover:bg-white/[0.05]"
            }`}
          >
            <PanelLeftClose size={15} />
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            title="Toggle preview"
            className={`rounded-lg p-2 transition ${
              showPreview
                ? "bg-white/[0.07] text-white"
                : "text-slate-500 hover:bg-white/[0.05]"
            }`}
          >
            <PanelRightClose size={15} />
          </button>
          <div className="mx-1 h-5 w-px bg-white/[0.09]" />
          <button
            onClick={downloadHTML}
            title="Download standalone HTML"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs text-slate-400 transition hover:bg-white/[0.06] hover:text-white sm:px-3"
          >
            <Download size={14} />
            <span className="hidden md:inline">HTML</span>
          </button>
          <button
            onClick={downloadZIP}
            title="Download HTML, CSS and JS as ZIP"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-2 text-xs text-slate-300 transition hover:bg-white/[0.06]"
          >
            <HardDrive size={14} />
            <span className="hidden sm:inline">ZIP</span>
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <section
        className={`grid min-h-[calc(100vh-160px)] ${
          showEditor && showPreview
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {showEditor && (
          <section className="flex min-h-[520px] min-w-0 flex-col border-b border-white/[0.08] lg:border-b-0 lg:border-r">
            <div className="flex h-[48px] shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#0c0e14]">
              <div className="flex h-full items-center">
                {(
                  [
                    { id: "html", label: "index.html", dot: "bg-orange-400" },
                    { id: "css", label: "styles.css", dot: "bg-blue-400" },
                    { id: "js", label: "script.js", dot: "bg-yellow-300" },
                  ] as const
                ).map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setActiveTab(file.id)}
                    className={`relative flex h-full items-center gap-2 border-r border-white/[0.05] px-3 text-xs transition sm:px-4 ${
                      activeTab === file.id
                        ? "bg-[#151821] text-white"
                        : "text-slate-500 hover:bg-white/[0.025] hover:text-slate-300"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${file.dot}`} />
                    {file.label}
                    {activeTab === file.id && (
                      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-violet-400" />
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={copyCode}
                title="Copy current file"
                className="mr-3 flex items-center gap-1.5 rounded-md p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} />
                )}
                <span className="hidden text-[11px] sm:inline">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
            </div>

            <div className="min-h-[480px] flex-1 bg-[#0b0d13]">
              <CodeMirror
                value={editorValue}
                height="100%"
                minHeight="480px"
                theme={oneDark}
                extensions={[languageExtension]}
                onChange={setEditorValue}
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                  highlightActiveLine: true,
                  bracketMatching: true,
                  autocompletion: true,
                  indentOnInput: true,
                  tabSize: 2,
                  closeBrackets: true,
                }}
                className="h-full text-[13px]"
              />
            </div>

            <footer className="flex h-9 shrink-0 items-center justify-between border-t border-white/[0.06] bg-[#0c0e14] px-4 text-[10px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="uppercase tracking-wider">{activeTab}</span>
                <span>UTF-8</span>
                <span>Spaces: 2</span>
                <span className="hidden sm:inline">Ctrl/⌘ + S to save</span>
              </div>
              <span>{editorValue.split("\n").length} lines</span>
            </footer>
          </section>
        )}

        {showPreview && (
          <section
            className={`flex min-w-0 flex-col bg-[#0a0c11] ${
              isFullscreen ? "fixed inset-0 z-[60]" : "min-h-[520px]"
            }`}
          >
            <div className="flex min-h-[48px] shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] bg-[#0c0e14] px-3 sm:px-4">
              <div className="flex items-center gap-2">
                <Eye size={15} className="text-emerald-400" />
                <span className="text-xs font-medium text-slate-200">
                  Live Preview
                </span>
                <span className="hidden rounded-md bg-emerald-400/[0.08] px-1.5 py-1 text-[9px] text-emerald-300 sm:inline">
                  <Zap size={10} className="mr-1 inline" /> LIVE
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-[#10131b] p-1">
                {(
                  [
                    { id: "desktop", icon: Monitor, label: "Desktop" },
                    { id: "tablet", icon: Tablet, label: "Tablet" },
                    { id: "mobile", icon: Smartphone, label: "Mobile" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    title={item.label}
                    onClick={() => setViewport(item.id)}
                    className={`rounded-md p-1.5 transition ${
                      viewport === item.id
                        ? "bg-violet-500/20 text-violet-300"
                        : "text-slate-500 hover:text-white"
                    }`}
                  >
                    <item.icon size={14} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={runCode}
                  title="Refresh preview"
                  className="rounded-md p-2 text-slate-500 hover:bg-white/[0.06] hover:text-white"
                >
                  <RefreshCw size={13} />
                </button>
                <button
                  title={
                    isFullscreen ? "Exit fullscreen" : "Fullscreen preview"
                  }
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="rounded-md p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/[0.06] bg-[#10131b] px-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
                </div>
                <div className="ml-2 flex h-6 min-w-0 flex-1 items-center gap-2 rounded-md border border-white/[0.06] bg-[#0a0c11] px-2.5">
                  <Globe size={11} className="shrink-0 text-slate-600" />
                  <span className="truncate text-[10px] text-slate-500">
                    preview.local / {safeFilename(projectName)}
                  </span>
                </div>
                <button
                  title="Open preview in a new tab"
                  onClick={() => {
                    const url = URL.createObjectURL(
                      new Blob([documentCode], { type: "text/html" })
                    );
                    window.open(url, "_blank", "noopener,noreferrer");
                    setTimeout(() => URL.revokeObjectURL(url), 60000);
                  }}
                  className="rounded p-1.5 text-slate-500 hover:text-white"
                >
                  <ExternalLink size={13} />
                </button>
              </div>

              <div className="flex flex-1 justify-center overflow-auto bg-[#181b24] p-2 sm:p-4">
                <div
                  className="h-full min-h-[400px] overflow-hidden bg-white shadow-2xl transition-[width] duration-300"
                  style={{
                    width:
                      viewport === "desktop"
                        ? "100%"
                        : viewport === "tablet"
                        ? "768px"
                        : "375px",
                    maxWidth: "100%",
                    borderRadius: "4px",
                  }}
                >
                  <iframe
                    ref={iframeRef}
                    key={lastRun}
                    title="Sandboxed live code preview"
                    srcDoc={documentCode}
                    sandbox="allow-scripts"
                    referrerPolicy="no-referrer"
                    className="h-full min-h-[400px] w-full border-0 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Browser console */}
            <div className="shrink-0 border-t border-white/[0.07] bg-[#0c0e14]">
              <button
                onClick={() => setShowConsole(!showConsole)}
                className="flex h-10 w-full items-center justify-between px-4 text-left transition hover:bg-white/[0.025]"
              >
                <span className="flex items-center gap-2 text-xs text-slate-300">
                  <Terminal size={14} className="text-violet-300" /> Console
                  {consoleMessages.some(
                    (message) => message.type === "error"
                  ) && <CircleAlert size={12} className="text-red-400" />}
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-slate-500">
                    {consoleMessages.length}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      setConsoleMessages([]);
                    }}
                    className="cursor-pointer text-[10px] text-slate-500 hover:text-white"
                  >
                    Clear
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-500 transition ${
                      showConsole ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
              {showConsole && (
                <div className="max-h-44 min-h-[48px] overflow-auto border-t border-white/[0.05] px-3 py-2 font-mono text-[11px]">
                  {consoleMessages.length === 0 ? (
                    <p className="py-2 text-slate-600">
                      No messages yet. Use console.log() in your JavaScript.
                    </p>
                  ) : (
                    consoleMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 border-b border-white/[0.035] py-1.5 ${
                          message.type === "error"
                            ? "text-red-300"
                            : message.type === "warn"
                            ? "text-amber-300"
                            : message.type === "info"
                            ? "text-sky-300"
                            : "text-slate-300"
                        }`}
                      >
                        {message.type === "error" ? (
                          <CircleAlert size={12} className="mt-0.5 shrink-0" />
                        ) : (
                          <span className="w-3 shrink-0 text-slate-600">›</span>
                        )}
                        <span className="break-all">{message.text}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <footer className="flex h-9 shrink-0 items-center justify-between border-t border-white/[0.06] bg-[#0c0e14] px-4 text-[10px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
                Preview sandbox
              </div>
              <span>
                {viewport === "desktop"
                  ? "Responsive · Desktop"
                  : viewport === "tablet"
                  ? "768px · Tablet"
                  : "375px · Mobile"}
              </span>
            </footer>
            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute right-4 top-[60px] rounded-lg bg-violet-500 px-3 py-2 text-xs text-white shadow-lg"
              >
                Exit fullscreen
              </button>
            )}
          </section>
        )}
      </section>

      {/* Footer branding */}
      <footer className="flex min-h-10 flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] bg-[#0b0d14] px-4 py-3 text-[10px] text-slate-500 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://ahmadbasit.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-slate-300 transition hover:text-violet-300"
          >
            AhmadBasit.com
          </a>
          <span className="text-slate-700">|</span>
          <span>HTML5</span>
          <span>CSS3</span>
          <span>JavaScript</span>
        </div>
        <span className="flex items-center gap-1.5">
          <Command size={11} /> Ctrl/⌘ + S Save{" "}
          <span className="text-slate-700">·</span> Ctrl/⌘ + Enter Run
        </span>
      </footer>

      {/* Toast */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[100] flex max-w-[calc(100vw-40px)] items-center gap-2 rounded-xl border border-white/10 bg-[#171923] px-4 py-3 text-xs text-slate-100 shadow-2xl"
        >
          <CircleCheck size={15} className="shrink-0 text-emerald-400" />{" "}
          {notice}
        </div>
      )}

      {/* Saved project drawer */}
      {showProjects && (
        <div
          className="fixed inset-0 z-[80] flex justify-end bg-black/60 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowProjects(false);
          }}
        >
          <aside className="flex h-full w-full max-w-[420px] flex-col border-l border-white/10 bg-[#0d0f17] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Your projects
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Saved in this browser
                </p>
              </div>
              <button
                onClick={() => setShowProjects(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>
            <div className="space-y-3 p-4">
              <button
                onClick={createProject}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 py-3 text-xs font-medium text-violet-200 transition hover:bg-violet-500/20"
              >
                <FilePlus2 size={15} /> Create new project
              </button>
              <input
                value={projectSearch}
                onChange={(event) => setProjectSearch(event.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#131620] px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
              />
            </div>
            <div className="flex-1 space-y-2 overflow-auto px-4 pb-5">
              {visibleProjects.length === 0 ? (
                <div className="py-14 text-center">
                  <FolderOpen size={26} className="mx-auto text-slate-600" />
                  <p className="mt-3 text-xs text-slate-400">
                    {projects.length
                      ? "No matching projects"
                      : "No saved projects yet"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-600">
                    Save your work to see it here.
                  </p>
                </div>
              ) : (
                visibleProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`group rounded-xl border p-3 transition ${
                      project.id === currentId
                        ? "border-violet-400/25 bg-violet-500/[0.06]"
                        : "border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202334] text-violet-300">
                        <FileCode2 size={17} />
                      </div>
                      <button
                        onClick={() => openProject(project)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <p className="truncate text-xs font-medium text-slate-100">
                          {project.name}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500">
                          Updated {formatDate(project.updatedAt)}
                        </p>
                      </button>
                      {project.id === currentId && (
                        <span className="mt-1 rounded bg-violet-400/10 px-1.5 py-1 text-[9px] text-violet-300">
                          OPEN
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex justify-end gap-2 border-t border-white/[0.05] pt-2">
                      <button
                        onClick={() => {
                          openProject(project);
                          setRenameValue(project.name);
                          setRenameOpen(true);
                        }}
                        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] text-slate-500 hover:bg-white/[0.06] hover:text-white"
                      >
                        <Pencil size={11} /> Rename
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] text-slate-500 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-white/[0.07] p-4 text-[10px] leading-relaxed text-slate-600">
              Projects are stored locally in this browser. Clearing site data
              may remove them. Use ZIP export for backups.
            </div>
          </aside>
        </div>
      )}

      {/* Save As dialog */}
      {saveAsOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSaveAsOpen(false);
          }}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              saveAsProject();
            }}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#11141d] p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Save as new project
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Create a separate saved copy.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSaveAsOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/[0.06]"
              >
                <X size={15} />
              </button>
            </div>
            <label className="mb-2 block text-xs text-slate-400">
              Project name
            </label>
            <input
              autoFocus
              value={saveAsValue}
              onChange={(event) => setSaveAsValue(event.target.value)}
              placeholder="e.g. Portfolio Landing Page"
              className="w-full rounded-xl border border-white/[0.09] bg-[#090b11] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/60"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSaveAsOpen(false)}
                className="rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-white/[0.05]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!saveAsValue.trim()}
                className="rounded-lg bg-violet-500 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rename dialog */}
      {renameOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRenameOpen(false);
          }}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              renameProject();
            }}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#11141d] p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">
                Rename project
              </h2>
              <button
                type="button"
                onClick={() => setRenameOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/[0.06]"
              >
                <X size={15} />
              </button>
            </div>
            <input
              autoFocus
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value)}
              className="w-full rounded-xl border border-white/[0.09] bg-[#090b11] px-3 py-3 text-sm text-white outline-none focus:border-violet-400/60"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRenameOpen(false)}
                className="rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-white/[0.05]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!renameValue.trim()}
                className="rounded-lg bg-violet-500 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-400 disabled:opacity-40"
              >
                Rename
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#080a10] text-slate-200 flex items-center justify-center">
          <p className="text-sm text-slate-400">Loading playground...</p>
        </main>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
