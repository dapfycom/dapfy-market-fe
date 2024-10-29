"use client";

import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] w-full animate-pulse rounded-md border bg-muted" />
  ),
});

interface EditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
}

export function Editor({ value, onChange, placeholder }: EditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onChange}
        preview="edit"
        className="min-h-[150px] rounded-md border border-input bg-background"
      />
    </div>
  );
}
