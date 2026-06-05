export type Project = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  url: string | null;
  status: "Live" | "Coming Soon";
  year: string;
  role: string;
  category: string;
  stack: string[];
  story: string;
  challenge: string;
  solution: string;
  accent: "red" | "orange" | "yellow" | "cyan";
};

export const projects: Project[] = [
  {
    id: "popcorn-time",
    number: "01",
    title: "Popcorn Time",
    tagline: "A streaming hub reimagined with cinematic energy.",
    url: "https://popcorntimenew.netlify.app/",
    status: "Live",
    year: "2024",
    role: "Design + Frontend",
    category: "Entertainment Platform",
    stack: ["React", "TypeScript", "TMDB API", "Tailwind"],
    story:
      "A modern reinterpretation of the classic streaming experience — built to feel like a movie theatre marquee in your browser.",
    challenge:
      "Render thousands of titles without choking the main thread while keeping every interaction buttery and cinematic.",
    solution:
      "Virtualised lists, image preloading, and a custom poster grid that animates in like an opening title sequence.",
    accent: "red",
  },
  {
    id: "sell-us-your-land",
    number: "02",
    title: "Sell Us Your Land",
    tagline: "A trust-first lead engine for a US land-buying business.",
    url: "https://sellusyourlandnow.com",
    status: "Live",
    year: "2024",
    role: "Frontend + SEO",
    category: "Business Website",
    stack: ["React", "Tailwind", "Form Handling", "Local SEO"],
    story:
      "A high-converting marketing site for landowners ready to sell — calm, credible, and fast.",
    challenge:
      "Convert cold visitors into qualified leads in a category dominated by spammy competitors.",
    solution:
      "Honest copy, friction-free forms, and content built around real seller questions — paired with technical SEO.",
    accent: "orange",
  },
  {
    id: "space-kitten",
    number: "03",
    title: "Space Kitten Studios",
    tagline: "A bold brand site for an indie game studio.",
    url: "https://spacekittenstudios.com",
    status: "Live",
    year: "2024",
    role: "Frontend + Motion",
    category: "Studio Branding",
    stack: ["React", "Framer Motion", "Tailwind", "Vite"],
    story:
      "A playful, character-led identity site that lets an indie studio feel a hundred people big.",
    challenge:
      "Communicate personality without crossing into cheesy — every motion needs intent.",
    solution:
      "Custom hover states, scroll storytelling, and an art-directed layout per section.",
    accent: "cyan",
  },
  {
    id: "heart-premium",
    number: "04",
    title: "Heart Premium Oil Paintings",
    tagline: "A gallery-grade storefront for handcrafted oil paintings.",
    url: "https://heartpremiumoilpaintings.com/",
    status: "Live",
    year: "2024",
    role: "Frontend + Art Direction",
    category: "E-commerce / Gallery",
    stack: ["React", "Tailwind", "Image Optimisation"],
    story:
      "An elegant catalogue that treats every painting like a museum piece — quiet typography, generous space, sharp imagery.",
    challenge:
      "Serve large artwork imagery without sacrificing speed on mobile networks.",
    solution:
      "Responsive image pipeline, lazy loading, and a layout that lets the art do the talking.",
    accent: "yellow",
  },
  {
    id: "next",
    number: "05",
    title: "Next Issue",
    tagline: "A new chapter in production.",
    url: null,
    status: "Coming Soon",
    year: "2025",
    role: "TBA",
    category: "Classified",
    stack: ["???"],
    story: "Something is being drawn in the studio right now. Stay tuned.",
    challenge: "Keep it secret. Keep it sharp.",
    solution: "Coming soon.",
    accent: "red",
  },
];

export function previewUrl(url: string, w = 1600, h = 1000) {
  // thum.io — public, no API key required
  return `https://image.thum.io/get/width/${w}/crop/${h}/noanimate/${url}`;
}
