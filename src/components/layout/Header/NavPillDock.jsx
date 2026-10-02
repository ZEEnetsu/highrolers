import { useState } from 'react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router';
import { NAV_ITEMS, NAV_SECTION_IDS } from '../../../data/navigation.js';
import { SPRING_SNAPPY } from '../../../animations/variants.js';
import { useScrollSpy } from '../../../hooks/useScrollSpy.js';
import { scrollToSection } from '../../../utils/scrollToSection.js';
import { scrollToY } from '../../../utils/smoothScroll.js';
import './NavPillDock.css';

// Capability detail pages (/capabilities/...) belong to this section
const CAPABILITY_SECTION_ID = 'services';

function resolveActiveId(pathname, spyId) {
  const routeItem = NAV_ITEMS.find((item) => item.to === pathname);
  if (routeItem) return routeItem.id;
  if (pathname === '/') return spyId;
  if (pathname.startsWith('/capabilities/')) return CAPABILITY_SECTION_ID;
  return null; // e.g. legal pages
}

/**
 * Floating nav pill. The highlight springs to the hovered button and
 * settles back on the active item: the section in view on the home page,
 * or the current page for route items. Off the home page, section items
 * link back to their home sections.
 */
export default function NavPillDock() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  const [spyId, setSpyId] = useScrollSpy(NAV_SECTION_IDS, isHome);
  const [hoveredId, setHoveredId] = useState(null);
  const activeId = resolveActiveId(pathname, spyId);
  const highlightedId = hoveredId ?? activeId;

  const handleClick = (e, item) => {
    e.preventDefault();
    if (item.to) {
      if (pathname === item.to) scrollToY(0);
      else navigate(item.to);
    } else if (isHome) {
      setSpyId(item.id);
      scrollToSection(item.id);
    } else {
      navigate(`/#${item.id}`);
    }
  };

  return (
    <nav className="nav-pill-dock" aria-label="Main Navigation" onMouseLeave={() => setHoveredId(null)}>
      {NAV_ITEMS.map((item) => {
        const { id, label, to, mobileHidden } = item;
        return (
          <a
            key={id}
            href={to ?? `/#${id}`}
            className={`nav-pill-btn${activeId === id ? ' active' : ''}${mobileHidden ? ' is-mobile-hidden' : ''}`}
            aria-current={activeId === id ? (to ? 'page' : 'true') : undefined}
            onMouseEnter={() => setHoveredId(id)}
            onClick={(e) => handleClick(e, item)}
          >
            {highlightedId === id && (
              <motion.span
                layoutId="nav-gliding-pill"
                className="nav-gliding-pill"
                // Inline radius lets Motion keep it round while the pill stretches; the themed shadow is in CSS
                style={{ borderRadius: 980 }}
                transition={SPRING_SNAPPY}
                aria-hidden="true"
              />
            )}
            {label}
          </a>
        );
      })}
    </nav>
  );
}
