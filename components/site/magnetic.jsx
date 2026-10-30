"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.2 });

  function move(e) {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function leave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={{ x: sx, y: sy }} whileTap={{ scale: 0.94 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}