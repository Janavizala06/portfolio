"use client";

import { useState, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import KnowAboutMe from "@/components/KnowAboutMe";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Explore from "@/components/Explore";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollPct = useScrollProgress();
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* ── Loading Screen ── */}
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* ── Main Content ── */}
      <main
        className="relative z-[1] bg-[#050505]"
        style={{
          /* Prevent scrolling while loading */
          overflow: loading ? "hidden" : undefined,
          height: loading ? "100vh" : undefined,
        }}
      >
        {/* Scroll progress */}
        <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

        <Navbar />

        {/* ── Continuous flow canvas — all sections share one dark background ── */}
        <div className="relative">
          <Hero />
          <Marquee />
          <KnowAboutMe />
          <Projects />
          <Blog />
          <Testimonials />
          <Explore />
          <CTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
