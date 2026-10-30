"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [big, setBig] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(!!e.target.closest?.("a, button, summary, input, select, textarea, label"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!fine) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[95]">
      <motion.div
        animate={{ width: big ? 56 : 14, height: big ? 56 : 14, opacity: big ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-signal bg-signal/10"
      />
    </motion.div>
  );
}