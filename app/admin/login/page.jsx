"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const field =
  "w-full border border-white/20 bg-transparent px-4 py-3 text-paper outline-none placeholder:text-mute focus:border-signal";

export default function Login() {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setMsg("Signing in…");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email")).trim(),
      password: String(fd.get("password")),
    });
    if (error) {
      setMsg("Auth error: " + error.message);
      setBusy(false);
      return;
    }

    const { data: ok } = await supabase.rpc("is_admin");
    if (!ok) {
      setMsg("Signed in, but this user is not an admin.");
      setBusy(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="grid min-h-svh place-items-center px-6">
      <form method="post" onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="mb-8 font-display text-6xl tracking-tight">Studio</h1>
        <input name="email" type="email" placeholder="Email" required autoComplete="email" className={field} />
        <input name="password" type="password" placeholder="Password" required autoComplete="current-password" className={field} />
        {msg && <p className="break-words text-sm text-signal">{msg}</p>}
        <button
          type="submit"
          disabled={busy || !ready}
          className="w-full bg-signal px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-ink disabled:opacity-50"
        >
          {!ready ? "Loading…" : busy ? "Please wait" : "Enter"}
        </button>
      </form>
    </main>
  );
}