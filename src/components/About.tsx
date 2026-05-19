"use client";

import { motion } from "framer-motion";
import { stackItems } from "@/data";
import { useTilt3d } from "@/hooks/useTilt3d";
import { useState, useCallback } from "react";

/* ── Reveal variants ──────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
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

/* ── About Section ────────────────────────────── */
export default function About() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("hello@aayushbharti.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section id="about" className="py-24 relative z-10 bg-[#050505] sec-divider">
      <div className="max-w-[1080px] mx-auto px-7">
        <motion.p variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5">
          About
        </motion.p>
        <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]">
          Builder, not just <em className="italic text-white/55">developer</em>
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Connect — 2-col span */}
          <BentoCard className="md:col-span-2">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-3">Connect</div>
            <h3 className="font-serif text-[clamp(22px,2.8vw,32px)] font-normal tracking-[-0.02em] leading-[1.25] text-[#f0f0f5] mb-2">
              Always open to new <em className="italic text-white/55">opportunities</em>
            </h3>
            <p className="text-[13px] text-white/55 leading-[1.7]">
              I work with founders, agencies, and startups to build fast, accessible, and intentionally designed web products.
            </p>
            <div className="flex items-center gap-2.5 mt-5 px-4 py-3 bg-[#0a0a12] rounded-[14px] border border-white/[0.06] text-sm transition-colors hover:bg-[#111120]">
              <span className="text-white/55">hello@aayushbharti.in</span>
              <button
                onClick={copyEmail}
                className="ml-auto text-xs font-medium px-3 py-[5px] rounded-lg bg-white/10 text-white border border-white/10 transition-colors hover:bg-white/15"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </BentoCard>

          {/* Location */}
          <BentoCard delay={0.1}>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-3">Location</div>
            <h3 className="font-serif text-[clamp(22px,2.8vw,32px)] font-normal tracking-[-0.02em] leading-[1.25] text-[#f0f0f5] mb-2">
              India 🇮🇳
            </h3>
            <p className="text-[13px] text-white/55 leading-[1.7]">
              Flexible timezone coverage.<br />Available for global remote work.
            </p>
          </BentoCard>

          {/* Stack — full width */}
          <BentoCard className="md:col-span-3" delay={0.2}>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-3">Stack</div>
            <h3 className="font-serif text-[clamp(22px,2.8vw,32px)] font-normal tracking-[-0.02em] leading-[1.25] text-[#f0f0f5] mb-2">
              Tools I <em className="italic text-white/55">actually use</em>
            </h3>
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
    </section>
  );
}
