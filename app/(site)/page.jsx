import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Reveal } from "@/components/site/reveal";
import { ProjectCard, VideoCard } from "@/components/site/cards";
import { IndexList } from "@/components/site/index-list";
import { getSettings, getPublished } from "@/lib/queries";
import { ytId } from "@/lib/utils";

export const revalidate = 60;

function Section({ n, label, href, children }) {
  return (
    <section className="px-6 py-28 md:px-12">
      <Reveal className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">{n}</p>
          <h2 className="font-display text-6xl tracking-tight md:text-8xl">{label}</h2>
        </div>
        {href && (
          <Link href={href} className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-signal">
            View all →
          </Link>
        )}
      </Reveal>
      {children}
    </section>
  );
}

export default async function Home() {
  const [s, projects, videos, notes, updates] = await Promise.all([
    getSettings(),
    getPublished("projects", 4),
    getPublished("videos", 6),
    getPublished("notes", 5),
    getPublished("updates", 3),
  ]);
  const featured = videos.find((v) => v.featured) ?? videos[0];

  return (
    <>
      <Hero name={s.name} headline={s.headline} sub={s.subline} stats={s.stats} portrait={s.portrait_url} />
      <Marquee items={["Lectures", "Notes", "Projects", "Research", "Open Courses"]} />

      {s.bio && (
        <section className="px-6 py-28 md:px-12">
          <Reveal>
            <p className="max-w-5xl font-display text-4xl leading-[1.1] tracking-tight md:text-6xl">{s.bio}</p>
            <Link href="/about" className="mt-10 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-signal">About →</Link>
          </Reveal>
        </section>
      )}

      {featured && ytId(featured.youtube_url) && (
        <section className="px-6 py-16 md:px-12">
          <Reveal className="grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-8 lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Latest lecture</p>
              <div>
                <h2 className="font-display text-5xl leading-none tracking-tight">{featured.title}</h2>
                {featured.description && <p className="mt-5 text-paper/60">{featured.description}</p>}
              </div>
            </div>
            <div className="aspect-video overflow-hidden border border-line bg-black lg:col-span-8">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${ytId(featured.youtube_url)}`}
                title={featured.title}
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>
      )}

      <Section n="01" label="Projects" href="/projects">
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.1} className={i % 2 ? "md:mt-24" : ""}>
              <ProjectCard p={p} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section n="02" label="Videos" href="/videos">
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 0.08}><VideoCard v={v} /></Reveal>
          ))}
        </div>
      </Section>

      <Section n="03" label="Notes" href="/notes">
        <IndexList items={notes.map((n) => ({ href: `/notes/${n.slug}`, title: n.title, meta: n.subject }))} />
      </Section>

      {updates.length > 0 && (
        <Section n="04" label="Updates" href="/updates">
          <ul className="border-t border-line">
            {updates.map((u) => (
              <li key={u.id} className="grid gap-4 border-b border-line py-8 md:grid-cols-12">
                <time className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute md:col-span-3">
                  {new Date(u.created_at).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                </time>
                <div className="md:col-span-9">
                  <h3 className="font-display text-3xl tracking-tight">{u.title}</h3>
                  <p className="mt-2 max-w-xl text-paper/60">{u.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}