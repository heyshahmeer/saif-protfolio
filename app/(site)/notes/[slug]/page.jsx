import { notFound } from "next/navigation";
import { publicDb } from "@/lib/supabase/public";
import { cleanHtml } from "@/lib/utils";

export const revalidate = 60;

export default async function Note({ params }) {
  const { slug } = await params;
  const { data: n } = await publicDb().from("notes").select("*").eq("slug", slug).eq("published", true).single();
  if (!n) notFound();
  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-40">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">{n.subject}</p>
      <h1 className="font-display text-6xl leading-[0.95] tracking-[-0.03em] md:text-8xl">{n.title}</h1>
      {n.file_url && (
        <a
          href={n.file_url} target="_blank"
          className="mt-8 inline-block rounded-full border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] hover:border-signal hover:text-signal"
        >
          Download PDF ↓
        </a>
      )}
      <div className="prose-premium mt-16" dangerouslySetInnerHTML={{ __html: cleanHtml(n.content) }} />
    </article>
  );
}