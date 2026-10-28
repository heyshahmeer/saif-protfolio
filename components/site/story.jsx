import { Reveal } from "./reveal";

// Written from the academy's description. Edit any line that doesn't match how he really teaches.
const STEPS = [
  ["Understand the idea", "Start from the concept in plain language, until the formula feels obvious instead of memorised."],
  ["Learn the shortcut", "See the faster route and the reason it is valid, so you can trust it on test day."],
  ["Drill under time", "Practise in timed blocks. NET leaves about 54 seconds a question, so pace is a skill you train."],
];

const AUDIENCE = [
  ["NUST NET aspirants", "Students aiming at NUST engineering and computing, where maths carries the most weight."],
  ["FSc students", "Anyone who wants maths to stop feeling slow and start feeling clear."],
  ["Retakers", "Students sitting another NET series who want a sharper plan and an honest look at their mistakes."],
];

const HABITS = [
  ["Cover both years", "NET can draw on first-year and second-year concepts, sometimes inside one question. Skipping either is a gamble."],
  ["Practise against the clock", "About 54 seconds a question leaves no room to wander. Time every practice set."],
  ["High-return chapters first", "Conic sections, integration, matrices, trigonometry and calculus come up often. Make them solid early."],
  ["Use past papers late", "In the final weeks, solve past papers under test conditions and redo every question you missed."],
  ["Keep a mistake log", "Write down why you missed each question: concept, speed or carelessness. Fix the pattern, not just the question."],
];

const eyebrow = "mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal";
const card = "border-2 border-foreground/10 bg-card p-8 md:p-10";

export function Story() {
  return (
    <>
      <section className="px-6 py-28 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className={eyebrow}>Why this academy</p>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Speed comes from <em className="text-signal">understanding.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-paper/75 lg:col-span-6 lg:col-start-7">
            <p>Most entry-test marks are lost in the same two places: not knowing a concept well enough to trust it, and not having a fast route to the answer. Alsaif Academy works on both.</p>
            <p>Every shortcut here starts with the idea behind it. When you know why a trick works, you know when it stops working, and you stop second-guessing yourself under the clock.</p>
            <p>The goal is not to memorise more. It is to see a question, recognise its pattern, and move.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <Reveal className="mb-12">
          <p className={eyebrow}>How it works</p>
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">Three steps, in order.</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className={`${card} h-full`}>
                <p className="font-display text-7xl leading-none text-signal/70">{i + 1}</p>
                <h3 className="mt-8 font-display text-3xl tracking-tight">{t}</h3>
                <p className="mt-3 text-paper/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <Reveal className="mb-12">
          <p className={eyebrow}>Who it’s for</p>
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">Built for students on a clock.</h2>
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
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">Five habits for NET maths.</h2>
            <p className="mt-6 text-paper/65">Simple, repeatable, and the same advice whoever you study with.</p>
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
            Don’t memorise more.<br />
            <em className="text-signal">Recognise faster.</em>
          </p>
        </Reveal>
      </section>
    </>
  );
}