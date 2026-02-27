"use client";

import React from "react";

export type CartStep = "select" | "customize" | "checkout";

interface CartFlowHeaderProps {
  currentStep: CartStep;
  className?: string;
}

const STEPS: { step: CartStep; label: string; href: string }[] = [
  { step: "select", label: "Select", href: "/Home/ViewIndex" },
  { step: "customize", label: "Customize", href: "/Home/Cart" },
  { step: "checkout", label: "Check out", href: "/Home/CheckOut" },
];

export default function CartFlowHeader({ currentStep, className = "" }: CartFlowHeaderProps) {
  return (
    <div className={`cart-flow-header ${className}`}>
      <div className="cart-header">
        <div id="cartNav" className="cart-nav">
          <div className="cart-nav-wrap">
            {STEPS.map(({ step, label, href }) => {
              const isActive = currentStep === step;
              const isPast =
                STEPS.findIndex((s) => s.step === currentStep) >
                STEPS.findIndex((s) => s.step === step);
              return (
                <span key={step} className="ct-wrp">
                  {isPast ? (
                    <span className="ct-icon">
                      <i className="fa fa-check" />
                    </span>
                  ) : isActive ? (
                    <span className="circ" />
                  ) : (
                    <span className="circ_blan" />
                  )}
                  <a href={href}>{label}</a>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
