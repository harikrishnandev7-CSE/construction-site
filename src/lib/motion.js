/**
 * AADHIRA BUILDCRAFT — MOTION DESIGN TOKENS & SYSTEM
 * Centralized, standardized animation curves, durations, and variants
 * Ensures consistent 60fps motion language across all sections.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]; // House standard curve for reveals

export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.7,
};

export const STAGGER = 0.06;

export const VIEWPORT = {
  once: true,
  margin: '-60px',
};

// Reusable Framer Motion Variants
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER,
      delayChildren: 0.08,
    },
  },
};
