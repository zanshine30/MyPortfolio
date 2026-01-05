import { useEffect, useRef, useCallback } from "react";

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

interface Splat {
  x: number;
  y: number;
  particles: SplatParticle[];
}

interface SplatParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raindropsRef = useRef<Raindrop[]>([]);
  const splatsRef = useRef<Splat[]>([]);
  const animationRef = useRef<number>(0);

  const createRaindrop = useCallback((width: number): Raindrop => {
    return {
      x: Math.random() * width,
      y: -20 - Math.random() * 100,
      speed: 4 + Math.random() * 4,
      length: 15 + Math.random() * 25,
      opacity: 0.2 + Math.random() * 0.3,
    };
  }, []);

  const createSplat = useCallback((x: number, y: number): Splat => {
    const particles: SplatParticle[] = [];
    const particleCount = 5 + Math.floor(Math.random() * 4);

    for (let i = 0; i < particleCount; i++) {
      const angle = -Math.PI + (Math.random() * Math.PI);
      const speed = 1 + Math.random() * 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 1,
        size: 1 + Math.random() * 1.5,
      });
    }

    return { x, y, particles };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize raindrops
    for (let i = 0; i < 60; i++) {
      const drop = createRaindrop(canvas.width);
      drop.y = Math.random() * canvas.height;
      raindropsRef.current.push(drop);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw raindrops
      raindropsRef.current = raindropsRef.current.filter((drop) => {
        drop.y += drop.speed;

        // Check if hit ground
        if (drop.y >= canvas.height) {
          // Create splat
          splatsRef.current.push(createSplat(drop.x, canvas.height));
          return false;
        }

        // Draw raindrop as a line
        const gradient = ctx.createLinearGradient(
          drop.x, drop.y - drop.length,
          drop.x, drop.y
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(1, `rgba(255, 255, 255, ${drop.opacity})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.moveTo(drop.x, drop.y - drop.length);
        ctx.lineTo(drop.x, drop.y);
        ctx.stroke();

        return true;
      });

      // Add new raindrops to maintain count
      while (raindropsRef.current.length < 60) {
        raindropsRef.current.push(createRaindrop(canvas.width));
      }

      // Update and draw splats
      splatsRef.current = splatsRef.current.filter((splat) => {
        let hasLivingParticles = false;

        splat.particles = splat.particles.filter((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.15; // gravity
          particle.vx *= 0.98;
          particle.life -= 0.03;

          if (particle.life <= 0) return false;
          hasLivingParticles = true;

          const alpha = particle.life * 0.5;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });

        return hasLivingParticles;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createRaindrop, createSplat]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-card overflow-hidden">
      {/* Lighting effect */}
      <div className="hero-lighting" />

      {/* Particle collision canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="absolute left-8 md:left-16 bottom-16 section-number z-10">
        .01
      </div>

      <div className="text-center opacity-0 animate-fade-in z-10" style={{ animationDelay: '0.2s' }}>
        <p className="subtitle-text mb-4">I Am</p>
        <h1 className="heading-display text-6xl md:text-8xl lg:text-9xl mb-6 hero-text-shadow">
          JOHN ALWIN
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
