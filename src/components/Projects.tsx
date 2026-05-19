"use client";

import { motion } from "framer-motion";
import { projects } from "@/data";
import AuroraBackground from "./AuroraBackground";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10 section-blend overflow-hidden">
      <AuroraBackground layout="center" colors={[
        "rgba(99, 102, 241, 0.55)",
        "rgba(79, 70, 229, 0.42)",
        "rgba(124, 58, 237, 0.32)",
      ]} />
      <div className="max-w-[1080px] mx-auto px-7 relative z-[1]">
        <motion.p variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5">
          Selected Work
        </motion.p>
        <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]">
          Projects that <em className="italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">shipped</em>
        </motion.h2>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <motion.div
              key={p.num}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="proj-row grid grid-cols-[56px_1fr_auto] items-start gap-7 py-9 border-b border-white/[0.06] first:pt-0 relative transition-colors"
            >
              {/* Number */}
              <span className="font-serif text-[15px] text-white/30 italic pt-[5px]">{p.num}</span>

              {/* Info */}
              <div>
                <span className="inline-flex text-[10.5px] font-semibold tracking-[0.08em] uppercase text-white/30 px-2.5 py-1 rounded-md border border-white/[0.06] mb-2.5">
                  {p.type}
                </span>
                <h3 className="font-serif text-[clamp(20px,2.4vw,28px)] font-normal tracking-[-0.02em] leading-[1.2] text-[#f0f0f5] mb-2">{p.title}</h3>
                <p className="text-[13.5px] text-white/55 leading-[1.7] mb-4 max-w-[540px]">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] font-medium tracking-[0.04em] px-2.5 py-1 rounded-[7px] bg-[#0a0a12] border border-white/[0.06] text-white/55">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col items-end gap-2.5 pt-1">
                <span className="text-xs text-white/30 font-mono tracking-[0.05em]">{p.period}</span>
                <div className="proj-arrow-icon w-[34px] h-[34px] rounded-full border border-white/[0.08] flex items-center justify-center text-sm bg-white/[0.04] flex-shrink-0 transition-all duration-[400ms]">
                  ↗
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See more */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mt-10">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-card bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-[#f0f0f5] no-underline
            hover:bg-white/[0.08] hover:-translate-y-0.5 transition-all duration-300">
            See more projects →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
