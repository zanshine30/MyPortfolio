const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-card">
      <div className="absolute left-8 md:left-16 bottom-16 section-number">
        .01
      </div>
      
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="subtitle-text writing-mode-vertical">Scroll</span>
      </div>
      
      <div className="text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <p className="subtitle-text mb-4">I Am</p>
        <h1 className="heading-display text-6xl md:text-8xl lg:text-9xl mb-6">
          TURA
        </h1>
        <div className="flex flex-col items-end">
          <p className="subtitle-text">A Junior</p>
          <p className="subtitle-text">Web Designer</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
