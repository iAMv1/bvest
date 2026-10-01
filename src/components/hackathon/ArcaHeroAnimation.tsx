"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import * as THREE from "three";
import { EVENT_CONFIG } from "@/data/event";
import {
  IconSparkles,
  IconArrowRight,
  IconX,
  IconChevronRight,
  IconChevronLeft,
  IconCheck,
} from "@/components/hackathon/Icons";
import { HACKATHON_TRACKS, HackathonTrack } from "@/data/tracks";
import { SDGS_DATA } from "@/data/sdgs";

export type SDGArtifactType =
  | "quantum_ai"
  | "climate_globe"
  | "clean_energy"
  | "bio_helix"
  | "smart_city"
  | "water_crystal"
  | "education_matrix"
  | "circular_loop";

const TRACK_ARTIFACTS: Record<string, SDGArtifactType> = {
  "ai-for-humanity": "quantum_ai",
  "climate-and-planet": "climate_globe",
  "smart-cities": "smart_city",
  "inclusive-futures": "education_matrix",
  "open-impact": "clean_energy",
};

// Interactive 3D Canvas rendering a dedicated rotating SDG geometric artifact
const SDG3DArtifact: React.FC<{ type: SDGArtifactType; color: string }> = ({
  type,
  color,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 220;
    const height = mount.clientHeight || 150;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const threeColor = new THREE.Color(color);
    const brightColor = new THREE.Color(color).offsetHSL(0, 0, 0.2);

    let outerMesh: THREE.Object3D;
    let innerMesh: THREE.Object3D | null = null;

    if (type === "quantum_ai") {
      const icoGeom = new THREE.IcosahedronGeometry(1.15, 0);
      const icoEdges = new THREE.EdgesGeometry(icoGeom);
      outerMesh = new THREE.LineSegments(
        icoEdges,
        new THREE.LineBasicMaterial({ color: threeColor, linewidth: 2, transparent: true, opacity: 0.9 })
      );
      const octGeom = new THREE.OctahedronGeometry(0.6, 0);
      innerMesh = new THREE.Mesh(
        octGeom,
        new THREE.MeshBasicMaterial({ color: brightColor, wireframe: true, transparent: true, opacity: 0.6 })
      );
      group.add(outerMesh, innerMesh);
    } else if (type === "climate_globe") {
      const sphereGeom = new THREE.SphereGeometry(1.1, 14, 14);
      const sphereEdges = new THREE.EdgesGeometry(sphereGeom);
      outerMesh = new THREE.LineSegments(
        sphereEdges,
        new THREE.LineBasicMaterial({ color: threeColor, linewidth: 1.5, transparent: true, opacity: 0.85 })
      );
      const ringGeom = new THREE.RingGeometry(1.35, 1.42, 32);
      const ringEdges = new THREE.EdgesGeometry(ringGeom);
      innerMesh = new THREE.LineSegments(
        ringEdges,
        new THREE.LineBasicMaterial({ color: brightColor, transparent: true, opacity: 0.7 })
      );
      innerMesh.rotation.x = Math.PI / 2.5;
      group.add(outerMesh, innerMesh);
    } else if (type === "clean_energy") {
      const torusGeom = new THREE.TorusKnotGeometry(0.8, 0.2, 64, 8, 2, 3);
      const torusEdges = new THREE.EdgesGeometry(torusGeom);
      outerMesh = new THREE.LineSegments(
        torusEdges,
        new THREE.LineBasicMaterial({ color: threeColor, linewidth: 2, transparent: true, opacity: 0.95 })
      );
      group.add(outerMesh);
    } else if (type === "bio_helix") {
      const curve1 = new THREE.CatmullRomCurve3(
        Array.from({ length: 20 }, (_, i) => {
          const t = (i / 20) * Math.PI * 4;
          return new THREE.Vector3(Math.cos(t) * 0.75, (i / 20) * 2 - 1, Math.sin(t) * 0.75);
        })
      );
      const tubeGeom1 = new THREE.TubeGeometry(curve1, 28, 0.05, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: threeColor, wireframe: true, transparent: true, opacity: 0.9 });
      outerMesh = new THREE.Mesh(tubeGeom1, tubeMat);

      const sphereGeom = new THREE.SphereGeometry(0.45, 8, 8);
      innerMesh = new THREE.Mesh(
        sphereGeom,
        new THREE.MeshBasicMaterial({ color: brightColor, wireframe: true, transparent: true, opacity: 0.7 })
      );
      group.add(outerMesh, innerMesh);
    } else if (type === "smart_city") {
      const dodecGeom = new THREE.DodecahedronGeometry(1.15, 1);
      const dodecEdges = new THREE.EdgesGeometry(dodecGeom);
      outerMesh = new THREE.LineSegments(
        dodecEdges,
        new THREE.LineBasicMaterial({ color: threeColor, linewidth: 2, transparent: true, opacity: 0.9 })
      );
      const centerBox = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      innerMesh = new THREE.Mesh(
        centerBox,
        new THREE.MeshBasicMaterial({ color: brightColor, wireframe: true, transparent: true, opacity: 0.7 })
      );
      group.add(outerMesh, innerMesh);
    } else if (type === "education_matrix") {
      const cubeGeom = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const cubeEdges = new THREE.EdgesGeometry(cubeGeom);
      outerMesh = new THREE.LineSegments(
        cubeEdges,
        new THREE.LineBasicMaterial({ color: threeColor, linewidth: 2, transparent: true, opacity: 0.9 })
      );
      const icoGeom = new THREE.IcosahedronGeometry(0.55, 0);
      innerMesh = new THREE.Mesh(
        icoGeom,
        new THREE.MeshBasicMaterial({ color: brightColor, wireframe: true, transparent: true, opacity: 0.7 })
      );
      group.add(outerMesh, innerMesh);
    } else if (type === "circular_loop") {
      const torusGeom = new THREE.TorusGeometry(1.0, 0.25, 16, 32);
      const torusEdges = new THREE.EdgesGeometry(torusGeom);
      outerMesh = new THREE.LineSegments(
        torusEdges,
        new THREE.LineBasicMaterial({ color: threeColor, linewidth: 2, transparent: true, opacity: 0.9 })
      );
      const octGeom = new THREE.OctahedronGeometry(0.5, 0);
      innerMesh = new THREE.Mesh(
        octGeom,
        new THREE.MeshBasicMaterial({ color: brightColor, wireframe: true, transparent: true, opacity: 0.7 })
      );
      group.add(outerMesh, innerMesh);
    } else {
      const octGeom = new THREE.OctahedronGeometry(1.15, 1);
      const octEdges = new THREE.EdgesGeometry(octGeom);
      outerMesh = new THREE.LineSegments(
        octEdges,
        new THREE.LineBasicMaterial({ color: threeColor, linewidth: 2, transparent: true, opacity: 0.95 })
      );
      const innerIco = new THREE.IcosahedronGeometry(0.5, 0);
      innerMesh = new THREE.Mesh(
        innerIco,
        new THREE.MeshBasicMaterial({ color: brightColor, wireframe: true, transparent: true, opacity: 0.6 })
      );
      group.add(outerMesh, innerMesh);
    }

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      group.rotation.y += delta * 0.7;
      group.rotation.x += delta * 0.3;

      if (innerMesh) {
        innerMesh.rotation.y -= delta * 0.9;
        innerMesh.rotation.z += delta * 0.4;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type, color]);

  return <div ref={mountRef} className="w-full h-36 sm:h-40 flex items-center justify-center relative pointer-events-none" />;
};

