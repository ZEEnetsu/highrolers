import { motion } from 'motion/react';
import { fadeUp, revealOnScroll, slideInLeft, slideInRight, stagger } from '../../../animations/variants.js';
import { PROCESS_CARDS } from '../../../data/methodology.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import PixelSmiley from './PixelSmiley.jsx';
import ProcessCard from './ProcessCard.jsx';
import './Methodology.css';

export default function Methodology() {
  return (
    <section className="methodology-section" id="methodology">
      <div className="container">
        <motion.div variants={fadeUp} {...revealOnScroll(0.08)}>
          <BracketBox className="methodology-main-frame">
            <div className="methodology-meta-row">
              <span className="section-tag">[ HOW WE DO THE WORK ]</span>
              <span className="section-tag hide-mobile">[ PROPRIETARY GROWTH ARCHITECTURE ]</span>
            </div>

            <div className="methodology-title-layout">
              <div className="title-col-top">
                <RevealText as="h2" className="editorial-headline" text="HOW WE MULTIPLY" delay={0.2} />
              </div>

              <motion.div className="title-col-split" variants={stagger(0.12, 0.2)} {...revealOnScroll(0.3)}>
                <motion.div className="split-side-left" variants={slideInLeft}>
                  <p className="methodology-desc">
                    WE COMBINE ENGINEERING, CREATIVE PRODUCTION, AND PERFORMANCE DATA FOR A SINGLE OBJECTIVE: SCALING YOUR BRAND REVENUE.
                  </p>
                  <div className="editorial-subheadline">OUR CLIENTS &amp;</div>
                </motion.div>

                <PixelSmiley />

                <motion.div className="split-side-right" variants={slideInRight}>
                  <div className="editorial-subheadline right-aligned">DIGITAL REVENUE FOR</div>
                  <p className="methodology-desc right-desc">
                    EXECUTED WITH SURGICAL PRECISION TO ACHIEVE EMOTIONAL RESONANCE, FRICTIONLESS CONVERSION, AND REAL BOTTOM-LINE IMPACT.
                  </p>
                  <div className="editorial-subheadline right-aligned">GROWTH PARTNERS</div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div className="process-cards-grid" variants={stagger(0.14)} {...revealOnScroll(0.15)}>
              {PROCESS_CARDS.map((card, index) => (
                <ProcessCard key={card.id} card={card} index={index} />
              ))}
            </motion.div>

            <div className="process-chevron-wrap text-center">
              <div className="pixel-chevron-arrow">
                <motion.span
                  animate={{ x: [0, 12, 0], opacity: [1, 0.45, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  »»»
                </motion.span>
              </div>
            </div>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
