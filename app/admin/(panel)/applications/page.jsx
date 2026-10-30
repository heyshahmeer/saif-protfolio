import { createClient } from "@/lib/supabase/server";
import { deleteApplication } from "@/lib/actions/applications";
import { DeleteButton } from "@/components/admin/delete-button";
import { StatusSelect } from "@/components/admin/status-select";

const wa = (p) => {
  const d = String(p).replace(/\D/g, "");
  return `https://wa.me/${d.startsWith("0") ? "92" + d.slice(1) : d}`;
};

export default async function Applications() {
  const supabase = await createClient();
  const { data: apps } = await supabase.from("applications").select("*").order("created_at", { ascending: false });

  return (
    <>
      <h1 className="font-display text-6xl tracking-tight">Applications</h1>
      {!apps?.length && <p className="mt-8 text-mute">No applications yet.</p>}
      <ul className="mt-10 space-y-4">
        {apps?.map((a) => (
          <li key={a.id} className="rounded-2xl border border-border p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl tracking-tight">{a.full_name}</h2>
                <p className="mt-1 text-sm text-mute">
                  → {a.university_name ?? "—"}{a.program ? ` · ${a.program}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <StatusSelect id={a.id} value={a.status} />
                <DeleteButton action={deleteApplication.bind(null, a.id)} />
              </div>
            </div>

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Email</dt><dd><a className="hover:text-signal" href={`mailto:${a.email}`}>{a.email}</a></dd></div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Phone</dt>
                <dd><a className="hover:text-signal" href={`tel:${a.phone}`}>{a.phone}</a> · <a className="text-signal" href={wa(a.phone)} target="_blank" rel="noreferrer">WhatsApp</a></dd>
              </div>
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">From</dt><dd>{a.city || "—"}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Qualification</dt><dd>{[a.qualification, a.marks].filter(Boolean).join(" · ") || "—"}</dd></div>
            </dl>

            {a.message && <p className="mt-5 whitespace-pre-line border-t border-line pt-4 text-paper/80">{a.message}</p>}
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
              {new Date(a.created_at).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}