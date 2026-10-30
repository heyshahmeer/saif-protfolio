import { SOCIALS } from "@/lib/socials";
import { SocialIcon, handleFor, labelFor } from "./social-icon";

export function SocialLinks() {
  return (
    <section className="px-6 pb-12 md:px-12" aria-label="Social media links">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(SOCIALS).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:bg-card"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border text-signal transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
              <SocialIcon name={key} />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-2xl tracking-tight">{labelFor(key)}</span>
              <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-[0.16em] text-mute">{handleFor(key, url)}</span>
            </span>
            <span className="ml-auto text-mute transition-transform group-hover:translate-x-1 group-hover:text-signal">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
