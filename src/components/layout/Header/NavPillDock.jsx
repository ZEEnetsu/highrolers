import { useState } from 'react';
import { motion } from 'motion/react';
import { NAV_ITEMS, NAV_SECTION_IDS } from '../../../data/navigation.js';
import { SPRING_SNAPPY } from '../../../animations/variants.js';
import { useScrollSpy } from '../../../hooks/useScrollSpy.js';
import { scrollToSection } from '../../../utils/scrollToSection.js';
import './NavPillDock.css';

/**
 * Floating nav pill. The highlight springs to the hovered button and
 * settles back on the section currently in view.
 */
export default function NavPillDock() {
  const [activeId, setActiveId] = useScrollSpy(NAV_SECTION_IDS);
  const [hoveredId, setHoveredId] = useState(null);
  const highlightedId = hoveredId ?? activeId;

  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveId(id);
    scrollToSection(id);
  };

  return (
    <nav className="nav-pill-dock" aria-label="Main Navigation" onMouseLeave={() => setHoveredId(null)}>
      {NAV_ITEMS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`nav-pill-btn${activeId === id ? ' active' : ''}`}
          aria-current={activeId === id ? 'true' : undefined}
          onMouseEnter={() => setHoveredId(id)}
          onClick={(e) => handleClick(e, id)}
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
      ))}
    </nav>
  );
}
