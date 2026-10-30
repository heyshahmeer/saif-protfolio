import Link from "next/link";
import { notFound } from "next/navigation";
import { publicDb } from "@/lib/supabase/public";
import { cleanHtml } from "@/lib/utils";
import { UniLogo } from "@/components/site/uni-card";

export const revalidate = 60;

export default async function University({ params }) {
  const { slug } = await params;
  const { data: u } = await publicDb().from("universities").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (!u) notFound();

  const facts = [
    ["City", u.city], ["Province", u.province], ["Sector", u.type],
    ["Founded", u.founded > 0 ? u.founded : null],
    ["Fee range", u.fee_range], ["Deadline", u.deadline],
    ["Entry test", u.entry_test], ["Ranking", u.ranking],
  ];

  return (
    <article className="pb-28">
      <header className="relative overflow-hidden border-b border-line px-6 pb-14 pt-40 md:px-12">
        {u.cover_url && (
          <>
            <img src={u.cover_url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </>
        )}
        <div className="relative">
          <UniLogo u={u} size={80} />
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">{u.city} · {u.province}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.03em] md:text-8xl">{u.title}</h1>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
            <Link href={`/apply?uni=${u.slug}`} className="rounded-full bg-signal px-6 py-4 text-ink transition-transform hover:-translate-y-0.5">Apply through us</Link>
            {u.website && <a href={u.website} target="_blank" rel="noreferrer" className="rounded-full border border-border px-6 py-4 hover:border-signal hover:text-signal">Official site ↗</a>}
            {u.admission_url && <a href={u.admission_url} target="_blank" rel="noreferrer" className="rounded-full border border-border px-6 py-4 hover:border-signal hover:text-signal">Admissions page ↗</a>}
          </div>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-px border-b border-line bg-line md:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-background p-6 md:p-8">
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{k}</dt>
            <dd className="mt-2 font-display text-2xl tracking-tight">{v || "—"}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-16 px-6 py-16 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {u.summary && <p className="font-display text-3xl leading-tight tracking-tight md:text-4xl">{u.summary}</p>}

          {u.programs?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {u.programs.map((p) => (
                <span key={p} className="rounded-full border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/80">{p}</span>
              ))}
            </div>
          )}

          {u.content && <div className="prose-premium mt-12" dangerouslySetInnerHTML={{ __html: cleanHtml(u.content) }} />}

          {u.scholarships && (
            <section className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-4xl tracking-tight">Scholarships</h2>
              <p className="mt-4 whitespace-pre-line text-paper/80">{u.scholarships}</p>
            </section>
          )}

          <p className="mt-16 text-sm text-mute">
            Fees, deadlines and entry tests change every admission cycle. Confirm them on the official website before paying anything.
          </p>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6 rounded-2xl border border-border p-6">
            <h2 className="font-display text-3xl tracking-tight">Ready to apply?</h2>
            <p className="text-sm text-paper/80">Send your details and we will guide you through the admission process.</p>
            <Link href={`/apply?uni=${u.slug}`} className="block rounded-full bg-signal px-6 py-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
              Start application
            </Link>
            {(u.address || u.phone || u.email) && (
              <div className="space-y-1 border-t border-line pt-5 text-sm text-mute">
                {u.address && <p>{u.address}</p>}
                {u.phone && <p>{u.phone}</p>}
                {u.email && <p>{u.email}</p>}
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}