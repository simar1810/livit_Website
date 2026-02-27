"use client";

import { useState } from "react";

type ProgramKey =
  | "signature"
  | "ramadan"
  | "gut"
  | "gut_al_das_i"
  | "gut_al_das_ii";

type CalorieBand = 300 | 400 | 500 | 600 | 700;
type ProteinPreference = "chicken" | "beef" | "seafood";

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

interface MealInfo {
  type: MealType;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

interface DayInfo {
  label: string;
  dateLabel: string;
  meals: MealInfo[];
}

const DAYS: DayInfo[] = [
  {
    label: "DAY 1",
    dateLabel: "MONDAY, FEB 23, 2026",
    meals: [
      {
        type: "Breakfast",
        name: "CHICKPEA FLOUR OMELETTE WITH SPINACH ,TOMATO & SAU",
        calories: 318,
        protein: 10.8,
        carbs: 33.2,
        fat: 15.5,
        description:
          "Chickpea flour omelette with spinach, cherry tomatoes, earthy oyster mushrooms, and turmeric, finished with tangy sauerkraut and fresh avocado",
      },
      {
        type: "Lunch",
        name: "CHICKEN CHIPOTILE BOWL",
        calories: 420,
        protein: 35.9,
        carbs: 46.1,
        fat: 10.4,
        description:
          "Chipotle chicken bowl with brown basmati rice, black beans, sweet corn, sautéed peppers, creamy avocado, and a cooling yogurt sauce",
      },
      {
        type: "Dinner",
        name: "KOREAN BBQ TACO",
        calories: 393,
        protein: 26,
        carbs: 30.7,
        fat: 17.1,
        description:
          "Korean BBQ beef tacos with sesame-glazed brisket, crisp vegetables, fresh spring onions, and a bright lime finish",
      },
      {
        type: "Snack",
        name: "LEMON CAKE",
        calories: 216,
        protein: 1.4,
        carbs: 32.5,
        fat: 9,
        description: "Powered by Honestry",
      },
    ],
  },
  {
    label: "DAY 2",
    dateLabel: "TUESDAY, FEB 24, 2026",
    meals: [
      {
        type: "Breakfast",
        name: "CHOCOLATE PB PROTEIN OATS",
        calories: 419,
        protein: 26.6,
        carbs: 41.4,
        fat: 15.4,
        description:
          "Peanut butter cup overnight oats with creamy yogurt, dark chocolate, chia seeds, and a touch of maple",
      },
      {
        type: "Lunch",
        name: "TANDOORI CHICKEN WITH CAULIFLOWER RICE",
        calories: 399,
        protein: 42.7,
        carbs: 17.7,
        fat: 18.2,
        description:
          "Tandoori-spiced chicken with fragrant cauliflower rice, finished with a cooling mint yogurt and fresh herbs",
      },
      {
        type: "Dinner",
        name: "BEEF & AUBERGINE BOWL",
        calories: 425,
        protein: 23.5,
        carbs: 41,
        fat: 18.8,
        description:
          "Minced beef and aubergine in a savory gochujang–tamari sauce, topped with sesame seeds over jasmine rice",
      },
      {
        type: "Snack",
        name: "PROTEIN CHOCO DONUT",
        calories: 151,
        protein: 6.6,
        carbs: 12.5,
        fat: 9.2,
        description: "Powered by Honestry",
      },
    ],
  },
  {
    label: "DAY 3",
    dateLabel: "WEDNESDAY, FEB 25, 2026",
    meals: [
      {
        type: "Breakfast",
        name: "BREAKFAST MUFFIN",
        calories: 419,
        protein: 22.9,
        carbs: 33.7,
        fat: 23.9,
        description:
          "Breakfast muffins with folded egg, chicken sausage, and melted cheese",
      },
      {
        type: "Lunch",
        name: "MORROCAN BEEF MEZZE",
        calories: 420,
        protein: 30.6,
        carbs: 38.2,
        fat: 18,
        description:
          "Moroccan-spiced beef tenderloin with aromatic cumin and paprika, served with basmati rice, roasted bell peppers, fresh parsley, and a cooling yogurt sauce",
      },
      {
        type: "Dinner",
        name: "KABSA CHICKEN",
        calories: 416,
        protein: 36.1,
        carbs: 45.1,
        fat: 10.3,
        description:
          "Kabsa chicken with fragrant basmati rice, slow-simmered tomatoes, warming spices, and a hint of dry lemon",
      },
      {
        type: "Snack",
        name: "STRAWBERRY JAM TURFFLES",
        calories: 77,
        protein: 2.5,
        carbs: 5,
        fat: 5.7,
        description: "Powered by Honestry",
      },
    ],
  },
  {
    label: "DAY 4",
    dateLabel: "THURSDAY, FEB 26, 2026",
    meals: [
      {
        type: "Breakfast",
        name: "VANILLA STALK & JAM",
        calories: 403,
        protein: 16.9,
        carbs: 50.8,
        fat: 16.7,
        description:
          "Fluffy vanilla protein pancakes with banana, almond butter, fresh raspberries, and a hint of coconut sugar",
      },
      {
        type: "Lunch",
        name: "CHICKEN MUJADARA",
        calories: 400,
        protein: 36.1,
        carbs: 44.7,
        fat: 6.3,
        description:
          "Grilled chicken with lentil rice, served with yogurt and cucumber mix on the side",
      },
      {
        type: "Dinner",
        name: "LEVANTINE STEAK BOWL",
        calories: 401,
        protein: 26.8,
        carbs: 36.9,
        fat: 13.9,
        description:
          "Grilled steak over quinoa with arugula, cherry tomatoes, roasted eggplant, crispy chickpeas, hummus, olives, and a silky tahini drizzle",
      },
      {
        type: "Snack",
        name: "BLUEBERRY CRUMBLE",
        calories: 237,
        protein: 4.5,
        carbs: 19.3,
        fat: 16,
        description: "Powered by Honestry",
      },
    ],
  },
  {
    label: "DAY 5",
    dateLabel: "FRIDAY, FEB 27, 2026",
    meals: [
      {
        type: "Breakfast",
        name: "MEDITERRANEAN LABNEH BOWL",
        calories: 404,
        protein: 23.3,
        carbs: 12.1,
        fat: 17.3,
        description:
          "Creamy labneh with soft eggs, kalamata olives, cucumber, cherry tomatoes, earthy oyster mushrooms, and za’atar",
      },
      {
        type: "Lunch",
        name: "CHICKEN CHIPOTILE BOWL",
        calories: 420,
        protein: 35.9,
        carbs: 46.1,
        fat: 10.4,
        description:
          "Chipotle chicken bowl with brown basmati rice, black beans, sweet corn, sautéed peppers, creamy avocado, and a cooling yogurt sauce",
      },
      {
        type: "Dinner",
        name: "STEAK BITES & ROASTED SWEET POTATOES",
        calories: 394,
        protein: 31.9,
        carbs: 27.1,
        fat: 12.4,
        description:
          "Seared steak bites with roasted sweet potatoes and peppers, finished with smoky spices and a bright lemon-tahini drizzle",
      },
      {
        type: "Snack",
        name: "CLASSIC HONEST BROWNIE",
        calories: 303,
        protein: 2.4,
        carbs: 34.9,
        fat: 17,
        description: "Powered by Honestry",
      },
    ],
  },
];

export default function ProgramPage() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramKey>("signature");
  const [selectedWeek, setSelectedWeek] = useState<"current" | "next">("current");
  const [selectedCalorieBand, setSelectedCalorieBand] =
    useState<CalorieBand | null>(400);
  const [selectedProtein, setSelectedProtein] =
    useState<ProteinPreference | null>("chicken");
  const [openDayIndex, setOpenDayIndex] = useState(0);

