"use client";

import { motion } from "framer-motion";
import { navItems, navSections } from "@/data";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Navbar() {
  const active = useActiveSection(navSections);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 0.6, delay: 2.2, ease: [0.16, 1, 0.3, 1] as const }}
      className="fixed top-4 left-1/2 z-[800] flex items-center gap-1 px-2 py-1.5 rounded-pill
        bg-[rgba(10,10,18,0.72)] border border-white/[0.06]
        backdrop-blur-[20px] saturate-[1.4]
        shadow-[0_2px_20px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)_inset]"
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center px-3 py-[5px] no-underline">
        <img src="/logo2.png" alt="JZ" className="h-[22px] w-auto object-contain" />
      </a>

      {/* Separator */}
      <div className="w-px h-5 bg-white/[0.08] mx-1" />

      {/* Links */}
      {navItems.map((item) => {
        const isActive = active === item.href.replace("#", "");
        return (
          <a
            key={item.href}
            href={item.href}
            className={`text-[13px] font-medium no-underline px-4 py-[7px] rounded-pill transition-colors duration-200
              ${isActive ? "bg-white/[0.07] text-[#f0f0f5]" : "text-white/55 hover:bg-white/[0.07] hover:text-[#f0f0f5]"}`}
          >
            {item.label}
          </a>
        );
      })}
    </motion.nav>
  );
}
