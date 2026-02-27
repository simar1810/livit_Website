"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CookieChoice = "accepted" | "rejected" | null;

type CartContextValue = {
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within SiteShell");
  }
  return ctx;
}

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cookieChoice, setCookieChoice] = useState<CookieChoice>(null);

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
  };

  return (
    <CartContext.Provider value={cartContextValue}>
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
            <a className="top_tag">Announce Something Here</a>
          </div>
          <div className="bottom-header">
            <div className="warp_desktop">
              <nav>
                <div className="nav-container">
                  <div className="logo">
                    <a className="navbar-brand" href="/Home/ViewIndex">
                      <img
                        src="https://livit.ae/WebAssets/img/logo.png"
                        alt="Livit logo"
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
                    <a href="/Home/Registration" id="login">
                      Register / Sign In
                    </a>
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
                            src="https://livit.ae/WebAssets//img/logo.png"
                            alt="Livit logo"
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
                      src="https://livit.ae/WebAssets/img/logo.png"
                      alt="Livit logo"
                    />
                  </a>
                  <a className="pro_f" href="/Home/Registration">
                    <img
                      src="https://livit.ae/WebAssets/img/pro.png"
                      alt="Profile"
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
      <div className="join_com">
        <div className="scroll-content">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index}>join the community</span>
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
                    src="https://livit.ae/WebAssets/img/logo.png"
                    alt="Livit Logo"
                  />
                </div>
                <p>
                  EVERY MEAL IS MORE THAN FOOD,
                  <br />
                  IT’S YOUR DAILY RITUAL.
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
                <h3>JOIN OUR COMMUNITY</h3>
                <p>
                  BE THE FIRST TO KNOW WHEN WE UNVEIL YOUR NEW DAILY RITUAL.
                </p>
                <form>
                  <div className="form_group">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                    <div className="btn_center">
                      <button type="submit">Join Now</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© LIVIT 2025</p>
        </div>
      </footer>

      {/* Emirates offcanvas */}
      <div
        id="cartOffcanvas"
        className={`custom-cart-offcanvas ${isCartOpen ? "active" : ""}`}
      >
        <div className="cart-content">
          <div className="cart-content-ed">
            <div className="cart-header_ad">
              <span>Emirates</span>
              <button
                type="button"
                onClick={closeCartOffcanvas}
                className="close-cart-btn"
              >
                <i className="fa fa-times" />
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
                <h3
                  key={em}
                  className="emirate-card"
                  onClick={() => handleEmirateClick(em)}
                >
                  {em}
                </h3>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}

