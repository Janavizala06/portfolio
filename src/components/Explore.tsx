"use client";

import { motion } from "framer-motion";
import { useTilt3d } from "@/hooks/useTilt3d";
import ScrollText from '@/components/ui/scroll-text';

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
};

const exploreItems = [
  { label: "Code", title: "GitHub", desc: "Explore my open-source projects, contributions, and code repositories.", href: "https://github.com/Janavizala06" },
  { label: "Network", title: "LinkedIn", desc: "Connect professionally — let's build something great together.", href: "https://linkedin.com/in/janavi-zala-226117288" },
  { label: "Reach Out", title: "Email", desc: "Drop me a line — I respond within 24 hours.", href: "mailto:janavi0612@gmail.com" },
];

function LightButton({ title, href, delay }: { title: string, href: string, delay: number }) {
  const getSvg = (type: string) => {
    switch(type) {
      case 'GitHub':
        return <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>;
      case 'LinkedIn':
        return <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>;
      case 'Email':
        return <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay }}
      className="light-button"
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="bt">
        <div className="light-holder">
          <div className="dot"></div>
          <div className="light"></div>
        </div>
        <div className="button-holder">
          <svg viewBox={title === 'Email' ? "0 0 512 512" : title === 'LinkedIn' ? "0 0 448 512" : "0 0 496 512"} xmlns="http://www.w3.org/2000/svg">
            {getSvg(title)}
          </svg>
          <p className="text-[15px]">{title}</p>
        </div>
      </a>
    </motion.div>
  );
}

export default function Explore() {
  return (
    <section className="py-16 sm:py-24 relative z-10 section-blend overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 relative z-[2]">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-2.5"
        >
          Explore
        </motion.p>
        <ScrollText
          text="Go deeper"
          as="h2"
          className="font-serif text-[clamp(40px,5vw,64px)] font-normal tracking-[-0.02em] leading-[1.15] text-[#f0f0f5] mb-[52px]"
          highlight={[{ text: "deeper", className: "italic gradient-text-animated" }]}
        />

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-10">
          {exploreItems.map((item, i) => (
            <LightButton key={item.title} title={item.title} href={item.href} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
