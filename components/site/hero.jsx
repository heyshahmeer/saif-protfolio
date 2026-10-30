
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView } from "motion/react";
import { Magnetic } from "./magnetic";
import { SOCIALS } from "@/lib/socials";

const ease = [0.16, 1, 0.3, 1];

function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const match = String(value).match(/^(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target == null) return;

    const animation = animate(0, target, {
      duration: 1.8,
      ease,
      onUpdate: (v) => setN(Math.round(v)),
    });

    return () => animation.stop();
  }, [inView, target]);

  if (target == null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {n.toLocaleString("en")}
      {suffix}
    </span>
  );
}

export function Hero({
  name,
  eyebrow,
  headline,
  sub,
  stats = [],
}) {
  const main = SOCIALS.youtube;
  const first = stats[0];
  const sentences = headline.split(/(?<=\.)\s+/);
  let wordIndex = 0;

  return (
    <section className="relative isolate overflow-hidden px-6 pb-16 pt-36 md:px-12 md:pt-40">
      <div className="grid min-h-[calc(100svh-10rem)] items-center gap-14 lg:grid-cols-12">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-between gap-12 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>

              {first
                ? `${first.value} ${first.label}`
                : "Now teaching"}
            </span>

            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
              {eyebrow || "Academic coaching"}
            </span>
          </motion.div>

          {/* HEADLINE */}
          <div className="relative">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-signal" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute">
                01 / Introduction
              </span>
            </div>

            <h1 className="font-display text-[clamp(3rem,7.2vw,8.5rem)] leading-[0.92] tracking-[-0.035em]">
              {sentences.map((sentence, sentenceIndex) => (
                <span
                  key={sentenceIndex}
                  className={`block ${sentenceIndex > 0 ? "italic text-signal" : ""
                    }`}
                >
                  {sentence.split(" ").map((word) => {
                    const index = wordIndex++;

                    return (
                      <span
                        key={index}
                        className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom"
                      >
                        <motion.span
                          className="inline-block"
                          initial={{ y: "115%" }}
                          animate={{ y: 0 }}
                          transition={{
                            duration: 1.1,
                            ease,
                            delay: 0.15 + index * 0.07,
                          }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-12 bg-border" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-mute">
                KNOWLEDGE / EXPERIENCE / GROWTH
              </span>
            </div>
          </div>

          {/* DESCRIPTION AND LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.9 }}
            className="space-y-8 border-t border-border/70 pt-8"
          >
            <p className="max-w-xl text-lg leading-relaxed text-paper/80 md:text-xl">
              {sub}
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
              <Magnetic>
                {main ? (
                  <a
                    href={main}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block overflow-hidden rounded-full bg-signal px-7 py-4 text-ink transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="relative z-10">Subscribe on YouTube ↗</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
                  </a>
                ) : (
                  <Link
                    href="/videos"
                    className="group relative block overflow-hidden rounded-full bg-signal px-7 py-4 text-ink transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="relative z-10">Watch ▶</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
                  </Link>
                )}
              </Magnetic>

              <Magnetic>
                <Link
                  href="/notes"
                  className="block rounded-full border border-border px-7 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:bg-signal/10 hover:text-signal"
                >
                  Study notes
                </Link>
              </Magnetic>

              <Link
                href="/universities"
                className="px-3 py-4 text-mute transition-colors hover:text-signal"
              >
                Browse universities →
              </Link>
            </div>

          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="flex items-center justify-center lg:col-span-5"
        >
          <motion.div
            whileHover={{ y: -8 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
            }}
            className="group relative w-full max-w-[520px]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-primary/10">

              <motion.img
                src="/al_saif_academy_hero_4x5.webp"
                alt={`${name} Academy`}
                loading="eager"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-contain"
              />

            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* STATISTICS */}
      {stats.length > 0 && (
        <dl className="relative mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-card p-8 transition-colors duration-300 hover:bg-secondary/70"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.2em] text-mute">
                  0{index + 1} / METRIC
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-border transition-colors duration-300 group-hover:bg-signal" />
              </div>

              <dd className="font-display text-5xl tracking-tight transition-transform duration-300 group-hover:-translate-y-1 md:text-7xl">
                <CountUp value={stat.value} />
              </dd>

              <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      )}

      {/* SCROLL INDICATOR */}
      <div className="mt-12 hidden items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-mute md:flex">
        Scroll

        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-signal"
            animate={{ y: [-16, 40] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>
      </div>
    </section>
  );
}
