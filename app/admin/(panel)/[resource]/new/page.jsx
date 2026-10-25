import { notFound } from "next/navigation";
import { RESOURCES } from "@/lib/resources";
import { saveResource } from "@/lib/actions/resource";
import { ResourceForm } from "@/components/admin/resource-form";

export default async function NewItem({ params }) {
  const { resource } = await params;
  const cfg = RESOURCES[resource];
  if (!cfg) notFound();
  return (
    <ResourceForm
      title={`New ${cfg.singular}`}
      fields={cfg.fields}
      action={saveResource.bind(null, resource)}
    />
  );
}