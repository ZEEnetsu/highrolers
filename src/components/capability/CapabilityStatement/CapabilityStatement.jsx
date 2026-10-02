import { motion } from 'motion/react';
import { fadeUp, revealOnScroll } from '../../../animations/variants.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import '../capability.css';
import './CapabilityStatement.css';

const LINE_STAGGER = 0.18;

// Big editorial lines that alternate sides and alternate solid / outlined type
export default function CapabilityStatement({ statement }) {
  return (
    <section className="capability-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealOnScroll(0.1)}>
          <BracketBox className="capability-frame capability-statement">
            <div className="capability-statement-meta">
              <span className="section-tag">[ {statement.title} ]</span>
              {statement.text && <p className="capability-statement-text">{statement.text}</p>}
            </div>

            <div className="capability-statement-lines">
              {statement.lines.map((line, i) => (
                <RevealText
                  key={line}
                  as="p"
                  text={line}
                  className={`capability-statement-line${i % 2 ? ' is-right is-outline' : ''}`}
                  delay={i * LINE_STAGGER}
                  amount={0.6}
                />
              ))}
            </div>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
