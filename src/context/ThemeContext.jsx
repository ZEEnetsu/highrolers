import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { DEFAULT_THEME, FOLLOW_SYSTEM, THEMES, THEME_STORAGE_KEY } from '../data/themes.js';
import { withThemeTransition } from '../utils/themeTransition.js';

const ThemeContext = createContext(null);

const isKnownTheme = (id) => THEMES.some((t) => t.id === id);
const darkQuery = () => window.matchMedia?.('(prefers-color-scheme: dark)');
const systemTheme = () => (darkQuery()?.matches ? 'dark' : 'light');

// Storage can throw in private windows or with blocked site data
function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveTheme(id) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* choice just won't persist */
  }
}

function resolveInitialTheme() {
  // Normally already set by the boot script in index.html
  const fromDocument = document.documentElement.dataset.theme;
  if (isKnownTheme(fromDocument)) return fromDocument;

  const saved = readSavedTheme();
  if (isKnownTheme(saved)) return saved;

  return FOLLOW_SYSTEM ? systemTheme() : DEFAULT_THEME;
}

function applyThemeToDocument(id) {
  document.documentElement.dataset.theme = id;
  const metaColor = THEMES.find((t) => t.id === id)?.metaColor;
  if (metaColor) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', metaColor);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(resolveInitialTheme);

  // Layout effect so the attribute changes inside flushSync (and the view transition)
  useLayoutEffect(() => applyThemeToDocument(theme), [theme]);

  // Follow OS changes until the visitor picks a theme themselves
  useEffect(() => {
    const query = darkQuery();
    if (!FOLLOW_SYSTEM || !query) return undefined;

    const onChange = () => {
      if (!isKnownTheme(readSavedTheme())) setThemeState(systemTheme());
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // origin: { x, y } viewport point the reveal grows from (e.g. the toggle's center)
  const setTheme = useCallback((id, origin) => {
    if (!isKnownTheme(id)) return;
    saveTheme(id);
    withThemeTransition(() => flushSync(() => setThemeState(id)), origin);
  }, []);

  const toggleTheme = useCallback(
    (origin) => {
      const index = THEMES.findIndex((t) => t.id === theme);
      setTheme(THEMES[(index + 1) % THEMES.length].id, origin);
    },
    [theme, setTheme]
  );

  const value = useMemo(() => ({ theme, themes: THEMES, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Returns { theme, themes, setTheme(id, origin?), toggleTheme(origin?) }
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
}
