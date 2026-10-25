import { Nav } from "@/components/site/nav";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { getSettings } from "@/lib/queries";

export default async function SiteLayout({ children }) {
  const s = await getSettings();
  return (
    <SmoothScroll>
      <Nav name={s.name} />
      <main>{children}</main>
      <footer className="border-t border-line px-6 py-10 font-mono text-[11px] uppercase tracking-[0.22em] text-mute md:px-12">
        © {new Date().getFullYear()} {s.name}
      </footer>
    </SmoothScroll>
  );
}