"use client";

import { motion } from "framer-motion";
import { posts } from "@/data";
import AuroraBackground from "./AuroraBackground";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export default function Blog() {
  return (
    <section id="blog" className="py-24 relative z-10 section-blend overflow-hidden">
      <AuroraBackground layout="tl-br" colors={[
        "rgba(124, 58, 237, 0.52)",
        "rgba(109, 40, 217, 0.40)",
        "rgba(139, 92, 246, 0.30)",
      ]} />
      <div className="max-w-[1080px] mx-auto px-7 relative z-[1]">
        <motion.p variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5">
          Honors & Awards
        </motion.p>
        <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="font-serif text-[clamp(30px,4.5vw,50px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]">
          Achievements & <em className="italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">recognition</em>
        </motion.h2>

        <div className="flex flex-col">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href="#"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="blog-row flex items-start justify-between gap-5 py-7 border-b border-white/[0.06] first:pt-0 no-underline text-[#f0f0f5]"
            >
              <div>
                <div className="text-[11.5px] text-white/30 font-mono tracking-[0.05em] mb-2">
                  {post.date} · {post.read}
                </div>
                <h3 className="font-serif text-[clamp(17px,2vw,22px)] font-normal tracking-[-0.01em] leading-[1.3] mb-2">
                  {post.title}
                </h3>
                <p className="text-[13px] text-white/55 leading-[1.65] max-w-[540px]">{post.excerpt}</p>
              </div>
              <span className="blog-read-label text-xs text-white/30 whitespace-nowrap flex items-center gap-[5px] pt-[5px] transition-colors duration-200">
                View →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
