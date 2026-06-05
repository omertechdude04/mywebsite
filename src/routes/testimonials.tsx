import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageFrame } from "@/components/comic/PageFrame";
import { Halftone, DiagonalStripes } from "@/components/comic/Halftone";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Praise — OmerTechDude · Issue #005" },
      { name: "description", content: "Client praise and reactions for OmerTechDude — a wall reserved for real words from real partners." },
      { property: "og:title", content: "Praise — OmerTechDude" },
      { property: "og:description", content: "Reserved for real client words, comic-book style." },
    ],
  }),
  component: TestimonialsPage,
});

// No fake testimonials — placeholders are clearly marked "Reserved".
const slots = [
  { who: "Reserved for a future client", what: "Your words go here.", role: "Project lead", accent: "red" as const },
  { who: "Reserved for a future client", what: "Your words go here.", role: "Founder", accent: "yellow" as const },
  { who: "Reserved for a future client", what: "Your words go here.", role: "Marketing", accent: "cyan" as const },
];

const accentBg: Record<string, string> = {
  red: "bg-red text-cream", orange: "bg-orange text-ink", yellow: "bg-yellow text-ink", cyan: "bg-cyan text-ink",
};

export default function TestimonialsPage() {
  return (
    <PageFrame chapter="Chapter 05 — The Reactions" title="// testimonials.tsx">
      <section className="relative overflow-hidden border-b-[2.5px] border-ink bg-red text-cream">
        <Halftone className="absolute inset-0" color="var(--cream)" opacity={0.15} size={9} />
        <DiagonalStripes className="absolute left-0 top-0 h-32 w-40" color="var(--cream)" opacity={0.2} />
        <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/80">Issue 005</div>
          <h1 className="mt-2 font-display text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.85]">
            THE <span className="text-yellow">PRAISE</span> <br /> WALL.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/90">
            No fake quotes. No stock photos. This wall is reserved for the real words of real clients —
            as they come in, they’ll be inked in here.
          </p>
        </div>
      </section>

      <section className="relative border-b-[2.5px] border-ink bg-cream">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {slots.map((s, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative panel p-6"
              >
                <div className={`absolute -left-3 -top-3 grid h-12 w-12 place-items-center rounded-full border-[2.5px] border-ink ${accentBg[s.accent]} font-display text-3xl shadow-[3px_3px_0_0_var(--ink)]`}>
                  “
                </div>
                <blockquote className="font-editorial text-2xl leading-snug">
                  {s.what}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t-2 border-dashed border-ink/30 pt-4 font-mono text-[10px] uppercase tracking-widest text-ink/70">
                  <span className="grid h-8 w-8 place-items-center border-2 border-ink bg-cream">?</span>
                  <div>
                    <div className="text-ink">{s.who}</div>
                    <div>{s.role}</div>
                  </div>
                </figcaption>
                <div className="absolute right-3 top-3 border border-ink bg-yellow px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest">
                  Slot open
                </div>
              </motion.figure>
            ))}
          </div>

          <div className="mt-14 grid items-center gap-6 border-[2.5px] border-ink bg-offwhite p-8 shadow-[8px_8px_0_0_var(--ink)] md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">// client spotlight</div>
              <h3 className="mt-2 font-display text-5xl leading-[0.9]">
                BEEN A CLIENT? <br />
                <span className="text-red">SEND A SOUND BITE.</span>
              </h3>
              <p className="mt-3 text-ink/80">
                A sentence, a paragraph, a screenshot — anything that captures the working experience.
                I’ll ink it into the wall above (with your blessing).
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-[2.5px] border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream shadow-[5px_5px_0_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Submit a quote →
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
