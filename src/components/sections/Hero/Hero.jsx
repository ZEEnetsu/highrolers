import { motion } from 'motion/react';
import { EASE_OUT_EXPO, SPRING_BOUNCY } from '../../../animations/variants.js';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import PixelMatrixCanvas from '../../effects/PixelMatrixCanvas/PixelMatrixCanvas.jsx';
import PixelParticleField from '../../effects/PixelParticleField/PixelParticleField.jsx';
import AudienceBanner from './AudienceBanner.jsx';
import './Hero.css';

const HASHTAGS = ['WE HELP', 'TO'];

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <PixelParticleField />

      <div className="container hero-container">
        <div className="hero-headline-block">
          <div className="hero-hashtag-wrap">
            {HASHTAGS.map((tag, i) => (
              <motion.span
                key={tag}
                className="hero-hashtag-motion"
                initial={{ opacity: 0, y: 14, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...SPRING_BOUNCY, delay: 0.15 + i * 0.1 }}
              >
                <span className="hero-hashtag">{tag}</span>
              </motion.span>
            ))}
          </div>
          <RevealText as="h1" className="hero-main-title" text="CREATE WITHOUT LIMITS" delay={0.3} staggerBy={0.12} />
        </div>

        <AudienceBanner />

        <motion.div
          className="pixel-matrix-ribbon-wrap"
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.9, ease: EASE_OUT_EXPO }}
        >
          <PixelMatrixCanvas />
        </motion.div>
      </div>
    </section>
  );
}
