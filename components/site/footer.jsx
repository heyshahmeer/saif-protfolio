import Link from "next/link";
import { SocialIcon, handleFor, labelFor } from "./social-icon";

const explore = [["Home", "/"], ["Videos", "/videos"], ["Notes", "/notes"], ["Universities", "/universities"], ["About", "/about"], ["Apply", "/apply"]];

export function Footer({ name, tagline, socials = {} }) {
  const entries = Object.entries(socials).filter(([, u]) => u);
  return (
    <footer className="mt-20 border-t border-line px-6 pb-10 pt-24 md:px-12">
      <p className="font-display text-[clamp(3rem,13vw,13rem)] leading-[0.85] tracking-[-0.04em]">
        Learn it. <em className="text-signal">Solve it.</em>
      </p>

      <div className="mt-20 grid gap-12 border-t border-line pt-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-4xl tracking-tight">{name}</p>
          {tagline && <p className="mt-3 max-w-sm text-paper/80">{tagline}</p>}
        </div>

        <nav className="md:col-span-3">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-mute">Explore</p>
          <ul className="space-y-3">
            {explore.map(([l, h]) => (
              <li key={h}><Link href={h} className="transition-colors hover:text-signal">{l}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-mute">Follow</p>
          <ul className="space-y-3">
            {entries.map(([k, u]) => (
              <li key={k}>
                <a href={u} target="_blank" rel="noreferrer" className="group flex items-center gap-3 transition-colors hover:text-signal">
                  <SocialIcon name={k} />
                  <span>{labelFor(k)}</span>
                  <span className="font-mono text-[11px] tracking-[0.15em] text-mute">{handleFor(k, u)}</span>
                  <span className="ml-auto transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
        <p>© {new Date().getFullYear()} {name}</p>
        <p>Pakistan · On YouTube since January 2026</p>
      </div>
    </footer>
  );
}