import { SocialIcon, handleFor } from "./social-icon";

export function SocialBand({ socials = {} }) {
  const items = Object.entries(socials).filter(([, u]) => u);
  if (!items.length) return null;
  return (
    <section className="px-6 py-20 md:px-12">
      <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Follow the academy</p>
      <div className="grid gap-px border border-line bg-line md:grid-cols-2">
        {items.map(([k, u]) => (
          <a key={k} href={u} target="_blank" rel="noreferrer"
            className="group flex items-center justify-between gap-6 bg-background p-8 transition-colors hover:bg-card md:p-10">
            <div className="flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center border border-line transition-colors group-hover:border-signal group-hover:text-signal">
                <SocialIcon name={k} />
              </span>
              <div>
                <p className="font-display text-4xl capitalize tracking-tight">{k}</p>
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