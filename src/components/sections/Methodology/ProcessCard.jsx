import { motion } from 'motion/react';
import { fadeUp } from '../../../animations/variants.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';

export default function ProcessCard({ card, index }) {
  const { tag, title, image, imageAlt, description, inverted } = card;

  return (
    // Motion drives the wrapper so the card keeps its CSS hover lift
    <motion.div className="process-card-motion" variants={fadeUp}>
      <BracketBox className={`process-card hover-lift${inverted ? ' light-card' : ''}`}>
        <div className="process-card-header">
          <h3 className="card-title">{title}</h3>
          <span className="card-tag">[{tag}]</span>
        </div>

        <div className="card-visual-area">
          <motion.img
            src={image}
            alt={imageAlt}
            className="card-glyph-img"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
          />
        </div>

        <div className="card-footer-info">
          <p className="card-body-text">{description}</p>
          <span className="card-brand-mark">HIGHROLERS</span>
        </div>
      </BracketBox>
    </motion.div>
  );
}
