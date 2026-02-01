import useReveal from "./useReveal";

function isHttp(v) {
  return typeof v === "string" && /^https?:\/\//i.test(v);
}

export default function Projects(props) {
  // Support both:
  // <Projects data={content} /> OR <Projects content={content} />
  const data = props.data || props.content || {};
  const { ref, isVisible } = useReveal();

  const projects = Array.isArray(data.projects) ? data.projects : [];

  const resolveImg = (maybe) => {
    if (!maybe) return "";
    if (typeof props.resolveImage === "function") return props.resolveImage(maybe);
    if (isHttp(maybe)) return maybe;
    return maybe; // relative path (won't crash)
  };

  return (
    <section id="projects" className="section">
      <div className="sectionTitle">
        <h2>Projects</h2>
        <p>Real work — clean UI, good UX, solid code</p>
      </div>

      <div ref={ref} className={`grid3 reveal ${isVisible ? "isVisible" : ""}`}>
        {projects.map((p, i) => {
          const logo = resolveImg(p.logoUrl || p.logoPath || p.imageUrl || p.imagePath);

          return (
            <div className="card projectCard" key={p.id || i}>
              <div className="cardPad">
                <div className="projectTop">
                  <div className="projectLogo">
                    {logo ? <img src={logo} alt={`${p.title || "Project"} logo`} /> : null}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <h3 className="projectTitle">{p.title || "Project"}</h3>
                    <div className="smallMuted">{p.stack || ""}</div>
                  </div>
                </div>

                {p.description ? (
                  <p className="projectDesc" style={{ marginTop: 10 }}>
                    {p.description}
                  </p>
                ) : null}

                <div className="ctaRow" style={{ marginTop: 14 }}>
                  {p.link || p.liveUrl ? (
                    <a
                      className="btn btnPrimary"
                      href={p.link || p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  ) : null}

                  {p.github || p.githubUrl ? (
                    <a className="btn" href={p.github || p.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
