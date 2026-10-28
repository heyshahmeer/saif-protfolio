import Link from "next/link";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";

const nav = [["Overview", "/admin"], ["Videos", "/admin/videos"], ["Projects", "/admin/projects"],
["Notes", "/admin/notes"], ["Universities", "/admin/universities"], ["Applications", "/admin/applications"],
["Updates", "/admin/updates"], ["Settings", "/admin/settings"]];

export default async function PanelLayout({ children }) {
  const supabase = await createClient();
  const { data: ok } = await supabase.rpc("is_admin");
  if (!ok) redirect("/admin/login");
  return (
    <div className="grid min-h-svh md:grid-cols-[240px_1fr]">
      <aside className="flex flex-col justify-between border-r border-line p-6">
        <div>
          <p className="mb-10 font-display text-3xl">Studio</p>
          <ul className="space-y-1">
            {nav.map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="block rounded px-3 py-2 text-sm text-mute transition-colors hover:bg-white/5 hover:text-paper">{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <form action={signOut}>
          <button className="px-3 font-mono text-[11px] uppercase tracking-[0.22em] text-mute hover:text-signal">Sign out</button>
        </form>
      </aside>
      <div className="p-8 md:p-12">{children}</div>
      <Toaster theme="dark" />
    </div>
  );
}