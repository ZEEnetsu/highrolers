import { useState } from 'react';
import { motion } from 'motion/react';
import { fadeUp, revealOnScroll, stagger } from '../../../animations/variants.js';
import { DEFAULT_OPEN_SERVICE, SERVICES } from '../../../data/services.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import ServiceRow from './ServiceRow.jsx';
import './Services.css';

export default function Services() {
  const [openId, setOpenId] = useState(DEFAULT_OPEN_SERVICE);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section className="services-section" id="services">
      <div className="container">
        <motion.div variants={fadeUp} {...revealOnScroll(0.08)}>
          <BracketBox className="services-main-frame">
            <div className="services-header-row">
              <div className="services-title-left">
                <span className="section-tag">[ SERVICES WE DELIVER ]</span>
                <RevealText as="h2" className="editorial-headline-services" text={'CAPABILITIES THAT\nDRIVE'} delay={0.2} />
              </div>

              <motion.div
                className="services-pegasus-wrap"
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.3 }}
              >
                <motion.img
                  src="/assets/starmedia_bw/pegasus_bw.png"
                  alt="Highrolers Pegasus Emblem"
                  className="pegasus-img"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              <div className="services-title-right">
                <RevealText as="h2" className="editorial-headline-services right-text" text="MEASURABLE GROWTH" delay={0.35} />
                <motion.p className="services-subtitle-desc" variants={fadeUp} {...revealOnScroll(0.5)}>
                  COMBINING ENGINEERING, CREATIVE AGILITY, AND PERFORMANCE MEDIA TO SCALE YOUR ENTERPRISE REVENUE.
                </motion.p>
              </div>
            </div>

            <motion.div className="services-interactive-list" variants={stagger(0.08)} {...revealOnScroll(0.1)}>
              {SERVICES.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  isOpen={openId === service.id}
                  onToggle={() => toggle(service.id)}
                />
              ))}
            </motion.div>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
