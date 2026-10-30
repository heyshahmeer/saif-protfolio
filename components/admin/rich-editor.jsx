"use client";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

function Btn({ on, label, active }) {
  return (
    <button
      type="button" onClick={on}
      className={`rounded px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider ${active ? "bg-signal text-ink" : "text-mute hover:text-paper"}`}
    >
      {label}
    </button>
  );
}

export function RichEditor({ name, defaultValue = "" }) {
  const [html, setHtml] = useState(defaultValue);
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false } }), Image],
    content: defaultValue,
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: { attributes: { class: "prose-premium min-h-[420px] px-5 py-4 outline-none" } },
  });
  if (!editor) return null;

  return (
    <div className="rounded rounded-2xl border border-border">
      <input type="hidden" name={name} value={html} />
      <div className="flex flex-wrap gap-1 border-b border-line p-2">
        <Btn label="B" active={editor.isActive("bold")} on={() => editor.chain().focus().toggleBold().run()} />
        <Btn label="I" active={editor.isActive("italic")} on={() => editor.chain().focus().toggleItalic().run()} />
        <Btn label="H2" active={editor.isActive("heading", { level: 2 })} on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <Btn label="H3" active={editor.isActive("heading", { level: 3 })} on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
        <Btn label="List" active={editor.isActive("bulletList")} on={() => editor.chain().focus().toggleBulletList().run()} />
        <Btn label="Quote" active={editor.isActive("blockquote")} on={() => editor.chain().focus().toggleBlockquote().run()} />
        <Btn label="Code" active={editor.isActive("codeBlock")} on={() => editor.chain().focus().toggleCodeBlock().run()} />
        <Btn label="Link" on={() => { const u = prompt("URL"); if (u) editor.chain().focus().setLink({ href: u }).run(); }} />
        <Btn label="Image" on={() => { const u = prompt("Image URL (upload it via a file field first)"); if (u) editor.chain().focus().setImage({ src: u }).run(); }} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}