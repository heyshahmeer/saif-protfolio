import { publicDb } from "@/lib/supabase/public";

const FALLBACK_SETTINGS = {
  name: "Prof. Name",
  headline: "Welcome",
  subline: "",
  stats: [],
};

export async function getSettings() {
  const { data, error } = await publicDb()
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) console.error("getSettings:", error.message);
  return data ?? FALLBACK_SETTINGS;
}

export async function getPublished(table, limit = 50) {
  const { data, error } = await publicDb()
    .from(table)
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) console.error(`getPublished(${table}):`, error.message);
  return data ?? [];
}