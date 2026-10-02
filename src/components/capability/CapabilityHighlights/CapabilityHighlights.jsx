import { motion } from 'motion/react';
import { fadeUp, revealOnScroll, stagger } from '../../../animations/variants.js';
import { pad2 } from '../../../utils/format.js';
import SectionHeading from '../../ui/SectionHeading/SectionHeading.jsx';
import '../capability.css';
import './CapabilityHighlights.css';

// Editorial trio of outcomes — ruled columns instead of boxed cards, for rhythm
export default function CapabilityHighlights({ highlights }) {
  return (
    <section className="capability-section">
      <div className="container">
        <SectionHeading tag="[ WHY IT MATTERS ]" title="WHAT CHANGES FOR YOU" />

        <motion.div className="capability-highlights" variants={stagger(0.14)} {...revealOnScroll(0.2)}>
          {highlights.map((highlight, i) => (
            <motion.article key={highlight.title} className="capability-highlight" variants={fadeUp}>
              <span className="capability-highlight-index">{pad2(i + 1)}</span>
              <h3 className="capability-highlight-title">{highlight.title}</h3>
              <p className="capability-body-text">{highlight.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
