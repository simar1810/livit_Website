"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/components/SiteShell";
import PackageCard from "@/components/PackageCard";
import { COPY } from "@/config/copy";

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
      {/* Hero slider */}
      <section id="autoSlider" className="slider">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {SLIDES.map((src, index) => (
            <div className="slide" key={src}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                style={{ "--pos-y": "50%" } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
        <div className="slider-mask" />
        <div className="slider-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="wra-hero-text">
                  <h1 className="hero-title">{COPY.heroTitle}</h1>
                  <p>{COPY.heroSubtitle}</p>
                  <span className="hero-cta" onClick={openCart} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCart(); } }}>
                    {COPY.heroCta}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature / Gut Restore program tiles */}
      <section className="prod">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="about-text">
                <p>
                  {COPY.introParagraph1}
                  <img
                    src="https://livit.ae/WebAssets/img/tomato.png"
                    className="tom_t"
                    alt=""
                    loading="lazy"
                  />
                  . {COPY.introParagraph2}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <PackageCard
                title="SIGNATURE PROGRAM"
                description="Chef-Crafted Meals. Nutritionist-Backed, Balanced, Mindful Eating."
                imageSrc="https://livit.ae/WebAssets/img/drop-image/1.jpg"
                imageAlt="Signature Program"
                ctaLabel="JOIN THE PROGRAM"
                onCtaClick={openCart}
              />
            </div>
            <div className="col-md-6">
              <PackageCard
                title="GUT RESTORE PROGRAM"
                description="5-Day Reset. Gut-Loving, Anti-Inflammatory, and Restorative."
                imageSrc="https://livit.ae/WebAssets/img/drop-image/2.jpg"
                imageAlt="Gut Restore Program"
                ctaLabel="JOIN THE PROGRAM"
                onCtaClick={openCart}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inside next week’s menu (static CTA, dynamic meals would require backend) */}
      <section className="product-tab">
        <div className="container-fluid">
          <div className="row">
            <div className="pro-tit">
              <h2>INSIDE NEXT WEEK’S MENU</h2>
              <p>A TASTE OF WHAT YOU’LL ENJOY</p>
            </div>
            <div className="col-md-12">
              <div className="tab-container">
                <div className="dfv_view">
                  <a href="/Home/Program">{COPY.menuCta}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Nature Fit image grid */}
      <section className="why_livit">
        <div className="container-fluid">
            <div className="pro-tit">
              <h2>{COPY.whySectionTitle}</h2>
            </div>
          <div className="row">
            <div className="col-md-12">
              <div className="grid_six">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div className="box" key={num}>
                    <a href="#">
                      <img
                        src={`https://livit.ae/WebAssets/img/why/0${num}.png`}
                        alt=""
                        loading="lazy"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


