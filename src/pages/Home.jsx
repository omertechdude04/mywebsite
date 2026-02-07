import React, { useEffect, useMemo, useState } from "react";
import { getDefaultContent, cryptoId } from "../data/content";
import Header from "../components/Header";
import Contact from "../components/Contact";

// ---------- image resolving ----------
function isHttp(v) {
  return typeof v === "string" && /^https?:\/\//i.test(v);
}

function publicUrlFor(path) {
  const base = import.meta.env.VITE_SUPABASE_URL;
  if (!base || !path) return "";
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = String(path).replace(/^\/+/, "");
  return `${cleanBase}/storage/v1/object/public/portfolio/${cleanPath}`;
}

function resolveImage(maybeUrlOrPath) {
  if (!maybeUrlOrPath) return "";
  if (isHttp(maybeUrlOrPath)) return maybeUrlOrPath;
  return publicUrlFor(maybeUrlOrPath);
}

// ---------- Supabase content load ----------
async function fetchContentFromSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", "main")
    .single();

  if (error) return null;
  return data?.data || null;
}

// ---------- normalize: supports BOTH old & new schemas ----------
function normalizeContent(raw) {
  const c = raw || {};

  const branding = c.branding || {};
  const hero = c.hero || {};
  const contact = c.contact || {};

  const projectsArr = Array.isArray(c.projects) ? c.projects : [];
  const skillsArr = Array.isArray(c.skills) ? c.skills : [];
  const pricingArr = Array.isArray(c.pricing) ? c.pricing : [];

  const name = branding.name || hero.name || c.name || "OMER TECH DUDE";
  const tagline = branding.tagline || hero.tagline || c.tagline || "Web Development";
  const logoUrl = branding.logoUrl || hero.logoUrl || c.logoUrl || "";

  const title = hero.title || hero.headline || c.heroTitle || "Front-End & Web Developer";
  const subtitle =
    hero.subtitle ||
    hero.about ||
    c.heroSubtitle ||
    "I design and build modern, responsive, and user-focused web experiences.";

  const heroImageUrl =
    hero.heroImageUrl || hero.photoUrl || hero.imageUrl || c.heroImageUrl || "";

  const normalized = {
    branding: {
      name,
      tagline,
      logoUrl,
      logoPath: branding.logoPath || "",
    },
    hero: {
      title,
      subtitle,
      heroImageUrl,
      heroImagePath: hero.heroImagePath || "",
      // keep compatibility if you ever use it
      resumeUrl: hero.resumeUrl || "",
    },
    skills: skillsArr,
    projects: projectsArr.map((p) => ({
      id: p.id || cryptoId(),
      title: p.title || "Untitled Project",
      description: p.description || "",
      stack: p.stack || p.tech || "",
      liveUrl: p.liveUrl || p.url || p.link || "",
      githubUrl: p.githubUrl || p.github || "",
      imageUrl: p.imageUrl || p.logoUrl || p.image || "",
      imagePath: p.imagePath || "",
    })),
    pricing: pricingArr.map((t) => ({
      id: t.id || cryptoId(),
      name: t.name || "Package",
      price: t.price || "",
      description: t.description || t.note || "",
      bullets: Array.isArray(t.bullets)
        ? t.bullets
        : Array.isArray(t.features)
        ? t.features
        : [],
    })),
    contact: {
      email: contact.email || c.email || "omertechdude@gmail.com",
      instagram: contact.instagram || c.instagram || "",
      linkedin: contact.linkedin || "",
      formspree: contact.formspree || contact.formspreeUrl || c.formspree || "",
      text: contact.text || "",
    },
  };

  return normalized;
}

