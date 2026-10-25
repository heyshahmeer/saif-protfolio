import { notFound } from "next/navigation";
import { publicDb } from "@/lib/supabase/public";
import { cleanHtml } from "@/lib/utils";

export const revalidate = 60;

export default async function Project({ params }) {
  const { slug } = await params;
  const { data: p } = await publicDb().from("projects").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-4xl px-6 pb-28 pt-40">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">{p.tags?.join(" · ")}</p>
      <h1 className="font-display text-6xl leading-[0.95] tracking-[-0.03em] md:text-8xl">{p.title}</h1>
      <p className="mt-8 max-w-xl text-xl text-paper/70">{p.summary}</p>
      {p.cover_url && <img src={p.cover_url} alt="" className="mt-14 w-full border border-line" />}
      <div className="mt-10 flex gap-4 font-mono text-[11px] uppercase tracking-[0.22em]">
        {p.live_url && <a href={p.live_url} target="_blank" className="border border-line px-5 py-3 hover:border-signal hover:text-signal">Live ↗</a>}
        {p.repo_url && <a href={p.repo_url} target="_blank" className="border border-line px-5 py-3 hover:border-signal hover:text-signal">Source ↗</a>}
      </div>
      <div className="prose-premium mt-16" dangerouslySetInnerHTML={{ __html: cleanHtml(p.content || "") }} />
    </article>
  );
}