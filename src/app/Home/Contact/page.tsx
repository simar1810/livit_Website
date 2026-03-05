"use client";

export default function ContactPage() {
  return (
    <main className="contact-page" aria-labelledby="contact-title">
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="contact-kicker">We’d love to hear from you</p>
          <h1 id="contact-title">Contact Nature Fit</h1>
          <p className="contact-subtitle">
            Share questions, feedback, or partnership ideas. We’ll reply as soon
            as possible.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-card">
            <h2>Send us a note</h2>
            <p className="contact-placeholder">
              Contact form and details will be added here.
            </p>
          </div>

          <aside className="contact-side">
            <div className="contact-side-card">
              <h3>Reach us directly</h3>
              <p className="contact-placeholder">
                Email, phone, and location details will go here.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

