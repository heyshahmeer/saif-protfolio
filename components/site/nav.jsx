import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

const links = [["Home", "/"], ["Videos", "/videos"], ["Notes", "/notes"], ["Projects", "/projects"], ["Updates", "/updates"], ["Universities", "/universities"], ["About", "/about"]];
export function Nav({ name, logo }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <nav className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className={`flex items-center gap-3 rounded-full border border-border bg-card/90 py-2 pr-5 shadow-xl shadow-primary/10 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/60 active:scale-[0.97] ${logo ? "pl-2" : "pl-5"}`}
          >
            {logo && (
              <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl border border-border bg-secondary">
                <img src={logo} alt="" className="h-full w-full object-contain p-1" />
              </span>
            )}
            <span className="font-display text-2xl leading-none tracking-tight">{name}</span>
          </Link>
          <NavLinks links={links} />
        </nav>
      </header>
      <MobileMenu links={links} />
    </>
  );
}