"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { stackItems } from "@/data";
import { useTilt3d } from "@/hooks/useTilt3d";
import AuroraBackground from "./AuroraBackground";


/* ── Reveal variants ──────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

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

/* ── Know About Me Section ─────────────────────── */
export default function KnowAboutMe() {
  const stylusZoneRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Wand cursor position (viewport px) ────── */
  const wandX = useMotionValue(-100);
  const wandY = useMotionValue(-100);
  const springX = useSpring(wandX, { stiffness: 180, damping: 22, mass: 0.8 });
  const springY = useSpring(wandY, { stiffness: 180, damping: 22, mass: 0.8 });

  /* ── Card reveal progress (0→1 based on wand X over card) ── */
  const revealRaw = useMotionValue(0);
  const revealSpring = useSpring(revealRaw, { stiffness: 200, damping: 30 });
  const clipPath = useTransform(revealSpring, (v: number) => {
    const pct = Math.max(0, Math.min(100, v * 100));
    return `inset(0 ${100 - pct}% 0 0)`;
  });

  const [isInSection, setIsInSection] = useState(false);

  /* ── Mouse tracking ─────────────────────────── */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      wandX.set(e.clientX);
      wandY.set(e.clientY);

      // Calculate reveal based on cursor position relative to card
      const card = cardRef.current;
      if (card) {
        const rect = card.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width;
        revealRaw.set(Math.max(0, Math.min(1, relX)));
      }
    },
    [wandX, wandY, revealRaw]
  );

  const handleEnter = useCallback(() => {
    setIsInSection(true);
    // Hide default custom cursor
    document.body.classList.add("hide-cursor");
  }, []);

  const handleLeave = useCallback(() => {
    setIsInSection(false);
    document.body.classList.remove("hide-cursor");
    revealRaw.set(0); // Reset to initials
  }, [revealRaw]);

  useEffect(() => {
    const zone = stylusZoneRef.current;
    if (!zone) return;

    zone.addEventListener("mousemove", handleMouseMove);
    zone.addEventListener("mouseenter", handleEnter);
    zone.addEventListener("mouseleave", handleLeave);

    return () => {
      zone.removeEventListener("mousemove", handleMouseMove);
      zone.removeEventListener("mouseenter", handleEnter);
      zone.removeEventListener("mouseleave", handleLeave);
      document.body.classList.remove("hide-cursor");
    };
  }, [handleMouseMove, handleEnter, handleLeave]);

  return (
    <section
      id="about"
      ref={stylusZoneRef}
      className="py-28 relative z-10 section-blend overflow-hidden"
      style={{ cursor: "none" }}
    >
      <AuroraBackground layout="tl-br" colors={[
        "rgba(109, 40, 217, 0.55)",
        "rgba(124, 58, 237, 0.42)",
        "rgba(99, 102, 241, 0.32)"
      ]} />
      {/* ── Magician's Wand Cursor ─────────────── */}
      <AnimatePresence>
        {isInSection && (
          <motion.div
            className="fixed z-[9999] pointer-events-none"
            style={{ left: springX, top: springY }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            {/* Stylus — large, smooth, premium */}
            <div
              className="relative"
              style={{ transform: "translate(-13px, 0)", transformOrigin: "top center" }}
            >
              {/* White tip — large rounded top */}
              <div className="w-[26px] h-[140px] rounded-t-full mx-auto relative overflow-hidden"
                style={{
                  background: "linear-gradient(to right, #f2f2f8 0%, #ffffff 25%, #f5f5fa 50%, #e8e8f0 75%, #dcdce5 100%)",
                  boxShadow: "3px 0 10px rgba(0,0,0,0.08), -2px 0 8px rgba(0,0,0,0.06), 0 -2px 6px rgba(255,255,255,0.3)",
                }}
              >
                {/* Smooth left shine */}
                <div className="absolute left-[3px] top-[10px] bottom-[10px] w-[5px] rounded-full"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.6) 100%)" }}
                />
                {/* Right edge shadow */}
                <div className="absolute right-[2px] top-[10px] bottom-[10px] w-[3px] rounded-full bg-black/[0.04]" />
              </div>

              {/* Silver band — subtle divider */}
              <div className="w-[27px] h-[5px] mx-auto"
                style={{
                  background: "linear-gradient(180deg, #c0c0cc 0%, #9a9aa8 40%, #b0b0bc 100%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              />

              {/* Dark matte body — long & smooth */}
              <div className="w-[26px] h-[380px] mx-auto relative overflow-hidden"
                style={{
                  background: "linear-gradient(to right, #303040 0%, #222230 15%, #1a1a26 35%, #141420 50%, #18182a 65%, #1e1e2c 85%, #2a2a38 100%)",
                  boxShadow: "4px 0 14px rgba(0,0,0,0.3), -3px 0 10px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.25)",
                  borderRadius: "0 0 4px 4px",
                }}
              >
                {/* Left edge highlight */}
                <div className="absolute left-[2px] top-4 bottom-4 w-[3px] rounded-full"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.05) 100%)" }}
                />
                {/* Right edge shadow */}
                <div className="absolute right-[2px] top-4 bottom-4 w-[3px] rounded-full bg-black/[0.12]" />
              </div>

              {/* Bottom cap */}
              <div className="w-[26px] h-[4px] rounded-b-[6px] mx-auto"
                style={{ background: "linear-gradient(180deg, #1e1e2a 0%, #121218 100%)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1080px] mx-auto px-7 relative z-[1]">
        {/* Stylus zone — full section width triggers the wand cursor */}
        <div>
          {/* Section header */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-3"
          >
            Know About Me
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(32px,5vw,56px)] font-normal tracking-[-0.02em] leading-[1.1] text-[#f0f0f5] mb-10"
          >
            Full-Stack Developer and
            <br />
            an AI-powered {" "}
            <em className="italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              innovator
            </em>
          </motion.h2>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
            {/* Left: Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[14.5px] text-white/60 leading-[1.8] mb-5">
                I&apos;m Janavi Zala, a proactive full-stack developer and AI enthusiast
                passionate about building intelligent web experiences. From MERN stack apps
                to LLM-powered platforms, I thrive on turning complex problems into elegant solutions.
              </p>
              <p className="text-[14.5px] text-white/60 leading-[1.8] mb-5">
                Currently pursuing B.Tech in Computer Engineering at MBIT (CVM University)
                with a CGPA of 8.98. Former AI intern at Flaunch and Full Stack trainee at IBM.
              </p>
              <p className="text-[14.5px] text-white/60 leading-[1.8] mb-8">
                I believe in waking up each day eager to learn, build, and make an impact!
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4 mb-8">
                {/* LinkedIn */}
                <a href="https://linkedin.com/in/janavi-zala-226117288" target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* GitHub */}
                <a href="https://github.com/Janavizala06" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/>
                  </svg>
                </a>
                {/* Gmail */}
                <a href="mailto:janavi0612@gmail.com"
                  aria-label="Gmail"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </a>
              </div>

            </motion.div>

            {/* Right: Interactive card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-start justify-center pt-2"
            >
              <div
                ref={cardRef}
                className="relative w-[340px] h-[380px] rounded-[28px] overflow-hidden bg-[#060614]"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 2.5px rgba(60,120,255,0.45), 0 0 40px rgba(60,120,255,0.12), 0 0 80px rgba(60,120,255,0.06)",
                }}
              >
                {/* Layer 1: Monogram with futuristic background */}
                <div
                  className="absolute inset-0 flex items-center justify-center z-[1]"
                  style={{ background: "linear-gradient(145deg, #0a0a28 0%, #060614 35%, #050510 70%, #080820 100%)" }}
                >
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage: "linear-gradient(rgba(80,130,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(80,130,255,0.4) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />
                  {/* Diagonal grid */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: "linear-gradient(45deg, rgba(80,130,255,0.3) 1px, transparent 1px), linear-gradient(-45deg, rgba(80,130,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "50px 50px",
                    }}
                  />
                  {/* Radar circles */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[200px] h-[200px] rounded-full border border-white/[0.04]" />
                    <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.03]" />
                    <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.02]" />
                  </div>

                  {/* Corner accent glow */}
                  <div className="absolute top-0 right-0 w-[180px] h-[180px] opacity-30 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 100% 0%, rgba(60,120,255,0.35) 0%, transparent 65%)" }}
                  />
                  <div className="absolute bottom-0 left-0 w-[140px] h-[140px] opacity-20 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 0% 100%, rgba(60,120,255,0.3) 0%, transparent 65%)" }}
                  />

                  {/* JZ Monogram — large futuristic */}
                  <span
                    className="relative font-sans text-[130px] font-extrabold tracking-[-0.06em] text-white"
                    style={{
                      textShadow: "0 0 30px rgba(60,120,255,0.4), 0 0 60px rgba(60,120,255,0.15), 0 4px 20px rgba(0,0,0,0.5)",
                      WebkitTextStroke: "1px rgba(100,160,255,0.15)",
                    }}
                  >
                    JZ
                  </span>
                </div>

                {/* Layer 2: Photo reveal */}
                <motion.div className="absolute inset-0 z-[2]" style={{ clipPath }}>
                  <img src="/avatar.jpeg" alt="Janavi Zala" className="w-full h-full object-cover" />
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
              <AnimatePresence>
                {!isInSection && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-2 text-[11px] text-white/30 tracking-wide"
                  >
                    ← Hover to reveal →
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>{/* end existing bento */}

        {/* ══════════════════════════════════════════════════
            RESUME HIGHLIGHTS — Education, Experience, Awards
            ══════════════════════════════════════════════════ */}
        <div className="relative mt-24">
          {/* Aurora — tr-bl mirrors the tl-br above, visual variety */}
          <AuroraBackground layout="tr-bl" colors={[
            "rgba(59, 130, 246, 0.50)",
            "rgba(99, 102, 241, 0.38)",
            "rgba(139, 92, 246, 0.28)",
          ]} />
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]"
          >
            Where I&apos;ve{" "}
            <em className="italic bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              been
            </em>
          </motion.h3>

          {/* Row A — Education + Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">

            {/* Education */}
            <BentoCard delay={0}>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-4">🎓 Education</div>
              {/* MBIT */}
              <div className="flex gap-3 mb-5">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                  <div className="w-[1px] flex-1 bg-white/[0.07] mt-1" />
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-white/85 leading-tight mb-0.5">
                    B.Tech — Computer Engineering
                  </div>
                  <div className="text-[12px] text-white/55 mb-0.5">
                    Madhuben &amp; Bhanubhai Patel Institute of Technology
                  </div>
                  <div className="text-[12px] text-white/40">CVM University · 2023 – 2027</div>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[11px] text-violet-300 font-semibold">
                    ★ CGPA 8.98
                  </div>
                  <div className="mt-2 text-[11.5px] text-white/30 leading-relaxed">
                    DSA · OS · DBMS · Computer Networks · AI/ML · Cloud Computing
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Experience */}
            <BentoCard delay={0.1}>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-4">💼 Experience</div>

              {/* Flaunch */}
              <div className="flex gap-3 mb-5">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <div className="w-[1px] flex-1 bg-white/[0.07] mt-1" />
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-white/85 leading-tight mb-0.5">
                    AI Technology Intern
                  </div>
                  <div className="text-[12px] text-white/55 mb-0.5">Flaunch · Remote</div>
                  <div className="text-[11px] text-white/35 mb-2">Oct 2024 – Jan 2025</div>
                  <ul className="space-y-1">
                    {[
                      "Designed & deployed conversational AI systems and LLM-powered applications",
                      "Engineered ML API integrations with production-grade pipelines",
                      "Delivered CodeTalk — recognised as top internship project nationally",
                    ].map((b) => (
                      <li key={b} className="flex gap-1.5 text-[11.5px] text-white/45 leading-relaxed">
                        <span className="text-emerald-400/60 mt-[3px] flex-shrink-0">›</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* IBM */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-white/85 leading-tight mb-0.5">
                    Full Stack Development Trainee
                  </div>
                  <div className="text-[12px] text-white/55 mb-0.5">IBM · Remote (Webstack Academy)</div>
                  <div className="text-[11px] text-white/35 mb-2">Aug 2025</div>
                  <ul className="space-y-1">
                    {[
                      "Architected & shipped full-stack MERN apps with RESTful API design",
                      "Built LibTrack — a feature-rich Library Management System as capstone",
                    ].map((b) => (
                      <li key={b} className="flex gap-1.5 text-[11.5px] text-white/45 leading-relaxed">
                        <span className="text-blue-400/60 mt-[3px] flex-shrink-0">›</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Row B — Achievements (full width) */}
          <BentoCard className="md:col-span-2" delay={0.15}>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-4">🏆 Achievements &amp; Recognition</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "🥉", title: "Dev Summit 2026 — 2nd Runner-Up", sub: "National Hackathon · Jagannath University · ₹10,000 prize" },
                { icon: "⭐", title: "Flaunch Top 20 & Level 2 Promotion", sub: "Ranked top performer nationally · ₹5,000 stipend" },
                { icon: "🚀", title: "Unleash LLM Hackathon — Direct Finalist", sub: "Secured finals entry through Flaunch internship excellence" },
                { icon: "🏢", title: "IBM GIFT City Recognition", sub: "Exclusively selected for IBM office visit, Gandhinagar" },
                { icon: "📜", title: "ITC Diploma in Programming", sub: "C · C++ · Python · Web Design · SQL & DBMS (2024)" },
              ].map((a) => (
                <div key={a.title} className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                  <span className="text-[20px] flex-shrink-0">{a.icon}</span>
                  <div>
                    <div className="text-[12.5px] font-semibold text-white/80 leading-tight mb-0.5">{a.title}</div>
                    <div className="text-[11px] text-white/40 leading-relaxed">{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Row C — Volunteering / Leadership */}
          <div className="mt-3.5">
            <BentoCard delay={0.2}>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-4">🤝 Leadership &amp; Volunteering</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { role: "Chairperson — ISTE Student Branch", org: "MBIT · 2025–Present", desc: "Led technical workshops and anchored large-scale college events as branch head." },
                  { role: "Design Coordinator", org: "MBIT · 2024–Present", desc: "Created posters, banners & digital creatives; led visual identity for student initiatives." },
                  { role: "Social Media Coordinator", org: "NSS · 2024–2025", desc: "Managed NSS social media; promoted community outreach and volunteer programs online." },
                  { role: "Robotics Developer & Demo Volunteer", org: "Gyanotsav 1.0, CVM · Dec 2023–Jan 2024", desc: "Built and demonstrated an Arduino UNO robotics project with a multidisciplinary team." },
                ].map((v) => (
                  <div key={v.role} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 flex-shrink-0 mt-[5px]" />
                    <div>
                      <div className="text-[12.5px] font-semibold text-white/75 leading-tight">{v.role}</div>
                      <div className="text-[11px] text-white/35 mb-0.5">{v.org}</div>
                      <div className="text-[11.5px] text-white/45 leading-relaxed">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>{/* end resume highlights */}

        {/* ── Bento Grid ─────────────────────────────── */}
        <div className="mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]"
          >
            Builder, not just <em className="italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">a coder</em>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Connect — 2-col span */}
            <BentoCard className="md:col-span-2">
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-3">Connect</div>
              <h4 className="font-serif text-[clamp(22px,2.8vw,32px)] font-normal tracking-[-0.02em] leading-[1.25] text-[#f0f0f5] mb-2">
                Always open to new <em className="italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">opportunities</em>
              </h4>
              <p className="text-[13px] text-white/55 leading-[1.7]">
                I build AI-powered platforms and full-stack web apps. Open to internships, collaborations, and exciting opportunities.
              </p>
              <EmailCopy />
            </BentoCard>

            {/* Location */}
            <BentoCard delay={0.1}>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-3">Location</div>
              <h4 className="font-serif text-[clamp(22px,2.8vw,32px)] font-normal tracking-[-0.02em] leading-[1.25] text-[#f0f0f5] mb-2">
                Anand, Gujarat 🇮🇳
              </h4>
              <p className="text-[13px] text-white/55 leading-[1.7]">
                MBIT, CVM University<br />Available for remote & on-site work.
              </p>
            </BentoCard>

            {/* Stack — full width */}
            <BentoCard className="md:col-span-3" delay={0.2}>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-3">Stack</div>
              <h4 className="font-serif text-[clamp(22px,2.8vw,32px)] font-normal tracking-[-0.02em] leading-[1.25] text-[#f0f0f5] mb-2">
                Tools I <em className="italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">actually use</em>
              </h4>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {stackItems.map((s) => (
                  <span key={s.name}
                    className="flex items-center gap-[7px] px-3.5 py-[7px] rounded-pill bg-[#0a0a12] border border-white/[0.06] text-[12.5px] font-medium text-white/55
                      hover:bg-[#111120] hover:-translate-y-[3px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)]
                      transition-all duration-300">
                    <span className="text-[16px]">{s.emoji}</span>{s.name}
                  </span>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
