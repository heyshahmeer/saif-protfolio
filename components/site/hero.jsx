"use client";
import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

export function Hero({ name, eyebrow, headline, sub, stats = [], portrait, socials = {} }) {
  const ig = socials?.instagram;
  return (
    <section className="px-6 pb-12 pt-40 md:px-12">
      <div className="grid min-h-[calc(100svh-12rem)] gap-10 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-12 lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
            {name} <span className="text-signal">/</span> {eyebrow || "Academic coaching"}
          </p>

          <h1 className="font-display text-[clamp(3.5rem,9vw,10rem)] leading-[0.9] tracking-[-0.035em]">
            {headline.split(" ").map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "115%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.07 }}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-md text-lg text-paper/70">{sub}</p>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
              {ig ? (
                <a href={ig} target="_blank" rel="noreferrer" className="bg-signal px-6 py-4 text-ink transition-transform hover:-translate-y-0.5">Follow on Instagram ↗</a>
              ) : (
                <Link href="/videos" className="bg-signal px-6 py-4 text-ink transition-transform hover:-translate-y-0.5">Watch ▶</Link>
              )}
              <Link href="/notes" className="border-2 border-foreground/15 px-6 py-4 transition-colors hover:border-signal hover:text-signal">Study notes</Link>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="lg:col-span-4"
        >
          <div className="h-full min-h-[460px] border-2 border-foreground/15 bg-card p-3 shadow-[12px_12px_0_0_rgb(31_93_76/0.14)]">
            <div className="relative h-full min-h-[436px] overflow-hidden bg-secondary">
              {portrait ? (
                <img src={portrait} alt={name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-card to-secondary font-display text-[12rem] text-foreground/10">∫</div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white">{name}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {stats.length > 0 && (
        <dl className="mt-14 grid grid-cols-2 gap-px border-2 border-foreground/15 bg-line md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-8">
              <dd className="font-display text-5xl tracking-tight md:text-6xl">{s.value}</dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{s.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}