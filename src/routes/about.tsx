import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageFrame } from "@/components/comic/PageFrame";
import { Halftone, DiagonalStripes } from "@/components/comic/Halftone";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — OmerTechDude · Issue #003" },
      { name: "description", content: "The origin story of Omer Taib — a frontend engineer who treats the browser like a sketchbook." },
      { property: "og:title", content: "About — OmerTechDude" },
      { property: "og:description", content: "Journey, skills, values and process — told as a graphic-novel origin story." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { y: "Day 1", t: "Curiosity strikes", b: "First HTML file. First <button>. Realises the browser is the most powerful canvas ever shipped." },
  { y: "Chapter 02", t: "Goes deep on React", b: "Learns the language of components. Falls in love with TypeScript. Starts treating UI like a system." },
  { y: "Chapter 03", t: "Ships for real clients", b: "Streaming, land-buying, indie games, premium e-commerce. Every project a different genre." },
  { y: "Now", t: "Crafts &amp; collaborates", b: "Building memorable, fast, accessible web experiences for founders who care about details." },
  { y: "Next", t: "Bigger panels", b: "Tooling, motion systems, and the next chapter of OmerTechDude." },
];

const values = [
  { t: "Craft over hype", b: "Every line of code should earn its place." },
  { t: "Speed is design", b: "Performance is a feature visitors feel." },
  { t: "Clarity beats clever", b: "Code other humans love to read." },
  { t: "Ship the details", b: "The 1% nobody else does — that’s the brand." },
];

export default function AboutPage() {
  return (
    <PageFrame chapter="Chapter 03 — Origin Story" title="// about.tsx">
      <section className="relative overflow-hidden border-b-[2.5px] border-ink bg-orange">
        <Halftone className="absolute inset-0" opacity={0.25} size={9} />
        <DiagonalStripes className="absolute -left-10 top-0 h-40 w-40 -rotate-12" opacity={0.4} />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:px-8 md:py-24">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">Issue 003</div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 font-display text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.85]"
            >
              ORIGIN <br /><span className="text-cream">STORY.</span>
            </motion.h1>
            <p className="mt-5 max-w-xl text-lg text-ink/85">
              I’m Omer Taib. I build websites the way other people draw comic panels — frame by frame,
              with intention in every gutter. By day, I’m a frontend engineer. By night, I’m a kid with a
              sketchbook full of interface ideas.
            </p>
          </div>

          <div className="relative">
            <div className="panel aspect-square overflow-hidden">
              <div className="relative h-full w-full bg-gradient-to-br from-cream via-yellow to-red">
                <Halftone className="absolute inset-0" opacity={0.4} size={7} />
                <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
                  <circle cx="150" cy="130" r="62" fill="var(--ink)" />
                  <rect x="92" y="110" width="116" height="28" rx="4" fill="var(--cyan)" stroke="var(--ink)" strokeWidth="3" />
                  <path d="M50 300 C 50 220 100 190 150 190 C 200 190 250 220 250 300 Z" fill="var(--ink)" />
                  <rect x="120" y="232" width="60" height="18" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2" />
                  <text x="150" y="245" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink)">OMER.T</text>
                </svg>
                <div className="absolute -right-2 -top-2 grid h-16 w-16 -rotate-6 place-items-center rounded-full border-[2.5px] border-ink bg-cyan font-display text-2xl shadow-[3px_3px_0_0_var(--ink)]">
                  03
                </div>
              </div>
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink/70">// fig.02 — our hero, unmasked</div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative border-b-[2.5px] border-ink bg-cream">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">// the journey</div>
          <h2 className="mt-2 font-display text-6xl leading-[0.9] md:text-8xl">THE TIMELINE.</h2>

          <ol className="relative mt-12 grid gap-8 border-l-[3px] border-ink pl-8 md:pl-12">
            {timeline.map((row, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative panel p-6"
              >
                <span className="absolute -left-[46px] top-6 grid h-10 w-10 place-items-center rounded-full border-[2.5px] border-ink bg-red font-mono text-[10px] uppercase tracking-widest text-cream shadow-[3px_3px_0_0_var(--ink)] md:-left-[58px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">{row.y}</div>
                <h3 className="mt-1 font-display text-3xl leading-none" dangerouslySetInnerHTML={{ __html: row.t }} />
                <p className="mt-2 text-ink/80" dangerouslySetInnerHTML={{ __html: row.b }} />
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="relative border-b-[2.5px] border-ink bg-ink text-cream">
        <Halftone className="absolute inset-0" color="var(--cream)" opacity={0.06} size={9} />
        <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">// the values</div>
          <h2 className="mt-2 font-display text-6xl leading-[0.9] md:text-8xl">RULES I CODE BY.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.t} className="border-[2.5px] border-cream bg-gunmetal p-6 shadow-[6px_6px_0_0_var(--cream)]">
                <div className="font-display text-3xl leading-none">{v.t}</div>
                <p className="mt-2 text-cream/80">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-b-[2.5px] border-ink bg-yellow">
        <DiagonalStripes className="absolute inset-0" opacity={0.18} />
        <div className="relative mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 py-14 md:px-8">
          <h3 className="font-display text-5xl leading-none md:text-7xl">
            READY FOR <br /> THE NEXT CHAPTER?
          </h3>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border-[2.5px] border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream shadow-[5px_5px_0_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            See the services →
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
