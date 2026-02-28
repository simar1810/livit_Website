"use client";

import Link from "next/link";

export default function RefundsPage() {
  return (
    <main className="policy-page-wrap">
      <section className="policy-hero">
        <div className="policy-hero-inner">
          <h1 className="policy-title">Refunds &amp; Cancellations</h1>
          <p className="policy-meta">Our refund and cancellation policy</p>
        </div>
      </section>
      <section className="policy-content">
        <div className="policy-container">
          <div className="policy-body">
            <p>
              We want you to be satisfied with your order. Please read below for
              our refund and cancellation policy.
            </p>

            <h2>Cancellations</h2>
            <p>
              A 48-hour notice is required for cancellations or pauses. If you
              need to cancel or pause your upcoming delivery, please contact us
              at least 48 hours before your scheduled delivery date. Cancellations
              or changes requested after the cut-off may not be eligible for a
              refund or credit.
            </p>

            <h2>Refunds</h2>
            <p>
              Refund eligibility depends on the circumstances and timing:
            </p>
            <ul>
              <li>
                <strong>Before delivery:</strong> If you cancel in line with our
                48-hour policy, we will process a refund or credit according to
                our payment provider&apos;s and our internal policy.
              </li>
              <li>
                <strong>After delivery:</strong> If you receive damaged, missing,
                or incorrect items, or if there is a quality issue, please
                contact us within 24–48 hours of delivery with details and, if
                possible, photos. We will review and may offer a partial or full
                refund or replacement.
              </li>
              <li>
                <strong>Subscription or recurring orders:</strong> Pauses and
                cancellations for recurring plans follow the same 48-hour
                notice. Refunds for already-paid periods are handled on a
                case-by-case basis.
              </li>
            </ul>

            <h2>How refunds are processed</h2>
            <p>
              Approved refunds will be credited to the original payment method.
              Processing times depend on your bank or card issuer and may take
              several business days to appear.
            </p>

            <h2>Contact</h2>
            <p>
              For refund or cancellation requests, contact us at info@livit.ae
              with your order details and reason for the request.
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
