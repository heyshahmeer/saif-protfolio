import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteResource } from "@/lib/actions/resource";
import { RESOURCES } from "@/lib/resources";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";

export default async function ResourceList({ params }) {
  const { resource } = await params;
  const cfg = RESOURCES[resource];
  if (!cfg) notFound();

  const supabase = await createClient();
  const { data: rows } = await supabase.from(resource).select("*").order("created_at", { ascending: false });

  return (
    <>
      <div className="mb-10 flex items-end justify-between">
        <h1 className="font-display text-6xl tracking-tight">{cfg.label}</h1>
        <Button asChild><Link href={`/admin/${resource}/new`}>New {cfg.singular}</Link></Button>
      </div>
      {!rows?.length && <p className="text-mute">Nothing here yet.</p>}
      <ul className="border-t border-line">
        {rows?.map((r) => (
          <li key={r.id} className="flex items-center justify-between border-b border-line py-4">
            <Link href={`/admin/${resource}/${r.id}`} className="hover:text-signal">{r.title}</Link>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{r.published ? "Live" : "Draft"}</span>
              <DeleteButton action={deleteResource.bind(null, resource, r.id)} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}