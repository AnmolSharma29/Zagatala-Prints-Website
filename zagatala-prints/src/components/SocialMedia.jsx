import { useEffect, useRef, useState } from "react";

const socials = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/zagatalaprints",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/zagatala_prints",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@zagatala_prints",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-1.99-.43v-.01a4.83 4.83 0 001.99-4.6z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@zagatala_prints",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function SocialMedia() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .zp-social-bar {
          background: linear-gradient(135deg, #4a1a8a 0%, #6b2fb8 50%, #4a1a8a 100%);
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
        }

        .zp-social-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 50%);
          pointer-events: none;
        }

        .zp-social-divider {
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.2);
          flex-shrink: 0;
          opacity: 0;
          transform: scaleY(0);
          transition: all 0.4s ease;
        }

        .zp-social-divider.visible {
          opacity: 1;
          transform: scaleY(1);
          transition-delay: 0.5s;
        }

        .zp-social-links {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .zp-social-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(12px);
          white-space: nowrap;
        }

        .zp-social-link.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .zp-social-link:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .zp-social-link svg {
          flex-shrink: 0;
        }

        .zp-phone-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffd54f;
          text-decoration: none;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 50px;
          background: rgba(255, 213, 79, 0.1);
          border: 1px solid rgba(255, 213, 79, 0.25);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(12px);
          white-space: nowrap;
          letter-spacing: 0.3px;
        }

        .zp-phone-link.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .zp-phone-link:hover {
          background: rgba(255, 213, 79, 0.2);
          border-color: rgba(255, 213, 79, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(255, 213, 79, 0.15);
        }

        .zp-phone-icon {
          width: 18px;
          height: 18px;
          animation: zp-ring 2s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes zp-ring {
          0%, 100% { transform: rotate(0deg); }
          5% { transform: rotate(14deg); }
          10% { transform: rotate(-12deg); }
          15% { transform: rotate(10deg); }
          20% { transform: rotate(-6deg); }
          25% { transform: rotate(0deg); }
        }

        @media (max-width: 640px) {
          .zp-social-bar {
            padding: 16px 16px;
            gap: 10px;
          }
          .zp-social-link {
            padding: 7px 12px;
            font-size: 12px;
            gap: 6px;
          }
          .zp-social-link svg {
            width: 16px;
            height: 16px;
          }
          .zp-phone-link {
            font-size: 13px;
            padding: 7px 14px;
          }
          .zp-social-divider {
            display: none;
          }
          .zp-social-link .zp-social-label {
            display: none;
          }
        }
      `}</style>

      <div className="zp-social-bar" ref={ref}>
        <div className="zp-social-links">
          {socials.map((s, i) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`zp-social-link ${visible ? "visible" : ""}`}
              style={{ transitionDelay: visible ? `${i * 0.1}s` : "0s" }}
              aria-label={s.name}
            >
              {s.icon}
              <span className="zp-social-label">{s.name}</span>
            </a>
          ))}
        </div>

        <div className={`zp-social-divider ${visible ? "visible" : ""}`} />

        <a
          href="tel:+994709087883"
          className={`zp-phone-link ${visible ? "visible" : ""}`}
          style={{ transitionDelay: visible ? "0.5s" : "0s" }}
        >
          <svg
            className="zp-phone-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          +994 70 908 78 83
        </a>
      </div>
    </>
  );
}