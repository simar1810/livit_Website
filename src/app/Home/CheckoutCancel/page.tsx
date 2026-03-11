"use client";

import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="checkout-result-page">
      <div className="checkout-result-card">
        <div className="checkout-result-icon checkout-result-icon--cancel">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="24" fill="#dc3545" />
            <path d="M16 16l16 16M32 16L16 32" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="checkout-result-title">Payment cancelled</h1>
        <p className="checkout-result-subtitle">
          Your payment was not completed. No charges have been made.
          You can return to checkout or keep browsing.
        </p>

        <div className="checkout-result-actions">
          <Link href="/Home/CheckOut" className="primary-btn">
            Back to checkout
          </Link>
          <Link href="/Home/Cart" className="checkout-result-link">
            Edit your plan
          </Link>
          <Link href="/" className="checkout-result-link">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
