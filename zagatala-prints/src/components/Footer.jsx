import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const BRAND_COLOR = "#512a97";
const BRAND_LIGHT = "#6b3fc4";
const BG_COLOR = "#f7f5fa";

export default function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: BG_COLOR,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        .nav-link {
          position: relative;
          letter-spacing: 0.08em;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2.5px;
          background: #fff;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: #fff;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        .hamburger-line {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger-active .hamburger-line {
          background: rgba(255, 255, 255, 0.7);
        }
        .hamburger-active .hamburger-line:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger-active .hamburger-line:nth-child(2) {
          opacity: 0;
        }
        .hamburger-active .hamburger-line:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .mobile-nav {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-nav.open {
          max-height: 320px;
        }

        .cta-btn {
          background: #fff;
          color: ${BRAND_COLOR};
          transition: background 0.3s ease, transform 0.2s ease;
          text-decoration: none;
        }
        .cta-btn:hover {
          background: rgba(255, 255, 255, 0.85);
          transform: translateY(-1px);
        }

        .mobile-link {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .mobile-link:hover {
          color: #fff;
        }

        .logo-img {
          transition: transform 0.3s ease;
        }
        .logo-group:hover .logo-img {
          transform: scale(1.05);
        }

        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.3s ease, transform 0.25s ease;
        }
        .social-icon:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }
        .social-icon svg {
          width: 18px;
          height: 18px;
          fill: #fff;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #fff;
        }
      `}</style>

      {/* ========== HEADER ========== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(81, 42, 151, 0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0, 0, 0, 0.25)"
            : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div
          style={{ maxWidth: 1280, margin: "0 auto" }}
          className="px-5 sm:px-8 lg:px-12"
        >
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* LOGO */}
            <a
              href="#"
              className="logo-group flex items-center"
              style={{ textDecoration: "none" }}
            >
              <img
                src="/LOQOM-2026-AĞ.png"
                alt="Zagatala Prints Logo"
                className="logo-img h-10 sm:h-12 lg:h-14 w-auto"
              />
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-12">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link font-semibold text-sm lg:text-[0.9rem] uppercase"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#quote"
                className="cta-btn ml-2 px-6 py-2.5 text-sm font-semibold uppercase rounded-full"
                style={{ letterSpacing: "0.06em" }}
              >
                Get a Quote
              </a>
            </nav>

            {/* HAMBURGER */}
            <button
              className={`md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors ${
                menuOpen ? "hamburger-active" : ""
              }`}
              style={{
                gap: 6,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div
          className={`mobile-nav md:hidden ${menuOpen ? "open" : ""}`}
          style={{
            borderTop: menuOpen
              ? "1px solid rgba(255, 255, 255, 0.15)"
              : "none",
          }}
        >
          <div
            className="px-5 sm:px-8 py-2"
            style={{ maxWidth: 1280, margin: "0 auto" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-link block py-3.5 font-semibold text-sm uppercase"
                style={{
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#quote"
              className="cta-btn block mt-4 mb-3 px-5 py-3 text-sm text-center font-semibold uppercase rounded-full"
              style={{ letterSpacing: "0.06em" }}
              onClick={() => setMenuOpen(false)}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </header>

      {/* SPACER */}
      <div className="h-16 sm:h-20 lg:h-24" />

      {/* ========== FOOTER ========== */}
      <footer
        style={{
          background: BRAND_COLOR,
        }}
      >
        {/* Main footer content */}
        <div
          className="px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16"
          style={{ maxWidth: 1280, margin: "0 auto" }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-8">

            {/* LEFT — Logo */}
            <div className="flex flex-col items-center md:items-start">
              <a href="#" style={{ textDecoration: "none" }}>
                <img
                  src="/LOQOM-2026-AĞ.png"
                  alt="Zagatala Prints Logo"
                  className="h-12 sm:h-14 lg:h-16 w-auto"
                  style={{ filter: "brightness(1.1)" }}
                />
              </a>
              <p
                className="mt-4 text-sm text-center md:text-left"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: 260,
                  lineHeight: 1.6,
                }}
              >
                Premium printing solutions for all your creative and business needs.
              </p>
            </div>

            {/* RIGHT — Details */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-20">

              {/* Address & Phone */}
              <div className="flex flex-col items-center sm:items-start gap-5">
                <h4
                  className="text-xs font-bold uppercase"
                  style={{
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Contact
                </h4>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 flex-shrink-0"
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="rgba(255,255,255,0.6)"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}
                  >
                    Yuxari Tala, Zaqatala,<br />
                    Zaqatala - AZ6239
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <svg
                    className="flex-shrink-0"
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="rgba(255,255,255,0.6)"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a
                    href="tel:+994559087883"
                    className="footer-link text-sm"
                  >
                    +994 70 908 78 83
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex flex-col items-center sm:items-start gap-5">
                <h4
                  className="text-xs font-bold uppercase"
                  style={{
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Follow Us
                </h4>
                <div className="flex items-center gap-3">

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/zagatalaprints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/zagatala_prints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="#fff" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" stroke="none"/>
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@zagatala_prints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.22V9.4a8.16 8.16 0 0 0 4.84 1.58V7.53a4.84 4.84 0 0 1-1-.84z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@zagatala_prints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="YouTube"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="${BRAND_COLOR}" />
                    </svg>
                  </a>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ maxWidth: 1280, margin: "0 auto" }}
          >
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em" }}
            >
              &copy; {new Date().getFullYear()} Zagatala Prints. All rights reserved.
            </p>
            <div className="flex gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link text-xs font-medium uppercase"
                  style={{ letterSpacing: "0.08em" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}