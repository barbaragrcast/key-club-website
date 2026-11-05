const AVATAR_COLORS = [
  '#003DA5', '#1a56db', '#6366f1', '#7c3aed',
  '#0f766e', '#0369a1', '#b45309', '#be185d',
];

export default function OfficersPage({ officers }) {
  return (
    <main className="page">
      <section className="page-header">
        <div className="section-label">Leadership</div>
        <h2 className="section-heading">Club Officers</h2>
        <p className="section-subheading">
          Meet your elected board — reach out to any officer with questions or ideas.
        </p>
      </section>

      <section className="officers-grid-section">
        <div className="officers-grid">
          {officers.map((officer, i) => (
            <div key={officer.id} className="officer-card">
              <div
                className="officer-avatar"
                style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
              >
                {officer.initials}
              </div>
              <div className="officer-info">
                <span className="officer-role-badge">{officer.role}</span>
                <h3 className="officer-name">{officer.name}</h3>
                <a href={`mailto:${officer.email}`} className="officer-email">
                  ✉ {officer.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
