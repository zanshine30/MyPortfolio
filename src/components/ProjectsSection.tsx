import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projects = [
  {
    id: 1,
    slug: "keet-cafe",
    title: "KEET CAFE",
    subtitle: "Welcome to",
    name: "Keet cafe",
    tagline: "Homemade baking, Tasty Drinks",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
  },
  {
    id: 2,
    slug: "project-two",
    title: "PROJECT TWO",
    subtitle: "Welcome to",
    name: "Project",
    tagline: "Amazing project showcase",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    slug: "project-three",
    title: "PROJECT THREE",
    subtitle: "Welcome to",
    name: "Keet",
    tagline: "Best pastries in town",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
          {/* Project Cards - 3 cards carousel */}
          <div className="relative flex items-center justify-center mb-12 h-[220px] md:h-[400px]">
            {projects.map((project, index) => {
              const position = getCardPosition(index);
              return (
                <div
                  key={project.id}
                  onClick={() => handleCardClick(index)}
                  className={`absolute bg-secondary rounded-lg overflow-hidden shadow-xl cursor-pointer transition-all duration-500 ease-in-out ${getCardStyles(position)} ${position !== "center" ? "hover:opacity-90" : ""}`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center p-4">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs mb-2">{project.subtitle}</p>
                      <p className={`text-foreground font-semibold mb-4 ${position === "center" ? "text-xl md:text-2xl" : "text-lg"}`}>
                        {project.name}
                      </p>
                      <p className={`text-foreground font-medium ${position === "center" ? "text-sm md:text-base" : "text-sm"}`}>
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
