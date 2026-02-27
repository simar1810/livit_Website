"use client";

import { useMemo, useState } from "react";
import CartFlowHeader from "@/components/CartFlowHeader";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";
import TabButtons from "@/components/TabButtons";
import { useCart } from "@/components/SiteShell";
import { buildOrderSummaryFromCartState } from "@/lib/cartUtils";

type CheckoutTab = "guest" | "register" | "signin";

/** Inline validation: non-empty string, email format for email. */
function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export default function CheckOutPage() {
  const { cartState } = useCart();
  const [activeTab, setActiveTab] = useState<CheckoutTab>("guest");
  const [promoCode, setPromoCode] = useState("");
  const [promoAmt, setPromoAmt] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [guestFirst, setGuestFirst] = useState("");
  const [guestLast, setGuestLast] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [touched, setTouched] = useState({ guest: false, delivery: false });

  const summary = useMemo(
    () =>
      buildOrderSummaryFromCartState(cartState, {
        deliveryTimeSlot: timeSlot,
        promoAmt,
      }),
    [cartState, timeSlot, promoAmt],
  );

  const handleApplyPromo = () => {
    const hasPromo = promoCode.trim().length > 0;
    setPromoAmt(hasPromo ? 50 : 0);
  };

  const payable =
    summary.subTotal + summary.vat + summary.deliveryCharge - summary.promoAmt;

  const guestValid =
    guestFirst.trim() !== "" &&
    guestLast.trim() !== "" &&
    isValidEmail(guestEmail) &&
    guestPhone.trim().length >= 8;
  const deliveryValid = timeSlot.trim() !== "";
  const orderNowDisabled =
    activeTab === "guest"
      ? !guestValid || !deliveryValid
      : !deliveryValid;

  const handleOrderNow = () => {
    // Placeholder: later this will trigger real checkout API.
    // eslint-disable-next-line no-console
    console.log("Checkout payload", {
      mode: activeTab,
      guest: { guestFirst, guestLast, guestEmail, guestPhone },
      timeSlot,
      extraInfo,
      summary,
      referralCode,
      promoCode,
      payable,
    });
  };

  const checkoutTabs = [
    { key: "guest", label: "Continue as Guest" },
    { key: "register", label: "Register" },
    { key: "signin", label: "Sign in" },
  ];

  return (
    <main>
      <h1 id="checkout-page-title" className="visually-hidden">Checkout</h1>
      <section className="cart-img" aria-labelledby="checkout-page-title">
        <CartFlowHeader currentStep="checkout" />
      </section>

      {/* Checkout main content */}
      <section className="pro_d">
        <div className="container-fluid">
          <div className="row">
            {/* Left: checkout + delivery */}
            <div className="col-lg-6">
              <div className="check-left-wrap">
                {/* Checkout tabs */}
                <div className="product-tab register-page">
                  <div className="ty_d">
                    <h2>CHECKOUT</h2>
                  </div>
                  <div className="tab-container">
                    <TabButtons
                      tabs={checkoutTabs}
                      activeKey={activeTab}
                      onSelect={(key) => setActiveTab(key as CheckoutTab)}
                    />

                    {/* Guest tab */}
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

                    {/* Sign-in tab – UI only */}
                    <div
                      id="tab3"
                      className={
                        activeTab === "signin"
                          ? "tab-content ctn active"
                          : "tab-content ctn"
                      }
                    >
                      <div className="contact_form" id="LogInPage">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="txtEmail">
                                  Email
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="txtEmail"
                                  type="text"
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
                                    id="txtPassword"
                                    type="password"
                                    placeholder="******"
                                    autoComplete="off"
                                  />
                                  <i className="fa fa-eye toggle-eye" />
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
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery section (UI only, map omitted) */}
                <div className="del-wrap">
                  <div className="del-form">
                    <div className="crt-ty">
                      <h2>DELIVERY</h2>
                    </div>
                    <div className="text-end">
                      <button
                        id="btnExisting"
                        className="check active"
                        type="button"
                      >
                        Existing Address
                      </button>
                      <button
                        id="btnNew"
                        className="check"
                        type="button"
                        style={{ marginLeft: 20 }}
                      >
                        New Address
                      </button>
                    </div>

                    <div className="contact_page cust_g">
                      <div className="contact_form">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="CountryId">
                                  Country
                                  <sup>*</sup>
                                </label>
                                <select
                                  id="CountryId"
                                  className="custom-dropdown"
                                  defaultValue="1"
                                >
                                  <option value="1">
                                    United Arab Emirates
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="CityId">
                                  City
                                  <sup>*</sup>
                                </label>
                                <select
                                  id="CityId"
                                  className="custom-dropdown"
                                  defaultValue="Dubai"
                                >
                                  <option value="Dubai">Dubai</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="Address">
                                  Address
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="Address"
                                  type="text"
                                  placeholder="ex. 123 W. Main St"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="BuildingNo">
                                  Building Name/Villa Number
                                  <sup>*</sup>
                                </label>
                                <input
                                  id="BuildingNo"
                                  type="text"
                                  placeholder="32"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="Floor">Floor Number</label>
                                <input
                                  id="Floor"
                                  type="text"
                                  placeholder="Enter floor"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="AppartmentNum">
                                  Apartment Number
                                </label>
                                <input
                                  id="AppartmentNum"
                                  type="text"
                                  placeholder=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="TimeSlot">
                                  select your time slot
                                  <sup>*</sup>
                                </label>
                                <select
                                  id="TimeSlot"
                                  className="custom-dropdown"
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
                                  <option value="">
                                    PICK YOUR TIMESLOT
                                  </option>
                                  <option value="3 AM - 6 AM">
                                    3 AM - 6 AM
                                  </option>
                                  <option value="6 AM - 9 AM">
                                    6 AM - 9 AM
                                  </option>
                                  <option value="9 AM - 12 PM">
                                    9 AM - 12 PM
                                  </option>
                                </select>
                                {touched.delivery && timeSlot.trim() === "" && (
                                  <p className="field-error">Please select a delivery time slot.</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="ExtraInformation">
                                  Extra Information
                                </label>
                                <textarea
                                  id="ExtraInformation"
                                  style={{ lineHeight: "50px" }}
                                  placeholder="Enter Extra Information"
                                  value={extraInfo}
                                  onChange={(e) =>
                                    setExtraInfo(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: order summary */}
            <div className="col-lg-6">
              <div className="order-sum-wrap">
                <OrderSummaryPanel
                  summary={summary}
                  promoCode={promoCode}
                  onPromoChange={setPromoCode}
                  onApplyPromo={handleApplyPromo}
                  payable={payable}
                  onOrderNow={handleOrderNow}
                  orderButtonLabel="ORDER NOW"
                  orderNowDisabled={orderNowDisabled}
                />
                {/* Payment container placeholder for future backend integration */}
                <div className="d-none mt-3" id="paymentContainer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

