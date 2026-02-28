"use client";

import Link from "next/link";

export default function ShippingPage() {
  return (
    <main className="policy-page-wrap">
      <section className="policy-hero">
        <div className="policy-hero-inner">
          <h1 className="policy-title">Shipping &amp; Delivery</h1>
          <p className="policy-meta">How we get your meals to you</p>
        </div>
      </section>
      <section className="policy-content">
        <div className="policy-container">
          <div className="policy-body">
            <p>
              We deliver fresh, prepared meals to your door. Below is an overview
              of our shipping and delivery process.
            </p>

            <h2>Delivery areas</h2>
            <p>
              We currently deliver within selected areas in the UAE (e.g. Dubai,
              and other emirates as listed on our site). At checkout you can
              confirm whether your address is within our delivery zone.
            </p>

            <h2>Delivery time slots</h2>
            <p>
              You will choose a delivery time slot when placing your order (e.g.
              morning or afternoon windows). We will do our best to deliver
              within your selected slot. Delays may occur due to traffic or
              unforeseen circumstances; we will communicate any significant
              delay when possible.
            </p>

            <h2>Order cut-off</h2>
            <p>
              Orders typically close on Friday 12:00 PM for delivery the following
              week (e.g. Monday). Check the Cart or checkout page for the exact
              cut-off for your area and delivery date.
            </p>

            <h2>Packaging</h2>
            <p>
              Meals are packed in insulated packaging to maintain temperature and
              quality during delivery. Please refrigerate promptly upon receipt
              and follow any use-by or storage instructions on the packaging.
            </p>

            <h2>Failed or missed delivery</h2>
            <p>
              If you are not available to receive the delivery, we may leave the
              package in a safe place if appropriate, or attempt redelivery
              according to our carrier&apos;s policy. Unclaimed deliveries may
              be subject to restocking or disposal. Contact us as soon as
              possible if you miss a delivery so we can assist.
            </p>

            <h2>Contact</h2>
            <p>
              For shipping or delivery questions, contact us at info@livit.ae.
            </p>

            <p className="policy-back">
              <Link href="/" className="policy-back-link">← Back to home</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
