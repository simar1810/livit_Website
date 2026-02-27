export { default } from "@/app/Home/CheckOut/page";

"use client";

import { useState } from "react";

type CheckoutTab = "guest" | "register" | "signin";

interface OrderSummary {
  programName: string;
  dietaryPreference: string;
  mealsPerDay: string;
  caloriePerMeal: number;
  caloriePerDay: number;
  programLength: string;
  daysOfFood: number;
  weeksOfFood: number;
  startDate: string;
  deliveryTimeSlot: string;
  subTotal: number;
  vat: number;
  deliveryCharge: number;
  promoAmt: number;
}

const initialSummary: OrderSummary = {
  programName: "Signature Program",
  dietaryPreference: "CHICKEN, BEEF",
  mealsPerDay: "BREAKFAST, LUNCH, DINNER, SNACK",
  caloriePerMeal: 400,
  caloriePerDay: 1600,
  programLength: "2 WEEKS",
  daysOfFood: 10,
  weeksOfFood: 2,
  startDate: "2026-03-09",
  deliveryTimeSlot: "",
  subTotal: 1854.75,
  vat: 92.74,
  deliveryCharge: 0,
  promoAmt: 0,
};

export default function CheckOutPage() {
  const [activeTab, setActiveTab] = useState<CheckoutTab>("guest");
  const [summary, setSummary] = useState<OrderSummary>(initialSummary);
  const [promoCode, setPromoCode] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [guestFirst, setGuestFirst] = useState("");
  const [guestLast, setGuestLast] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  const handleApplyPromo = () => {
    // UI-only: simple mock discount when any promo is entered.
    const hasPromo = promoCode.trim().length > 0;
    const promoAmt = hasPromo ? 50 : 0;
    setSummary((prev) => ({ ...prev, promoAmt }));
  };

  const payable =
    summary.subTotal + summary.vat + summary.deliveryCharge - summary.promoAmt;

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

  return (
    <main>
      {/* Checkout nav strip */}
      <section className="cart-img">
        <div className="cart-header">
          <div id="cartNav" className="cart-nav">
            <div className="cart-nav-wrap">
              <span className="ct-wrp">
                <span className="ct-icon">
                  <i className="fa fa-check" />
                </span>
                <a href="/Home/ViewIndex">Select</a>
              </span>
              <span className="ct-wrp">
                <span className="ct-icon">
                  <i className="fa fa-check" />
                </span>
                <a href="/Home/Cart">Customize</a>
              </span>
              <span className="ct-wrp">
                <span className="circ" />
                <a href="/Home/CheckOut">Check out</a>
              </span>
            </div>
          </div>
        </div>
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
                    <div className="tab-buttons regist">
                      <button
                        className={
                          activeTab === "guest"
                            ? "tab-button active"
                            : "tab-button"
                        }
                        type="button"
                        onClick={() => setActiveTab("guest")}
                      >
                        Continue as Guest
                      </button>
                      <button
                        className={
                          activeTab === "register"
                            ? "tab-button active"
                            : "tab-button"
                        }
                        type="button"
                        onClick={() => setActiveTab("register")}
                      >
                        Register
                      </button>
                      <button
                        className={
                          activeTab === "signin"
                            ? "tab-button active"
                            : "tab-button"
                        }
                        type="button"
                        onClick={() => setActiveTab("signin")}
                      >
                        Sign in
                      </button>
                    </div>

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
                                />
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
                                />
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
                                  type="text"
                                  placeholder="Enter Email"
                                  autoComplete="off"
                                  value={guestEmail}
                                  onChange={(e) =>
                                    setGuestEmail(e.target.value)
                                  }
                                />
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
                                    type="text"
                                    placeholder="Enter Number"
                                    maxLength={10}
                                    value={guestPhone}
                                    onChange={(e) =>
                                      setGuestPhone(e.target.value)
                                    }
                                  />
                                </div>
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
                                    setSummary((prev) => ({
                                      ...prev,
                                      deliveryTimeSlot: e.target.value,
                                    }));
                                  }}
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
                <div className="order-summary">
                  <h2>ORDER SUMMARY</h2>
                  <div className="code-inputs">
                    <div className="input-group d-none">
                      <input
                        type="text"
                        placeholder="REFERRAL CODE"
                        id="ReferralCode"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                      />
                      <button type="button">APPLY</button>
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        id="PromoCode"
                        placeholder="PROMOTIONAL CODE"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button type="button" onClick={handleApplyPromo}>
                        APPLY
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ord-qty order-desc-pera">
                  <p>
                    <b>Dietary preference:</b> {summary.dietaryPreference}
                  </p>
                  <p>
                    <b>Meals per day:</b> {summary.mealsPerDay}
                  </p>
                  <p>
                    <b>Calorie Range per meal:</b> {summary.caloriePerMeal} KCAL
                  </p>
                  <p>
                    <b>Calorie per day:</b> {summary.caloriePerDay} KCAL
                  </p>
                  <p>
                    <b>Program Length:</b> {summary.programLength}
                  </p>
                  <p>
                    <b>days of food:</b> {summary.daysOfFood} days
                  </p>
                  <p>
                    <b>weeks of food:</b> {summary.weeksOfFood} weeks
                  </p>
                  <p>
                    <b>Start Date:</b> {summary.startDate}
                  </p>
                  <p>
                    <b>Delivery time slot:</b> {summary.deliveryTimeSlot}
                  </p>
                </div>

                <div>
                  <div className="ord-sd">
                    <h5>SUB TOTAL</h5>
                    <p>{summary.subTotal.toFixed(2)} AED</p>
                  </div>
                  <div className="ord-sd">
                    <h5>VAT PER(5%)</h5>
                    <p>
                      <span id="VatAmt">
                        {summary.vat.toFixed(2)}
                      </span>{" "}
                      AED
                    </p>
                  </div>
                  <div className="ord-sd">
                    <h5>DELIVERY CHARGE</h5>
                    <p>
                      <span id="DeliveryCharge">
                        {summary.deliveryCharge.toFixed(2)}
                      </span>{" "}
                      AED
                    </p>
                  </div>
                  <div className="ord-sd">
                    <h5>TOTAL CHARGE</h5>
                    <p>
                      <span id="SubTotal">
                        {(summary.subTotal + summary.vat).toFixed(2)}
                      </span>{" "}
                      AED
                    </p>
                  </div>
                  <div className="ord-sd">
                    <h5>PROMO CODE AMT</h5>
                    <p>
                      <span id="PromoAmt">
                        {summary.promoAmt.toFixed(2)}
                      </span>{" "}
                      AED
                    </p>
                  </div>
                </div>

                <div className="ord-total-wrap">
                  <div className="ord-total">
                    <div className="rw-cal m_cst">
                      <div className="ord-sd">
                        <h5>TOTAL</h5>
                      </div>
                      <div className="clv-h-ico">
                        <span id="PayableAmt">
                          {payable.toFixed(2)}
                        </span>{" "}
                        AED
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-butt" id="Pay">
                  <div className="ord-bt mt-2">
                    <div className="col-md-12 text-end">
                      <button
                        className="check"
                        type="button"
                        style={{
                          background: "#e9d99d",
                          textTransform: "uppercase",
                          fontWeight: 400,
                          padding: "15px 20px",
                          fontFamily: "Gothic60",
                          border: "transparent",
                        }}
                        onClick={handleOrderNow}
                      >
                        ORDER NOW
                      </button>
                    </div>
                  </div>
                </div>

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

