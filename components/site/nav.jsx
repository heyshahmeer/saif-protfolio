import Link from "next/link";

const links = [["Videos", "/videos"], ["Projects", "/projects"], ["Notes", "/notes"], ["Universities", "/universities"], ["Updates", "/updates"], ["About", "/about"]];

export function Nav({ name }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="font-display text-2xl tracking-tight text-paper">{name}</Link>
        <ul className="hidden gap-10 font-mono text-[11px] uppercase tracking-[0.22em] text-paper md:flex">
          {links.map(([l, h]) => (
            <li key={h}><Link href={h} className="opacity-60 transition-opacity hover:opacity-100">{l}</Link></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}