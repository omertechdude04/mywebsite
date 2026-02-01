import { useEffect, useMemo, useState } from "react"
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient"
import {
  cryptoId,
  fetchSupabaseContent,
  getDefaultContent,
  getLocalContent,
  saveLocalContent,
  saveSupabaseContent
} from "../data/content"

export default function Admin() {
  const supaReady = useMemo(() => isSupabaseConfigured() && supabase, [])

  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const [data, setData] = useState(getLocalContent())
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // ---------- Auth ----------
  useEffect(() => {
    if (!supaReady) {
      setAuthLoading(false)
      setError("Supabase is not configured. Check .env.local and restart the dev server.")
      return
    }

    ;(async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session || null)
      setAuthLoading(false)
    })()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => sub.subscription.unsubscribe()
  }, [supaReady])

  // ---------- Load content after login ----------
  useEffect(() => {
    if (!session) return
    ;(async () => {
      setLoading(true)
      setError("")
      setStatus("Loading content from Supabase...")
      const remote = await fetchSupabaseContent()
      if (remote) {
        setData(remote)
        saveLocalContent(remote)
        setStatus("Loaded from Supabase.")
      } else {
        setStatus("Could not load from Supabase. Using local cache.")
      }
      setLoading(false)
    })()
  }, [session])

  // ---------- Helpers ----------
  const update = (path, value) => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      const keys = path.split(".")
      let cur = next
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = cur[keys[i]] ?? {}
        cur = cur[keys[i]]
      }
      cur[keys[keys.length - 1]] = value
      return next
    })
  }

  const saveAll = async () => {
    setError("")
    setStatus("")
    setLoading(true)
    try {
      saveLocalContent(data)
      if (!session) throw new Error("Not logged in.")
      await saveSupabaseContent(data)
      setStatus("Saved globally ✅ (everyone will see it)")
    } catch (e) {
      setError(e?.message || "Save failed")
    } finally {
      setLoading(false)
    }
  }

  const resetToDefault = () => {
    const fresh = getDefaultContent()
    setData(fresh)
    saveLocalContent(fresh)
    setStatus("Reset locally. Click Save Global to publish.")
  }

  const reloadFromSupabase = async () => {
    setLoading(true)
    setError("")
    setStatus("Reloading from Supabase...")
    const remote = await fetchSupabaseContent()
    if (remote) {
      setData(remote)
      saveLocalContent(remote)
      setStatus("Reloaded from Supabase ✅")
    } else {
      setStatus("Could not reload from Supabase.")
    }
    setLoading(false)
  }

  const signIn = async (e) => {
    e.preventDefault()
    setError("")
    setStatus("")
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      setStatus("Logged in ✅")
    } catch (e2) {
      setError(e2?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    setError("")
    setStatus("")
    try {
      await supabase.auth.signOut()
      setStatus("Signed out.")
    } catch (e) {
      setError(e?.message || "Sign out failed")
    } finally {
      setLoading(false)
    }
  }

  // ---------- Upload ----------
  const uploadToPortfolioBucket = async (file, folder) => {
    if (!file) return ""
    if (!session) throw new Error("You must be logged in to upload.")
    const ext = file.name.split(".").pop() || "png"
    const path = `${folder}/${cryptoId()}.${ext}`

    const { error: upErr } = await supabase
      .storage
      .from("portfolio")
      .upload(path, file, { upsert: false })

    if (upErr) throw upErr

    const { data } = supabase.storage.from("portfolio").getPublicUrl(path)
    return data.publicUrl
  }

  const onUploadSiteLogo = async (file) => {
    setLoading(true)
    setError("")
    setStatus("Uploading site logo...")
    try {
      const url = await uploadToPortfolioBucket(file, "logo")

      // Save in BOTH places so Home/Header always find it
      update("hero.logoUrl", url)
      update("branding.logoUrl", url)

      setStatus("Logo uploaded. Click Save Global ✅")
    } catch (e) {
      setError(e?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  // ✅ NEW: Hero image upload
  const onUploadHeroImage = async (file) => {
    setLoading(true)
    setError("")
    setStatus("Uploading hero image...")
    try {
      const url = await uploadToPortfolioBucket(file, "hero")

      // Save in BOTH keys used by different versions of the site
      update("hero.photoUrl", url)
      update("hero.heroImageUrl", url)

      setStatus("Hero image uploaded. Click Save Global ✅")
    } catch (e) {
      setError(e?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  const onUploadProjectLogo = async (projectId, file) => {
    setLoading(true)
    setError("")
    setStatus("Uploading project image/logo...")
    try {
      const url = await uploadToPortfolioBucket(file, "projects")
      setData(prev => {
        const next = structuredCloneSafe(prev)
        next.projects = (next.projects || []).map(p =>
          p.id === projectId ? { ...p, logoUrl: url, imageUrl: url } : p
        )
        return next
      })
      setStatus("Project image uploaded. Click Save Global ✅")
    } catch (e) {
      setError(e?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  // ---------- Lists ----------
  const addSkill = () => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.skills = [...(next.skills || []), "New skill"]
      return next
    })
  }

  const updateSkill = (idx, value) => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.skills = [...(next.skills || [])]
      next.skills[idx] = value
      return next
    })
  }

  const removeSkill = (idx) => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.skills = (next.skills || []).filter((_, i) => i !== idx)
      return next
    })
  }

  const addProject = () => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.projects = [
        ...(next.projects || []),
        {
          id: cryptoId(),
          title: "New Project",
          description: "What it does, and why it matters",
          stack: "React • UI",
          link: "",
          github: "",
          logoUrl: ""
        }
      ]
      return next
    })
  }

  const updateProject = (id, patch) => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.projects = (next.projects || []).map(p => (p.id === id ? { ...p, ...patch } : p))
      return next
    })
  }

  const removeProject = (id) => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.projects = (next.projects || []).filter(p => p.id !== id)
      return next
    })
  }

  const addPricing = () => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.pricing = [
        ...(next.pricing || []),
        { id: cryptoId(), name: "New Plan", price: "$0", note: "", features: ["Feature 1"] }
      ]
      return next
    })
  }

  const updatePricing = (id, patch) => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.pricing = (next.pricing || []).map(p => (p.id === id ? { ...p, ...patch } : p))
      return next
    })
  }

  const removePricing = (id) => {
    setData(prev => {
      const next = structuredCloneSafe(prev)
      next.pricing = (next.pricing || []).filter(p => p.id !== id)
      return next
    })
  }

  if (authLoading) {
    return <AdminShell title="Admin" subtitle="Loading auth..." />
  }

  if (!supaReady) {
    return (
      <AdminShell title="Admin" subtitle="Supabase not configured">
        <div className="notice err">
          {error || "Check .env.local and restart the dev server."}
        </div>
      </AdminShell>
    )
  }

  if (!session) {
    return (
      <AdminShell title="Admin Login" subtitle="Sign in to edit your site globally">
        <div className="notice">
          Use the email/password you created in Supabase Auth → Users.
        </div>

        <form onSubmit={signIn} style={{ display: "grid", gap: 10, maxWidth: 420, marginTop: 12 }}>
          <input className="field" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
          <input className="field" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />
          <button className="btn btnPrimary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error ? <div className="notice err">{error}</div> : null}
        {status ? <div className="notice ok">{status}</div> : null}
      </AdminShell>
    )
  }

  const hero = data.hero || {}
  const contact = data.contact || {}
  const skills = data.skills || []
  const projects = data.projects || []
  const pricing = data.pricing || []

  return (
    <AdminShell
      title="Admin Panel"
      subtitle="Edits here save globally (everyone sees updates)"
      right={
        <div className="adminRight">
          <button className="btn" onClick={reloadFromSupabase} disabled={loading}>Reload</button>
          <button className="btn" onClick={resetToDefault} disabled={loading}>Reset</button>
          <button className="btn btnPrimary" onClick={saveAll} disabled={loading}>
            {loading ? "Saving..." : "Save Global"}
          </button>
          <button className="btn" onClick={signOut} disabled={loading}>Sign Out</button>
        </div>
      }
    >
      {error ? <div className="notice err">{error}</div> : null}
      {status ? <div className="notice ok">{status}</div> : null}

      {/* HERO */}
      <Section title="Hero">
        <div className="smallLabel">Name</div>
        <input className="field" value={hero.name || ""} onChange={e => update("hero.name", e.target.value)} />

        <div className="smallLabel">Tagline</div>
        <input className="field" value={hero.tagline || ""} onChange={e => update("hero.tagline", e.target.value)} />

        <div className="smallLabel">Headline</div>
        <input className="field" value={hero.headline || ""} onChange={e => update("hero.headline", e.target.value)} />

        <div className="smallLabel">About</div>
        <textarea className="field" rows={4} value={hero.about || ""} onChange={e => update("hero.about", e.target.value)} />

        <div className="smallLabel">Resume URL (optional)</div>
        <input className="field" value={hero.resumeUrl || ""} onChange={e => update("hero.resumeUrl", e.target.value)} />

        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div className="smallLabel">Site Logo (upload)</div>
            <input type="file" accept="image/*" onChange={e => onUploadSiteLogo(e.target.files?.[0])} />
            {hero.logoUrl ? (
              <div style={{ marginTop: 8 }}>
                <div className="adminMuted">Current logo:</div>
                <img
                  src={hero.logoUrl}
                  alt="logo"
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: 18,
                    border: "1px solid rgba(20,24,31,.12)",
                    objectFit: "cover"
                  }}
                />
              </div>
            ) : null}
          </div>

          {/* ✅ NEW hero image uploader */}
          <div style={{ display: "grid", gap: 8 }}>
            <div className="smallLabel">Hero Image (upload)</div>
            <input type="file" accept="image/*" onChange={e => onUploadHeroImage(e.target.files?.[0])} />
            {(hero.photoUrl || hero.heroImageUrl) ? (
              <div style={{ marginTop: 8 }}>
                <div className="adminMuted">Current hero image:</div>
                <img
                  src={hero.photoUrl || hero.heroImageUrl}
                  alt="hero"
                  style={{
                    width: 260,
                    height: 160,
                    borderRadius: 18,
                    border: "1px solid rgba(20,24,31,.12)",
                    objectFit: "cover"
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section
        title="Skills"
        right={<button className="btn" onClick={addSkill} disabled={loading}>+ Add skill</button>}
      >
        <div style={{ display: "grid", gap: 10 }}>
          {skills.map((s, idx) => (
            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10 }}>
              <input className="field" value={s} onChange={e => updateSkill(idx, e.target.value)} />
              <button className="btn" onClick={() => removeSkill(idx)} disabled={loading}>Remove</button>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        title="Projects"
        right={<button className="btn" onClick={addProject} disabled={loading}>+ Add project</button>}
      >
        <div style={{ display: "grid", gap: 14 }}>
          {projects.map((p) => (
            <div key={p.id} className="card">
              <div className="cardPad" style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <strong>{p.title || "Project"}</strong>
                  <button className="btn" onClick={() => removeProject(p.id)} disabled={loading}>Delete</button>
                </div>

                <div className="smallLabel">Title</div>
                <input className="field" value={p.title || ""} onChange={e => updateProject(p.id, { title: e.target.value })} />

                <div className="smallLabel">Description</div>
                <textarea className="field" rows={3} value={p.description || ""} onChange={e => updateProject(p.id, { description: e.target.value })} />

                <div className="smallLabel">Stack</div>
                <input className="field" value={p.stack || ""} onChange={e => updateProject(p.id, { stack: e.target.value })} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <div className="smallLabel">Live link</div>
                    <input className="field" value={p.link || ""} onChange={e => updateProject(p.id, { link: e.target.value })} />
                  </div>
                  <div>
                    <div className="smallLabel">GitHub</div>
                    <input className="field" value={p.github || ""} onChange={e => updateProject(p.id, { github: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  <div className="smallLabel">Project image/logo (upload)</div>
                  <input type="file" accept="image/*" onChange={e => onUploadProjectLogo(p.id, e.target.files?.[0])} />
                  {p.logoUrl ? (
                    <img
                      src={p.logoUrl}
                      alt="project"
                      style={{
                        width: 140,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 18,
                        border: "1px solid rgba(20,24,31,.12)"
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section
        title="Pricing"
        right={<button className="btn" onClick={addPricing} disabled={loading}>+ Add plan</button>}
      >
        <div style={{ display: "grid", gap: 14 }}>
          {pricing.map((p) => (
            <div key={p.id} className="card">
              <div className="cardPad" style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <strong>{p.name || "Plan"}</strong>
                  <button className="btn" onClick={() => removePricing(p.id)} disabled={loading}>Delete</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <div className="smallLabel">Name</div>
                    <input className="field" value={p.name || ""} onChange={e => updatePricing(p.id, { name: e.target.value })} />
                  </div>
                  <div>
                    <div className="smallLabel">Price</div>
                    <input className="field" value={p.price || ""} onChange={e => updatePricing(p.id, { price: e.target.value })} />
                  </div>
                </div>

                <div className="smallLabel">Note</div>
                <input className="field" value={p.note || ""} onChange={e => updatePricing(p.id, { note: e.target.value })} />

                <div className="smallLabel">Features (one per line)</div>
                <textarea
                  className="field"
                  rows={4}
                  value={(p.features || []).join("\n")}
                  onChange={e => updatePricing(p.id, { features: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) })}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section title="Contact">
        <div className="smallLabel">Contact text</div>
        <textarea className="field" rows={3} value={contact.text || ""} onChange={e => update("contact.text", e.target.value)} />

        <div className="smallLabel">Email</div>
        <input className="field" value={contact.email || ""} onChange={e => update("contact.email", e.target.value)} />

        <div className="smallLabel">Instagram URL</div>
        <input className="field" value={contact.instagram || ""} onChange={e => update("contact.instagram", e.target.value)} />

        <div className="smallLabel">LinkedIn URL</div>
        <input className="field" value={contact.linkedin || ""} onChange={e => update("contact.linkedin", e.target.value)} />

        <div className="smallLabel">Formspree URL</div>
        <input className="field" value={contact.formspreeUrl || ""} onChange={e => update("contact.formspreeUrl", e.target.value)} />
      </Section>

      <div style={{ height: 40 }} />
      <div className="adminMuted">Tip: after saving, refresh / and hard refresh (Cmd+Shift+R).</div>
    </AdminShell>
  )
}

function AdminShell({ title, subtitle, right, children }) {
  return (
    <div className="adminPage">
      <div className="container" style={{ padding: "34px 0 70px" }}>
        <div className="adminBar">
          <div>
            <h1 style={{ margin: 0, fontSize: 28 }}>{title}</h1>
            <p style={{ margin: "6px 0 0", color: "rgba(20,24,31,.65)" }}>{subtitle}</p>
          </div>
          {right ? <div>{right}</div> : null}
        </div>

        <div style={{ marginTop: 18, display: "grid", gap: 16 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function Section({ title, right, children }) {
  return (
    <div className="card">
      <div className="cardPad">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: 16 }}>{title}</h2>
          {right ? right : null}
        </div>
        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function structuredCloneSafe(obj) {
  try { return structuredClone(obj) } catch { return JSON.parse(JSON.stringify(obj)) }
}
