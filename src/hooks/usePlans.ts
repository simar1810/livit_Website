"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api";
import type { Plan } from "@/types/plan";

const MENU_PLANS_PATH = "menu/plans";

export interface UsePlansResult {
  plans: Plan[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  /** Resolve plan label by id (from fetched plans). */
  getPlanLabel: (id: string) => string | undefined;
}

export function usePlans(): UsePlansResult {
  const { accessToken, isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    if (!isAuthenticated || !accessToken) {
      setPlans([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<Plan[]>(MENU_PLANS_PATH, {
        token: accessToken,
      });
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Could not load plans.");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const getPlanLabel = useCallback(
    (id: string) => plans.find((p) => p._id === id)?.title,
    [plans]
  );

  return { plans, loading, error, refetch: fetchPlans, getPlanLabel };
}
