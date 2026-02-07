import { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import {
  cryptoId,
  fetchSupabaseContent,
  getDefaultContent,
  getLocalContent,
  saveLocalContent,
  saveSupabaseContent,
} from "../data/content";

export default function Admin() {
  const supaReady = useMemo(() => isSupabaseConfigured() && supabase, []);

  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [data, setData] = useState(getLocalContent());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [tab, setTab] = useState("hero"); // hero | skills | projects | pricing | contact

  // ---------- Auth ----------
  useEffect(() => {
    if (!supaReady) {
      setAuthLoading(false);
      setError("Supabase is not configured. Check .env.local and restart the dev server.");
      return;
    }

    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session || null);
      setAuthLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => sub.subscription.unsubscribe();
  }, [supaReady]);

  // ---------- Load content after login ----------
  useEffect(() => {
    if (!session) return;
    (async () => {
      setLoading(true);
      setError("");
      setStatus("Loading content from Supabase...");
      const remote = await fetchSupabaseContent();
      if (remote) {
        setData(remote);
        saveLocalContent(remote);
        setStatus("Loaded from Supabase.");
      } else {
        setStatus("Could not load from Supabase. Using local cache.");
      }
      setLoading(false);
    })();
  }, [session]);

  // ---------- Helpers ----------
  const update = (path, value) => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = cur[keys[i]] ?? {};
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const saveAll = async () => {
    setError("");
    setStatus("");
    setLoading(true);
    try {
      saveLocalContent(data);
      if (!session) throw new Error("Not logged in.");
      await saveSupabaseContent(data);
      setStatus("Saved globally ✅ (everyone will see it)");
    } catch (e) {
      setError(e?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const resetToDefault = () => {
    const fresh = getDefaultContent();
    setData(fresh);
    saveLocalContent(fresh);
    setStatus("Reset locally. Click Save Global to publish.");
  };

  const reloadFromSupabase = async () => {
    setLoading(true);
    setError("");
    setStatus("Reloading from Supabase...");
    const remote = await fetchSupabaseContent();
    if (remote) {
      setData(remote);
      saveLocalContent(remote);
      setStatus("Reloaded from Supabase ✅");
    } else {
      setStatus("Could not reload from Supabase.");
    }
    setLoading(false);
  };

  const signIn = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setStatus("Logged in ✅");
    } catch (e2) {
      setError(e2?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError("");
    setStatus("");
    try {
      await supabase.auth.signOut();
      setStatus("Signed out.");
    } catch (e) {
      setError(e?.message || "Sign out failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Upload ----------
  const uploadToPortfolioBucket = async (file, folder) => {
    if (!file) return "";
    if (!session) throw new Error("You must be logged in to upload.");
    const ext = file.name.split(".").pop() || "png";
    const path = `${folder}/${cryptoId()}.${ext}`;

    const { error: upErr } = await supabase.storage.from("portfolio").upload(path, file, { upsert: false });
    if (upErr) throw upErr;

    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    return data.publicUrl;
  };

  const onUploadSiteLogo = async (file) => {
    setLoading(true);
    setError("");
    setStatus("Uploading site logo...");
    try {
      const url = await uploadToPortfolioBucket(file, "logo");
      update("hero.logoUrl", url);
      update("branding.logoUrl", url);
      setStatus("Logo uploaded. Click Save Global ✅");
    } catch (e) {
      setError(e?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onUploadHeroImage = async (file) => {
    setLoading(true);
    setError("");
    setStatus("Uploading hero image...");
    try {
      const url = await uploadToPortfolioBucket(file, "hero");
      update("hero.photoUrl", url);
      update("hero.heroImageUrl", url);
      setStatus("Hero image uploaded. Click Save Global ✅");
    } catch (e) {
      setError(e?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onUploadProjectLogo = async (projectId, file) => {
    setLoading(true);
    setError("");
    setStatus("Uploading project image/logo...");
    try {
      const url = await uploadToPortfolioBucket(file, "projects");
      setData((prev) => {
        const next = structuredCloneSafe(prev);
        next.projects = (next.projects || []).map((p) =>
          p.id === projectId ? { ...p, logoUrl: url, imageUrl: url } : p
        );
        return next;
      });
      setStatus("Project image uploaded. Click Save Global ✅");
    } catch (e) {
      setError(e?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Lists ----------
  const addSkill = () => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.skills = [...(next.skills || []), "New skill"];
      return next;
    });
  };

  const updateSkill = (idx, value) => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.skills = [...(next.skills || [])];
      next.skills[idx] = value;
      return next;
    });
  };

  const removeSkill = (idx) => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.skills = (next.skills || []).filter((_, i) => i !== idx);
      return next;
    });
  };

  const addProject = () => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.projects = [
        ...(next.projects || []),
        {
          id: cryptoId(),
          title: "New Project",
          description: "What it does, and why it matters",
          stack: "React • UI",
          link: "",
          github: "",
          logoUrl: "",
        },
      ];
      return next;
    });
  };

  const updateProject = (id, patch) => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.projects = (next.projects || []).map((p) => (p.id === id ? { ...p, ...patch } : p));
      return next;
    });
  };

  const removeProject = (id) => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.projects = (next.projects || []).filter((p) => p.id !== id);
      return next;
    });
  };

  const addPricing = () => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.pricing = [
        ...(next.pricing || []),
        { id: cryptoId(), name: "New Plan", price: "$0", note: "", features: ["Feature 1"] },
      ];
      return next;
    });
  };

  const updatePricing = (id, patch) => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.pricing = (next.pricing || []).map((p) => (p.id === id ? { ...p, ...patch } : p));
      return next;
    });
  };

  const removePricing = (id) => {
    setData((prev) => {
      const next = structuredCloneSafe(prev);
      next.pricing = (next.pricing || []).filter((p) => p.id !== id);
      return next;
    });
  };

  // ---------- States ----------
  if (authLoading) {
    return <AdminShell title="Admin" subtitle="Loading auth..." />;
  }

  if (!supaReady) {
    return (
      <AdminShell title="Admin" subtitle="Supabase not configured">
        <div className="notice err">{error || "Check .env.local and restart the dev server."}</div>
      </AdminShell>
    );
  }

  if (!session) {
    return (
      <AdminShell title="Admin Login" subtitle="Sign in to edit your site globally">
        <div className="notice">Use the email/password you created in Supabase Auth → Users.</div>

        <form onSubmit={signIn} className="adminLoginForm">
          <input
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <button className="btn btnPrimary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error ? <div className="notice err">{error}</div> : null}
        {status ? <div className="notice ok">{status}</div> : null}
      </AdminShell>
    );
  }

  const hero = data.hero || {};
  const contact = data.contact || {};
  const skills = data.skills || [];
  const projects = data.projects || [];
  const pricing = data.pricing || [];

  const formspreeValue = contact.formspree || contact.formspreeUrl || "";

  return (
    <AdminShell
      title="Admin Panel"
      subtitle="Edits here save globally (everyone sees updates)"
      topRight={
        <div className="adminTopActions">
          <button className="btn" onClick={reloadFromSupabase} disabled={loading}>
            Reload
          </button>
          <button className="btn" onClick={resetToDefault} disabled={loading}>
            Reset
          </button>
          <button className="btn btnPrimary" onClick={saveAll} disabled={loading}>
            {loading ? "Saving..." : "Save Global"}
          </button>
          <button className="btn" onClick={signOut} disabled={loading}>
            Sign Out
          </button>
        </div>
      }
    >
      {error ? <div className="notice err">{error}</div> : null}
      {status ? <div className="notice ok">{status}</div> : null}

      <div className="adminLayout">
        {/* Left nav */}
        <aside className="adminSide">
          <button className={`adminTab ${tab === "hero" ? "isActive" : ""}`} onClick={() => setTab("hero")}>
            Hero
          </button>
          <button className={`adminTab ${tab === "skills" ? "isActive" : ""}`} onClick={() => setTab("skills")}>
            Skills
          </button>
          <button className={`adminTab ${tab === "projects" ? "isActive" : ""}`} onClick={() => setTab("projects")}>
            Projects
          </button>
          <button className={`adminTab ${tab === "pricing" ? "isActive" : ""}`} onClick={() => setTab("pricing")}>
            Pricing
          </button>
          <button className={`adminTab ${tab === "contact" ? "isActive" : ""}`} onClick={() => setTab("contact")}>
            Contact
          </button>

          <div className="adminSideHint">
            Tip: after Save Global, hard refresh (Cmd+Shift+R).
          </div>
        </aside>

        {/* Right editor */}
        <main className="adminMain">
          {tab === "hero" ? (
            <Section title="Hero">
              <div className="adminGrid2">
                <div>
                  <div className="smallLabel">Name</div>
                  <input className="field" value={hero.name || ""} onChange={(e) => update("hero.name", e.target.value)} />

                  <div className="smallLabel">Tagline</div>
                  <input className="field" value={hero.tagline || ""} onChange={(e) => update("hero.tagline", e.target.value)} />

                  <div className="smallLabel">Headline</div>
                  <input className="field" value={hero.headline || ""} onChange={(e) => update("hero.headline", e.target.value)} />

                  <div className="smallLabel">About</div>
                  <textarea className="field" rows={5} value={hero.about || ""} onChange={(e) => update("hero.about", e.target.value)} />

                  <div className="smallLabel">Resume URL (optional)</div>
                  <input className="field" value={hero.resumeUrl || ""} onChange={(e) => update("hero.resumeUrl", e.target.value)} />
                </div>

                <div className="adminUploadCol">
                  <div className="adminUploadCard">
                    <div className="smallLabel">Site Logo (upload)</div>
                    <input type="file" accept="image/*" onChange={(e) => onUploadSiteLogo(e.target.files?.[0])} />
                    {hero.logoUrl ? (
                      <img className="adminPreviewSquare" src={hero.logoUrl} alt="logo" />
                    ) : (
                      <div className="adminPreviewEmpty">No logo yet</div>
                    )}
                  </div>

                  <div className="adminUploadCard">
                    <div className="smallLabel">Hero Image (upload)</div>
                    <input type="file" accept="image/*" onChange={(e) => onUploadHeroImage(e.target.files?.[0])} />
                    {(hero.photoUrl || hero.heroImageUrl) ? (
                      <img className="adminPreviewWide" src={hero.photoUrl || hero.heroImageUrl} alt="hero" />
                    ) : (
                      <div className="adminPreviewEmpty">No hero image yet</div>
                    )}
                  </div>
                </div>
              </div>
            </Section>
          ) : null}

          {tab === "skills" ? (
            <Section
              title="Skills"
              right={<button className="btn" onClick={addSkill} disabled={loading}>+ Add skill</button>}
            >
              <div className="adminList">
                {skills.map((s, idx) => (
                  <div key={idx} className="adminListRow">
                    <input className="field" value={s} onChange={(e) => updateSkill(idx, e.target.value)} />
                    <button className="btn" onClick={() => removeSkill(idx)} disabled={loading}>Remove</button>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {tab === "projects" ? (
            <Section
              title="Projects"
              right={<button className="btn" onClick={addProject} disabled={loading}>+ Add project</button>}
            >
              <div className="adminStack">
                {projects.map((p) => (
                  <div key={p.id} className="adminBlock">
                    <div className="adminBlockTop">
                      <strong>{p.title || "Project"}</strong>
                      <button className="btn" onClick={() => removeProject(p.id)} disabled={loading}>Delete</button>
                    </div>

                    <div className="smallLabel">Title</div>
                    <input className="field" value={p.title || ""} onChange={(e) => updateProject(p.id, { title: e.target.value })} />

                    <div className="smallLabel">Description</div>
                    <textarea className="field" rows={3} value={p.description || ""} onChange={(e) => updateProject(p.id, { description: e.target.value })} />

                    <div className="smallLabel">Stack</div>
                    <input className="field" value={p.stack || ""} onChange={(e) => updateProject(p.id, { stack: e.target.value })} />

                    <div className="adminGrid2">
                      <div>
                        <div className="smallLabel">Live link</div>
                        <input className="field" value={p.link || ""} onChange={(e) => updateProject(p.id, { link: e.target.value })} />
                      </div>
                      <div>
                        <div className="smallLabel">GitHub</div>
                        <input className="field" value={p.github || ""} onChange={(e) => updateProject(p.id, { github: e.target.value })} />
                      </div>
                    </div>

                    <div className="adminUploadCard">
                      <div className="smallLabel">Project image/logo (upload)</div>
                      <input type="file" accept="image/*" onChange={(e) => onUploadProjectLogo(p.id, e.target.files?.[0])} />
                      {p.logoUrl ? (
                        <img className="adminPreviewWide" src={p.logoUrl} alt="project" />
                      ) : (
                        <div className="adminPreviewEmpty">No image yet</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {tab === "pricing" ? (
            <Section
              title="Pricing"
              right={<button className="btn" onClick={addPricing} disabled={loading}>+ Add plan</button>}
            >
              <div className="adminStack">
                {pricing.map((p) => (
                  <div key={p.id} className="adminBlock">
                    <div className="adminBlockTop">
                      <strong>{p.name || "Plan"}</strong>
                      <button className="btn" onClick={() => removePricing(p.id)} disabled={loading}>Delete</button>
                    </div>

                    <div className="adminGrid2">
                      <div>
                        <div className="smallLabel">Name</div>
                        <input className="field" value={p.name || ""} onChange={(e) => updatePricing(p.id, { name: e.target.value })} />
                      </div>
                      <div>
                        <div className="smallLabel">Price</div>
                        <input className="field" value={p.price || ""} onChange={(e) => updatePricing(p.id, { price: e.target.value })} />
                      </div>
                    </div>

                    <div className="smallLabel">Note</div>
                    <input className="field" value={p.note || ""} onChange={(e) => updatePricing(p.id, { note: e.target.value })} />

                    <div className="smallLabel">Features (one per line)</div>
                    <textarea
                      className="field"
                      rows={5}
                      value={(p.features || []).join("\n")}
                      onChange={(e) =>
                        updatePricing(p.id, {
                          features: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {tab === "contact" ? (
            <Section title="Contact">
              <div className="smallLabel">Contact text</div>
              <textarea className="field" rows={3} value={contact.text || ""} onChange={(e) => update("contact.text", e.target.value)} />

              <div className="adminGrid2">
                <div>
                  <div className="smallLabel">Email</div>
                  <input className="field" value={contact.email || ""} onChange={(e) => update("contact.email", e.target.value)} />
                </div>
                <div>
                  <div className="smallLabel">Formspree URL</div>
                  <input
                    className="field"
                    value={formspreeValue}
                    onChange={(e) => {
                      update("contact.formspreeUrl", e.target.value);
                      update("contact.formspree", e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="adminGrid2">
                <div>
                  <div className="smallLabel">Instagram URL</div>
                  <input className="field" value={contact.instagram || ""} onChange={(e) => update("contact.instagram", e.target.value)} />
                </div>
                <div>
                  <div className="smallLabel">LinkedIn URL</div>
                  <input className="field" value={contact.linkedin || ""} onChange={(e) => update("contact.linkedin", e.target.value)} />
                </div>
              </div>
            </Section>
          ) : null}
        </main>
      </div>
    </AdminShell>
  );
}

function AdminShell({ title, subtitle, topRight, children }) {
  return (
    <div className="adminPage">
      <div className="bgFX" aria-hidden="true" />
      <div className="bgGrid" aria-hidden="true" />

      <div className="container adminContainer">
        <div className="adminTopBar">
          <div>
            <h1 className="adminH1">{title}</h1>
            <p className="adminSub">{subtitle}</p>
          </div>
          {topRight ? <div className="adminTopRight">{topRight}</div> : null}
        </div>

        <div className="adminBody">{children}</div>
      </div>
    </div>
  );
}

function Section({ title, right, children }) {
  return (
    <div className="card adminCardV4">
      <div className="cardPad">
        <div className="adminSectionTop">
          <h2 className="adminSectionTitle">{title}</h2>
          {right ? right : null}
        </div>
        <div className="adminSectionBody">{children}</div>
      </div>
    </div>
  );
}

function structuredCloneSafe(obj) {
  try {
    return structuredClone(obj);
  } catch {
    return JSON.parse(JSON.stringify(obj));
  }
}
