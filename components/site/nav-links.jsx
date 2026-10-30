"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export function NavLinks({ links }) {
  const path = usePathname();
  const active = (h) => (h === "/" ? path === "/" : path.startsWith(h));
  return (
    <ul className="hidden items-center gap-1 rounded-full border border-border bg-card/90 p-1.5 font-mono text-[11px] uppercase tracking-[0.2em] backdrop-blur md:flex">
      {links.map(([l, h]) => (
        <li key={h} className="relative">
          <Link href={h} className={`relative z-10 block px-4 py-2.5 transition-colors ${active(h) ? "text-ink" : "text-mute hover:text-paper"}`}>
            {l}
          </Link>
          {active(h) && (
            <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-signal" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
          )}
        </li>
      ))}
    </ul>
  );
}