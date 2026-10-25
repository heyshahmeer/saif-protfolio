import { ProjectCard } from "@/components/site/cards";
import { getPublished } from "@/lib/queries";

export const revalidate = 60;

export default async function Projects() {
  const projects = await getPublished("projects");
  return (
    <div className="px-6 pb-28 pt-40 md:px-12">
      <h1 className="mb-16 font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-[-0.035em]">Projects</h1>
      <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
        {projects.map((p, i) => (
          <div key={p.id} className={i % 2 ? "md:mt-24" : ""}><ProjectCard p={p} index={i} /></div>
        ))}
      </div>
    </div>
  );
}