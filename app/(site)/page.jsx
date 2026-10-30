import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { Tilt } from "@/components/site/tilt";
import { Topics } from "@/components/site/topics";
import { ScrollGallery } from "@/components/site/scroll-gallery";
import { VideoPlayer } from "@/components/site/video-player";
import { CtaBand } from "@/components/site/cta-band";
import { VideoCard } from "@/components/site/cards";
import { IndexList } from "@/components/site/index-list";
import { getSettings, getPublished } from "@/lib/queries";
import { ytId, ytThumb } from "@/lib/utils";

export const revalidate = 60;

function Head({ label, href }) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6">
      <SplitHeading text={label} className="font-display text-6xl tracking-tight md:text-9xl" />
      {href && (
        <Link href={href} className="shrink-0 pb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-signal">
          All →
        </Link>
      )}
    </div>
  );
}

export default async function Home() {
  const [s, videos, notes] = await Promise.all([
    getSettings(),
    getPublished("videos", 7),
    getPublished("notes", 4),
  ]);
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const rest = videos.filter((v) => v.id !== featured?.id).slice(0, 3);
  const gallery = Array.isArray(s.gallery) ? s.gallery : [];

  return (
    <>
      <Hero name={s.name} eyebrow={s.tagline} headline={s.headline} sub={s.subline} stats={s.stats} portrait={s.portrait_url} socials={s.socials} />
      <Marquee items={["Mathematics", "Linear Algebra", "AI Tools", "Programming", "Admissions", "Scholarships", "Study Tips"]} />

      <section className="px-6 py-28 md:px-12">
        <Head label="Learn" />
        <Topics />
      </section>

      <section className="py-12">
        <div className="px-6 md:px-12"><Head label="Inside" /></div>
        <ScrollGallery images={gallery} />
      </section>

      {featured && ytId(featured.youtube_url) && (
        <section className="px-6 py-28 md:px-12">
          <Head label="Watch" href="/videos" />
          <Reveal>
            <VideoPlayer id={ytId(featured.youtube_url)} title={featured.title} thumb={featured.thumbnail_url || ytThumb(featured.youtube_url)} />
            <p className="mt-8 max-w-3xl font-display text-3xl tracking-tight md:text-5xl">{featured.title}</p>
          </Reveal>

          {rest.length > 0 && (
            <div className="mt-20 grid gap-x-6 gap-y-14 md:grid-cols-3">
              {rest.map((v, i) => (
                <Reveal key={v.id} delay={i * 0.08}>
                  <Tilt><VideoCard v={v} /></Tilt>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      )}

      {notes.length > 0 && (
        <section className="px-6 pb-28 md:px-12">
          <Head label="Notes" href="/notes" />
          <IndexList items={notes.map((n) => ({ href: `/notes/${n.slug}`, title: n.title, meta: n.subject }))} />
        </section>
      )}

      <section className="px-6 pb-16 md:px-12">
        <Reveal><CtaBand /></Reveal>
      </section>
    </>
  );
}