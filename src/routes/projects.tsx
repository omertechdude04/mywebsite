import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageFrame } from "@/components/comic/PageFrame";
import { Halftone, DiagonalStripes } from "@/components/comic/Halftone";
import { projects, previewUrl } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — OmerTechDude · Issue #002" },
      { name: "description", content: "Real, live projects by Omer Taib — streaming platforms, business sites, indie game studios and premium e-commerce." },
      { property: "og:title", content: "Projects — OmerTechDude" },
      { property: "og:description", content: "A splash-page tour of every shipped project." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageFrame chapter="Chapter 02 — My Projects" title="// projects.tsx">
      {/* Title splash */}
      <section className="relative overflow-hidden border-b-[2.5px] border-ink bg-yellow">
        <Halftone className="absolute inset-0" opacity={0.25} size={8} />
        <DiagonalStripes className="absolute right-0 top-0 h-40 w-1/2" opacity={0.25} />
        <div className="relative mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">Vol. 01 · Issue 002</div>
          <h1 className="mt-3 font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.85]">
            <span className="text-red">MY</span> PROJECTS
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">
            Every project below is live. Real clients. Real code. Click any panel to open the live site.
          </p>
        </div>
      </section>

      {/* Splash projects */}
      <section className="relative bg-cream">
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="space-y-24">
            {projects.map((p, i) => (
              <ProjectSplash key={p.id} project={p} flip={i % 2 === 1} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-b-[2.5px] border-ink bg-yellow">
        <DiagonalStripes className="absolute inset-0" opacity={0.18} />

        <div className="relative mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 py-14 md:px-8">
          <div>
            <h3 className="font-display text-5xl leading-none md:text-7xl">
              NEED A WEBSITE <br /> THAT STANDS OUT?
            </h3>

            <p className="mt-4 max-w-xl text-lg text-ink/85">
              Whether you're a business, creator, or startup, I build custom websites
              designed around your goals, brand, and audience.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border-[2.5px] border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream shadow-[5px_5px_0_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Start your project →
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}

const accentBg: Record<string, string> = {
  red: "bg-red",
  orange: "bg-orange",
  yellow: "bg-yellow",
  cyan: "bg-cyan",
};

function ProjectSplash({
  project: p,
  flip,
  index,
}: {
  project: (typeof projects)[number];
  flip: boolean;
  index: number;
}) {
  return (
    <motion.article
      id={p.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-32"
    >
      <div className={`grid items-center gap-8 md:grid-cols-[1.55fr_1fr] ${flip ? "md:[&>div:first-child]:order-2" : ""}`}>
        {/* Preview */}
        <div className="group relative">
          <div className={`absolute -inset-3 -z-10 ${accentBg[p.accent]}`} style={{ clipPath: "polygon(2% 0, 100% 4%, 98% 100%, 0 96%)" }} />
          <div className="panel relative overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden border-b-[2.5px] border-ink bg-offwhite">
              {p.url ? (
                <>
                  <img
                    src={previewUrl(p.url, 1600, 1000)}
                    alt={`Live website preview of ${p.title}`}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                  {/* spotlight */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(600px circle at 30% 30%, rgba(255,255,255,0.25), transparent 60%)" }} />
                </>
              ) : (
                <div className="grid h-full w-full place-items-center bg-ink text-cream">
                  <div className="text-center">
                    <div className="font-mono text-xs uppercase tracking-widest text-cyan">// classified panel</div>
                    <div className="mt-2 font-display text-7xl">COMING SOON</div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-widest text-cream/60">in the next issue</div>
                  </div>
                </div>
              )}
              {/* corner sticker */}
              <div className={`absolute -left-3 -top-3 grid h-20 w-20 -rotate-6 place-items-center rounded-full border-[2.5px] border-ink ${accentBg[p.accent]} font-display text-2xl shadow-[3px_3px_0_0_var(--ink)]`}>
                #{p.number}
              </div>
              <div className="absolute right-3 top-3 border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
                {p.status}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t-[2.5px] border-ink bg-offwhite px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-ink/70">
              <span>// {p.url ? new URL(p.url).hostname : "tba.lovable.app"}</span>
              <span>{p.year} · {p.role}</span>
            </div>
          </div>
        </div>

        {/* Story */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">Project {p.number} · {p.category}</div>
          <h2 className="mt-2 font-display text-6xl leading-[0.9] md:text-7xl">{p.title}</h2>
          <p className="mt-3 font-editorial text-xl italic text-ink/80">{p.tagline}</p>

          <div className="mt-5 space-y-4">
            <Block label="The Story" body={p.story} />
            <Block label="The Challenge" body={p.challenge} />
            <Block label="The Solution" body={p.solution} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="kbd-chip">{s}</span>
            ))}
          </div>

          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-[2.5px] border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-cream shadow-[5px_5px_0_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Visit live site ↗
            </a>
          ) : (
            <button
              disabled
              className="mt-6 inline-flex cursor-not-allowed items-center gap-2 border-[2.5px] border-ink bg-cream px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink/60"
            >
              Locked · In production
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-l-[3px] border-ink pl-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">{label}</div>
      <p className="mt-1 text-ink/85">{body}</p>
    </div>
  );
}
