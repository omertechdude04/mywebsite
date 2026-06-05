import { Link } from "@tanstack/react-router";
import { Halftone } from "./Halftone";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[2.5px] border-ink bg-ink text-cream">
      <Halftone className="absolute inset-0" color="var(--cream)" opacity={0.08} size={8} />
      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">// the end of issue 001</div>
          <h3 className="mt-2 font-display text-5xl leading-none md:text-7xl">
            TO BE <span className="text-red">CONTINUED…</span>
          </h3>
          <p className="mt-4 max-w-md text-cream/70">
            New chapter dropping with every project. Want to be in the next issue? Send a transmission.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 border-2 border-cream bg-red px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-cream shadow-[4px_4px_0_0_var(--cream)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Start a project →
          </Link>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">Chapters</div>
          <ul className="mt-3 space-y-1.5 font-display text-2xl">
            <li><Link to="/" className="hover:text-yellow">Home</Link></li>
            <li><Link to="/projects" className="hover:text-yellow">Projects</Link></li>
            <li><Link to="/about" className="hover:text-yellow">About</Link></li>
            <li><Link to="/services" className="hover:text-yellow">Services</Link></li>
            <li><Link to="/testimonials" className="hover:text-yellow">Praise</Link></li>
            <li><Link to="/contact" className="hover:text-yellow">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">Colophon</div>
          <p className="mt-3 text-cream/80">
            Hand-drawn, hand-coded by <span className="text-yellow">Omer Taib</span>. Built with React, TypeScript &amp; a lot of espresso.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
            <span className="border border-cream/30 px-2 py-1">React</span>
            <span className="border border-cream/30 px-2 py-1">TypeScript</span>
            <span className="border border-cream/30 px-2 py-1">Tailwind</span>
            <span className="border border-cream/30 px-2 py-1">Framer</span>
            <span className="border border-cream/30 px-2 py-1">Lenis</span>
          </div>
        </div>
      </div>
      <div className="relative border-t border-cream/15">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-cream/60 md:px-8">
          <span>© {new Date().getFullYear()} OmerTechDude — All panels reserved.</span>
          <span>Vol. 1 · No. 001 · Printed on the web</span>
        </div>
      </div>
    </footer>
  );
}
