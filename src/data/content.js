import { supabase, isSupabaseConfigured } from "../lib/supabaseClient"

const STORAGE_KEY = "portfolioContent_v2"

const defaultContent = {
  nav: {
    skillsLabel: "Skills",
    projectsLabel: "Projects",
    pricingLabel: "Pricing",
    contactLabel: "Contact"
  },
  hero: {
    name: "OMER TECH DUDE",
    tagline: "I build clean, modern web experiences",
    headline: "Web Developer — clean UI, fast builds",
    about:
      "I build modern React websites for founders and creators — fast, clean, and designed to convert.",
    logoUrl: "",
    resumeUrl: "",
    kpi1Value: "Fast",
    kpi1Label: "Optimized UX & performance",
    kpi2Value: "Clean UI",
    kpi2Label: "Modern look that feels premium",
    kpi3Value: "Responsive",
    kpi3Label: "Perfect on mobile + desktop",
    kpi4Value: "Reliable",
    kpi4Label: "Clear communication + delivery"
  },
  skills: ["HTML", "CSS", "JavaScript", "React", "Redux", "Swift (basic)"],
  projects: [
    {
      id: cryptoId(),
      title: "Portfolio Website",
      description: "Modern responsive developer portfolio",
      stack: "React • UI • Vite",
      link: "",
      github: "",
      logoUrl: ""
    }
  ],
  pricing: [
    {
      id: cryptoId(),
      name: "Basic",
      price: "$499",
      note: "Great for a clean landing page",
      features: ["Landing page", "Responsive", "Fast delivery"]
    }
  ],
  contact: {
    text: "Email me or use the form — I reply fast.",
    email: "hello@yourdomain.com",
    instagram: "",
    linkedin: "",
    formspreeUrl: ""
  }
}

// ---------- Local helpers ----------
export function getLocalContent() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : defaultContent
}

export function saveLocalContent(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ---------- Supabase helpers ----------
export async function fetchSupabaseContent() {
  if (!isSupabaseConfigured() || !supabase) return null

  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", "main")
    .single()

  if (error) return null
  return data?.data || null
}

export async function saveSupabaseContent(content) {
  if (!isSupabaseConfigured() || !supabase) throw new Error("Supabase not configured")

  const payload = { id: "main", data: content, updated_at: new Date().toISOString() }

  const { error } = await supabase
    .from("site_content")
    .upsert(payload, { onConflict: "id" })

  if (error) throw error
}

// ---------- Main API used by the site ----------
export async function loadContent() {
  // 1) Show something immediately (local cached)
  const local = getLocalContent()

  // 2) Try Supabase to get the latest global version
  const remote = await fetchSupabaseContent()
  if (remote) {
    // Keep local cache updated for fast loads
    saveLocalContent(remote)
    return remote
  }

  // 3) Fallback
  return local
}

export function cryptoId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID()
  return String(Math.random()).slice(2) + String(Date.now())
}

export function getDefaultContent() {
  return defaultContent
}

export default defaultContent
