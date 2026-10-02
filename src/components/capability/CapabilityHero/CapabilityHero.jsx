import { motion } from 'motion/react';
import { Link } from 'react-router';
import { EASE_OUT_EXPO, SPRING_BOUNCY, fadeUp, stagger } from '../../../animations/variants.js';
import { pad2 } from '../../../utils/format.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import CountUp from '../../ui/CountUp/CountUp.jsx';
import PixelEmblem from '../../ui/PixelEmblem/PixelEmblem.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import PixelParticleField from '../../effects/PixelParticleField/PixelParticleField.jsx';
import '../capability.css';
import './CapabilityHero.css';

// Numbers derived from the capability's own content
function buildStats({ sections, flow, highlights }) {
  const services = sections.reduce((total, section) => total + section.items.length, 0);
  const stats = [
    { label: 'SERVICES', value: services },
    { label: sections.length === 1 ? 'DISCIPLINE' : 'DISCIPLINES', value: sections.length },
  ];
  if (flow) stats.push({ label: flow.joiner === '+' ? 'BUILDING BLOCKS' : 'PROCESS STEPS', value: flow.steps.length });
  else if (highlights) stats.push({ label: 'CORE PRINCIPLES', value: highlights.length });
  return stats;
}

export default function CapabilityHero({ capability, group, total }) {
  const { slug, num, name, short, badge, tagline, intro } = capability;
  const stats = buildStats(capability);

  return (
    <section className="capability-section capability-hero">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        >
          <BracketBox className="capability-frame capability-hero-frame">
            <PixelParticleField density={1 / 7000} radius={120} />

            <div className="capability-hero-inner">
              <div className="capability-hero-meta">
                <Link to="/#services" className="capability-back-link">
                  <span aria-hidden="true">←</span> ALL CAPABILITIES
                </Link>
                <span className="section-tag capability-hero-group">[ {group.title} ]</span>
              </div>

              <div className="capability-hero-grid">
                <motion.div className="capability-hero-copy" variants={stagger(0.1, 0.15)} initial="hidden" animate="visible">
                  {badge && (
                    <motion.span
                      className="capability-badge"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ ...SPRING_BOUNCY, delay: 0.2 }}
                    >
                      ✦ {badge}
                    </motion.span>
                  )}

                  <motion.div className="capability-hero-num" variants={fadeUp} aria-hidden="true">
                    {num}
                    <span className="capability-hero-total">/ {pad2(total)}</span>
                  </motion.div>

                  <RevealText as="h1" className="capability-hero-title" text={name} delay={0.25} staggerBy={0.07} amount={0.1} />

                  <motion.p className="capability-hero-tagline" variants={fadeUp}>
                    {tagline}
                  </motion.p>

                  {intro.map((paragraph) => (
                    <motion.p key={paragraph} className="capability-body-text capability-hero-intro" variants={fadeUp}>
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>

                <motion.div
                  className="capability-emblem"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT_EXPO }}
                >
                  <div className="capability-emblem-screen">
                    <PixelEmblem seed={slug} />
                  </div>
                  <span className="capability-emblem-caption">
                    [ HR—{num} // {short} ]
                  </span>
                </motion.div>
              </div>

              <div className="capability-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="capability-stat">
                    <span className="capability-stat-value">
                      <CountUp value={stat.value} />
                    </span>
                    <span className="capability-stat-label">{stat.label}</span>
                  </div>
                ))}
                <div className="capability-stat">
                  <span className="capability-stat-value capability-stat-word">{group.label}</span>
                  <span className="capability-stat-label">CATEGORY</span>
                </div>
              </div>
            </div>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
