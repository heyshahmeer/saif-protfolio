import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES } from "@/lib/resources";
import { saveResource } from "@/lib/actions/resource";
import { ResourceForm } from "@/components/admin/resource-form";

export default async function EditItem({ params }) {
  const { resource, id } = await params;
  const cfg = RESOURCES[resource];
  if (!cfg) notFound();

  const supabase = await createClient();
  const { data: row } = await supabase.from(resource).select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <ResourceForm
      title={`Edit ${cfg.singular}`}
      fields={cfg.fields}
      values={row}
      id={row.id}
      action={saveResource.bind(null, resource)}
    />
  );
}