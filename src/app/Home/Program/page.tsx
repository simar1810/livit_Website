"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePlans } from "@/hooks/usePlans";
import { useMenuList } from "@/hooks/useMenuList";
import { getFallbackPrograms } from "@/config/cartOptions";

type CalorieBand = 300 | 400 | 500 | 600 | 700;
type ProteinPreference = "chicken" | "beef" | "seafood";

export default function ProgramPage() {
  const { plans, loading: plansLoading } = usePlans();
  const fallbackPrograms = getFallbackPrograms();
  const programOptions =
    plans.length > 0
      ? plans.map((p) => ({ id: p._id, label: p.title }))
      : fallbackPrograms;

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedWeek, setSelectedWeek] = useState<"current" | "next">("current");
  const [selectedCalorieBand, setSelectedCalorieBand] =
    useState<CalorieBand | null>(400);
  const [selectedProtein, setSelectedProtein] =
    useState<ProteinPreference | null>("chicken");

  const { data: menuData, loading: menuLoading } = useMenuList(selectedPlanId);

  useEffect(() => {
    if (programOptions.length === 0) return;
    if (
      !selectedPlanId ||
      !programOptions.some((p) => p.id === selectedPlanId)
    ) {
      setSelectedPlanId(programOptions[0].id);
    }
  }, [programOptions, selectedPlanId]);

  return (
    <main className="program-page-wrap">
      <section className="program-hero">
        <div className="program-hero-inner">
          <h1 className="program-title">Our Program</h1>
          <p className="program-subtitle">
            Choose your plan, customize calories and protein, and see your weekly menu.
          </p>
        </div>
      </section>

      <section className="program-content">
        <div className="program-container">
          {/* Program selection */}
          <div className="program-block">
            <h2 className="program-block-title">Program</h2>
            {plansLoading && programOptions.length === 0 && (
              <p className="program-muted">Loading plans…</p>
            )}
            {!plansLoading && programOptions.length === 0 && (
              <p className="program-muted">Sign in to see available programs.</p>
            )}
            <div className="program-options program-options--cards">
              {programOptions.map((p) => (
                <label
                  key={p.id}
                  className={`program-option-card ${
                    selectedPlanId === p.id ? "program-option-card--active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="Plan"
                    value={p.id}
                    checked={selectedPlanId === p.id}
                    onChange={() => setSelectedPlanId(p.id)}
                    className="program-option-input"
                  />
                  <span className="program-option-label">{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Week */}
          <div className="program-block">
            <h2 className="program-block-title">Menu of week</h2>
            <div className="program-options program-options--pills">
              <label
                className={`program-pill ${
                  selectedWeek === "current" ? "program-pill--active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="Weeks"
                  value="current"
                  checked={selectedWeek === "current"}
                  onChange={() => setSelectedWeek("current")}
                  className="program-option-input"
                />
                <span>Current week</span>
                <span className="program-pill-meta">(23/02 – 27/02)</span>
              </label>
              <label
                className={`program-pill ${
                  selectedWeek === "next" ? "program-pill--active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="Weeks"
                  value="next"
                  checked={selectedWeek === "next"}
                  onChange={() => setSelectedWeek("next")}
                  className="program-option-input"
                />
                <span>Next week</span>
              </label>
            </div>
          </div>

          {/* Calorie range */}
          <div className="program-block">
            <h2 className="program-block-title">
              Calorie range per meal
              {selectedCalorieBand && (
                <span className="program-block-badge">{selectedCalorieBand} cal</span>
              )}
            </h2>
            <div className="program-options program-options--pills">
              {([300, 400, 500, 600, 700] as const).map((cal) => (
                <label
                  key={cal}
                  className={`program-pill ${
                    selectedCalorieBand === cal ? "program-pill--active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="Calories"
                    checked={selectedCalorieBand === cal}
                    onChange={() => setSelectedCalorieBand(cal)}
                    className="program-option-input"
                  />
                  <span>{cal} cal</span>
                </label>
              ))}
            </div>
          </div>

          {/* Protein preference */}
          <div className="program-block">
            <h2 className="program-block-title">
              Protein preference
              {selectedProtein && (
                <span className="program-block-badge">{selectedProtein}</span>
              )}
            </h2>
            <div className="program-options program-options--pills">
              {(["chicken", "beef", "seafood"] as ProteinPreference[]).map(
                (protein) => (
                  <label
                    key={protein}
                    className={`program-pill ${
                      selectedProtein === protein ? "program-pill--active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="Protein"
                      checked={selectedProtein === protein}
                      onChange={() =>
                        setSelectedProtein(
                          selectedProtein === protein ? null : protein
                        )
                      }
                      className="program-option-input"
                    />
                    <span>{protein}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Weekly menu */}
          <div className="program-block program-block--menu">
            <h2 className="program-block-title">Weekly menu</h2>
            {menuLoading && selectedPlanId && selectedPlanId !== "default" && (
              <p className="program-muted">Loading menu…</p>
            )}
            {menuData?.templates &&
              Array.isArray(menuData.templates) &&
              menuData.templates.length > 0 && (
                <div className="program-menu-grid">
                  {(menuData.templates as { title?: string; name?: string }[])
                    .slice(0, 7)
                    .map((item, i) => (
                      <div className="program-menu-card" key={i}>
                        <span className="program-menu-day">Day {i + 1}</span>
                        <p className="program-menu-title">
                          {item.title ?? item.name ?? `Day ${i + 1}`}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            {!menuLoading &&
              (!menuData?.templates?.length ||
                selectedPlanId === "default" ||
                !selectedPlanId) && (
                <div className="program-cta-box">
                  <p className="program-cta-text">
                    Your plan’s weekly menu is based on your selections. Customize
                    program, calories, and protein in the Cart, then place your
                    order to get started.
                  </p>
                  <Link
                    href="/Home/Cart"
                    className="program-cta-btn"
                  >
                    Go to Cart
                  </Link>
                </div>
              )}
            {!menuLoading &&
              menuData?.templates &&
              Array.isArray(menuData.templates) &&
              menuData.templates.length === 0 &&
              selectedPlanId &&
              selectedPlanId !== "default" && (
                <div className="program-cta-box">
                  <p className="program-cta-text">
                    No menu items for this plan yet. Add your choices in the Cart
                    and checkout.
                  </p>
                  <Link href="/Home/Cart" className="program-cta-btn">
                    Go to Cart
                  </Link>
                </div>
              )}
          </div>
        </div>
      </section>
    </main>
  );
}
