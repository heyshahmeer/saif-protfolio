"use client";
import { useEffect, useState } from "react";
import { submitApplication } from "@/lib/actions/apply";

const field =
  "w-full border border-white/20 bg-transparent px-4 py-3 text-paper outline-none placeholder:text-mute focus:border-signal [&>option]:bg-ink";
const label = "mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-mute";

export function ApplyForm({ unis, selected = "" }) {
  const [status, setStatus] = useState(null);
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setPending(true);
    setStatus(null);
    try {
      const res = await submitApplication(null, new FormData(form));
      setStatus(res);
      if (res?.ok) form.reset();
    } catch {
      setStatus({ error: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  }

  if (status?.ok)
    return (
      <div className="max-w-xl border border-signal/50 p-10">
        <p className="font-display text-5xl tracking-tight">Application received.</p>
        <p className="mt-4 text-paper/70">We have your details and will contact you on the email or phone number you gave.</p>
      </div>
    );

  return (
    <form method="post" onSubmit={onSubmit} className="grid max-w-3xl gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className={label}>University *</label>
        <select name="university_id" required defaultValue={selected} className={field}>
          <option value="">Choose a university…</option>
          {unis.map((u) => <option key={u.id} value={u.id}>{u.title}, {u.city}</option>)}
        </select>
      </div>
      <div><label className={label}>Program / degree</label><input name="program" placeholder="BS Computer Science" className={field} /></div>
      <div><label className={label}>Full name *</label><input name="full_name" required autoComplete="name" className={field} /></div>
      <div><label className={label}>Email *</label><input name="email" type="email" required autoComplete="email" className={field} /></div>
      <div><label className={label}>Phone / WhatsApp *</label><input name="phone" type="tel" required autoComplete="tel" placeholder="03xx xxxxxxx" className={field} /></div>
      <div><label className={label}>Your city</label><input name="city" className={field} /></div>
      <div>
        <label className={label}>Last qualification</label>
        <select name="qualification" defaultValue="" className={field}>
          <option value="">Select…</option>
          {["Matric", "Intermediate / A-Level", "Bachelor’s", "Master’s"].map((q) => <option key={q} value={q}>{q}</option>)}
        </select>
      </div>
      <div><label className={label}>Marks / grade</label><input name="marks" placeholder="e.g. 82%" className={field} /></div>
      <div className="md:col-span-2">
        <label className={label}>Message</label>
        <textarea name="message" rows={4} maxLength={1500} className={field} />
      </div>

      {/* honeypot: hidden from humans */}
      <input name="company" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />

      {status?.error && <p className="text-sm text-signal md:col-span-2">{status.error}</p>}
      <button
        type="submit" disabled={pending || !ready}
        className="bg-signal px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ink disabled:opacity-50 md:col-span-2"
      >
        {!ready ? "Loading…" : pending ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}