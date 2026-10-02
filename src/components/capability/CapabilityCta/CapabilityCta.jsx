import { motion } from 'motion/react';
import { Link } from 'react-router';
import { fadeUp, revealOnScroll } from '../../../animations/variants.js';
import { capabilityPath } from '../../../data/capabilities.js';
import { MAPS_URL } from '../../../data/site.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import RotatingSeal from '../../ui/RotatingSeal/RotatingSeal.jsx';
import '../capability.css';
import './CapabilityCta.css';

const CUSTOM_SLUG = 'custom-digital-solutions';

export default function CapabilityCta({ current }) {
  const onCustomPage = current.slug === CUSTOM_SLUG;
  const primary = onCustomPage
    ? { to: '/#services', label: 'EXPLORE ALL CAPABILITIES' }
    : { to: capabilityPath(CUSTOM_SLUG), label: 'START A CUSTOM SOLUTION' };

  return (
    <section className="capability-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealOnScroll(0.2)}>
          <BracketBox className="capability-frame capability-cta">
            <div className="capability-cta-copy">
              <span className="section-tag">[ WORK WITH HIGHROLERS ]</span>
              <RevealText as="h2" className="capability-cta-title" text={"LET'S BUILD\nSOMETHING SMARTER."} />
              <p className="capability-body-text capability-cta-text">
                From an idea to an entire digital ecosystem — an automated workflow, a new website, an app, an AI system or
                a full digital transformation. HIGHROLERS can build it.
              </p>

              <div className="capability-cta-actions">
                <Link to={primary.to} className="capability-cta-btn is-primary">
                  {primary.label} <span aria-hidden="true">→</span>
                </Link>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="capability-cta-btn">
                  VISIT THE STUDIO <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="capability-cta-seal">
              <RotatingSeal pathId="cta-seal-path" />
            </div>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
