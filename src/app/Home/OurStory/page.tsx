"use client";

import Link from "next/link";

export default function OurStoryPage() {
  return (
    <main className="ourstory-page-wrap">
      <section className="ourstory-hero">
        <div className="ourstory-hero-inner">
          <h1 className="ourstory-title">About us</h1>
          <p className="ourstory-subtitle">
            Nature-driven meal plans to fit your day.
          </p>
        </div>
      </section>

      <section className="ourstory-content">
        <div className="ourstory-container">
          <div className="ourstory-block">
            <h2 className="ourstory-heading">We believe food transcends mere nourishment</h2>
            <p className="ourstory-text">
              It’s a daily ritual of vitality, balance, and holistic well-being.
              Our approach to meal prep is designed to seamlessly integrate into
              your lifestyle, fueling your body with purpose and premium
              ingredients, while upholding the highest standards of nutrition and
              quality.
            </p>
          </div>
        </div>
      </section>

      <section className="ourstory-image-section">
        <div className="ourstory-image-wrap">
          <img
            src="https://livit.ae/WebAssets/img/sty1.jpg"
            alt="Our approach to food and wellness"
            className="ourstory-img"
          />
        </div>
      </section>

      <section className="ourstory-content">
        <div className="ourstory-container">
          <div className="ourstory-block">
            <h2 className="ourstory-heading">Each meal is a masterpiece</h2>
            <p className="ourstory-text">
              Thoughtfully crafted by our gourmet chefs and guided by our in-house
              dietitians and nutritionists. Inspired by mindful eating
              principles, our meals are designed to support your nutritional
              needs while promoting a balanced lifestyle. Whether you’re looking
              to boost energy, enhance wellness, or restore balance, our meals are
              curated to support your ongoing journey, fostering long-term
              vitality and sustained well-being.
            </p>
          </div>
        </div>
      </section>

      <section className="ourstory-image-section">
        <div className="ourstory-image-wrap">
          <img
            src="https://livit.ae/WebAssets/img/sty2.jpg"
            alt="Chef-crafted meals"
            className="ourstory-img"
          />
        </div>
      </section>

      <section className="ourstory-cta">
        <div className="ourstory-container">
          <Link href="/Home/Program" className="ourstory-cta-btn">
            View our program
          </Link>
        </div>
      </section>
    </main>
  );
}
