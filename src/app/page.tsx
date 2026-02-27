"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/components/SiteShell";

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
                  <h2>Your Daily Ritual</h2>
                  <p>Delivered Daily To Your Doorstep</p>
                  <span className="hero-cta" onClick={openCart}>
                    Join The Journey
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
                  Wellness is a journey, not a destination
                  <img
                    src="https://livit.ae/WebAssets/img/tomato.png"
                    className="tom_t"
                    alt="Tomato"
                  />
                  . At Livit, we encourage you to cultivate lasting, sustainable
                  eating habits that honor your body and lifestyle.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product_wrp">
                <div className="pro_img">
                  <img
                    src="https://livit.ae/WebAssets/img/drop-image/1.jpg"
                    alt="Program 1"
                  />
                </div>
                <div className="pro_con">
                  <h2>SIGNATURE PROGRAM</h2>
                  <p>
                    Chef-Crafted Meals. Nutritionist-Backed, Balanced, Mindful
                    Eating.
                  </p>
                  <a className="join" onClick={openCart}>
                    JOIN THE PROGRAM
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product_wrp">
                <div className="pro_img">
                  <img
                    src="https://livit.ae/WebAssets/img/drop-image/2.jpg"
                    alt="Program 2"
                  />
                </div>
                <div className="pro_con">
                  <h2>GUT RESTORE PROGRAM</h2>
                  <p>
                    5-Day Reset. Gut-Loving, Anti-Inflammatory, and
                    Restorative.
                  </p>
                  <a className="join" onClick={openCart}>
                    JOIN THE PROGRAM
                  </a>
                </div>
              </div>
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
                  <a href="/Home/Program">VIEW FULL WEEKLY MENU</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Livit image grid */}
      <section className="why_livit">
        <div className="container-fluid">
          <div className="pro-tit">
            <h2>why livit?</h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="grid_six">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div className="box" key={num}>
                    <a href="#">
                      <img
                        src={`https://livit.ae/WebAssets/img/why/0${num}.png`}
                        alt="why Livit"
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


