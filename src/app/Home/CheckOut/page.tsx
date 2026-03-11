"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CartFlowHeader from "@/components/CartFlowHeader";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";
import { useCart } from "@/components/SiteShell";
import { usePlans } from "@/hooks/usePlans";
import { buildOrderSummaryFromCartState, getPayableFromSummary } from "@/lib/cartUtils";
import { isValidEmail } from "@/lib/validation";
import { apiClient, ApiError } from "@/lib/api";
import { upgradeToRegistered } from "@/lib/tokenManager";

const CHECKOUT_SESSION_PATH = "checkout/session";

interface CheckoutSessionResponse {
  url: string;
  orderId: string;
}

export default function CheckOutPage() {
  const { cartState } = useCart();
  const { plans, getPlanLabel } = usePlans();

  const [promoCode, setPromoCode] = useState("");
  const [guestFirst, setGuestFirst] = useState("");
  const [guestLast, setGuestLast] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [timeSlot, setTimeSlot] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("Dubai");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLabel, setAddressLabel] = useState("Home");
  const [extraInfo, setExtraInfo] = useState("");
  const [touched, setTouched] = useState({ guest: false, delivery: false });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const selectedPlan = useMemo(
    () => plans.find((p) => p._id === cartState.programId) ?? null,
    [plans, cartState.programId]
  );

  const summary = useMemo(
    () =>
      buildOrderSummaryFromCartState(cartState, {
        deliveryTimeSlot: timeSlot,
        promoAmt: 0,
        plan: selectedPlan,
        programName:
          getPlanLabel(cartState.programId) || undefined,
      }),
    [cartState, timeSlot, getPlanLabel, selectedPlan],
  );

  const { totalAed: payable, totalFils } = useMemo(
    () => getPayableFromSummary(summary),
    [summary]
  );

  const handleApplyPromo = () => {};

  const guestValid =
    guestFirst.trim() !== "" &&
    guestLast.trim() !== "" &&
    isValidEmail(guestEmail) &&
    guestPhone.trim().length >= 8;
  const deliveryValid = timeSlot.trim() !== "";

  const effectiveProgramId = cartState.programId?.trim() || "";
  const hasValidPlan = Boolean(effectiveProgramId);
  const orderNowDisabled = !hasValidPlan || !deliveryValid || !guestValid;

  const showNoPlanBanner = !hasValidPlan;

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

    try {
      const addrPayload = addressLine1.trim()
        ? {
            line1: addressLine1.trim(),
            line2: addressLine2.trim() || undefined,
            city: city || "Dubai",
            state: state.trim() || undefined,
            postalCode: postalCode.trim() || undefined,
            country: "AE",
            label: addressLabel || undefined,
          }
        : undefined;

      await upgradeToRegistered({
        name: `${guestFirst.trim()} ${guestLast.trim()}`,
        phone: guestPhone.trim(),
        countryCode,
        email: guestEmail.trim() || undefined,
        address: addrPayload,
      });

      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const successUrl = `${origin}/Home/CheckoutSuccess?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/Home/CheckoutCancel`;

      const productName = `${summary.programName} – ${summary.weeksOfFood} weeks`;

      const body = {
        templateId: planId,
        amount: totalFils,
        currency: "aed",
        productName,
        successUrl,
        cancelUrl,
        customer: {
          name: `${guestFirst.trim()} ${guestLast.trim()}`,
          email: guestEmail.trim(),
          phone: guestPhone.trim(),
          countryCode,
        },
        delivery: {
          timeSlot,
          address: addrPayload,
          extraInfo: extraInfo.trim() || undefined,
        },
      };

      const res = await apiClient.post<CheckoutSessionResponse>(
        CHECKOUT_SESSION_PATH,
        body
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

      {showNoPlanBanner && (
        <section className="pro_d">
          <div className="container-fluid">
            <div className="checkout-alert-card">
              <p className="mb-2">Your cart doesn&apos;t have a plan selected yet.</p>
              <Link href="/Home/Cart" className="btn btn-primary rounded-pill px-4">
                Go to Cart to choose a plan
              </Link>
            </div>
          </div>
        </section>
      )}

      {!showNoPlanBanner && (
      <section className="pro_d checkout-main">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="checkout-cards">
                {/* Card 1: Contact */}
                <div className="checkout-card">
                  <div className="checkout-card-head">
                    <span className="checkout-card-num">1</span>
                    <h2 className="checkout-card-title">Contact</h2>
                  </div>
                  <div className="checkout-card-body contact_form">
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
                              onChange={(e) => setGuestFirst(e.target.value)}
                              onBlur={() => setTouched((p) => ({ ...p, guest: true }))}
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
                              onChange={(e) => setGuestLast(e.target.value)}
                              onBlur={() => setTouched((p) => ({ ...p, guest: true }))}
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
                              autoComplete="off"
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              onBlur={() => setTouched((p) => ({ ...p, guest: true }))}
                              aria-invalid={touched.guest && !isValidEmail(guestEmail)}
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
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
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
                                onChange={(e) => setGuestPhone(e.target.value)}
                                onBlur={() => setTouched((p) => ({ ...p, guest: true }))}
                                aria-invalid={touched.guest && guestPhone.trim().length < 8}
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

                {/* Card 2: Delivery */}
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
                          onBlur={() => setTouched((p) => ({ ...p, delivery: true }))}
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
                        Add your delivery address below.
                      </p>
                      <div className="row g-2">
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="AddressLabel">Address label</label>
                            <select
                              id="AddressLabel"
                              className="form-select"
                              value={addressLabel}
                              onChange={(e) => setAddressLabel(e.target.value)}
                            >
                              <option value="Home">Home</option>
                              <option value="Office">Office</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="AddressLine1">
                              Street address / Building name <sup>*</sup>
                            </label>
                            <input
                              id="AddressLine1"
                              type="text"
                              className="form-control"
                              placeholder="e.g. 123 Al Wasl Road, Villa 5"
                              value={addressLine1}
                              onChange={(e) => setAddressLine1(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="AddressLine2">
                              Apt / Floor / Building no.
                            </label>
                            <input
                              id="AddressLine2"
                              type="text"
                              className="form-control"
                              placeholder="e.g. Floor 3, Apt 301"
                              value={addressLine2}
                              onChange={(e) => setAddressLine2(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="CityId">
                              City <sup>*</sup>
                            </label>
                            <select
                              id="CityId"
                              className="form-select"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            >
                              <option value="Dubai">Dubai</option>
                              <option value="Abu Dhabi">Abu Dhabi</option>
                              <option value="Sharjah">Sharjah</option>
                              <option value="Ajman">Ajman</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="StateField">State / Emirate</label>
                            <input
                              id="StateField"
                              type="text"
                              className="form-control"
                              placeholder="Optional"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="PostalCode">Postal code</label>
                            <input
                              id="PostalCode"
                              type="text"
                              className="form-control"
                              placeholder="Optional"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="CountryId">Country</label>
                            <select id="CountryId" className="form-select" defaultValue="AE" disabled>
                              <option value="AE">United Arab Emirates</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="ExtraInformation">Delivery instructions</label>
                            <textarea
                              id="ExtraInformation"
                              className="form-control"
                              rows={2}
                              placeholder="Gate code, landmarks, preferred entrance, etc."
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
                      : !guestValid
                        ? "Fill in your contact details above to continue."
                        : "Complete the form to continue."}
                  </p>
                )}
                <p className="text-muted small mt-2 mb-0 checkout-secure">
                  Secure payment via Stripe. You&apos;ll be redirected to complete payment.
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
