import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const particleCount = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(92, 159, 192, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(92, 159, 192, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Aurora blobs */}
      <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-35 mix-blend-screen animate-aurora bg-[radial-gradient(circle_at_30%_30%,hsl(var(--brand-cyan)/0.55),transparent_60%)]" />
      <div className="absolute -bottom-32 -right-32 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-30 mix-blend-screen animate-aurora-2 bg-[radial-gradient(circle_at_40%_40%,hsl(var(--brand-gold)/0.45),transparent_62%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[28rem] rounded-full blur-3xl opacity-20 mix-blend-screen animate-aurora bg-[radial-gradient(circle_at_50%_50%,hsl(var(--brand-cyan)/0.35),transparent_65%)]" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,hsl(var(--brand-cyan)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--brand-cyan)/0.22)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* Scan sweep */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 h-40 animate-scan-sweep bg-gradient-to-b from-transparent via-brand-cyan/20 to-transparent blur-md" />
      </div>

      {/* Particles layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.55 }}
      />
    </div>
  );
};

export default ParticleBackground;
