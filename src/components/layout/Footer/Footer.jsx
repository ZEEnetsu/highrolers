import { Fragment } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO, fadeIn, fadeUp, revealOnScroll, scaleIn, stagger } from '../../../animations/variants.js';
import { COPYRIGHT, LEGAL_LINKS, OFFICE } from '../../../data/site.js';
import FooterSeal from './FooterSeal.jsx';
import './Footer.css';

const logoReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

export default function Footer() {
  return (
    <footer className="main-footer" id="footer">
      <div className="container">
        <motion.div className="footer-info-grid" variants={stagger(0.15)} {...revealOnScroll(0.3)}>
          <motion.div className="footer-col footer-col-address" variants={fadeUp}>
            <h4 className="footer-col-title">ADDRESS</h4>
            <div className="office-locations-list">
              <div className="office-item">
                <span className="city-name">{OFFICE.city}</span>
                <span className="office-addr">{OFFICE.address}</span>
                <span className="office-addr office-pin">PIN: {OFFICE.pin}</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="footer-col text-center-mobile" variants={scaleIn}>
            <FooterSeal />
          </motion.div>
        </motion.div>

        <div className="footer-giant-brand-wrap">
          <motion.img
            src="/assets/starmedia_bw/highrolers_horizontal_white.png"
            alt="HIGHROLERS®"
            className="footer-official-logo-img"
            variants={logoReveal}
            {...revealOnScroll(0.4)}
          />
        </div>

        <motion.div className="footer-bottom-bar flex-between" variants={fadeIn} {...revealOnScroll(0.5)}>
          <div className="copyright-text">{COPYRIGHT}</div>
          <div className="global-seal-icon">
            <span>🌐</span>
          </div>
          <div className="legal-links">
            {LEGAL_LINKS.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 && <span className="sep">•</span>}
                <a href={link.href} className="legal-anchor">{link.label}</a>
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
