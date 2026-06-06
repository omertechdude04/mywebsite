import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageFrame } from "@/components/comic/PageFrame";
import { Halftone, DiagonalStripes } from "@/components/comic/Halftone";
import myimage from "/myimage.png";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Omer Tech Dude" },
      { name: "description", content: "The origin story of Omer Taib — a frontend engineer who treats the browser like a sketchbook." },
      { property: "og:title", content: "About — OmerTechDude" },
      { property: "og:description", content: "Journey, skills, values and process — told as a graphic-novel origin story." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  {
    y: "Late 2024",
    t: "The first website",
    b: "Built Space Kitten Studio, a portfolio website for my sister's costume-making business. Started with a YouTube tutorial, but finished with a realization: web development was something I genuinely enjoyed."
  },
  {
    y: "2024–2025",
    t: "Learning the craft",
    b: "Dove deep into Codecademy and countless hours of practice. Learned HTML, CSS, JavaScript, React, and TypeScript while turning curiosity into a growing skill set."
  },
  {
    y: "2025",
    t: "First client project",
    b: "Developed Sell Us Your Land, a website for a company that purchases land directly from property owners. It was my first experience building a real-world solution for a business."
  },
  {
    y: "2025",
    t: "Building my own products",
    b: "Created Popcorn Time, a movie discovery web app that helps users find where films are streaming, watch trailers, explore cast information, and discover release details all in one place."
  },
  {
    y: "2026",
    t: "Expanding into e-commerce",
    b: "Developing a Shopify storefront for a company specializing in limited-edition hand-painted oil paintings, combining custom design with a polished shopping experience."
  },
  {
    y: "Today",
    t: "Building for what's next",
    b: "Focused on creating modern websites, web applications, and e-commerce experiences that are fast, responsive, and tailored to each client's vision."
  },
];

const values = [
  {
    t: "Built around the client",
    b: "Every website starts with understanding the client's goals, audience, and vision."
  },
  {
    t: "Clean code, lasting results",
    b: "I build websites that are easy to maintain, scale, and improve long after launch."
  },
  {
    t: "Performance matters",
    b: "Fast, responsive experiences keep visitors engaged and businesses growing."
  },
  {
    t: "Details make the difference",
    b: "From animations to spacing, every element should feel intentional and polished."
  },
];

export default function AboutPage() {
  return (
    <PageFrame chapter="Chapter 03 — About Me" title="// about.tsx">
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
              ABOUT <br /><span className="text-cream">ME.</span>
            </motion.h1>
              <p className="mt-5 max-w-xl text-lg text-ink/85">
                I’m Omer, a frontend developer who turns ideas into fast, modern, and
                responsive websites. I work directly with clients to create experiences that
                not only look great but also help businesses stand out, connect with their
                audience, and achieve their goals.
              </p>
          </div>

          <div className="relative">
            <div className="panel aspect-square overflow-hidden">
              <div className="relative h-full w-full bg-gradient-to-br from-cream via-yellow to-red">
                <Halftone className="absolute inset-0" opacity={0.4} size={7} />
                <img
                  src={myimage}
                  alt="Omer Taib"
                  className="absolute inset-0 h-full w-full object-cover"
                />
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
