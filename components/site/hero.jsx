"use client";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

export function Hero({ name, headline, sub, stats = [] }) {
  return (
    <section className="flex min-h-svh flex-col justify-between px-6 pb-12 pt-40 md:px-12">
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
        className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute"
      >
        {name} <span className="text-signal">/</span> Professor &amp; Creator
      </motion.p>

      <h1 className="max-w-[15ch] font-display text-[clamp(3.5rem,11vw,12rem)] leading-[0.9] tracking-[-0.035em]">
        {headline.split(" ").map((w, i) => (
          <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className="inline-block" initial={{ y: "115%" }} animate={{ y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.07 }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h1>

      <div className="grid items-end gap-10 border-t border-line pt-8 md:grid-cols-12">
        <p className="max-w-md text-lg text-paper/70 md:col-span-5">{sub}</p>
        <dl className="flex gap-14 md:col-span-7 md:justify-end">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-5xl tracking-tight">{s.value}</dd>
              <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}