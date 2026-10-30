import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { Topics } from "@/components/site/topics";
import { ScrollGallery } from "@/components/site/scroll-gallery";
import { SocialIcon, handleFor, labelFor } from "@/components/site/social-icon";
import { SOCIALS } from "@/lib/socials";
import { getSettings } from "@/lib/queries";

export const revalidate = 60;

const MISSION = [
  ["Make maths easy", "FSc and university maths, from matrices and determinants to Linear Algebra, taught for understanding instead of memorising."],
  ["Make technology useful", "AI tools, computer science and programming explained so students can actually use them."],
  ["Make students future-ready", "Admissions, scholarships and career guidance, so the next step is chosen with clear information."],
];

const eyebrow = "mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal";

function Block({ label, title, children }) {
  return (
    <section className="px-6 pb-24 md:px-12">
      <Reveal className="mb-12">
        <p className={eyebrow}>{label}</p>
        <h2 className="font-display text-5xl tracking-tight md:text-7xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

export default async function About() {
  const s = await getSettings();
  const gallery = Array.isArray(s.gallery) ? s.gallery.filter(Boolean) : [];
  const stats = Array.isArray(s.stats) ? s.stats : [];
  const socials = Object.entries(SOCIALS);
  const initials = (s.name ?? "").split(/[\s_]+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <div className="pb-16">
      <section className="px-6 pb-24 pt-40 md:px-12">
        <p className={eyebrow}>About</p>
        <h1 className="font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.035em]">
          Meet <em className="text-signal">{s.name}.</em>
        </h1>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="space-y-8 lg:col-span-7">
            {s.bio && <p className="font-display text-3xl leading-[1.15] tracking-tight md:text-5xl">{s.bio}</p>}
            {s.subline && <p className="max-w-xl text-lg text-paper/80">{s.subline}</p>}
            <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
              <Link href="/videos" className="rounded-full bg-signal px-7 py-4 text-ink transition-transform hover:-translate-y-0.5">Watch the videos</Link>
              <Link href="/universities" className="rounded-full border border-border px-7 py-4 transition-colors hover:border-signal hover:text-signal">Browse universities</Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-card p-3 shadow-xl shadow-primary/10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                {s.portrait_url ? (
                  <img src={s.portrait_url} alt={s.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center font-display text-[10rem] leading-none text-foreground/10">{initials}</div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="px-6 pb-24 md:px-12">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {stats.map((x) => (
              <div key={x.label} className="bg-card p-8">
                <dd className="font-display text-5xl tracking-tight md:text-7xl">{x.value}</dd>
                <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{x.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      <Block label="Mission" title="Three promises.">
        <div className="grid gap-5 md:grid-cols-3">
          {MISSION.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 md:p-10">
                <p className="font-display text-7xl leading-none text-signal/70">{i + 1}</p>
                <h3 className="mt-8 font-display text-3xl tracking-tight md:text-4xl">{t}</h3>
                <p className="mt-3 text-paper/80">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block label="Topics" title="What you’ll learn.">
        <Topics />
      </Block>

      {gallery.length > 0 && (
        <section className="pb-24">
          <div className="px-6 md:px-12">
            <Reveal className="mb-8">
              <p className={eyebrow}>Gallery</p>
              <h2 className="font-display text-5xl tracking-tight md:text-7xl">Inside the academy.</h2>
            </Reveal>
          </div>
          <ScrollGallery images={gallery} />
        </section>
      )}

      {socials.length > 0 && (
        <Block label="Follow" title="Find us everywhere.">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {socials.map(([k, u], i) => (
              <Reveal key={k} delay={(i % 3) * 0.06}>
                <a
                  href={u} target="_blank" rel="noreferrer"
                  className="group flex items-center justify-between gap-6 rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal md:p-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-border transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                      <SocialIcon name={k} />
                    </span>
                    <div>
                      <p className="font-display text-3xl tracking-tight">{labelFor(k)}</p>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{handleFor(k, u)}</p>
                    </div>
                  </div>
                  <span className="text-xl transition-transform duration-500 group-hover:translate-x-1">↗</span>
                </a>
              </Reveal>
            ))}
          </div>
        </Block>
      )}
    </div>
  );
}