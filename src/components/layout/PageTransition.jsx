import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from '../../animations/variants.js';

// Fade/slide between routes (driven by AnimatePresence in App.jsx)
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
