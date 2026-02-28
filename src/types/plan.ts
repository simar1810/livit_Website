/**
 * Plan from GET /api/v1/menu/plans (backend).
 */

/** Plan pricing: meal type -> duration key (e.g. "1 week") -> price in AED */
export type PlanPricing = Record<string, Record<string, number>>;

export interface Plan {
  _id: string;
  title: string;
  goalType?: string;
  dietType?: string;
  structure?: unknown;
  pricing?: PlanPricing;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlanOption {
  id: string;
  label: string;
}
