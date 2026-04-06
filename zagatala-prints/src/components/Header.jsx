import { useState, useEffect } from "react";
 
const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const BRAND_COLOR = "#512a97";
const BRAND_LIGHT = "#6b3fc4";
const BG_COLOR = "#f7f5fa";
const BG_WHITE = "#ffffff";

function Header(){
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
                    href="https://wa.me/+994709087883"
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
        </div>
    );
}

export default Header