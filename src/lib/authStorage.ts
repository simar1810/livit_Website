/**
 * Storage keys and helpers for auth tokens (backend: Bearer JWT, no cookies).
 * Refresh token in localStorage; access token in sessionStorage (optional, for same-tab refresh).
 */

export const AUTH_STORAGE_KEYS = {
  REFRESH_TOKEN: "livit_refresh_token",
  ACCESS_TOKEN: "livit_access_token",
} as const;

function getStorage(key: string, store: "local" | "session"): string | null {
  if (typeof window === "undefined") return null;
  const storage = store === "local" ? localStorage : sessionStorage;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function setStorage(
  key: string,
  value: string,
  store: "local" | "session"
): void {
  if (typeof window === "undefined") return;
  const storage = store === "local" ? localStorage : sessionStorage;
  try {
    storage.setItem(key, value);
  } catch {
    // ignore
  }
}

function removeStorage(key: string, store: "local" | "session"): void {
  if (typeof window === "undefined") return;
  const storage = store === "local" ? localStorage : sessionStorage;
  try {
    storage.removeItem(key);
  } catch {
    // ignore
  }
}

export function getStoredRefreshToken(): string | null {
  return getStorage(AUTH_STORAGE_KEYS.REFRESH_TOKEN, "local");
}

export function getStoredAccessToken(): string | null {
  return getStorage(AUTH_STORAGE_KEYS.ACCESS_TOKEN, "session");
}

export function setStoredRefreshToken(value: string): void {
  setStorage(AUTH_STORAGE_KEYS.REFRESH_TOKEN, value, "local");
}

export function setStoredAccessToken(value: string): void {
  setStorage(AUTH_STORAGE_KEYS.ACCESS_TOKEN, value, "session");
}

export function clearStoredTokens(): void {
  removeStorage(AUTH_STORAGE_KEYS.REFRESH_TOKEN, "local");
  removeStorage(AUTH_STORAGE_KEYS.ACCESS_TOKEN, "session");
}
