"use client";
import { motion } from "motion/react";

export default function Template({ children }) {
  return (
    <>
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        style={{ originY: 0 }}
        className="pointer-events-none fixed inset-0 z-[90] bg-signal"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}