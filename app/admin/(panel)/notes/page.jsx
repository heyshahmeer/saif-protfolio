import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteNote } from "@/lib/actions/notes";
import { Button } from "@/components/ui/button";

export default async function AdminNotes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select("id,title,published,created_at").order("created_at", { ascending: false });
  return (
    <>
      <div className="mb-10 flex items-end justify-between">
        <h1 className="font-display text-6xl tracking-tight">Notes</h1>
        <Button asChild><Link href="/admin/notes/new">New note</Link></Button>
      </div>
      <ul className="border-t border-line">
        {notes?.map((n) => (
          <li key={n.id} className="flex items-center justify-between border-b border-line py-4">
            <Link href={`/admin/notes/${n.id}`} className="hover:text-signal">{n.title}</Link>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{n.published ? "Live" : "Draft"}</span>
              <form action={deleteNote.bind(null, n.id)}>
                <button className="text-sm text-mute hover:text-signal">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}