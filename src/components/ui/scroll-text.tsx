'use client';

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

/* ───────────────────────────────────────────────────────
 *  ScrollText  –  word-by-word (or letter-by-letter)
 *  blur-reveal animation triggered on scroll into view.
 *
 *  Inspired by React Bits scroll-text patterns.
 *  Uses framer-motion whileInView + staggerChildren.
 * ─────────────────────────────────────────────────────── */

// Direction presets
const directionOffset: Record<string, Record<string, number>> = {
  up:    { y: 20 },
  down:  { y: -20 },
  left:  { x: -20 },
  right: { x: 20 },
};

// Default child variants per direction
const makeDefaultVariants = (dir: string, blur: number): Variants => ({
  hidden: {
    filter: `blur(${blur}px)`,
    opacity: 0,
    ...directionOffset[dir],
  },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
    x: 0,
    transition: { ease: 'linear' },
  },
});

/* ─── Highlight config: mark specific words with a class ─── */
export interface HighlightWord {
  /** The word (or phrase fragment) to match */
  text: string;
  /** Extra className to apply, e.g. "italic gradient-text-animated" */
  className: string;
}

/* ─── Component Props ─── */
export interface ScrollTextProps {
  /** Plain text to animate. Each word becomes a motion.span. */
  text: string;
  /** HTML element to render as the outer container */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  /** Container className */
  className?: string;
  /** Animate each letter instead of each word */
  letterAnime?: boolean;
  /** Animate each line (split by newline) */
  lineAnime?: boolean;
  /** Direction the tokens fly in from */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Custom framer-motion variants for each token */
  variants?: Variants;
  /** Blur strength in px (default 10) */
  blur?: number;
  /** Delay between staggered children in seconds */
  staggerDelay?: number;
  /** Only animate once (default true) */
  once?: boolean;
  /** Extra delay before the container starts (seconds) */
  delay?: number;
  /** Words to highlight with special classes */
  highlight?: HighlightWord[];
  /** InView amount threshold (default 0.6) */
  threshold?: number;
}

/* ─── Main Component ─── */
export default function ScrollText({
  text,
  as: Tag = 'div',
  className = '',
  letterAnime = false,
  lineAnime = false,
  direction = 'up',
  variants,
  blur = 10,
  staggerDelay,
  once = true,
  delay = 0,
  highlight = [],
  threshold = 0.6,
}: ScrollTextProps) {
  // Resolve child variants
  const childVariants = useMemo(
    () => variants ?? makeDefaultVariants(direction, blur),
    [variants, direction, blur]
  );

  // Split text into animatable tokens
  const tokens = useMemo(() => {
    if (lineAnime) return text.split('\n');
    if (letterAnime) return text.split('');
    return text.split(' ');
  }, [text, letterAnime, lineAnime]);

  // Determine default stagger
  const stagger = staggerDelay ?? (letterAnime ? 0.03 : lineAnime ? 0.12 : 0.06);

  // Container variants
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // Figure out which tokens need a highlight class
  const getHighlightClass = (token: string): string | null => {
    for (const h of highlight) {
      // Match the highlight text against the token (case-insensitive, ignoring punctuation trailing)
      if (h.text.toLowerCase().split(' ').some(w => token.toLowerCase().replace(/[.,!?;:]+$/, '') === w.toLowerCase().replace(/[.,!?;:]+$/, ''))) {
        return h.className;
      }
    }
    return null;
  };

  // Use the motion version of the tag
  const MotionTag = motion[Tag as keyof typeof motion] as any;

  return (
    <MotionTag
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {tokens.map((token: string, i: number) => {
        const highlightClass = getHighlightClass(token);
        return (
          <motion.span
            key={`${token}-${i}`}
            variants={childVariants}
            style={{
              display: 'inline-block',
              whiteSpace: letterAnime ? 'pre' : 'normal',
            }}
            className={highlightClass ?? undefined}
          >
            {token}
            {/* Add space after word (not for letters or last token) */}
            {!letterAnime && !lineAnime && i < tokens.length - 1 ? '\u00A0' : ''}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
