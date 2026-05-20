"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data";
import AuroraBackground from "./AuroraBackground";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-10 section-blend overflow-hidden">
      <AuroraBackground layout="radial" colors={[
        "rgba(79, 70, 229, 0.52)",
        "rgba(59, 130, 246, 0.40)",
        "rgba(99, 102, 241, 0.30)",
      ]} />
      <div className="max-w-[1080px] mx-auto px-7 relative z-[1]">
        <motion.p variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5">
          Experience
        </motion.p>
        <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]">
          Work & <em className="italic gradient-text-animated">volunteer</em>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3.5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name + t.role}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                borderColor: "rgba(255,255,255,0.16)",
                boxShadow: "0 24px 52px rgba(99,102,241,0.16), 0 8px 20px rgba(0,0,0,0.28)",
                transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const },
              }}
              className="glass-card p-7 flex flex-col gap-5 cursor-default"
            >
              <p className="font-serif text-[15.5px] font-normal leading-[1.75] text-[#f0f0f5] flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-full bg-[#111120] border border-white/[0.06] flex items-center justify-center text-[17px] flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#f0f0f5] mb-[1px]">{t.name}</div>
                  <div className="text-[11.5px] text-white/30">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
