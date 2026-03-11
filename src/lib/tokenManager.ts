/**
 * Silent token management for guest and registered users.
 * Uses POST /api/v1/user/token-generate.
 */

import { getApiBaseUrl, getTenantId } from "./apiBase";

const ACCESS_KEY = "nutrichef_access_token";
const REFRESH_KEY = "nutrichef_refresh_token";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    tenantId: string;
    phone: string;
    countryCode: string;
    name: string;
    email: string | null;
    type: string;
    lastLoginAt: string;
  };
}

interface TokenEnvelope {
  status_code: number;
  message: string;
  data: TokenResponse | null;
}

function storeTokens(access: string, refresh: string) {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

let pendingGuestRequest: Promise<string> | null = null;

/**
 * Returns a valid access token. If none is stored, silently generates
 * a guest token from the backend.
 */
export async function ensureToken(): Promise<string> {
  const existing = getStoredToken();
  if (existing) return existing;

  if (pendingGuestRequest) return pendingGuestRequest;

  pendingGuestRequest = requestGuestToken().finally(() => {
    pendingGuestRequest = null;
  });
  return pendingGuestRequest;
}

async function requestGuestToken(): Promise<string> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/v1/user/token-generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Tenant-Id": getTenantId(),
    },
    body: JSON.stringify({ userType: "guest" }),
  });

  const json: TokenEnvelope = await res.json();
  if (!res.ok || !json.data?.accessToken) {
    throw new Error(json.message || "Failed to generate guest token");
  }

  storeTokens(json.data.accessToken, json.data.refreshToken);
  return json.data.accessToken;
}

export interface RegisteredUserDetails {
  name: string;
  phone: string;
  countryCode: string;
  email?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
    label?: string;
  };
}

/**
 * Upgrades the session from guest to a registered user.
 * Replaces the stored tokens with ones tied to a real user profile.
 */
export async function upgradeToRegistered(
  details: RegisteredUserDetails
): Promise<TokenResponse> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/v1/user/token-generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Tenant-Id": getTenantId(),
    },
    body: JSON.stringify({ userType: "registered", ...details }),
  });

  const json: TokenEnvelope = await res.json();
  if (!res.ok || !json.data?.accessToken) {
    throw new Error(json.message || "Failed to register user");
  }

  storeTokens(json.data.accessToken, json.data.refreshToken);
  return json.data;
}
