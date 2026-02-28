"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartFlowHeader from "@/components/CartFlowHeader";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";
import TabButtons from "@/components/TabButtons";
import { useCart } from "@/components/SiteShell";
import { useAuth } from "@/contexts/AuthContext";
import { usePlans } from "@/hooks/usePlans";
import { getFallbackProgramLabel } from "@/config/cartOptions";
import { buildOrderSummaryFromCartState, getPayableFromSummary } from "@/lib/cartUtils";
import { isValidEmail } from "@/lib/validation";
import { apiClient, ApiError } from "@/lib/api";
import type { User } from "@/contexts/AuthContext";

type CheckoutTab = "guest" | "register" | "signin";
type SignInOtpMode = "phone" | "email";

const CHECKOUT_COUNTRY_CODES = [
  { value: "+971", label: "🇦🇪 (+971)" },
  { value: "+1", label: "🇺🇸 (+1)" },
  { value: "+44", label: "🇬🇧 (+44)" },
  { value: "+91", label: "🇮🇳 (+91)" },
  { value: "+61", label: "🇦🇺 (+61)" },
  { value: "+81", label: "🇯🇵 (+81)" },
  { value: "+49", label: "🇩🇪 (+49)" },
  { value: "+33", label: "🇫🇷 (+33)" },
  { value: "+86", label: "🇨🇳 (+86)" },
];

const REGISTRATION_TOKEN_STORAGE_KEY = "livit_registration_token";

interface VerifyResponse {
  isNewUser: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  registrationToken?: string;
}


const CHECKOUT_SESSION_PATH = "checkout/session";

interface CheckoutSessionResponse {
  url: string;
  orderId: string;
}

