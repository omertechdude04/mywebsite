import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageFrame } from "@/components/comic/PageFrame";
import { Halftone, DiagonalStripes } from "@/components/comic/Halftone";
import { Marquee } from "@/components/comic/Marquee";
import { projects, previewUrl } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OmerTechDude — Frontend Engineer · Issue #001" },
      { name: "description", content: "Hand-drawn, hand-coded portfolio for frontend engineer Omer Taib. Websites that feel like comic books and run like software." },
      { property: "og:title", content: "OmerTechDude — Interactive Graphic Novel Portfolio" },
      { property: "og:description", content: "Frontend engineer crafting bold, memorable web experiences." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageFrame chapter="Chapter 01 — The Origin" title="// home.tsx">
      {/* HERO */}
      <section className="relative overflow-hidden border-b-[2.5px] border-ink">
        <Halftone className="absolute inset-0" opacity={0.18} size={9} />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 hidden h-[480px] w-[480px] rotate-12 bg-red md:block"
          style={{ clipPath: "polygon(0 0, 100% 12%, 88% 100%, 6% 92%)" }}
        />
        <DiagonalStripes className="absolute right-0 top-0 hidden h-40 w-40 md:block" opacity={0.4} />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr] md:gap-14 md:px-8 md:py-24">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">
              <span className="kbd-chip">~/portfolio</span>
              <span>·</span>
              <span>Vol. 01</span>
              <span>·</span>
              <span>Issue 001</span>
              <span>·</span>
              <span className="text-red">Now Available</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-5 font-display text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.85]"
            >
              I BUILD <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-cream">WEBSITES</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 -z-0 h-[0.7em] -skew-x-6 bg-ink" />
              </span>{" "}
              THAT <br />
              <span className="text-red">PUNCH</span>{" "}
              <span className="font-editorial italic font-normal">off the page.</span>
            </motion.h1>

            <p className="mt-6 max-w-xl text-lg text-ink/80 md:text-xl">
              I’m <span className="font-semibold">Omer Taib</span> — a frontend engineer who treats every site like a panel in a graphic novel.
              Bold typography, tight interactions, real performance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 border-[2.5px] border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream shadow-[5px_5px_0_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Read Issue 02 — Projects
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-[2.5px] border-ink bg-yellow px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink shadow-[5px_5px_0_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Start a project
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 font-mono text-[11px] uppercase tracking-widest">
              {[
                { k: "Stack", v: "React · TS · Tailwind" },
                { k: "Focus", v: "Frontend · Motion · SEO" },
                { k: "Status", v: "Open for work" },
              ].map((s) => (
                <div key={s.k} className="border-2 border-ink bg-offwhite p-3 shadow-[3px_3px_0_0_var(--ink)]">
                  <div className="text-ink/50">{s.k}</div>
                  <div className="mt-1 text-ink">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero portrait panel */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="panel relative aspect-[4/5] overflow-hidden">
              {/* Inner art */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow via-orange to-red" />
              <Halftone className="absolute inset-0" opacity={0.45} size={7} />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 14px)",
                }}
              />
              {/* Silhouette stand-in for portrait */}
              <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full">
                <defs>
                  <clipPath id="panelMask">
                    <rect x="0" y="0" width="400" height="500" />
                  </clipPath>
                </defs>
                <g clipPath="url(#panelMask)">
                  {/* shoulders / head */}
                  <ellipse cx="200" cy="220" rx="110" ry="120" fill="var(--ink)" />
                  <path d="M60 500 C 60 360 140 320 200 320 C 260 320 340 360 340 500 Z" fill="var(--ink)" />
                  {/* visor */}
                  <rect x="120" y="195" width="160" height="42" rx="6" fill="var(--cyan)" />
                  <rect x="120" y="195" width="160" height="42" rx="6" fill="none" stroke="var(--ink)" strokeWidth="3" />
                  {/* chest tag */}
                  <rect x="160" y="370" width="80" height="22" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
                  <text x="200" y="386" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--ink)">OMER.T</text>
                </g>
              </svg>

              {/* Speech bubble */}
              <div className="absolute -left-3 bottom-6 max-w-[70%] -rotate-2 speech-bubble shadow-[4px_4px_0_0_var(--ink)]">
                <p className="font-display text-xl leading-none">
                  “Let’s build something <span className="text-red">unforgettable.</span>”
                </p>
              </div>

              {/* Sticker */}
              <div className="absolute -right-4 -top-4 grid h-20 w-20 -rotate-12 place-items-center rounded-full border-[2.5px] border-ink bg-cyan font-mono text-[10px] uppercase tracking-widest text-ink shadow-[3px_3px_0_0_var(--ink)]">
                <div className="text-center leading-tight">
                  NEW
                  <br />ISSUE
                </div>
              </div>
            </div>

            {/* Panel caption */}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink/70">
              <span>// fig.01 — our hero</span>
              <span>panel 1 of ∞</span>
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="border-y-[2.5px] border-ink bg-ink text-cream">
          <Marquee className="py-3 font-display text-2xl uppercase tracking-wide">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-6">
                Frontend Engineer
                <span className="text-red">★</span>
                Brand Sites
                <span className="text-yellow">★</span>
                Landing Pages
                <span className="text-cyan">★</span>
                Motion &amp; Interaction
                <span className="text-orange">★</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* FEATURED PROJECTS PREVIEW */}
      <section className="relative border-b-[2.5px] border-ink bg-offwhite">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">// chapter 02 preview</div>
              <h2 className="mt-2 font-display text-6xl md:text-8xl">FEATURED PANELS</h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-ink hover:text-cream">
              See all projects →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((p, i) => (
              <Link
                key={p.id}
                to="/projects"
                hash={p.id}
                className="group relative block panel overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b-[2.5px] border-ink">
                  {p.url ? (
                    <img
                      src={previewUrl(p.url, 1400, 875)}
                      alt={`${p.title} live website preview`}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-ink text-cream">
                      <div className="text-center">
                        <div className="font-mono text-xs uppercase tracking-widest text-cyan">// classified</div>
                        <div className="mt-2 font-display text-5xl">COMING SOON</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute left-3 top-3 border-2 border-ink bg-yellow px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
                    #{p.number} · {p.category}
                  </div>
                  <div className="absolute right-3 top-3 border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
                    {p.status}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <div className="font-display text-3xl leading-none">{p.title}</div>
                    <p className="mt-1 text-sm text-ink/70">{p.tagline}</p>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-ink/70 transition group-hover:text-red">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / PANELS */}
      <section className="relative border-b-[2.5px] border-ink bg-cream">
        <Halftone className="absolute inset-0" opacity={0.12} size={12} />
        <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid items-end gap-6 md:grid-cols-[1.2fr_1fr]">
            <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
              MY WORKFLOW <br /> IN <span className="text-red">FOUR PANELS.</span>
            </h2>
            <p className="text-lg text-ink/80">
              No mystery. No fluff. Just a tight loop of listening, sketching, building, and polishing —
              until the site feels inevitable.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              { n: "01", t: "Listen", d: "We talk about the people, the story, the stakes." , c: "yellow"},
              { n: "02", t: "Sketch", d: "Layouts, type, motion — drafted as comic panels." , c: "orange"},
              { n: "03", t: "Build", d: "Hand-coded React, accessible by default, fast on day one." , c: "cyan"},
              { n: "04", t: "Polish", d: "Micro-interactions, SEO, and the details nobody else ships." , c: "red"},
            ].map((s) => (
              <div key={s.n} className="panel relative overflow-hidden">
                <div className={`flex items-baseline justify-between border-b-[2.5px] border-ink p-4`}
                  style={{ background: `var(--${s.c})` }}>
                  <div className="font-mono text-[10px] uppercase tracking-widest">PANEL {s.n}</div>
                  <div className="font-display text-3xl leading-none">{s.t}</div>
                </div>
                <div className="p-5 text-ink/80">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CODE STRIP */}
      <section className="relative overflow-hidden border-b-[2.5px] border-ink bg-ink text-cream">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 md:grid-cols-[1fr_1.2fr] md:px-8 md:py-24">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">// behind the curtain</div>
            <h2 className="mt-2 font-display text-6xl leading-[0.9] md:text-8xl">
              CODE THAT <br />READS LIKE <span className="text-yellow">A SCRIPT.</span>
            </h2>
            <p className="mt-5 max-w-md text-cream/80">
              Components named for humans. Files that tell a story. Tests where they matter. Performance budgets that hold.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 border-2 border-cream px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-cream hover:text-ink"
            >
              Read the origin story →
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden border-[2.5px] border-cream bg-gunmetal shadow-[8px_8px_0_0_var(--cream)]">
              <div className="flex items-center justify-between border-b-2 border-cream/40 px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                </div>
                <span className="opacity-60">~/omer/portfolio · Hero.tsx</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-cream/90">
{`export function Hero() {
  const punch = useInkAnimation();
  return (
    <Panel border="ink" shadow="hard">
      <Title size="splash" weight="bebas">
        "Let's build something
         unforgettable."
      </Title>
      <Caption tone="cyan">// panel 1 of ∞</Caption>
      <CTA href="/contact" variant="comic">
        Start a project →
      </CTA>
    </Panel>
  );
}`}
              </pre>
            </div>
            <div className="absolute -right-3 -top-3 grid h-16 w-16 -rotate-6 place-items-center border-[2.5px] border-cream bg-red font-mono text-[10px] uppercase tracking-widest text-cream shadow-[3px_3px_0_0_var(--cream)]">
              LIVE
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-b-[2.5px] border-ink bg-red text-cream">
        <DiagonalStripes className="absolute inset-0" color="var(--cream)" opacity={0.12} />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-6 px-5 py-16 md:grid-cols-[1.6fr_1fr] md:px-8 md:py-20">
          <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
            GOT A STORY <br /> WORTH SHIPPING?
          </h2>
          <div>
            <p className="text-cream/90">
              Booking a small number of projects each quarter. Send a short brief and let’s plot the next issue.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 border-[2.5px] border-cream bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream shadow-[5px_5px_0_0_var(--cream)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Start the conversation →
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
