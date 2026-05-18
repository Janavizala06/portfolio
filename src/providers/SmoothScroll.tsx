"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = instance;
    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* ── Global anchor interceptor ─────────────── 
       Catches ALL clicks on <a href="#..."> anywhere in the page
       and routes them through Lenis for buttery smooth scrolling */
    function handleAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      instance.scrollTo(target as HTMLElement, {
        offset: -60,   // navbar clearance
        duration: 1.8,  // cinematic scroll speed
      });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      instance.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
