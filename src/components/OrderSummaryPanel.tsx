"use client";

import React from "react";
import type { OrderSummary } from "@/types/cart";

interface OrderSummaryPanelProps {
  summary: OrderSummary;
  promoCode: string;
  onPromoChange: (value: string) => void;
  onApplyPromo: () => void;
  payable: number;
  onOrderNow: () => void;
  orderButtonLabel?: string;
  /** When true, ORDER NOW button is disabled (e.g. until required fields are valid). */
  orderNowDisabled?: boolean;
  /** When true, hide promo code input (backend has no promo API). */
  hidePromoCode?: boolean;
}

export default function OrderSummaryPanel({
  summary,
  promoCode,
  onPromoChange,
  onApplyPromo,
  payable,
  onOrderNow,
  orderButtonLabel = "ORDER NOW",
  orderNowDisabled = false,
  hidePromoCode = false,
}: OrderSummaryPanelProps) {
  return (
    <div className="order-sum-wrap">
      <div className="order-summary">
        <h2>ORDER SUMMARY</h2>
        {!hidePromoCode && (
        <div className="code-inputs">
          <div className="input-group">
            <input
              type="text"
              id="PromoCode"
              placeholder="PROMOTIONAL CODE"
              value={promoCode}
              onChange={(e) => onPromoChange(e.target.value)}
            />
            <button type="button" onClick={onApplyPromo}>
              APPLY
            </button>
          </div>
        </div>
        )}
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
            <span id="VatAmt">{summary.vat.toFixed(2)}</span> AED
          </p>
        </div>
        <div className="ord-sd">
          <h5>DELIVERY CHARGE</h5>
          <p>
            <span id="DeliveryCharge">{summary.deliveryCharge.toFixed(2)}</span> AED
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
            <span id="PromoAmt">{summary.promoAmt.toFixed(2)}</span> AED
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
              <span id="PayableAmt">{payable.toFixed(2)}</span> AED
            </div>
          </div>
        </div>
      </div>

      <div className="order-butt" id="Pay">
        <div className="ord-bt mt-2">
          <div className="col-md-12 text-end">
            <button
              className="check contact_send"
              type="button"
              onClick={onOrderNow}
              disabled={orderNowDisabled}
              aria-disabled={orderNowDisabled}
            >
              {orderButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
