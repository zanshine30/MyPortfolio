import { useState, useEffect, useCallback } from "react";
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
    // Add images to public/shobe/carousel/ — e.g. shobe-1.png, shobe-2.png, shobe-3.png
    carousel: [
      "/images/shobe/carousel/shobe-1.png",
      "/images/shobe/carousel/shobe-2.png",
      "/images/shobe/carousel/shobe-3.png",
      "/images/shobe/carousel/shobe-4.png",
    ],
    // Add images to public/shobe/gallery/ — e.g. shobe-1.png, shobe-2.png, etc.
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
    // Add images to public/evvos/carousel/ — e.g. evvos-1.png, evvos-2.png, evvos-3.png
    carousel: [
      "/images/evvos/carousel/evvos-1.png",
      "/images/evvos/carousel/evvos-2.png",
      "/images/evvos/carousel/evvos-3.png",
      "/images/evvos/carousel/evvos-4.png",
    ],
    // Add images to public/evvos/gallery/ — e.g. evvos-1.png, evvos-2.png, etc.
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

const Project = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (!project || project.carousel.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % project.carousel.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [project]);

  // Reset carousel when navigating between projects
  useEffect(() => {
    setCarouselIndex(0);
    setLightboxIndex(null);
  }, [slug]);

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

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goLightboxNext();
      if (e.key === "ArrowLeft") goLightboxPrev();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goLightboxNext, goLightboxPrev]);

  if (!project) {
    return (
      <div className="min-h-screen bg-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-display text-4xl mb-4">Project Not Found</h1>
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
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
        <button onClick={() => navigate("/")} className="flex flex-col leading-none hover:opacity-70 transition-opacity">
          <span className="text-foreground text-lg font-bold tracking-widest">JO</span>
          <span className="text-foreground text-lg font-bold tracking-widest">HN</span>
        </button>
        <button onClick={() => navigate("/#projects")} className="nav-link flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Hero Carousel */}
      <section className="px-8 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {project.carousel.length > 0 ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
              {/* Images */}
              {project.carousel.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} preview ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    i === carouselIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Arrows — visible on hover */}
              {project.carousel.length > 1 && (
                <>
                  <button
                    onClick={goCarouselPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={goCarouselNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {project.carousel.length > 1 && (
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
              )}
            </div>
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm tracking-widest uppercase">Project Preview</span>
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
                    <span key={tool} className="text-foreground text-sm bg-secondary px-3 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="subtitle-text mb-4">About the Project</p>
              <p className="text-muted-foreground leading-relaxed text-lg">{project.fullDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="px-8 md:px-16 pb-24">
          <div className="max-w-6xl mx-auto">
            <p className="subtitle-text mb-6">Gallery</p>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span className="text-white text-xs tracking-[0.2em] uppercase">View</span>
                    </div>
                  </div>
                  {/* Index badge */}
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
            <button onClick={() => navigate(`/project/${prevProject.slug}`)} className="group flex items-center gap-4 hover:opacity-70 transition-opacity justify-self-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <div className="text-left hidden sm:block">
                <p className="subtitle-text mb-1">Previous</p>
                <p className="text-foreground font-semibold">{prevProject.title}</p>
              </div>
            </button>

            <button onClick={() => navigate("/#projects")} className="border border-border px-6 py-3 text-xs tracking-[0.25em] uppercase text-foreground hover:bg-secondary transition-colors duration-300 justify-self-center">
              All Projects
            </button>

            <button onClick={() => navigate(`/project/${nextProject.slug}`)} className="group flex items-center gap-4 hover:opacity-70 transition-opacity justify-self-end">
              <div className="text-right hidden sm:block">
                <p className="subtitle-text mb-1">Next</p>
                <p className="text-foreground font-semibold">{nextProject.title}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
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
              src={project.gallery[lightboxIndex]}
              alt={`${project.title} gallery ${lightboxIndex + 1}`}
              className="w-full rounded-lg shadow-2xl"
            />

            {/* Arrows */}
            <button
              onClick={goLightboxPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goLightboxNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {project.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === lightboxIndex ? "bg-foreground w-4" : "bg-muted-foreground/40 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;