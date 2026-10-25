import { IndexList } from "@/components/site/index-list";
import { getPublished } from "@/lib/queries";

export const revalidate = 60;

export default async function Notes() {
  const notes = await getPublished("notes");
  return (
    <div className="px-6 pb-28 pt-40 md:px-12">
      <h1 className="mb-16 font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-[-0.035em]">Notes</h1>
      <IndexList items={notes.map((n) => ({ href: `/notes/${n.slug}`, title: n.title, meta: n.subject }))} />
    </div>
  );
}