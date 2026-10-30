"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1];
const origin = "calc(100% - 2.75rem) 2.75rem";

export function MobileMenu({ links }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  const active = (h) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)} aria-label="Menu"
        className="fixed right-4 top-4 z-[70] grid h-14 w-14 place-items-center rounded-full border border-border bg-card/90 backdrop-blur active:scale-95"
      >
        <span className="relative block h-3 w-6">
          <motion.span className="absolute left-0 top-0 h-[2px] w-6 bg-foreground" animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }} />
          <motion.span className="absolute bottom-0 left-0 h-[2px] w-6 bg-foreground" animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: `circle(0% at ${origin})` }}
            animate={{ clipPath: `circle(150% at ${origin})` }}
            exit={{ clipPath: `circle(0% at ${origin})` }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[65] flex flex-col justify-center bg-background px-6"
          >
            {links.map(([l, h], i) => (
              <motion.div
                key={h} className="border-b border-line"
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease }}
              >
                <Link href={h} className={`flex items-baseline gap-4 py-4 font-display text-6xl tracking-tight ${active(h) ? "italic text-signal" : ""}`}>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-mute">{String(i + 1).padStart(2, "0")}</span>
                  {l}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}