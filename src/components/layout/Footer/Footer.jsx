import { Fragment } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { EASE_OUT_EXPO, fadeIn, fadeUp, revealOnScroll, scaleIn, stagger } from '../../../animations/variants.js';
import { COPYRIGHT, LEGAL_LINKS, MAPS_URL, OFFICE } from '../../../data/site.js';
import { EMAIL, PHONE_DISPLAY, PHONE_URL, WHATSAPP_URL } from '../../../data/contact.js';
import RotatingSeal from '../../ui/RotatingSeal/RotatingSeal.jsx';
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
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="office-item">
                <span className="city-name">{OFFICE.city}</span>
                <span className="office-addr">{OFFICE.address}</span>
                <span className="office-addr office-pin">PIN: {OFFICE.pin}</span>
              </a>
            </div>
          </motion.div>

          <motion.div className="footer-col footer-col-contact" variants={fadeUp}>
            <h4 className="footer-col-title">CONTACT</h4>
            <ul className="footer-contact-list">
              <li><a href={`mailto:${EMAIL}`} className="footer-contact-link">{EMAIL}</a></li>
              <li><a href={PHONE_URL} className="footer-contact-link">{PHONE_DISPLAY}</a></li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  WHATSAPP <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li><Link to="/contact" className="footer-contact-cta">SEND AN ENQUIRY →</Link></li>
            </ul>
          </motion.div>

          <motion.div className="footer-col text-center-mobile" variants={scaleIn}>
            <RotatingSeal pathId="footer-seal-path" />
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
                <Link to={link.to} className="legal-anchor">{link.label}</Link>
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
