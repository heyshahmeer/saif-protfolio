"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function Tilt({ children, max = 7, className = "" }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 150, damping: 18 });
  const spy = useSpring(py, { stiffness: 150, damping: 18 });
  const rx = useTransform(spy, [0, 1], [max, -max]);
  const ry = useTransform(spx, [0, 1], [-max, max]);

  function move(e) {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function leave() { px.set(0.5); py.set(0.5); }

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}