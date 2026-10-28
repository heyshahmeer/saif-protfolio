import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

const links = [["Videos", "/videos"], ["Projects", "/projects"], ["Notes", "/notes"], ["Universities", "/universities"], ["Updates", "/updates"], ["About", "/about"]];

export function Nav({ name, logo }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <nav className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className={`flex items-center gap-3 border-2 border-foreground/15 bg-card/90 py-2 pr-5 shadow-[4px_4px_0_0_rgb(26_34_51/0.08)] backdrop-blur transition-colors hover:border-signal/60 ${logo ? "pl-2" : "pl-5"}`}
          >
            {logo && (
              <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden border border-line bg-secondary">
                <img src={logo} alt="" className="h-full w-full object-contain p-1" />
              </span>
            )}
            <span className="font-display text-2xl leading-none tracking-tight">{name}</span>
          </Link>

          <ul className="hidden items-center gap-1 border-2 border-foreground/15 bg-card/90 p-1.5 font-mono text-[11px] uppercase tracking-[0.2em] backdrop-blur md:flex">
            {links.map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="block px-4 py-2.5 text-mute transition-colors hover:bg-secondary hover:text-paper">{l}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <MobileMenu links={links} />
    </>
  );
}