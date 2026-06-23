"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { stackItems } from "@/data";
import { useTilt3d } from "@/hooks/useTilt3d";
import AuroraBackground from "./AuroraBackground";
import dynamic from "next/dynamic";
const Globe = dynamic(() => import("./ui/Earth").then((mod) => mod.Earth), { ssr: false });
import { Sparkles } from "./ui/Sparkles";
import { Spotlight, SpotLightItem } from "./ui/spotlight";


/* ── Reveal variants ──────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── WIB Hover Card (spotlight effect) ──────────────── */
function WibHoverCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", String(e.clientX - rect.left));
    el.style.setProperty("--y", String(e.clientY - rect.top));
  }, []);
  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--x", "-9999");
    el.style.setProperty("--y", "-9999");
  }, []);
  return (
    <div
      ref={ref}
      className={`wib-hover-wrap ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/* ── Bento Card wrapper ──────────────────────── */
function BentoCard({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, onMove, onLeave } = useTilt3d(6);
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={`glass-card p-7 overflow-hidden relative ${className}`}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.12s linear" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Email Copy ──────────────────────────────── */
function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText("janavi0612@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);
  return (
    <div className="flex items-center gap-2.5 mt-5 px-4 py-3 bg-[#0a0a12] rounded-[14px] border border-white/[0.06] text-sm transition-colors hover:bg-[#111120]">
      <span className="text-white/55">janavi0612@gmail.com</span>
      <button onClick={copy} className="ml-auto text-xs font-medium px-3 py-[5px] rounded-lg bg-white/10 text-white border border-white/10 transition-colors hover:bg-white/15">
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

/* ── Typewriter roles ────────────────────────── */
const ROLES = [
  "Full-Stack Developer",
  "Web Developer",
  "React Developer",
  "Next.js Developer",
  "Tech Innovator",
  "Problem Solver",
  "AI-powered Innovator",
  "Hackathon Winner",
  "Leadership Enthusiast",
];

function TypewriterHeading() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];

    if (!isDeleting && charIdx === role.length) {
      // Pause at fully typed word
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIdx === 0) {
      // Move to next role
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const speed = isDeleting ? 40 : 80;
    const t = setTimeout(() => {
      setCharIdx((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, isDeleting, roleIdx]);

  const displayed = ROLES[roleIdx].substring(0, charIdx);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      className="mb-6 sm:mb-10"
    >
      <h2 className="font-serif text-[clamp(28px,5vw,56px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5]">
        Hey, I&apos;m{" "}
        <span
          className="font-cursive font-bold ml-2"
          style={{
            textShadow: "0 0 20px rgba(255,255,255,0.35), 0 0 40px rgba(255,255,255,0.15)",
          }}
        >
          Janavi Zala
        </span>
      </h2>
      <div className="font-serif text-[clamp(24px,4vw,46px)] font-normal tracking-[-0.02em] leading-[1.2] mt-2">
        <span className="text-[#f0f0f5]">I&apos;m a&nbsp;</span>
        <span className="gradient-text-animated italic">{displayed}</span>
        <span className="typewriter-cursor" style={{ height: "0.8em" }}>&nbsp;</span>
      </div>
    </motion.div>
  );
}

/* ── Luminous Stack Card (Toggleable) ─────────────── */
function GalaxyButton({ s, index }: { s: { name: string; emoji: string }, index: number }) {
  // Deterministic "random" logic for hydration safety
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  const RANDOM = (min: number, max: number, seed: number) => Math.floor(seededRandom(seed) * (max - min + 1) + min);
  
  return (
    <div className="galaxy-button">
      <button type="button">
        <span className="spark"></span>
        <span className="backdrop"></span>
        <span className="galaxy__container">
          {[...Array(4)].map((_, i) => {
            const seed = index * 100 + i;
            return (
              <span key={i} className="star star--static" style={{
                '--angle': RANDOM(0, 360, seed),
                '--duration': RANDOM(6, 20, seed + 1),
                '--delay': RANDOM(1, 10, seed + 2),
                '--alpha': RANDOM(40, 90, seed + 3) / 100,
                '--size': RANDOM(2, 6, seed + 4),
                '--distance': RANDOM(40, 200, seed + 5),
              } as React.CSSProperties}></span>
            );
          })}
        </span>
        <span className="galaxy">
          <span className="galaxy__ring">
            {[...Array(20)].map((_, i) => {
              const seed = index * 1000 + i;
              return (
                <span key={i} className="star" style={{
                  '--angle': RANDOM(0, 360, seed),
                  '--duration': RANDOM(6, 20, seed + 1),
                  '--delay': RANDOM(1, 10, seed + 2),
                  '--alpha': RANDOM(40, 90, seed + 3) / 100,
                  '--size': RANDOM(2, 6, seed + 4),
                  '--distance': RANDOM(40, 200, seed + 5),
                } as React.CSSProperties}></span>
              );
            })}
          </span>
        </span>
        <span className="text">
          <span className="text-[16px]">{s.emoji}</span>{s.name}
        </span>
      </button>
    </div>
  );
}

function LuminousStackCard() {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
      className="w-full relative px-2"
    >
      <div className={`luminous-card w-full ${active ? "active" : ""}`}>
        <div className="light-layer" style={{ top: '120px' }}>
          <div className="slit"></div>
          <div className="lumen">
            <div className="min"></div>
            <div className="mid"></div>
            <div className="hi"></div>
          </div>
          <div className="darken">
            <div className="sl"></div>
            <div className="ll"></div>
          </div>
        </div>
        <div className="content-layer pointer-events-none flex flex-col items-center pt-2">
          <div className="relative z-20 pointer-events-auto w-full text-left mb-10 mt-2 px-2">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Stack</div>
          </div>
          
          <div className="flex flex-col gap-3 relative z-30 max-w-[95%] mx-auto pointer-events-auto">
            {stackItems.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-center gap-3">
                {row.map((s, colIndex) => (
                  <GalaxyButton key={s.name} s={s} index={rowIndex * 10 + colIndex} />
                ))}
              </div>
            ))}
          </div>

          <div className="bottom mt-14 h-10 pointer-events-auto w-full relative z-20">
            <div className="toggle" onClick={() => setActive(!active)}>
              <div className="handle"></div>
              <span>Activate Lumen</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Know About Me Section ─────────────────────── */
export default function KnowAboutMe() {
  const stylusZoneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Wand cursor position (viewport px) ────── */
  const wandX = useMotionValue(-100);
  const wandY = useMotionValue(-100);
  const springX = useSpring(wandX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(wandY, { stiffness: 300, damping: 30, mass: 0.5 });

  /* ── Card reveal progress (0→1 based on wand X over card) ── */
  const revealRaw = useMotionValue(0);
  const revealSpring = useSpring(revealRaw, { stiffness: 200, damping: 30 });
  const clipPath = useTransform(revealSpring, (v: number) => {
    const pct = Math.max(0, Math.min(100, v * 100));
    return `inset(0 ${100 - pct}% 0 0)`;
  });

  /* ── Mouse tracking ─────────────────────────── */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const zone = stylusZoneRef.current;
      if (!zone) return;
      const rect = zone.getBoundingClientRect();
      // Mouse coordinates relative to the stylusZone
      wandX.set(e.clientX - rect.left);
      wandY.set(e.clientY - rect.top);

      // Calculate reveal based on cursor position relative to card
      const card = cardRef.current;
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const relX = (e.clientX - cardRect.left) / cardRect.width;
        revealRaw.set(Math.max(0, Math.min(1, relX)));
      }
    },
    [wandX, wandY, revealRaw]
  );

  const handleEnter = useCallback(() => {
    // Hide default custom cursor
    document.body.classList.add("hide-cursor");
  }, []);

  const handleLeave = useCallback(() => {
    document.body.classList.remove("hide-cursor");
    revealRaw.set(0); // Reset to initials
    
    // Smoothly return to the default resting position
    const zone = stylusZoneRef.current;
    if (zone) {
      wandX.set(zone.clientWidth / 2);
      wandY.set(50);
    }
  }, [revealRaw, wandX, wandY]);

  useEffect(() => {
    const zone = stylusZoneRef.current;
    if (!zone) return;

    // Set initial resting position on mount
    wandX.set(zone.clientWidth / 2);
    wandY.set(50);

    zone.addEventListener("mousemove", handleMouseMove);
    zone.addEventListener("mouseenter", handleEnter);
    zone.addEventListener("mouseleave", handleLeave);

    return () => {
      zone.removeEventListener("mousemove", handleMouseMove);
      zone.removeEventListener("mouseenter", handleEnter);
      zone.removeEventListener("mouseleave", handleLeave);
      document.body.classList.remove("hide-cursor");
    };
  }, [handleMouseMove, handleEnter, handleLeave, wandX, wandY]);

  return (
    <section
      id="about"
      className="py-16 sm:py-28 relative z-10 section-blend overflow-hidden"
    >
      <AuroraBackground layout="tl-br" colors={[
        "rgba(109, 40, 217, 0.55)",
        "rgba(124, 58, 237, 0.42)",
        "rgba(99, 102, 241, 0.32)"
      ]} />


      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 relative z-[1]">
        {/* Stylus zone — full section width triggers the wand cursor */}
        <div ref={stylusZoneRef} className="relative" style={{ cursor: "none" }}>
          {/* ── Magician's Wand Cursor ─────────────── */}
          <motion.div
            className="absolute z-[9999] pointer-events-none about-stylus-wrap"
            style={{ left: springX, top: springY }}
          >
            {/* Stylus — wide & stubby (Apple Pencil style) */}
            <div
              className="relative"
              style={{ transform: "translate(-20px, 0) scale(1.6)", transformOrigin: "top center" }}
            >
              {/* White tip — wide, taller */}
              <div className="w-[40px] h-[90px] rounded-t-full mx-auto relative overflow-hidden"
                style={{
                  background: "linear-gradient(to right, #f2f2f8 0%, #ffffff 25%, #f5f5fa 50%, #e8e8f0 75%, #dcdce5 100%)",
                  boxShadow: "3px 0 10px rgba(0,0,0,0.08), -2px 0 8px rgba(0,0,0,0.06), 0 -2px 6px rgba(255,255,255,0.3)",
                }}
              >
                {/* Left shine */}
                <div className="absolute left-[5px] top-[8px] bottom-[8px] w-[7px] rounded-full"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.6) 100%)" }}
                />
                {/* Right edge shadow */}
                <div className="absolute right-[3px] top-[8px] bottom-[8px] w-[4px] rounded-full bg-black/[0.04]" />
              </div>

              {/* Silver band */}
              <div className="w-[42px] h-[6px] mx-auto"
                style={{
                  background: "linear-gradient(180deg, #c0c0cc 0%, #9a9aa8 40%, #b0b0bc 100%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              />

              {/* Dark body — wide & taller */}
              <div className="w-[40px] h-[200px] mx-auto relative overflow-hidden"
                style={{
                  background: "linear-gradient(to right, #303040 0%, #222230 15%, #1a1a26 35%, #141420 50%, #18182a 65%, #1e1e2c 85%, #2a2a38 100%)",
                  boxShadow: "4px 0 14px rgba(0,0,0,0.3), -3px 0 10px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.25)",
                  borderRadius: "0 0 6px 6px",
                }}
              >
                <div className="absolute left-[3px] top-4 bottom-4 w-[4px] rounded-full"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.05) 100%)" }}
                />
                <div className="absolute right-[3px] top-4 bottom-4 w-[4px] rounded-full bg-black/[0.12]" />
              </div>

              {/* Bottom cap */}
              <div className="w-[40px] h-[5px] rounded-b-[8px] mx-auto"
                style={{ background: "linear-gradient(180deg, #1e1e2a 0%, #121218 100%)" }}
              />
            </div>
          </motion.div>

          {/* Section header */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-[13px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-4 relative z-[2]"
          >
            Know About Me
          </motion.p>

          {/* ── Typewriter Roles ─────────────────────── */}
          <div className="relative z-[2]">
            <TypewriterHeading />
          </div>

          {/* Two-column layout */}
          <div
            className="about-grid-wrap items-start relative z-[2]"
          >

            {/* Left: Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <p className="text-[16px] md:text-[18px] text-white/60 leading-[1.9] mb-6">
                I&apos;m Janavi Zala, a proactive full-stack developer and AI enthusiast
                passionate about building intelligent web experiences. From MERN stack apps
                to LLM-powered platforms, I thrive on turning complex problems into elegant solutions.
              </p>
              <p className="text-[16px] md:text-[18px] text-white/60 leading-[1.9] mb-6">
                Currently pursuing B.Tech in Computer Engineering at MBIT (CVM University)
                with a CGPA of 8.98. Former AI intern at Flaunch and Full Stack trainee at IBM.
              </p>
              <p className="text-[16px] md:text-[18px] text-white/60 leading-[1.9] mb-8">
                I believe in waking up each day eager to learn, build, and make an impact!
              </p>

              {/* Social icons - restore normal cursor here */}    <p className="text-[14.5px] text-white/60 leading-[1.8] mb-5">
                Currently pursuing B.Tech in Computer Engineering at MBIT (CVM University)
                with a CGPA of 8.98. Former AI intern at Flaunch and Full Stack trainee at IBM.
              </p>
              <p className="text-[14.5px] text-white/60 leading-[1.8] mb-8">
                I believe in waking up each day eager to learn, build, and make an impact!
              </p>

              {/* Social icons — restore normal cursor here */}
              <div className="flex items-center gap-4 mb-8" style={{ cursor: "auto" }}>
                {/* LinkedIn */}
                <a href="https://linkedin.com/in/janavi-zala-226117288" target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn" className="galaxy-icon">
                  <span className="gi-spark" />
                  <span className="gi-backdrop" />
                  <span className="gi-ring">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="gi-star" style={{
                        '--angle': `${i * 45}deg`, '--duration': `${6 + i}`,
                        '--delay': `${i * 0.8}`, '--alpha': `${0.5 + i * 0.05}`,
                        '--size': `${2 + (i % 3)}`, '--distance': `${14 + i * 2}`,
                      } as React.CSSProperties} />
                    ))}
                  </span>
                  <span className="gi-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </span>
                </a>
                {/* GitHub */}
                <a href="https://github.com/Janavizala06" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub" className="galaxy-icon">
                  <span className="gi-spark" />
                  <span className="gi-backdrop" />
                  <span className="gi-ring">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="gi-star" style={{
                        '--angle': `${i * 45 + 20}deg`, '--duration': `${7 + i}`,
                        '--delay': `${i * 0.6}`, '--alpha': `${0.5 + i * 0.05}`,
                        '--size': `${2 + (i % 3)}`, '--distance': `${12 + i * 2}`,
                      } as React.CSSProperties} />
                    ))}
                  </span>
                  <span className="gi-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                    </svg>
                  </span>
                </a>
                {/* Gmail */}
                <a href="mailto:janavizala0612@gmail.com"
                  aria-label="Gmail" className="galaxy-icon">
                  <span className="gi-spark" />
                  <span className="gi-backdrop" />
                  <span className="gi-ring">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="gi-star" style={{
                        '--angle': `${i * 45 + 10}deg`, '--duration': `${5 + i}`,
                        '--delay': `${i * 0.7}`, '--alpha': `${0.5 + i * 0.05}`,
                        '--size': `${2 + (i % 3)}`, '--distance': `${13 + i * 2}`,
                      } as React.CSSProperties} />
                    ))}
                  </span>
                  <span className="gi-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                </a>
              </div>

            </motion.div>

            {/* Right: Interactive card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative flex items-start justify-center -mt-14"
            >
              <div
                ref={cardRef}
                className="relative about-photo-card rounded-[28px] overflow-hidden bg-[#060614]"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 2.5px rgba(60,120,255,0.45), 0 0 40px rgba(60,120,255,0.12), 0 0 80px rgba(60,120,255,0.06)",
                }}
              >
                {/* Layer 1: Logo image with glow */}
                <div className="absolute inset-0 z-[1] bg-[#060614]">
                  {/* Center radial glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.28) 0%, rgba(124,58,237,0.15) 35%, rgba(79,70,229,0.06) 60%, transparent 80%)",
                    }}
                  />
                  {/* Top-right accent glow */}
                  <div
                    className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 100% 0%, rgba(139,92,246,0.35) 0%, transparent 65%)",
                    }}
                  />
                  {/* Bottom-left accent glow */}
                  <div
                    className="absolute bottom-0 left-0 w-[160px] h-[160px] pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 0% 100%, rgba(99,102,241,0.25) 0%, transparent 65%)",
                    }}
                  />
                  {/* Logo */}
                  <img
                    src="/logo.png"
                    alt="JZ Logo"
                    className="relative w-full h-full object-cover"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(99,102,241,0.4)) drop-shadow(0 0 50px rgba(139,92,246,0.2))",
                    }}
                  />
                </div>

                {/* Layer 2: Photo reveal */}
                <motion.div className="absolute inset-0 z-[2]" style={{ clipPath }}>
                  <img src="/avatar.png" alt="Janavi Zala" className="w-full h-full object-cover" />
                </motion.div>

                {/* Blue border glow overlay */}
                <div
                  className="absolute inset-0 rounded-[26px] pointer-events-none z-[3]"
                  style={{
                    boxShadow: "inset 0 0 0 1.5px rgba(60,120,255,0.2), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(60,120,255,0.1)",
                  }}
                />
              </div>

              {/* Hint */}
              <p className="absolute bottom-2 text-[11px] text-white/30 tracking-wide opacity-40">
                ← Hover to reveal →
              </p>
            </motion.div>
          </div>
        </div>{/* end existing bento */}

        {/* RESUME HIGHLIGHTS - Redesigned Bento */}
        <Spotlight className="relative mt-14 sm:mt-24">
          <AuroraBackground layout="tr-bl" colors={[
            "rgba(0, 200, 255, 0.18)",
            "rgba(0, 150, 255, 0.12)",
            "rgba(0, 100, 200, 0.08)",
          ]} />
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-serif text-[clamp(40px,5vw,64px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]"
          >
            Where I&apos;ve{" "}
            <em className="italic gradient-text-animated">been</em>
          </motion.h3>

          {/* Card 1: Globe + Education */}
          <SpotLightItem className="mb-3.5">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85 }}
              className="wib-card wib-grid-edu overflow-hidden"
            >
              <div className="flex flex-col items-start relative overflow-hidden min-h-[380px] bg-black">
                {/* Top label */}
                <div className="relative z-10 text-center w-full pt-5 px-4">
                  <p
                    className="text-[clamp(18px,3vw,28px)] uppercase font-black tracking-[0.08em] leading-[1.1] mb-1"
                    style={{
                      background: "linear-gradient(180deg, #e8eef8 0%, #a8bcd8 40%, #6e92b8 70%, #4a6fa0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 2px 8px rgba(82,160,255,0.45))",
                      textShadow: "none",
                    }}
                  >FLEXIBLE WITH TIMEZONES</p>
                  <p
                    className="text-[clamp(14px,2.2vw,20px)] uppercase font-black tracking-[0.06em] leading-[1.1]"
                    style={{
                      background: "linear-gradient(180deg, #c8d8f0 0%, #7aa0cc 45%, #3a6899 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 1px 5px rgba(82,140,220,0.35))",
                    }}
                  >Based in India, available globally</p>
                </div>
                {/* Earth Globe - centered, rotating */}
                <div className="relative z-10 w-full px-4 flex justify-center mt-4">
                  <Globe className="w-[360px] max-w-full" />
                </div>
                {/* Sparkles at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-36 overflow-hidden"
                  style={{
                    maskImage: "radial-gradient(50% 50%, white, transparent)",
                    WebkitMaskImage: "radial-gradient(50% 50%, white, transparent)",
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] opacity-40" />
                  <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[10%] border-t border-[#163474] bg-[#08132b]" />
                  <Sparkles
                    density={1150}
                    color="#dbeafe"
                    size={1.35}
                    minSize={0.35}
                    speed={0.55}
                    opacity={0.95}
                    minOpacity={0.15}
                    opacitySpeed={2.6}
                    mousemove
                    hover
                    className="absolute inset-x-0 bottom-0 h-full w-full"
                  />
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center border-l border-white/[0.06]">
                <h3 className="font-serif text-[clamp(24px,3vw,34px)] font-normal tracking-[-0.02em] gradient-text-animated drop-shadow-sm mb-4 w-max">Education</h3>
                <h4 className="text-[26px] sm:text-[30px] font-bold text-white mb-1">CVM University, MBIT</h4>
                <p className="text-[17px] text-white/70 mb-1">B.Tech - Computer Engineering</p>
                <p className="text-[13px] text-white/40 mb-5">2023 - 2027</p>

                <div className="mb-6">
                  <h3 className="font-serif text-[clamp(24px,3vw,34px)] font-normal tracking-[-0.02em] gradient-text-animated drop-shadow-sm mb-2 w-max">Location</h3>
                  <h4 className="text-[26px] sm:text-[30px] font-bold text-white mb-1">Anand, Gujarat 🇮🇳</h4>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-[11px] text-white/60 font-medium">CGPA 9.05</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-[11px] text-white/60 font-medium">SGPA 9.43</span>
                </div>
              </div>
            </motion.div>
          </SpotLightItem>

          {/* Card 2: Stats Row */}
          <SpotLightItem className="mb-3.5">
            <WibHoverCard>
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.1 }}
              className="wib-card p-5 sm:p-6"
            >
              <div className="wib-grid-stats">
                {[
                  { value: "5+", label: "Projects", color: "color-red", glow: "stat-card-red" },
                  { value: "15+", label: "Technologies", color: "color-orange", glow: "stat-card-orange" },
                  { value: "9.05", label: "CGPA / 10", color: "color-yellow", glow: "stat-card-yellow" },
                  { value: "9.43", label: "SGPA / 10", color: "color-pink", glow: "stat-card-pink" },
                  { value: <span className="infinity-symbol"></span>, label: "Curiosity", color: "color-purple", glow: "stat-card-purple" },
                ].map((s) => (
                  <div key={s.label} className={`stat-card flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-black border border-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-all duration-300 ease-out cursor-pointer hover:bg-white/[0.02] ${s.glow}`}>
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                    <div className={`stat-value relative z-10 text-[32px] sm:text-[42px] font-bold mb-2 drop-shadow-md transition-transform duration-300 ${s.color}`}>{s.value}</div>
                    <span className="relative z-10 text-[13px] text-white/40 uppercase tracking-[0.08em] transition-colors duration-300 group-hover:text-white">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            </WibHoverCard>
          </SpotLightItem>

          {/* Card 3: Achievements */}
          <SpotLightItem className="mb-3.5">
            <WibHoverCard>
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.15 }}
              className="wib-card p-5 sm:p-8"
            >
              <h3 className="font-serif text-[clamp(24px,3vw,34px)] font-normal tracking-[-0.02em] gradient-text-animated drop-shadow-sm mb-6 w-max">Achievements &amp; Recognition</h3>
              <div className="wib-grid-achievements">
                {[
                  { icon: "🥉", title: "DevSummit 2026", sub: "2nd Runner-Up, 10K Prize",
                    glow: "stat-card-orange" },
                  { icon: "⭐", title: "Flaunch Top 20", sub: "Level 2 Promotion, 5K Stipend",
                    glow: "stat-card-yellow" },
                  { icon: "🚀", title: "Unleash LLM", sub: "Direct Finalist, Flaunch Excellence",
                    glow: "stat-card-pink" },
                  { icon: "🏢", title: "IBM Recognition", sub: "Selected for GIFT City Visit",
                    glow: "stat-card-sky" },
                ].map((a) => (
                  <div key={a.title} className={`ach-card flex flex-col items-center text-center p-6 rounded-xl group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer border border-white/[0.05] bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.3)] hover:bg-white/[0.02] ${a.glow}`}>
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="ach-icon text-[34px] mb-3 drop-shadow-md transition-transform duration-300">{a.icon}</span>
                      <div className="text-[15px] font-semibold text-white/85 mb-1.5 transition-colors duration-300 group-hover:text-white">{a.title}</div>
                      <div className="text-[13px] text-white/40 leading-relaxed">{a.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            </WibHoverCard>
          </SpotLightItem>

          {/* Cards 4 and 5: Experience + Leadership */}
          <div className="wib-grid-exp">
            <SpotLightItem className="h-full">
              <WibHoverCard className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.2 }}
                className="wib-card p-6 sm:p-7 relative overflow-hidden h-full"
              >
                <h3 className="font-serif text-[clamp(24px,3vw,34px)] font-normal tracking-[-0.02em] gradient-text-animated drop-shadow-sm mb-6 w-max">Experience</h3>
                <div className="space-y-5">
                  {[
                    { company: "Hi Lab Solution", role: "Full Stack Intern", year: "2026" },
                    { company: "IBM", role: "Full Stack Dev Trainee", year: "2025" },
                    { company: "Flaunch", role: "AI Technology Intern", year: "2024-25" },
                  ].map((exp, i) => (
                    <div key={exp.company} className="flex items-start gap-3">
                      <div className="flex flex-col items-center mt-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/40 flex-shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
                        <div className="w-[1px] flex-1 bg-white/10 mt-1 min-h-[24px]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[18px] font-bold text-white/90">{exp.company}</div>
                        <div className="text-[14px] uppercase tracking-[0.06em] text-white/60 font-semibold">{exp.role}</div>
                      </div>
                      <span className="text-[15px] text-white/40 font-mono mt-0.5">{exp.year}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              </WibHoverCard>
            </SpotLightItem>

            <SpotLightItem className="h-full">
              <WibHoverCard className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.25 }}
                className="wib-card p-6 sm:p-8 h-full"
              >
                <h3 className="font-serif text-[clamp(24px,3vw,34px)] font-normal tracking-[-0.02em] gradient-text-animated drop-shadow-sm mb-6 w-max">Leadership &amp; Volunteering</h3>
                <div className="space-y-5">
                  {[
                    { role: "Chairperson, ISTE Student Branch", org: "MBIT, 2025-Present" },
                    { role: "Design Coordinator", org: "MBIT, 2024-Present" },
                    { role: "Social Media Coordinator", org: "NSS, 2024-2025" },
                    { role: "Robotics Developer", org: "Gyanotsav 1.0, CVM, Dec 2023-Jan 2024" },
                  ].map((v) => (
                    <div key={v.role} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0 mt-[8px]" />
                      <div>
                        <div className="text-[16px] font-semibold text-white/80 leading-tight mb-1">{v.role}</div>
                        <div className="text-[14px] text-white/50">{v.org}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              </WibHoverCard>
            </SpotLightItem>
          </div>
        </Spotlight>{/* end resume highlights */}

        {/* ── Bento Grid ─────────────────────────────── */}
        <div className="mt-14 sm:mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-serif text-[clamp(40px,5vw,64px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]"
          >
            Builder, not just <em className="italic gradient-text-animated">a coder</em>
          </motion.h3>

          <div className="grid grid-cols-1 gap-3.5">
            {/* Stack — full width with luminous light effect */}
            <LuminousStackCard />
          </div>
        </div>
      </div>
    </section>
  );
}
