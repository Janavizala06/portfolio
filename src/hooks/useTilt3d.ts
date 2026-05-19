"use client";

import { useRef, useCallback, type MouseEvent as ReactMouseEvent } from "react";

export function useTilt3d<T extends HTMLElement = HTMLDivElement>(strength = 8) {
  const ref = useRef<T>(null);

  const onMove = useCallback(
    (e: ReactMouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -strength;
      el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(600px) rotateX(0) rotateY(0)";
  }, []);

  return { ref, onMove, onLeave };
}
