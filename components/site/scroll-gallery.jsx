"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

export function ScrollGallery({ images = [] }) {
  const wrap = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div ref={wrap} className="overflow-hidden py-6">
      <motion.div ref={track} style={{ x }} className="flex w-max items-start gap-5 px-6 md:px-12">
        {images.map((src, i) => (
          <motion.figure
            key={src}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.1, ease, delay: Math.min(i, 4) * 0.08 }}
            className={`group relative h-[60svh] shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary ${
              i % 2 ? "mt-12 w-[62vw] md:w-[26vw]" : "w-[72vw] md:w-[32vw]"
            }`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-card/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
}