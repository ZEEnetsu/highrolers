import { motion } from 'motion/react';
import { fadeUp, revealOnScroll, stagger } from '../../../animations/variants.js';
import { useToast } from '../../../context/ToastContext.jsx';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import '../capability.css';
import './CapabilityIdealFor.css';

const pillIn = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 20 } },
};

export default function CapabilityIdealFor({ items }) {
  const showToast = useToast();

  return (
    <section className="capability-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealOnScroll(0.15)}>
          <BracketBox className="capability-frame capability-ideal">
            <div className="capability-ideal-head">
              <span className="section-tag">[ IDEAL FOR ]</span>
              <RevealText as="h2" className="capability-heading" text="BUILT FOR" />
            </div>

            <motion.ul className="capability-ideal-list" variants={stagger(0.06, 0.15)} {...revealOnScroll(0.3)}>
              {items.map((item) => (
                <motion.li key={item} className="pill-tag-motion" variants={pillIn}>
                  <button
                    type="button"
                    className="pill-tag capability-ideal-pill"
                    onClick={() => showToast(`IDEAL FOR // ${item.toUpperCase()}`)}
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
