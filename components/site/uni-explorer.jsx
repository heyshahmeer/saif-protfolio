"use client";
import { useMemo, useState } from "react";
import { UniCard } from "./uni-card";

function Chip({ on, children, ...p }) {
  return (
    <button
      type="button" {...p}
      className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
        on ? "border-signal bg-signal text-ink" : "border-line text-mute hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

export function UniExplorer({ unis }) {
  const [q, setQ] = useState("");
  const [province, setProvince] = useState("All");
  const [type, setType] = useState("All");
  const [program, setProgram] = useState("All");

  const provinces = useMemo(() => ["All", ...new Set(unis.map((u) => u.province).filter(Boolean))], [unis]);
  const programs = useMemo(() => ["All", ...[...new Set(unis.flatMap((u) => u.programs ?? []))].sort()], [unis]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return unis
      .filter((u) =>
        (province === "All" || u.province === province) &&
        (type === "All" || u.type === type) &&
        (program === "All" || (u.programs ?? []).includes(program)) &&
        (!t || `${u.title} ${u.city}`.toLowerCase().includes(t))
      )
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));
  }, [unis, q, province, type, program]);

  return (
    <div>
      <input
        value={q} onChange={(e) => setQ(e.target.value)}
        placeholder="Search by university or city…"
        className="w-full border-b border-line bg-transparent pb-5 font-display text-3xl tracking-tight outline-none placeholder:text-mute focus:border-signal md:text-5xl"
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {provinces.map((p) => <Chip key={p} on={province === p} onClick={() => setProvince(p)}>{p}</Chip>)}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {["All", "Public", "Private"].map((t) => <Chip key={t} on={type === t} onClick={() => setType(t)}>{t}</Chip>)}
        <select
          value={program} onChange={(e) => setProgram(e.target.value)}
          className="ml-auto rounded-2xl border border-border bg-transparent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] outline-none focus:border-signal [&>option]:bg-ink"
        >
          {programs.map((p) => <option key={p} value={p}>{p === "All" ? "All programs" : p}</option>)}
        </select>
      </div>

      <p className="mb-8 mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
        {list.length} {list.length === 1 ? "university" : "universities"}
      </p>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((u) => <UniCard key={u.id} u={u} />)}
      </div>
      {!list.length && <p className="py-20 text-center text-mute">No matches. Try clearing a filter.</p>}
    </div>
  );
}