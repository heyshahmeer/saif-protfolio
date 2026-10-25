export function Footer({ name, socials = {} }) {
  return (
    <footer className="mt-20 border-t border-line px-6 pb-10 pt-24 md:px-12">
      <p className="font-display text-[clamp(3rem,13vw,13rem)] leading-[0.85] tracking-[-0.04em]">
        Let’s learn <em className="text-signal">together.</em>
      </p>
      <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
        <div className="flex flex-wrap gap-8">
          {Object.entries(socials).map(([k, u]) => (
            <a key={k} href={u} target="_blank" rel="noreferrer" className="transition-colors hover:text-signal">{k} ↗</a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} {name}</p>
      </div>
    </footer>
  );
}