  const handleDayToggle = (index: number) => {
    setOpenDayIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <main>
      <section className="cart-img">
        <div className="row g-4 align-items-start">
          <div className="col-lg-12 p-2">
            <div className="cart-rad p-4">
              <h3 className="cart-lil-ty">PROGRAM</h3>

              {/* Program selection */}
              <div className="diet-options pt-3">
                <div>
                  <input
                    type="radio"
                    id="Plan_8"
                    name="Plan"
                    value="8"
                    checked={selectedProgram === "signature"}
                    onChange={() => setSelectedProgram("signature")}
                  />
                  <label htmlFor="Plan_8" style={{ fontSize: 20 }}>
                    <span>Signature Program</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Plan_14"
                    name="Plan"
                    value="14"
                    checked={selectedProgram === "ramadan"}
                    onChange={() => setSelectedProgram("ramadan")}
                  />
                  <label htmlFor="Plan_14" style={{ fontSize: 20 }}>
                    <span>RAMADAN Program</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Plan_15"
                    name="Plan"
                    value="15"
                    checked={selectedProgram === "gut"}
                    onChange={() => setSelectedProgram("gut")}
                  />
                  <label htmlFor="Plan_15" style={{ fontSize: 20 }}>
                    <span>Gut Restore</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Plan_17"
                    name="Plan"
                    value="17"
                    checked={selectedProgram === "gut_al_das_i"}
                    onChange={() => setSelectedProgram("gut_al_das_i")}
                  />
                  <label htmlFor="Plan_17" style={{ fontSize: 20 }}>
                    <span>Gut Restore x AL DAS CLINIC |</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Plan_18"
                    name="Plan"
                    value="18"
                    checked={selectedProgram === "gut_al_das_ii"}
                    onChange={() => setSelectedProgram("gut_al_das_ii")}
                  />
                  <label htmlFor="Plan_18" style={{ fontSize: 20 }}>
                    <span>Gut Restore x AL DAS CLINIC ||</span>
                  </label>
                </div>
              </div>

              {/* Menu of week */}
              <h3 className="cart-lil-ty">MENU OF WEEK</h3>
              <div className="diet-options pt-3">
                <input
                  type="radio"
                  id="Current"
                  name="Weeks"
                  value="CurrentWeek"
                  checked={selectedWeek === "current"}
                  onChange={() => setSelectedWeek("current")}
                />
                <label htmlFor="Current">
                  <span>Current Week</span>
                  <span id="CurrentDateRange">
                    {" "}
                    (23/02/2026 - 27/02/2026)
                  </span>
                </label>
                <input
                  type="radio"
                  id="Next"
                  name="Weeks"
                  value="NextWeek"
                  checked={selectedWeek === "next"}
                  onChange={() => setSelectedWeek("next")}
                />
                <label htmlFor="Next">
                  <span>Next Week</span>
                </label>
              </div>

              {/* Calorie range */}
              <h3 className="cart-lil-ty">
                CALORIE RANGE PER MEAL
                <span className="Pspan">
                  {selectedCalorieBand ? ` (${selectedCalorieBand} CAL)` : ""}
                </span>
              </h3>
              <div className="diet-options pt-3">
                {[300, 400, 500, 600, 700].map((cal) => (
                  <div key={cal} className="parentDiv portion">
                    <input
                      type="radio"
                      id={`Cal_${cal}`}
                      name="Calories"
                      checked={selectedCalorieBand === cal}
                      onChange={() => setSelectedCalorieBand(cal as CalorieBand)}
                    />
                    <label htmlFor={`Cal_${cal}`}>
                      <span>{cal} CAL</span>
                    </label>
                  </div>
                ))}
              </div>

              {/* Protein preference */}
              <h3 className="cart-lil-ty">
                PROTEIN PREFERENCE
                <span className="Pspan">
                  {selectedProtein ? ` (${selectedProtein})` : ""}
                </span>
              </h3>
              <div className="diet-options pt-3">
                {(["chicken", "beef", "seafood"] as ProteinPreference[]).map(
                  (protein) => (
                    <div key={protein} className="tag-item">
                      <input
                        type="checkbox"
                        className="tag-checkbox"
                        id={`Tag_${protein}`}
                        checked={selectedProtein === protein}
                        onChange={() =>
                          setSelectedProtein(
                            selectedProtein === protein ? null : protein,
                          )
                        }
                      />
                      <label htmlFor={`Tag_${protein}`}>
                        <span>{protein.toUpperCase()}</span>
                      </label>
                    </div>
                  ),
                )}
              </div>

              {/* Accordion of days / meals */}
              <br />
              <div className="accordion" id="mealAccordion">
                {DAYS.map((day, index) => {
                  const isFirst = index === 0;
                  const isOpen = openDayIndex === index;
                  const collapseId = `collapse_day_${index}`;
                  const headingId = `heading_day_${index}`;
                  return (
                    <div className="accordion-item" key={day.label}>
                      <h2 className="accordion-header" id={headingId}>
                        <button
                          className={`accordion-button ${
                            isOpen ? "" : "collapsed"
                          }`}
                          type="button"
                          onClick={() => handleDayToggle(index)}
                          aria-expanded={isOpen}
                          aria-controls={collapseId}
                        >
                          {day.label} | {day.dateLabel}
                        </button>
                      </h2>
                      <div
                        id={collapseId}
                        className={`accordion-collapse collapse ${
                          isOpen ? "show" : ""
                        }`}
                        aria-labelledby={headingId}
                        data-bs-parent="#mealAccordion"
                      >
                        <div className="accordion-body">
                          <div className="row">
                            {day.meals.map((meal) => (
                              <div className="col-md-3 mb-3" key={meal.type}>
                                <div className="card h-100 shadow-sm border-0 rounded-3">
                                  <div className="card-header bg-light text-center">
                                    <h6
                                      className="mb-0"
                                      style={{
                                        textTransform: "uppercase",
                                        display: "none",
                                      }}
                                    >
                                      {meal.type}
                                    </h6>
                                    <p className="text-muted">{meal.name}</p>
                                  </div>
                                  <div className="card-body">
                                    <h6 className="fw-bold mb-2">
                                      Nutrition Facts
                                    </h6>
                                    <table
                                      className="table table-sm mb-3"
                                      style={{
                                        fontFamily: "PPNeueMontrealMono",
                                      }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <small>Calories</small>
                                          </td>
                                          <td className="text-end">
                                            <small>
                                              {meal.calories.toFixed(1)} kcal
                                            </small>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <small>Protein</small>
                                          </td>
                                          <td className="text-end">
                                            <small>
                                              {meal.protein.toFixed(1)} g
                                            </small>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <small>Carbohydrates</small>
                                          </td>
                                          <td className="text-end">
                                            <small>
                                              {meal.carbs.toFixed(1)} g
                                            </small>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <small>Fat</small>
                                          </td>
                                          <td className="text-end">
                                            <small>
                                              {meal.fat.toFixed(1)} g
                                            </small>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <h6 className="fw-bold mb-2">
                                      Description
                                    </h6>
                                    <div className="small text-muted mb-0">
                                      {meal.description}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