export default function Home() {
  const [content, setContent] = useState(() =>
    normalizeContent(getDefaultContent())
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const supa = await fetchContentFromSupabase();
      if (!alive) return;

      if (supa) setContent(normalizeContent(supa));
      else setContent(normalizeContent(getDefaultContent()));

      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const brandLogo = useMemo(
    () => resolveImage(content?.branding?.logoUrl || content?.branding?.logoPath),
    [content]
  );

  const heroImg = useMemo(
    () => resolveImage(content?.hero?.heroImageUrl || content?.hero?.heroImagePath),
    [content]
  );

  const skills = (content.skills || []).map((s) => (typeof s === "string" ? s : s?.name || "")).filter(Boolean);

  return (
    <div className="appShell">
      <div className="bgFX" aria-hidden="true" />
      <div className="bgGrid" aria-hidden="true" />

      {/* Loader screen */}
      {loading && (
        <div className="loaderOverlay" role="status" aria-label="Loading">
          <div className="loaderCard">
            <div className="loaderLogoWrap">
              {brandLogo ? (
                <img className="loaderLogo" src={brandLogo} alt="Loading logo" />
              ) : (
                <div className="brandMark" />
              )}
            </div>
            <div className="loaderText">
              <div className="loaderTitle">{content?.branding?.name || "Loading…"}</div>
              <div className="loaderSub">Loading your portfolio…</div>
            </div>
            <div className="loaderBar">
              <span />
            </div>
          </div>
        </div>
      )}

      <Header content={content} />

      <div className="page">
        {/* HERO (NEW STRUCTURE) */}
        <section className="heroV4" id="top">
          <div className="container">
            <div className="heroStage">
              <div className="heroLeft">
                <div className="heroKicker">
                  <span className="kickerDot" />
                  <span className="kickerText">
                    {content.branding.tagline || "Web Development"} • Clean UI • Fast delivery
                  </span>
                </div>

                <h1 className="h1 heroTitle">{content.hero.title}</h1>
                <p className="lead heroLead">{content.hero.subtitle}</p>

                <div className="ctaRow">
                  <a className="btn btnPrimary" href="#projects">View projects</a>
                  <a className="btn" href="#contact">Contact</a>
                  {content.hero.resumeUrl ? (
                    <a className="btn btnGhost" href={content.hero.resumeUrl} target="_blank" rel="noreferrer">
                      Resume
                    </a>
                  ) : null}
                </div>

                <div className="heroStats">
                  <div className="statCard">
                    <div className="statTop">
                      <span className="statIcon">⚡</span>
                      <span className="statTitle">Speed</span>
                    </div>
                    <div className="statDesc">Fast builds that feel premium</div>
                  </div>

                  <div className="statCard">
                    <div className="statTop">
                      <span className="statIcon">📱</span>
                      <span className="statTitle">Mobile-first</span>
                    </div>
                    <div className="statDesc">Responsive by default</div>
                  </div>

                  <div className="statCard">
                    <div className="statTop">
                      <span className="statIcon">🧩</span>
                      <span className="statTitle">CMS-ready</span>
                    </div>
                    <div className="statDesc">Update content anytime</div>
                  </div>
                </div>
              </div>

              <aside className="heroRight">
                <div className="portraitCard">
                  <div className="portraitTop">
                    <div className="portraitBrand">
                      <div className="portraitLogo">
                        {brandLogo ? <img src={brandLogo} alt="Site logo" /> : null}
                      </div>
                      <div className="portraitBrandText">
                        <strong>{content.branding.name}</strong>
                        <span>{content.branding.tagline}</span>
                      </div>
                    </div>

                    <div className="portraitPills">
                      <span className="miniPill">React</span>
                      <span className="miniPill">Redux</span>
                      <span className="miniPill">Supabase</span>
                    </div>
                  </div>

                  <div className="portraitFrame">
                    {heroImg ? (
                      <img src={heroImg} alt="Hero" />
                    ) : (
                      <div className="heroPhotoPlaceholder">
                        <strong>Add a hero image in Admin</strong>
                        <span>Recommended: 4:5 portrait</span>
                      </div>
                    )}
                  </div>

                  <div className="portraitBottom">
                    <div className="statusPill">
                      <span className="statusDot" />
                      Available for work
                    </div>
                    <div className="statusMeta">Florida • Remote</div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* SKILLS (NEW STRUCTURE) */}
        <section id="skills" className="section sectionTight">
          <div className="container">
            <div className="sectionTitle">
              <h2>Skills</h2>
              <p>{skills.length ? "What I use to ship high-quality web apps" : ""}</p>
            </div>

            <div className="skillsStrip">
              {(skills.length ? skills : ["HTML", "CSS", "JavaScript", "React", "Redux", "Swift"]).map((s) => (
                <div className="skillTile" key={s}>
                  <div className="skillGlyph" aria-hidden="true" />
                  <div className="skillName">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS (NEW STRUCTURE) */}
        <section id="projects" className="section">
          <div className="container">
            <div className="sectionTitle">
              <h2>Projects</h2>
              <p>Selected work — clean UI, real functionality</p>
            </div>

            <div className="grid3">
              {(content.projects || []).map((p) => {
                const img = resolveImage(p.imageUrl || p.imagePath || "");
                return (
                  <article className="item projectCardV4" key={p.id}>
                    <div className="projectHead">
                      <div className="projectLogo">
                        {img ? <img src={img} alt={`${p.title} logo`} /> : null}
                      </div>
                      <div className="projectHeadText">
                        <div className="itemTitle">{p.title}</div>
                        {p.stack ? <div className="projectStack">{p.stack}</div> : null}
                      </div>
                    </div>

                    {p.description ? <div className="itemMeta">{p.description}</div> : null}

                    <div className="projectActions">
                      {p.liveUrl ? (
                        <a className="linkBtn linkBtnPrimary" href={p.liveUrl} target="_blank" rel="noreferrer">
                          Open
                        </a>
                      ) : null}
                      {p.githubUrl ? (
                        <a className="linkBtn" href={p.githubUrl} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRICING (NEW STRUCTURE) */}
        <section id="pricing" className="section">
          <div className="container">
            <div className="sectionTitle">
              <h2>Pricing</h2>
              <p>Clear packages — simple and fast</p>
            </div>

            <div className="grid3">
              {(content.pricing || []).map((t) => (
                <article className="item priceCardV4" key={t.id}>
                  <div className="priceTop">
                    <div className="itemTitle">{t.name}</div>
                    <div className="price">{t.price}</div>
                  </div>

                  {t.description ? <div className="itemMeta">{t.description}</div> : null}

                  {t.bullets?.length ? (
                    <ul className="list">
                      {t.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="priceFoot">
                    <a className="btn btnPrimary btnFull" href="#contact">Get started</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT (your component stays) */}
        <div className="container" id="contact">
          <Contact content={content} />
        </div>

        <footer className="footer">
          <div className="container">
            © {new Date().getFullYear()} {content.branding.name}. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
