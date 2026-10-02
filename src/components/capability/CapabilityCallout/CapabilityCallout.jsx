import { motion } from 'motion/react';
import { fadeUp, revealOnScroll, stagger } from '../../../animations/variants.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import '../capability.css';
import './CapabilityCallout.css';

const pillIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

// Inverse panel for a focused offer (redesigns, MVPs, infrastructure notes)
export default function CapabilityCallout({ callout }) {
  return (
    <section className="capability-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealOnScroll(0.2)}>
          <BracketBox className="capability-frame dark-inverted capability-inverse inverse-surface capability-callout">
            {/* Clipped decoration layer, so the frame itself keeps its corner brackets */}
            <span className="capability-callout-clip" aria-hidden="true">
              <span className="capability-callout-glyph">»»»</span>
            </span>

            <div className="capability-callout-grid">
              <div>
                <span className="section-tag">[ GOOD TO KNOW ]</span>
                <RevealText as="h2" className="capability-callout-title" text={callout.title} />
              </div>

              <div className="capability-callout-body">
                <p className="capability-callout-text">{callout.text}</p>
                {callout.items && (
                  <motion.ul className="capability-callout-pills" variants={stagger(0.05, 0.2)} {...revealOnScroll(0.3)}>
                    {callout.items.map((item) => (
                      <motion.li key={item} className="capability-callout-pill" variants={pillIn}>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </div>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
