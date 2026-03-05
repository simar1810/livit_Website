"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const EMIRATES = [
  { name: "Dubai", available: true },
  { name: "Sharjah", available: false },
  { name: "Ajman", available: false },
  { name: "Ras Al khaimah", available: false },
  { name: "Umm al-quwain", available: false },
  { name: "Fujairah", available: false },
  { name: "Abu Dhabi", available: false },
] as const;

type EmirateName = (typeof EMIRATES)[number]["name"] | null;

export default function CartEntryPage() {
  const router = useRouter();
  const [selectedEmirate, setSelectedEmirate] = useState<EmirateName>("Dubai");

  return (
    <main className="cart-entry-page" aria-labelledby="cart-entry-title">
      <section className="cart-entry-hero">
        <div className="cart-entry-mask" />
        <div className="cart-entry-inner">
          <div className="cart-entry-copy">
            <p className="cart-entry-kicker">Start your Nature Fit ritual</p>
            <h1 id="cart-entry-title">Where should we deliver?</h1>
            <p className="cart-entry-subtitle">
              Choose your emirate to see available delivery and customize your
              weekly plan.
            </p>
          </div>

          <div className="cart-entry-card" aria-label="Choose your emirate">
            <div className="cart-entry-grid">
              {EMIRATES.map((em) => (
                <button
                  key={em.name}
                  type="button"
                  className={`cart-entry-emirate ${
                    em.available ? "cart-entry-emirate--active" : "cart-entry-emirate--disabled"
                  } ${selectedEmirate === em.name ? "cart-entry-emirate--selected" : ""}`}
                  onClick={() => em.available && setSelectedEmirate(em.name)}
                  disabled={!em.available}
                  aria-disabled={!em.available}
                >
                  <span>{em.name}</span>
                  {!em.available && (
                    <span className="cart-entry-pill">Coming soon</span>
                  )}
                </button>
              ))}
            </div>

            <div className="cart-entry-footer">
              <button
                type="button"
                className="primary-btn cart-entry-cta"
                disabled={selectedEmirate?.toLowerCase() !== "dubai"}
                onClick={() => {
                  if (selectedEmirate?.toLowerCase() === "dubai") {
                    router.push("/Home/Cart");
                  }
                }}
              >
                Confirm & continue
              </button>
              <p className="cart-entry-note">
                You can fine-tune calories, meals per day, and duration on the next step.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

