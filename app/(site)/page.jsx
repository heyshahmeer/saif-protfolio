import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Reveal } from "@/components/site/reveal";
import { Gallery } from "@/components/site/gallery";
import { SocialBand } from "@/components/site/social-band";
import { VideoCard, ProjectCard } from "@/components/site/cards";
import { IndexList } from "@/components/site/index-list";
import { getSettings, getPublished } from "@/lib/queries";
import { ytId } from "@/lib/utils";
import { Story } from "@/components/site/story";

export const revalidate = 60;

// Edit this copy here, or ask me to move it into the admin.
const OFFERINGS = [
  ["Math shortcuts", "Faster routes to the answer, built on the concept behind them, so they work on questions you have never seen."],
  ["Entry-test guidance", "A clear plan for NUST NET: what to study first, how to pace the paper, and how to review mistakes."],
  ["Concept-first problem solving", "Understand why a method works, then use it under time pressure without second-guessing."],
  ["Academic coaching", "Straight guidance on the maths habits that turn practice into marks."],
];

const NET = [
  ["200", "MCQs in the paper"],
  ["180", "Minutes, about 54 seconds a question"],
  ["50%", "Maths weight (Engineering track)"],
  ["0", "Negative marking"],
];

const TOPICS = ["Algebra", "Trigonometry", "Calculus", "Analytical Geometry", "Probability", "Conic Sections", "Matrices", "Complex Numbers"];

const FAQ = [
  ["Is there negative marking in NET?", "No. NUST states there is no negative marking, so attempt every question."],
  ["Can I use a calculator?", "No. Calculators are not allowed, which is exactly why speed and shortcuts matter."],
  ["Can I sit NET more than once?", "Yes. NUST runs several NET series a year and counts your best score. Each series needs its own form and fee."],
  ["Does NUST provide preparation material?", "NUST says it does not run entry-test preparation or provide prep material, so the plan, the books and the practice are up to you."],
];

function Section({ eyebrow, label, href, children }) {
  return (
    <section className="px-6 py-28 md:px-12">
      <Reveal className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">{eyebrow}</p>
          <h2 className="font-display text-5xl tracking-tight md:text-8xl">{label}</h2>
        </div>
        {href && (
          <Link href={href} className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-signal">
            View all →
          </Link>
        )}
      </Reveal>
      {children}
    </section>
  );
}

export default async function Home() {
  const [s, videos, notes, projects, updates] = await Promise.all([
    getSettings(),
    getPublished("videos", 6),
    getPublished("notes", 5),
    getPublished("projects", 4),
    getPublished("updates", 3),
  ]);
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const gallery = Array.isArray(s.gallery) ? s.gallery : [];

  return (
    <>
      <Hero name={s.name} eyebrow={s.tagline} headline={s.headline} sub={s.subline} stats={s.stats} portrait={s.portrait_url} socials={s.socials} />
      <Marquee items={["Math shortcuts", "NUST NET", "Entry-test strategy", "Concept clarity", "Problem solving", "Speed & accuracy"]} />
      <SocialBand socials={s.socials} />
      <Story />
      <Section eyebrow="What we teach" label="The method">
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {OFFERINGS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06} className="bg-background">
              <div className="h-full p-8 transition-colors duration-500 hover:bg-card md:p-12">
                <p className="font-mono text-[11px] tracking-[0.22em] text-signal">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-10 font-display text-4xl tracking-tight md:text-5xl">{t}</h3>
                <p className="mt-4 max-w-md text-paper/60">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="px-6 pb-28 md:px-12">
        <Reveal className="mb-14 max-w-3xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">NUST NET at a glance</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">Know the paper before you sit it.</h2>
        </Reveal>
        <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {NET.map(([n, l]) => (
            <div key={l} className="bg-background p-8 md:p-10">
              <dd className="font-display text-7xl tracking-tight md:text-8xl">{n}</dd>
              <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{l}</dt>
            </div>
          ))}
        </dl>
        <Reveal className="mt-14">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-mute">Where the maths marks are</p>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <span key={t} className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-signal hover:text-signal">{t}</span>
            ))}
          </div>
          <p className="mt-8 text-sm text-mute">General NET format for the Engineering and Computing track. Rules change every cycle, so confirm on nust.edu.pk.</p>
        </Reveal>
      </section>

      <Section eyebrow="Inside the academy" label="Gallery">
        <Reveal><Gallery images={gallery} /></Reveal>
      </Section>

      {featured && ytId(featured.youtube_url) && (
        <section className="px-6 pb-16 md:px-12">
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

      {videos.length > 0 && (
        <Section eyebrow="Watch" label="Videos" href="/videos">
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 0.08}><VideoCard v={v} /></Reveal>
            ))}
          </div>
        </Section>
      )}

      {notes.length > 0 && (
        <Section eyebrow="Study" label="Notes" href="/notes">
          <IndexList items={notes.map((n) => ({ href: `/notes/${n.slug}`, title: n.title, meta: n.subject }))} />
        </Section>
      )}

      {projects.length > 0 && (
        <Section eyebrow="Build" label="Projects" href="/projects">
          <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.1} className={i % 2 ? "md:mt-24" : ""}>
                <ProjectCard p={p} index={i} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {updates.length > 0 && (
        <Section eyebrow="News" label="Updates" href="/updates">
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

      {s.bio && (
        <section className="px-6 py-28 md:px-12">
          <Reveal>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">About</p>
            <p className="max-w-5xl font-display text-4xl leading-[1.1] tracking-tight md:text-6xl">{s.bio}</p>
            <Link href="/about" className="mt-10 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-signal">More about us →</Link>
          </Reveal>
        </section>
      )}

      <Section eyebrow="Questions" label="NET FAQ">
        <div className="border-t border-line">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group border-b border-line py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-3xl tracking-tight md:text-4xl [&::-webkit-details-marker]:hidden">
                {q}
                <span className="font-mono text-2xl text-signal transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl text-paper/70">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-mute">General NET information. Confirm current rules on nust.edu.pk.</p>
      </Section>

      <section className="px-6 pb-12 md:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-8 border border-line p-10 md:p-16">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">After the test</p>
            <h2 className="max-w-2xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">Now pick the <em>university.</em></h2>
          </div>
          <Link href="/universities" className="bg-signal px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-transform hover:-translate-y-0.5">
            Browse universities →
          </Link>
        </Reveal>
      </section>
    </>
  );
}