import { motion } from 'motion/react';
import { Link } from 'react-router';
import { fadeUp, revealOnScroll, stagger } from '../../../animations/variants.js';
import { capabilityPath } from '../../../data/capabilities.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import PixelEmblem from '../../ui/PixelEmblem/PixelEmblem.jsx';
import SectionHeading from '../../ui/SectionHeading/SectionHeading.jsx';
import '../capability.css';
import './CapabilityPager.css';

function PagerCard({ capability, direction }) {
  const isNext = direction === 'next';
  return (
    <motion.div className="capability-pager-motion" variants={fadeUp}>
      <BracketBox as={Link} to={capabilityPath(capability.slug)} className={`capability-pager-card is-${direction}`}>
        <div className="capability-pager-copy">
          <span className="capability-pager-dir">
            {isNext ? 'NEXT' : 'PREVIOUS'} <span aria-hidden="true">{isNext ? '→' : '←'}</span>
          </span>
          <span className="capability-pager-num">{capability.num}</span>
          <span className="capability-pager-name">{capability.name}</span>
        </div>
        <span className="capability-pager-emblem">
          <PixelEmblem seed={capability.slug} />
        </span>
      </BracketBox>
    </motion.div>
  );
}

export default function CapabilityPager({ prev, next, related, group }) {
  return (
    <section className="capability-section">
      <div className="container">
        <SectionHeading tag="[ CONTINUE EXPLORING ]" title="KEEP BUILDING" />

        <motion.div className="capability-pager" variants={stagger(0.12)} {...revealOnScroll(0.2)}>
          <PagerCard capability={prev} direction="prev" />
          <PagerCard capability={next} direction="next" />
        </motion.div>

        {related.length > 0 && (
          <motion.div className="capability-related" variants={fadeUp} {...revealOnScroll(0.4)}>
            <span className="capability-related-label">MORE IN {group.title}</span>
            <div className="capability-related-links">
              {related.map((capability) => (
                <Link key={capability.slug} to={capabilityPath(capability.slug)} className="capability-related-link">
                  <span className="capability-related-num">{capability.num}</span>
                  {capability.short}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
