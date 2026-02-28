"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api";

const MENU_LIST_PATH = "menu/list";

/** Backend menu list response (recipes/templates). */
export interface MenuListData {
  recipes?: unknown[];
  templates?: unknown[];
}

export interface UseMenuListResult {
  data: MenuListData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMenuList(planId?: string): UseMenuListResult {
  const { accessToken, isAuthenticated } = useAuth();
  const [data, setData] = useState<MenuListData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    if (!isAuthenticated || !accessToken) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<MenuListData>(MENU_LIST_PATH, {
        token: accessToken,
      });
      setData(res.data ?? null);
    } catch {
      setError("Could not load menu.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    if (planId && planId !== "default") fetchList();
    else setData(null);
  }, [planId, fetchList]);

  return { data, loading, error, refetch: fetchList };
}
