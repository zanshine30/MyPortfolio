const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
      <div className="flex flex-col leading-none">
        <span className="text-foreground text-lg font-bold tracking-widest">TU</span>
        <span className="text-foreground text-lg font-bold tracking-widest">RA</span>
      </div>
      
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
