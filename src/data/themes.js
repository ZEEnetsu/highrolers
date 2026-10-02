/**
 * Theme registry.
 *
 * To add a theme:
 *   1. Copy src/styles/themes/dark.css to <id>.css and change the selector to [data-theme='<id>'].
 *   2. Import it in src/styles/global.css.
 *   3. Add an entry below. toggleTheme() cycles through this list in order.
 *
 * If you rename THEME_STORAGE_KEY or change the follow-system rule, update the
 * inline boot script in index.html too (it runs before React to prevent a flash).
 */
export const THEMES = [
  { id: 'light', label: 'Light', metaColor: '#FFFFFF' },
  { id: 'dark', label: 'Dark', metaColor: '#0A0A0C' },
];

// Used when there is no saved choice and the OS preference is ignored or unavailable
export const DEFAULT_THEME = 'light';

// When true, first-time visitors get their OS light/dark setting until they pick one
export const FOLLOW_SYSTEM = true;

export const THEME_STORAGE_KEY = 'highrolers-theme';

// Circular reveal that spreads from the toggle when switching themes
export const THEME_TRANSITION = {
  duration: 750,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
};
