import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes navBgFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes linkDrop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-bg-enter {
          animation: navBgFadeIn 0.35s ease forwards;
        }

        .mobile-link {
          opacity: 0;
          animation: linkDrop 0.4s ease forwards;
        }
        .mobile-link:nth-child(1) { animation-delay: 0.15s; }
        .mobile-link:nth-child(2) { animation-delay: 0.25s; }
        .mobile-link:nth-child(3) { animation-delay: 0.35s; }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Top bar — fades its background in when menu opens */}
        <div
          className={`flex items-center justify-between px-8 md:px-16 py-6 ${
            isOpen ? "bg-background mobile-bg-enter" : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex flex-col leading-none hover:opacity-70 transition-opacity"
          >
            <span className="text-foreground text-lg font-bold tracking-widest">JO</span>
            <span className="text-foreground text-lg font-bold tracking-widest">HN</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#certificates" className="nav-link">Certificates</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          {/* Hamburger Button (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 hover:opacity-70 transition-opacity"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown — same bg-background so it's seamless */}
        {isOpen && (
          <div className="md:hidden mobile-bg-enter bg-background border-t border-foreground/10 flex flex-col items-center gap-6 py-8">
            <a href="#projects"     className="mobile-link nav-link" onClick={handleNavClick}>Projects</a>
            <a href="#certificates" className="mobile-link nav-link" onClick={handleNavClick}>Certificates</a>
            <a href="#contact"      className="mobile-link nav-link" onClick={handleNavClick}>Contact</a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;