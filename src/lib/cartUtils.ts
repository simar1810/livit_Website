/**
 * Cart/checkout helpers: pricing and deriving OrderSummary from CartState.
 * Single source for payable amount in AED and fils (Step 8).
 */
import type { CartState, OrderSummary } from "@/types/cart";
import type { Plan } from "@/types/plan";
import {
  getFallbackProgramLabel,
  PROTEINS,
  MEAL_TYPES,
  DAYS_PER_WEEK,
  WEEKS_OF_FOOD,
} from "@/config/cartOptions";

const VAT_RATE = 0.05;
const DELIVERY_CHARGE_AED = 0;

/** Placeholder pricing when plan has no usable pricing (client-side formula). */
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

/**
 * Compute subtotal from plan.pricing when available.
 * Expects pricing: { [mealType]: { [duration]: priceAed } }, e.g. breakfast["1 week"] = 100.
 * Returns null if pricing is missing or not applicable.
 */
export function computeSubTotalFromPlanPricing(
  plan: Plan | null | undefined,
  state: CartState
): number | null {
  const pricing = plan?.pricing;
  if (!pricing || typeof pricing !== "object") return null;

  const mealsPerDayCount = state.selectedMeals.length || 1;
  const weeks = state.weekCount.weeks;
  const durationKey =
    weeks === 1 ? "1 week" : `${weeks} weeks`;

  let total = 0;
  for (const mealKey of state.selectedMeals) {
    const mealPricing = pricing[mealKey];
    if (mealPricing && typeof mealPricing === "object") {
      const price =
        (mealPricing as Record<string, number>)[durationKey] ??
        (mealPricing as Record<string, number>)[String(weeks)];
      if (typeof price === "number" && price > 0) {
        total += price;
      }
    }
  }
  if (total <= 0) return null;
  return total;
}

/**
 * Single source for payable amount. Use for checkout session (totalFils) and display (totalAed).
 */
export function getPayableFromSummary(summary: OrderSummary): {
  totalAed: number;
  totalFils: number;
} {
  const totalAed =
    summary.subTotal +
    summary.vat +
    summary.deliveryCharge -
    summary.promoAmt;
  const totalFils = Math.round(totalAed * 100);
  return { totalAed, totalFils };
}

/** Build order summary from cart state for checkout. Pass programName and optional plan (for pricing) in overrides. */
export function buildOrderSummaryFromCartState(
  state: CartState,
  overrides: Partial<OrderSummary> & { plan?: Plan | null } = {}
): OrderSummary {
  const programName =
    overrides.programName ??
    getFallbackProgramLabel(state.programId) ??
    "Program";
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

  const subTotalFromPlan = computeSubTotalFromPlanPricing(overrides.plan ?? null, state);
  const subTotal =
    subTotalFromPlan ??
    calculatePrice({
      calories: state.selectedCalories.calories,
      mealsPerDay: mealsPerDayCount,
      daysPerWeek: state.daysPerWeek.days,
      weeks: state.weekCount.weeks,
    });

  const vat = subTotal * VAT_RATE;
  const deliveryCharge = DELIVERY_CHARGE_AED;
  const promoAmt = overrides.promoAmt ?? 0;
  const deliveryTimeSlot = overrides.deliveryTimeSlot ?? "";

  const { plan: _omitPlan, ...restOverrides } = overrides;
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
    ...restOverrides,
  };
}
