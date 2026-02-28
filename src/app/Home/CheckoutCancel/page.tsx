"use client";

import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="container-fluid py-5">
      <section className="row justify-content-center">
        <div className="col-md-8 col-lg-6 text-center">
          <h1 className="mb-3">Payment canceled</h1>
          <p className="text-muted mb-4">
            Your payment was not completed. You can return to checkout or continue shopping.
          </p>
          <div>
            <Link href="/Home/CheckOut" className="btn btn-primary me-2">
              Back to checkout
            </Link>
            <Link href="/Home/Cart" className="btn btn-outline-secondary me-2">
              View cart
            </Link>
            <Link href="/" className="btn btn-outline-secondary">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
