"use client";
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

export function Marquee({ items }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * -2.2 * (delta / 1000);
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    move += dir.current * move * b;
    baseX.set(baseX.get() + move);
  });

  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-6">
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-display text-5xl italic text-paper/80 md:text-7xl">
            {t}
            <span className="mx-12 not-italic text-signal">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}