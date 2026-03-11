"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { CartState } from "@/types/cart";
import { defaultCartState } from "@/lib/defaultCartState";
import { COPY } from "@/config/copy";

type CartContextValue = {
  openCart: () => void;
  closeCart: () => void;
  cartState: CartState;
  setCartState: (state: CartState | ((prev: CartState) => CartState)) => void;
  showCartToast: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within SiteShell");
  }
  return ctx;
}

const TOAST_DURATION_MS = 2500;

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isCartPage = pathname === "/Home/Cart";

  const [cartState, setCartState] = useState<CartState>(defaultCartState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showCartToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const openCartFlow = useCallback(() => {
    router.push("/Home/CartEntry");
  }, [router]);

  const cartContextValue: CartContextValue = {
    openCart: openCartFlow,
    closeCart: () => {},
    cartState,
    setCartState,
    showCartToast,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {/* Cart summary toast */}
      {toastMessage && (
        <div className="cart-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className={`page-header${isCartPage ? " page-header--immersive" : ""}`}>
        <div className="header-wrap">
          <div className="nf-header">
            <a
              href="/Home/ViewIndex"
              className="nf-logo"
              aria-label="Nature Fit home"
            >
              <img
                className="site-logo"
                src="/nature-fit/logo-primary.jpg"
                alt="Nature Fit logo"
              />
            </a>

            <nav className="nf-nav nf-nav-desktop" aria-label="Main navigation">
              <a href="/Home/OurStory">Our Story</a>
              <a href="/Home/Contact">Contact</a>
            </nav>

            <div className="nf-actions">
              <button
                type="button"
                className="order-btn"
                onClick={openCartFlow}
              >
                Start your plan
              </button>

              <button
                type="button"
                className="nf-mobile-toggle"
                aria-label="Toggle navigation"
                aria-expanded={isMobileNavOpen}
                onClick={() => setIsMobileNavOpen((open) => !open)}
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`nf-mobile-nav ${
            isMobileNavOpen ? "nf-mobile-nav--open" : ""
          }`}
        >
          <nav aria-label="Mobile navigation">
            <a href="/Home/OurStory">Our Story</a>
            <a href="/Home/Contact">Contact</a>
          </nav>

          <div className="nf-mobile-cta">
            <button
              type="button"
              className="primary-btn"
              onClick={openCartFlow}
            >
              Start your plan
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      {children}

      {/* Footer */}
      <footer className={`footer${isCartPage ? " footer--immersive" : ""}`}>
        <div className="container-fluid">
          <div className="footer-panel">
            <div className="footer-hero">
              <p className="footer-kicker">YOUR DAILY RITUAL</p>
              <h2>
                Every meal is more than food — it&apos;s your{" "}
                <span>Nature Fit ritual.</span>
              </h2>
              <button
                type="button"
                className="primary-btn footer-order-btn"
                onClick={openCartFlow}
              >
                Start your plan
              </button>
            </div>

            <div className="footer-columns">
              <div className="ftr_desc">
                <div className="ftr_logo">
                  <img
                    className="site-logo"
                    src="/nature-fit/logo-primary.jpg"
                    alt="Nature Fit logo"
                  />
                </div>
              </div>

              <div className="ftr_point">
                <h3>Explore</h3>
                <ul>
                  <li>
                    <a href="/Home/OurStory">Our Story</a>
                  </li>
                  <li>
                    <a href="/home/Contact">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="ftr_point">
                <h3>Policies</h3>
                <ul>
                  <li>
                    <a href="/Home/PrivacyPolicy">Privacy</a>
                  </li>
                  <li>
                    <a href="/Home/TermsOfService">Terms of Service</a>
                  </li>
                  <li>
                    <a href="/Home/Shipping">Shipping</a>
                  </li>
                  <li>
                    <a href="/Home/Refunds">Refunds</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="copyright">
              <p>{COPY.footerCopyright}</p>
            </div>

            <div className="made-with-love">
              <p>
                Made with <span className="love-heart" aria-label="love">❤️</span> by{" "}
                <img src="/wlogo.svg" alt="WellnessZ" className="wellnessz-logo-inline" />{" "}
                in India <span aria-label="India flag">🇮🇳</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </CartContext.Provider>
  );
}

