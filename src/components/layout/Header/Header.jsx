import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { EASE_OUT_EXPO } from '../../../animations/variants.js';
import { useScrolled } from '../../../hooks/useScrolled.js';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle.jsx';
import NavPillDock from './NavPillDock.jsx';
import './Header.css';

export default function Header() {
  const scrolled = useScrolled(40);
  const { pathname } = useLocation();

  // Already home: glide back to the top instead of re-navigating
  const handleBrandClick = (e) => {
    if (pathname !== '/') return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`main-nav-header${scrolled ? ' scrolled' : ''}`} id="mainHeader">
      <motion.div
        className="container flex-between header-nav-container"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      >
        <Link to="/" onClick={handleBrandClick} className="brand-logo-group flex items-center justify-center" aria-label="HIGHROLERS Home">
          <img src="/assets/starmedia_bw/highrolers_mark_black.png" alt="HIGHROLERS Mark" className="h-12 theme-graphic brand-mark" />
          <img src="/assets/starmedia_bw/highrollers_wordmark_transparent.png" alt="HIGHROLERS" className="h-13 theme-graphic brand-wordmark" />
        </Link>

        <div className="header-actions">
          <NavPillDock />
          <ThemeToggle />
        </div>
      </motion.div>
    </header>
  );
}
