"use client";
import { useEffect, useState } from "react";
import { RichEditor } from "./rich-editor";
import { FileUpload } from "./file-upload";
import { GalleryField } from "./gallery-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const toLines = (v) => (v ?? []).map((s) => `${s.label}: ${s.value}`).join("\n");
const socialsToLines = (v) => Object.entries(v ?? {}).map(([k, u]) => `${k}: ${u}`).join("\n");

function Field({ f, value }) {
  const base = { name: f.name, required: f.required };
  if (f.type === "switch")
    return (
      <div className="flex items-center gap-3">
        <Switch name={f.name} defaultChecked={value ?? f.default ?? false} />
        <Label>{f.label}</Label>
      </div>
    );

  let control;
  switch (f.type) {
    case "textarea": control = <Textarea {...base} rows={f.rows ?? 4} defaultValue={value ?? ""} />; break;
    case "rich": control = <RichEditor name={f.name} defaultValue={value ?? ""} />; break;
    case "image": control = <FileUpload name={f.name} folder={f.folder ?? "images"} accept="image/*" defaultValue={value ?? ""} />; break;
    case "file": control = <FileUpload name={f.name} folder={f.folder ?? "files"} accept={f.accept} defaultValue={value ?? ""} />; break;
    case "gallery": control = <GalleryField name={f.name} defaultValue={Array.isArray(value) ? value : []} />; break;
    case "number": control = <Input {...base} type="number" defaultValue={value ?? (f.nullable ? "" : 0)} />; break;
    case "select":
      control = (
        <select name={f.name} required={f.required} defaultValue={value ?? ""}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus:border-ring">
          <option value="" className="bg-card">Select…</option>
          {f.options.map((o) => <option key={o} value={o} className="bg-card">{o}</option>)}
        </select>
      );
      break;
    case "tags": control = <Input {...base} defaultValue={(value ?? []).join(", ")} placeholder="Maths, FSc, Linear Algebra" />; break;
    case "stats": control = <Textarea {...base} rows={4} defaultValue={toLines(value)} placeholder="Subscribers: 398" />; break;
    case "socials": control = <Textarea {...base} rows={6} defaultValue={socialsToLines(value)} placeholder="youtube: https://youtube.com/@al_saifacademy" />; break;
    default: control = <Input {...base} type={f.type === "url" ? "url" : "text"} defaultValue={value ?? ""} />;
  }
  return (
    <div className="space-y-2">
      <Label>{f.label}</Label>
      {control}
    </div>
  );
}

export function ResourceForm({ title, fields, values = {}, action, id }) {
  const [status, setStatus] = useState(null);
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    setStatus(null);
    try {
      const res = await action(null, fd);
      setStatus(res ?? null);
    } catch (err) {
      if (String(err?.digest ?? err?.message).includes("NEXT_REDIRECT")) throw err;
      setStatus({ error: err?.message || "Save failed" });
    } finally {
      setPending(false);
    }
  }

  return (
    <form method="post" onSubmit={onSubmit} className="max-w-3xl space-y-8">
      <h1 className="font-display text-6xl tracking-tight">{title}</h1>
      {id && <input type="hidden" name="id" value={id} />}
      {fields.map((f) => (
        <Field key={f.name} f={f} value={values[f.name]} />
      ))}
      {status?.error && <p className="break-words text-sm text-destructive">Error: {status.error}</p>}
      {status?.ok && <p className="text-sm text-signal">Saved ✓</p>}
      <button
        type="submit"
        disabled={pending || !ready}
        className="bg-signal px-8 py-3 font-mono text-xs uppercase tracking-[0.22em] text-ink disabled:opacity-50"
      >
        {!ready ? "Loading…" : pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}