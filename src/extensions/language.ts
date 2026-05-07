import { createSignal } from "solid-js";

export type EditorLanguageKeys = keyof typeof editorLanguageExtension;

export const [editorLanguage, setEditorLanguage] = createSignal<EditorLanguageKeys>("markdown");

export const editorLanguageExtension = {
  cpp: () => import("@codemirror/lang-cpp").then((x) => x.cpp()),
  css: () => import("@codemirror/lang-css").then((x) => x.css()),
  go: () => import("@codemirror/lang-go").then((x) => x.go()),
  html: () => import("@codemirror/lang-html").then((x) => x.html()),
  java: () => import("@codemirror/lang-java").then((x) => x.java()),
  javascript: () => import("@codemirror/lang-javascript").then((x) => x.javascript()),
  json: () => import("@codemirror/lang-json").then((x) => x.json()),
  jsx: () => import("@codemirror/lang-javascript").then((x) => x.javascript({ jsx: true })),
  markdown: () => import("@codemirror/lang-markdown").then((x) => x.markdown()),
  php: () => import("@codemirror/lang-php").then((x) => x.php()),
  python: () => import("@codemirror/lang-python").then((x) => x.python()),
  rust: () => import("@codemirror/lang-rust").then((x) => x.rust()),
  tsx: () => import("@codemirror/lang-javascript").then((x) => x.javascript({ jsx: true, typescript: true })),
  typescript: () => import("@codemirror/lang-javascript").then((x) => x.javascript({ typescript: true })),
  xml: () => import("@codemirror/lang-xml").then((x) => x.xml()),
  yaml: () => import("@codemirror/lang-yaml").then((x) => x.yaml())
} as const;
