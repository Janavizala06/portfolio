"use client";
import { useRef, useState, useCallback } from "react";

/* ── Spotlight wrapper ── */
export function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className={className}
      style={{ ["--mouse-x" as string]: `${mouse.x}px`, ["--mouse-y" as string]: `${mouse.y}px` }}
    >
      {children}
    </div>
  );
}

/* ── SpotLightItem ── */
export function SpotLightItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`spotlight-item relative rounded-xl overflow-hidden ${className}`}>
      {/* spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{
          background: "radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
