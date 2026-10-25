"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(fd) {
  console.log("signIn called", String(fd.get("email")));
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(fd.get("email")).trim(),
    password: String(fd.get("password")),
  });
  if (error) redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);

  const { data: ok, error: rpcError } = await supabase.rpc("is_admin");
  if (rpcError) redirect(`/admin/login?error=${encodeURIComponent("is_admin: " + rpcError.message)}`);
  if (!ok) redirect(`/admin/login?error=${encodeURIComponent("Signed in, but this user is not in the admins table")}`);

  redirect("/admin");
}

export async function signOut() {
  await (await createClient()).auth.signOut();
  redirect("/admin/login");
}