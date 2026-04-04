import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const BRAND_COLOR = "#512a97";
const BRAND_LIGHT = "#6b3fc4";
const BG_COLOR = "#f7f5fa";

export default function MainContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);

  // ——— Instagram Graph API ———
  // Replace with your long-lived access token from Meta Developer portal
  const INSTAGRAM_TOKEN = "YOUR_INSTAGRAM_ACCESS_TOKEN";
  const POST_COUNT = 12;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (INSTAGRAM_TOKEN === "YOUR_INSTAGRAM_ACCESS_TOKEN") {
      // Demo mode — show placeholder grid
      setLoading(false);
      setError(true);
      return;
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${POST_COUNT}&access_token=${INSTAGRAM_TOKEN}`
        );
        const data = await res.json();
        if (data.data) {
          setPosts(
            data.data.filter(
              (p) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM" || p.media_type === "VIDEO"
            )
          );
        }
      } catch (err) {
        console.error("Instagram fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: BG_COLOR,
        minHeight: "100vh",
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

        .ig-card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 1;
          cursor: pointer;
          background: #e9e5f0;
        }
        .ig-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ig-card:hover img {
          transform: scale(1.08);
        }
        .ig-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 40%, rgba(81, 42, 151, 0.85) 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }
        .ig-card:hover .ig-overlay {
          opacity: 1;
        }

        .ig-placeholder {
          aspect-ratio: 1;
          border-radius: 12px;
          background: linear-gradient(135deg, #e9e5f0 0%, #d6cfe6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .ig-placeholder::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .ig-section-line {
          width: 60px;
          height: 3px;
          border-radius: 3px;
          background: ${BRAND_COLOR};
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

      {/* ========== INSTAGRAM FEED SECTION ========== */}
      <section
        className="px-5 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24"
        style={{ maxWidth: 1280, margin: "0 auto" }}
      >
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="ig-section-line mb-5" />
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#1a1a1a",
              letterSpacing: "0.04em",
            }}
          >
            Follow Us on Instagram Anmol
          </h2>
          <a
            href="https://www.instagram.com/zagatala_prints"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-sm font-semibold"
            style={{
              color: BRAND_COLOR,
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            @zagatala_prints
          </a>
        </div>

        {/* Posts grid */}
        {loading ? (
          /* Loading skeleton */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="ig-placeholder" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          /* Live posts */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="ig-card"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <img
                  src={
                    post.media_type === "VIDEO"
                      ? post.thumbnail_url
                      : post.media_url
                  }
                  alt={post.caption ? post.caption.slice(0, 80) : "Instagram post"}
                  loading="lazy"
                />
                <div className="ig-overlay">
                  <p
                    className="text-xs sm:text-sm"
                    style={{
                      color: "#fff",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.caption || "View on Instagram"}
                  </p>
                </div>
                {/* Video indicator */}
                {post.media_type === "VIDEO" && (
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "rgba(0,0,0,0.5)",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                )}
              </a>
            ))}
          </div>
        ) : (
          /* Placeholder / demo state */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {Array.from({ length: 8 }).map((_, i) => {
              const patterns = [
                { emoji: "🖨️", label: "Business Cards" },
                { emoji: "📋", label: "Brochures" },
                { emoji: "🎨", label: "Posters" },
                { emoji: "📦", label: "Packaging" },
                { emoji: "✉️", label: "Envelopes" },
                { emoji: "📕", label: "Booklets" },
                { emoji: "🏷️", label: "Labels" },
                { emoji: "🖼️", label: "Canvas Prints" },
              ];
              const p = patterns[i % patterns.length];
              return (
                <a
                  key={i}
                  href="https://www.instagram.com/zagatala_prints"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ig-card"
                  style={{
                    background: `linear-gradient(135deg, ${
                      i % 2 === 0
                        ? "rgba(81,42,151,0.08), rgba(81,42,151,0.16)"
                        : "rgba(81,42,151,0.05), rgba(81,42,151,0.12)"
                    })`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = `linear-gradient(135deg, rgba(81,42,151,0.14), rgba(81,42,151,0.24))`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = `linear-gradient(135deg, ${
                      i % 2 === 0
                        ? "rgba(81,42,151,0.08), rgba(81,42,151,0.16)"
                        : "rgba(81,42,151,0.05), rgba(81,42,151,0.12)"
                    })`)
                  }
                >
                  <span style={{ fontSize: 32 }}>{p.emoji}</span>
                  <span
                    className="text-xs sm:text-sm font-semibold"
                    style={{ color: BRAND_COLOR, opacity: 0.7 }}
                  >
                    {p.label}
                  </span>
                </a>
              );
            })}
          </div>
        )}

        {/* Follow button */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <a
            href="https://www.instagram.com/zagatala_prints"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold uppercase"
            style={{
              background: BRAND_COLOR,
              color: "#fff",
              letterSpacing: "0.06em",
              textDecoration: "none",
              transition: "background 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = BRAND_LIGHT;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = BRAND_COLOR;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Instagram icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#fff" strokeWidth="2"/>
              <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="#fff"/>
            </svg>
            Follow @zagatala_prints
          </a>
        </div>
      </section>
    </div>
  );
}