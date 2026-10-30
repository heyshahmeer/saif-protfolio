import Link from "next/link";
import { Reveal } from "./reveal";

const TOPICS = [
  ["Mathematics & Linear Algebra", "/notes", "Σ"],
  ["AI Tools & Programming", "/videos", "{ }"],
  ["Admissions & Scholarships", "/universities", "A+"],
  ["Career Guidance", "/universities", "→"],
  ["Study Tips & Vlogs", "/videos", "Aa"],
  ["Informative Videos", "/videos", "i"],
];

export function Topics() {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {TOPICS.map(([title, href, sym], i) => (
        <Reveal key={title} delay={(i % 3) * 0.07} className="bg-card">
          <Link
            href={href}
            className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden p-7 transition-colors duration-500 hover:bg-signal hover:text-ink md:aspect-[4/3] md:p-9"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] tracking-[0.22em] opacity-60">{String(i + 1).padStart(2, "0")}</span>
              <span className="-translate-x-2 translate-y-2 text-2xl opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">↗</span>
            </div>
            <span className="pointer-events-none absolute -bottom-8 -right-2 font-display text-[11rem] leading-none text-foreground/[0.05] transition-all duration-700 group-hover:-translate-y-3 group-hover:text-ink/15">
              {sym}
            </span>
            <h3 className="relative font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">{title}</h3>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}