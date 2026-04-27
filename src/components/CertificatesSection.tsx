import { useState, useRef, useCallback, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// ─── Dynamic certificate loader ───────────────────────────────────────────────
// Just drop a new e-cert-N.png into /public/images/e-cert/ and it will
// automatically appear here — no code changes needed.
const certModules = import.meta.glob("/public/images/e-cert/e-cert-*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const certificates = Object.entries(certModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url], index) => {
    const filename = path.split("/").pop() ?? path; // e.g. "e-cert-3.png"
    const num = filename.match(/\d+/)?.[0] ?? String(index + 1);
    return {
      id: index + 1,
      image: url,
      title: `Certificate ${num}`,
    };
  });
// ──────────────────────────────────────────────────────────────────────────────

const SWIPE_THRESHOLD = 50;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const DOUBLE_TAP_DELAY = 300;
const ZOOM_STEP = 2;

function clampPan(
  pan: { x: number; y: number },
  zoom: number,
  containerRef: React.RefObject<HTMLDivElement>
) {
  if (!containerRef.current) return pan;
  const { offsetWidth: w, offsetHeight: h } = containerRef.current;
  const maxX = (w * (zoom - 1)) / 2;
  const maxY = (h * (zoom - 1)) / 2;
  return {
    x: Math.min(maxX, Math.max(-maxX, pan.x)),
    y: Math.min(maxY, Math.max(-maxY, pan.y)),
  };
}

