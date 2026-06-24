// @ts-nocheck
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import './NeonCursor.css';

interface NeonCursorProps {
  visible: boolean;
}

const NeonCursor = ({ visible }: NeonCursorProps) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const trailSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const glowSpringConfig = { damping: 40, stiffness: 150, mass: 1 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);
  const glowXSpring = useSpring(cursorX, glowSpringConfig);
  const glowYSpring = useSpring(cursorY, glowSpringConfig);

  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trailControls = useAnimation();
  const glowControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Hue oscillator ── */
  const phaseRef = useRef(Math.random() * 2 * Math.PI);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      phaseRef.current += 0.0015;
      const hue = Math.round(285 + Math.sin(phaseRef.current) * 85);
      if (containerRef.current) {
        containerRef.current.style.setProperty('--neon-hue', String(hue));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback(
    (e) => {
      const target = e.target;
      if (target && typeof target.matches === 'function' && target.matches('a, button, input, [data-hover="true"]')) {
        setIsHovering(true);
        void trailControls.start({
          scale: 1.5,
          borderWidth: '3px',
        });
        void glowControls.start({
          scale: 2,
          opacity: 0.8,
        });
      }
    },
    [trailControls, glowControls]
  );

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
    void trailControls.start({
      scale: 1,
      borderWidth: '2px',
    });
    void glowControls.start({
      scale: 1,
      opacity: 0.4,
    });
  }, [trailControls, glowControls]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  return (
    <div
      ref={containerRef}
      className='neon-cursor-container'
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Main cursor dot */}
      <motion.div
        className='cursor-main'
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className='cursor-trail'
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={false}
      />

      {/* Outer glow */}
      <motion.div
        className='cursor-glow'
        style={{
          x: glowXSpring,
          y: glowYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={false}
      />
    </div>
  );
};

export default NeonCursor;
