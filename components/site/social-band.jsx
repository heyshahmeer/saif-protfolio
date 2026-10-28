import { SocialIcon, handleFor, labelFor } from "./social-icon";

export function SocialBand({ socials = {} }) {
  const items = Object.entries(socials).filter(([, u]) => u);
  if (!items.length) return null;
  return (
    <section className="px-6 py-20 md:px-12">
      <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Follow AL_Saif Academy</p>
      <div className="grid gap-px border-2 border-foreground/15 bg-line md:grid-cols-2 lg:grid-cols-3">
        {items.map(([k, u]) => (
          <a key={k} href={u} target="_blank" rel="noreferrer"
            className="group flex items-center justify-between gap-6 bg-card p-8 transition-colors hover:bg-secondary md:p-10">
            <div className="flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center border border-line transition-colors group-hover:border-signal group-hover:text-signal">
                <SocialIcon name={k} />
              </span>
              <div>
                <p className="font-display text-3xl tracking-tight md:text-4xl">{labelFor(k)}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{handleFor(k, u)}</p>
              </div>
            </div>
            <span className="text-2xl transition-all duration-500 group-hover:translate-x-1 group-hover:text-signal">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}