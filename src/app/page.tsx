"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
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

  return (
    <main className="relative z-[1] bg-[#050505]">
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
  );
}