// 3D Wireframe Cyber Cube in Three.js (Inspired by Arca's rotating cube identity)
const RotatingWireframeCube: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = 36;
    const height = 36;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const boxGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const boxEdges = new THREE.EdgesGeometry(boxGeometry);
    const boxMaterial = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.9,
    });
    const boxLine = new THREE.LineSegments(boxEdges, boxMaterial);
    scene.add(boxLine);

    const octGeometry = new THREE.OctahedronGeometry(0.65);
    const octEdges = new THREE.EdgesGeometry(octGeometry);
    const octMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 1,
      transparent: true,
      opacity: 0.7,
    });
    const octLine = new THREE.LineSegments(octEdges, octMaterial);
    scene.add(octLine);

    let animationFrameId: number;
    const animate = () => {
      boxLine.rotation.x += 0.012;
      boxLine.rotation.y += 0.016;
      octLine.rotation.x -= 0.015;
      octLine.rotation.y += 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeometry.dispose();
      boxEdges.dispose();
      boxMaterial.dispose();
      octGeometry.dispose();
      octEdges.dispose();
      octMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer" />;
};

interface ArcaHeroAnimationProps {
  onRegisterClick?: () => void;
  onExploreTracks?: () => void;
}

export const ArcaHeroAnimation: React.FC<ArcaHeroAnimationProps> = ({
  onRegisterClick,
  onExploreTracks,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<HackathonTrack | null>(null);
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardPointerDownPos = useRef({ x: 0, y: 0 });
  const dragStartXRef = useRef(0);
  const dragStartRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Card cylinder configuration matching the exact ThreeUI Arca slant & radius for 5 tracks
  const totalCards = HACKATHON_TRACKS.length;
  const cylinderRadius = 400; // Optimal 3D push radius for 5 cards
  const baseTiltX = -10; // -10deg pitch tilt
  const baseTiltZ = 8; // +8deg diagonal slant across canvas

  // Continuous 60fps rotational physics engine
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Slow rotation when hovering or if track modal is open
      if (!isDragging) {
        // Friction dampening for flick gestures
        velocityRef.current *= 0.94;
        if (Math.abs(velocityRef.current) < 0.005) {
          velocityRef.current = 0;
        }

        // Base auto-spin: normal speed ~12deg/s, paused on hover or if inspecting track
        const autoSpeed = selectedTrack || isHovered ? 0 : 12;
        const deltaAngle = (autoSpeed + velocityRef.current) * dt;

        setRotationAngle((prev) => (prev + deltaAngle) % 360);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isDragging, isHovered, selectedTrack]);

  // Mouse Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: x * 14,
      y: -y * 8,
    });
  };

  // Pointer drag to spin cylinder (ignores buttons and links)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, a")) {
      return;
    }
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    dragStartRotationRef.current = rotationAngle;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const instantDeltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    // Track instant velocity for flick
    velocityRef.current = instantDeltaX * 18;

    // Direct scrub
    setRotationAngle((dragStartRotationRef.current + deltaX * 0.35) % 360);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Step next/prev manually
  const stepCylinder = (direction: 1 | -1) => {
    const stepAngle = 360 / totalCards;
    velocityRef.current = direction * 120;
  };

  return (
    <>
      <div
        ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between overflow-hidden bg-radial from-[#0d1527] via-[#07090e] to-[#030508] text-white rounded-3xl border border-white/10 shadow-[0_0_90px_rgba(0,180,255,0.18)] select-none p-4 sm:p-8 cursor-grab active:cursor-grabbing"
      style={{ perspective: "1200px" }}
    >
      {/* Background Cyber Grid & Vibrant Glow Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-137.5 h-137.5 bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP BRAND & HUD BAR (Arca Style Minimalist Capsule Header) */}
      <div className="relative z-40 flex items-center justify-between w-full pb-4 border-b border-white/10 text-xs font-mono">
        {/* Left: Official HackBVP Logo + Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-7 shrink-0 flex items-center justify-center">
            <Image
              src="/hack8kalogo.png"
              alt="HackBVP 8.0 Logo"
              width={36}
              height={48}
              priority
              className="h-9 w-auto object-contain drop-shadow-[0_0_14px_rgba(56,189,248,0.85)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-sm tracking-wider uppercase bg-linear-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
              HACKATHON TRACKS
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-tight">
              3D Rotating SDG Missions &middot; BVEST XIII
            </span>
          </div>
        </div>

        {/* Middle: Interactive Section Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-gray-300 font-semibold tracking-wider uppercase">
            CONTINUOUS 3D CAROUSEL // 5 HACKATHON TRACKS
          </span>
        </div>

        {/* Right: Quick Controls & Drag Hint */}
        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-block text-[10px] font-mono text-gray-400 uppercase tracking-widest mr-1">
            Drag to Spin
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stepCylinder(-1);
            }}
            aria-label="Spin left"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-90"
          >
            <IconChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stepCylinder(1);
            }}
            aria-label="Spin right"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-90"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* OVERSIZED BACKGROUND TYPOGRAPHY (Layered behind the 3D rotating cylinder) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-10">
        <div
          className="flex flex-col items-center justify-center opacity-20 transition-transform duration-300"
          style={{
            transform: `translate(${tilt.x * -0.6}px, ${tilt.y * -0.6}px) rotate(-4deg)`,
          }}
        >
          <div className="relative w-28 sm:w-36 lg:w-44 mb-2 drop-shadow-[0_0_40px_rgba(56,189,248,0.6)]">
            <Image
              src="/hack8kalogo.png"
              alt="HackBVP Logo Watermark"
              width={200}
              height={260}
              className="w-full h-auto object-contain"
            />
          </div>
          <span className="font-heading text-[13vw] lg:text-[15vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap drop-shadow-2xl">
            TRACKS
          </span>
          <span className="font-mono text-sm sm:text-xl tracking-[0.45em] uppercase text-cyan-400 -mt-2 lg:-mt-5 font-bold">
            5 IMPACT HORIZONS &bull; 17 UN SDGS &bull; 2026
          </span>
        </div>
      </div>

      {/* CONTINUOUS ROTATING 3D CYLINDER OF 5 TRACK CARDS */}
      <div className="relative z-30 flex-1 flex items-center justify-center w-full my-4 overflow-visible">
        {/* The 3D Stage tilted with Arca's iconic pitch and slant */}
        <div
          className="relative w-full h-125 sm:h-135 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${baseTiltX + tilt.y}deg) rotateZ(${baseTiltZ}deg) rotateY(${tilt.x * 0.4}deg)`,
            transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Rotating cylindrical ring with 5 cards */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotationAngle}deg)`,
            }}
          >
            {HACKATHON_TRACKS.map((track, index) => {
              const cardAngle = (360 / totalCards) * index;
              // Compute angle relative to viewer to determine depth shading & front/back status
              const currentCardAngle = (rotationAngle + cardAngle) % 360;
              const rad = (currentCardAngle * Math.PI) / 180;
              const cosVal = Math.cos(rad); // 1 = facing front, -1 = facing back
              const isFrontFacing = cosVal > -0.25;
              const artifactType = TRACK_ARTIFACTS[track.id] || "quantum_ai";

              return (
                <div
                  key={track.id}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    cardPointerDownPos.current = { x: e.clientX, y: e.clientY };
                  }}
                  onPointerUp={(e) => {
                    e.stopPropagation();
                    const dist = Math.hypot(
                      e.clientX - cardPointerDownPos.current.x,
                      e.clientY - cardPointerDownPos.current.y
                    );
                    if (dist < 20) {
                      setSelectedTrack(track);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTrack(track);
                  }}
                  className="absolute w-70 sm:w-76.25 h-100 sm:h-110 rounded-3xl p-5 flex flex-col justify-between cursor-pointer transition-shadow select-none group pointer-events-auto"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${cardAngle}deg) translateZ(${cylinderRadius}px)`,
                    backfaceVisibility: "hidden",
                    backgroundColor: "#080b12",
                    border: `1.5px solid ${track.accentColor}77`,
                    boxShadow: isFrontFacing
                      ? `0 20px 50px -10px ${track.accentColor}44, 0 0 30px ${track.accentColor}25`
                      : "0 10px 30px rgba(0,0,0,0.8)",
                    opacity: isFrontFacing ? 1 : 0.45,
                  }}
                >
                  {/* Holographic foil sheen overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.08)_50%,transparent_70%)] pointer-events-none" />

                  {/* Card Top: Track Number Badge & Title */}
                  <div className="relative z-10 flex items-start justify-between gap-2 pb-2.5 border-b border-white/10">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black border"
                          style={{
                            borderColor: track.accentColor,
                            color: track.accentColor,
                            backgroundColor: `${track.accentColor}20`,
                          }}
                        >
                          TRACK {track.number}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {track.sdgs.length} Connected SDGs
                        </span>
                      </div>
                      <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight leading-snug">
                        {track.title}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 mt-1 line-clamp-2 leading-relaxed">
                        {track.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Card Middle: Dedicated 3D Rotating Geometric Artifact */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
                    <SDG3DArtifact type={artifactType} color={track.accentColor} />

                    {/* Ambient glow under the 3D artifact */}
                    <div
                      className="absolute inset-0 w-28 h-28 mx-auto my-auto rounded-full blur-2xl opacity-40 pointer-events-none"
                      style={{ backgroundColor: track.accentColor }}
                    />
                  </div>

                  {/* Aligned SDG Number Indicators */}
                  <div className="relative z-10 py-1.5 flex flex-wrap gap-1 items-center">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mr-1">
                      SDGs:
                    </span>
                    {track.sdgs.slice(0, 5).map((sdgNum) => {
                      const sdg = SDGS_DATA.find((s) => s.id === sdgNum);
                      return (
                        <span
                          key={sdgNum}
                          className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-mono font-bold text-white border border-white/20"
                          style={{ backgroundColor: sdg?.color || track.accentColor }}
                          title={sdg?.title || `SDG ${sdgNum}`}
                        >
                          {sdgNum}
                        </span>
                      );
                    })}
                    {track.sdgs.length > 5 && (
                      <span className="text-[9px] font-mono text-gray-400">
                        +{track.sdgs.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Card Bottom: Barcode + Pill Action Button */}
                  <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    {/* Cyber Barcode */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-0.5 h-4">
                        <span className="w-0.5 h-full bg-white" />
                        <span className="w-1 h-full bg-white" />
                        <span className="w-0.5 h-full bg-white/40" />
                        <span className="w-1.5 h-full bg-white" />
                        <span className="w-0.5 h-full bg-white" />
                        <span className="w-1 h-full bg-white/40" />
                        <span className="w-2 h-full bg-white" />
                        <span className="w-0.5 h-full bg-white" />
                      </div>
                      <span className="font-mono text-[8px] text-gray-400 tracking-widest mt-0.5">
                        TRACK-{track.number}
                      </span>
                    </div>

                    {/* Pill Action Button */}
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        cardPointerDownPos.current = { x: e.clientX, y: e.clientY };
                      }}
                      onPointerUp={(e) => {
                        e.stopPropagation();
                        setSelectedTrack(track);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTrack(track);
                      }}
                      className="relative z-30 pointer-events-auto cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-black font-mono font-bold text-[10px] tracking-wider uppercase transition-all shadow-md hover:scale-105 active:scale-95"
                      style={{ backgroundColor: track.accentColor }}
                    >
                      <span>INSPECT TRACK</span>
                      <IconArrowRight size={11} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION & STATS DOCK (Arca Style Minimalist Hero Footer) */}
      <div className="relative z-40 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left: Punchy subheadline */}
        <div className="md:col-span-5 flex flex-col">
          <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
            5 Hackathon Challenge Tracks.
            <span className="text-cyan-400">&searr;</span>
          </span>
          <span className="text-xs text-gray-400 font-mono mt-0.5">
            Drag horizontally to spin cylinder &bull; Click any rotating card to inspect full challenges.
          </span>
        </div>

        {/* Center: Minimalist HUD Metric Readouts */}
        <div className="md:col-span-4 flex items-center justify-between sm:justify-center gap-4 sm:gap-6 font-mono text-xs border-y md:border-y-0 md:border-x border-white/10 py-2 md:py-0 px-2 md:px-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-white text-sm">5</span>
            <span className="text-[10px] text-gray-400 uppercase">TRACKS</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="font-bold text-cyan-400 text-sm">17</span>
            <span className="text-[10px] text-gray-400 uppercase">UN SDGS</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="font-bold text-white text-sm">36H</span>
            <span className="text-[10px] text-gray-400 uppercase">SPRINT</span>
          </div>
        </div>

        {/* Right: Primary Call to Action */}
        <div className="md:col-span-3 flex items-center justify-end gap-2.5">
          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onRegisterClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-cyan-400 via-sky-300 to-indigo-400 text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all active:scale-95"
          >
            <IconSparkles size={14} />
            <span>JOIN HACKATHON</span>
            <IconArrowRight size={14} />
          </a>
        </div>

        {/* Direct Clickable Quick-Inspect Track Pills */}
        <div className="md:col-span-12 flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-white/10">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mr-1">
            QUICK INSPECT:
          </span>
          {HACKATHON_TRACKS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTrack(t);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all border hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:brightness-125"
              style={{
                borderColor: `${t.accentColor}77`,
                backgroundColor: `${t.accentColor}22`,
                color: "#ffffff",
              }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.accentColor }} />
              <span>{t.number} {t.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* INSPECT TRACK MISSION DETAIL MODAL (Rendered directly in document.body via Portal) */}
    {mounted && typeof document !== "undefined" && createPortal(
      <AnimatePresence>
        {selectedTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-999999 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedTrack(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl bg-[#090d16] border shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
              style={{ borderColor: selectedTrack.accentColor }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTrack(null)}
                aria-label="Close track detail"
                className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-105"
              >
                <IconX size={18} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                {/* Left Side: 5 Tracks Selector Bar (Identical to left side of user screenshot) */}
                <div className="lg:col-span-4 p-4 sm:p-5 flex flex-col gap-2.5 bg-black/40">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-bold">
                      SELECT TRACK (1-5)
                    </span>
                  </div>

                  {HACKATHON_TRACKS.map((track) => {
                    const isSelected = track.id === selectedTrack.id;
                    return (
                      <button
                        key={track.id}
                        onClick={() => setSelectedTrack(track)}
                        className={`text-left p-3 rounded-2xl transition-all border flex items-center justify-between group ${
                          isSelected
                            ? "bg-white/10 border-white/30 shadow-lg scale-[1.02]"
                            : "bg-white/2 border-white/5 hover:bg-white/6 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="px-2 py-1 rounded-md text-[10px] font-mono font-bold shrink-0 mt-0.5"
                            style={{
                              backgroundColor: `${track.accentColor}25`,
                              color: track.accentColor,
                              border: `1px solid ${track.accentColor}44`,
                            }}
                          >
                            {track.number}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-tight">
                              {track.title}
                            </span>
                            <span className="text-[10px] font-mono text-gray-400 line-clamp-1 mt-0.5">
                              {track.tagline}
                            </span>
                          </div>
                        </div>
                        <IconChevronRight
                          size={14}
                          className={`shrink-0 transition-transform ${
                            isSelected ? "text-cyan-400 translate-x-1" : "text-gray-600 group-hover:text-gray-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right Side: Detailed Track Mission View (Matching right side of user screenshot) */}
                <div className="lg:col-span-8 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    {/* Header badge & Connected SDGs count */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border"
                        style={{
                          borderColor: selectedTrack.accentColor,
                          color: selectedTrack.accentColor,
                          backgroundColor: `${selectedTrack.accentColor}20`,
                        }}
                      >
                        TRACK {selectedTrack.number}
                      </span>
                      <span className="font-mono text-xs text-gray-400">
                        {selectedTrack.sdgs.length} Connected SDGs
                      </span>
                    </div>

                    {/* Track Title */}
                    <h2 className="font-heading text-2xl sm:text-4xl font-black text-white tracking-tight uppercase mb-2">
                      {selectedTrack.title}
                    </h2>

                    {/* Tagline in cyan */}
                    <p className="text-cyan-400 font-sans font-medium text-sm sm:text-base leading-snug mb-4">
                      {selectedTrack.tagline}
                    </p>

                    {/* Description Paragraph */}
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans mb-6">
                      {selectedTrack.description}
                    </p>

                    {/* Aligned UN Sustainable Development Goals */}
                    <div className="mb-6">
                      <span className="font-mono text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
                        ALIGNED UN SUSTAINABLE DEVELOPMENT GOALS:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedTrack.sdgs.map((sdgNum) => {
                          const sdg = SDGS_DATA.find((s) => s.id === sdgNum);
                          if (!sdg) return null;
                          return (
                            <div
                              key={sdg.id}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium border"
                              style={{
                                borderColor: `${sdg.color}55`,
                                backgroundColor: `${sdg.color}15`,
                                color: "#ffffff",
                              }}
                            >
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: sdg.color }}
                              />
                              <span>
                                Goal {sdg.number} {sdg.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inspiration Challenge Statements */}
                    <div className="mb-6">
                      <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-3">
                        INSPIRATION CHALLENGE STATEMENTS:
                      </span>
                      <div className="space-y-2.5">
                        {selectedTrack.keyChallenges.map((challenge, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 sm:p-4 rounded-xl bg-white/3 border border-white/10 flex items-start gap-3 transition-colors hover:bg-white/6"
                          >
                            <IconCheck size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
                              {challenge}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Tech Primitives */}
                    <div className="mb-8">
                      <span className="font-mono text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
                        RECOMMENDED TECH PRIMITIVES:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedTrack.techPointers.map((primitive, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
                          >
                            {primitive}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={EVENT_CONFIG.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 py-3 px-6 rounded-full text-black font-heading font-bold text-xs uppercase tracking-wider text-center hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)]"
                      style={{ backgroundColor: selectedTrack.accentColor }}
                    >
                      REGISTER FOR THIS TRACK ON DEVFOLIO
                    </a>
                    <button
                      onClick={() => setSelectedTrack(null)}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
  </>
  );
};
