import { createClient } from "@/lib/supabase/server";
import { saveSettings } from "@/lib/actions/resource";
import { SETTINGS_FIELDS } from "@/lib/resources";
import { ResourceForm } from "@/components/admin/resource-form";

export default async function Settings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return <ResourceForm title="Settings" fields={SETTINGS_FIELDS} values={data ?? {}} action={saveSettings} />;
}