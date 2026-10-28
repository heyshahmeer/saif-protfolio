import { Reveal } from "./reveal";

// Mission and topics come from his YouTube About page. Edit any line to match his voice.
const MISSION = [
  ["Make maths easy", "FSc and university maths, from matrices and determinants to Linear Algebra, taught for understanding instead of memorising."],
  ["Make technology useful", "AI tools, computer science and programming explained so students can actually use them."],
  ["Make students future-ready", "Admissions, scholarships and career guidance, so choices about the next step are made with clear information."],
];

const AUDIENCE = [
  ["FSc and ICS students", "Chapter-by-chapter maths that turns slow, stressful problems into familiar patterns."],
  ["Admission and scholarship seekers", "Entry-test strategy, university choices and scholarship direction in one place."],
  ["Curious about AI and tech", "Students who want to learn the tools and skills shaping the next few years."],
];

const HABITS = [
  ["Cover both years", "Entry tests can draw on first-year and second-year concepts, sometimes inside one question. Skipping either is a gamble."],
  ["Practise against the clock", "Timed practice is a skill. Time every set, not just the final mock."],
  ["High-return chapters first", "Conic sections, integration, matrices, trigonometry and calculus show up often. Make them solid early."],
  ["Use past papers late", "In the final weeks, solve past papers under test conditions and redo every question you missed."],
  ["Keep a mistake log", "Write why you missed each question: concept, speed or carelessness. Fix the pattern, not just the question."],
];

const eyebrow = "mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal";
const card = "border-2 border-foreground/10 bg-card p-8 md:p-10";

export function Story() {
  return (
    <>
      <section className="px-6 py-28 md:px-12">
        <Reveal className="mb-12">
          <p className={eyebrow}>Our mission</p>
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">Three promises.</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {MISSION.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className={`${card} h-full shadow-[8px_8px_0_0_rgb(31_93_76/0.10)]`}>
                <p className="font-display text-7xl leading-none text-signal/70">{i + 1}</p>
                <h3 className="mt-8 font-display text-3xl tracking-tight md:text-4xl">{t}</h3>
                <p className="mt-3 text-paper/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className={eyebrow}>Why this academy</p>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              One place for the <em className="text-signal">whole journey.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-paper/75 lg:col-span-6 lg:col-start-7">
            <p>AL_Saif Academy started on YouTube in January 2026 and covers mathematics, AI, technology and student life in one place. Maths comes first: FSc and university topics, taught concept-first, so formulas stop being something to memorise.</p>
            <p>Beyond maths, the channel covers AI tools, programming, admissions, scholarships and career guidance, because students need all of it and rarely get it from a single source.</p>
            <p>Lectures are in Urdu, with study tips and vlogs that keep the experience human.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <Reveal className="mb-12">
          <p className={eyebrow}>Who it’s for</p>
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">Built for students.</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {AUDIENCE.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className={`${card} h-full transition-colors duration-500 hover:border-signal/50`}>
                <h3 className="font-display text-3xl tracking-tight">{t}</h3>
                <p className="mt-3 text-paper/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className={eyebrow}>Study playbook</p>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">Five habits for entry-test maths.</h2>
            <p className="mt-6 text-paper/65">Simple, repeatable, and good advice whoever you study with.</p>
          </Reveal>
          <ol className="border-t border-line lg:col-span-8">
            {HABITS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <li className="grid grid-cols-12 gap-4 border-b border-line py-7">
                  <span className="col-span-2 font-mono text-xs text-signal md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <div className="col-span-10 md:col-span-11">
                    <h3 className="font-display text-3xl tracking-tight">{t}</h3>
                    <p className="mt-2 max-w-xl text-paper/65">{d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <Reveal className="border-2 border-foreground/15 bg-card p-10 text-center shadow-[12px_12px_0_0_rgb(31_93_76/0.12)] md:p-20">
          <p className="font-display text-5xl leading-[1] tracking-tight md:text-8xl">
            Subscribe. Follow.<br />
            <em className="text-signal">Learn. Explore.</em>
          </p>
        </Reveal>
      </section>
    </>
  );
}