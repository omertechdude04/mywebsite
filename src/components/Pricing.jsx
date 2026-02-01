import useReveal from "./useReveal";

export default function Pricing(props) {
  const data = props.data || props.content || {};
  const { ref, isVisible } = useReveal();

  const pricing = Array.isArray(data.pricing) ? data.pricing : [];

  return (
    <section id="pricing" className="section">
      <div className="sectionTitle">
        <h2>Pricing</h2>
        <p>Simple packages — customize in admin</p>
      </div>

      <div ref={ref} className={`grid3 reveal ${isVisible ? "isVisible" : ""}`}>
        {pricing.map((p, i) => {
          const features = Array.isArray(p.features) ? p.features : Array.isArray(p.bullets) ? p.bullets : [];

          return (
            <div className="card priceCard" key={p.id || i}>
              <div className="cardPad">
                <h3 style={{ margin: 0, fontSize: 16 }}>{p.name || "Package"}</h3>
                <div className="price">{p.price || ""}</div>
                {p.description ? <div className="smallMuted">{p.description}</div> : null}

                {features.length ? (
                  <ul>
                    {features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                ) : null}

                <div className="ctaRow" style={{ marginTop: 14 }}>
                  <a className="btn btnPrimary" href="#contact">
                    Get started
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
