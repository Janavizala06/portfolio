"use client";

import { motion } from "framer-motion";
import { useTilt3d } from "@/hooks/useTilt3d";
import AuroraBackground from "./AuroraBackground";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
};

const exploreItems = [
  { label: "Code", title: "GitHub", desc: "Explore my open-source projects, contributions, and code repositories.", href: "https://github.com/Janavizala06" },
  { label: "Network", title: "LinkedIn", desc: "Connect professionally — let's build something great together.", href: "https://linkedin.com/in/janavi-zala-226117288" },
  { label: "Reach Out", title: "Email", desc: "Drop me a line — I respond within 24 hours.", href: "mailto:janavi0612@gmail.com" },
];

function ExploreCard({ label, title, desc, href, delay }: typeof exploreItems[number] & { delay: number }) {
  const { ref, onMove, onLeave } = useTilt3d<HTMLAnchorElement>(5);
  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      href={href}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-7 no-underline text-[#f0f0f5] relative overflow-hidden group block"
      style={{ transformStyle: "preserve-3d", transition: "transform 0.12s linear" }}
    >
      <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-3.5">{label}</div>
      <h3 className="font-serif text-[clamp(18px,2.2vw,24px)] font-normal tracking-[-0.02em] leading-[1.3] mb-2">{title}</h3>
      <p className="text-[13px] text-white/55 leading-[1.65]">{desc}</p>
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-white/30 transition-all duration-[400ms] group-hover:translate-x-1 group-hover:-translate-y-[calc(50%+4px)] group-hover:text-[#f0f0f5]">
        ↗
      </span>
    </motion.a>
  );
}

export default function Explore() {
  return (
    <section className="py-24 relative z-10 section-blend overflow-hidden">
      <AuroraBackground layout="center" colors={[
        "rgba(124, 58, 237, 0.58)",
        "rgba(99, 102, 241, 0.45)",
        "rgba(79, 70, 229, 0.35)",
      ]} />
      <div className="max-w-[1080px] mx-auto px-7 relative z-[1]">
        <motion.p variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5">
          Explore
        </motion.p>
        <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]">
          Go <em className="italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">deeper</em>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {exploreItems.map((item, i) => (
            <ExploreCard key={item.title} {...item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
