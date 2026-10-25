import { publicDb } from "@/lib/supabase/public";

export async function getSettings() {
  const { data } = await publicDb().from("site_settings").select("*").eq("id", 1).single();
  return data;
}

export async function getPublished(table, limit = 50) {
  const { data } = await publicDb().from(table).select("*").eq("published", true)
    .order("created_at", { ascending: false }).limit(limit);
  return data ?? [];
}