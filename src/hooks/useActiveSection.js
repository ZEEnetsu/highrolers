import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently being read: the last one whose top
 * has crossed the upper third of the viewport. `ids` must be a stable array.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id)));
        const current = ids.find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
