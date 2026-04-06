import { useState } from "react";
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
    description: "A web-based inventory management system developed for Shobe Printing Services to automate consumable tracking, material usage logging, and stock-level monitoring — replacing manual paper-based processes.",
    image: "/images/projects/shobe-printing.png",
  },
  {
    id: 2,
    slug: "evvos",
    title: "EVVOS",
    subtitle: "Introducing",
    name: "EVVOS",
    tagline: "Enforcer Voice-Activated Video Observation System",
    description: "A voice-activated body-worn camera system for traffic enforcers — enabling hands-free recording, automatic speech-to-text transcription, secure cloud evidence storage, and emergency backup alerts.",
    image: "/images/projects/evvos.png",
  },
  {
    id: 3,
    slug: "coming-soon",
    title: "COMING SOON",
    subtitle: "Next project",
    name: "Coming Soon",
    tagline: "Something new is on the way",
    description: "This project is currently in progress. Check back soon for updates.",
    image: null,
  },
];

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

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
    <section id="projects" className="relative min-h-screen bg-card py-24 px-8 md:px-16 overflow-hidden">
      <div className="absolute left-8 md:left-16 top-24 section-number">
        .02
      </div>

      {/* Projects label top right */}
      <div className="absolute right-8 md:right-16 top-24">
        <span className="subtitle-text">Projects</span>
      </div>

      <div className="max-w-6xl mx-auto pt-16" ref={sectionRef}>
        <div className={`scroll-fade-up ${isVisible ? 'visible' : ''}`}>
          {/* Project Cards - carousel */}
          <div className="relative flex items-center justify-center mb-12 h-[220px] md:h-[400px]">
            {projects.map((project, index) => {
              const position = getCardPosition(index);
              return (
                <div
                  key={project.id}
                  onClick={() => handleCardClick(index)}
                  className={`absolute bg-secondary rounded-lg overflow-hidden shadow-xl cursor-pointer transition-all duration-500 ease-in-out ${getCardStyles(position)} ${position !== "center" ? "hover:opacity-90" : ""}`}
                >
                <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-4">
                    {/* Blurred background image */}
                    {project.image && (
                      <div
                        className="absolute inset-0 bg-cover bg-center scale-110"
                        style={{
                          backgroundImage: `url(${project.image})`,
                          filter: "blur(3px)",
                        }}
                      />
                    )}

                    {/* Dark overlay — heavier so white dashboards don't blind the text */}
                    <div className="absolute inset-0 bg-zinc-900/75" />

                    {/* Subtle vignette for extra depth */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
                      }}
                    />

                    {/* Text content */}
                    <div className="relative z-10 text-center">
                      <p className="text-white/60 text-xs mb-2 tracking-widest uppercase">{project.subtitle}</p>
                      <p className={`text-white font-semibold mb-3 drop-shadow-lg ${position === "center" ? "text-xl md:text-2xl" : "text-lg"}`}>
                        {project.name}
                      </p>
                      <p className={`text-white/80 font-medium drop-shadow ${position === "center" ? "text-sm md:text-base" : "text-xs"}`}>
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Project Title */}
          <h2 className="heading-display text-4xl md:text-6xl text-center mb-6 transition-all duration-300">
            {activeProject.title}
          </h2>

          {/* Project Description */}
          <p className="text-muted-foreground text-sm text-center max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-300">
            {activeProject.description}
          </p>

          {/* View Project Button */}
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