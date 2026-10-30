"use client";
import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function GalleryField({ name, defaultValue = [], max = 5, folder = "gallery" }) {
  const [urls, setUrls] = useState(Array.isArray(defaultValue) ? defaultValue : []);
  const [busy, setBusy] = useState(false);

  async function onPick(e) {
    const files = Array.from(e.target.files ?? []).slice(0, max - urls.length);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    const supabase = createClient();
    const added = [];
    for (const file of files) {
      const path = `${folder}/${crypto.randomUUID()}-${file.name.replace(/\s+/g, "-")}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000" });
      if (error) { toast.error(`${file.name}: ${error.message}`); continue; }
      added.push(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    }
    setUrls((u) => [...u, ...added].slice(0, max));
    setBusy(false);
    if (added.length) toast.success(`${added.length} uploaded. Press Save to publish.`);
  }

  const move = (i, d) =>
    setUrls((u) => {
      const a = [...u], j = i + d;
      if (j < 0 || j >= a.length) return a;
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    });
  const remove = (i) => setUrls((u) => u.filter((_, k) => k !== i));

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={JSON.stringify(urls)} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {urls.map((u, i) => (
          <div key={u} className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
            <img src={u} alt="" className="h-full w-full object-cover" />
            <span className="absolute left-2 top-2 bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white">{i + 1}</span>
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/60 px-2 py-1 text-xs text-white">
              <button type="button" onClick={() => move(i, -1)}>←</button>
              <button type="button" onClick={() => remove(i)}>Remove</button>
              <button type="button" onClick={() => move(i, 1)}>→</button>
            </div>
          </div>
        ))}
      </div>
      {urls.length < max && (
        <input
          type="file" accept="image/*" multiple onChange={onPick} disabled={busy}
          className="block w-full text-sm text-mute file:mr-4 file:rounded file:border file:border-line file:bg-transparent file:px-4 file:py-2 file:text-paper hover:file:border-signal"
        />
      )}
      <p className="text-xs text-mute">
        {busy ? "Uploading…" : `${urls.length}/${max} photos. Order matters: photo 1 is the large tile.`}
      </p>
    </div>
  );
}