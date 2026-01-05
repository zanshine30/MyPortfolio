import projectImage from "@/assets/project-cafe.jpg";

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative min-h-screen bg-card py-24 px-8 md:px-16">
      <div className="absolute left-8 md:left-16 top-24 section-number">
        .02
      </div>
      
      <nav className="absolute right-8 md:right-16 top-24 flex items-center gap-8">
        <a href="#projects" className="nav-link text-foreground">
          Projects
        </a>
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </nav>
      
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="subtitle-text writing-mode-vertical">Index</span>
      </div>
      
      <div className="max-w-4xl mx-auto pt-32">
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Project Images */}
          <div className="relative mb-8">
            <div className="flex gap-4 justify-center items-start">
              <div className="w-64 h-44 bg-secondary rounded overflow-hidden transform -rotate-2 shadow-2xl">
                <img 
                  src={projectImage} 
                  alt="Keet Cafe Project" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-48 h-36 bg-secondary rounded overflow-hidden transform rotate-3 mt-4 shadow-2xl opacity-70">
                <img 
                  src={projectImage} 
                  alt="Keet Cafe Project" 
                  className="w-full h-full object-cover blur-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Project Title */}
          <h2 className="heading-display text-3xl md:text-5xl text-center mb-8">
            KEET CAFE
          </h2>
          
          {/* Project Description */}
          <p className="text-muted-foreground text-sm text-center max-w-lg mx-auto mb-8 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
          </p>
          
          {/* View Project Button */}
          <div className="flex justify-center">
            <button className="border border-border px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground hover:bg-secondary transition-colors duration-300">
              View Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
