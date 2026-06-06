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
    tagline: "Discover where to watch any movie in seconds.",
    url: "https://popcorntimenew.netlify.app/",
    status: "Live",
    year: "2025",
    role: "Design + Frontend Development",
    category: "Movie Discovery Platform",
    stack: ["React", "TypeScript", "TMDB API", "Tailwind"],
    story:
      "A web application built for movie fans who are tired of searching multiple streaming services. Users can find where a movie is available, watch trailers, view cast information, and explore release details all in one place.",
    challenge:
      "Combine large amounts of movie data into a clean and easy-to-use interface while keeping performance fast across devices.",
    solution:
      "Integrated external movie APIs, optimized data loading, and designed an intuitive experience focused on helping users find content quickly.",
    accent: "red",
  },
  {
    id: "sell-us-your-land",
    number: "02",
    title: "Sell Us Your Land",
    tagline: "A professional lead-generation website for landowners.",
    url: "https://sellusyourlandnow.com",
    status: "Live",
    year: "2025",
    role: "Frontend Development + SEO",
    category: "Business Website",
    stack: ["React", "Tailwind", "Forms", "SEO"],
    story:
      "Built for a company that purchases land directly from property owners across the United States. The website focuses on trust, simplicity, and generating qualified leads.",
    challenge:
      "Create a professional online presence that encourages visitors to submit property information without overwhelming them.",
    solution:
      "Designed streamlined forms, clear calls-to-action, and an SEO-focused structure to improve visibility and conversions.",
    accent: "orange",
  },
  {
    id: "space-kitten",
    number: "03",
    title: "Space Kitten Studio",
    tagline: "The project that started it all.",
    url: "https://spacekittenstudios.com",
    status: "Live",
    year: "2024",
    role: "Design + Frontend Development",
    category: "Portfolio Website",
    stack: ["HTML", "CSS", "JavaScript"],
    story:
      "My first website, created for my sister's costume-making business after learning from online tutorials. What began as a small project quickly became the start of my web development journey.",
    challenge:
      "Build a professional portfolio without prior experience while learning the fundamentals of web development from scratch.",
    solution:
      "Focused on creating a clean showcase for her work and gained the confidence to pursue web development more seriously.",
    accent: "cyan",
  },
  {
    id: "heart-premium",
    number: "04",
    title: "Heart Premium Oil Paintings",
    tagline: "A premium Shopify experience for collectible artwork.",
    url: "https://heartpremiumoilpaintings.com/",
    status: "In Development",
    year: "2026",
    role: "Shopify Development + Store Design",
    category: "E-Commerce",
    stack: ["Shopify", "Liquid", "Custom Theme Development"],
    story:
      "An online store for a company specializing in limited-edition hand-painted oil paintings. The goal is to create a premium shopping experience that reflects the quality and exclusivity of the artwork.",
    challenge:
      "Present artwork in a way that feels elegant and trustworthy while maintaining a smooth purchasing experience.",
    solution:
      "Building a custom Shopify storefront focused on high-quality visuals, clear product presentation, and conversion-driven design.",
    accent: "yellow",
  },
  {
    id: "next",
    number: "05",
    title: "Your Project",
    tagline: "The next success story could be yours.",
    url: null,
    status: "Open for Work",
    year: "2026",
    role: "Web Developer",
    category: "Available",
    stack: ["React", "TypeScript", "Shopify", "Tailwind"],
    story:
      "I'm currently accepting new projects for businesses, creators, and entrepreneurs looking for a custom website or e-commerce solution.",
    challenge:
      "Every project has different goals, audiences, and requirements.",
    solution:
      "A tailored approach focused on building fast, modern, and professional websites designed around your vision.",
    accent: "red",
  },
];

export function previewUrl(url: string, w = 1600, h = 1000) {
  // thum.io — public, no API key required
  return `https://image.thum.io/get/width/${w}/crop/${h}/noanimate/${url}`;
}
