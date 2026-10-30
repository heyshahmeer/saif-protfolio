import { Nav } from "@/components/site/nav";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Cursor } from "@/components/site/cursor";
import { Footer } from "@/components/site/footer";
import { getSettings } from "@/lib/queries";

export default async function SiteLayout({ children }) {
  const s = await getSettings();
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Cursor />
      <Nav name={s.name} logo={s.logo_url} />
      <main>{children}</main>
      <Footer name={s.name} tagline={s.tagline} socials={s.socials} />
    </SmoothScroll>
  );
}