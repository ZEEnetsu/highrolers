import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE_OUT_EXPO } from '../../../animations/variants.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';

// Full-width dithered crowd photo with a slow scroll parallax
export default function AudienceBanner() {
  const frameRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.55, ease: EASE_OUT_EXPO }}
    >
      <BracketBox className="hero-audience-frame">
        <div className="audience-img-container">
          <motion.img
            src="/assets/starmedia_bw/crowd_bw.png"
            alt="Highrolers Audience - Create Without Limits"
            className="audience-img"  
            style={reduceMotion ? undefined : { y: imageY, scale: 1.14 }}
          />
          <div className="audience-scanline-effect" />
          <motion.div
            className="audience-overlay-badge"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT_EXPO }}
          >
            <span className="badge-text">HIGH-CONVERSION CONSUMER TARGETING // 360° IMMERSION</span>
          </motion.div>
        </div>
      </BracketBox>
    </motion.div>
  );
}