const CertificatesSection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const lastPinchDist = useRef<number | null>(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOrigin = useRef({ x: 0, y: 0 });
  const touchPanStart = useRef<{ x: number; y: number } | null>(null);
  const panOriginTouch = useRef({ x: 0, y: 0 });
  const lastTapTime = useRef(0);
  const lastTapPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [lightbox]);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => {
    setLightbox(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const activeCert = certificates.find((c) => c.id === lightbox);

  const goNext = useCallback(() => {
    if (lightbox === null) return;
    const idx = certificates.findIndex((c) => c.id === lightbox);
    setLightbox(certificates[(idx + 1) % certificates.length].id);
  }, [lightbox]);

  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    const idx = certificates.findIndex((c) => c.id === lightbox);
    setLightbox(certificates[(idx - 1 + certificates.length) % certificates.length].id);
  }, [lightbox]);

  const zoomToPoint = useCallback(
    (newZoom: number, pointX: number, pointY: number, currentZoom: number, currentPan: { x: number; y: number }) => {
      const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));
      const scale = clampedZoom / currentZoom;
      const newPan = {
        x: pointX + (currentPan.x - pointX) * scale,
        y: pointY + (currentPan.y - pointY) * scale,
      };
      return { zoom: clampedZoom, pan: clampPan(newPan, clampedZoom, containerRef) };
    },
    []
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        touchStartX.current = t.clientX;
        isDragging.current = false;

        const now = Date.now();
        const dx = t.clientX - lastTapPos.current.x;
        const dy = t.clientY - lastTapPos.current.y;
        if (now - lastTapTime.current < DOUBLE_TAP_DELAY && Math.hypot(dx, dy) < 40) {
          e.preventDefault();
          const rect = containerRef.current?.getBoundingClientRect();
          const cx = rect ? t.clientX - rect.left - rect.width / 2 : 0;
          const cy = rect ? t.clientY - rect.top - rect.height / 2 : 0;
          setZoom((z) => {
            if (z > 1) { setPan({ x: 0, y: 0 }); return MIN_ZOOM; }
            const result = zoomToPoint(ZOOM_STEP, cx, cy, z, pan);
            setPan(result.pan);
            return result.zoom;
          });
          lastTapTime.current = 0;
        } else {
          lastTapTime.current = now;
          lastTapPos.current = { x: t.clientX, y: t.clientY };
        }

        if (zoom > 1) {
          touchPanStart.current = { x: t.clientX, y: t.clientY };
          panOriginTouch.current = { ...pan };
        }
      } else if (e.touches.length === 2) {
        const t1 = e.touches[0], t2 = e.touches[1];
        lastPinchDist.current = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        touchStartX.current = null;
      }
    },
    [zoom, pan, zoomToPoint]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0], t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const mid = { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
        if (lastPinchDist.current !== null) {
          const scaleDelta = dist / lastPinchDist.current;
          const rect = containerRef.current?.getBoundingClientRect();
          const cx = rect ? mid.x - rect.left - rect.width / 2 : 0;
          const cy = rect ? mid.y - rect.top - rect.height / 2 : 0;
          setZoom((z) => {
            const newZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * scaleDelta));
            setPan((p) => clampPan({ x: cx + (p.x - cx) * scaleDelta, y: cy + (p.y - cy) * scaleDelta }, newZ, containerRef));
            return newZ;
          });
        }
        lastPinchDist.current = dist;
        return;
      }

      if (e.touches.length === 1) {
        const t = e.touches[0];
        if (zoom > 1 && touchPanStart.current) {
          e.preventDefault();
          const dx = t.clientX - touchPanStart.current.x;
          const dy = t.clientY - touchPanStart.current.y;
          setPan(clampPan({ x: panOriginTouch.current.x + dx, y: panOriginTouch.current.y + dy }, zoom, containerRef));
          isDragging.current = true;
          return;
        }
        if (touchStartX.current !== null && Math.abs(t.clientX - touchStartX.current) > 10) {
          isDragging.current = true;
        }
      }
    },
    [zoom]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      lastPinchDist.current = null;
      touchPanStart.current = null;
      if (zoom > 1) { touchStartX.current = null; isDragging.current = false; return; }
      if (touchStartX.current === null || !isDragging.current) { touchStartX.current = null; return; }
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) >= SWIPE_THRESHOLD) dx < 0 ? goNext() : goPrev();
      touchStartX.current = null;
      isDragging.current = false;
    },
    [zoom, goNext, goPrev]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      isPanning.current = true;
      panStart.current = { x: e.clientX, y: e.clientY };
      panOrigin.current = { ...pan };
    },
    [zoom, pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning.current) return;
      setPan(clampPan({ x: panOrigin.current.x + (e.clientX - panStart.current.x), y: panOrigin.current.y + (e.clientY - panStart.current.y) }, zoom, containerRef));
    },
    [zoom]
  );

  const handleMouseUp = useCallback(() => { isPanning.current = false; }, []);

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      const cx = rect ? e.clientX - rect.left - rect.width / 2 : 0;
      const cy = rect ? e.clientY - rect.top - rect.height / 2 : 0;
      setZoom((z) => {
        if (z > 1) { setPan({ x: 0, y: 0 }); return MIN_ZOOM; }
        const result = zoomToPoint(ZOOM_STEP, cx, cy, z, pan);
        setPan(result.pan);
        return result.zoom;
      });
    },
    [pan, zoomToPoint]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      const cx = rect ? e.clientX - rect.left - rect.width / 2 : 0;
      const cy = rect ? e.clientY - rect.top - rect.height / 2 : 0;
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom((z) => {
        const result = zoomToPoint(z * delta, cx, cy, z, pan);
        setPan(result.pan);
        return result.zoom;
      });
    },
    [pan, zoomToPoint]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, goNext, goPrev]);

  // Prevent page scroll while lightbox is open (React's onWheel is passive by default,
  // so e.preventDefault() inside the handler is ignored — we need a native non-passive listener).
  useEffect(() => {
    if (lightbox === null) return;
    const prevent = (e: WheelEvent) => e.preventDefault();
    document.addEventListener("wheel", prevent, { passive: false });
    return () => document.removeEventListener("wheel", prevent);
  }, [lightbox]);

  const isZoomed = zoom > 1;

  return (
    <>
      <section
        id="certificates"
        className="relative bg-card py-24 px-8 md:px-16 flex flex-col"
      >
        <div className="absolute left-8 md:left-16 top-24 section-number">.03</div>
        <div className="absolute right-8 md:right-16 top-24">
          <span className="subtitle-text">Certificates</span>
        </div>

        <div className="max-w-5xl mx-auto w-full pt-32 flex flex-col">
          <div ref={headerRef} className={`mb-4 scroll-fade-up ${headerVisible ? "visible" : ""}`}>
            <h2 className="heading-display text-2xl md:text-3xl mb-2">E-CERTIFICATES</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
              A collection of certifications and achievements earned through continuous learning
              and professional development.
            </p>
          </div>

          <div ref={gridRef} className={`grid grid-cols-2 gap-3 scroll-fade-up ${gridVisible ? "visible" : ""}`}>
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                onClick={() => openLightbox(cert.id)}
                className="group relative bg-secondary rounded-lg overflow-hidden cursor-pointer border border-border hover:border-foreground/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img src={cert.image} alt={cert.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span className="text-foreground text-xs tracking-[0.2em] uppercase">View</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 flex items-center justify-between flex-shrink-0">
                  <span className="text-muted-foreground text-xs tracking-[0.15em] uppercase">{cert.title}</span>
                  <span className="text-muted-foreground/40 text-xs font-light">{String(index + 1).padStart(2, "0")}</span>
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
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={containerRef}
            className="relative max-w-4xl w-full select-none"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isZoomed ? "grab" : "default", touchAction: "none" }}
          >
            {/* Close */}
            <button onClick={closeLightbox} className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors text-xs tracking-[0.2em] uppercase flex items-center gap-2 z-10">
              Close
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Zoom badge */}
            {isZoomed && (
              <div className="absolute -top-10 left-0 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase pointer-events-none">
                {Math.round(zoom * 100)}%
              </div>
            )}

            {/* Image */}
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full block"
                draggable={false}
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: "center center",
                  transition: isPanning.current ? "none" : "transform 0.2s ease",
                  willChange: "transform",
                }}
              />
            </div>

            {/* Reset zoom */}
            {isZoomed && (
              <button
                onClick={(e) => { e.stopPropagation(); setZoom(1); setPan({ x: 0, y: 0 }); }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors text-xs tracking-[0.2em] uppercase flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                </svg>
                Reset zoom
              </button>
            )}

            {/* Nav arrows — hidden when zoomed */}
            {!isZoomed && (
              <>
                <button onClick={goPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-muted-foreground hover:text-foreground transition-colors hidden md:block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button onClick={goNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-muted-foreground hover:text-foreground transition-colors hidden md:block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            {/* Hints + dots */}
            {!isZoomed && (
              <div className="flex flex-col items-center gap-3 mt-4">
                <p className="md:hidden text-muted-foreground/40 text-[10px] tracking-[0.2em] uppercase">
                  Swipe to navigate · Double-tap to zoom
                </p>
                <p className="hidden md:block text-muted-foreground/40 text-[10px] tracking-[0.2em] uppercase">
                  Double-click or scroll to zoom · Drag to pan
                </p>
                <div className="flex justify-center gap-2">
                  {certificates.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setLightbox(c.id)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: c.id === lightbox ? "16px" : "6px",
                        background: c.id === lightbox ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CertificatesSection;