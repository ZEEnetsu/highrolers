import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { scaleIn, SPRING_BOUNCY } from '../../../animations/variants.js';
import { useToast } from '../../../context/ToastContext.jsx';

const MAX_CHARGE = 4;
const RESET_DELAY_MS = 1200;

// Click to "charge": each click grows and spins the smiley; it resets after full charge
export default function PixelSmiley() {
  const showToast = useToast();
  const [charge, setCharge] = useState(0);
  const [hovered, setHovered] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCharge = () => {
    const next = (charge % MAX_CHARGE) + 1;
    clearTimeout(resetTimer.current);
    setCharge(next);
    showToast(`⚡ HIGHROLERS ENERGY LEVEL: ${next * 100}% // MAXIMUM PERFORMANCE`);
    if (next === MAX_CHARGE) {
      resetTimer.current = setTimeout(() => setCharge(0), RESET_DELAY_MS);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCharge();
    }
  };

  const scale = 1 + charge * 0.15;
  const rotate = charge * 25;

  return (
    <motion.div variants={scaleIn}>
      <motion.div
        className="pixel-smiley-container"
        role="button"
        tabIndex={0}
        aria-label="Charge the HIGHROLERS energy level"
        onClick={handleCharge}
        onKeyDown={handleKeyDown}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <div className="smiley-glow-bg" />
        <motion.img
          src="/assets/starmedia_bw/smiley_bw.png"
          alt="Pixel Icon"
          className="pixel-smiley-img"
          animate={{
            scale: hovered ? scale * 1.12 : scale,
            rotate: hovered ? rotate + 12 : rotate,
          }}
          transition={SPRING_BOUNCY}
        />
        <div className="smiley-interact-label">[ CLICK TO CHARGE ]</div>
      </motion.div>
    </motion.div>
  );
}
