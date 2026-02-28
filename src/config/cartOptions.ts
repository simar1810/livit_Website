/**
 * Shared option lists for Cart and Checkout. Re-export types from types/cart
 * for convenience; option shapes stay in sync with CartState.
 * Program options come from API (usePlans) or fallback when guest.
 */
import type {
  ProteinKey,
  MealTypeKey,
  CalorieOption,
  DaysPerWeekOption,
  WeekCountOption,
  CustomizationOption,
  ProgramOption,
} from "@/types/cart";

export type { ProteinKey, MealTypeKey };

/** Default plan _id for guest checkout when no API plans. Set NEXT_PUBLIC_DEFAULT_TEMPLATE_ID in .env.local. */
export function getDefaultTemplateId(): string {
  return (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DEFAULT_TEMPLATE_ID) || "";
}

/** Fallback program list when not authenticated (guest). Always one option so guests can proceed; use NEXT_PUBLIC_DEFAULT_TEMPLATE_ID for real checkout. */
export function getFallbackPrograms(): ProgramOption[] {
  const id = getDefaultTemplateId() || "default";
  return [{ id, label: "Signature Program" }];
}

/** Resolve program label by id from fallback only. Use usePlans().getPlanLabel when authenticated. */
export function getFallbackProgramLabel(id: string): string {
  const list = getFallbackPrograms();
  return list.find((p) => p.id === id)?.label ?? "";
}

export const PROTEINS: { key: ProteinKey; label: string }[] = [
  { key: "chicken", label: "Chicken" },
  { key: "beef", label: "Beef" },
  { key: "seafood", label: "Seafood" },
  { key: "vegetarian", label: "Vegetarian" },
];

export const CALORIES: CalorieOption[] = [
  { id: 300, label: "300 KCAL", calories: 300 },
  { id: 400, label: "400 KCAL", calories: 400 },
  { id: 500, label: "500 KCAL", calories: 500 },
  { id: 600, label: "600 KCAL", calories: 600 },
  { id: 700, label: "700 KCAL", calories: 700 },
];

export const MEAL_TYPES: { key: MealTypeKey; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "snack", label: "Snack" },
];

export const DAYS_PER_WEEK: DaysPerWeekOption[] = [
  { id: 5, label: "5 DAYS", days: 5 },
  { id: 6, label: "6 DAYS", days: 6 },
  { id: 7, label: "7 DAYS", days: 7 },
];

export const WEEKS_OF_FOOD: WeekCountOption[] = [
  { id: 1, label: "1 WEEK", weeks: 1 },
  { id: 2, label: "2 WEEKS", weeks: 2 },
  { id: 3, label: "3 WEEKS", weeks: 3 },
  { id: 4, label: "4 WEEKS", weeks: 4 },
];

export const WEEKDAYS = [
  { key: "mon", label: "MON" },
  { key: "tue", label: "TUE" },
  { key: "wed", label: "WED" },
  { key: "thu", label: "THU" },
  { key: "fri", label: "FRI" },
] as const;

export const CUSTOMIZATIONS: CustomizationOption[] = [
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
