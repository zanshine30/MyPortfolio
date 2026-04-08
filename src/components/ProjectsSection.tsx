import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    image: "/images/projects/shobe-printing.png",
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
    image: "/images/projects/evvos.png",
  },
  {
    id: 3,
    slug: "coming-soon",
    title: "COMING SOON",
    subtitle: "Next project",
    name: "Coming Soon",
    tagline: "Something new is on the way",
    description:
      "This project is currently in progress. Check back soon for updates.",
    image: null,
  },
];

const SWIPE_THRESHOLD = 50; // px

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  // Touch state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // Only lock as a horizontal swipe if x movement dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isDragging.current = true;
      e.preventDefault(); // prevent page scroll during swipe
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;

    if (isDragging.current && Math.abs(dx) >= SWIPE_THRESHOLD) {
      if (dx < 0) {
        // swipe left → next
        setActiveIndex((prev) => (prev + 1) % projects.length);
      } else {
        // swipe right → prev
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  const getCardPosition = (index: number) => {
    const diff = (index - activeIndex + projects.length) % projects.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "left";
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const getCardStyles = (position: string) => {
    switch (position) {
      case "left":
        return "left-1/2 -translate-x-[150%] md:-translate-x-[130%] w-72 md:w-[400px] h-40 md:h-[225px] z-10 opacity-70 scale-90";
      case "right":
        return "left-1/2 translate-x-[50%] md:translate-x-[30%] w-72 md:w-[400px] h-40 md:h-[225px] z-10 opacity-70 scale-90";
      case "center":
      default:
        return "left-1/2 -translate-x-1/2 w-[320px] md:w-[640px] h-[180px] md:h-[360px] z-20 opacity-100 scale-100";
    }
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-card py-24 px-8 md:px-16 overflow-hidden"
    >
      <div className="absolute left-8 md:left-16 top-24 section-number">.02</div>

      <div className="absolute right-8 md:right-16 top-24">
        <span className="subtitle-text">Projects</span>
      </div>

      <div className="max-w-6xl mx-auto pt-16" ref={sectionRef}>
        <div className={`scroll-fade-up ${isVisible ? "visible" : ""}`}>

          {/* ── Carousel ──────────────────────────────────────────── */}
          <div
            className="relative flex items-center justify-center mb-12 h-[220px] md:h-[400px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "pan-y" }} // allow vertical scroll, intercept horizontal
          >
            {projects.map((project, index) => {
              const position = getCardPosition(index);
              return (
                <div
                  key={project.id}
                  onClick={() => handleCardClick(index)}
                  className={`absolute bg-secondary rounded-lg overflow-hidden shadow-xl cursor-pointer transition-all duration-500 ease-in-out ${getCardStyles(position)} ${
                    position !== "center" ? "hover:opacity-90" : ""
                  }`}
                >
                  <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-4">
                    {project.image && (
                      <div
                        className="absolute inset-0 bg-cover bg-center scale-110"
                        style={{
                          backgroundImage: `url(${project.image})`,
                          filter: "blur(3px)",
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-zinc-900/75" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <p className="text-white/60 text-xs mb-2 tracking-widest uppercase">
                        {project.subtitle}
                      </p>
                      <p
                        className={`text-white font-semibold mb-3 drop-shadow-lg ${
                          position === "center" ? "text-xl md:text-2xl" : "text-lg"
                        }`}
                      >
                        {project.name}
                      </p>
                      <p
                        className={`text-white/80 font-medium drop-shadow ${
                          position === "center" ? "text-sm md:text-base" : "text-xs"
                        }`}
                      >
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Swipe hint (mobile only) ───────────────────────────── */}
          <div className="flex md:hidden justify-center items-center gap-3 mb-6 -mt-4">
            {/* Left chevron */}
            <button
              onClick={() =>
                setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
              }
              className="text-white/30 active:text-white/70 transition-colors p-1"
              aria-label="Previous project"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dot indicators */}
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-300"
                aria-label={`Go to project ${i + 1}`}
                style={{
                  width: i === activeIndex ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i === activeIndex
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.25)",
                }}
              />
            ))}

            {/* Right chevron */}
            <button
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % projects.length)
              }
              className="text-white/30 active:text-white/70 transition-colors p-1"
              aria-label="Next project"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ── Project info ───────────────────────────────────────── */}
          <h2 className="heading-display text-4xl md:text-6xl text-center mb-6 transition-all duration-300">
            {activeProject.title}
          </h2>

          <p className="text-muted-foreground text-sm text-center max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-300">
            {activeProject.description}
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => navigate(`/project/${activeProject.slug}`)}
              className="border border-border px-10 py-4 text-xs tracking-[0.25em] uppercase text-foreground hover:bg-secondary transition-colors duration-300"
            >
              View Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;