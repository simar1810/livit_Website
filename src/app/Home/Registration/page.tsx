"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TabButtons from "@/components/TabButtons";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, ApiError } from "@/lib/api";
import { isValidEmail, isValidOtp, getFieldError } from "@/lib/validation";
import type { User } from "@/contexts/AuthContext";

type TabKey = "register" | "signin";
type OtpMode = "phone" | "email";

const REGISTRATION_TABS = [
  { key: "signin", label: "Sign in" },
  { key: "register", label: "Register" },
];

const REGISTRATION_TOKEN_STORAGE_KEY = "livit_registration_token";

const COUNTRY_CODES = [
  { value: "+971", label: "🇦🇪 (+971)" },
  { value: "+1", label: "🇺🇸 (+1)" },
  { value: "+44", label: "🇬🇧 (+44)" },
  { value: "+91", label: "🇮🇳 (+91)" },
  { value: "+61", label: "🇦🇺 (+61)" },
  { value: "+81", label: "🇯🇵 (+81)" },
  { value: "+49", label: "🇩🇪 (+49)" },
  { value: "+966", label: "🇸🇦 (+966)" },
  { value: "+33", label: "🇫🇷 (+33)" },
  { value: "+86", label: "🇨🇳 (+86)" },
];

interface VerifyResponse {
  isNewUser: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  registrationToken?: string;
}

interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export default function RegistrationPage() {
  const router = useRouter();
  const { tenantId, tenantReady, setTokens, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState<TabKey>("signin");
  const [otpMode, setOtpMode] = useState<OtpMode>("phone");
  const [step, setStep] = useState<"input" | "otp">("input");

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /** When set, show "Complete your profile" form (from OTP verify new user). */
  const [registrationToken, setRegistrationToken] = useState<string | null>(null);

  /** Complete registration form (Step 5) */
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCountryCode, setRegCountryCode] = useState("+971");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const [showForgot, setShowForgot] = useState(false);
  const forgotOffcanvasRef = useFocusTrap(showForgot);

  // Accept registrationToken from Checkout (redirect with token in sessionStorage)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionStorage.getItem(REGISTRATION_TOKEN_STORAGE_KEY);
    if (stored) {
      sessionStorage.removeItem(REGISTRATION_TOKEN_STORAGE_KEY);
      setRegistrationToken(stored);
      setActiveTab("register");
    }
  }, []);

  const resetOtpState = () => {
    setStep("input");
    setOtp("");
    setError(null);
    setSuccessMessage(null);
  };

  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !tenantReady) {
      setError("Please wait, loading…");
      return;
    }
    const trimmed = phone.trim();
    if (!trimmed || trimmed.length < 8) {
      setError("Enter a valid phone number.");
      return;
    }
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      await apiClient.post(
        "auth/otp",
        { phone: trimmed, countryCode, tenantId },
        { tenantId }
      );
      setSuccessMessage("OTP sent. Check your phone.");
      setStep("otp");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !tenantReady) {
      setError("Please wait, loading…");
      return;
    }
    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      await apiClient.post(
        "auth/email",
        { email: trimmed, tenantId },
        { tenantId }
      );
      setSuccessMessage("OTP sent. Check your email.");
      setStep("otp");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !tenantReady) return;
    const trimmedOtp = otp.trim();
    if (!isValidOtp(trimmedOtp)) {
      setError("Enter the 6-digit code.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await apiClient.put<VerifyResponse>(
        "auth/otp",
        {
          phone: phone.trim(),
          countryCode,
          otp: trimmedOtp,
          tenantId,
        },
        { tenantId }
      );
      const data = res.data;
      if (!data) {
        setError("Invalid response.");
        return;
      }
      if (data.isNewUser && data.registrationToken) {
        setRegistrationToken(data.registrationToken);
        if (otpMode === "phone") {
          setRegPhone(phone.trim());
          setRegCountryCode(countryCode);
        } else setRegEmail(email.trim());
        setActiveTab("register");
        resetOtpState();
      } else if (!data.isNewUser && data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        if (data.user) setUser(data.user);
        resetOtpState();
        router.push("/");
      } else {
        setError("Could not complete sign in.");
      }
    } catch (err) {
      const fieldMsg = getFieldError(err, "otp");
      setError(fieldMsg ?? (err instanceof ApiError ? err.message : "Verification failed."));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !tenantReady) return;
    const trimmedOtp = otp.trim();
    if (!isValidOtp(trimmedOtp)) {
      setError("Enter the 6-digit code.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await apiClient.put<VerifyResponse>(
        "auth/email",
        {
          email: email.trim(),
          otp: trimmedOtp,
          tenantId,
        },
        { tenantId }
      );
      const data = res.data;
      if (!data) {
        setError("Invalid response.");
        return;
      }
      if (data.isNewUser && data.registrationToken) {
        setRegistrationToken(data.registrationToken);
        if (otpMode === "email") setRegEmail(email.trim());
        else {
          setRegPhone(phone.trim());
          setRegCountryCode(countryCode);
        }
        setActiveTab("register");
        resetOtpState();
      } else if (!data.isNewUser && data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        if (data.user) setUser(data.user);
        resetOtpState();
        router.push("/");
      } else {
        setError("Could not complete sign in.");
      }
    } catch (err) {
      const fieldMsg = getFieldError(err, "otp");
      setError(fieldMsg ?? (err instanceof ApiError ? err.message : "Verification failed."));
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromOtp = () => {
    resetOtpState();
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationToken) return;
    const firstName = regFirstName.trim();
    const lastName = regLastName.trim();
    const emailVal = regEmail.trim();
    if (!firstName || !lastName) {
      setRegisterError("First name and last name are required.");
      return;
    }
    if (!emailVal || !isValidEmail(emailVal)) {
      setRegisterError("Enter a valid email address.");
      return;
    }
    setRegisterError(null);
    setRegisterLoading(true);
    try {
      const name = `${firstName} ${lastName}`.trim();
      const body: {
        registrationToken: string;
        type: string;
        name: string;
        email: string;
        phone?: string;
        countryCode?: string;
      } = {
        registrationToken,
        type: "customer",
        name,
        email: emailVal,
      };
      if (regPhone.trim()) {
        body.phone = regPhone.trim();
        body.countryCode = regCountryCode;
      }
      const res = await apiClient.post<RegisterResponse>("auth/register", body);
      const data = res.data;
      if (data?.accessToken && data?.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        if (data.user) setUser(data.user);
        setRegistrationToken(null);
        setRegFirstName("");
        setRegLastName("");
        setRegEmail("");
        setRegPhone("");
        router.push("/");
      } else {
        setRegisterError("Registration succeeded but could not sign you in.");
      }
    } catch (err) {
      const fieldMsg =
        getFieldError(err, "email") ?? getFieldError(err, "name");
      setRegisterError(
        fieldMsg ??
          (err instanceof ApiError ? err.message : "Registration failed. Please try again.")
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <main>
      <div className="auth-page-wrap">
        <section className="product-tab register-page">
          <div className="tab-container">
            <TabButtons
              tabs={REGISTRATION_TABS}
              activeKey={activeTab}
              onSelect={(key) => {
                setActiveTab(key as TabKey);
                setError(null);
                setSuccessMessage(null);
              }}
            />

            {/* Sign in tab – Phone OTP & Email OTP */}
            <div
              id="tab-signin"
              className={
                activeTab === "signin"
                  ? "tab-content ctn active"
                  : "tab-content ctn"
              }
            >
              <div className="crt-ty">
                <h2>Sign in</h2>
                <p className="text-muted">
                  Use your phone or email to receive a one-time code. No password needed.
                </p>
              </div>

                  {!tenantReady && (
                    <p className="text-muted">Loading…</p>
                  )}

                  {tenantReady && (
                    <>
                      <div className="diet-options option-group mb-3">
                        <label className="me-3">
                          <input
                            type="radio"
                            name="otpMode"
                            checked={otpMode === "phone"}
                            onChange={() => {
                              setOtpMode("phone");
                              resetOtpState();
                            }}
                          />
                          <span className="ms-1">Phone OTP</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="otpMode"
                            checked={otpMode === "email"}
                            onChange={() => {
                              setOtpMode("email");
                              resetOtpState();
                            }}
                          />
                          <span className="ms-1">Email OTP</span>
                        </label>
                      </div>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      {successMessage && (
                        <div className="alert alert-success" role="status">
                          {successMessage}
                        </div>
                      )}

                      {step === "input" && otpMode === "phone" && (
                        <div className="contact_form">
                          <form onSubmit={handleSendPhoneOtp}>
                            <div className="form-group">
                              <label htmlFor="otp-phone">
                                Phone number <sup>*</sup>
                              </label>
                              <div className="phone_country">
                                <select
                                  id="otp-country"
                                  value={countryCode}
                                  onChange={(e) => setCountryCode(e.target.value)}
                                  aria-label="Country code"
                                >
                                  {COUNTRY_CODES.map((c) => (
                                    <option key={c.value} value={c.value}>
                                      {c.label}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  id="otp-phone"
                                  type="tel"
                                  placeholder="Enter number"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  autoComplete="tel-national"
                                  maxLength={15}
                                />
                              </div>
                            </div>
                            <div className="btrf">
                              <button
                                type="submit"
                                className="contact_send"
                                disabled={loading}
                              >
                                {loading ? "Sending…" : "Send OTP"}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {step === "input" && otpMode === "email" && (
                        <div className="contact_form">
                          <form onSubmit={handleSendEmailOtp}>
                            <div className="form-group">
                              <label htmlFor="otp-email">
                                Email <sup>*</sup>
                              </label>
                              <input
                                id="otp-email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                              />
                            </div>
                            <div className="btrf">
                              <button
                                type="submit"
                                className="contact_send"
                                disabled={loading}
                              >
                                {loading ? "Sending…" : "Send OTP"}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {step === "otp" && (
                        <div className="contact_form">
                          <p className="mb-2">
                            Enter the 6-digit code sent to{" "}
                            {otpMode === "phone"
                              ? `${countryCode} ${phone}`
                              : email}
                          </p>
                          <form
                            onSubmit={
                              otpMode === "phone"
                                ? handleVerifyPhoneOtp
                                : handleVerifyEmailOtp
                            }
                          >
                            <div className="form-group">
                              <label htmlFor="otp-code">Code</label>
                              <input
                                id="otp-code"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                placeholder="000000"
                                value={otp}
                                onChange={(e) =>
                                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                }
                                maxLength={6}
                              />
                            </div>
                            <div className="btrf">
                              <button
                                type="button"
                                className="contact_send me-2"
                                onClick={handleBackFromOtp}
                                disabled={loading}
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                className="contact_send cdr"
                                disabled={loading || otp.trim().length < 4}
                              >
                                {loading ? "Verifying…" : "Verify"}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Register tab – Complete profile (after OTP for new user) or instructions */}
                <div
                  id="tab-register"
                  className={
                    activeTab === "register"
                      ? "tab-content ctn active"
                      : "tab-content ctn"
                  }
                >
                  {registrationToken ? (
                    <div className="crt-ty">
                      <h2>Complete your profile</h2>
                      <p className="text-muted">
                        You’re almost done. Fill in your details below.
                      </p>
                      {registerError && (
                        <div className="alert alert-danger" role="alert">
                          {registerError}
                        </div>
                      )}
                      <div className="contact_form">
                        <form
                          id="register-form"
                          onSubmit={handleCompleteRegistration}
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="Name">First name <sup>*</sup></label>
                                <input
                                  id="Name"
                                  name="Name"
                                  placeholder="Enter first name"
                                  type="text"
                                  autoComplete="given-name"
                                  value={regFirstName}
                                  onChange={(e) => setRegFirstName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="Surname">Last name <sup>*</sup></label>
                                <input
                                  id="Surname"
                                  name="Surname"
                                  placeholder="Enter last name"
                                  type="text"
                                  autoComplete="family-name"
                                  value={regLastName}
                                  onChange={(e) => setRegLastName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="Email">Email <sup>*</sup></label>
                                <input
                                  id="Email"
                                  name="Email"
                                  placeholder="Enter email"
                                  type="email"
                                  autoComplete="email"
                                  value={regEmail}
                                  onChange={(e) => setRegEmail(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="Phone">Phone number</label>
                                <div className="phone_country">
                                  <input
                                    id="Phone"
                                    name="Phone"
                                    placeholder="Enter number"
                                    type="tel"
                                    autoComplete="tel-national"
                                    maxLength={15}
                                    value={regPhone}
                                    onChange={(e) => setRegPhone(e.target.value)}
                                  />
                                  <select
                                    id="CountryCode"
                                    name="CountryCode"
                                    value={regCountryCode}
                                    onChange={(e) => setRegCountryCode(e.target.value)}
                                    aria-label="Country code"
                                  >
                                    {COUNTRY_CODES.map((c) => (
                                      <option key={c.value} value={c.value}>
                                        {c.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="btrf">
                              <button
                                type="submit"
                                className="contact_send"
                                disabled={registerLoading}
                              >
                                {registerLoading
                                  ? "Creating account…"
                                  : "Complete registration"}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="crt-ty">
                      <h2>Create your account</h2>
                      <p className="text-muted">
                        To register, use the <strong>Sign in</strong> tab and
                        enter your phone or email. If you’re new, we’ll send you
                        a code and then ask you to complete your profile.
                      </p>
                      <button
                        type="button"
                        className="contact_send"
                        onClick={() => setActiveTab("signin")}
                      >
                        Go to Sign in
                      </button>
                    </div>
                  )}
                </div>
          </div>
        </section>
      </div>

      {/* Forgot password offcanvas – kept for future backend support */}
      <div
        id="ForgotOffcanvas"
        className={`custom-cart-offcanvas ${showForgot ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
        aria-hidden={!showForgot}
      >
        <div className="cart-content" ref={forgotOffcanvasRef}>
          <div className="cart-content-ed">
            <div className="cart-header_ad">
              <span id="forgot-password-title" className="cart-title">
                FORGOT PASSWORD
              </span>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="close-cart-btn"
                aria-label="Close forgot password"
              >
                <i className="fa fa-times" aria-hidden />
              </button>
            </div>
            <div className="contact_form">
              <form
                id="forgotForm"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-group">
                  <label htmlFor="forgotEmail">Email <sup>*</sup></label>
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    id="forgotEmail"
                    name="forgotEmail"
                    autoComplete="email"
                    required
                  />
                </div>
              </form>
            </div>
            <div>
              <div className="total-check">
                <a
                  className="add-checkout"
                  style={{ backgroundColor: "#e9d99d" }}
                  onClick={() => {}}
                >
                  FORGOT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
