import { ApplyForm } from "@/components/site/apply-form";
import { publicDb } from "@/lib/supabase/public";

export default async function Apply({ searchParams }) {
  const { uni } = await searchParams;
  const { data } = await publicDb().from("universities").select("id,slug,title,city").eq("published", true).order("title");
  const selected = data?.find((u) => u.slug === uni)?.id ?? "";

  return (
    <div className="px-6 pb-28 pt-40 md:px-12">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Apply</p>
      <h1 className="mb-16 font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.035em]">
        Start your <em>application.</em>
      </h1>
      <ApplyForm unis={data ?? []} selected={selected} />
    </div>
  );
}