export default function CheckOutPage() {
  const router = useRouter();
  const { cartState, setCartState } = useCart();
  const { tenantId, tenantReady, setTokens, setUser, user, isAuthenticated, accessToken, sessionRestored } = useAuth();
  const { plans, getPlanLabel } = usePlans();

  const [activeTab, setActiveTab] = useState<CheckoutTab>("guest");
  const [promoCode, setPromoCode] = useState("");
  const [guestFirst, setGuestFirst] = useState("");
  const [guestLast, setGuestLast] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [touched, setTouched] = useState({ guest: false, delivery: false });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Sign-in OTP state
  const [signInOtpMode, setSignInOtpMode] = useState<SignInOtpMode>("phone");
  const [signInStep, setSignInStep] = useState<"input" | "otp">("input");
  const [signInPhone, setSignInPhone] = useState("");
  const [signInCountryCode, setSignInCountryCode] = useState("+971");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInOtp, setSignInOtp] = useState("");
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signInSuccess, setSignInSuccess] = useState<string | null>(null);
  const [signInLoading, setSignInLoading] = useState(false);

  const selectedPlan = useMemo(
    () => plans.find((p) => p._id === cartState.programId) ?? null,
    [plans, cartState.programId]
  );

  // When logged in with a real plan list but cart has no valid plan (empty or "default"), sync cart to first plan
  useEffect(() => {
    if (
      isAuthenticated &&
      plans.length > 0 &&
      (!cartState.programId?.trim() || cartState.programId === "default")
    ) {
      setCartState((prev) => ({ ...prev, programId: plans[0]._id }));
    }
  }, [isAuthenticated, plans, cartState.programId, setCartState]);

  const summary = useMemo(
    () =>
      buildOrderSummaryFromCartState(cartState, {
        deliveryTimeSlot: timeSlot,
        promoAmt: 0,
        plan: selectedPlan,
        programName:
          getPlanLabel(cartState.programId) ||
          getFallbackProgramLabel(cartState.programId) ||
          undefined,
      }),
    [cartState, timeSlot, getPlanLabel, selectedPlan],
  );

  const { totalAed: payable, totalFils } = useMemo(
    () => getPayableFromSummary(summary),
    [summary]
  );

  const handleApplyPromo = () => {
    // No promo API: discount always 0 (Step 8.3)
  };

  const guestValid =
    guestFirst.trim() !== "" &&
    guestLast.trim() !== "" &&
    isValidEmail(guestEmail) &&
    guestPhone.trim().length >= 8;
  const deliveryValid = timeSlot.trim() !== "";
  // When logged in and cart has no valid plan (empty or "default"), use first real plan so checkout can proceed
  const hasNoValidPlanId =
    !cartState.programId?.trim() || cartState.programId === "default";
  const effectiveProgramId =
    isAuthenticated && plans.length > 0 && hasNoValidPlanId
      ? plans[0]._id
      : cartState.programId?.trim() || "";
  // Treat any selected programId (including "default" from Cart) as valid so we don't show the no-plan banner
  const hasValidPlan = Boolean(effectiveProgramId);
  const orderNowDisabled =
    !hasValidPlan ||
    !deliveryValid ||
    (!isAuthenticated && activeTab === "guest" ? !guestValid : false);

  const handleOrderNow = async () => {
    if (orderNowDisabled || checkoutLoading) return;
    const planId = effectiveProgramId;
    if (!planId) {
      setCheckoutError("Please go to the Cart and select a plan first.");
      return;
    }
    if (totalFils <= 0) {
      setCheckoutError("Order total must be greater than zero.");
      return;
    }
    setCheckoutError(null);
    setCheckoutLoading(true);

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const successUrl = `${origin}/Home/CheckoutSuccess?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/Home/CheckoutCancel`;

    const productName = `${summary.programName} – ${summary.weeksOfFood} weeks`;

    const body: {
      templateId: string;
      amount: number;
      currency: string;
      productName: string;
      successUrl: string;
      cancelUrl: string;
      userId?: string;
      tenantId?: string;
    } = {
      templateId: planId,
      amount: totalFils,
      currency: "aed",
      productName,
      successUrl,
      cancelUrl,
    };
    if (isAuthenticated && user?._id) body.userId = user._id;
    if (tenantId) body.tenantId = tenantId;

    try {
      const res = await apiClient.post<CheckoutSessionResponse>(
        CHECKOUT_SESSION_PATH,
        body,
        isAuthenticated && accessToken ? { token: accessToken } : {}
      );
      const url = res.data?.url;
      if (url) {
        window.location.href = url;
        return;
      }
      setCheckoutError("Invalid response from server.");
    } catch (err) {
      setCheckoutError(
        err instanceof ApiError ? err.message : "Could not start checkout. Please try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const resetSignInOtpState = () => {
    setSignInStep("input");
    setSignInOtp("");
    setSignInError(null);
    setSignInSuccess(null);
  };

  const handleCheckoutSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !tenantReady) {
      setSignInError("Please wait, loading…");
      return;
    }
    const trimmed = signInPhone.trim();
    if (!trimmed || trimmed.length < 8) {
      setSignInError("Enter a valid phone number.");
      return;
    }
    setSignInError(null);
    setSignInSuccess(null);
    setSignInLoading(true);
    try {
      await apiClient.post(
        "auth/otp",
        { phone: trimmed, countryCode: signInCountryCode, tenantId },
        { tenantId }
      );
      setSignInSuccess("OTP sent. Check your phone.");
      setSignInStep("otp");
    } catch (err) {
      setSignInError(err instanceof ApiError ? err.message : "Failed to send OTP.");
    } finally {
      setSignInLoading(false);
    }
  };

  const handleCheckoutSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !tenantReady) {
      setSignInError("Please wait, loading…");
      return;
    }
    const trimmed = signInEmail.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setSignInError("Enter a valid email address.");
      return;
    }
    setSignInError(null);
    setSignInSuccess(null);
    setSignInLoading(true);
    try {
      await apiClient.post(
        "auth/email",
        { email: trimmed, tenantId },
        { tenantId }
      );
      setSignInSuccess("OTP sent. Check your email.");
      setSignInStep("otp");
    } catch (err) {
      setSignInError(err instanceof ApiError ? err.message : "Failed to send OTP.");
    } finally {
      setSignInLoading(false);
    }
  };

  const handleCheckoutVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !tenantReady) return;
    const trimmedOtp = signInOtp.trim();
    if (trimmedOtp.length < 4) {
      setSignInError("Enter the 6-digit code.");
      return;
    }
    setSignInError(null);
    setSignInLoading(true);
    try {
      const res = await apiClient.put<VerifyResponse>(
        "auth/otp",
        {
          phone: signInPhone.trim(),
          countryCode: signInCountryCode,
          otp: trimmedOtp,
          tenantId,
        },
        { tenantId }
      );
      const data = res.data;
      if (!data) {
        setSignInError("Invalid response.");
        return;
      }
      if (data.isNewUser && data.registrationToken) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(REGISTRATION_TOKEN_STORAGE_KEY, data.registrationToken);
        }
        router.push("/Home/Registration");
      } else if (!data.isNewUser && data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        if (data.user) setUser(data.user);
        resetSignInOtpState();
      } else {
        setSignInError("Could not complete sign in.");
      }
    } catch (err) {
      setSignInError(err instanceof ApiError ? err.message : "Verification failed.");
    } finally {
      setSignInLoading(false);
    }
  };

  const handleCheckoutVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !tenantReady) return;
    const trimmedOtp = signInOtp.trim();
    if (trimmedOtp.length < 4) {
      setSignInError("Enter the 6-digit code.");
      return;
    }
    setSignInError(null);
    setSignInLoading(true);
    try {
      const res = await apiClient.put<VerifyResponse>(
        "auth/email",
        {
          email: signInEmail.trim(),
          otp: trimmedOtp,
          tenantId,
        },
        { tenantId }
      );
      const data = res.data;
      if (!data) {
        setSignInError("Invalid response.");
        return;
      }
      if (data.isNewUser && data.registrationToken) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(REGISTRATION_TOKEN_STORAGE_KEY, data.registrationToken);
        }
        router.push("/Home/Registration");
      } else if (!data.isNewUser && data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        if (data.user) setUser(data.user);
        resetSignInOtpState();
      } else {
        setSignInError("Could not complete sign in.");
      }
    } catch (err) {
      setSignInError(err instanceof ApiError ? err.message : "Verification failed.");
    } finally {
      setSignInLoading(false);
    }
  };

  const checkoutTabs = [
    { key: "guest", label: "Continue as Guest (no account)" },
    { key: "signin", label: "I have an account" },
    { key: "register", label: "Create account" },
  ];

  const showNoPlanBanner =
    !hasValidPlan &&
    sessionRestored &&
    (!isAuthenticated || plans.length === 0);

  return (
    <main className="checkout-page">
      <h1 id="checkout-page-title" className="visually-hidden">Checkout</h1>
      <section className="cart-img checkout-header" aria-labelledby="checkout-page-title">
        <CartFlowHeader currentStep="checkout" />
        <div className="checkout-nav">
          <Link href="/Home/Cart" className="checkout-back-link">
            ← Back to cart
          </Link>
        </div>
      </section>

      {/* No plan in cart: send user to Cart first */}
      {showNoPlanBanner && (
        <section className="pro_d">
          <div className="container-fluid">
            <div className="checkout-alert-card">
              <p className="mb-2">Your cart doesn’t have a plan selected yet.</p>
              <Link href="/Home/Cart" className="btn btn-primary rounded-pill px-4">
                Go to Cart to choose a plan
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Checkout main content */}
      {!showNoPlanBanner && (
      <section className="pro_d checkout-main">
        <div className="container-fluid">
          <div className="row g-4">
            {/* Left: contact + delivery cards */}
            <div className="col-lg-6">
              <div className="checkout-cards">
                {/* Card 1: Contact */}
                <div className="checkout-card">
                  <div className="checkout-card-head">
                    <span className="checkout-card-num">1</span>
                    <h2 className="checkout-card-title">Contact</h2>
                  </div>
                  <div className="ty_d checkout-card-body">
                    {!sessionRestored ? (
                      <p className="text-muted mb-0 mt-1" style={{ fontSize: "0.95rem" }}>
                        Checking sign-in…
                      </p>
                    ) : isAuthenticated && user?.email ? (
                      <p className="text-muted mb-0 mt-1" style={{ fontSize: "0.95rem" }}>
                        You’re signed in as <strong>{user.email}</strong>. Complete delivery details below.
                      </p>
                    ) : (
                      <p className="text-muted mb-0 mt-1" style={{ fontSize: "0.95rem" }}>
                        Choose how you’d like to complete your order. No account needed for guest checkout.
                      </p>
                    )}
                  </div>
                  {sessionRestored && !isAuthenticated ? (
                    <div className="tab-container">
                    <TabButtons
                      tabs={checkoutTabs}
                      activeKey={activeTab}
                      onSelect={(key) => setActiveTab(key as CheckoutTab)}
                    />

                    {/* Guest tab – default, no account */}
                    <div
                      id="tab1"
                      className={
                        activeTab === "guest"
                          ? "tab-content ctn active"
                          : "tab-content ctn"
                      }
                    >
                      <div className="contact_form">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setTouched((p) => ({ ...p, guest: true }));
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="GuestFirstName">
                                  First Name
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="GuestFirstName"
                                  type="text"
                                  placeholder="Enter Name"
                                  autoComplete="off"
                                  value={guestFirst}
                                  onChange={(e) =>
                                    setGuestFirst(e.target.value)
                                  }
                                  onBlur={() =>
                                    setTouched((p) => ({ ...p, guest: true }))
                                  }
                                  aria-invalid={touched.guest && guestFirst.trim() === ""}
                                />
                                {touched.guest && guestFirst.trim() === "" && (
                                  <p className="field-error">First name is required.</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="GuestLastName">
                                  Last Name
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="GuestLastName"
                                  type="text"
                                  placeholder="Enter Last Name"
                                  autoComplete="off"
                                  value={guestLast}
                                  onChange={(e) =>
                                    setGuestLast(e.target.value)
                                  }
                                  onBlur={() =>
                                    setTouched((p) => ({ ...p, guest: true }))
                                  }
                                  aria-invalid={touched.guest && guestLast.trim() === ""}
                                />
                                {touched.guest && guestLast.trim() === "" && (
                                  <p className="field-error">Last name is required.</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="GuestEmail">
                                  Email
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="GuestEmail"
                                  type="email"
                                  placeholder="Enter Email"
                                  autoComplete="email"
                                  value={guestEmail}
                                  onChange={(e) =>
                                    setGuestEmail(e.target.value)
                                  }
                                  onBlur={() =>
                                    setTouched((p) => ({ ...p, guest: true }))
                                  }
                                  aria-invalid={
                                    touched.guest && !isValidEmail(guestEmail)
                                  }
                                />
                                {touched.guest && !isValidEmail(guestEmail) && guestEmail.length > 0 && (
                                  <p className="field-error">Enter a valid email address.</p>
                                )}
                                {touched.guest && guestEmail.trim() === "" && (
                                  <p className="field-error">Email is required.</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="GuestPhone">
                                  Phone Number
                                  <sup>*</sup>
                                </label>
                                <div className="phone_country">
                                  <select
                                    name="guest_country_code"
                                    id="Guestcountry_code"
                                    defaultValue="+971"
                                  >
                                    <option value="+1">🇺🇸 (+1)</option>
                                    <option value="+44">🇬🇧 (+44)</option>
                                    <option value="+91">🇮🇳 (+91)</option>
                                    <option value="+61">🇦🇺 (+61)</option>
                                    <option value="+81">🇯🇵 (+81)</option>
                                    <option value="+49">🇩🇪 (+49)</option>
                                    <option value="+33">🇫🇷 (+33)</option>
                                    <option value="+86">🇨🇳 (+86)</option>
                                    <option value="+971">🇦🇪 (+971)</option>
                                  </select>
                                  <input
                                    id="GuestPhone"
                                    type="tel"
                                    placeholder="Enter Number"
                                    maxLength={10}
                                    value={guestPhone}
                                    onChange={(e) =>
                                      setGuestPhone(e.target.value)
                                    }
                                    onBlur={() =>
                                      setTouched((p) => ({ ...p, guest: true }))
                                    }
                                    aria-invalid={
                                      touched.guest &&
                                      guestPhone.trim().length < 8
                                    }
                                  />
                                </div>
                                {touched.guest && guestPhone.trim().length > 0 && guestPhone.trim().length < 8 && (
                                  <p className="field-error">Phone must be at least 8 digits.</p>
                                )}
                                {touched.guest && guestPhone.trim() === "" && (
                                  <p className="field-error">Phone number is required.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Register tab – UI only, no logic */}
                    <div
                      id="tab2"
                      className={
                        activeTab === "register"
                          ? "tab-content ctn active"
                          : "tab-content ctn"
                      }
                    >
                      <div className="contact_form">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="FirstName">
                                  First Name
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="FirstName"
                                  type="text"
                                  placeholder="Enter Name"
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="LastName">
                                  Last Name
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="LastName"
                                  type="text"
                                  placeholder="Enter Last Name"
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="RegEmail">
                                  Email
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="RegEmail"
                                  type="email"
                                  placeholder="Enter Email"
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="Password">
                                  Password
                                  <sup>*</sup>
                                </label>
                                <div className="password-wrapper">
                                  <input
                                    id="Password"
                                    type="password"
                                    placeholder="******"
                                    autoComplete="off"
                                  />
                                  <i className="fa fa-eye toggle-eye" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="ConPassword">
                                  Confirm Password
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="ConPassword"
                                  type="password"
                                  placeholder="******"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="Phone">
                                  Phone Number
                                  <sup>*</sup>
                                </label>
                                <div className="phone_country">
                                  <select
                                    name="country_code"
                                    id="country_code"
                                    defaultValue="+971"
                                  >
                                    <option value="+1">🇺🇸 (+1)</option>
                                    <option value="+44">🇬🇧 (+44)</option>
                                    <option value="+91">🇮🇳 (+91)</option>
                                    <option value="+61">🇦🇺 (+61)</option>
                                    <option value="+81">🇯🇵 (+81)</option>
                                    <option value="+49">🇩🇪 (+49)</option>
                                    <option value="+33">🇫🇷 (+33)</option>
                                    <option value="+86">🇨🇳 (+86)</option>
                                    <option value="+971">🇦🇪 (+971)</option>
                                  </select>
                                  <input
                                    id="Phone"
                                    type="text"
                                    placeholder="Enter Number"
                                    maxLength={10}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Sign-in tab – Phone / Email OTP */}
                    <div
                      id="tab3"
                      className={
                        activeTab === "signin"
                          ? "tab-content ctn active"
                          : "tab-content ctn"
                      }
                    >
                      <div className="contact_form" id="LogInPage">
                        <p className="text-muted mb-2">
                          Sign in with a one-time code sent to your phone or email.
                        </p>
                        {!tenantReady && <p className="text-muted">Loading…</p>}
                        {tenantReady && (
                          <>
                            <div className="diet-options option-group mb-3">
                              <label className="me-3">
                                <input
                                  type="radio"
                                  name="checkoutOtpMode"
                                  checked={signInOtpMode === "phone"}
                                  onChange={() => {
                                    setSignInOtpMode("phone");
                                    resetSignInOtpState();
                                  }}
                                />
                                <span className="ms-1">Phone OTP</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="checkoutOtpMode"
                                  checked={signInOtpMode === "email"}
                                  onChange={() => {
                                    setSignInOtpMode("email");
                                    resetSignInOtpState();
                                  }}
                                />
                                <span className="ms-1">Email OTP</span>
                              </label>
                            </div>
                            {signInError && (
                              <div className="alert alert-danger" role="alert">
                                {signInError}
                              </div>
                            )}
                            {signInSuccess && (
                              <div className="alert alert-success" role="status">
                                {signInSuccess}
                              </div>
                            )}
                            {signInStep === "input" && signInOtpMode === "phone" && (
                              <form onSubmit={handleCheckoutSendPhoneOtp}>
                                <div className="form-group">
                                  <label htmlFor="checkout-otp-phone">
                                    Phone number <sup>*</sup>
                                  </label>
                                  <div className="phone_country">
                                    <select
                                      id="checkout-otp-country"
                                      value={signInCountryCode}
                                      onChange={(e) =>
                                        setSignInCountryCode(e.target.value)
                                      }
                                      aria-label="Country code"
                                    >
                                      {CHECKOUT_COUNTRY_CODES.map((c) => (
                                        <option key={c.value} value={c.value}>
                                          {c.label}
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      id="checkout-otp-phone"
                                      type="tel"
                                      placeholder="Enter number"
                                      value={signInPhone}
                                      onChange={(e) =>
                                        setSignInPhone(e.target.value)
                                      }
                                      autoComplete="tel-national"
                                      maxLength={15}
                                    />
                                  </div>
                                </div>
                                <div className="btrf">
                                  <button
                                    type="submit"
                                    className="contact_send"
                                    disabled={signInLoading}
                                  >
                                    {signInLoading ? "Sending…" : "Send OTP"}
                                  </button>
                                </div>
                              </form>
                            )}
                            {signInStep === "input" && signInOtpMode === "email" && (
                              <form onSubmit={handleCheckoutSendEmailOtp}>
                                <div className="form-group">
                                  <label htmlFor="checkout-otp-email">
                                    Email <sup>*</sup>
                                  </label>
                                  <input
                                    id="checkout-otp-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={signInEmail}
                                    onChange={(e) =>
                                      setSignInEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                  />
                                </div>
                                <div className="btrf">
                                  <button
                                    type="submit"
                                    className="contact_send"
                                    disabled={signInLoading}
                                  >
                                    {signInLoading ? "Sending…" : "Send OTP"}
                                  </button>
                                </div>
                              </form>
                            )}
                            {signInStep === "otp" && (
                              <form
                                onSubmit={
                                  signInOtpMode === "phone"
                                    ? handleCheckoutVerifyPhoneOtp
                                    : handleCheckoutVerifyEmailOtp
                                }
                              >
                                <div className="form-group">
                                  <label htmlFor="checkout-otp-code">Code</label>
                                  <input
                                    id="checkout-otp-code"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    placeholder="000000"
                                    value={signInOtp}
                                    onChange={(e) =>
                                      setSignInOtp(
                                        e.target.value
                                          .replace(/\D/g, "")
                                          .slice(0, 6)
                                      )
                                    }
                                    maxLength={6}
                                  />
                                </div>
                                <div className="btrf">
                                  <button
                                    type="button"
                                    className="contact_send me-2"
                                    onClick={resetSignInOtpState}
                                    disabled={signInLoading}
                                  >
                                    Back
                                  </button>
                                  <button
                                    type="submit"
                                    className="contact_send cdr"
                                    disabled={
                                      signInLoading ||
                                      signInOtp.trim().length < 4
                                    }
                                  >
                                    {signInLoading ? "Verifying…" : "Verify"}
                                  </button>
                                </div>
                              </form>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  ) : null}
                </div>

                {/* Card 2: Delivery — time slot required, address optional */}
                <div className="checkout-card checkout-card-delivery">
                  <div className="checkout-card-head">
                    <span className="checkout-card-num">2</span>
                    <h2 className="checkout-card-title">Delivery</h2>
                  </div>
                  <div className="del-form checkout-card-body">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="form-group checkout-time-slot">
                        <label htmlFor="TimeSlot">
                          Delivery time slot <sup>*</sup>
                        </label>
                        <select
                          id="TimeSlot"
                          className="form-select checkout-time-select"
                          value={timeSlot}
                          onChange={(e) => {
                            setTimeSlot(e.target.value);
                            setTouched((p) => ({ ...p, delivery: true }));
                          }}
                          onBlur={() =>
                            setTouched((p) => ({ ...p, delivery: true }))
                          }
                          aria-invalid={touched.delivery && timeSlot.trim() === ""}
                        >
                          <option value="">Select your time slot</option>
                          <option value="3 AM - 6 AM">3 AM – 6 AM</option>
                          <option value="6 AM - 9 AM">6 AM – 9 AM</option>
                          <option value="9 AM - 12 PM">9 AM – 12 PM</option>
                          <option value="12 PM - 3 PM">12 PM – 3 PM</option>
                          <option value="3 PM - 6 PM">3 PM – 6 PM</option>
                        </select>
                        {touched.delivery && timeSlot.trim() === "" && (
                          <p className="field-error">Please select a delivery time slot.</p>
                        )}
                      </div>
                      <p className="checkout-delivery-note text-muted small mb-3">
                        Optional: add address details below for delivery instructions.
                      </p>
                      <div className="row g-2">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="CountryId">Country</label>
                            <select id="CountryId" className="form-select" defaultValue="1">
                              <option value="1">United Arab Emirates</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="CityId">City</label>
                            <select id="CityId" className="form-select" defaultValue="Dubai">
                              <option value="Dubai">Dubai</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="Address">Address</label>
                            <input
                              id="Address"
                              type="text"
                              className="form-control"
                              placeholder="e.g. 123 Main St"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="BuildingNo">Building / Villa no.</label>
                            <input
                              id="BuildingNo"
                              type="text"
                              className="form-control"
                              placeholder="32"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Floor">Floor</label>
                            <input
                              id="Floor"
                              type="text"
                              className="form-control"
                              placeholder="Optional"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="ExtraInformation">Extra instructions</label>
                            <textarea
                              id="ExtraInformation"
                              className="form-control"
                              rows={2}
                              placeholder="Gate code, landmarks, etc."
                              value={extraInfo}
                              onChange={(e) => setExtraInfo(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: order summary + pay */}
            <div className="col-lg-6">
              <div className="checkout-summary-card order-sum-wrap">
                {checkoutError && (
                  <div className="alert alert-danger mb-3" role="alert">
                    {checkoutError}
                  </div>
                )}
                <OrderSummaryPanel
                  summary={summary}
                  promoCode={promoCode}
                  onPromoChange={setPromoCode}
                  onApplyPromo={handleApplyPromo}
                  hidePromoCode
                  payable={payable}
                  onOrderNow={handleOrderNow}
                  orderButtonLabel={checkoutLoading ? "Processing…" : "Continue to payment"}
                  orderNowDisabled={orderNowDisabled || checkoutLoading}
                />
                {orderNowDisabled && !checkoutLoading && (
                  <p className="checkout-hint text-muted small mt-2 mb-0">
                    {!deliveryValid
                      ? "Select a delivery time slot above to continue."
                      : !isAuthenticated && activeTab === "guest" && !guestValid
                        ? "Fill in your contact details above to continue."
                        : "Complete the form to continue."}
                  </p>
                )}
                <p className="text-muted small mt-2 mb-0 checkout-secure">
                  Secure payment via Stripe. You’ll be redirected to complete payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </main>
  );
}

