import { Nav } from "@/components/site/nav";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { getSettings } from "@/lib/queries";
import { Footer } from "@/components/site/footer";

export default async function SiteLayout({ children }) {
  const s = await getSettings();
  return (
    <SmoothScroll>
     <Nav name={s.name} logo={s.logo_url} />
      <main>{children}</main>
      <Footer name={s.name} tagline={s.tagline} socials={s.socials} />
    </SmoothScroll>
  );
}