export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-6">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-display text-5xl italic text-paper/80 md:text-7xl">
            {t}
            <span className="mx-12 not-italic text-signal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}