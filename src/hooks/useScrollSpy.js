import { useEffect, useState } from 'react';

const SECTION_OFFSET = 100;
const THROTTLE_MS = 50;

/**
 * Tracks which section the user is reading. Returns [activeId, setActiveId]
 * so a nav click can mark its target active right away.
 * `sectionIds` must be a stable array (define it outside the component).
 * Pass `enabled = false` to pause tracking (e.g. on pages without those sections).
 */
export function useScrollSpy(sectionIds, enabled = true) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    if (!enabled) return undefined;
    let timeout = null;

    const update = () => {
      const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 70;
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - headerHeight - SECTION_OFFSET) {
          current = id;
        }
      });

      setActiveId(current);
    };

    const onScroll = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        timeout = null;
        update();
      }, THROTTLE_MS);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, [sectionIds, enabled]);

  return [activeId, setActiveId];
}
