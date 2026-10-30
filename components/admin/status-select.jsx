"use client";
import { useTransition } from "react";
import { setStatus } from "@/lib/actions/applications";

export function StatusSelect({ id, value }) {
  const [pending, start] = useTransition();
  return (
    <select
      defaultValue={value} disabled={pending}
      onChange={(e) => start(() => setStatus(id, e.target.value))}
      className="rounded-2xl border border-border bg-transparent px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] outline-none focus:border-signal disabled:opacity-50 [&>option]:bg-ink"
    >
      {["new", "contacted", "forwarded", "closed"].map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}