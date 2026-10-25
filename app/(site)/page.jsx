import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { IndexList } from "@/components/site/index-list";
import { getSettings, getPublished } from "@/lib/queries";

export const revalidate = 60;

function Section({ label, href, children }) {
  return (
    <section className="px-6 py-28 md:px-12">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-display text-6xl tracking-tight md:text-8xl">{label}</h2>
        <Link href={href} className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute hover:text-signal">View all →</Link>
      </div>
      {children}
    </section>
  );
}

export default async function Home() {
  const [s, projects, videos, notes] = await Promise.all([
    getSettings(), getPublished("projects", 5), getPublished("videos", 5), getPublished("notes", 5),
  ]);
  return (
    <>
      <Hero name={s.name} headline={s.headline} sub={s.subline} stats={s.stats} />
      <Section label="Projects" href="/projects">
        <IndexList items={projects.map((p) => ({ href: `/projects/${p.slug}`, title: p.title, meta: p.tags?.slice(0, 2).join(" · ") }))} />
      </Section>
      <Section label="Videos" href="/videos">
        <IndexList items={videos.map((v) => ({ href: v.youtube_url, title: v.title, meta: "YouTube" }))} />
      </Section>
      <Section label="Notes" href="/notes">
        <IndexList items={notes.map((n) => ({ href: `/notes/${n.slug}`, title: n.title, meta: n.subject }))} />
      </Section>
    </>
  );
}