"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { CartState } from "@/types/cart";
import { defaultCartState } from "@/lib/defaultCartState";
import { COPY } from "@/config/copy";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useAuth } from "@/contexts/AuthContext";

type CookieChoice = "accepted" | "rejected" | null;

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
  const { user, isAuthenticated, clearTokens } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogout = useCallback(() => {
    clearTokens();
    router.push("/");
  }, [clearTokens, router]);
  const [cookieChoice, setCookieChoice] = useState<CookieChoice>(null);
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

  // Cookie consent stored in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(
      "cookie_consent",
    ) as CookieChoice;
    if (stored === "accepted" || stored === "rejected") {
      setCookieChoice(stored);
    }
  }, []);

  const handleCookieAccept = useCallback(() => {
    setCookieChoice("accepted");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie_consent", "accepted");
    }
  }, []);

  const handleCookieReject = useCallback(() => {
    setCookieChoice("rejected");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie_consent", "rejected");
    }
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

      {/* Cookie banner */}
      {cookieChoice === null && (
        <div id="cookie-consent-banner" className="cookie-banner">
          <div className="cookie-banner-inner">
            <span style={{ textTransform: "uppercase" }}>
              We use cookies to personalize content and analyze our traffic. You
              can accept or reject non-essential cookies.
            </span>
            <div className="cookie-banner-actions">
              <button
                type="button"
                className="reject-btn"
                onClick={handleCookieReject}
              >
                Reject
              </button>
              <button
                type="button"
                className="accept-btn"
                onClick={handleCookieAccept}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="page-header">
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
              <a href="/Home/Program">Programs</a>
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

              {isAuthenticated && user ? (
                <>
                  <a
                    href="/Home/Account"
                    className="nav-link-account"
                    title="Account settings"
                  >
                    Account
                  </a>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <a href="/Home/Registration" id="login">
                  Register / Sign In
                </a>
              )}

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
            <a href="/Home/Program">Programs</a>
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

            {isAuthenticated && user ? (
              <>
                <a
                  href="/Home/Account"
                  className="nav-link-account"
                  title="Account settings"
                >
                  Account
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Log out
                </button>
              </>
            ) : (
              <a
                href="/Home/Registration"
                className="primary-btn nf-mobile-auth"
              >
                Register / Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Page content */}
      {children}

      {/* Join the community marquee */}
      <div className="join_com" aria-hidden="true">
        <div className="scroll-content">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index}>{COPY.joinMarquee}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
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

            <div className="row footer-columns">
              <div className="col-md-3">
                <div className="ftr_desc">
                  <div className="ftr_logo">
                    <img
                      className="site-logo"
                      src="/nature-fit/logo-primary.jpg"
                      alt="Nature Fit logo"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="ftr_point">
                  <h3>Explore</h3>
                  <ul>
                    <li>
                      <a href="/Home/Program">Programs</a>
                    </li>
                    <li>
                      <a href="/Home/OurStory">Our Story</a>
                    </li>
                    <li>
                      <a href="/home/Contact">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3">
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

              <div className="col-md-3">
                <div className="ftr_point ftr_join">
                  <h3 id="footer-join-title">{COPY.footerJoinTitle}</h3>
                  <p>{COPY.footerJoinSubtitle}</p>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social"
                  >
                    <i className="bi bi-instagram" aria-hidden="true" />
                    <span>Follow on Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="copyright">
              <p>{COPY.footerCopyright}</p>
            </div>
          </div>
        </div>
      </footer>

    </CartContext.Provider>
  );
}

