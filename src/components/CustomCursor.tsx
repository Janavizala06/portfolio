"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * SPOTLIGHT CURSOR
 * ─────────────────────────────────────────────────────────────
 * No visible cursor shape — just a soft radial glow that follows
 * the mouse like a moving light source over the dark background.
 *
 * States:
 *  default  → 140px violet/indigo glow, opacity 0.13
 *  on-link  → 80px glow tightens + brightens to opacity 0.28
 *  hide     → fully invisible (when wand cursor is active in KnowAboutMe)
 * ─────────────────────────────────────────────────────────────
 */
export default function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);
  // Current smoothed position
  const posRef  = useRef({ x: -200, y: -200 });
  // Target position (raw mouse)
  const targetRef = useRef({ x: -200, y: -200 });

  /* ── Smooth follow via rAF lerp ── */
  const animate = useCallback(() => {
    const LERP = 0.10; // lower = more lag, more cinematic
    posRef.current.x += (targetRef.current.x - posRef.current.x) * LERP;
    posRef.current.y += (targetRef.current.y - posRef.current.y) * LERP;

    if (glowRef.current) {
      glowRef.current.style.left = posRef.current.x + "px";
      glowRef.current.style.top  = posRef.current.y + "px";
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    /* ── Link/button hover → tighten spotlight ── */
    const handleEnter = () => document.body.classList.add("on-link");
    const handleLeave = () => document.body.classList.remove("on-link");

    const attach = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      mo.disconnect();
    };
  }, [animate]);

  return (
    <div
      ref={glowRef}
      className="spotlight-cursor"
      aria-hidden="true"
    />
  );
}
