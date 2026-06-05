import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Grain } from "./Halftone";

export function PageFrame({
  children,
  chapter,
  title,
}: {
  children: ReactNode;
  chapter: string;
  title: string;
}) {
  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <Grain opacity={0.06} />
      <Nav />
      <div className="border-b-[2.5px] border-ink bg-offwhite">
        <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 py-3 md:px-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
            {chapter}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
            {title}
          </div>
        </div>
      </div>
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}
