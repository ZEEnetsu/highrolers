/**
 * Shared Motion presets. The easing matches the --transition-* tokens
 * so JS-driven and CSS-driven animations feel like one system.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export const SPRING_SNAPPY = { type: 'spring', stiffness: 420, damping: 34 };
export const SPRING_BOUNCY = { type: 'spring', stiffness: 260, damping: 14 };

// Spread onto a motion element to play its "visible" variant once it scrolls into view
export const revealOnScroll = (amount = 0.2) => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

// Word slides up out of an overflow-hidden mask
export const wordReveal = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

export const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
