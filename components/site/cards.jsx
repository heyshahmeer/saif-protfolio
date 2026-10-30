import Link from "next/link";
import { ytThumb } from "@/lib/utils";

function Placeholder({ label }) {
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-card to-secondary font-display text-8xl text-foreground/10">
      {label?.[0]}
    </div>
  );
}

export function ProjectCard({ p, index = 0 }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
        {p.cover_url ? (
          <img src={p.cover_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
        ) : (
          <Placeholder label={p.title} />
        )}
        <span className="absolute left-4 top-4 bg-ink/70 px-2 py-1 font-mono text-[11px] tracking-[0.2em] backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-4 top-4 grid h-11 w-11 -translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          ↗
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <h3 className="font-display text-4xl leading-none tracking-tight transition-colors group-hover:text-signal">{p.title}</h3>
        <p className="shrink-0 pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{p.tags?.[0]}</p>
      </div>
      {p.summary && <p className="mt-3 max-w-md text-paper/80">{p.summary}</p>}
    </Link>
  );
}

export function VideoCard({ v }) {
  return (
    <a href={v.youtube_url} target="_blank" rel="noreferrer" className="group block">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card">
        <img src={v.thumbnail_url || ytThumb(v.youtube_url)} alt={v.title} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
        <div className="absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-500 group-hover:bg-black/40">
          <span className="grid h-16 w-16 scale-75 place-items-center rounded-full bg-signal pl-1 text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">▶</span>
        </div>
      </div>
      <h3 className="mt-5 font-display text-3xl leading-tight tracking-tight transition-colors group-hover:text-signal">{v.title}</h3>
    </a>
  );
}