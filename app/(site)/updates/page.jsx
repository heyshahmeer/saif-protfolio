import { getPublished } from "@/lib/queries";

export const revalidate = 60;

export default async function Updates() {
  const updates = await getPublished("updates");
  return (
    <div className="px-6 pb-28 pt-40 md:px-12">
      <h1 className="mb-16 font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-[-0.035em]">Updates</h1>
      <ul className="border-t border-line">
        {updates.map((u) => (
          <li key={u.id} className="grid gap-4 border-b border-line py-10 md:grid-cols-12">
            <time className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute md:col-span-3">
              {new Date(u.created_at).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
              {u.pinned && <span className="ml-3 text-signal">Pinned</span>}
            </time>
            <div className="md:col-span-9">
              <h2 className="font-display text-4xl tracking-tight">{u.title}</h2>
              <p className="mt-3 max-w-xl text-paper/80">{u.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}