import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import { EASE_OUT_EXPO, fadeUp, stagger } from '../../../animations/variants.js';
import { capabilityPath } from '../../../data/capabilities.js';
import { useToast } from '../../../context/ToastContext.jsx';

const drawerTransition = { duration: 0.5, ease: EASE_OUT_EXPO };

const pillIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

function ArrowIcon() {
  return (
    <svg
      className="service-arrow-svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function ServiceRow({ capability, isOpen, onToggle }) {
  const { slug, num, name, summary, tags, sections } = capability;
  const showToast = useToast();
  const [selectedTags, setSelectedTags] = useState(() => new Set());
  const drawerId = `service-drawer-${slug}`;
  const serviceCount = sections.reduce((total, section) => total + section.items.length, 0);

  const toggleTag = (tag) => {
    setSelectedTags((current) => {
      const next = new Set(current);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
    showToast(`CAPABILITY // ${tag.toUpperCase()}`);
  };

  return (
    // Motion drives the wrapper so the row keeps its CSS transitions
    <motion.div variants={fadeUp}>
      <div className={`service-row-item${isOpen ? ' active' : ''}`}>
        <div className="service-row-header" onClick={onToggle}>
          <div className="service-num-wrap">
            <span className="service-num">{num}</span>
            <h3 className="service-name">{name}</h3>
          </div>
          <button
            type="button"
            className="service-arrow-wrap"
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${name}`}
            aria-expanded={isOpen}
            aria-controls={drawerId}
          >
            <ArrowIcon />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={drawerId}
              className="service-expand-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={drawerTransition}
            >
              <div className="service-content-grid">
                <div className="service-desc-text">{summary}</div>
                <motion.div className="service-tags-list" variants={stagger(0.05, 0.12)} initial="hidden" animate="visible">
                  {tags.map((tag) => (
                    <motion.span key={tag} className="pill-tag-motion" variants={pillIn}>
                      <button
                        type="button"
                        className={`pill-tag${selectedTags.has(tag) ? ' selected' : ''}`}
                        aria-pressed={selectedTags.has(tag)}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    </motion.span>
                  ))}
                </motion.div>
                <div className="service-drawer-footer">
                  <span className="service-drawer-meta">[ {serviceCount} SERVICES INSIDE ]</span>
                  <Link to={capabilityPath(slug)} className="service-explore-link">
                    EXPLORE CAPABILITY <span className="service-explore-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
