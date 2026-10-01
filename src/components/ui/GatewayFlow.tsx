"use client";

import React, { useEffect, useRef } from "react";

export interface GatewayFlowProps {
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  density?: number;
  particleColor?: string;
  lineColor?: string;
  glowColor?: string;
  interactive?: boolean;
}

interface Particle {
  t: number;
  speed: number;
  size: number;
  color: string;
}

interface Path {
  isLeft: boolean;
  startY: number;
  particles: Particle[];
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  life: number;
}

export const GatewayFlow: React.FC<GatewayFlowProps> = ({
  className = "",
  style,
  speed = 1,
  density = 1,
  particleColor = "rgba(6, 182, 212, 0.95)",
  lineColor = "rgba(6, 182, 212, 0.45)",
  glowColor = "rgba(56, 189, 248, 0.8)",
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    let ripples: Ripple[] = [];
    const paths: Path[] = [];

    const numPaths = Math.max(24, Math.round(70 * density));

    const cyanPalette = [
      "rgba(6, 182, 212, 0.95)",
      "rgba(56, 189, 248, 1)",
      "rgba(255, 255, 255, 0.9)",
      "rgba(34, 211, 238, 0.95)",
      "rgba(147, 197, 253, 0.9)",
    ];

    const initPaths = (w: number, h: number) => {
      paths.length = 0;
      const safeH = h > 100 ? h : typeof window !== "undefined" ? window.innerHeight : 900;
      for (let i = 0; i < numPaths; i++) {
        const isLeft = i % 2 === 0;
        const startY = (i / numPaths) * (safeH * 1.35) - safeH * 0.18;
        const particleCount = 1 + (i % 2);
        const particles: Particle[] = [];
        for (let p = 0; p < particleCount; p++) {
          particles.push({
            t: Math.random(),
            speed: (0.0016 + Math.random() * 0.0022) * speed,
            size: 2.0 + Math.random() * 2.2,
            color: cyanPalette[Math.floor(Math.random() * cyanPalette.length)],
          });
        }
        paths.push({
          isLeft,
          startY,
          particles,
        });
      }
    };

    const getViewportDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth || document.documentElement.clientWidth || 1440;
      const h = parent?.clientHeight || window.innerHeight || document.documentElement.clientHeight || 900;
      return { w, h };
    };

    const resize = () => {
      if (!canvas || !ctx) return;
      const { w, h } = getViewportDimensions();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const sizeChanged = Math.abs(width - w) > 20 || Math.abs(height - h) > 20;
      width = w;
      height = h;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (paths.length === 0 || sizeChanged) {
        initPaths(width, height);
      }
    };

    resize();

    // Trigger initial central pulse after mount
    const initialPulse = setTimeout(() => {
      if (width && height) {
        ripples.push({
          x: width / 2,
          y: height / 2,
          radius: 0,
          life: 1,
        });
      }
    }, 250);

    // Multiple layout settle checks to guarantee dimensions never freeze at 0
    const t1 = setTimeout(resize, 60);
    const t2 = setTimeout(resize, 200);
    const t3 = setTimeout(resize, 500);

    window.addEventListener("resize", resize);

    // ResizeObserver for reliable container tracking
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      ro = new ResizeObserver(() => {
        resize();
      });
      ro.observe(canvas.parentElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        ripples.push({
          x,
          y,
          radius: 0,
          life: 1,
        });
      }
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("click", handleClick);
    }

    function getBezierPoint(
      t: number,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number }
    ) {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
      };
    }

    // Render loop
    const render = () => {
      if (!width || !height) {
        resize();
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      const centerX = width / 2;
      const centerY = height / 2;

      // Update click shockwave ripples
      ripples.forEach((exp) => {
        exp.radius += 14;
        exp.life -= 0.016;
      });
      ripples = ripples.filter((exp) => exp.life > 0);

      // Draw active ripples
      ripples.forEach((exp) => {
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0, exp.life * 0.45)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Interactive hover light
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        const hoverGrad = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          160
        );
        hoverGrad.addColorStop(0, "rgba(6, 182, 212, 0.12)");
        hoverGrad.addColorStop(1, "transparent");
        ctx.fillStyle = hoverGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Converging Bezier Paths and Dotted Particle Streams
      paths.forEach((path) => {
        const p0 = { x: path.isLeft ? -20 : width + 20, y: path.startY };
        const p1 = {
          x: path.isLeft ? centerX * 0.45 : width - centerX * 0.45,
          y: path.startY,
        };
        const p2 = {
          x: path.isLeft ? centerX * 0.8 : width - centerX * 0.8,
          y: centerY,
        };
        const p3 = { x: centerX, y: centerY };

        // Draw dotted dashed stream track (dots effect)
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.1;
        ctx.setLineDash([1, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animate particles along path
        path.particles.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            path.startY += (Math.random() - 0.5) * 8;
          }

          const basePos = getBezierPoint(p.t, p0, p1, p2, p3);
          let posX = basePos.x;
          let posY = basePos.y;

          // Mouse Hover Disruption (Gravitational Repel/Deflection)
          if (mouseX > -500) {
            const dx = posX - mouseX;
            const dy = posY - mouseY;
            const dist = Math.hypot(dx, dy);
            const hoverRadius = 140;
            if (dist < hoverRadius && dist > 1) {
              const force = (1 - dist / hoverRadius) * 45;
              posX += (dx / dist) * force;
              posY += (dy / dist) * force;
            }
          }

          // Click Shockwave Disruption
          ripples.forEach((exp) => {
            const dx = posX - exp.x;
            const dy = posY - exp.y;
            const dist = Math.hypot(dx, dy);
            const waveWidth = 100;
            if (dist < exp.radius + waveWidth && dist > exp.radius - waveWidth && dist > 1) {
              const force = (1 - Math.abs(dist - exp.radius) / waveWidth) * exp.life * 65;
              posX += (dx / dist) * force;
              posY += (dy / dist) * force;
            }
          });

          // Draw Glowing Dots / Particles
          ctx.beginPath();
          ctx.arc(posX, posY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleVisibility = () => {
      if (!document.hidden) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(initialPulse);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", resize);
      if (ro) ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("click", handleClick);
      }
    };
  }, [speed, density, lineColor, glowColor, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`block pointer-events-none ${className}`}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
};

export default GatewayFlow;
