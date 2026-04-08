import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    slug: "shobe-printing",
    title: "SHOBE PRINTING SERVICES",
    subtitle: "Resource Tracking for",
    name: "Shobe Printing",
    tagline: "Inventory Control & Resource Tracking System",
    description:
      "A web-based inventory management system developed for Shobe Printing Services to automate consumable tracking, material usage logging, and stock-level monitoring — replacing manual paper-based processes.",
    fullDescription:
      "Developed for Shobe Printing Services, a large-format tarpaulin printing and graphic design business in Quezon City, this Resource Tracking and Inventory Control System replaces the company's manual, paper-based inventory processes. The system automates real-time stock monitoring, material consumption logging, and report generation. Key features include low-stock alerts, a searchable transaction history, role-based access control for admins and production staff, and automated reports covering inventory summaries, consumption trends, and material-to-output analysis. Built with React, Node.js, and Supabase, the system was developed using the Rapid Application Development (RAD) model with Agile integration.",
    role: "Project Manager & Backend Developer",
    year: "2025",
    tools: ["React", "Node.js", "Supabase", "Figma"],
    carousel: [
      "/images/shobe/carousel/shobe-1.png",
      "/images/shobe/carousel/shobe-2.png",
      "/images/shobe/carousel/shobe-3.png",
      "/images/shobe/carousel/shobe-4.png",
    ],
    gallery: [
      "/images/shobe/gallery/shobe-1.png",
      "/images/shobe/gallery/shobe-2.png",
      "/images/shobe/gallery/shobe-3.png",
      "/images/shobe/gallery/shobe-4.png",
      "/images/shobe/gallery/shobe-5.png",
      "/images/shobe/gallery/shobe-6.png",
      "/images/shobe/gallery/shobe-7.png",
      "/images/shobe/gallery/shobe-8.png",
      "/images/shobe/gallery/shobe-9.png",
      "/images/shobe/gallery/shobe-10.png",
    ],
  },
  {
    id: 2,
    slug: "evvos",
    title: "EVVOS",
    subtitle: "Introducing",
    name: "EVVOS",
    tagline: "Enforcer Voice-Activated Video Observation System",
    description:
      "A voice-activated body-worn camera system for traffic enforcers — enabling hands-free recording, automatic speech-to-text transcription, secure cloud evidence storage, and emergency backup alerts.",
    fullDescription:
      "EVVOS (Enforcer Voice-Activated Video Observation System) is a prototype wearable body-cam solution designed for traffic enforcers in the field. Built around a Raspberry Pi Zero 2W paired with a ReSpeaker 2-Microphone HAT and the Pico wake-word engine, the device allows officers to start, stop, and mark recordings entirely hands-free using voice commands. Enforcer narrations are automatically transcribed via the Groq Whisper API and linked to their corresponding video clips for fast review. Emergency backup alerts are broadcast to all connected officers in under five seconds, while a React/Vite web admin portal and a React Native/Expo mobile app provide full incident management and responder coordination. Supabase powers the cloud backend with a 13-table PostgreSQL database, JWT two-factor authentication, and secure object storage. The system was evaluated by traffic enforcers from three stations in Caloocan City and received a grand mean of 4.50 (Excellent) across functionality, reliability, efficiency, maintainability, and security.",
    role: "Software Engineer & Quality Assurance",
    year: "2026",
    tools: ["Raspberry Pi", "Python", "React Native", "Expo", "React", "Supabase", "Groq Whisper"],
    carousel: [
      "/images/evvos/carousel/evvos-1.png",
      "/images/evvos/carousel/evvos-2.png",
      "/images/evvos/carousel/evvos-3.png",
      "/images/evvos/carousel/evvos-4.png",
    ],
    gallery: [
      "/images/evvos/gallery/evvos-1.png",
      "/images/evvos/gallery/evvos-2.png",
      "/images/evvos/gallery/evvos-3.png",
      "/images/evvos/gallery/evvos-4.png",
      "/images/evvos/gallery/evvos-5.png",
      "/images/evvos/gallery/evvos-6.png",
      "/images/evvos/gallery/evvos-7.png",
      "/images/evvos/gallery/evvos-8.png",
      "/images/evvos/gallery/evvos-9.png",
      "/images/evvos/gallery/evvos-10.png",
      "/images/evvos/gallery/evvos-11.png",
      "/images/evvos/gallery/evvos-12.png",
    ],
  },
  {
    id: 3,
    slug: "coming-soon",
    title: "COMING SOON",
    subtitle: "Next project",
    name: "Coming Soon",
    tagline: "Something new is on the way",
    description: "This project is currently in progress. Check back soon for updates.",
    fullDescription:
      "This project is currently in progress. Details will be updated once the project is complete. Stay tuned for more.",
    role: "TBD",
    year: "TBD",
    tools: [],
    carousel: [],
    gallery: [],
  },
];

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

