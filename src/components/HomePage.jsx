export default function HomePage({ meeting }) {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-badge">Serving Our Schools and Communities</span>
          <h1 className="hero-title">
            KEY <span className="hero-title-gold">CLUB</span>
          </h1>
          <p className="hero-subtitle">
            Building leaders, making a difference — one service hour at a time.
          </p>
        </div>
      </section>

      <section className="home-content">
        <div className="section-label">Upcoming Event</div>
        <h2 className="section-heading">Next Meeting</h2>

        <div className="meeting-card">
          <div className="meeting-card-top">
            <span className="meeting-tag">📅 Meeting</span>
          </div>

          <h3 className="meeting-card-title">{meeting.title}</h3>

          <div className="meeting-meta">
            <div className="meeting-meta-item">
              <span className="meta-icon">📆</span>
              <span>{meeting.date}</span>
            </div>
            <div className="meeting-meta-item">
              <span className="meta-icon">🕞</span>
              <span>{meeting.time}</span>
            </div>
            <div className="meeting-meta-item">
              <span className="meta-icon">📍</span>
              <span>{meeting.location}</span>
            </div>
          </div>

          <p className="meeting-description">{meeting.description}</p>
        </div>
      </section>
    </main>
  );
}
