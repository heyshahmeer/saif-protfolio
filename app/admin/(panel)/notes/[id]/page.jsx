import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NoteForm } from "@/components/admin/note-form";

export default async function EditNote({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: note } = await supabase.from("notes").select("*").eq("id", id).single();
  if (!note) notFound();
  return <NoteForm note={note} />;
}