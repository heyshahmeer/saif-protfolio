"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function admin() {
  const s = await createClient();
  const { data: ok } = await s.rpc("is_admin");
  return ok ? s : null;
}

export async function setStatus(id, status) {
  if (!["new", "contacted", "forwarded", "closed"].includes(status)) return;
  const s = await admin();
  if (!s) return;
  await s.from("applications").update({ status }).eq("id", id);
  revalidatePath("/admin/applications");
}

export async function deleteApplication(id) {
  const s = await admin();
  if (!s) return;
  await s.from("applications").delete().eq("id", id);
  revalidatePath("/admin/applications");
}