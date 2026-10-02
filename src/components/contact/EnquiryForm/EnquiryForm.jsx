import { useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'motion/react';
import { Link } from 'react-router';
import { EASE_OUT_EXPO } from '../../../animations/variants.js';
import { LIMITS, PURPOSES, SEGMENTS, subSegmentsFor } from '../../../data/enquiry.js';
import { useToast } from '../../../context/ToastContext.jsx';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import PixelSelect from '../../ui/PixelSelect/PixelSelect.jsx';
import { ContactLegal } from '../ContactIntro/ContactIntro.jsx';
import EnquirySuccess from '../EnquirySuccess/EnquirySuccess.jsx';
import FormField from './FormField.jsx';
import { useEnquiryForm } from './useEnquiryForm.js';
import './EnquiryForm.css';

// Phone layout: three short steps, each validated before moving on
const STEPS = [
  { id: 'who', title: 'WHO ARE YOU?', fields: ['name', 'purpose'], checks: ['name', 'purpose'] },
  { id: 'what', title: 'WHAT DO YOU NEED?', fields: ['segment', 'subSegment'], checks: ['segment', 'subSegment'] },
  { id: 'reach', title: 'HOW DO WE REACH YOU?', fields: ['reach', 'message'], checks: [] },
];

const FIELD_STEP = { name: 0, purpose: 0, segment: 1, subSegment: 1, phone: 2, email: 2, contact: 2, message: 2 };

const SHAKE = { x: [0, -10, 10, -6, 6, -2, 0] };

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
  exit: (dir) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.18 } }),
};

/**
 * Enquiry form. `stepped` switches to the 3-step phone layout; state is kept
 * when the layout switches. `prefill` can preset segment/sub-segment.
 */
