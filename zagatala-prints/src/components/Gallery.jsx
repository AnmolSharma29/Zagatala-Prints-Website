import { useState, useEffect, useCallback } from "react";

const TOTAL_IMAGES = 19;
const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  id: i + 1,
  src: `/images/image-${i + 1}.png`,
  alt: `Project ${i + 1}`,
}));

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [loaded, setLoaded] = useState({});

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const goNext = useCallback(() => {
    if (lightbox !== null) setLightbox((prev) => (prev + 1) % images.length);
  }, [lightbox]);

  const goPrev = useCallback(() => {
    if (lightbox !== null)
      setLightbox((prev) => (prev - 1 + images.length) % images.length);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, goNext, goPrev]);

  const handleImageLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <style>{`
        .zp-gallery-section {
          padding: 80px 0 100px;
          background: #ffffff;
          position: relative;
        }

        .zp-gallery-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .zp-gallery-label {
          display: block;
          text-align: center;
          margin-bottom: 16px;
        }

        .zp-gallery-label span {
          display: inline-block;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #5B2D8E;
          border: 1.5px solid #5B2D8E;
          border-radius: 30px;
          padding: 8px 24px;
        }

        .zp-gallery-title {
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          font-size: 40px;
          font-weight: 700;
          text-align: center;
          color: #1a1a2e;
          margin: 0 0 12px;
        }

        .zp-gallery-subtitle {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          font-size: 15px;
          color: #71717a;
          text-align: center;
          max-width: 480px;
          margin: 0 auto 48px;
          line-height: 1.6;
        }

        .zp-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .zp-gallery-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #f0eaf6;
          aspect-ratio: 4 / 3;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .zp-gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(91, 45, 142, 0.18);
        }

        .zp-gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .zp-gallery-card img.loaded {
          opacity: 1;
        }

        .zp-gallery-card .zp-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #a78bba;
          transition: opacity 0.4s ease;
        }

        .zp-gallery-card .zp-placeholder.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .zp-gallery-card .zp-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 50%,
            rgba(91, 45, 142, 0.7) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }

        .zp-gallery-card:hover .zp-overlay {
          opacity: 1;
        }

        .zp-overlay-icon {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
        }

        /* Lightbox */
        .zp-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(10, 5, 20, 0.92);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: zp-fadeIn 0.25s ease;
        }

        @keyframes zp-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .zp-lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
          animation: zp-scaleIn 0.3s ease;
        }

        @keyframes zp-scaleIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .zp-lightbox-content img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 12px;
          display: block;
        }

        .zp-lightbox-close {
          position: fixed;
          top: 20px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 22px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
          z-index: 10;
        }

        .zp-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .zp-lightbox-nav {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
          z-index: 10;
        }

        .zp-lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .zp-lightbox-prev {
          left: 20px;
        }

        .zp-lightbox-next {
          right: 20px;
        }

        .zp-lightbox-counter {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Inter', 'Segoe UI', sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          z-index: 10;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .zp-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .zp-gallery-title {
            font-size: 32px;
          }
        }

        @media (max-width: 540px) {
          .zp-gallery-section {
            padding: 60px 0 72px;
          }
          .zp-gallery-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .zp-gallery-title {
            font-size: 26px;
          }
          .zp-gallery-subtitle {
            font-size: 14px;
          }
          .zp-lightbox-nav {
            width: 40px;
            height: 40px;
          }
          .zp-lightbox-prev {
            left: 10px;
          }
          .zp-lightbox-next {
            right: 10px;
          }
        }
      `}</style>

      <section className="zp-gallery-section" id="portfolio">
        <div className="zp-gallery-container">
          <div className="zp-gallery-label">
            <span>PORTFOLIO</span>
          </div>
          <h2 className="zp-gallery-title">Our Work Gallery</h2>
          <p className="zp-gallery-subtitle">
            Browse through our recent projects — each one crafted with care,
            precision, and a touch of creativity.
          </p>

          <div className="zp-gallery-grid">
            {images.map((image, index) => (
              <div
                className="zp-gallery-card"
                key={image.id}
                onClick={() => openLightbox(index)}
              >
                <div
                  className={`zp-placeholder ${
                    loaded[image.id] ? "hidden" : ""
                  }`}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={loaded[image.id] ? "loaded" : ""}
                  onLoad={() => handleImageLoad(image.id)}
                />
                <div className="zp-overlay">
                  <div className="zp-overlay-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="zp-lightbox-overlay" onClick={closeLightbox}>
          <button
            className="zp-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            className="zp-lightbox-nav zp-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div
            className="zp-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightbox].src}
              alt={images[lightbox].alt}
            />
          </div>
          <button
            className="zp-lightbox-nav zp-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="zp-lightbox-counter">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}