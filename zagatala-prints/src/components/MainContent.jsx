import SocialMedia from "./SocialMedia";
import { useState, useEffect, useRef } from "react";
import Banner from "./Banner";

// --- Intersection Observer Hook ---
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.unobserve(el); } },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, isInView];
}

// --- Animated wrapper ---
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, isInView] = useInView();
  const transforms = { up: "translateY(48px)", down: "translateY(-48px)", left: "translateX(48px)", right: "translateX(-48px)", scale: "scale(0.92)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0,0) scale(1)" : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// --- Icon Components ---
const icons = {
  commercial: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
      <rect x="6" y="12" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 19h36" stroke="currentColor" strokeWidth="2.5" />
      <rect x="12" y="24" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M28 25h8M28 29h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  event: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
      <path d="M12 8v6M36 8v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="6" y="12" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 20h36" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="18" cy="28" r="2.5" fill="currentColor" />
      <circle cx="30" cy="28" r="2.5" fill="currentColor" />
      <circle cx="24" cy="34" r="2.5" fill="currentColor" />
    </svg>
  ),
  packaging: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
      <path d="M24 6L42 16v16L24 42 6 32V16L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 22v20M6 16l18 6 18-6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M15 11l18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  sticker: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 8a16 16 0 0 1 16 16H24V8z" fill="currentColor" opacity="0.15" />
      <path d="M18 22l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  office: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
      <rect x="8" y="6" width="24" height="36" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 6c0-1.1.9-2 2-2h20a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 16h12M14 22h12M14 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 18h6a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2h-6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="35" cy="28" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  cnc: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
      <rect x="8" y="8" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M24 16v-4M24 36v-4M16 24h-4M36 24h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  ),
  souvenir: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
      <path d="M24 6l4 10h10l-8 6 3 10-9-6-9 6 3-10-8-6h10l4-10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

const services = [
  { icon: "commercial", title: "Commercial Printing", desc: "Business cards (Vizitkart), high-quality lamination, and custom menus for restaurants & cafes." },
  { icon: "event", title: "Event Stationery", desc: "Personalized designs for weddings, engagements (Nişan), birthdays, and Henna (Xına) ceremonies." },
  { icon: "packaging", title: "Custom Packaging", desc: "Branded candy wrappers (Konfet kağızları) and product labels tailored to your brand." },
  { icon: "sticker", title: "Stickers & Decals", desc: "Custom-shaped stickers and vinyl labels for any purpose." },
  { icon: "office", title: "Office Supplies", desc: "Spiral-bound notebooks and personalized planners for professionals." },
  { icon: "cnc", title: "CNC Laser-Cutting & Engraving", desc: "High-precision work on wood, acrylic, and other materials." },
  { icon: "souvenir", title: "Artisanal Souvenirs", desc: "Authentic 3D models and souvenirs representing our local culture and landmarks." },
];

// const galleryItems = Array.from({ length: 19 }, (_, i) => (
//   {
//   id: i + 1,
//   src: `src/gallery/image-${i + 1}.png`,
//   caption: `Gallery Image ${i + 1}`,
// }
// ));

// const galleryItems = [
//   { id: 1,  src: "https://github.com/AnmolSharma29/Zagatala-Prints-Website/blob/main/zagatala-prints/public/images/image-1.png",   caption: "Premium Business Cards" },
//   { id: 2,  src: "/images/image-2.png",    caption: "Wedding Invitation Design" },
//   { id: 4,  src: "/images/image-4.png",     caption: "Custom Candy Wrappers" },
//   { id: 5,  src: "/images/image-5.png",     caption: "Custom Candy Wrappers" },
//   { id: 6,  src: "/images/image-6.png",     caption: "Custom Candy Wrappers" },
//   { id: 7,  src: "/images/image-7.png",     caption: "Custom Candy Wrappers" },
//   { id: 8,  src: "/images/image-8.png",     caption: "Custom Candy Wrappers" },
//   { id: 9,  src: "/images/image-9.png",     caption: "Custom Candy Wrappers" },
//   { id: 10,  src: "/images/image-10.png",     caption: "Custom Candy Wrappers" },
//   { id: 11,  src: "/images/image-11.png",     caption: "Custom Candy Wrappers" },
//   { id: 12,  src: "/images/image-12.png",     caption: "Custom Candy Wrappers" },
//   { id: 13,  src: "/images/image-13.png",     caption: "Custom Candy Wrappers" },
//   { id: 14,  src: "/images/image-14.png",     caption: "Custom Candy Wrappers" },
//   { id: 15,  src: "/images/image-15.png",     caption: "Custom Candy Wrappers" },
//   { id: 16,  src: "/images/image-16.png",     caption: "Custom Candy Wrappers" },
//   { id: 17,  src: "/images/image-17.png",     caption: "Custom Candy Wrappers" },
//   { id: 18,  src: "/images/image-18.png",     caption: "Custom Candy Wrappers" },
//   { id: 19, src: "/images/image-19.png",          caption: "Artisanal Souvenir" },
// ];

// --- CSS Keyframes injected once ---
const styleId = "zagatala-main-styles";

function injectStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes pulse-ring {
      0% { transform: scale(1); opacity: 0.4; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes grain {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-2%, -2%); }
      30% { transform: translate(1%, -3%); }
      50% { transform: translate(-1%, 2%); }
      70% { transform: translate(3%, 1%); }
      90% { transform: translate(-3%, 3%); }
    }

    .zp-service-card:hover .zp-service-icon {
      transform: scale(1.12) rotate(-3deg);
      background: rgba(255,255,255,0.25) !important;
    }
    .zp-service-card:hover {
      transform: translateY(-6px) !important;
      box-shadow: 0 20px 60px rgba(78, 36, 138, 0.25) !important;
    }
    .zp-gallery-item:hover img {
      transform: scale(1.08);
    }
    .zp-gallery-item:hover .zp-gallery-overlay {
      opacity: 1;
    }
    .zp-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(78, 36, 138, 0.4);
    }
    .zp-stat-num {
      background: linear-gradient(135deg, #FFD700, #FFA500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;
  document.head.appendChild(style);
}

// ============== MAIN COMPONENT ==============
export default function MainContent() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { injectStyles(); }, []);

  // const filteredGallery = galleryItems;

  return (
    <main style={{fontFamily: "'DM Sans', sans-serif", color: "#1a1a2e", overflow: "hidden" }}>

      <SocialMedia></SocialMedia>
      <Banner></Banner>
      {/* =================== SERVICES SECTION =================== */}
      <section style={{
        padding: "100px 0 80px",
        background: "linear-gradient(170deg, #4E248A 0%, #6B35B5 40%, #7B42C9 100%)",
        position: "relative",
      }}>
        {/* Grain overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }} />
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{
                display: "inline-block",
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#FFD700",
                marginBottom: 16,
                padding: "6px 20px",
                borderRadius: 100,
                border: "1px solid rgba(255,215,0,0.3)",
                background: "rgba(255,215,0,0.08)",
              }}>What We Do</span>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                color: "#fff",
                margin: "16px 0",
                lineHeight: 1.15,
              }}>Our Services</h2>
              <p style={{
                fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7,
              }}>
                From business essentials to artisanal keepsakes — we bring your vision to life with precision and craft.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: 24,
          }}>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={0.08 * i} direction="up">
                <div className="zp-service-card" style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 20,
                  padding: "36px 28px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                  cursor: "default",
                  height: "100%",
                }}>
                  <div className="zp-service-icon" style={{
                    width: 64, height: 64, borderRadius: 16,
                    background: "rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#FFD700",
                    marginBottom: 20,
                    transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                  }}>
                    {icons[s.icon]}
                  </div>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 10,
                  }}>{s.title}</h3>
                  <p style={{
                    fontSize: 14.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0,
                  }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =================== ABOUT US SECTION =================== */}
      <section style={{
        padding: "100px 0",
        background: "#FAFAFA",
        position: "relative",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: 60,
            alignItems: "center",
          }}>
            {/* Left - Visual */}
            <Reveal direction="right">
              <div style={{ position: "relative" }}>
                <div style={{
                  background: "linear-gradient(135deg, #4E248A, #7B42C9)",
                  borderRadius: 24,
                  padding: 40,
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}>
                  {/* Decorative pattern */}
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.07) 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                  }} />
                  {/* Large decorative text */}
                  <div style={{
                    position: "absolute", top: 24, left: 28,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(80px, 12vw, 140px)",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.06)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}>ZP</div>

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: "auto",
                    }}>
                      {[
                        { num: "8+", label: "Years Experience" },
                        { num: "2K+", label: "Happy Clients" },
                        { num: "15K+", label: "Projects Done" },
                        { num: "100%", label: "Satisfaction" },
                      ].map((stat, i) => (
                        <Reveal key={stat.label} delay={0.1 * i} direction="scale">
                          <div style={{
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(8px)",
                            borderRadius: 16,
                            padding: "20px 16px",
                            textAlign: "center",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}>
                            <div className="zp-stat-num" style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: 32, fontWeight: 800,
                            }}>{stat.num}</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4, fontWeight: 500 }}>
                              {stat.label}
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right - Text */}
            <Reveal direction="left">
              <div>
                <span style={{
                  display: "inline-block",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13, fontWeight: 600, letterSpacing: 3,
                  textTransform: "uppercase", color: "#4E248A",
                  marginBottom: 16, padding: "6px 20px",
                  borderRadius: 100, border: "1px solid rgba(78,36,138,0.2)",
                  background: "rgba(78,36,138,0.06)",
                }}>About Us</span>

                <h2 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 800, color: "#1a1a2e",
                  margin: "16px 0 24px", lineHeight: 1.2,
                }}>
                  Crafting Print Excellence in <span style={{ color: "#4E248A" }}>Azerbaijan</span>
                </h2>

                <p style={{
                  fontSize: 16, color: "#555", lineHeight: 1.85, marginBottom: 20,
                }}>
                  Based in the heart of Zaqatala, Azerbaijan, <strong>Zagatala Prints</strong> is a full-service printing shop dedicated to delivering premium-quality print solutions for businesses, events, and personal projects.
                </p>
                <p style={{
                  fontSize: 16, color: "#555", lineHeight: 1.85, marginBottom: 20,
                }}>
                  We specialize in a wide range of printing services — from commercial essentials like business cards and lamination, to bespoke event stationery for weddings and celebrations. Our expertise extends to custom packaging, CNC laser-cutting, and handcrafted artisanal souvenirs that celebrate our rich local heritage.
                </p>
                <p style={{
                  fontSize: 16, color: "#555", lineHeight: 1.85, marginBottom: 32,
                }}>
                  With years of experience and a passion for precision, we combine modern technology with creative craftsmanship to bring your ideas to life — every detail, every time.
                </p>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {["Precision Printing", "Fast Turnaround", "Custom Designs", "Eco-Friendly Options"].map((tag) => (
                    <span key={tag} style={{
                      padding: "8px 18px", borderRadius: 100,
                      background: "rgba(78,36,138,0.08)",
                      color: "#4E248A", fontSize: 13, fontWeight: 600,
                      fontFamily: "'Outfit', sans-serif",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


    </main>
  );
}