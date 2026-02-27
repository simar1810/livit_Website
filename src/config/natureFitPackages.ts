export type NatureFitPackageId =
  | "wellness"
  | "lifestyle"
  | "balance"
  | "monster"
  | "custom_per_day";

export interface NatureFitPackage {
  id: NatureFitPackageId;
  name: string;
  shortName: string;
  mealsDescription: string;
  combo: string;
  kcalRange: string;
  priceAed?: number;
  perDayPriceAed?: number;
}

export const NATURE_FIT_PACKAGES: NatureFitPackage[] = [
  {
    id: "wellness",
    name: "Wellness Package",
    shortName: "WELLNESS PACKAGE",
    mealsDescription: "2 Meals & Snack",
    combo: "Breakfast & Lunch + Snack",
    kcalRange: "800–1000 kcal",
    priceAed: 1724,
  },
  {
    id: "lifestyle",
    name: "Life Style Package",
    shortName: "LIFE STYLE PACKAGE",
    mealsDescription: "2 Meals & Snack",
    combo: "Lunch & Dinner + Snack",
    kcalRange: "1000–1200 kcal",
    priceAed: 2128,
  },
  {
    id: "balance",
    name: "Balance Package",
    shortName: "BALANCE PACKAGE",
    mealsDescription: "3 Meals & Snack",
    combo: "Breakfast & Lunch & Dinner + Snack",
    kcalRange: "1400–1600 kcal",
    priceAed: 2405,
  },
  {
    id: "monster",
    name: "Monster Package",
    shortName: "MONSTER PACKAGE",
    mealsDescription: "4 Meals & Snack",
    combo: "Breakfast & Lunch & Dinner – Extra Meal + Snack",
    kcalRange: "1800–2000 kcal",
    priceAed: 2800,
  },
  {
    id: "custom_per_day",
    name: "Custom Package (per day)",
    shortName: "CUSTOM PACKAGE PER DAY",
    mealsDescription: "2–4 Meals",
    combo: "Mix and match per day",
    kcalRange: "",
    // reference prices per day below
  },
];

export const NATURE_FIT_CUSTOM_PER_DAY_PRICING = {
  twoMeals: 85,
  threeMeals: 105,
  fourMeals: 225,
} as const;

