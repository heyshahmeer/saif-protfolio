"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { SocialIcon, labelFor } from "./social-icon";
import { Magnetic } from "./magnetic";

const ease = [0.16, 1, 0.3, 1];

// Delete any line here to remove a floating chip.
const FORMULAS = [
  { t: "det A ≠ 0", c: "-left-6 top-12" },
  { t: "x² + y² = r²", c: "-right-5 top-[38%]" },
  { t: "lim x→0", c: "-left-10 bottom-32" },
];

function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const m = String(value).match(/^(\d[\d,]*)(.*)$/);
  const target = m ? parseInt(m[1].replace(/,/g, ""), 10) : null;
  const suffix = m ? m[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target == null) return;
    const c = animate(0, target, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, target]);

  if (target == null) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{n.toLocaleString("en")}{suffix}</span>;
}

function Backdrop() {
  const grid = "linear-gradient(to right, oklch(0.148 0.004 228.8 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.148 0.004 228.8 / 0.06) 1px, transparent 1px)";
  const mask = "radial-gradient(ellipse 70% 60% at 35% 30%, black, transparent 75%)";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: grid, backgroundSize: "64px 64px", maskImage: mask, WebkitMaskImage: mask }}
      />
      <svg viewBox="0 0 1200 700" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-signal">
        <motion.path
          d="M-20 430 C 160 110, 330 110, 470 370 S 760 650, 910 340 S 1110 110, 1230 250"
          fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, ease, delay: 0.4 }}
        />
        <motion.path
          d="M-20 520 C 200 300, 380 640, 600 460 S 980 220, 1230 420"
          fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease, delay: 0.8 }}
        />
      </svg>
      <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-signal/10 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-chart-1/20 blur-3xl" />
    </div>
  );
}

export function Hero({ name, eyebrow, headline, sub, stats = [], portrait, socials = {} }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const cardX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const cardY = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const chipX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const chipY = useTransform(sy, [-0.5, 0.5], [16, -16]);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  const yt = socials?.youtube;
  const main = yt || socials?.instagram;
  const mainLabel = yt ? "Subscribe on YouTube ↗" : "Follow on Instagram ↗";
  const links = Object.entries(socials ?? {}).filter(([, u]) => u);
  const first = stats[0];
  const sentences = headline.split(/(?<=\.)\s+/);
  let idx = 0;

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative isolate overflow-hidden px-6 pb-16 pt-36 md:px-12 md:pt-40"
    >
      <Backdrop />

      <div className="grid min-h-[calc(100svh-10rem)] items-stretch gap-14 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-12 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {first ? `${first.value} ${first.label}` : "Now teaching"}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">{eyebrow || "Academic coaching"}</span>
          </motion.div>

          <h1 className="font-display text-[clamp(3rem,7.2vw,8.5rem)] leading-[0.92] tracking-[-0.035em]">
            {sentences.map((sent, si) => (
              <span key={si} className={`block ${si > 0 ? "italic text-signal" : ""}`}>
                {sent.split(" ").map((w) => {
                  const i = idx++;
                  return (
                    <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                      <motion.span
                        className="inline-block" initial={{ y: "115%" }} animate={{ y: 0 }}
                        transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.07 }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.9 }}
            className="space-y-8"
          >
            <p className="max-w-xl text-lg text-paper/80 md:text-xl">{sub}</p>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
              <Magnetic>
                {main ? (
                  <a href={main} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-full bg-signal px-7 py-4 text-ink">
                    <span className="relative z-10">{mainLabel}</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
                  </a>
                ) : (
                  <Link href="/videos" className="group relative block overflow-hidden rounded-full bg-signal px-7 py-4 text-ink">
                    <span className="relative z-10">Watch ▶</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
                  </Link>
                )}
              </Magnetic>
              <Magnetic>
                <Link href="/notes" className="block rounded-full border border-border px-7 py-4 transition-colors hover:border-signal hover:bg-signal/10 hover:text-signal">Study notes</Link>
              </Magnetic>
              <Link href="/universities" className="px-3 py-4 text-mute transition-colors hover:text-signal">Browse universities →</Link>
            </div>

            {links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {links.map(([k, u]) => (
                  <a key={k} href={u} target="_blank" rel="noreferrer" aria-label={labelFor(k)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:bg-signal hover:text-ink">
                    <SocialIcon name={k} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="relative lg:col-span-5"
        >
          <motion.div style={{ x: cardX, y: cardY }} className="relative h-full min-h-[520px]">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-primary/30" />

            <div className="relative h-full rounded-2xl border border-border bg-card p-3 shadow-xl shadow-primary/10">
              <div className="relative h-full min-h-[496px] overflow-hidden rounded-xl bg-secondary">
                {portrait ? (
                  <img src={portrait} alt={name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-card to-secondary">
                    <span className="font-display text-[11rem] leading-none text-foreground/10">
                      {name.split(/[\s_]+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pb-12 font-mono text-[11px] uppercase tracking-[0.22em] text-white">{name}</div>
              </div>
            </div>

            {FORMULAS.map((f, i) => (
              <motion.div key={f.t} style={{ x: chipX, y: chipY }} className={`absolute z-10 hidden md:block ${f.c}`}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-2xl border border-border bg-card px-4 py-2 font-mono text-xs shadow-xl shadow-primary/10"
                >
                  {f.t}
                </motion.div>
              </motion.div>
            ))}

            {yt && (
              <a href={yt} target="_blank" rel="noreferrer"
                className="absolute -bottom-6 left-6 right-6 z-10 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:border-signal">
                <span className="grid h-12 w-12 shrink-0 place-items-center bg-signal text-ink"><SocialIcon name="youtube" /></span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-2xl leading-none">{name}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                    {first ? `${first.value} ${first.label}` : "Watch on YouTube"}
                  </span>
                </span>
                <span className="ml-auto">↗</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {stats.length > 0 && (
        <dl className="relative mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-8">
              <dd className="font-display text-5xl tracking-tight md:text-7xl"><CountUp value={s.value} /></dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{s.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-12 hidden items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-mute md:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-signal"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}