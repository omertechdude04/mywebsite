import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo.png";

const links = [
  { to: "/", label: "Home", num: "01" },
  { to: "/projects", label: "Projects", num: "02" },
  { to: "/about", label: "About", num: "03" },
  { to: "/services", label: "Services", num: "04" },
  { to: "/contact", label: "Contact", num: "05" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[2.5px] border-ink bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex items-center justify-center transition-transform group-hover:-rotate-3">
            <img
              src={logo}
              alt="OmerTechDude Logo"
              className="h-26 w-auto object-contain"
            />
          </div>

          <div className="leading-none">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
               Web Developer
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            activeProps={{
              className:
                "border-2 border-ink rounded-full text-ink bg-transparent",
            }}
            className="group relative inline-flex items-center gap-2 rounded-full border-2 border-transparent px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-all duration-200 hover:border-ink"
          >
            <span className="opacity-60">{l.num}</span>
            <span className="font-sans text-sm font-semibold tracking-tight">
              {l.label}
            </span>
          </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center border-[2.5px] border-ink bg-yellow shadow-[3px_3px_0_0_var(--ink)] md:hidden"
        >
          <div className="space-y-1">
            <span className="block h-[2px] w-5 bg-ink" />
            <span className="block h-[2px] w-5 bg-ink" />
            <span className="block h-[2px] w-5 bg-ink" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t-[2.5px] border-ink bg-offwhite md:hidden"
          >
            <ul className="flex flex-col p-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "bg-ink text-cream" }}
                    className="flex items-center justify-between border-b border-ink/10 px-3 py-3 font-display text-2xl tracking-wide last:border-0"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-xs opacity-60">
                      {l.num}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}