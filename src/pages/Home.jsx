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

  const title =
    hero.title || hero.headline || c.heroTitle || "Front-End & Web Developer";

  const subtitle =
    hero.subtitle ||
    hero.about ||
    c.heroSubtitle ||
    "I design and build modern, responsive, and user-focused web experiences.";

  // Prefer hero image; fall back to photoUrl; NEVER fall back to logo.
  const heroImageUrl =
    hero.heroImageUrl || hero.photoUrl || hero.imageUrl || c.heroImageUrl || "";

  return {
    branding: { name, tagline, logoUrl, logoPath: branding.logoPath || "" },
    hero: {
      title,
      subtitle,
      heroImageUrl,
      heroImagePath: hero.heroImagePath || "",
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
    () =>
      resolveImage(
        content?.branding?.logoUrl || content?.branding?.logoPath || ""
      ),
    [content]
  );

  const heroImg = useMemo(
    () =>
      resolveImage(
        content?.hero?.heroImageUrl || content?.hero?.heroImagePath || ""
      ),
    [content]
  );

  return (
    <div className="appShell">
      <div className="bgFX" aria-hidden="true" />

      {/* Loader screen */}
      {loading && (
        <div className="loaderOverlay" role="status" aria-label="Loading">
          <div className="loaderCard">
            <div className="loaderLogoWrap">
              {brandLogo ? (
                <img className="loaderLogo" src={brandLogo} alt="Loading logo" />
              ) : (
                <div className="loaderLogoFallback" />
              )}
            </div>
            <div className="loaderText">
              <div className="loaderTitle">
                {content?.branding?.name || "Loading…"}
              </div>
              <div className="loaderSub">Loading your portfolio…</div>
            </div>
            <div className="loaderBar">
              <span />
            </div>
          </div>
        </div>
      )}

      <Header content={content} />

      <main className="page">
        <div className="container">
          {/* HERO */}
          <section className="hero" id="top">
            <div className="heroWrap">
              <div className="heroCopy">
                <div className="kicker">{content.branding.tagline}</div>
                <h1 className="h1">{content.hero.title}</h1>
                <p className="lead">{content.hero.subtitle}</p>

                <div className="ctaRow">
                  <a className="btn btnPrimary" href="#projects">
                    View projects
                  </a>
                  <a className="btn" href="#contact">
                    Contact
                  </a>
                </div>

                <div className="miniPoints">
                  <div className="miniPoint">
                    <strong>Fast builds</strong>
                    <span>Clean UI, optimized performance</span>
                  </div>
                  <div className="miniPoint">
                    <strong>Mobile-first</strong>
                    <span>Looks great on every screen</span>
                  </div>
                  <div className="miniPoint">
                    <strong>CMS-ready</strong>
                    <span>Edit content from your Admin</span>
                  </div>
                </div>
              </div>

              <div className="heroVisual">
                <div className="heroPhotoFrame">
                  {heroImg ? (
                    <img src={heroImg} alt="Hero" />
                  ) : (
                    <div className="heroPhotoPlaceholder">
                      <strong>Add a Hero Image in Admin</strong>
                      <span>Admin → Hero → Hero Image (upload)</span>
                    </div>
                  )}
                </div>

                <div className="heroMetaBar">
                  <span className="statusDot" />
                  <span className="statusText">Available for work</span>
                  <span className="metaSep" />
                  <span className="metaText">Florida • Remote</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* SKILLS */}
        <section id="skills" className="section">
          <div className="container">
            <div className="sectionTitle">
              <h2>Skills</h2>
              <p>
                {content.skills?.length ? "What I use to ship web apps" : ""}
              </p>
            </div>

            <div className="chips">
              {(content.skills || []).map((s, i) => (
                <span className="chip" key={i}>
                  {typeof s === "string" ? s : s?.name || ""}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="container">
            <div className="sectionTitle">
              <h2>Projects</h2>
              <p>Selected work — real functionality</p>
            </div>

            <div className="grid3">
              {(content.projects || []).map((p) => {
                const img = resolveImage(p.imageUrl || p.imagePath || "");
                return (
                  <article className="item" key={p.id}>
                    <div className="projectTop">
                      <div className="projectLogo">
                        {img ? <img src={img} alt={`${p.title} logo`} /> : null}
                      </div>
                      <div>
                        <div className="itemTitle">{p.title}</div>
                        {p.stack ? <div className="itemMeta">{p.stack}</div> : null}
                      </div>
                    </div>

                    {p.description ? (
                      <div className="itemMeta">{p.description}</div>
                    ) : null}

                    <div className="linkRow">
                      {p.liveUrl ? (
                        <a className="linkBtn" href={p.liveUrl} target="_blank" rel="noreferrer">
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

        {/* PRICING */}
        <section id="pricing" className="section">
          <div className="container">
            <div className="sectionTitle">
              <h2>Pricing</h2>
              <p>Clear packages — simple and fast</p>
            </div>

            <div className="grid3">
              {(content.pricing || []).map((t) => (
                <article className="item" key={t.id}>
                  <div className="itemTitle">{t.name}</div>
                  <div className="price">{t.price}</div>
                  {t.description ? <div className="itemMeta">{t.description}</div> : null}
                  {t.bullets?.length ? (
                    <ul className="list">
                      {t.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="container">
            <Contact content={content} />
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            © {new Date().getFullYear()} {content.branding.name}. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
