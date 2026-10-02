import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO, fadeUp, stagger } from '../../../animations/variants.js';
import { SEGMENTS, labelOf, subSegmentsFor } from '../../../data/enquiry.js';
import PixelEmblem from '../../ui/PixelEmblem/PixelEmblem.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import { PIXEL_ICONS } from '../pixelIcons.js';
import './EnquirySuccess.css';

// Confirmation shown in place of the form once the enquiry has been sent
export default function EnquirySuccess({ result, onReset }) {
  const { reference, values } = result;
  const headingRef = useRef(null);

  // Move focus to the confirmation so screen readers announce it
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const details = [
    { label: 'REFERENCE', value: reference },
    { label: 'SEGMENT', value: labelOf(SEGMENTS, values.segment) },
    { label: 'SERVICE', value: labelOf(subSegmentsFor(values.segment), values.subSegment) },
    { label: "WE'LL REPLY VIA", value: [values.email && 'EMAIL', values.phone && 'PHONE'].filter(Boolean).join(' / ') },
  ];

  return (
    <motion.div
      className="enquiry-success"
      role="status"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      <div className="enquiry-success-emblem">
        <PixelEmblem pattern={PIXEL_ICONS.check} />
      </div>

      <span className="section-tag enquiry-success-tag">[ TRANSMISSION RECEIVED ]</span>

      <div ref={headingRef} tabIndex={-1} className="enquiry-success-heading">
        <RevealText as="h2" className="enquiry-success-title" text={'THANK YOU FOR\nCONTACTING US.'} delay={0.2} amount={0.1} />
      </div>

      <motion.p
        className="enquiry-success-text"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT_EXPO }}
      >
        Our team will reach you as soon as possible.
      </motion.p>

      <motion.dl className="enquiry-success-details" variants={stagger(0.08, 0.75)} initial="hidden" animate="visible">
        {details.map((item) => (
          <motion.div key={item.label} className="enquiry-success-row" variants={fadeUp}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </motion.div>
        ))}
      </motion.dl>

      <motion.button
        type="button"
        className="enquiry-step-btn enquiry-success-reset"
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        SEND ANOTHER ENQUIRY
      </motion.button>
    </motion.div>
  );
}
