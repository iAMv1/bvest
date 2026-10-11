"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { IconArrowRight, IconSparkles } from "@/components/hackathon/Icons";

/**
 * Interactive 3D Cursor-reactive HackBVP Logo
 */
const InteractiveHackBvpLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalized cursor coordinates (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive spring physics for smooth, elastic movement
  const springConfig = { damping: 22, stiffness: 170, mass: 0.55 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dynamic 3D tilt angles and parallax displacement
  const rotateX = useTransform(smoothY, [-1, 1], [16, -16]);
  const rotateY = useTransform(smoothX, [-1, 1], [-16, 16]);
  const posX = useTransform(smoothX, [-1, 1], [-28, 28]);
  const posY = useTransform(smoothY, [-1, 1], [-24, 24]);

  // Ambient cyber glow shifts with depth parallax
  const glowX = useTransform(smoothX, [-1, 1], [-45, 45]);
  const glowY = useTransform(smoothY, [-1, 1], [-40, 40]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Generous interactive zone across the section
      const rangeX = Math.max(300, window.innerWidth * 0.45);
      const rangeY = Math.max(300, window.innerHeight * 0.45);

      const dx = (e.clientX - centerX) / rangeX;
      const dy = (e.clientY - centerY) / rangeY;

      mouseX.set(Math.max(-1, Math.min(1, dx)));
      mouseY.set(Math.max(-1, Math.min(1, dy)));
    };

    const handlePointerLeave = () => {
      // Soft spring back to rest
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full max-w-80 sm:max-w-97.5 lg:max-w-112.5 xl:max-w-122.5 aspect-545/704 perspective-1000 cursor-grab active:cursor-grabbing"
    >
      {/* Dynamic Parallax Cyber Glow Aura */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-full bg-radial from-cyan-400/30 via-blue-600/12 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* 3D Tilting & Floating Logo */}
      <motion.div
        style={{
          x: posX,
          y: posY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.035 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative w-full h-full flex items-center justify-center select-none"
      >
        <Image
          src="/hack8kalogo.png"
          alt="HACK@BVP 8.0 Official Logo"
          width={545}
          height={704}
          priority
          className="w-full h-auto max-h-[68vh] object-contain drop-shadow-[0_0_35px_rgba(56,189,248,0.4)] pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

export const HackBvpLampSection: React.FC = () => {
  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-transparent">
      <LampContainer>
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-20 pb-12 sm:pb-16 flex items-center min-h-[calc(100vh-64px)]">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            
            {/* LEFT COLUMN: Large Typography "BUILD FOR A BETTER WORLD" + Narrative + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-7 flex flex-col items-start justify-center text-left order-1 lg:order-1 z-20"
            >
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/35 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-4 shadow-[0_0_18px_rgba(6,182,212,0.22)] backdrop-blur-md">
                <IconSparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>National Flagship Hackathon &bull; BVEST XIII</span>
              </div>

              {/* Tagline Heading */}
              <h1 className="font-heading font-black tracking-tight text-white uppercase text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[5.5rem] leading-[0.93] text-left">
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-50 to-white">
                  BUILD FOR A
                </span>
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-cyan-400 to-blue-500 drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]">
                  BETTER WORLD
                </span>
              </h1>

              {/* Subtitle Narrative */}
              <p className="mt-5 max-w-xl text-left text-sm sm:text-base md:text-lg text-slate-300/90 font-sans leading-relaxed">
                Where 500+ elite builders, designers, and innovators converge under one roof to architect solutions for the United Nations 17 Sustainable Development Goals.
              </p>

              {/* Action Controls */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5 z-20">
                <a
                  href="#about"
                  onClick={handleScrollToAbout}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  <span>EXPLORE HACKATHON</span>
                  <IconArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://unstop.com/p/hack-at-bvp-80-bharati-vidyapeeths-college-of-engineering-1768545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-500/40 text-white font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] backdrop-blur-md"
                >
                  <span>Register on Unstop</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </a>
              </div>

              {/* Quick Event Metadata Strip */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                  <span>October 18 &amp; 22, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                  <span>Discord &bull; BVCOE Campus</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                  <span>24-Hour Sprint</span>
                </div>
              </div>

              {/* Subtle Scroll Cue */}
              <div
                className="mt-6 inline-flex items-center gap-2 text-cyan-400/60 hover:text-cyan-300 transition-colors cursor-pointer"
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="text-[11px] font-mono tracking-widest uppercase">SCROLL TO EXPLORE</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Interactive 3D Cursor-reactive HackBVP Logo */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 lg:order-2 relative w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.15,
                }}
                className="relative z-20 flex flex-col items-center justify-center w-full"
              >
                <InteractiveHackBvpLogo />
              </motion.div>
            </div>

          </div>
        </div>
      </LampContainer>
    </section>
  );
};

export default HackBvpLampSection;