// ── Reusable swipe hook ───────────────────────────────────────────────────────
function useSwipeHandlers(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isDragging.current = true;
      e.preventDefault();
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !isDragging.current) {
      touchStartX.current = null;
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      dx < 0 ? onSwipeLeft() : onSwipeRight();
    }
    touchStartX.current = null;
    isDragging.current = false;
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
}
// ─────────────────────────────────────────────────────────────────────────────

const Project = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Zoom / pan state for lightbox
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOrigin = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef<number | null>(null);
  const touchPanStart = useRef<{ x: number; y: number } | null>(null);
  const panOriginTouch = useRef({ x: 0, y: 0 });
  const lastTapTime = useRef(0);
  const lastTapPos = useRef({ x: 0, y: 0 });
  const lightboxContainerRef = useRef<HTMLDivElement>(null);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (!project || project.carousel.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % project.carousel.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [project]);

  // Reset on project change
  useEffect(() => {
    setCarouselIndex(0);
    setLightboxIndex(null);
  }, [slug]);

  // Reset zoom/pan whenever lightbox image changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [lightboxIndex]);

  const goCarouselNext = useCallback(() => {
    if (!project) return;
    setCarouselIndex((prev) => (prev + 1) % project.carousel.length);
  }, [project]);

  const goCarouselPrev = useCallback(() => {
    if (!project) return;
    setCarouselIndex((prev) => (prev - 1 + project.carousel.length) % project.carousel.length);
  }, [project]);

  const goLightboxNext = useCallback(() => {
    if (lightboxIndex === null || !project) return;
    setLightboxIndex((lightboxIndex + 1) % project.gallery.length);
  }, [lightboxIndex, project]);

  const goLightboxPrev = useCallback(() => {
    if (lightboxIndex === null || !project) return;
    setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length);
  }, [lightboxIndex, project]);

  // ── Zoom helpers ─────────────────────────────────────────────────────────────
  const zoomToPoint = useCallback(
    (newZoom: number, pointX: number, pointY: number, currentZoom: number, currentPan: { x: number; y: number }) => {
      const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));
      const scale = clampedZoom / currentZoom;
      const newPan = {
        x: pointX + (currentPan.x - pointX) * scale,
        y: pointY + (currentPan.y - pointY) * scale,
      };
      return { zoom: clampedZoom, pan: clampPan(newPan, clampedZoom, lightboxContainerRef) };
    },
    []
  );

  const handleLightboxMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      isPanning.current = true;
      panStart.current = { x: e.clientX, y: e.clientY };
      panOrigin.current = { ...pan };
    },
    [zoom, pan]
  );

  const handleLightboxMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning.current) return;
      setPan(clampPan(
        { x: panOrigin.current.x + (e.clientX - panStart.current.x), y: panOrigin.current.y + (e.clientY - panStart.current.y) },
        zoom,
        lightboxContainerRef
      ));
    },
    [zoom]
  );

  const handleLightboxMouseUp = useCallback(() => { isPanning.current = false; }, []);

  const handleLightboxDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const rect = lightboxContainerRef.current?.getBoundingClientRect();
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

  const handleLightboxWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const rect = lightboxContainerRef.current?.getBoundingClientRect();
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

  const handleLightboxTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const now = Date.now();
        const dx = t.clientX - lastTapPos.current.x;
        const dy = t.clientY - lastTapPos.current.y;
        if (now - lastTapTime.current < DOUBLE_TAP_DELAY && Math.hypot(dx, dy) < 40) {
          e.preventDefault();
          const rect = lightboxContainerRef.current?.getBoundingClientRect();
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
      }
    },
    [zoom, pan, zoomToPoint]
  );

  const handleLightboxTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0], t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const mid = { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
        if (lastPinchDist.current !== null) {
          const scaleDelta = dist / lastPinchDist.current;
          const rect = lightboxContainerRef.current?.getBoundingClientRect();
          const cx = rect ? mid.x - rect.left - rect.width / 2 : 0;
          const cy = rect ? mid.y - rect.top - rect.height / 2 : 0;
          setZoom((z) => {
            const newZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * scaleDelta));
            setPan((p) => clampPan({ x: cx + (p.x - cx) * scaleDelta, y: cy + (p.y - cy) * scaleDelta }, newZ, lightboxContainerRef));
            return newZ;
          });
        }
        lastPinchDist.current = dist;
        return;
      }
      if (e.touches.length === 1 && zoom > 1 && touchPanStart.current) {
        e.preventDefault();
        const t = e.touches[0];
        const dx = t.clientX - touchPanStart.current.x;
        const dy = t.clientY - touchPanStart.current.y;
        setPan(clampPan({ x: panOriginTouch.current.x + dx, y: panOriginTouch.current.y + dy }, zoom, lightboxContainerRef));
      }
    },
    [zoom]
  );

  const handleLightboxTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      lastPinchDist.current = null;
      touchPanStart.current = null;
      if (zoom > 1) return;
      // swipe navigation only when not zoomed
      const touch = e.changedTouches[0];
      const dx = touch.clientX - lastTapPos.current.x;
      if (Math.abs(dx) >= SWIPE_THRESHOLD && Date.now() - lastTapTime.current > DOUBLE_TAP_DELAY) {
        dx < 0 ? goLightboxNext() : goLightboxPrev();
      }
    },
    [zoom, goLightboxNext, goLightboxPrev]
  );
  // ─────────────────────────────────────────────────────────────────────────────

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goLightboxNext();
      if (e.key === "ArrowLeft") goLightboxPrev();
      if (e.key === "Escape") { setLightboxIndex(null); setZoom(1); setPan({ x: 0, y: 0 }); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goLightboxNext, goLightboxPrev]);

  // Swipe handlers (carousel only)
  const carouselSwipe = useSwipeHandlers(goCarouselNext, goCarouselPrev);

  if (!project) {
    return (
      <div className="min-h-screen bg-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-display text-4xl mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-card">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col leading-none hover:opacity-70 transition-opacity"
        >
          <span className="text-foreground text-lg font-bold tracking-widest">JO</span>
          <span className="text-foreground text-lg font-bold tracking-widest">HN</span>
        </button>
        <button
          onClick={() => navigate("/#projects")}
          className="nav-link flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>
      </nav>

      {/* Hero Text */}
      <section className="pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="subtitle-text mb-4">{project.subtitle}</p>
          <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl mb-8">{project.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{project.tagline}</p>
        </div>
      </section>

      {/* Hero Carousel — swipeable on mobile */}
      <section className="px-8 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {project.carousel.length > 0 ? (
            <div
              className="relative w-full aspect-video rounded-lg overflow-hidden group"
              {...carouselSwipe}
              style={{ touchAction: "pan-y" }}
            >
              {project.carousel.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} preview ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 select-none ${
                    i === carouselIndex ? "opacity-100" : "opacity-0"
                  }`}
                  draggable={false}
                />
              ))}

              {project.carousel.length > 1 && (
                <>
                  <button
                    onClick={goCarouselPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={goCarouselNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {project.carousel.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCarouselIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === carouselIndex ? "bg-white w-6" : "bg-white/40 w-1.5"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm tracking-widest uppercase">
                Project Preview
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <div>
                <p className="subtitle-text mb-2">Role</p>
                <p className="text-foreground">{project.role}</p>
              </div>
              <div>
                <p className="subtitle-text mb-2">Year</p>
                <p className="text-foreground">{project.year}</p>
              </div>
              <div>
                <p className="subtitle-text mb-2">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-foreground text-sm bg-secondary px-3 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="subtitle-text mb-4">About the Project</p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — 1 col on mobile, 2 cols on desktop */}
      {project.gallery.length > 0 && (
        <section className="px-8 md:px-16 pb-24">
          <div className="max-w-6xl mx-auto">
            <p className="subtitle-text mb-6">Gallery</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer border border-border hover:border-foreground/30 transition-all duration-300"
                >
                  <img
                    src={src}
                    alt={`${project.title} gallery ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        className="text-white">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span className="text-white text-xs tracking-[0.2em] uppercase">View</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-3 text-white/30 text-xs font-light">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Navigation */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 items-center border-t border-border pt-12">
            <button
              onClick={() => navigate(`/project/${prevProject.slug}`)}
              className="group flex items-center gap-4 hover:opacity-70 transition-opacity justify-self-start"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="text-muted-foreground group-hover:text-foreground transition-colors">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <div className="text-left hidden sm:block">
                <p className="subtitle-text mb-1">Previous</p>
                <p className="text-foreground font-semibold">{prevProject.title}</p>
              </div>
            </button>

            <button
              onClick={() => navigate("/#projects")}
              className="border border-border px-6 py-3 text-xs tracking-[0.25em] uppercase text-foreground hover:bg-secondary transition-colors duration-300 justify-self-center"
            >
              All Projects
            </button>

            <button
              onClick={() => navigate(`/project/${nextProject.slug}`)}
              className="group flex items-center gap-4 hover:opacity-70 transition-opacity justify-self-end"
            >
              <div className="text-right hidden sm:block">
                <p className="subtitle-text mb-1">Next</p>
                <p className="text-foreground font-semibold">{nextProject.title}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="text-muted-foreground group-hover:text-foreground transition-colors">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox — zoom + pan + swipe on mobile, scroll/double-click/drag on desktop */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12"
          onClick={zoom > 1 ? undefined : () => { setLightboxIndex(null); setZoom(1); setPan({ x: 0, y: 0 }); }}
          onMouseMove={handleLightboxMouseMove}
          onMouseUp={handleLightboxMouseUp}
          onMouseLeave={handleLightboxMouseUp}
        >
          <div
            ref={lightboxContainerRef}
            className="relative max-w-5xl w-full select-none"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleLightboxDoubleClick}
            onMouseDown={handleLightboxMouseDown}
            onWheel={handleLightboxWheel}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
            style={{ cursor: zoom > 1 ? "grab" : "default", touchAction: "none" }}
          >
            {/* Close */}
            <button
              onClick={() => { setLightboxIndex(null); setZoom(1); setPan({ x: 0, y: 0 }); }}
              className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors text-xs tracking-[0.2em] uppercase flex items-center gap-2"
            >
              Close
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Zoom badge */}
            {zoom > 1 && (
              <div className="absolute -top-10 left-0 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase pointer-events-none">
                {Math.round(zoom * 100)}%
              </div>
            )}

            {/* Image */}
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img
                src={project.gallery[lightboxIndex]}
                alt={`${project.title} gallery ${lightboxIndex + 1}`}
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
            {zoom > 1 && (
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

            {/* Desktop arrows — hidden when zoomed */}
            {zoom <= 1 && (
              <>
                <button
                  onClick={goLightboxPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-muted-foreground hover:text-foreground transition-colors hidden md:block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={goLightboxNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-muted-foreground hover:text-foreground transition-colors hidden md:block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            {/* Hints + dots */}
            {zoom <= 1 && (
              <div className="flex flex-col items-center gap-3 mt-4">
                <p className="md:hidden text-muted-foreground/40 text-[10px] tracking-[0.2em] uppercase">
                  Swipe to navigate · Double-tap to zoom
                </p>
                <p className="hidden md:block text-muted-foreground/40 text-[10px] tracking-[0.2em] uppercase">
                  Double-click or scroll to zoom · Drag to pan
                </p>
                <div className="flex justify-center gap-2">
                  {project.gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === lightboxIndex ? "16px" : "6px",
                        background: i === lightboxIndex ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;