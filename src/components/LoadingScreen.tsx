"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Sparkle stars ───────────────────────────────────── */
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.6 + 0.2,
  }));
}

const WORD = "Generating";

/* ── LoadingScreen ───────────────────────────────────── */
export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [stars, setStars] = useState<Star[]>([]);
  const [phase, setPhase] = useState<
    "loading" | "fade-text" | "fly" | "hold" | "done"
  >("loading");

  /* Track mouse for orb → cursor flight */
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Stars — client only */
  useEffect(() => {
    setStars(generateStars(80));
  }, []);

  /* ── Phase timeline ────────────────────────────────
     loading (3.5s) → fade-text (0.5s) → fly (0.7s) → hold (0.8s) → done
     During "hold", the orb sits at cursor position looking like the
     real cursor while the background fades away. Then done.
     ────────────────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setPhase("fade-text"), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "fade-text") {
      const t = setTimeout(() => setPhase("fly"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "fly") {
      const t = setTimeout(() => setPhase("hold"), 700);
      return () => clearTimeout(t);
    }
    if (phase === "hold") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  /* Orb target — where the mouse is, relative to screen center */
  const [orbTarget, setOrbTarget] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (phase === "fly") {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      setOrbTarget({ x: mx - cx, y: my - cy });
      setCursorPos({ x: mx, y: my });
    }
  }, [phase]);

  const showText = phase === "loading";
  const isFlying = phase === "fly";
  const isHolding = phase === "hold";
  const showScreen = phase !== "done";

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[10000]"
          style={{ cursor: "none" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ── Background — fades during hold ───── */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "#0D0026" }}
            animate={isHolding ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ── Sparkling Stars ───────────────────── */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            animate={
              isFlying || isHolding ? { opacity: 0 } : { opacity: 1 }
            }
            transition={{ duration: 0.4 }}
          >
            {stars.map((s) => (
              <div
                key={s.id}
                className="loading-star"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.duration}s`,
                  opacity: s.opacity,
                }}
              />
            ))}
          </motion.div>

          {/* ── Everything in one centered column for alignment ── */}
          {!isHolding && (
            <div className="absolute inset-0 flex flex-col items-center z-10">
              {/* Top spacer — pushes orb to center */}
              <div className="flex-1" />

              {/* Orb */}
              <motion.div
                animate={
                  isFlying
                    ? {
                        x: orbTarget.x,
                        y: orbTarget.y,
                        scale: 0.11,
                        opacity: 1,
                      }
                    : { x: 0, y: 0, scale: 1, opacity: 1 }
                }
                transition={
                  isFlying
                    ? { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
                    : {}
                }
              >
                <div className="loader-wrapper">
                  <motion.div
                    className="flex items-center justify-center"
                    animate={showText ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {WORD.split("").map((letter, i) => (
                      <span
                        key={i}
                        className="loader-letter"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </motion.div>
                  <div className="loader-orb" />
                </div>
              </motion.div>

              {/* Bottom spacer — same as top so orb stays centered */}
              <div className="flex-1" />

              {/* Girl Avatar + Credits — at bottom, same column = aligned */}
              <motion.div
                className="flex flex-col items-center pb-6"
                animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  <div
                    className="absolute inset-0 blur-[40px] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 80%, rgba(99,102,241,0.15) 0%, transparent 70%)",
                    }}
                  />
                  <img
                    src="/girl-avatar.png"
                    alt="Janavi Zala"
                    className="relative w-[120px] sm:w-[160px] h-auto object-contain"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(99,102,241,0.2))",
                    }}
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-[18px] sm:text-[20px] text-white tracking-[0.08em] -mt-1"
                >
                  ©Janavi Zala , 2026.
                </motion.p>
              </motion.div>
            </div>
          )}

          {/* ── Cursor dot — appears at mouse during hold ── */}
          {isHolding && (
            <motion.div
              className="fixed z-[10001] pointer-events-none"
              style={{
                left: cursorPos.x - 10,
                top: cursorPos.y - 10,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, hsla(260,50%,50%,1) 0%, hsla(260,50%,50%,0.8) 40%, hsla(260,50%,50%,0.4) 70%, transparent 100%)",
                boxShadow:
                  "0 0 12px hsla(260,50%,50%,0.6), 0 0 30px hsla(260,50%,50%,0.3), 0 0 60px hsla(260,50%,50%,0.15)",
                mixBlendMode: "screen",
              }}
              initial={{ scale: 3, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          {/* ── Trailing ring ── */}
          {isHolding && (
            <motion.div
              className="fixed z-[10000] pointer-events-none"
              style={{
                left: cursorPos.x - 20,
                top: cursorPos.y - 20,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "2px solid hsla(260,50%,50%,0.5)",
                boxShadow:
                  "0 0 8px hsla(260,50%,50%,0.2), inset 0 0 8px hsla(260,50%,50%,0.1)",
              }}
              initial={{ scale: 4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
