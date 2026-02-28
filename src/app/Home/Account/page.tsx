"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function AccountPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <main className="account-page-wrap">
        <section className="account-hero">
          <div className="account-hero-inner">
            <h1 className="account-title">Account</h1>
            <p className="account-meta">Sign in to view your account.</p>
            <Link href="/Home/Registration" className="account-cta-btn">
              Sign in
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="account-page-wrap">
      <section className="account-hero">
        <div className="account-hero-inner">
          <h1 className="account-title">Account settings</h1>
          <p className="account-meta">View and manage your profile.</p>
        </div>
      </section>
      <section className="account-content">
        <div className="account-container">
          <div className="account-card">
            <h2 className="account-card-title">Profile</h2>
            <dl className="account-dl">
              <div className="account-dl-row">
                <dt>Name</dt>
                <dd>{user.name || "—"}</dd>
              </div>
              <div className="account-dl-row">
                <dt>Email</dt>
                <dd>{user.email || "—"}</dd>
              </div>
              <div className="account-dl-row">
                <dt>Phone</dt>
                <dd>
                  {user.countryCode && user.phone
                    ? `${user.countryCode} ${user.phone}`
                    : user.phone || "—"}
                </dd>
              </div>
              {user.dietPreference && (
                <div className="account-dl-row">
                  <dt>Diet preference</dt>
                  <dd>{user.dietPreference}</dd>
                </div>
              )}
              {user.goal && (
                <div className="account-dl-row">
                  <dt>Goal</dt>
                  <dd>{user.goal}</dd>
                </div>
              )}
            </dl>
            <p className="account-card-note">
              Profile updates can be done during registration or by contacting
              support.
            </p>
            <Link href="/Home/Registration" className="account-edit-btn">
              Sign in / Register
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
