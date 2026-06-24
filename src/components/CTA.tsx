"use client";

import { motion } from "framer-motion";
import ScrollText from '@/components/ui/scroll-text';

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
};

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function CTA() {
  const otwItems = Array(12).fill("OPEN TO WORK ·");

  return (
    <section id="cta" className="pt-8 sm:pt-12 pb-4 sm:pb-6 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden relative section-blend">
      {/* CTA mesh glow */}
      <div className="absolute -inset-[30%] z-0 pointer-events-none blur-[50px] animate-mesh"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(120,80,255,0.25) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 40% at 70% 70%, rgba(80,160,255,0.15) 0%, transparent 60%)",
          ].join(","),
        }}
      />

      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="relative z-[2] inline-flex items-center gap-2 bg-white/10 border border-white/[0.15] rounded-pill px-4 py-1.5 text-xs text-white/70 mb-8">
        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
        Open to work · Full-time &amp; Freelance
      </motion.div>

      <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="relative z-[2] font-serif text-[clamp(40px,7vw,80px)] font-normal tracking-[-0.03em] leading-[1.1] mb-[18px] flex flex-col items-center">
        <span className="shimmer-text" style={{ '--placeholder-length': 12 } as React.CSSProperties}>From concept</span>
        <span className="flex items-center gap-2">
          <span className="shimmer-text" style={{ '--placeholder-length': 3 } as React.CSSProperties}>to</span>
          <em className="italic shimmer-text" style={{ '--placeholder-length': 9, '--chosen': 'var(--clock)' } as React.CSSProperties}>creation.</em>
        </span>
        <span className="shimmer-text" style={{ '--placeholder-length': 21 } as React.CSSProperties}>Let&apos;s make it happen!</span>
      </motion.h2>

      <ScrollText
        text="I'm available for full-time roles & internships. I thrive on building AI-powered web applications and delivering seamless user experiences."
        as="p"
        className="relative z-[2] text-[15px] text-white/60 max-w-[420px] leading-[1.7] mb-11"
        delay={0.2}
      />

      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="relative z-[2] flex gap-3 flex-wrap justify-center">
        <span className="connect-btn-wrap">
          <a
            href="mailto:janavizala0612@gmail.com"
            className="connect-btn-inner inline-flex items-center gap-[7px] px-[22px] py-[11px] rounded-pill text-sm font-medium no-underline bg-white text-[#050505]"
          >
            <MailIcon /> Get In Touch
          </a>
        </span>
        <a href="#projects" className="sparkle-btn">
          <span>
            {"View work →".split("").map((ch, i) => (
              <span key={i} className="sparkle-letter">{ch === " " ? "\u00A0" : ch}</span>
            ))}
          </span>
        </a>
      </motion.div>

      {/* Open to work marquee */}
      <div className="overflow-hidden w-full mt-[72px] relative z-[2]">
        <div className="flex w-max animate-marquee">
          {otwItems.map((t, i) => (
            <span key={i} className="font-serif text-[13px] italic text-white/70 whitespace-nowrap px-7 border-r border-white/20">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
