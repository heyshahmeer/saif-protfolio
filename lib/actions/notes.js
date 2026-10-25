"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { createClient } from "@/lib/supabase/server";
import { noteSchema } from "@/lib/schemas";

const opt = (v) => (v ? String(v) : undefined);

export async function saveNote(_prev, fd) {
  const supabase = await createClient();
  const { data: ok } = await supabase.rpc("is_admin");
  if (!ok) return { error: "Unauthorized" };

  const parsed = noteSchema.safeParse({
    id: opt(fd.get("id")),
    title: fd.get("title"),
    subject: opt(fd.get("subject")),
    excerpt: opt(fd.get("excerpt")),
    content: fd.get("content"),
    file_url: opt(fd.get("file_url")),
    published: fd.get("published") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { id, ...v } = parsed.data;
  const slug = `${slugify(v.title, { lower: true, strict: true })}-${Math.random().toString(36).slice(2, 6)}`;
  const { error } = id
    ? await supabase.from("notes").update(v).eq("id", id)
    : await supabase.from("notes").insert({ ...v, slug });
  if (error) return { error: error.message };

  revalidatePath("/notes"); revalidatePath("/"); revalidatePath("/admin/notes");
  redirect("/admin/notes");
}

export async function deleteNote(id) {
  const supabase = await createClient();
  const { data: ok } = await supabase.rpc("is_admin");
  if (!ok) return;
  await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/notes"); revalidatePath("/admin/notes");
}