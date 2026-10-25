import { getSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function About() {
  const s = await getSettings();
  return (
    <div className="px-6 pb-28 pt-40 md:px-12">
      <h1 className="mb-16 font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-[-0.035em]">About</h1>
      <div className="grid gap-12 md:grid-cols-12">
        <p className="font-display text-4xl leading-tight tracking-tight md:col-span-8 md:text-6xl">{s.bio}</p>
      </div>
    </div>
  );
}