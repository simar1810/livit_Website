"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api";

/** Stripe Checkout Session shape (subset we use). */
interface SessionData {
  id?: string;
  payment_status?: string;
  status?: string;
  metadata?: { orderId?: string };
  amount_total?: number;
  currency?: string;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(!!sessionId);
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
    <main className="container-fluid py-5">
      <section className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="mb-4">Thank you for your order</h1>

          {loading && (
            <p className="text-muted">Confirming your payment…</p>
          )}

          {error && (
            <div className="alert alert-warning" role="alert">
              <p className="mb-0">{error}</p>
              <p className="mb-0 mt-2 small">
                If you completed payment, your order may still have been received. Please check your email or contact support with your session or order details.
              </p>
            </div>
          )}

          {!loading && !error && session && (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <p className="mb-2">
                  <strong>Payment status:</strong>{" "}
                  <span className={paid ? "text-success" : "text-muted"}>
                    {session.payment_status ?? session.status ?? "—"}
                  </span>
                </p>
                {orderId && (
                  <p className="mb-2">
                    <strong>Order ID:</strong> <code>{orderId}</code>
                  </p>
                )}
                {session.amount_total != null && (
                  <p className="mb-0">
                    <strong>Amount:</strong>{" "}
                    {(session.amount_total / 100).toFixed(2)}{" "}
                    {session.currency?.toUpperCase() ?? "AED"}
                  </p>
                )}
              </div>
            </div>
          )}

          {!loading && (
            <div className="mt-4">
              <Link href="/" className="btn btn-primary me-2">
                Back to home
              </Link>
              <Link href="/Home/Cart" className="btn btn-outline-secondary">
                View cart
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
