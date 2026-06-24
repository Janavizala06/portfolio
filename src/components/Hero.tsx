"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ResumeModal from "./ResumeModal";
import AuroraBackground from "./AuroraBackground";
import HeroBrowserMockups from "./HeroBrowserMockups";
import ScrollText from "@/components/ui/scroll-text";

/* ── Icons ─────────────────────────────────────── */
function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/* ── Animation variants ─────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 2.4 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── Hero Section ───────────────────────────────── */
export default function Hero() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      {/*
        Hero is 2048px tall — same as abhishekworks.com.
        The inner content container is sticky so it stays fixed
        while the section scrolls past, driving the grid animations.
      */}
      <section
        id="hero"
        className="relative h-screen bg-[#050512]"
      >
        {/* ── Sticky viewport-height inner container ── */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-[100px] sm:pt-[130px] pb-12 sm:pb-20">

          {/* Aurora background — indigo/violet/blue */}
          <AuroraBackground layout="radial" colors={[
            "rgba(79, 70, 229, 0.58)",
            "rgba(99, 102, 241, 0.45)",
            "rgba(139, 92, 246, 0.35)",
          ]} />

          {/* Vignette — center dark for readability, edges let windows show */}
          <div
            className="absolute inset-0 z-[3] pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 58% 52% at 50% 48%, rgba(5,5,18,0.60) 0%, rgba(5,5,18,0.22) 55%, transparent 100%),
                linear-gradient(to bottom, rgba(5,5,18,0.20) 0%, transparent 25%, transparent 80%, rgba(5,5,18,0.15) 100%)
              `
            }}
          />

          {/* Browser window mosaic — scroll-animated 3D grid */}
          <HeroBrowserMockups
            onResume={() => setShowResume(true)}
          />

          {/* Hero text content — above everything */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-[10] flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-pill px-3.5 py-1.5 text-[12.5px] text-white/60 backdrop-blur-[12px] mb-9"
            >
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_8px_rgba(167,139,250,0.6)] animate-pulse" />
              Full Stack Developer &amp; AI Engineer
            </motion.div>

            {/* Heading */}
            <ScrollText
              as="h1"
              text="Building intelligent web experiences that matter."
              className="font-serif font-normal text-[clamp(44px,8vw,96px)] leading-[1.0] tracking-[-0.03em] text-[#f0f0f5] mb-7"
              letterAnime={false}
              blur={12}
              staggerDelay={0.04}
              highlight={[{ text: "intelligent", className: "italic gradient-text-animated" }]}
            />

            {/* Subtitle */}
            <ScrollText
              as="p"
              text="I craft full-stack applications powered by AI, turning complex problems into elegant, user-centric solutions. MERN · Python · LLMs."
              className="text-[clamp(15px,1.8vw,18px)] text-white/55 max-w-[640px] mx-auto leading-[1.75] mb-10 sm:mb-20"
              delay={0.3}
            />

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex gap-3 flex-wrap justify-center">
              {/* Let's Connect — border-only circuit spin */}
              <span className="connect-btn-wrap">
                <a
                  href="https://www.linkedin.com/in/janavi-zala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-btn-inner inline-flex items-center gap-[7px] px-[22px] py-[11px] rounded-pill text-sm font-medium no-underline bg-white text-[#050505]"
                >
                  <MailIcon /> Let&apos;s Connect
                </a>
              </span>

              {/* View Work */}
              <a href="#projects" className="sparkle-btn">
                <span>
                  {"View Work →".split("").map((ch, i) => (
                    <span key={i} className="sparkle-letter">{ch === " " ? "\u00A0" : ch}</span>
                  ))}
                </span>
              </a>

              {/* Resume */}
              <button onClick={() => setShowResume(true)} className="sparkle-btn">
                <span>
                  {"Resume".split("").map((ch, i) => (
                    <span key={i} className="sparkle-letter">{ch}</span>
                  ))}
                </span>
              </button>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
    </>
  );
}
