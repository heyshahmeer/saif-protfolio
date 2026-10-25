import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES } from "@/lib/resources";

export default async function Overview() {
  const supabase = await createClient();
  const counts = await Promise.all(
    Object.keys(RESOURCES).map(async (k) => {
      const { count } = await supabase.from(k).select("*", { count: "exact", head: true });
      return [k, count ?? 0];
    })
  );
  return (
    <>
      <h1 className="font-display text-6xl tracking-tight">Overview</h1>
      <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {counts.map(([k, n]) => (
          <Link key={k} href={`/admin/${k}`} className="bg-background p-8 transition-colors hover:bg-card">
            <p className="font-display text-7xl">{n}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">{RESOURCES[k].label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}