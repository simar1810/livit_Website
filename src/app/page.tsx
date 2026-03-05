"use client";

import { useCart } from "@/components/SiteShell";
import { COPY } from "@/config/copy";
import { useEffect, useState } from "react";

const SLIDES = [
  "https://livit.ae/WebAssets/img/slider/1.jpg",
  "https://livit.ae/WebAssets/img/slider/2.jpg",
  "https://livit.ae/WebAssets/img/slider/3.jpg",
  "https://livit.ae/WebAssets/img/slider/4.jpg",
  "https://livit.ae/WebAssets/img/slider/5.jpg",
  "https://livit.ae/WebAssets/img/slider/6.jpg",
  "https://livit.ae/WebAssets/img/slider/7.jpg",
  "https://livit.ae/WebAssets/img/slider/8.jpg",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openCart } = useCart();

  // Hero slider auto-play (loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {/* Hero – Nature Fit */}
      <section className="nf-hero">
        <div className="nf-hero-inner">
          <div className="nf-hero-copy">
            <p className="nf-hero-eyebrow">Nature-led meal plans</p>
            <h1>{COPY.heroTitle}</h1>
            <p className="nf-hero-subtitle">{COPY.heroSubtitle}</p>
            <div className="nf-hero-tags">
              <span>Seasonal</span>
              <span>Balanced</span>
              <span>Delivered to you</span>
            </div>
            <div className="nf-hero-actions">
              <button
                type="button"
                className="primary-btn"
                onClick={openCart}
              >
                {COPY.heroCta}
              </button>
              <a href="/Home/Program" className="nf-hero-secondary">
                View programs
              </a>
            </div>
          </div>

          <div className="nf-hero-visual">
            <div className="nf-hero-visual-panel">
              <div className="nf-hero-image-card">
                <div
                  className="nf-hero-slider-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {SLIDES.map((src, index) => (
                    <div className="nf-hero-slide" key={src}>
                      <img
                        src={src}
                        alt={`Nature Fit meal ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="nf-hero-pill">
                <span>Next week&apos;s menu live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs – Signature & Gut Restore */}
      <section className="nf-programs">
        <div className="container-fluid">
          <div className="nf-programs-inner">
            <header className="nf-programs-header">
              <p className="nf-programs-kicker">Choose your path</p>
              <h2>Your daily Nature Fit ritual</h2>
              <p className="nf-programs-subtitle">
                Two ways to eat with intention – chef-crafted, nutritionist-guided, and delivered to
                your door.
              </p>
            </header>

            <div className="nf-programs-grid">
              <article className="nf-program-card">
                <div className="nf-program-image">
                  <img
                    src="https://livit.ae/WebAssets/img/drop-image/1.jpg"
                    alt="Signature Program plate"
                    loading="lazy"
                  />
                </div>
                <div className="nf-program-body">
                  <h3>Signature Program</h3>
                  <p>
                    Everyday balanced meals for Monday–Friday – designed for energy, focus, and
                    long-term wellness.
                  </p>
                  <ul>
                    <li>Chef-crafted, macro-balanced plates</li>
                    <li>Nature-led ingredients, rotated weekly</li>
                    <li>Flexible portions to fit your day</li>
                  </ul>
                  <button
                    type="button"
                    className="primary-btn nf-program-cta"
                    onClick={openCart}
                  >
                    Join the program
                  </button>
                </div>
              </article>

              <article className="nf-program-card">
                <div className="nf-program-image">
                  <img
                    src="https://livit.ae/WebAssets/img/drop-image/2.jpg"
                    alt="Gut Restore Program plate"
                    loading="lazy"
                  />
                </div>
                <div className="nf-program-body">
                  <h3>Gut Restore Program</h3>
                  <p>
                    A focused 5-day reset with gut-loving, anti-inflammatory meals to bring your
                    system back to centre.
                  </p>
                  <ul>
                    <li>Thoughtfully low-inflammatory menu</li>
                    <li>Designed with our in-house nutrition team</li>
                    <li>Perfect as a seasonal or post-holiday reset</li>
                  </ul>
                  <button
                    type="button"
                    className="primary-btn nf-program-cta"
                    onClick={openCart}
                  >
                    Start a reset
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Inside next week’s menu – modern card layout */}
      <section className="menu-preview">
        <div className="container-fluid">
          <div className="menu-preview-inner">
            <div className="menu-preview-header">
              <p className="menu-preview-kicker">Inside next week&apos;s menu</p>
              <h2>A taste of what you&apos;ll enjoy</h2>
              <p className="menu-preview-subtitle">
                Chef-crafted, seasonally led meals designed to keep your routine effortless.
              </p>
              <a className="menu-preview-link" href="/Home/Program">
                {COPY.menuCta}
              </a>
            </div>

            <div className="menu-preview-grid">
              <div className="menu-preview-card">
                <span className="menu-preview-tag">Breakfast</span>
                <h3>Sunrise chia parfait</h3>
                <p>Almond milk chia, roasted berries, and crunchy granola.</p>
              </div>
              <div className="menu-preview-card">
                <span className="menu-preview-tag">Lunch</span>
                <h3>Herbed quinoa bowl</h3>
                <p>Citrus-dressed greens, roasted veggies, and toasted seeds.</p>
              </div>
              <div className="menu-preview-card">
                <span className="menu-preview-tag">Dinner</span>
                <h3>Lemon thyme chicken</h3>
                <p>Slow-roasted chicken with seasonal sides and bright herbs.</p>
              </div>
              <div className="menu-preview-card">
                <span className="menu-preview-tag">Snack</span>
                <h3>Cocoa almond bites</h3>
                <p>Rich, energy-forward bites with dates, nuts, and cacao.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Nature Fit – philosophy grid */}
      <section className="nf-why">
        <div className="container-fluid">
          <div className="nf-why-inner">
            <header className="nf-why-header">
              <p className="nf-why-kicker">The philosophy</p>
              <h2>Why Nature Fit?</h2>
              <p className="nf-why-subtitle">
                Elevating your wellness through a curated approach to nutrition. We combine
                seasonal sourcing with culinary care to deliver more than just a meal.
              </p>
            </header>

            <div className="nf-why-grid">
              {[
                {
                  img: "01",
                  title: "Sustainable Sourcing",
                  body: "Committed to seasonal eating that honours nature’s rhythms and local ecosystems.",
                },
                {
                  img: "02",
                  title: "Gut‑Friendly Nutrition",
                  body: "Rich in whole foods and fibre to support your microbiome and gentle digestion.",
                },
                {
                  img: "03",
                  title: "Enhanced Clarity",
                  body: "Balanced macros and mindful ingredients to sharpen focus and support calm energy.",
                },
                {
                  img: "04",
                  title: "Wholesome Greens",
                  body: "Phytonutrient‑dense greens featured across the week for everyday nourishment.",
                },
                {
                  img: "05",
                  title: "Zero Food Waste",
                  body: "Thoughtful menus and small‑batch prep so ingredients are used to their fullest.",
                },
                {
                  img: "06",
                  title: "Nurtured by Nature",
                  body: "A daily ritual built around real ingredients, not shortcuts or extremes.",
                },
              ].map((item) => (
                <article className="nf-why-card" key={item.img}>
                  <div className="nf-why-image">
                    <img
                      src={`https://livit.ae/WebAssets/img/why/${item.img}.png`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


