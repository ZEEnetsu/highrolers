import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from '../../../animations/variants.js';
import { useScrolled } from '../../../hooks/useScrolled.js';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle.jsx';
import NavPillDock from './NavPillDock.jsx';
import './Header.css';

export default function Header() {
  const scrolled = useScrolled(40);

  return (
    <header className={`main-nav-header${scrolled ? ' scrolled' : ''}`} id="mainHeader">
      <motion.div
        className="container flex-between header-nav-container"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      >
        <a href="#hero" className="brand-logo-group flex items-center justify-center" aria-label="HIGHROLERS Home">
          <img src="/assets/starmedia_bw/highrolers_mark_black.png" alt="HIGHROLERS Mark" className="h-12 theme-graphic brand-mark" />
          <img src="/assets/starmedia_bw/highrollers_wordmark_transparent.png" alt="HIGHROLERS" className="h-13 theme-graphic brand-wordmark" />
        </a>

        <div className="header-actions">
          <NavPillDock />
          <ThemeToggle />
        </div>
      </motion.div>
    </header>
  );
}
