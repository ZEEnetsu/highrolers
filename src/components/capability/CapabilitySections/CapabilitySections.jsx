import { motion } from 'motion/react';
import { fadeUp, revealOnScroll, stagger } from '../../../animations/variants.js';
import { pad2 } from '../../../utils/format.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import SectionHeading from '../../ui/SectionHeading/SectionHeading.jsx';
import '../capability.css';
import './CapabilitySections.css';

// Echo the home process cards: the middle card (or a checkerboard) is inverted
function isInverted(index, count) {
  if (count === 4) return index === 1 || index === 2;
  if (count === 1) return false;
  return index === 1;
}

export default function CapabilitySections({ sections }) {
  const total = sections.reduce((sum, section) => sum + section.items.length, 0);
  const columns = Math.min(sections.length, 3);
  const layout = sections.length === 4 ? 'cols-2' : `cols-${columns}`;

  return (
    <section className="capability-section">
      <div className="container">
        <SectionHeading
          tag="[ WHAT WE DELIVER ]"
          title="WHAT WE DELIVER"
          aside={`${total} services across ${sections.length} ${sections.length === 1 ? 'discipline' : 'disciplines'} — pick one, or combine them.`}
        />

        <motion.div className={`capability-cards ${layout}`} variants={stagger(0.12)} {...revealOnScroll(0.1)}>
          {sections.map((section, index) => {
            const inverted = isInverted(index, sections.length);
            return (
              <motion.div key={section.title} className="capability-card-motion" variants={fadeUp}>
                <BracketBox
                  className={`capability-card${inverted ? ' dark-inverted capability-inverse inverse-surface' : ''}`}
                >
                  <div className="capability-card-header">
                    <h3 className="capability-card-title">{section.title}</h3>
                    <span className="capability-card-tag">[ {pad2(index + 1)} ]</span>
                  </div>

                  {section.text && <p className="capability-card-text">{section.text}</p>}

                  <ol className="capability-card-list">
                    {section.items.map((item, i) => (
                      <li key={item} className="capability-card-item">
                        <span className="capability-card-index">{pad2(i + 1)}</span>
                        <span className="capability-card-label">{item}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="capability-card-footer">
                    <span className="capability-card-brand">HIGHROLERS</span>
                    <span className="capability-card-count">{pad2(section.items.length)} SERVICES</span>
                  </div>
                </BracketBox>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
