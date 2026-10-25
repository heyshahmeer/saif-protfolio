"use client";
import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function FileUpload({ name, folder, accept, defaultValue = "" }) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);

  async function onChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const supabase = createClient();
    const path = `${folder}/${crypto.randomUUID()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000" });
    setBusy(false);
    if (error) return toast.error(error.message);
    setUrl(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    toast.success("Uploaded");
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />
      <input
        type="file" accept={accept} onChange={onChange} disabled={busy}
        className="block w-full text-sm text-mute file:mr-4 file:rounded file:border file:border-line file:bg-transparent file:px-4 file:py-2 file:text-paper hover:file:border-signal"
      />
      {busy && <p className="font-mono text-xs text-mute">Uploading…</p>}
      {url && !busy && <p className="truncate font-mono text-xs text-mute">{url}</p>}
    </div>
  );
}