import { useEffect, useState } from "react"
import useReveal from "./useReveal"

export default function Contact(props) {
  // Supports both:
  // <Contact data={content} />  OR  <Contact content={content} />
  const data = props.data || props.content || {}
  const { ref, isVisible } = useReveal()

  const contact = data.contact || {}

  // supports both keys (you mentioned you saved it in admin)
  const formspreeUrl = (contact.formspree || contact.formspreeUrl || "").trim()

  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  // close on ESC
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [modalOpen])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formspreeUrl) {
      setError("Missing Formspree URL. Add it in /admin → Contact → Formspree URL, then Save Global.")
      return
    }

    setSending(true)
    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      const res = await fetch(formspreeUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      })

      if (!res.ok) throw new Error("Form submit failed. Check your Formspree endpoint.")
      form.reset()
      setModalOpen(true)
    } catch (e2) {
      setError(e2?.message || "Something went wrong.")
    } finally {
      setSending(false)
    }
  }

  const closeModal = () => setModalOpen(false)

  const safeEmail = (contact.email || "").trim()

  return (
    <section id="contact" className="section">
      <div className="sectionTitle">
        <h2>Contact</h2>
        <p>Let’s build something clean and modern</p>
      </div>

      <div className="contactGrid">
        {/* Left: Form */}
        <div ref={ref} className={`card reveal ${isVisible ? "isVisible" : ""}`}>
          <div className="cardPad">
            <p className="lead" style={{ marginBottom: 10 }}>
              {contact.text || "Email me or use the form — I reply fast."}
            </p>

            <form className="contactForm" onSubmit={onSubmit}>
              <div className="contactTwoCol">
                <div>
                  <label className="label">Name</label>
                  <input className="field" name="name" placeholder="Your name" required />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input className="field" name="email" placeholder="you@email.com" type="email" required />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label className="label">Message</label>
                <textarea className="field" name="message" placeholder="Write your message..." rows="6" required />
              </div>

              <div style={{ marginTop: 14 }}>
                <button className="btn btnPrimary" type="submit" disabled={sending}>
                  {sending ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>

            {error ? <div style={noticeStyle("error")}>{error}</div> : null}

            {!formspreeUrl ? (
              <div className="hint">
                Formspree URL is not set yet. Add it in <b>/admin</b> → Contact → Formspree URL.
              </div>
            ) : null}
          </div>
        </div>

        {/* Right: Direct */}
        <div className="card">
          <div className="cardPad">
            <div className="contactAsideTitle">Direct</div>

            {safeEmail ? (
              <a className="emailPill" href={`mailto:${safeEmail}`}>
                {safeEmail}
              </a>
            ) : (
              <a className="emailPill" href="mailto:hello@yourdomain.com">
                hello@yourdomain.com
              </a>
            )}

            <div className="contactLinksRow">
              {(contact.instagram || "").trim() ? (
                <a className="btn" href={contact.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              ) : null}

              {(contact.linkedin || "").trim() ? (
                <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              ) : null}
            </div>

            <div className="muted" style={{ marginTop: 12 }}>
              Prefer email? Tap the address above.
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen ? (
        <div
          className="modalOverlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div className="modalCard" role="dialog" aria-modal="true" aria-label="Message sent">
            <div className="modalHeader">
              <div>
                <h3 className="modalTitle">Message sent ✅</h3>
              </div>
              <button className="iconBtn" onClick={closeModal} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="modalBody">
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>
                Thank you — I’ll get back to you within 24–48 hours.
              </div>
              <div style={{ color: "rgba(255,255,255,.70)" }}>
                If it’s urgent, you can also email me directly.
              </div>
            </div>

            <div className="modalFooter">
              <button className="btn btnPrimary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function noticeStyle(type) {
  const bg = type === "error" ? "rgba(239,68,68,.10)" : "rgba(16,185,129,.12)"
  const border = type === "error" ? "rgba(239,68,68,.22)" : "rgba(16,185,129,.22)"

  return {
    padding: 12,
    borderRadius: 14,
    border: `1px solid ${border}`,
    background: bg,
    color: "rgba(255,255,255,.88)",
    fontSize: 13,
    marginTop: 12
  }
}
