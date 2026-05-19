'use client';

import { useState, useEffect, useCallback } from 'react';
import CanvasCursor from './CanvasCursor';
import NeonCursor from './NeonCursor';

/**
 * CursorManager — detects which section the mouse is over and shows
 * the appropriate cursor effect:
 *   • Canvas trailing lines → #about (Know About Me + Where I've been)
 *   • Neon glowing cursor   → all other sections
 */

// Section IDs where the Neon cursor should be active (hero only)
const NEON_SECTIONS = ['hero'];

export default function CursorManager() {
  const [activeSection, setActiveSection] = useState<'canvas' | 'neon'>('canvas');

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;

    // Walk up the DOM tree to find the nearest section with a matching ID
    const section = el.closest('section');
    if (section && NEON_SECTIONS.includes(section.id)) {
      setActiveSection('neon');
    } else {
      setActiveSection('canvas');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      <CanvasCursor visible={activeSection === 'canvas'} />
      <NeonCursor visible={activeSection === 'neon'} />
    </>
  );
}
