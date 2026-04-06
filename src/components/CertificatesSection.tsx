import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const certificates = [
  {
    id: 1,
    image: "/images/e-cert-1.png",
    title: "Certificate 1",
  },
  {
    id: 2,
    image: "/images/e-cert-2.png",
    title: "Certificate 2",
  },
  {
    id: 3,
    image: "/images/e-cert-3.png",
    title: "Certificate 3",
  },
  {
    id: 4,
    image: "/images/e-cert-4.png",
    title: "Certificate 4",
  },
];

const CertificatesSection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const activeCert = certificates.find((c) => c.id === lightbox);

  const goNext = () => {
    if (lightbox === null) return;
    const idx = certificates.findIndex((c) => c.id === lightbox);
    const next = certificates[(idx + 1) % certificates.length];
    setLightbox(next.id);
  };

  const goPrev = () => {
    if (lightbox === null) return;
    const idx = certificates.findIndex((c) => c.id === lightbox);
    const prev = certificates[(idx - 1 + certificates.length) % certificates.length];
    setLightbox(prev.id);
  };

  return (
    <>
      <section id="certificates" className="relative h-screen bg-card py-16 px-8 md:px-16 flex flex-col overflow-hidden">
        <div className="absolute left-8 md:left-16 top-16 section-number">
          .04
        </div>

        <div className="absolute right-8 md:right-16 top-16">
          <span className="subtitle-text">Certificates</span>
        </div>

        <div className="max-w-5xl mx-auto w-full pt-20 flex flex-col h-full">
          {/* Header */}
          <div
            ref={headerRef}
            className={`mb-6 scroll-fade-up ${headerVisible ? "visible" : ""}`}
          >
            <h2 className="heading-display text-2xl md:text-3xl mb-2">
              E-CERTIFICATES
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
              A collection of certifications and achievements earned through
              continuous learning and professional development.
            </p>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className={`grid grid-cols-2 gap-4 flex-1 min-h-0 scroll-fade-up ${gridVisible ? "visible" : ""}`}
          >
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                onClick={() => openLightbox(cert.id)}
                className="group relative bg-secondary rounded-lg overflow-hidden cursor-pointer border border-border hover:border-foreground/30 transition-all duration-500 flex flex-col"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Certificate image */}
                <div className="relative overflow-hidden flex-1 min-h-0">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-foreground"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span className="text-foreground text-xs tracking-[0.2em] uppercase">View</span>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="px-3 py-2 flex items-center justify-between flex-shrink-0">
                  <span className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
                    {cert.title}
                  </span>
                  <span className="text-muted-foreground/40 text-xs font-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Lightbox */}
      {lightbox !== null && activeCert && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors text-xs tracking-[0.2em] uppercase flex items-center gap-2"
            >
              Close
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={activeCert.image}
              alt={activeCert.title}
              className="w-full rounded-lg shadow-2xl"
            />

            {/* Nav arrows */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {certificates.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setLightbox(c.id)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    c.id === lightbox ? "bg-foreground w-4" : "bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificatesSection;