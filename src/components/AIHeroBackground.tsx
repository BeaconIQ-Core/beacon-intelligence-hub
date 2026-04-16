import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
};

type Stream = {
  from: Node;
  to: Node;
  t: number;
  speed: number;
  width: number;
  color: string;
  active: boolean;
};

const AIHeroBackground = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));

    const mouse = { x: 0, y: 0 };
    const NODE_COUNT = 55;
    const nodes: Node[] = [];
    const streams: Stream[] = [];

    const W = () => canvas.width / DPR;
    const H = () => canvas.height / DPR;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // Reset mouse to center to avoid sudden long lines.
      mouse.x = w / 2;
      mouse.y = h / 2;
    };

    const mkNode = (): Node => ({
      x: Math.random() * (wrap.clientWidth || 1),
      y: Math.random() * (wrap.clientHeight || 1),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    });

    for (let i = 0; i < NODE_COUNT; i++) nodes.push(mkNode());

    const mkStream = (): Stream => {
      const from = nodes[Math.floor(Math.random() * nodes.length)];
      let to = nodes[Math.floor(Math.random() * nodes.length)];
      // avoid trivial same-node streams
      if (to === from) to = nodes[(nodes.indexOf(from) + 1) % nodes.length];
      return {
        from,
        to,
        t: 0,
        speed: 0.004 + Math.random() * 0.006,
        width: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.5 ? "#3b82f6" : "#0ea5e9",
        active: true,
      };
    };

    for (let i = 0; i < 8; i++) streams.push(mkStream());

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(56,100,160,0.08)";
      ctx.lineWidth = 0.5;
      const gap = 60;
      for (let x = 0; x < W(); x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H());
        ctx.stroke();
      }
      for (let y = 0; y < H(); y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W(), y);
        ctx.stroke();
      }
    };

    const drawOrb = () => {
      const cx = W() * 0.72;
      const cy = H() * 0.32;
      const r = 130;

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grd.addColorStop(0, "rgba(14,165,233,0.18)");
      grd.addColorStop(0.4, "rgba(59,130,246,0.10)");
      grd.addColorStop(1, "rgba(5,13,26,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(14,165,233,0.15)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (r * i) / 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      const now = Date.now() * 0.0006;
      for (let i = 0; i < 3; i++) {
        const angle = now + i * ((Math.PI * 2) / 3);
        const rx = r * 0.65;
        const ry = r * 0.4;
        const ox = cx + Math.cos(angle) * rx;
        const oy = cy + Math.sin(angle) * ry * 0.6;
        const gr2 = ctx.createRadialGradient(ox, oy, 0, ox, oy, 10);
        gr2.addColorStop(0, "rgba(99,179,237,0.7)");
        gr2.addColorStop(1, "rgba(99,179,237,0)");
        ctx.fillStyle = gr2;
        ctx.beginPath();
        ctx.arc(ox, oy, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawConnections = () => {
      const dist = 130;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < dist) {
            const alpha = (1 - d / dist) * 0.18;
            ctx.strokeStyle = `rgba(56,130,220,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 160) {
          const alpha = (1 - md / 160) * 0.35;
          ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    const drawNodes = () => {
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const glow = 0.5 + 0.5 * Math.sin(n.pulse);
        const col = `rgba(99,179,237,${n.opacity * (0.6 + glow * 0.4)})`;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (glow > 0.7) {
          ctx.fillStyle = `rgba(14,165,233,${(glow - 0.7) * 0.3})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawStreams = () => {
      streams.forEach((s, idx) => {
        if (!s.active) return;
        s.t += s.speed;
        if (s.t >= 1) {
          streams[idx] = mkStream();
          return;
        }

        const x = s.from.x + (s.to.x - s.from.x) * s.t;
        const y = s.from.y + (s.to.y - s.from.y) * s.t;

        const head = ctx.createRadialGradient(x, y, 0, x, y, 8);
        head.addColorStop(0, "rgba(14,165,233,0.9)");
        head.addColorStop(1, "rgba(14,165,233,0)");
        ctx.fillStyle = head;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        const tail = 0.08;
        const t0 = Math.max(0, s.t - tail);
        const tx = s.from.x + (s.to.x - s.from.x) * t0;
        const ty = s.from.y + (s.to.y - s.from.y) * t0;

        const grd = ctx.createLinearGradient(tx, ty, x, y);
        grd.addColorStop(0, "rgba(14,165,233,0)");
        grd.addColorStop(1, "rgba(14,165,233,0.6)");
        ctx.strokeStyle = grd;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
    };

    const drawMouseGlow = () => {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90);
      g.addColorStop(0, "rgba(14,165,233,0.07)");
      g.addColorStop(1, "rgba(14,165,233,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2);
      ctx.fill();
    };

    const moveNodes = () => {
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
      });
    };

    const frame = () => {
      ctx.clearRect(0, 0, W(), H());
      drawGrid();
      drawOrb();
      drawConnections();
      drawStreams();
      drawNodes();
      drawMouseGlow();
      moveNodes();
      raf = requestAnimationFrame(frame);
    };

    resize();
    wrap.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default AIHeroBackground;

