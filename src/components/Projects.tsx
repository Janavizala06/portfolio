"use client";

import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { projects } from "@/data";
import AuroraBackground from "./AuroraBackground";

/* ─── Single stacking card ─────────────────────────────── */
interface CardProps {
  index: number;
  project: (typeof projects)[number];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({ index, project: p, progress, range, targetScale }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Inner image zoom effect
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  // Whole card shrink effect
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="stacking-card-container">
      <motion.article
        className="stacking-project-card"
        style={{
          scale: scale, // Explicitly pass the scale transform
          top: `calc(-5vh + ${index * 25}px)`,
          transformOrigin: "top center", // Explicitly ensure transform origin is top
        }}
      >
        {/* Left — image */}
        <div className="project-image">
          <motion.img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e0e14]/70 md:block hidden" />
        </div>

        {/* Right — content */}
        <div className="project-copy">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/40 px-2.5 py-1 rounded-md border border-white/[0.08]">
                {p.type}
              </span>
              <span className="text-xs text-white/30 font-mono">{p.period}</span>
              <span className="ml-auto text-[11px] font-mono text-white/20">{p.num}</span>
            </div>

            <h3 className="font-serif text-[clamp(20px,2.6vw,28px)] font-normal tracking-[-0.02em] leading-[1.2] text-[#f0f0f5] mb-2">
              {p.title}
            </h3>
            <p className="text-[12.5px] text-white/50 leading-[1.7] mb-5 line-clamp-3">
              {p.fullDesc}
            </p>

            <div className="space-y-2 mb-5">
              {p.highlights.slice(0, 3).map((h, hi) => (
                <div key={hi} className="flex items-start gap-2 text-[12px] text-white/60 leading-[1.5]">
                  <span className="flex-shrink-0 mt-0.5">{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t.name}
                className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/55"
              >
                {t.logo && <img src={t.logo} alt={t.name} className="w-3 h-3" />}
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────── */
export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="projects" className="relative z-10 bg-[#08080d]">
      <div className="py-16 sm:py-24 relative section-blend overflow-hidden">
        <AuroraBackground
          layout="center"
          colors={[
            "rgba(99, 102, 241, 0.55)",
            "rgba(79, 70, 229, 0.42)",
            "rgba(124, 58, 237, 0.32)",
          ]}
        />
        <div className="max-w-[1080px] mx-auto px-4 sm:px-7 relative z-[1]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5]"
          >
            Projects that{" "}
            <em className="italic gradient-text-animated">shipped</em>
          </motion.h2>
          <p className="mt-3 text-[13px] text-white/30">Scroll down to explore ↓</p>
        </div>
      </div>

      <div className="stacking-cards-strip" aria-label="Selected project cards">
        {projects.map((p, i) => {
          // Exactly matching the reference math
          const targetScale = 1 - (projects.length - i) * 0.05;
          // Calculate precise scroll range fraction based on total projects to avoid [1,1] crash
          const scrollFraction = i / projects.length;
          
          return (
            <Card
              key={p.num}
              index={i}
              project={p}
              progress={scrollYProgress}
              range={[scrollFraction, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
