"use client";

import { useMemo, useState } from "react";

type ProgramId = 8 | 14 | 15 | 17 | 18;
type ProteinKey = "chicken" | "beef" | "seafood" | "vegetarian";
type MealTypeKey = "breakfast" | "lunch" | "dinner" | "snack";

interface ProgramOption {
  id: ProgramId;
  label: string;
}

interface ProteinOption {
  key: ProteinKey;
  label: string;
}

interface CalorieOption {
  id: number;
  label: string;
  calories: number;
}

interface DaysPerWeekOption {
  id: number;
  label: string;
  days: number;
}

interface WeekCountOption {
  id: number;
  label: string;
  weeks: number;
}

interface WeekdayOption {
  key: string;
  label: string;
}

interface CustomizationOption {
  id: string;
  label: string;
  description?: string;
}

const PROGRAMS: ProgramOption[] = [
  { id: 8, label: "Signature Program" },
  { id: 14, label: "RAMADAN Program" },
  { id: 15, label: "Gut Restore" },
  { id: 17, label: "Gut Restore x AL DAS CLINIC |" },
  { id: 18, label: "Gut Restore x AL DAS CLINIC ||" },
];

const PROTEINS: ProteinOption[] = [
  { key: "chicken", label: "Chicken" },
  { key: "beef", label: "Beef" },
  { key: "seafood", label: "Seafood" },
  { key: "vegetarian", label: "Vegetarian" },
];

const CALORIES: CalorieOption[] = [
  { id: 300, label: "300 KCAL", calories: 300 },
  { id: 400, label: "400 KCAL", calories: 400 },
  { id: 500, label: "500 KCAL", calories: 500 },
  { id: 600, label: "600 KCAL", calories: 600 },
  { id: 700, label: "700 KCAL", calories: 700 },
];

const MEAL_TYPES: { key: MealTypeKey; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "snack", label: "Snack" },
];

const DAYS_PER_WEEK: DaysPerWeekOption[] = [
  { id: 5, label: "5 DAYS", days: 5 },
  { id: 6, label: "6 DAYS", days: 6 },
  { id: 7, label: "7 DAYS", days: 7 },
];

const WEEKS_OF_FOOD: WeekCountOption[] = [
  { id: 1, label: "1 WEEK", weeks: 1 },
  { id: 2, label: "2 WEEKS", weeks: 2 },
  { id: 3, label: "3 WEEKS", weeks: 3 },
  { id: 4, label: "4 WEEKS", weeks: 4 },
];

const WEEKDAYS: WeekdayOption[] = [
  { key: "mon", label: "MON" },
  { key: "tue", label: "TUE" },
  { key: "wed", label: "WED" },
  { key: "thu", label: "THU" },
  { key: "fri", label: "FRI" },
];

const CUSTOMIZATIONS: CustomizationOption[] = [
  {
    id: "standard",
    label: "Standard",
    description: "Chef-curated meals as per your selections.",
  },
  {
    id: "gluten_dairy_free",
    label: "Gluten free & dairy free",
    description: "Adjusted to be both gluten and dairy free.",
  },
];

// Simple placeholder pricing logic for UI only.
function calculatePrice(params: {
  calories: number;
  mealsPerDay: number;
  daysPerWeek: number;
  weeks: number;
}) {
  const basePerMeal = 30; // AED
  const calorieFactor = params.calories / 400; // 400 as baseline
  const perMeal = basePerMeal * calorieFactor;
  const totalMeals = params.mealsPerDay * params.daysPerWeek * params.weeks;
  return perMeal * totalMeals;
}

