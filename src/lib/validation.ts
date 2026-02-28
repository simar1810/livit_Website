/**
 * Centralized validation and API error field mapping (Step 11).
 * Mirror backend rules to avoid unnecessary round-trips.
 */
import { ApiError } from "@/lib/api";
import type { ApiFieldError } from "@/lib/api";

/** Backend path like "body.email" → display "Email", or "body.phone" → "Phone" */
export function pathToFieldName(path: string | undefined): string {
  if (!path) return "Field";
  const parts = path.split(".");
  const last = parts[parts.length - 1];
  if (!last) return "Field";
  const key = last.replace(/([A-Z])/g, " $1").trim();
  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Extract field-level errors from ApiError for showing under inputs.
 * Returns a map of field key (e.g. "email", "phone") to message.
 */
export function getFieldErrorsFromApiError(
  err: unknown
): Record<string, string> {
  if (!(err instanceof ApiError)) return {};
  const data = err.data;
  if (!Array.isArray(data)) return {};
  const map: Record<string, string> = {};
  for (const item of data as ApiFieldError[]) {
    const path = item.path ?? "";
    const key = path.split(".").pop() ?? "field";
    const message = item.message ?? err.message;
    map[key] = message;
  }
  return map;
}

/**
 * Get a single field error message by key (e.g. "email", "otp").
 */
export function getFieldError(
  err: unknown,
  fieldKey: string
): string | undefined {
  return getFieldErrorsFromApiError(err)[fieldKey];
}

/** Email format (backend-compatible). */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** OTP: min 4 digits (backend accepts 4+). */
export function isValidOtp(value: string): boolean {
  return /^\d{4,}$/.test(value.trim());
}

/** Required non-empty string. */
export function required(value: string, label = "This field"): string | null {
  if (value.trim() === "") return `${label} is required.`;
  return null;
}

/** Phone: min 8 digits. */
export function isValidPhone(value: string): boolean {
  return /^\d{8,}$/.test(value.replace(/\D/g, ""));
}

/** Name: non-empty, reasonable length. */
export function isValidName(value: string): boolean {
  const t = value.trim();
  return t.length >= 1 && t.length <= 200;
}
