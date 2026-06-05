import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SmoothScroll } from "../components/comic/SmoothScroll";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6 text-ink">
      <div className="relative panel max-w-lg px-8 py-10 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">Issue #404</div>
        <h1 className="mt-2 font-display text-[7rem] leading-none">LOST PAGE</h1>
        <p className="mt-2 text-ink/80">This panel ended up on the cutting room floor.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 border-2 border-ink bg-red px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-cream shadow-[4px_4px_0_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          ← Back to Issue #001
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6 text-ink">
      <div className="panel max-w-lg px-8 py-10 text-center">
        <h1 className="font-display text-5xl">PANEL MISPRINT</h1>
        <p className="mt-2 text-ink/80">Something went sideways. Try turning the page again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border-2 border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-cream"
          >
            Try again
          </button>
          <a href="/" className="border-2 border-ink bg-yellow px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OmerTechDude — Frontend Engineer · Issue #001" },
      { name: "description", content: "An interactive graphic-novel portfolio by Omer Taib. Frontend engineer crafting bold websites, landing pages, and brand experiences." },
      { name: "author", content: "Omer Taib" },
      { name: "theme-color", content: "#f4ead5" },
      { property: "og:title", content: "OmerTechDude — Interactive Graphic Novel Portfolio" },
      { property: "og:description", content: "Hand-drawn, hand-coded portfolio for frontend engineer Omer Taib." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <Outlet />
      </SmoothScroll>
    </QueryClientProvider>
  );
}
