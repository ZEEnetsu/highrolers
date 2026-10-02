import { useState } from 'react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router';
import { NAV_ITEMS, NAV_SECTION_IDS } from '../../../data/navigation.js';
import { SPRING_SNAPPY } from '../../../animations/variants.js';
import { useScrollSpy } from '../../../hooks/useScrollSpy.js';
import { scrollToSection } from '../../../utils/scrollToSection.js';
import './NavPillDock.css';

// Detail pages (/capabilities/...) belong to this section
const OFF_HOME_ACTIVE_ID = 'services';

/**
 * Floating nav pill. The highlight springs to the hovered button and
 * settles back on the section currently in view. Off the home page the
 * items link back to their home sections.
 */
export default function NavPillDock() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  const [spyId, setSpyId] = useScrollSpy(NAV_SECTION_IDS, isHome);
  const [hoveredId, setHoveredId] = useState(null);
  const activeId = isHome ? spyId : OFF_HOME_ACTIVE_ID;
  const highlightedId = hoveredId ?? activeId;

  const handleClick = (e, id) => {
    e.preventDefault();
    if (isHome) {
      setSpyId(id);
      scrollToSection(id);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="nav-pill-dock" aria-label="Main Navigation" onMouseLeave={() => setHoveredId(null)}>
      {NAV_ITEMS.map(({ id, label }) => (
        <a
          key={id}
          href={`/#${id}`}
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
