import useReveal from "./useReveal";

function isHttp(v) {
  return typeof v === "string" && /^https?:\/\//i.test(v);
}

export default function Hero(props) {
  // Support BOTH prop names so it never crashes:
  // - old usage: <Hero data={content} />
  // - new usage: <Hero content={content} />
  const data = props.data || props.content || {};
  const { ref, isVisible } = useReveal();

  const hero = data.hero || {};

  const headline =
    hero.headline ||
    hero.title ||
    data.heroTitle ||
    "Front-End & Web Developer";

  const about =
    hero.about ||
    hero.subtitle ||
    data.heroSubtitle ||
    "I design and build modern, responsive, and user-focused web experiences. Passionate about clean code, speed, and creativity.";

  const resumeUrl = (hero.resumeUrl || data.resumeUrl || "").trim();

  // Support multiple saved keys for the image
  let photoUrl =
    hero.photoUrl ||
    hero.heroImageUrl ||
    hero.imageUrl ||
    data.heroImageUrl ||
    "";

  // If Home passes a resolveImage helper, use it (for Supabase storage paths)
  if (photoUrl && typeof props.resolveImage === "function") {
    photoUrl = props.resolveImage(photoUrl);
  } else if (photoUrl && !isHttp(photoUrl)) {
    // Otherwise leave it as-is (or you can remove this block entirely)
    // This just avoids breaking if it's a relative path.
  }

  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="heroGrid">
          <div
            ref={ref}
            className={`card reveal ${isVisible ? "isVisible" : ""}`}
          >
            <div className="cardPad">
              <h1 className="h1">{headline}</h1>

              <p className="lead">{about}</p>

              <div className="ctaRow">
                <a className="btn btnPrimary" href="#projects">
                  View projects
                </a>
                <a className="btn" href="#contact">
                  Contact
                </a>

                {resumeUrl ? (
                  <a
                    className="btn"
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resume
                  </a>
                ) : null}
              </div>

              <hr className="sep" />
              <div className="heroSub">
                Tip: edit everything at <b>/admin</b>
              </div>
            </div>
          </div>

          <div className="heroImage">
            {photoUrl ? (
              <img src={photoUrl} alt="Hero" />
            ) : (
              <div className="heroImagePlaceholder">
                <div>
                  <strong>Add your photo / image</strong>
                  <span>
                    Upload it in <b>/admin</b> → Hero → “Hero Image (upload)”
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
