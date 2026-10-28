"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

export function MobileMenu({ links }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Menu"
                className="fixed right-4 top-4 z-[70] h-14 border-2 border-foreground/15 bg-card/90 px-5 font-mono text-[11px] uppercase tracking-[0.22em] text-paper backdrop-blur">
                {open ? "Close" : "Menu"}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[65] flex flex-col justify-center gap-1 bg-ink px-6">
                        {links.map(([l, h], i) => (
                            <motion.div key={h} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                <Link href={h} onClick={() => setOpen(false)} className="font-display text-6xl tracking-tight">{l}</Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}