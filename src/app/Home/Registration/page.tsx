"use client";

import { useState } from "react";
import TabButtons from "@/components/TabButtons";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type TabKey = "register" | "signin";

const REGISTRATION_TABS = [
  { key: "register", label: "Register" },
  { key: "signin", label: "Sign in" },
];

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("register");
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState({
    registerPassword: false,
    loginPassword: false,
  });

  const togglePassword = (key: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const forgotOffcanvasRef = useFocusTrap(showForgot);

  return (
    <main>
      <section className="product-tab register-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="tab-container">
                <TabButtons
                  tabs={REGISTRATION_TABS}
                  activeKey={activeTab}
                  onSelect={(key) => setActiveTab(key as TabKey)}
                />

                {/* Register tab */}
                <div
                  id="tab1"
                  className={
                    activeTab === "register"
                      ? "tab-content ctn active"
                      : "tab-content ctn"
                  }
                >
                  <div className="crt-ty">
                    <h2>Create Your Account</h2>
                    <div className="row">
                      <div className="col-sm-12" />
                    </div>
                  </div>

                  <div className="contact_form">
                    <form
                      method="post"
                      id="form"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Name">
                              First Name
                              <sup>*</sup>
                            </label>
                            <input
                              id="Name"
                              name="Name"
                              placeholder="Enter Full Name"
                              type="text"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Surname">
                              Last Name
                              <sup>*</sup>
                            </label>
                            <input
                              id="Surname"
                              name="Surname"
                              placeholder="Enter Last Name"
                              type="text"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="Email">
                              Email
                              <sup>*</sup>
                            </label>
                            <input
                              id="Email"
                              name="Email"
                              placeholder="Enter Email"
                              type="text"
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
                                name="Password"
                                placeholder="******"
                                type={showPassword.registerPassword ? "text" : "password"}
                                autoComplete="off"
                              />
                              <i
                                className="fa fa-eye toggle-eye"
                                onClick={() =>
                                  togglePassword("registerPassword")
                                }
                              />
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
                              name="ConPassword"
                              placeholder="******"
                              type="password"
                              autoComplete="off"
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
                              <input
                                id="Phone"
                                name="Phone"
                                placeholder="Enter Number"
                                type="text"
                                autoComplete="off"
                                maxLength={10}
                              />
                              <select id="CountryCode" name="CountryCode">
                                <option value="+1">🇺🇸 (+1)</option>
                                <option value="+44">🇬🇧 (+44)</option>
                                <option value="+91">🇮🇳 (+91)</option>
                                <option value="+61">🇦🇺 (+61)</option>
                                <option value="+81">🇯🇵 (+81)</option>
                                <option value="+49">🇩🇪 (+49)</option>
                                <option value="+971" selected>
                                  🇦🇪 (+971)
                                </option>
                                <option value="+966">🇸🇦 (+966)</option>
                                <option value="+880">🇧🇩 (+880)</option>
                                <option value="+92">🇵🇰 (+92)</option>
                                <option value="+234">🇳🇬 (+234)</option>
                                <option value="+55">🇧🇷 (+55)</option>
                                <option value="+7">🇷🇺 (+7)</option>
                                <option value="+27">🇿🇦 (+27)</option>
                                <option value="+62">🇮🇩 (+62)</option>
                                <option value="+82">🇰🇷 (+82)</option>
                                <option value="+39">🇮🇹 (+39)</option>
                                <option value="+34">🇪🇸 (+34)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="btrf">
                          <div className="form-group">
                            <button type="submit" className="contact_send">
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Sign in tab */}
                <div
                  id="tab2"
                  className={
                    activeTab === "signin"
                      ? "tab-content ctn active"
                      : "tab-content ctn"
                  }
                >
                  <div className="contact_form" id="LogInPage">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="txtEmail">
                              Email
                              <sup>*</sup>
                            </label>
                            <input
                              type="text"
                              id="txtEmail"
                              placeholder="Enter your email or Mobile"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="txtPassword">
                              Password
                              <sup>*</sup>
                            </label>
                            <div className="password-wrapper">
                              <input
                                type={
                                  showPassword.loginPassword ? "text" : "password"
                                }
                                id="txtPassword"
                                placeholder="******"
                                autoComplete="off"
                              />
                              <i
                                className="fa fa-eye toggle-eye"
                                onClick={() => togglePassword("loginPassword")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="btrf">
                          <div className="form-group">
                            <button
                              type="button"
                              className="contact_send cdr"
                            >
                              Log In
                            </button>
                          </div>
                        </div>
                        <div className="btrf form-group text-end">
                          <button
                            type="button"
                            className="contact_send"
                            onClick={() => setShowForgot(true)}
                          >
                            Forgot Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* OTP verify area left as static markup */}
                  <div
                    id="divVarifyOTP"
                    className="contact_form"
                    style={{ display: "none" }}
                  >
                    <label className="form-label" htmlFor="OTP">
                      Type your 6 digit security code
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control number"
                        id="OTP"
                        name="OTP"
                        placeholder="Enter your OTP"
                      />
                      <div className="text-center">
                        <div
                          id="timer"
                          style={{
                            fontSize: 30,
                            fontWeight: 700,
                            color: "maroon",
                          }}
                        >
                          00:30
                        </div>
                        <div id="DivResendOTP" style={{ display: "none" }}>
                          <a href="javascript:void(0);" className="mx-1">
                            <u>Resend OTP</u>
                          </a>
                        </div>
                      </div>
                      <input type="hidden" id="hnID" />
                    </div>
                    <div className="btrf">
                      <div className="form-group">
                        <button
                          type="button"
                          id="btnVarify"
                          className="contact_send cdr"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forgot password offcanvas */}
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
              <span id="forgot-password-title" className="cart-title">FORGOT PASSWORD</span>
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
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="form-group">
                  <label htmlFor="forgotEmail">
                    Email
                    <sup>*</sup>
                  </label>
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    id="forgotEmail"
                    name="forgotEmail"
                    autoComplete="off"
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
                  onClick={() => {
                    /* submit forgot password here if wired */
                  }}
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

