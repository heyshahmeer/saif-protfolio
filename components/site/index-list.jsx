import Link from "next/link";

export function IndexList({ items }) {
  return (
    <ul className="border-t border-line">
      {items.map((it, i) => (
        <li key={it.href} className="group border-b border-line">
          <Link
            href={it.href}
            className="grid grid-cols-12 items-baseline gap-4 px-1 py-7 transition-all duration-500 hover:bg-foreground/[0.03] hover:pl-4"
          >
            <span className="col-span-1 font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
            <span className="col-span-11 font-display text-3xl tracking-tight transition-colors group-hover:text-signal md:col-span-7 md:text-5xl">{it.title}</span>
            <span className="col-span-3 hidden font-mono text-xs text-mute md:block">{it.meta}</span>
            <span className="col-span-1 hidden text-right transition-transform duration-500 group-hover:translate-x-1 md:block">↗</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}