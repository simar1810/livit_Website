"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePlans } from "@/hooks/usePlans";
import { useMenuList } from "@/hooks/useMenuList";
import { getFallbackPrograms } from "@/config/cartOptions";

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
  const { plans, loading: plansLoading } = usePlans();
  const fallbackPrograms = getFallbackPrograms();
  const programOptions = plans.length > 0
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
    if (!selectedPlanId || !programOptions.some((p) => p.id === selectedPlanId)) {
      setSelectedPlanId(programOptions[0].id);
    }
  }, [programOptions, selectedPlanId]);

  return (
    <main>
      <section className="cart-img">
        <div className="row g-4 align-items-start">
          <div className="col-lg-12 p-2">
            <div className="cart-rad p-4">
              <h3 className="cart-lil-ty">PROGRAM</h3>

              {/* Program selection – from API or fallback */}
              <div className="diet-options pt-3">
                {plansLoading && programOptions.length === 0 && (
                  <p className="text-muted">Loading plans…</p>
                )}
                {!plansLoading && programOptions.length === 0 && (
                  <p className="text-muted">Sign in to see available programs.</p>
                )}
                {programOptions.map((p) => (
                  <div key={p.id}>
                    <input
                      type="radio"
                      id={`Plan_${p.id}`}
                      name="Plan"
                      value={p.id}
                      checked={selectedPlanId === p.id}
                      onChange={() => setSelectedPlanId(p.id)}
                    />
                    <label htmlFor={`Plan_${p.id}`} style={{ fontSize: 20 }}>
                      <span>{p.label}</span>
                    </label>
                  </div>
                ))}
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

              {/* Weekly menu – from API when available, else placeholder */}
              <h3 className="cart-lil-ty mt-4">WEEKLY MENU</h3>
              {menuLoading && selectedPlanId && selectedPlanId !== "default" && (
                <p className="text-muted">Loading menu…</p>
              )}
              {menuData?.templates && Array.isArray(menuData.templates) && menuData.templates.length > 0 && (
                <div className="row g-3 mt-2">
                  {(menuData.templates as { title?: string; name?: string }[]).slice(0, 7).map((item, i) => (
                    <div className="col-12 col-md-6" key={i}>
                      <div className="card border-0 shadow-sm rounded-3 p-3">
                        <p className="mb-0 fw-medium">{item.title ?? item.name ?? `Day ${i + 1}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!menuLoading && (!menuData?.templates?.length || (selectedPlanId === "default" || !selectedPlanId)) && (
                <div className="border rounded-3 p-4 mt-2 bg-light bg-opacity-50">
                  <p className="mb-2">
                    Your plan’s weekly menu is based on your selections. Customize program, calories, and protein in the Cart, then place your order to get started.
                  </p>
                  <Link href="/Home/Cart" className="btn btn-primary rounded-pill px-4">
                    Go to Cart
                  </Link>
                </div>
              )}
              {!menuLoading && menuData?.templates && Array.isArray(menuData.templates) && menuData.templates.length === 0 && selectedPlanId && selectedPlanId !== "default" && (
                <div className="border rounded-3 p-4 mt-2 bg-light bg-opacity-50">
                  <p className="mb-2">No menu items for this plan yet. Add your choices in the Cart and checkout.</p>
                  <Link href="/Home/Cart" className="btn btn-primary rounded-pill px-4">
                    Go to Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

