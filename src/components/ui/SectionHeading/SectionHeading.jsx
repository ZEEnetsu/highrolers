import { motion } from 'motion/react';
import { fadeUp, revealOnScroll } from '../../../animations/variants.js';
import RevealText from '../RevealText/RevealText.jsx';
import './SectionHeading.css';

// "[ TAG ]" + word-reveal display title, with an optional mono note on the right
export default function SectionHeading({ tag, title, aside }) {
  return (
    <div className="section-heading">
      <div className="section-heading-main">
        <span className="section-tag">{tag}</span>
        <RevealText as="h2" className="section-heading-title" text={title} />
      </div>
      {aside && (
        <motion.p className="section-heading-aside" variants={fadeUp} {...revealOnScroll(0.6)}>
          {aside}
        </motion.p>
      )}
    </div>
  );
}
