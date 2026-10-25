"use client";
import { useActionState } from "react";
import { saveNote } from "@/lib/actions/notes";
import { RichEditor } from "./rich-editor";
import { FileUpload } from "./file-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function NoteForm({ note }) {
  const [state, action, pending] = useActionState(saveNote, null);
  return (
    <form action={action} className="max-w-3xl space-y-8">
      <h1 className="font-display text-6xl tracking-tight">{note ? "Edit note" : "New note"}</h1>
      <input type="hidden" name="id" defaultValue={note?.id} />
      <div className="space-y-2"><Label>Title</Label><Input name="title" defaultValue={note?.title} required /></div>
      <div className="space-y-2"><Label>Subject</Label><Input name="subject" defaultValue={note?.subject ?? ""} /></div>
      <div className="space-y-2"><Label>Excerpt</Label><Textarea name="excerpt" defaultValue={note?.excerpt ?? ""} maxLength={280} /></div>
      <div className="space-y-2"><Label>Content</Label><RichEditor name="content" defaultValue={note?.content ?? ""} /></div>
      <div className="space-y-2">
        <Label>Attachment (PDF)</Label>
        <FileUpload name="file_url" folder="notes" accept="application/pdf" defaultValue={note?.file_url ?? ""} />
      </div>
      <div className="flex items-center gap-3">
        <Switch name="published" defaultChecked={note?.published ?? true} />
        <Label>Published</Label>
      </div>
      {state?.error && <p className="text-sm text-signal">{state.error}</p>}
      <Button disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
    </form>
  );
}