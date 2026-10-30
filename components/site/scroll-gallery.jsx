"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

const TILES = [
  { sym: "∫", cap: "Calculus", tint: "from-chart-1/25 to-chart-2/20" },
  { sym: "Σ", cap: "Algebra", tint: "from-chart-2/20 to-chart-3/15" },
  { sym: "π", cap: "Geometry", tint: "from-chart-1/30 to-primary/10" },
  { sym: "√", cap: "Roots", tint: "from-primary/10 to-chart-1/30" },
  { sym: "Δ", cap: "Change", tint: "from-chart-1/20 to-chart-4/15" },
];

const GRID = {
  backgroundImage:
    "linear-gradient(to right, oklch(0.148 0.004 228.8 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.148 0.004 228.8 / 0.06) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

export function ScrollGallery({ images = [] }) {
  const wrap = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);

  useEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={wrap} className="overflow-hidden py-6">
      <motion.div ref={track} style={{ x }} className="flex w-max items-start gap-5 px-6 md:px-12">
        {TILES.map((t, i) => {
          const src = images[i];
          return (
            <motion.figure
              key={i}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.1, ease, delay: i * 0.08 }}
              className={`group relative h-[60svh] shrink-0 overflow-hidden rounded-2xl border border-border ${
                i % 2 ? "mt-12 w-[62vw] md:w-[26vw]" : "w-[72vw] md:w-[32vw]"
              }`}
            >
              {src ? (
                <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${t.tint}`}>
                  <div className="absolute inset-0" style={GRID} />
                  <span className="absolute inset-0 grid place-items-center font-display text-[16rem] leading-none text-foreground/10 transition-transform duration-[1400ms] ease-out group-hover:scale-110">
                    {t.sym}
                  </span>
                </div>
              )}
              <span className="absolute bottom-4 left-4 bg-card/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
                {String(i + 1).padStart(2, "0")}{src ? "" : ` · ${t.cap}`}
              </span>
            </motion.figure>
          );
        })}
      </motion.div>
    </div>
  );
}