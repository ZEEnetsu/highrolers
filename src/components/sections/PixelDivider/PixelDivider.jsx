import { motion } from 'motion/react';
import { EASE_OUT_EXPO, revealOnScroll } from '../../../animations/variants.js';
import './PixelDivider.css';

const wipeIn = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.4, ease: EASE_OUT_EXPO } },
};

// Dithered pixel strip that wipes in left-to-right above the footer.
// The wrapper watches the viewport: a fully clipped element never registers as in view.
export default function PixelDivider() {
  return (
    <motion.div className="footer-pixel-divider-wrap" {...revealOnScroll(0.5)}>
      <motion.img
        src="/assets/starmedia_bw/pixel_dither_bw.png"
        alt="Pixel Matrix Divider"
        className="pixel-ribbon-img"
        variants={wipeIn}
      />
    </motion.div>
  );
}
