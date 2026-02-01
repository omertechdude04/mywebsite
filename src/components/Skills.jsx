import useReveal from "./useReveal";

export default function Skills(props) {
  const data = props.data || props.content || {};
  const { ref, isVisible } = useReveal();

  const raw = Array.isArray(data.skills) ? data.skills : [];

  // support strings OR objects like { name }
  const skills = raw
    .map((s) => (typeof s === "string" ? s : s?.name || s?.title || ""))
    .map((s) => String(s).trim())
    .filter(Boolean);

  return (
    <section id="skills" className="section">
      <div className="sectionTitle">
        <h2>My Skills</h2>
      </div>

      <div ref={ref} className={`card reveal ${isVisible ? "isVisible" : ""}`}>
        <div className="cardPad">
          <div className="chips">
            {skills.map((s, i) => (
              <span className="chip" key={`${s}-${i}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