export default function EnquiryForm({ stepped = false, prefill }) {
  const form = useEnquiryForm(prefill);
  const showToast = useToast();
  const [scope, animate] = useAnimate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const { values, setField, touch, errorFor, status } = form;
  const sending = status === 'sending';
  const subOptions = subSegmentsFor(values.segment);

  const shake = () => animate(scope.current, SHAKE, { duration: 0.45 });

  const goTo = (target) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const next = () => {
    const { checks } = STEPS[step];
    touch(...checks);
    if (form.hasErrorIn(checks)) {
      shake();
      return;
    }
    goTo(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stepped && step < STEPS.length - 1) {
      next();
      return;
    }

    const outcome = await form.submit();
    if (outcome.ok) {
      showToast(`ENQUIRY SENT // REF ${outcome.reference}`);
      return;
    }

    // Validation failed: shake, and on phones jump back to the first step with a problem
    shake();
    if (stepped) {
      const firstStep = Math.min(...Object.keys(outcome.errors).map((f) => FIELD_STEP[f] ?? 2));
      if (firstStep !== step) goTo(firstStep);
    }
  };

  const handleReset = () => {
    form.reset();
    setStep(0);
    setDirection(-1);
  };

  // --- Individual fields (shared by both layouts) ---------------------------
  const contactBadge = (
    <span className={`enquiry-reach-badge${form.contactReady ? ' is-ready' : ''}`}>
      {form.contactReady ? '✓ READY' : 'AT LEAST ONE'}
    </span>
  );

  const reachError = form.contactError || errorFor('phone') || errorFor('email');

  const fields = {
    name: (
      <FormField key="name" index="01" label="FULL NAME" htmlFor="enq-name" required error={errorFor('name')} errorId="enq-name-error">
        <input
          id="enq-name"
          className="enquiry-input"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          maxLength={LIMITS.nameMax}
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          onBlur={() => touch('name')}
          aria-invalid={Boolean(errorFor('name')) || undefined}
          aria-describedby={errorFor('name') ? 'enq-name-error' : undefined}
          aria-required="true"
        />
      </FormField>
    ),
    purpose: (
      <FormField key="purpose" index="02" label="PURPOSE" labelId="enq-purpose-label" required error={errorFor('purpose')} errorId="enq-purpose-error">
        <PixelSelect
          id="enq-purpose"
          labelId="enq-purpose-label"
          placeholder="BUSINESS OR PERSONAL"
          options={PURPOSES}
          value={values.purpose}
          onChange={(v) => setField('purpose', v)}
          onBlur={() => touch('purpose')}
          invalid={Boolean(errorFor('purpose'))}
          describedBy={errorFor('purpose') ? 'enq-purpose-error' : undefined}
        />
      </FormField>
    ),
    segment: (
      <FormField key="segment" index="03" label="SEGMENT" labelId="enq-segment-label" required error={errorFor('segment')} errorId="enq-segment-error">
        <PixelSelect
          id="enq-segment"
          labelId="enq-segment-label"
          placeholder="CHOOSE AN AREA"
          options={SEGMENTS}
          value={values.segment}
          onChange={(v) => setField('segment', v)}
          onBlur={() => touch('segment')}
          invalid={Boolean(errorFor('segment'))}
          describedBy={errorFor('segment') ? 'enq-segment-error' : undefined}
        />
      </FormField>
    ),
    subSegment: (
      <FormField
        key="subSegment"
        index="04"
        label="SERVICE"
        labelId="enq-sub-label"
        required
        error={values.segment ? errorFor('subSegment') : undefined}
        errorId="enq-sub-error"
      >
        <PixelSelect
          key={values.segment || 'none'} /* re-mount so options animate in per segment */
          id="enq-sub"
          labelId="enq-sub-label"
          placeholder={values.segment ? 'CHOOSE A SERVICE' : 'PICK A SEGMENT FIRST'}
          options={subOptions}
          value={values.subSegment}
          onChange={(v) => setField('subSegment', v)}
          onBlur={() => touch('subSegment')}
          disabled={!values.segment}
          invalid={Boolean(values.segment && errorFor('subSegment'))}
          describedBy={values.segment && errorFor('subSegment') ? 'enq-sub-error' : undefined}
        />
      </FormField>
    ),
    reach: (
      <FormField
        key="reach"
        index="05"
        label="HOW SHOULD WE REACH YOU?"
        required
        aside={contactBadge}
        error={reachError}
        errorId="enq-reach-error"
        className="enquiry-field-reach"
      >
        <div className="enquiry-reach-grid">
          <div className="enquiry-reach-cell">
            <label htmlFor="enq-phone" className="enquiry-sublabel">PHONE NUMBER</label>
            <input
              id="enq-phone"
              className="enquiry-input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={values.phone}
              onChange={(e) => setField('phone', e.target.value)}
              onBlur={() => touch('phone')}
              aria-invalid={Boolean(errorFor('phone') || form.contactError) || undefined}
              aria-describedby={reachError ? 'enq-reach-error' : undefined}
            />
          </div>
          <span className="enquiry-reach-or" aria-hidden="true">OR</span>
          <div className="enquiry-reach-cell">
            <label htmlFor="enq-email" className="enquiry-sublabel">EMAIL ADDRESS</label>
            <input
              id="enq-email"
              className="enquiry-input"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => touch('email')}
              aria-invalid={Boolean(errorFor('email') || form.contactError) || undefined}
              aria-describedby={reachError ? 'enq-reach-error' : undefined}
            />
          </div>
        </div>
      </FormField>
    ),
    message: (
      <FormField
        key="message"
        index="06"
        label="ANYTHING ELSE ON YOUR MIND? LET US KNOW"
        htmlFor="enq-message"
        optional
        error={errorFor('message')}
        errorId="enq-message-error"
        className="enquiry-field-message"
      >
        <div className="enquiry-textarea-wrap">
          <textarea
            id="enq-message"
            className="enquiry-input enquiry-textarea"
            placeholder="Goals, timelines, links, budget range — anything that helps us prepare."
            maxLength={LIMITS.messageMax}
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            onBlur={() => touch('message')}
            aria-describedby={errorFor('message') ? 'enq-message-error' : 'enq-message-count'}
          />
          <span id="enq-message-count" className="enquiry-counter">
            {values.message.length}/{LIMITS.messageMax}
          </span>
        </div>
      </FormField>
    ),
  };

  // --- Pieces ------------------------------------------------------------------
  const sendButton = (
    <button type="submit" className={`enquiry-send${sending ? ' is-sending' : ''}`} disabled={sending}>
      <span className="enquiry-send-fill" aria-hidden="true" />
      <span className="enquiry-send-label">
        {sending ? 'TRANSMITTING…' : 'SEND ENQUIRY'} <span aria-hidden="true">→</span>
      </span>
    </button>
  );

  const consent = (
    <p className="enquiry-consent">
      By sending, you agree to our <Link to="/privacy-policy">Privacy Policy</Link>.
    </p>
  );

  const meter = (
    <div className="enquiry-meter" role="img" aria-label={`${form.requiredDone} of ${form.requiredTotal} required answers complete`}>
      <span className="enquiry-meter-label">
        {form.requiredDone}/{form.requiredTotal} READY
      </span>
      <span className="enquiry-meter-blocks">
        {Array.from({ length: form.requiredTotal }, (_, i) => (
          <span key={i} className={`enquiry-meter-block${i < form.requiredDone ? ' is-on' : ''}`} />
        ))}
      </span>
    </div>
  );

  const stepper = (
    <div className="enquiry-stepper" aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].title}`}>
      <span className="enquiry-stepper-label">
        STEP {step + 1}/{STEPS.length} — {STEPS[step].title}
      </span>
      <span className="enquiry-stepper-bar">
        {STEPS.map((s, i) => (
          <span key={s.id} className={`enquiry-stepper-seg${i <= step ? ' is-on' : ''}`} />
        ))}
      </span>
    </div>
  );

  return (
    <motion.div
      className="enquiry-frame-motion"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT_EXPO }}
    >
      <div ref={scope}>
        <BracketBox className={`enquiry-frame${stepped ? ' is-stepped' : ''}`}>
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' && form.result ? (
              <EnquirySuccess key="success" result={form.result} onReset={handleReset} />
            ) : (
              <motion.form
                key="form"
                className="enquiry-form"
                noValidate
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
              >
                <div className="enquiry-head">
                  <div>
                    <span className="section-tag enquiry-tag">[ ENQUIRY TERMINAL ]</span>
                    <h2 className="enquiry-title">TELL US WHAT YOU NEED</h2>
                  </div>
                  {stepped ? null : meter}
                </div>

                {stepped ? (
                  <>
                    {stepper}
                    <div className="enquiry-step-viewport">
                      <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                          key={STEPS[step].id}
                          className="enquiry-step"
                          custom={direction}
                          variants={slide}
                          initial="enter"
                          animate="center"
                          exit="exit"
                        >
                          {STEPS[step].fields.map((f) => fields[f])}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="enquiry-step-nav">
                      {step > 0 ? (
                        <button type="button" className="enquiry-step-btn" onClick={() => goTo(step - 1)}>
                          ← BACK
                        </button>
                      ) : (
                        <span />
                      )}
                      {step < STEPS.length - 1 ? (
                        <button type="button" className="enquiry-step-btn is-primary" onClick={next}>
                          NEXT →
                        </button>
                      ) : (
                        sendButton
                      )}
                    </div>
                    {step === STEPS.length - 1 && consent}
                    {/* Footer is hidden on this page; on phones the legal links ride along with step 1 */}
                    {step === 0 && <ContactLegal />}
                  </>
                ) : (
                  <>
                    <div className="enquiry-grid">
                      {fields.name}
                      {fields.purpose}
                      {fields.segment}
                      {fields.subSegment}
                      {fields.reach}
                      {fields.message}
                    </div>
                    <div className="enquiry-foot">
                      {consent}
                      {sendButton}
                    </div>
                  </>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </BracketBox>
      </div>
    </motion.div>
  );
}
