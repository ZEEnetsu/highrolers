import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO, fadeUp, revealOnScroll, stagger } from '../../../animations/variants.js';
import { pad2 } from '../../../utils/format.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import '../capability.css';
import './CapabilityFlow.css';

const PULSE_MS = 1100;

const stepIn = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/**
 * Process / combination chain. Once visible, a highlight travels from step
 * to step like data moving through a pipeline. ("+" chains light up cumulatively.)
 */
export default function CapabilityFlow({ flow }) {
  const { title, text, steps, joiner } = flow;
  const isCombination = joiner === '+';
  const listRef = useRef(null);
  const inView = useInView(listRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [pulse, setPulse] = useState(-1);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const timer = setInterval(() => setPulse((p) => (p + 1) % (steps.length + 2)), PULSE_MS);
    return () => clearInterval(timer);
  }, [inView, reduceMotion, steps.length]);

  const isLit = (i) => (isCombination ? i <= pulse : i === pulse);

  return (
    <section className="capability-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealOnScroll(0.1)}>
          <BracketBox className="capability-frame capability-flow">
            <div className="capability-flow-head">
              <div>
                <span className="section-tag">[ {isCombination ? 'BUILDING BLOCKS' : 'THE PROCESS'} ]</span>
                <RevealText as="h2" className="capability-heading" text={title} />
              </div>
              {text && <p className="capability-body-text capability-flow-text">{text}</p>}
            </div>

            <motion.ol
              ref={listRef}
              className={`capability-flow-steps${isCombination ? ' is-combination' : ''}`}
              variants={stagger(isCombination ? 0.06 : 0.1, 0.2)}
              {...revealOnScroll(0.3)}
            >
              {steps.map((step, i) => (
                <motion.li key={step} className="capability-flow-step" variants={stepIn}>
                  <span className={`capability-flow-chip${isLit(i) ? ' is-lit' : ''}`}>
                    <span className="capability-flow-index">{pad2(i + 1)}</span>
                    <span className="capability-flow-label">{step}</span>
                  </span>
                  {i < steps.length - 1 && (
                    <span className={`capability-flow-joiner${isLit(i) ? ' is-lit' : ''}`} aria-hidden="true">
                      {joiner}
                    </span>
                  )}
                </motion.li>
              ))}
            </motion.ol>

            <div className="capability-flow-track" aria-hidden="true">
              <motion.span
                className="capability-flow-progress"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, delay: 0.4, ease: EASE_OUT_EXPO }}
              />
            </div>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
