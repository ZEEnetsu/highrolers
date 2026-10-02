import { motion } from 'motion/react';
import { Link } from 'react-router';
import { fadeUp } from '../../../animations/variants.js';
import { COPYRIGHT, LEGAL_LINKS } from '../../../data/site.js';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import ContactChannels from '../ContactChannels/ContactChannels.jsx';
import StudioClock from '../StudioClock/StudioClock.jsx';
import './ContactIntro.css';

// The footer is hidden on the contact page, so its legal links live here
export function ContactLegal({ className = '' }) {
  return (
    <nav className={`contact-legal ${className}`.trim()} aria-label="Legal">
      {LEGAL_LINKS.map((link) => (
        <Link key={link.to} to={link.to} className="contact-legal-link">
          {link.label}
        </Link>
      ))}
      <span className="contact-legal-copy">{COPYRIGHT}</span>
    </nav>
  );
}

/**
 * Left side of the contact page: status, headline, live studio clock and
 * direct channels. `compact` (phones) keeps only the headline and an icon row.
 */
export default function ContactIntro({ compact = false }) {
  return (
    <div className={`contact-intro${compact ? ' is-compact' : ''}`}>
      <div className="contact-intro-top">
        <span className="section-tag contact-intro-tag">[ CONTACT // CHANNEL OPEN ]</span>
        <span className="contact-live">
          <span className="contact-live-dot" aria-hidden="true" />
          ONLINE
        </span>
      </div>

      <RevealText as="h1" className="contact-title" text={"HAVE AN IDEA?\nLET'S BUILD IT."} delay={0.15} staggerBy={0.09} />

      {!compact && (
        <>
          <motion.p className="contact-pitch" variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }}>
            An automated workflow, a website, an app, an AI system or a full digital transformation — tell us what you
            need. One message reaches the whole team.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <StudioClock />
          </motion.div>
        </>
      )}

      <ContactChannels compact={compact} />

      {!compact && <ContactLegal />}
    </div>
  );
}
