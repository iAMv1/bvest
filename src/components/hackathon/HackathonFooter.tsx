"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EVENT_CONFIG } from "@/data/event";
import { SDGS_DATA } from "@/data/sdgs";
import { IconMapPin, IconCalendar, IconExternalLink, IconSparkles } from "@/components/hackathon/Icons";

export const HackathonFooter: React.FC = () => {
  return (
    <footer id="contact" className="relative bg-[#05070B] border-t border-white/10 text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-9 shrink-0 flex items-center justify-center">
                <Image
                  src="/hack8kalogo.png"
                  alt="HackBVP 8.0 Logo"
                  width={44}
                  height={58}
                  className="h-11 w-auto object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]"
                />
              </div>
              <span className="font-heading font-black text-2xl tracking-tight text-white">
                HACKBVP <span className="text-cyan-400">8.0</span>
              </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold">
              {EVENT_CONFIG.tagline}
            </p>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The flagship national sustainability hackathon of BVEST XIII at Bharati Vidyapeeth&apos;s College of Engineering (BVCOE Delhi). 36 hours dedicated to building solutions for the 17 UN SDGs.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-2">
                <IconMapPin size={14} className="text-cyan-400" />
                <span>{EVENT_CONFIG.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCalendar size={14} className="text-cyan-400" />
                <span>{EVENT_CONFIG.dates}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white block mb-4">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About HackBVP
                </a>
              </li>
              <li>
                <a href="#sdgs" className="hover:text-cyan-400 transition-colors">
                  17 UN SDGs
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-cyan-400 transition-colors">
                  Innovation Tracks
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-cyan-400 transition-colors">
                  Run of Show
                </a>
              </li>
              <li>
                <a href="#prizes" className="hover:text-cyan-400 transition-colors">
                  Prizes &amp; Grants
                </a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-cyan-400 transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/" className="text-cyan-400 hover:underline">
                  &larr; Back to BVEST Fest
                </Link>
              </li>
            </ul>
          </div>

          {/* SDG Direct Index */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white block mb-4">
              THE 17 SDG SPECTRUM
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-gray-400">
              {SDGS_DATA.map((sdg) => (
                <a
                  key={sdg.id}
                  href="#sdgs"
                  className="hover:text-white transition-colors truncate flex items-center gap-1.5"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: sdg.color }}
                  />
                  <span>#{sdg.number} {sdg.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Socials, Communication & Organizers */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white block mb-1">
              CONNECT &amp; INQUIRE
            </span>

            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a
                  href={EVENT_CONFIG.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Discord Community</span>
                  <IconExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href={EVENT_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Instagram @hackbvp</span>
                  <IconExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href={EVENT_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <IconExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EVENT_CONFIG.email}`}
                  className="text-cyan-400 hover:underline"
                >
                  {EVENT_CONFIG.email}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase text-gray-500 block mb-1">
                ORGANIZED BY:
              </span>
              <p className="text-xs text-gray-300 font-medium">
                {EVENT_CONFIG.organizer}
              </p>
              <p className="text-[11px] text-gray-500 font-mono">
                {EVENT_CONFIG.institution}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} HackBVP 8.0 &middot; Bharati Vidyapeeth&apos;s College of Engineering. All rights reserved.
          </p>

          <p className="text-cyan-400/90 font-medium italic text-center">
            &ldquo;Powered by people who believe technology should create impact.&rdquo;
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <span className="hover:text-gray-300 cursor-pointer">
              Code of Conduct
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
