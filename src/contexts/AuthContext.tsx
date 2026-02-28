"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { apiClient, ApiError, setApiAuthHandler } from "@/lib/api";
import {
  getStoredAccessToken,
  getStoredRefreshToken,
  setStoredAccessToken,
  setStoredRefreshToken,
  clearStoredTokens,
} from "@/lib/authStorage";

/** Current user from GET /api/v1/user/profile */
export interface User {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  gender?: string;
  dob?: string;
  heightCm?: number;
  weightKg?: number;
  targetWeightKg?: number;
  goal?: string;
  activityLevel?: string;
  dietPreference?: string;
  allergies?: string[];
  conditions?: string[];
}

export interface AuthState {
  /** Resolved tenant ID (from env or tenant/list). Null until resolved. */
  tenantId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  /** Current user when authenticated. Set after profile fetch or login/register. */
  user: User | null;
  /** True once tenantId has been resolved (env or fetch). */
  tenantReady: boolean;
  /** True once we've attempted to restore session from stored refresh token. */
  sessionRestored: boolean;
}

export interface AuthContextValue extends AuthState {
  setTokens: (accessToken: string, refreshToken: string) => void;
  /** Set user from OTP verify/login response (avoids extra profile fetch). */
  setUser: (user: User | null) => void;
  clearTokens: () => void;
  /** Call refresh endpoint; updates stored tokens. Returns new accessToken on success, null on failure (tokens cleared). */
  refreshAuth: () => Promise<string | null>;
  /** Fetch profile with current (or given) access token. On 401, tries refresh once then retries. Sets user in context. Returns user or null. */
  fetchProfile: (accessTokenOverride?: string) => Promise<User | null>;
  /** True when user is set (authenticated). */
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TENANT_LIST_PATH = "tenant/list";
const AUTH_REFRESH_PATH = "auth/refresh";
const USER_PROFILE_PATH = "user/profile";

function getTenantIdFromEnv(): string | null {
  const id = process.env.NEXT_PUBLIC_TENANT_ID?.trim();
  return id || null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [tenantReady, setTenantReady] = useState(false);
  const [sessionRestored, setSessionRestored] = useState(false);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const sessionRestoreAttempted = useRef(false);

  const setTokens = useCallback((access: string, refresh: string) => {
    setAccessTokenState(access);
    setRefreshTokenState(refresh);
    setStoredAccessToken(access);
    setStoredRefreshToken(refresh);
  }, []);

  const clearTokens = useCallback(() => {
    setAccessTokenState(null);
    setRefreshTokenState(null);
    setUser(null);
    clearStoredTokens();
  }, []);

  const refreshAuth = useCallback(async (): Promise<string | null> => {
    const token = getStoredRefreshToken();
    if (!token) {
      clearTokens();
      return null;
    }
    try {
      const res = await apiClient.post<{
        accessToken: string;
        refreshToken: string;
      }>(AUTH_REFRESH_PATH, { refreshToken: token });
      if (res.data?.accessToken && res.data?.refreshToken) {
        setTokens(res.data.accessToken, res.data.refreshToken);
        return res.data.accessToken;
      }
      clearTokens();
      return null;
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 401) {
        clearTokens();
      }
      return null;
    }
  }, [clearTokens, setTokens]);

  const fetchProfile = useCallback(
    async (accessTokenOverride?: string): Promise<User | null> => {
      const token = accessTokenOverride ?? getStoredAccessToken();
      if (!token) return null;

      const tryFetch = async (t: string) => {
        const res = await apiClient.get<User>(USER_PROFILE_PATH, { token: t });
        return res.data;
      };

      try {
        const profile = await tryFetch(token);
        if (profile) {
          setUser(profile);
          return profile;
        }
        return null;
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 401) {
          const newAccess = await refreshAuth();
          if (newAccess) {
            try {
              const profile = await tryFetch(newAccess);
              if (profile) {
                setUser(profile);
                return profile;
              }
            } catch {
              // ignore
            }
          }
          clearTokens();
        }
        return null;
      }
    },
    [refreshAuth, clearTokens]
  );

  // Resolve tenant ID: env first, else fetch tenant list
  useEffect(() => {
    const fromEnv = getTenantIdFromEnv();
    if (fromEnv) {
      setTenantId(fromEnv);
      setTenantReady(true);
      return;
    }
    let cancelled = false;
    apiClient
      .get<{ _id: string; name?: string; brand?: string; status?: string }[]>(
        TENANT_LIST_PATH
      )
      .then((res) => {
        if (cancelled || !res.data?.length) {
          if (!cancelled) setTenantReady(true);
          return;
        }
        const first = res.data[0];
        if (first?._id) {
          setTenantId(first._id);
        }
        setTenantReady(true);
      })
      .catch(() => {
        if (!cancelled) setTenantReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Hydrate tokens from storage on mount (client-only)
  useEffect(() => {
    const storedRefresh = getStoredRefreshToken();
    const storedAccess = getStoredAccessToken();
    if (storedRefresh) setRefreshTokenState(storedRefresh);
    if (storedAccess) setAccessTokenState(storedAccess);
  }, []);

  // Restore session on load: if we have a stored refresh token, refresh then fetch profile
  useEffect(() => {
    if (!refreshToken || sessionRestoreAttempted.current) return;
    sessionRestoreAttempted.current = true;
    refreshAuth()
      .then((newAccess) => {
        if (newAccess) return fetchProfile(newAccess);
      })
      .finally(() => setSessionRestored(true));
  }, [refreshToken, refreshAuth, fetchProfile]);

  // Wire 401 handling: API client will refresh and retry once; on failure clear tokens and redirect (Step 11.3)
  useEffect(() => {
    setApiAuthHandler({
      getToken: getStoredAccessToken,
      refreshAuth,
      clearTokens,
      onSessionExpired: () => {
        if (typeof window !== "undefined") {
          window.location.href = "/Home/Registration";
        }
      },
    });
    return () => setApiAuthHandler(null);
  }, [refreshAuth, clearTokens]);

  const value: AuthContextValue = {
    tenantId,
    accessToken,
    refreshToken,
    user,
    tenantReady,
    sessionRestored,
    setTokens,
    setUser,
    clearTokens,
    refreshAuth,
    fetchProfile,
    isAuthenticated: user != null,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
