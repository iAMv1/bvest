"use client";

import React, { useEffect, useRef } from "react";

/**
 * DotMatrix
 * A grid of tiny dots with a slow idle shimmer. Dots near the cursor
 * swell and brighten, then ease back down.
 *
 * Props
 *  - spacing:  px between dots (default 28)
 *  - radius:   cursor influence radius in px (default 170)
 *  - color:    "r,g,b" string (default cyan)
 *  - opacity:  overall opacity of the layer (default 1)
 *  - className / style: pass-through for the wrapper
 */
export interface DotMatrixProps {
  spacing?: number;
  radius?: number;
  color?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function DotMatrix({
  spacing = 28,
  radius = 170,
  color = "34,211,238",
  opacity = 1,
  className,
  style,
}: DotMatrixProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let level = new Float32Array(0); // current glow level per dot
    let gap = spacing;
    let rafId = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999, active: false };

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gap = w < 640 ? spacing * 1.4 : spacing; // fewer dots on phones
      cols = Math.floor(w / gap) + 1;
      rows = Math.floor(h / gap) + 1;
      level = new Float32Array(cols * rows);
      if (!running) draw(performance.now());
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const offsetX = (w - (cols - 1) * gap) / 2;
      const offsetY = (h - (rows - 1) * gap) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = offsetX + c * gap;
          const y = offsetY + r * gap;

          // target glow from cursor proximity
          let target = 0;
          if (mouse.active && !reduceMotion) {
            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            if (dist < radius) {
              const t = 1 - dist / radius;
              target = t * t;
            }
          }
          level[i] += (target - level[i]) * 0.14;
          const lv = level[i];

          // slow diagonal shimmer so the field is never fully static
          const idle = reduceMotion
            ? 0
            : 0.5 + 0.5 * Math.sin(now * 0.0007 + (c + r) * 0.45);

          const alpha = 0.03 + idle * 0.03 + lv * 0.75;
          const size = 1 + lv * 2.2;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fill();
        }
      }
    }

    function frame(now: number) {
      if (!running) return;
      draw(now);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onMove(e: PointerEvent) {
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= -radius &&
        mouse.x <= rect.width + radius &&
        mouse.y >= -radius &&
        mouse.y <= rect.height + radius;
    }

    function onLeave() {
      mouse.active = false;
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(wrap);

    // Listen on window so it works even though the layer has pointer-events: none
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [spacing, radius, color]);

  const mask =
    "radial-gradient(ellipse at center, #000 40%, transparent 100%)";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity,
        WebkitMaskImage: mask,
        maskImage: mask,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
