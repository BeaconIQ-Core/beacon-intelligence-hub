import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  baseR: number;
  vx: number;
  vy: number;
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
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));

    const cursorRing = cursorRingRef.current;
    const cursorDot = cursorDotRef.current;

    /* ── Mouse state ── */
    const mouse = { x: -300, y: -300, px: -300, py: -300, inside: false };
    const ripples: { x: number; y: number; r: number; maxR: number; alpha: number; speed: number }[] = [];
    let lastRippleTime = 0;

    const NODE_COUNT = 60;
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
    };

    const mkNode = (): Node => {
      const baseR = Math.random() * 2.2 + 1;
      return {
        x: Math.random() * Math.max(1, wrap.clientWidth),
        y: Math.random() * Math.max(1, wrap.clientHeight),
        baseR,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        opacity: Math.random() * 0.45 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.018,
      };
    };

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

    for (let i = 0; i < 9; i++) streams.push(mkStream());

    const updateCursorEls = () => {
      if (!cursorRing || !cursorDot) return;
      cursorRing.style.left = `${mouse.x}px`;
      cursorRing.style.top = `${mouse.y}px`;
      cursorDot.style.left = `${mouse.x}px`;
      cursorDot.style.top = `${mouse.y}px`;
      const op = mouse.inside ? "1" : "0";
      cursorRing.style.opacity = op;
      cursorDot.style.opacity = op;
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;

      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.inside = inside;

      if (!inside) {
        mouse.x = -300;
        mouse.y = -300;
        updateCursorEls();
        return;
      }

      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      updateCursorEls();

      /* spawn ripple on movement */
      const now = Date.now();
      const dx = mouse.x - mouse.px;
      const dy = mouse.y - mouse.py;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (now - lastRippleTime > 80 && speed > 4) {
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          r: 0,
          maxR: 90 + speed * 1.2,
          alpha: 0.55,
          speed: 2.5 + speed * 0.08,
        });
        lastRippleTime = now;
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(56,100,160,0.07)";
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

    /* 1. Spotlight */
    const drawSpotlight = () => {
      if (!mouse.inside) return;
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
      g.addColorStop(0, "rgba(14,165,233,0.055)");
      g.addColorStop(0.5, "rgba(14,165,233,0.022)");
      g.addColorStop(1, "rgba(14,165,233,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
      ctx.fill();
    };

    /* 2. Ripple / shockwaves */
    const drawRipples = () => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += rp.speed;
        rp.alpha *= 0.93;
        if (rp.r >= rp.maxR || rp.alpha < 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        const fade = 1 - rp.r / rp.maxR;
        ctx.strokeStyle = `rgba(14,165,233,${rp.alpha * fade})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
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

      ctx.strokeStyle = "rgba(14,165,233,0.13)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (r * i) / 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      const now = Date.now() * 0.0006;
      for (let i = 0; i < 3; i++) {
        const angle = now + i * ((Math.PI * 2) / 3);
        const ox = cx + Math.cos(angle) * r * 0.65;
        const oy = cy + Math.sin(angle) * r * 0.24;
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
      const dist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < dist) {
            const alpha = (1 - d / dist) * 0.17;
            ctx.strokeStyle = `rgba(56,130,220,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        if (!mouse.inside) continue;
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 180) {
          const alpha = (1 - md / 180) * 0.5;
          ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
          ctx.lineWidth = 0.9;
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

        let proxFactor = 0;
        if (mouse.inside) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          proxFactor = Math.max(0, 1 - d / 160);
        }

        const displayR = n.baseR + proxFactor * 5;
        const brightness = n.opacity * (0.6 + glow * 0.4) + proxFactor * 0.7;

        ctx.fillStyle = `rgba(99,179,237,${Math.min(brightness, 1)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, displayR, 0, Math.PI * 2);
        ctx.fill();

        if (proxFactor > 0.15 || glow > 0.75) {
          const glowR = displayR * (proxFactor > 0.15 ? 4.5 : 3.5);
          const glowA = proxFactor > 0.15 ? proxFactor * 0.45 : (glow - 0.75) * 0.25;
          ctx.fillStyle = `rgba(14,165,233,${glowA})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
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
        grd.addColorStop(1, "rgba(14,165,233,0.55)");
        ctx.strokeStyle = grd;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
    };

    /* 5. Particle repulsion physics */
    const REPEL_RADIUS = 110;
    const REPEL_FORCE = 0.55;
    const applyRepulsion = () => {
      if (!mouse.inside) return;
      nodes.forEach((n) => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL_RADIUS && d > 0) {
          const force = REPEL_FORCE * (1 - d / REPEL_RADIUS);
          n.vx += (dx / d) * force;
          n.vy += (dy / d) * force;
        }
        n.vx *= 0.92;
        n.vy *= 0.92;
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > 2.2) {
          n.vx = (n.vx / spd) * 2.2;
          n.vy = (n.vy / spd) * 2.2;
        }
      });
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
      drawSpotlight();
      drawRipples();
      drawOrb();
      drawConnections();
      drawStreams();
      drawNodes();
      applyRepulsion();
      moveNodes();
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    updateCursorEls();
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none cursor-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        ref={cursorRingRef}
        className="absolute w-9 h-9 rounded-full border-[1.5px] border-brand-cyan/70 mix-blend-screen"
        style={{ transform: "translate(-50%,-50%)", opacity: 0 }}
      />
      <div
        ref={cursorDotRef}
        className="absolute w-[5px] h-[5px] rounded-full bg-brand-cyan"
        style={{ transform: "translate(-50%,-50%)", opacity: 0 }}
      />
    </div>
  );
};

export default AIHeroBackground;

