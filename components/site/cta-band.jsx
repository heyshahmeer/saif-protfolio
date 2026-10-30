"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function CtaBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <div ref={ref}>
      <Link
        href="/universities"
        className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-10 transition-colors duration-700 hover:bg-signal hover:text-ink md:p-20"
      >
        <p className="relative font-display text-6xl leading-[0.95] tracking-tight md:text-9xl">
          Pick your <em>university.</em>
        </p>
        <span className="relative mt-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
          Explore
          <span className="transition-transform duration-500 group-hover:translate-x-3">→</span>
        </span>
        <motion.span
          style={{ y, rotate }}
          className="pointer-events-none absolute -right-10 -top-10 font-display text-[22rem] leading-none text-foreground/[0.05] transition-colors duration-700 group-hover:text-ink/10"
        >
          U
        </motion.span>
      </Link>
    </div>
  );
}