import Lenis from 'lenis';

/**
 * Site-wide smooth scrolling (Lenis). Tune the feel here.
 * Lenis honours the OS "reduce motion" setting by default (scroll becomes 1:1, jumps instant).
 */
export const SMOOTH_SCROLL_OPTIONS = {
  lerp: 0.09,                // wheel smoothing: lower = longer, silkier glide
  wheelMultiplier: 1,
  syncTouch: false,          // phones keep their native touch scrolling
  autoRaf: true,             // Lenis runs its own animation frame loop
  allowNestedScroll: true,   // dropdowns, tab rows and the contents bar still scroll on their own
  stopInertiaOnNavigate: true,
};

// Programmatic jumps (nav links, "back to top") glide with the site's ease-out-expo curve
const JUMP = {
  duration: 1.2,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
};

let lenis = null;

// Starts smooth scrolling; returns a cleanup function
export function startSmoothScroll() {
  lenis = new Lenis(SMOOTH_SCROLL_OPTIONS);
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

// Scroll the page to an absolute Y position — through Lenis when it is running
export function scrollToY(top, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(top, { ...JUMP, immediate, force: true });
  } else {
    window.scrollTo({ top, left: 0, behavior: immediate ? 'instant' : 'smooth' });
  }
}
