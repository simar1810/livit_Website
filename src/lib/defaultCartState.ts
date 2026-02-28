import type { CartState } from "@/types/cart";
import { CALORIES, DAYS_PER_WEEK, WEEKS_OF_FOOD, getDefaultTemplateId } from "@/config/cartOptions";

export const defaultCartState: CartState = {
  programId: getDefaultTemplateId(),
  selectedProteins: ["chicken"],
  selectedCalories: CALORIES[1], // 400 KCAL
  selectedMeals: ["breakfast", "lunch", "dinner", "snack"],
  daysPerWeek: DAYS_PER_WEEK[0],
  weekCount: WEEKS_OF_FOOD[0],
  weekdays: ["mon", "tue", "wed"],
  startDate: "",
  customization: "standard",
  additionalInfo: "",
};
