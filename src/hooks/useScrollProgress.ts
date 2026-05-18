"use client";

import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return pct;
}
