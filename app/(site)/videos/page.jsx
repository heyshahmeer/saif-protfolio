import { getPublished } from "@/lib/queries";
import { ytThumb } from "@/lib/utils";

export const revalidate = 60;

export default async function Videos() {
  const videos = await getPublished("videos");
  return (
    <div className="px-6 pb-28 pt-40 md:px-12">
      <h1 className="mb-16 font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-[-0.035em]">Videos</h1>
      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <a key={v.id} href={v.youtube_url} target="_blank" className="group block">
            <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card">
              <img src={v.thumbnail_url || ytThumb(v.youtube_url)} alt={v.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight transition-colors group-hover:text-signal">{v.title}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}