/**
 * Cart/checkout helpers: pricing and deriving OrderSummary from CartState.
 */
import type { CartState, OrderSummary } from "@/types/cart";
import {
  PROGRAMS,
  PROTEINS,
  MEAL_TYPES,
  DAYS_PER_WEEK,
  WEEKS_OF_FOOD,
} from "@/config/cartOptions";

const VAT_RATE = 0.05;

/** Placeholder pricing (UI only; replace with backend later). */
export function calculatePrice(params: {
  calories: number;
  mealsPerDay: number;
  daysPerWeek: number;
  weeks: number;
}) {
  const basePerMeal = 30; // AED
  const calorieFactor = params.calories / 400;
  const perMeal = basePerMeal * calorieFactor;
  const totalMeals =
    params.mealsPerDay * params.daysPerWeek * params.weeks;
  return perMeal * totalMeals;
}

/** Build order summary from cart state for checkout. */
export function buildOrderSummaryFromCartState(
  state: CartState,
  overrides: Partial<OrderSummary> = {}
): OrderSummary {
  const program = PROGRAMS.find((p) => p.id === state.programId);
  const programName = program?.label ?? "Signature Program";
  const dietaryPreference = state.selectedProteins
    .map((k) => PROTEINS.find((p) => p.key === k)?.label ?? k)
    .join(", ")
    .toUpperCase();
  const mealsPerDay = state.selectedMeals
    .map((k) => MEAL_TYPES.find((m) => m.key === k)?.label ?? k)
    .join(", ")
    .toUpperCase();
  const caloriePerMeal = state.selectedCalories.calories;
  const mealsPerDayCount = state.selectedMeals.length || 1;
  const caloriePerDay = caloriePerMeal * mealsPerDayCount;
  const programLength = state.weekCount.label;
  const daysOfFood =
    state.daysPerWeek.days * state.weekCount.weeks;
  const weeksOfFood = state.weekCount.weeks;
  const startDate = state.startDate || "—";
  const subTotal = calculatePrice({
    calories: state.selectedCalories.calories,
    mealsPerDay: mealsPerDayCount,
    daysPerWeek: state.daysPerWeek.days,
    weeks: state.weekCount.weeks,
  });
  const vat = subTotal * VAT_RATE;
  const deliveryCharge = 0;
  const promoAmt = overrides.promoAmt ?? 0;
  const deliveryTimeSlot = overrides.deliveryTimeSlot ?? "";

  return {
    programName,
    dietaryPreference,
    mealsPerDay,
    caloriePerMeal,
    caloriePerDay,
    programLength,
    daysOfFood,
    weeksOfFood,
    startDate,
    deliveryTimeSlot,
    subTotal,
    vat,
    deliveryCharge,
    promoAmt,
    ...overrides,
  };
}
