import { motion } from 'motion/react';
import { SPRING_SNAPPY } from '../../../animations/variants.js';

/**
 * Category filter for the capabilities accordion. The active pill glides
 * between tabs the same way the header nav highlight does.
 */
export default function CapabilityTabs({ tabs, activeId, onChange, controls }) {
  return (
    <div className="capability-tabs" role="tablist" aria-label="Capability categories">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={controls}
            title={tab.title}
            className={`capability-tab${isActive ? ' active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {isActive && (
              <motion.span
                layoutId="capability-tab-pill"
                className="capability-tab-pill"
                style={{ borderRadius: 980 }}
                transition={SPRING_SNAPPY}
                aria-hidden="true"
              />
            )}
            <span className="capability-tab-label">{tab.label}</span>
            <span className="capability-tab-count">{String(tab.count).padStart(2, '0')}</span>
          </button>
        );
      })}
    </div>
  );
}
