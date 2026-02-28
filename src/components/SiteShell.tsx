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
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = useCallback(() => {
    clearTokens();
    router.push("/");
  }, [clearTokens, router]);
  const [cookieChoice, setCookieChoice] = useState<CookieChoice>(null);
  const [cartState, setCartState] = useState<CartState>(defaultCartState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emiratesOffcanvasRef = useFocusTrap(isCartOpen);

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

  const openCartOffcanvas = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCartOffcanvas = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleEmirateClick = useCallback((emirate: string) => {
    if (emirate.toLowerCase() === "dubai") {
      window.location.href = "/Home/Cart";
    }
  }, []);

  const cartContextValue: CartContextValue = {
    openCart: openCartOffcanvas,
    closeCart: closeCartOffcanvas,
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
            <span style={{ fontFamily: "Gothic60", textTransform: "uppercase" }}>
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
          <div className="top-header">
            <a className="top_tag">
              Nature-driven meal plans to fit your day.
            </a>
          </div>
          <div className="bottom-header">
            <div className="warp_desktop">
              <nav>
                <div className="nav-container">
                  <div className="logo">
                    <a className="navbar-brand" href="/Home/ViewIndex">
                      <img
                        className="site-logo"
                        src="/nature-fit/logo-primary.jpg"
                        alt="Nature Fit logo"
                      />
                    </a>
                  </div>
                  <ul className="menu">
                    <li>
                      <a href="/Home/Program">Menu</a>
                    </li>
                    <li>
                      <a href="/Home/OurStory">Our Story</a>
                    </li>
                  </ul>
                  <div className="log_si">
                    {isAuthenticated && user ? (
                      <>
                        <span className="user-name" title={user.email ?? user.phone ?? ""}>
                          {user.name || user.email || "Account"}
                        </span>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="logout-btn"
                          style={{
                            marginLeft: 8,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            font: "inherit",
                            textDecoration: "underline",
                          }}
                        >
                          Log out
                        </button>
                      </>
                    ) : (
                      <a href="/Home/Registration" id="login">
                        Register / Sign In
                      </a>
                    )}
                  </div>
                </div>
              </nav>
            </div>
            <div className="mobile-nv">
              <nav className="navbar">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="offcanvas offcanvas-end"
                    tabIndex={-1}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                  >
                    <div className="offcanvas-header">
                      <div className="logo">
                        <a className="navbar-brand" href="/Home/ViewIndex">
                          <img
                            className="site-logo"
                            src="/nature-fit/logo-primary.jpg"
                            alt="Nature Fit logo"
                          />
                        </a>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <div className="offcanvas-body">
                      <div className="menu-wrapper">
                        <div className="menu-screen main-screen" id="mainMenu">
                          <div className="menu-buttons">
                            <button type="button">
                              Programs
                              <i className="fas fa-angle-right" />
                            </button>
                          </div>
                        </div>
                        <div
                          className="menu-screen dropdown-screen"
                          id="dropdown1"
                        >
                          <div className="dropdown-content">
                            <button className="back-btn" type="button">
                              <i className="fas fa-angle-left" />
                              Programs
                            </button>
                            <div className="option">
                              <a href="/Home/Program">SIGNATURE PROGRAM</a>
                            </div>
                            <div className="option">
                              <a href="#">GUT RESTORE</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="navbar-nav ">
                        <li className="nav-item">
                          <a className="nav-link" href="/Home/OurStory">
                            Our Story
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/Home/Contact">
                            Contact Us
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            Instagram
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a className="navbar-brand" href="/Home/ViewIndex">
                    <img
                      className="site-logo"
                      src="/nature-fit/logo-primary.jpg"
                      alt="Nature Fit logo"
                    />
                  </a>
                  <a
                    className="pro_f"
                    href={isAuthenticated ? "/Home/Registration" : "/Home/Registration"}
                    aria-label={isAuthenticated ? "Profile" : "Register / Sign In"}
                  >
                    <img
                      src="https://livit.ae/WebAssets/img/pro.png"
                      alt={isAuthenticated ? "Profile" : "Register / Sign In"}
                    />
                  </a>
                </div>
              </nav>
            </div>
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
          <div className="row">
            <div className="col-md-4">
              <div className="ftr_desc">
                <div className="ftr_logo">
                  <img
                    className="site-logo"
                    src="/nature-fit/logo-primary.jpg"
                    alt="Nature Fit logo"
                  />
                </div>
                <p>
                  {COPY.footerTaglineLine1}
                  <br />
                  {COPY.footerTaglineLine2}
                </p>
              </div>
              <div
                className="gi_img"
                onClick={openCartOffcanvas}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://livit.ae/WebAssets/img/order-now.gif"
                  alt="Order now"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="ftr_two">
                <div className="ftr_point">
                  <h3>Quick Links</h3>
                  <ul>
                    <li>
                      <a href="/Home/OurStory">OUR STORY</a>
                    </li>
                    <li>
                      <a href="/home/Contact">CONTACT US</a>
                    </li>
                  </ul>
                </div>
                <div className="ftr_point">
                  <h3>POLICIES</h3>
                  <ul>
                    <li>
                      <a href="/Home/PrivacyPolicy">PRIVACY</a>
                    </li>
                    <li>
                      <a href="#">TERMS OF SERVICE</a>
                    </li>
                    <li>
                      <a href="#">SHIPPING</a>
                    </li>
                    <li>
                      <a href="#">REFUNDS</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="ftr_point">
                <h3 id="footer-join-title">{COPY.footerJoinTitle}</h3>
                <p>{COPY.footerJoinSubtitle}</p>
                <form aria-labelledby="footer-join-title">
                  <div className="form_group">
                    <label htmlFor="footer-join-name" className="visually-hidden">Name</label>
                    <input id="footer-join-name" type="text" placeholder="Name" aria-label="Name" />
                    <label htmlFor="footer-join-email" className="visually-hidden">Email</label>
                    <input id="footer-join-email" type="email" placeholder="Email" aria-label="Email" />
                    <div className="btn_center">
                      <button type="submit">{COPY.footerJoinCta}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>{COPY.footerCopyright}</p>
        </div>
      </footer>

      {/* Emirates offcanvas */}
      <div
        id="cartOffcanvas"
        className={`custom-cart-offcanvas ${isCartOpen ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cartOffcanvasTitle"
        aria-hidden={!isCartOpen}
      >
        <div className="cart-content" ref={emiratesOffcanvasRef}>
          <div className="cart-content-ed">
            <div className="cart-header_ad">
              <span id="cartOffcanvasTitle">Emirates</span>
              <button
                type="button"
                onClick={closeCartOffcanvas}
                className="close-cart-btn"
                aria-label="Close Emirates selection"
              >
                <i className="fa fa-times" aria-hidden />
              </button>
            </div>
            <div className="emirates-grid cart-rad">
              {[
                "Dubai",
                "Sharjah",
                "Ajman",
                "Ras Al khaimah",
                "Umm al-quwain",
                "Fujairah",
                "Abu Dhabi",
              ].map((em) => (
                <button
                  key={em}
                  type="button"
                  className="emirate-card"
                  onClick={() => handleEmirateClick(em)}
                  aria-label={`Select ${em}`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}

