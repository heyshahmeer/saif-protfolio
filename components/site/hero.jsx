"use client";
import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

export function Hero({ name, headline, sub, stats = [], portrait }) {
  return (
    <section className="px-6 pb-12 pt-36 md:px-12">
      <div className="grid min-h-[calc(100svh-12rem)] gap-10 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-12 lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
            {name} <span className="text-signal">/</span> Professor &amp; Creator
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
            <div className="flex gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
              <Link href="/videos" className="bg-signal px-6 py-4 text-ink transition-transform hover:-translate-y-0.5">Watch ▶</Link>
              <Link href="/notes" className="border border-line px-6 py-4 transition-colors hover:border-signal hover:text-signal">Read notes</Link>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
          className="relative min-h-[420px] overflow-hidden border border-line lg:col-span-4"
        >
          {portrait ? (
            <img src={portrait} alt={name} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#1d1d20] to-[#0b0b0c] font-display text-[12rem] text-white/10">{name?.[0]}</div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 font-mono text-[11px] uppercase tracking-[0.22em]">{name}</div>
        </motion.div>
      </div>

      {stats.length > 0 && (
        <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8">
              <dd className="font-display text-6xl tracking-tight">{s.value}</dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{s.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}