export default function CartPage() {
  const [programId, setProgramId] = useState<ProgramId>(8);
  const [selectedProteins, setSelectedProteins] = useState<ProteinKey[]>([
    "chicken",
  ]);
  const [selectedCalories, setSelectedCalories] = useState<CalorieOption>(
    CALORIES[1],
  );
  const [selectedMeals, setSelectedMeals] = useState<MealTypeKey[]>([
    "breakfast",
    "lunch",
    "dinner",
    "snack",
  ]);
  const [daysPerWeek, setDaysPerWeek] = useState<DaysPerWeekOption>(
    DAYS_PER_WEEK[0],
  );
  const [weekCount, setWeekCount] = useState<WeekCountOption>(
    WEEKS_OF_FOOD[0],
  );
  const [weekdays, setWeekdays] = useState<string[]>(["mon", "tue", "wed"]);
  const [startDate, setStartDate] = useState("");
  const [customization, setCustomization] = useState<string>("standard");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const mealsPerDayCount = selectedMeals.length || 1;

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

  const handleToggleProtein = (key: ProteinKey) => {
    setSelectedProteins((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  };

  const handleToggleMeal = (key: MealTypeKey) => {
    setSelectedMeals((prev) =>
      prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key],
    );
  };

  const handleToggleWeekday = (key: string) => {
    setWeekdays((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key],
    );
  };

  const handleCheckoutClick = () => {
    // Placeholder: later this can call backend /Home/Cart APIs.
    // For now we just log to console so you can verify selections.
    // eslint-disable-next-line no-console
    console.log("Cart selections", {
      programId,
      selectedProteins,
      calories: selectedCalories.calories,
      mealsPerDay: selectedMeals,
      daysPerWeek: daysPerWeek.days,
      weeks: weekCount.weeks,
      weekdays,
      startDate,
      customization,
      additionalInfo,
      totalPrice,
    });
  };

  return (
    <main>
      <section className="cart-img">
        <div className="cart-header">
          <div id="cartNav" className="cart-nav">
            <div className="cart-nav-wrap">
              <span className="ct-wrp">
                <span className="ct-icon">
                  <i className="fa fa-check" />
                </span>
                <a href="/Home/ViewIndex">Select</a>
              </span>
              <span className="ct-wrp">
                <span className="circ" />
                <a href="/Home/Cart">Customize</a>
              </span>
              <span className="ct-wrp">
                <span className="circ_blan" />
                <a href="/Home/CheckOut">Check out</a>
              </span>
            </div>
          </div>
        </div>

        <div className="row cart">
          {/* Left banner image */}
          <div className="col-lg-5 imgbanner">
            <div className="cart-image-box">
              <div className="cart-img">
                <div className="image-box">
                  <div className="image-wrapper">
                    <img src="/WebAssets/img/cart-img1.png" alt="Cart hero" />
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
                <div className="cart-rad">
                  <div className="diet-options option-group">
                    {PROGRAMS.map((p) => (
                      <span key={p.id}>
                        <input
                          type="radio"
                          name="ProgramType"
                          id={`program-${p.id}`}
                          className="box-option"
                          checked={programId === p.id}
                          onChange={() => setProgramId(p.id)}
                        />
                        <label htmlFor={`program-${p.id}`}>{p.label}</label>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Program description placeholder (fillable later from backend) */}
                <div className="lis-crt" id="PlanDescriptions">
                  <ul>
                    <li id="DeliveryType">Balanced meals designed by our in-house nutrition team.</li>
                    <li id="DeliveryDuration">
                      Select your protein below and view this week&apos;s menu online.
                    </li>
                    <li id="ShortDescription">
                      We deliver Monday to Friday – weekends are off.
                    </li>
                  </ul>
                </div>

                {/* Protein preference */}
                <div className="cart-rad" id="DivProtein">
                  <h3 className="cart-lil-ty">
                    PROTEIN PREFERENCE
                    <span className="Pspan" id="ProteinPreference">
                      {selectedProteins.length
                        ? ` (${selectedProteins.join(", ")})`
                        : ""}
                    </span>
                  </h3>
                  <div className="diet-options">
                    <div id="divTags">
                      {PROTEINS.map((p) => (
                        <label
                          key={p.key}
                          className={`tag-label ${
                            selectedProteins.includes(p.key)
                              ? "selected"
                              : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="tag-checkbox"
                            checked={selectedProteins.includes(p.key)}
                            onChange={() =>
                              handleToggleProtein(p.key as ProteinKey)
                            }
                          />
                          <span>{p.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calorie range */}
                <div className="cart-rad" id="DivCalories">
                  <h3 className="cart-lil-ty">
                    CALORIE RANGE PER MEAL
                    <span className="Pspan" id="CaloriesRangePerMeal">
                      {selectedCalories
                        ? ` (${selectedCalories.calories} KCAL)`
                        : ""}
                    </span>
                  </h3>
                  <div className="diet-options">
                    {CALORIES.map((c) => (
                      <label
                        key={c.id}
                        className={`tag-label ${
                          selectedCalories.id === c.id ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="Calories"
                          className="tag-checkbox"
                          checked={selectedCalories.id === c.id}
                          onChange={() => setSelectedCalories(c)}
                        />
                        <span>{c.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Meals per day */}
                <div className="cart-rad" id="DivMealTypes">
                  <h3 className="cart-lil-ty">MEALS PER DAY</h3>
                  <div className="diet-options">
                    <div id="mealTypeContainer">
                      {MEAL_TYPES.map((m) => (
                        <label
                          key={m.key}
                          className={`meal-btn ${
                            selectedMeals.includes(m.key) ? "selected" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="meal-radio"
                            checked={selectedMeals.includes(m.key)}
                            onChange={() =>
                              handleToggleMeal(m.key as MealTypeKey)
                            }
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
                    <div className="cart-rad option-group" id="divDays">
                      {DAYS_PER_WEEK.map((d) => (
                        <label
                          key={d.id}
                          className={`weekday-label ${
                            daysPerWeek.id === d.id ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            className="weekday-checkbox"
                            name="days"
                            checked={daysPerWeek.id === d.id}
                            onChange={() => setDaysPerWeek(d)}
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
                            onChange={() => setWeekCount(w)}
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
                    onChange={(e) => setStartDate(e.target.value)}
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
                            onChange={() => setCustomization(c.id)}
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
                      onChange={(e) => setAdditionalInfo(e.target.value)}
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
                <div className="cat-bt" style={{ marginTop: "24px" }}>
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

