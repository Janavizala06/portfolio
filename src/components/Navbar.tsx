"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, navSections } from "@/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import Image from "next/image";

function getGreeting(): { text: string; icon: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { text: "Good Morning", icon: "☀️" };
  if (hour >= 12 && hour < 17) return { text: "Good Afternoon", icon: "🌤️" };
  if (hour >= 17 && hour < 21) return { text: "Good Evening", icon: "🌙" };
  return { text: "Good Night", icon: "🌙" };
}

export default function Navbar() {
  const active = useActiveSection(navSections);
  const [showGreeting, setShowGreeting] = useState(true);
  const [greeting] = useState(getGreeting);

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 0.6, delay: 2.2, ease: [0.16, 1, 0.3, 1] as const }}
      className="fixed top-4 left-1/2 z-[800] flex items-center gap-1 px-2 py-1.5 rounded-pill
        bg-[rgba(15,15,22,0.55)] border border-white/[0.08]
        backdrop-blur-[32px] saturate-[1.6]
        shadow-[0_4px_30px_rgba(0,0,0,0.5),0_1px_0_0_rgba(255,255,255,0.06)_inset,0_0_0_0.5px_rgba(255,255,255,0.04)]
        max-w-[calc(100vw-32px)]"
    >
      {/* Logo - always visible */}
      <a href="#" className="flex-shrink-0 flex items-center relative z-[100] h-[22px]">
        <Image src="/logo2.png" alt="JZ" width={50} height={22} priority className="h-[22px] w-auto object-contain" />
      </a>

      {/* Separator */}
      <div className="w-px h-5 bg-white/[0.08] mx-1" />

      <AnimatePresence mode="wait">
        {showGreeting ? (
          /* ── Greeting ─────────────────────────── */
          <motion.div
            key="greeting"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-4 py-[7px]"
          >
            <span className="text-[15px] leading-none">{greeting.icon}</span>
            <span className="text-[13px] font-medium text-[#e8e8f0] whitespace-nowrap">
              {greeting.text}
            </span>
          </motion.div>
        ) : (
          /* ── Nav Links ────────────────────────── */
          <motion.div
            key="nav-links"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1"
          >
            {navItems.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative text-[12px] sm:text-[13px] font-medium no-underline px-2.5 sm:px-4 py-[7px] rounded-pill transition-colors duration-200 outline-none focus:outline-none focus:ring-0 active:outline-none
                    ${isActive ? "text-[#e8e8f0]" : "text-white/50 hover:text-[#d0d0da]"}`}
                >
                  {/* Active background pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bg"
                      className="absolute inset-0 rounded-pill bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {/* Lamp glow indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-lamp"
                      className="absolute -top-[3px] left-[20%] right-[20%] h-[3px] rounded-full bg-white pointer-events-none
                        shadow-[0_0_6px_2px_rgba(255,255,255,0.8),0_2px_12px_4px_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-[1]">{item.label}</span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
