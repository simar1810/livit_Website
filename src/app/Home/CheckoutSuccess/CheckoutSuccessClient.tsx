"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient, ApiError } from "@/lib/api";

interface SessionData {
  id?: string;
  payment_status?: string;
  status?: string;
  metadata?: { orderId?: string };
  amount_total?: number;
  currency?: string;
}

interface CheckoutSuccessClientProps {
  sessionId: string | null;
}

export default function CheckoutSuccessClient({ sessionId }: CheckoutSuccessClientProps) {
  const [loading, setLoading] = useState<boolean>(!!sessionId);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No session ID.");
      return;
    }
    let cancelled = false;
    apiClient
      .get<SessionData>(`checkout/session/${encodeURIComponent(sessionId)}`)
      .then((res) => {
        if (!cancelled && res.data) setSession(res.data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Could not load order details.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const orderId = session?.metadata?.orderId ?? session?.id;
  const paid = session?.payment_status === "paid" || session?.status === "complete";

  return (
    <main className="checkout-result-page">
      <div className="checkout-result-card">
        <div className="checkout-result-icon checkout-result-icon--success">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="24" fill="#145a32" />
            <path d="M14 25l7 7 13-13" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="checkout-result-title">Thank you for your order!</h1>

        {loading && (
          <p className="checkout-result-subtitle">Confirming your payment…</p>
        )}

        {error && (
          <div className="checkout-result-alert checkout-result-alert--warn">
            <p>{error}</p>
            <p className="checkout-result-alert-sub">
              If you completed payment, your order may still have been received.
              Please check your email or contact support.
            </p>
          </div>
        )}

        {!loading && !error && session && (
          <div className="checkout-result-details">
            <div className="checkout-result-row">
              <span className="checkout-result-label">Status</span>
              <span className={`checkout-result-value ${paid ? "checkout-result-value--success" : ""}`}>
                {paid ? "Payment confirmed" : (session.payment_status ?? session.status ?? "Pending")}
              </span>
            </div>
            {orderId && (
              <div className="checkout-result-row">
                <span className="checkout-result-label">Order ID</span>
                <span className="checkout-result-value checkout-result-value--mono">{orderId}</span>
              </div>
            )}
            {session.amount_total != null && (
              <div className="checkout-result-row">
                <span className="checkout-result-label">Amount paid</span>
                <span className="checkout-result-value">
                  {(session.amount_total / 100).toFixed(2)} {session.currency?.toUpperCase() ?? "AED"}
                </span>
              </div>
            )}
          </div>
        )}

        {!loading && (
          <>
            <p className="checkout-result-subtitle">
              {paid
                ? "Your meal plan is being prepared. We'll send a confirmation to your email shortly."
                : "We're processing your order. You'll receive an email once it's confirmed."}
            </p>
            <div className="checkout-result-actions">
              <Link href="/" className="primary-btn">
                Back to home
              </Link>
              <Link href="/Home/Cart" className="checkout-result-link">
                Start a new plan
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
