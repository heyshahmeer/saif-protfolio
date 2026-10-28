import Link from "next/link";
import { logoFor } from "@/lib/utils";

export function UniLogo({ u, size = 64 }) {
  const src = u.logo_url || logoFor(u.website);
  return src ? (
    <img src={src} alt="" style={{ width: size, height: size }} className="shrink-0 bg-paper object-contain p-2" />
  ) : (
    <div style={{ width: size, height: size }} className="grid shrink-0 place-items-center bg-card font-display text-3xl">
      {u.title?.[0]}
    </div>
  );
}

export function UniCard({ u }) {
  return (
    <article className="group flex flex-col border border-line bg-card/40 p-6 transition-colors duration-500 hover:border-signal/60">
      <div className="flex items-start gap-4">
        <UniLogo u={u} />
        <div className="min-w-0">
          <h3 className="font-display text-2xl leading-tight tracking-tight">{u.title}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{u.city} · {u.province}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="border border-line px-2 py-1">{u.type}</span>
        {u.founded > 0 && <span className="border border-line px-2 py-1 text-mute">Est. {u.founded}</span>}
        {u.accepting && <span className="border border-signal/50 px-2 py-1 text-signal">Admissions open</span>}
      </div>

      {u.summary && <p className="mt-4 line-clamp-2 text-sm text-paper/60">{u.summary}</p>}
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-mute">
        {(u.programs ?? []).slice(0, 3).map((p) => <span key={p}>#{p}</span>)}
      </div>

      <div className="mt-auto flex gap-3 pt-6 font-mono text-[11px] uppercase tracking-[0.2em]">
        <Link href={`/universities/${u.slug}`} className="flex-1 border border-line px-4 py-3 text-center transition-colors hover:border-paper">Details</Link>
        <Link href={`/apply?uni=${u.slug}`} className="flex-1 bg-signal px-4 py-3 text-center text-ink transition-transform hover:-translate-y-0.5">Apply</Link>
      </div>
    </article>
  );
}