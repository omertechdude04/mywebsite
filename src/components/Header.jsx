import { useMemo } from "react"

function isHttp(v) {
  return typeof v === "string" && /^https?:\/\//i.test(v)
}

function publicUrlFor(path) {
  const base = import.meta.env.VITE_SUPABASE_URL
  if (!base || !path) return ""
  const cleanBase = base.replace(/\/+$/, "")
  const cleanPath = String(path).replace(/^\/+/, "")
  return `${cleanBase}/storage/v1/object/public/portfolio/${cleanPath}`
}

function resolveImage(maybeUrlOrPath) {
  if (!maybeUrlOrPath) return ""
  if (isHttp(maybeUrlOrPath)) return maybeUrlOrPath
  return publicUrlFor(maybeUrlOrPath)
}

export default function Header({ content }) {
  const brandName = content?.branding?.name || "OMER TECH DUDE"
  const tagline = content?.branding?.tagline || "Web Development"

  const logoSrc = useMemo(() => {
    const v = content?.branding?.logoUrl || content?.branding?.logoPath || ""
    return resolveImage(v)
  }, [content])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="nav">
      <div className="container">
        <div className="navInner">
          <div className="brand" onClick={() => scrollTo("top")} role="button" tabIndex={0}>
            <div className="brandMark" aria-hidden="true">
              {logoSrc ? <img src={logoSrc} alt="" /> : null}
            </div>
            <div className="brandText">
              <strong>{brandName}</strong>
              <span>{tagline}</span>
            </div>
          </div>

          <nav className="navLinks" aria-label="Primary">
            <button className="pill" onClick={() => scrollTo("projects")}>
              Projects
            </button>
            <button className="pill" onClick={() => scrollTo("skills")}>
              Skills
            </button>
            <button className="pill" onClick={() => scrollTo("pricing")}>
              Pricing
            </button>
            <button className="pill" onClick={() => scrollTo("contact")}>
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
