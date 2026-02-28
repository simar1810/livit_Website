"use client";

import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="policy-page-wrap">
      <section className="policy-hero">
        <div className="policy-hero-inner">
          <h1 className="policy-title">Terms of Service</h1>
          <p className="policy-meta">Last updated: February 2026</p>
        </div>
      </section>
      <section className="policy-content">
        <div className="policy-container">
          <div className="policy-body">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of our website,
              meal plans, and related services (collectively, the
              &quot;Services&quot;) operated by LIVIT / Nature Fit. By accessing
              or using our Services, you agree to be bound by these Terms.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By creating an account, placing an order, or using our website or
              delivery services, you confirm that you have read, understood, and
              agree to these Terms and our Privacy Policy. If you do not agree,
              please do not use our Services.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old and able to enter into a binding
              contract to use our Services. By using our Services, you represent
              that you meet these requirements.
            </p>

            <h2>3. Account and Registration</h2>
            <p>
              You may need to register and provide accurate, current information
              to access certain features. You are responsible for maintaining the
              confidentiality of your account credentials and for all activity
              under your account. Notify us immediately of any unauthorized use.
            </p>

            <h2>4. Orders and Payment</h2>
            <p>
              Orders are subject to availability and acceptance. We reserve the
              right to refuse or cancel orders. Payment is processed securely
              through our payment provider (e.g. Stripe). Prices are in the
              currency displayed (e.g. AED) and may be subject to applicable
              taxes. See our Refunds and Shipping pages for more details.
            </p>

            <h2>5. Use of Services</h2>
            <p>
              You agree to use our Services only for lawful purposes. You may
              not misuse the site, attempt to gain unauthorized access to our
              systems or other accounts, or use the Services in any way that
              could harm us or other users.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content on our website and in our meal plans—including text,
              images, logos, and recipes—is owned by us or our licensors and is
              protected by copyright and other intellectual property laws. You
              may not copy, modify, or distribute our content without written
              permission.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we are not liable for any
              indirect, incidental, special, or consequential damages arising
              from your use of our Services. Our total liability for any claim
              shall not exceed the amount you paid for the relevant order.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will post the
              revised Terms on this page and update the &quot;Last updated&quot;
              date. Continued use of the Services after changes constitutes
              acceptance of the new Terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              For questions about these Terms of Service, contact us at
              info@livit.ae.
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
