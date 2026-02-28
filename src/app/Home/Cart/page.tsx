"use client";

import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartFlowHeader from "@/components/CartFlowHeader";
import { useCart } from "@/components/SiteShell";
import { calculatePrice } from "@/lib/cartUtils";
import type { ProteinKey, MealTypeKey } from "@/types/cart";
import type { ProgramOption } from "@/types/cart";
import {
  getFallbackPrograms,
  PROTEINS,
  CALORIES,
  MEAL_TYPES,
  DAYS_PER_WEEK,
  WEEKS_OF_FOOD,
  WEEKDAYS,
  CUSTOMIZATIONS,
} from "@/config/cartOptions";
import { usePlans } from "@/hooks/usePlans";
import { COPY } from "@/config/copy";

const CART_TOAST_MESSAGE = "Cart updated";

export default function CartPage() {
  const router = useRouter();
  const { cartState, setCartState, showCartToast } = useCart();
  const { plans, loading: plansLoading } = usePlans();
  const {
    programId,
    selectedProteins,
    selectedCalories,
    selectedMeals,
    daysPerWeek,
    weekCount,
    weekdays,
    startDate,
    customization,
    additionalInfo,
  } = cartState;

  const mealsPerDayCount = selectedMeals.length || 1;

  const programOptions: ProgramOption[] = useMemo(() => {
    if (plans.length > 0) {
      return plans.map((p) => ({ id: p._id, label: p.title }));
    }
    return getFallbackPrograms();
  }, [plans]);

  // When we have plans from API (logged in), ensure cart has a real plan id – replace "default" or invalid id
  useEffect(() => {
    if (plansLoading || programOptions.length === 0) return;
    const currentValid = programOptions.some((p) => p.id === programId);
    if (!currentValid) {
      setCartState((prev) => ({ ...prev, programId: programOptions[0].id }));
      showCartToast(CART_TOAST_MESSAGE);
    }
  }, [plansLoading, programId, programOptions, setCartState, showCartToast]);

  const totalPrice = useMemo(
    () =>
      calculatePrice({
        calories: selectedCalories.calories,
        mealsPerDay: mealsPerDayCount,
        daysPerWeek: daysPerWeek.days,
        weeks: weekCount.weeks,
      }),
    [selectedCalories, mealsPerDayCount, daysPerWeek, weekCount],
  );

  const updateCart = <K extends keyof typeof cartState>(
    key: K,
    value: (typeof cartState)[K],
  ) => {
    setCartState((prev) => ({ ...prev, [key]: value }));
    showCartToast(CART_TOAST_MESSAGE);
  };

  const handleToggleProtein = (key: ProteinKey) => {
    setCartState((prev) => ({
      ...prev,
      selectedProteins: prev.selectedProteins.includes(key)
        ? prev.selectedProteins.filter((p) => p !== key)
        : [...prev.selectedProteins, key],
    }));
    showCartToast(CART_TOAST_MESSAGE);
  };

  const handleToggleMeal = (key: MealTypeKey) => {
    setCartState((prev) => ({
      ...prev,
      selectedMeals: prev.selectedMeals.includes(key)
        ? prev.selectedMeals.filter((m) => m !== key)
        : [...prev.selectedMeals, key],
    }));
    showCartToast(CART_TOAST_MESSAGE);
  };

  const handleToggleWeekday = (key: string) => {
    setCartState((prev) => ({
      ...prev,
      weekdays: prev.weekdays.includes(key)
        ? prev.weekdays.filter((d) => d !== key)
        : [...prev.weekdays, key],
    }));
    showCartToast(CART_TOAST_MESSAGE);
  };

  const handleCheckoutClick = () => {
    router.push("/Home/CheckOut");
  };

  return (
    <main className="has-bottom-cart">
      <section className="cart-img" aria-labelledby="cart-page-title">
        <h1 id="cart-page-title" className="visually-hidden">
          {COPY.cartPageTitle}
        </h1>
        <CartFlowHeader currentStep="customize" />
        <div className="row cart">
          {/* Left banner image */}
          <div className="col-lg-5 imgbanner">
            <div className="cart-image-box">
              <div className="cart-img">
                <div className="image-box">
                  <div className="image-wrapper">
                    <img
                      src="https://livit.ae/WebAssets/img/cart-img1.png"
                      alt="Your meal plan"
                      className="cart-hero-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right configuration column */}
          <div className="col-lg-5 offset-lg-1">
            <div className="cart-desc-wrap">
              <div className="cart-desc-pro">
                {/* Program selection */}
                <div className="cart-rad" role="group" aria-labelledby="program-label">
                  <span id="program-label" className="visually-hidden">Program type</span>
                  {programOptions.length === 0 && !plansLoading && (
                    <p className="text-muted small">Sign in to see available plans.</p>
                  )}
                  <div className="diet-options option-group">
                    {programOptions.map((p) => (
                      <span key={p.id}>
                        <input
                          type="radio"
                          name="ProgramType"
                          id={`program-${p.id}`}
                          className="box-option"
                          checked={programId === p.id}
                          onChange={() => updateCart("programId", p.id)}
                        />
                        <label htmlFor={`program-${p.id}`}>{p.label}</label>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Program description placeholder (fillable later from backend) */}
                <div className="lis-crt" id="PlanDescriptions">
                  <ul>
                    <li id="DeliveryType">{COPY.planDescriptions.delivery}</li>
                    <li id="DeliveryDuration">{COPY.planDescriptions.duration}</li>
                    <li id="ShortDescription">{COPY.planDescriptions.short}</li>
                  </ul>
                </div>

                {/* Protein preference */}
                <div className="cart-rad" id="DivProtein">
                  <h3 id="protein-heading" className="cart-lil-ty">
                    PROTEIN PREFERENCE
                    <span className="Pspan" id="ProteinPreference">
                      {selectedProteins.length
                        ? ` (${selectedProteins.join(", ")})`
                        : ""}
                    </span>
                  </h3>
                  <div className="diet-options" role="group" aria-labelledby="protein-heading">
                    <div id="divTags">
                      {PROTEINS.map((p) => (
                        <label
                          key={p.key}
                          htmlFor={`protein-${p.key}`}
                          className={`tag-label ${
                            selectedProteins.includes(p.key)
                              ? "selected"
                              : ""
                          }`}
                        >
                          <input
                            id={`protein-${p.key}`}
                            type="checkbox"
                            className="tag-checkbox"
                            checked={selectedProteins.includes(p.key)}
                            onChange={() =>
                              handleToggleProtein(p.key as ProteinKey)
                            }
                            aria-checked={selectedProteins.includes(p.key)}
                          />
                          <span>{p.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calorie range */}
                <div className="cart-rad" id="DivCalories" role="group" aria-labelledby="calorie-heading">
                  <h3 id="calorie-heading" className="cart-lil-ty">
                    CALORIE RANGE PER MEAL
                    <span className="Pspan" id="CaloriesRangePerMeal">
                      {selectedCalories
                        ? ` (${selectedCalories.calories} KCAL)`
                        : ""}
                    </span>
                  </h3>
                  <div className="diet-options" role="radiogroup" aria-labelledby="calorie-heading">
                    {CALORIES.map((c) => (
                      <label
                        key={c.id}
                        htmlFor={`calorie-${c.id}`}
                        className={`tag-label ${
                          selectedCalories.id === c.id ? "selected" : ""
                        }`}
                      >
                        <input
                          id={`calorie-${c.id}`}
                          type="radio"
                          name="Calories"
                          className="tag-checkbox"
                          checked={selectedCalories.id === c.id}
                          onChange={() => {
                                updateCart("selectedCalories", c);
                              }}
                          aria-checked={selectedCalories.id === c.id}
                        />
                        <span>{c.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Meals per day */}
                <div className="cart-rad" id="DivMealTypes" role="group" aria-labelledby="meals-heading">
                  <h3 id="meals-heading" className="cart-lil-ty">MEALS PER DAY</h3>
                  <div className="diet-options">
                    <div id="mealTypeContainer">
                      {MEAL_TYPES.map((m) => (
                        <label
                          key={m.key}
                          htmlFor={`meal-${m.key}`}
                          className={`meal-btn ${
                            selectedMeals.includes(m.key) ? "selected" : ""
                          }`}
                        >
                          <input
                            id={`meal-${m.key}`}
                            type="checkbox"
                            className="meal-radio"
                            checked={selectedMeals.includes(m.key)}
                            onChange={() =>
                              handleToggleMeal(m.key as MealTypeKey)
                            }
                            aria-checked={selectedMeals.includes(m.key)}
                          />
                          {m.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Program length */}
                <div className="crt-check-bx">
                  <h3 id="DivLength">PROGRAM LENGTH</h3>

                  {/* Days per week */}
                  <div id="DivDaysContent">
                    <h4>
                      <b>DAYS PER WEEK</b>
                    </h4>
                    <div className="cart-rad option-group" id="divDays" role="radiogroup" aria-labelledby="DivLength">
                      {DAYS_PER_WEEK.map((d) => (
                        <label
                          key={d.id}
                          htmlFor={`days-${d.id}`}
                          className={`weekday-label ${
                            daysPerWeek.id === d.id ? "selected" : ""
                          }`}
                        >
                          <input
                            id={`days-${d.id}`}
                            type="radio"
                            className="weekday-checkbox"
                            name="days"
                            checked={daysPerWeek.id === d.id}
                            onChange={() => updateCart("daysPerWeek", d)}
                            aria-checked={daysPerWeek.id === d.id}
                          />
                          {d.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Week days */}
                  <div id="divWeekDaysHead">
                    <h4>
                      <b>WEEK DAYS</b>
                    </h4>
                    <div className="cart-rad option-group" id="divWeekDays">
                      {WEEKDAYS.map((d) => (
                        <label
                          key={d.key}
                          className={`weekday-label ${
                            weekdays.includes(d.key) ? "selected" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="weekday-checkbox"
                            checked={weekdays.includes(d.key)}
                            onChange={() => handleToggleWeekday(d.key)}
                          />
                          {d.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Weeks of food */}
                  <div id="DivWeekContent">
                    <h4>
                      <b>WEEKS OF FOOD</b>
                    </h4>
                    <div className="cart-rad option-group" id="divWeeks">
                      {WEEKS_OF_FOOD.map((w) => (
                        <label
                          key={w.id}
                          className={`weekday-label ${
                            weekCount.id === w.id ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            className="weekday-checkbox"
                            name="weeks"
                            checked={weekCount.id === w.id}
                            onChange={() => updateCart("weekCount", w)}
                          />
                          {w.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Start date */}
                  <h4>
                    <b>Select Date</b>
                  </h4>
                  <select
                    id="startdate"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => {
                    setCartState((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }));
                    showCartToast(CART_TOAST_MESSAGE);
                  }}
                  >
                    <option value="">START DATE</option>
                    <option value="2026-03-02">MONDAY 02/03/2026</option>
                    <option value="2026-03-09">MONDAY 09/03/2026</option>
                    <option value="2026-03-16">MONDAY 16/03/2026</option>
                  </select>

                  {/* Customization */}
                  <br />
                  <div className="cart-rad" id="DivMealCustomized">
                    <h4>
                      <b>Choose Customization</b>
                    </h4>
                    <div className="option-group" id="divCustomization">
                      {CUSTOMIZATIONS.map((c) => (
                        <label
                          key={c.id}
                          className={`weekday-label ${
                            customization === c.id ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            className="weekday-checkbox"
                            name="customization"
                            checked={customization === c.id}
                            onChange={() => updateCart("customization", c.id)}
                          />
                          {c.label}
                        </label>
                      ))}
                    </div>
                    {CUSTOMIZATIONS.find((c) => c.id === customization)
                      ?.description && (
                      <p
                        id="MealCustomizationText"
                        style={{
                          fontSize: 15,
                          fontWeight: 300,
                          textTransform: "uppercase",
                        }}
                      >
                        {
                          CUSTOMIZATIONS.find((c) => c.id === customization)
                            ?.description
                        }
                      </p>
                    )}
                  </div>

                  {/* Additional info */}
                  <div className="cart-bottom-desc">
                    <h4>
                      <b>Additional Info</b>
                    </h4>
                    <input
                      type="text"
                      id="AdditionalInfo"
                      className="form-control"
                      placeholder="ENTER ADDITIONAL INFO.."
                      value={additionalInfo}
                      onChange={(e) => {
                      setCartState((prev) => ({
                        ...prev,
                        additionalInfo: e.target.value,
                      }));
                    }}
                    />
                    <br />
                    <p>
                      Orders close on Friday 12:00 PM for following Monday
                      delivery.
                    </p>
                    <p>48-hour notice required for cancellations or pauses.</p>
                  </div>
                </div>
                {/* Inline checkout button so it's always visible */}
                <div className="cat-bt">
                  <a className="cart-check" onClick={handleCheckoutClick}>
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom sticky cart summary */}
      <div className="bottom-cart-wrap">
        <div className="bottom-cart">
          <div className="cart-prc">
            <span style={{ fontSize: 20, fontWeight: "bold" }}>TOTAL</span>
            <span className="total">
              {totalPrice.toFixed(2)}
            </span>
            <span>AED</span>
          </div>
          <div className="cart-prc">
            <span id="TotalCalories">
              {selectedCalories.calories * mealsPerDayCount} KCAL / day
            </span>
          </div>
          <div className="cat-bt">
            <a className="cart-check" onClick={handleCheckoutClick}>
              Checkout
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

