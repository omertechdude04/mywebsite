import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { PageFrame } from "@/components/comic/PageFrame";
import { Halftone, DiagonalStripes } from "@/components/comic/Halftone";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Omer Tech Dude"},
      { name: "description", content: "Special abilities of a frontend engineer: business sites, portfolios, landing pages, redesigns, responsive optimisation, SEO." },
      { property: "og:title", content: "Services — Omer Tech Dude" },
      { property: "og:description", content: "Pick a power. Ship a website that punches." },
    ],
  }),
  component: ServicesPage,
});

type Service = {
  id: string;
  power: string;
  title: string;
  tagline: string;
  bullets: string[];
  accent: "red" | "orange" | "yellow" | "cyan";
  icon: ReactNode;
};

const services: Service[] = [
  {
    id: "business",
    power: "Power 01",
    title: "Business Websites",
    tagline: "Trust-first sites that turn visitors into customers.",
    bullets: ["Tailored layout & copy structure", "Lead forms that actually convert", "CMS-ready content blocks", "Analytics + tracking from day one"],
    accent: "red",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12">
        <rect x="6" y="14" width="52" height="40" rx="3" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="6" y="14" width="52" height="10" fill="var(--ink)" />
        <rect x="14" y="30" width="36" height="6" fill="var(--ink)" />
        <rect x="14" y="40" width="22" height="6" fill="var(--ink)" />
      </svg>
    ),
  },
  {
    id: "portfolio",
    power: "Power 02",
    title: "Portfolio Websites",
    tagline: "A canvas built around your story, not a template.",
    bullets: ["Art-directed layouts", "Project case studies", "Custom interactions", "Pixel-tight typography"],
    accent: "orange",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12">
        <rect x="8" y="10" width="48" height="44" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="22" cy="24" r="6" fill="var(--ink)" />
        <path d="M8 50 L28 30 L40 42 L56 26 L56 54 L8 54 Z" fill="var(--ink)" />
      </svg>
    ),
  },
  {
    id: "landing",
    power: "Power 03",
    title: "Landing Pages",
    tagline: "Single-purpose pages engineered to convert.",
    bullets: ["Hero, proof, offer, CTA — tight", "A/B-friendly structure", "Fast first paint", "Built-in SEO bones"],
    accent: "yellow",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12">
        <rect x="10" y="8" width="44" height="48" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="16" y="16" width="32" height="14" fill="var(--ink)" />
        <rect x="16" y="34" width="20" height="4" fill="var(--ink)" />
        <rect x="16" y="42" width="14" height="6" fill="var(--ink)" />
      </svg>
    ),
  },
  {
    id: "redesign",
    power: "Power 04",
    title: "Website Redesigns",
    tagline: "Take an outdated site and make it punch.",
    bullets: ["Audit + strategy", "Visual refresh", "Information architecture", "Migration without downtime"],
    accent: "cyan",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12">
        <path d="M14 32 a18 18 0 1 1 6 13" fill="none" stroke="var(--ink)" strokeWidth="3" />
        <path d="M14 46 L20 46 L20 40" fill="none" stroke="var(--ink)" strokeWidth="3" />
        <rect x="34" y="20" width="16" height="20" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: "responsive",
    power: "Power 05",
    title: "Responsive Optimisation",
    tagline: "Make every device feel like the primary device.",
    bullets: ["Mobile-first layouts", "Touch-friendly states", "Image / font budgets", "Real-device QA"],
    accent: "red",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12">
        <rect x="6" y="14" width="36" height="32" rx="2" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="42" y="22" width="16" height="32" rx="2" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: "seo",
    power: "Power 06",
    title: "SEO Optimisation",
    tagline: "Get found by the people who already need you.",
    bullets: ["Technical SEO foundation", "Content structure & schema", "Core Web Vitals tuning", "On-page & meta hygiene"],
    accent: "orange",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12">
        <circle cx="28" cy="28" r="14" fill="none" stroke="var(--ink)" strokeWidth="3" />
        <path d="M38 38 L52 52" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
        <text x="28" y="32" textAnchor="middle" fontFamily="Bebas Neue" fontSize="14" fill="var(--ink)">SEO</text>
      </svg>
    ),
  },
];

const accentBg: Record<string, string> = {
  red: "bg-red", orange: "bg-orange", yellow: "bg-yellow", cyan: "bg-cyan",
};

export default function ServicesPage() {
  return (
    <PageFrame chapter="Chapter 04 — My Skills" title="// skills.tsx">
      {/* Hero */}
      <section className="relative overflow-hidden border-b-[2.5px] border-ink bg-cyan">
        <Halftone className="absolute inset-0" opacity={0.25} size={9} />
        <DiagonalStripes
          className="absolute right-0 top-0 h-32 w-40"
          opacity={0.3}
        />

        <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">
            Chapter 04
          </div>

          <h1 className="mt-2 font-display text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.85]">
            MY <br />
            <span className="text-cream">SKILLS.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-ink/85">
            From React and TypeScript to Shopify and responsive web design,
            these are the technologies, tools, and skills I use to build modern
            websites, web applications, and digital experiences that help
            businesses stand out online.
          </p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="relative border-b-[2.5px] border-ink bg-cream">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: (i % 3) * 0.05,
                }}
                className="group panel relative overflow-hidden p-0"
              >
                <div
                  className={`flex items-center justify-between border-b-[2.5px] border-ink ${accentBg[s.accent]} p-5`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/80">
                    {s.power}
                  </div>

                  <div className="grid h-12 w-12 place-items-center border-2 border-ink bg-cream shadow-[2px_2px_0_0_var(--ink)]">
                    {s.icon}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-4xl leading-none">
                    {s.title}
                  </h3>

                  <p className="mt-2 font-editorial text-base italic text-ink/80">
                    {s.tagline}
                  </p>

                  <ul className="mt-4 space-y-1.5 font-mono text-[12px] uppercase tracking-wider text-ink/80">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-red">▸</span>
                        <span className="normal-case">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="relative border-b-[2.5px] border-ink bg-ink text-cream">
        <div className="absolute inset-0 blueprint-grid opacity-15" />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:px-8 md:py-20">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              // core strengths
            </div>

            <h2 className="mt-2 font-display text-6xl leading-[0.9] md:text-7xl">
              MODERN TOOLS. <br />
              REAL RESULTS.
            </h2>

            <p className="mt-5 max-w-md text-cream/80">
              Technology is only valuable when it solves problems. I focus on
              tools that create fast, reliable, and user-friendly websites that
              help businesses build credibility and grow online.
            </p>

            <Link
              to="/projects"
              className="mt-6 inline-flex items-center gap-2 border-[2.5px] border-cream bg-red px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream shadow-[5px_5px_0_0_var(--cream)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              View my projects →
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                k: "Frontend",
                v: "React, TypeScript, JavaScript",
              },
              {
                k: "Styling",
                v: "Tailwind CSS & Responsive Design",
              },
              {
                k: "E-Commerce",
                v: "Shopify Development",
              },
            ].map((row) => (
              <div
                key={row.k}
                className="border-[2.5px] border-cream bg-gunmetal p-5 shadow-[5px_5px_0_0_var(--cream)]"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                  {row.k}
                </div>

                <div className="mt-1 font-display text-3xl">
                  {row.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}