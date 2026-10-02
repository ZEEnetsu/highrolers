import { THEME_TRANSITION } from '../data/themes.js';

const SWITCHING_CLASS = 'theme-switching';

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Runs `update` (which must change the DOM synchronously) inside a circular
 * reveal that grows from `origin` ({ x, y } in viewport px). Falls back to an
 * instant switch without View Transitions support or with reduced motion.
 */
export function withThemeTransition(update, origin) {
  const root = document.documentElement;
  root.classList.add(SWITCHING_CLASS);

  if (!document.startViewTransition || prefersReducedMotion()) {
    update();
    // Let the new colors paint before CSS transitions come back
    requestAnimationFrame(() => root.classList.remove(SWITCHING_CLASS));
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(update);

  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { ...THEME_TRANSITION, pseudoElement: '::view-transition-new(root)' }
      );
    })
    .catch(() => {});

  transition.finished.finally(() => root.classList.remove(SWITCHING_CLASS));
}
