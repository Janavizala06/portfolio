"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data";
import AuroraBackground from "./AuroraBackground";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDismiss = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 relative z-10 section-blend overflow-hidden"
    >
      <AuroraBackground
        layout="center"
        colors={[
          "rgba(99, 102, 241, 0.55)",
          "rgba(79, 70, 229, 0.42)",
          "rgba(124, 58, 237, 0.32)",
        ]}
      />
      <div className="max-w-[1080px] mx-auto px-4 sm:px-7 relative z-[1]">
        {/* Section header */}
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5"
        >
          Selected Work
        </motion.p>
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[150px]"
        >
          Projects that <em className="italic gradient-text-animated">shipped</em>
        </motion.h2>

        {/* ── Stacked Cards ────────────────────── */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="project-stack"
        >
          {projects.map((p, i) => {
            /* Calculate card position relative to active */
            const offset =
              (i - activeIndex + projects.length) % projects.length;

            return (
              <motion.article
                key={p.num}
                className="project-card"
                style={{ overflow: offset > 0 ? "hidden" : "visible", gridArea: "stack" }}
                animate={{
                  y: offset * -28,
                  scale: 1 - offset * 0.04,
                  opacity: offset === 0 ? 1 : offset === 1 ? 0.6 : 0.3,
                  zIndex: projects.length - offset,
                  height: offset > 0 ? 60 : "auto",
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Card Header */}
                <div className="project-card-header">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40 px-2.5 py-1 rounded-md border border-white/[0.08]">
                      {p.type}
                    </span>
                    <span className="text-xs text-white/30 font-mono">
                      {p.period}
                    </span>
                  </div>
                  {/* Dismiss button — only on front card */}
                  {offset === 0 && (
                    <button
                      onClick={handleDismiss}
                      className="w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:rotate-90 transition-all duration-300 cursor-pointer"
                      aria-label="Next project"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Card Body — Left image, Right content */}
                <div className="project-card-body">
                  {/* Left — Screenshot */}
                  <div className="project-card-image">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right — Content */}
                  <div className="project-card-content">
                    <h3 className="font-serif text-[clamp(22px,3vw,32px)] font-normal tracking-[-0.02em] leading-[1.2] text-[#f0f0f5] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-[13.5px] text-white/55 leading-[1.7] mb-5">
                      {p.fullDesc}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 mb-5">
                      {p.highlights.map((h, hi) => (
                        <div
                          key={hi}
                          className="flex items-start gap-2.5 text-[13px] text-white/65 leading-[1.5]"
                        >
                          <span className="text-base flex-shrink-0 mt-0.5">
                            {h.icon}
                          </span>
                          <span>{h.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t.name}
                          className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.04em] px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60"
                        >
                          {t.logo && (
                            <img
                              src={t.logo}
                              alt={t.name}
                              className="w-3.5 h-3.5"
                            />
                          )}
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Card indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "bg-white/70 w-6"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
