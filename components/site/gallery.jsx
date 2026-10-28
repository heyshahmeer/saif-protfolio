const TILES = [
  { sym: "∫", cap: "Concepts", cls: "col-span-2 row-span-2" },
  { sym: "π", cap: "Shortcuts", cls: "" },
  { sym: "Σ", cap: "Practice", cls: "row-span-2" },
  { sym: "√", cap: "Strategy", cls: "" },
  { sym: "Δ", cap: "Accuracy", cls: "col-span-2 md:col-span-4" },
];

export function Gallery({ images = [] }) {
  return (
    <div className="grid auto-rows-[180px] grid-cols-2 gap-3 [grid-auto-flow:dense] md:auto-rows-[260px] md:grid-cols-4">
      {TILES.map((t, i) => {
        const src = images[i];
        return (
          <div key={i} className={`group relative overflow-hidden border border-line ${t.cls}`}>
            {src ? (
              <img src={src} alt={t.cap} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-card to-secondary transition-colors duration-700 group-hover:from-signal/20">
                <span className="font-display text-[9rem] leading-none text-foreground/[0.07] transition-colors duration-700 group-hover:text-signal/40 md:text-[12rem]">{t.sym}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white font-mono text-[11px] uppercase tracking-[0.22em]">{t.cap}</div>
          </div>
        );
      })}
    </div>
  );
}