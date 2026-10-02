import { useEffect } from 'react';

const SITE_NAME = 'HIGHROLERS®';
// Captured once from index.html, restored when a page with custom meta unmounts
const DEFAULT_TITLE = document.title;
const DEFAULT_DESCRIPTION = document.querySelector('meta[name="description"]')?.content ?? '';

// Sets the tab title and meta description while the calling page is mounted
export function usePageMeta({ title, description }) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    document.title = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
    if (meta && description) meta.content = description;

    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.content = DEFAULT_DESCRIPTION;
    };
  }, [title, description]);
}
