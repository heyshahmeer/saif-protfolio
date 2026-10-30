import { UniExplorer } from "@/components/site/uni-explorer";
import { getPublished } from "@/lib/queries";

export const revalidate = 60;

export default async function Universities() {
  const unis = await getPublished("universities", 500);
  return (
    <div className="px-6 pb-28 pt-40 md:px-12">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">University portal</p>
      <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.035em]">
        Find your <em>university.</em>
      </h1>
      <p className="mb-16 mt-8 max-w-xl text-lg text-paper/80">
        Browse universities across Pakistan, compare them, and send your application details to us in one place.
      </p>
      <UniExplorer unis={unis} />
    </div>
  );
}