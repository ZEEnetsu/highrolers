import { motion } from 'motion/react';
import { Link } from 'react-router';
import { EASE_OUT_EXPO } from '../../animations/variants.js';
import { usePageMeta } from '../../hooks/usePageMeta.js';
import BracketBox from '../../components/ui/BracketBox/BracketBox.jsx';
import PixelEmblem from '../../components/ui/PixelEmblem/PixelEmblem.jsx';
import RevealText from '../../components/ui/RevealText/RevealText.jsx';
import PixelParticleField from '../../components/effects/PixelParticleField/PixelParticleField.jsx';
import '../../components/capability/capability.css';
import '../../components/capability/CapabilityCta/CapabilityCta.css';
import './NotFoundPage.css';

export default function NotFoundPage() {
  usePageMeta({ title: 'Page not found' });

  return (
    <section className="capability-section not-found">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <BracketBox className="capability-frame not-found-frame">
            <PixelParticleField density={1 / 6000} />
            <div className="not-found-inner">
              <div className="not-found-emblem">
                <PixelEmblem seed="404-signal-lost" />
              </div>
              <span className="section-tag">[ 404 // SIGNAL LOST ]</span>
              <RevealText as="h1" className="not-found-title" text="PAGE NOT FOUND" />
              <p className="capability-body-text not-found-text">
                The page you were looking for has moved or never existed. Let&apos;s get you back to something useful.
              </p>
              <div className="not-found-actions">
                <Link to="/" className="capability-cta-btn is-primary">BACK TO HOME →</Link>
                <Link to="/#services" className="capability-cta-btn">ALL CAPABILITIES</Link>
              </div>
            </div>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
