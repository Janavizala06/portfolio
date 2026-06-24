"use client";

import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { projects } from "@/data";
import AuroraBackground from "./AuroraBackground";
import ScrollText from "@/components/ui/scroll-text";

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
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[13px] font-semibold tracking-[0.12em] uppercase text-white/40 px-3 py-1.5 rounded-md border border-white/[0.08]">
                {p.type}
              </span>
              <span className="text-[14px] text-white/30 font-mono">{p.period}</span>
              <span className="ml-auto text-base font-mono text-white/20">{p.num}</span>
            </div>

            <h3 className={`font-serif text-[clamp(28px,3.5vw,42px)] font-bold tracking-tight leading-[1.15] mb-4 ${["text-[#facc15]", "text-[#fb923c]", "text-[#34d399]", "text-[#f472b6]", "text-[#60a5fa]", "text-[#a78bfa]"][index % 6]}`}>
              {p.title}
            </h3>
            <p className="text-[15.5px] text-white/50 leading-[1.75] mb-7 line-clamp-3">
              {p.fullDesc}
            </p>

            <div className="space-y-3 mb-7">
              {p.highlights.map((h, hi) => (
                <div key={hi} className="flex items-start gap-3 text-[15px] text-white/60 leading-[1.5]">
                  <div
                    className="four-pointed-star"
                    style={{
                      '--star-color': ["#facc15", "#fb923c", "#34d399", "#f472b6", "#60a5fa", "#a78bfa"][index % 6],
                    } as React.CSSProperties}
                  />
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t.name}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/55"
              >
                {t.logo && <img src={t.logo} alt={t.name} className="w-4 h-4" />}
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
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative z-10 bg-[#08080d]"
    >
      <div className="pt-16 sm:pt-24 pb-4 sm:pb-8 relative section-blend overflow-hidden">
        <AuroraBackground
          layout="center"
          colors={[
            "rgba(99, 102, 241, 0.55)",
            "rgba(79, 70, 229, 0.42)",
            "rgba(124, 58, 237, 0.32)",
          ]}
        />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10 relative z-[1]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5"
          >
            Selected Work
          </motion.p>
          <ScrollText
            text="Projects that shipped"
            as="h2"
            className="font-serif text-[clamp(40px,5vw,64px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5]"
            direction="up"
            highlight={[{ text: "shipped", className: "italic gradient-text-animated" }]}
          />
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
