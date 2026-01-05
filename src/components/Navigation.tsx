const Navigation = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
      <button onClick={scrollToTop} className="flex flex-col leading-none hover:opacity-70 transition-opacity">
        <span className="text-foreground text-lg font-bold tracking-widest">JO</span>
        <span className="text-foreground text-lg font-bold tracking-widest">HN</span>
      </button>
      
      <div className="flex items-center gap-8">
        <a href="#projects" className="nav-link">
          Projects
        </a>
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
