/**
 * Shared cart/checkout types. Used by Cart and Checkout pages so state can be
 * passed or synced (e.g. via context or URL later).
 */

export type ProteinKey = "chicken" | "beef" | "seafood" | "vegetarian";
export type MealTypeKey = "breakfast" | "lunch" | "dinner" | "snack";

export interface ProgramOption {
  id: number;
  label: string;
}

export interface CalorieOption {
  id: number;
  label: string;
  calories: number;
}

export interface DaysPerWeekOption {
  id: number;
  label: string;
  days: number;
}

export interface WeekCountOption {
  id: number;
  label: string;
  weeks: number;
}

export interface CustomizationOption {
  id: string;
  label: string;
  description?: string;
}

/** Normalized cart selections (Cart page state). */
export interface CartState {
  programId: number;
  selectedProteins: ProteinKey[];
  selectedCalories: CalorieOption;
  selectedMeals: MealTypeKey[];
  daysPerWeek: DaysPerWeekOption;
  weekCount: WeekCountOption;
  weekdays: string[];
  startDate: string;
  customization: string;
  additionalInfo: string;
}

/** Order summary shown on Checkout (can be derived from CartState or from API). */
export interface OrderSummary {
  programName: string;
  dietaryPreference: string;
  mealsPerDay: string;
  caloriePerMeal: number;
  caloriePerDay: number;
  programLength: string;
  daysOfFood: number;
  weeksOfFood: number;
  startDate: string;
  deliveryTimeSlot: string;
  subTotal: number;
  vat: number;
  deliveryCharge: number;
  promoAmt: number;
}
