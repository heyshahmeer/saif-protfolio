"use client";
import { motion } from "motion/react";

export function SplitHeading({ text, className = "" }) {
  return (
    <h2 className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mr-[0.2em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}