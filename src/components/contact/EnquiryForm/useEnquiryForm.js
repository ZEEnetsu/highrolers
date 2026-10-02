import { useMemo, useState } from 'react';
import { isValidEmail, isValidPhone, subSegmentsFor, validateEnquiry } from '../../../data/enquiry.js';

// How long the "TRANSMITTING…" animation plays before the confirmation appears
const SIMULATED_SEND_MS = 1400;

const EMPTY = { name: '', purpose: '', segment: '', subSegment: '', phone: '', email: '', message: '' };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// HR-YYMMDD-XXXX, generated in the browser
function makeReference() {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(2)), (b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
  return `HR-${date}-${suffix}`;
}

/**
 * Front-end only: the enquiry is not sent anywhere — this simulates a successful send.
 * To receive real enquiries later, replace this function with a call to a form service
 * or API that resolves to { reference }.
 */
async function simulateSend() {
  await wait(SIMULATED_SEND_MS);
  return { reference: makeReference() };
}

/**
 * Form state for the enquiry form. Errors show once a field is touched or a
 * submit was tried; rules live in src/data/enquiry.js.
 */
export function useEnquiryForm(prefill = {}) {
  const [values, setValues] = useState(() => ({ ...EMPTY, ...prefill }));
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [result, setResult] = useState(null);

  const { errors } = useMemo(() => validateEnquiry(values), [values]);

  const setField = (field, value) => {
    setValues((current) => {
      const next = { ...current, [field]: value };
      // A new segment invalidates a sub-segment from another segment
      if (field === 'segment' && !subSegmentsFor(value).some((s) => s.value === current.subSegment)) {
        next.subSegment = '';
      }
      return next;
    });
  };

  const touch = (...fields) => setTouched((t) => ({ ...t, ...Object.fromEntries(fields.map((f) => [f, true])) }));

  const errorFor = (field) => (attempted || touched[field] ? errors[field] : undefined);

  const contactError = attempted || (touched.phone && touched.email) ? errors.contact : undefined;

  const contactReady =
    (isValidPhone(values.phone) || isValidEmail(values.email)) && !errors.phone && !errors.email;

  // Required answers: name, purpose, segment, sub-segment, a way to reach you
  const requiredDone = [
    !errors.name,
    !errors.purpose,
    !errors.segment,
    !errors.segment && !errors.subSegment,
    contactReady,
  ].filter(Boolean).length;

  const hasErrorIn = (fields) => fields.some((f) => errors[f]);

  const submit = async () => {
    setAttempted(true);
    const check = validateEnquiry(values);
    if (!check.ok) return { ok: false, errors: check.errors };

    setStatus('sending');
    const { reference } = await simulateSend(check.data);
    setResult({ reference, values: check.data });
    setStatus('success');
    return { ok: true, reference };
  };

  const reset = () => {
    setValues({ ...EMPTY });
    setTouched({});
    setAttempted(false);
    setStatus('idle');
    setResult(null);
  };

  return {
    values,
    setField,
    touch,
    errorFor,
    contactError,
    contactReady,
    requiredDone,
    requiredTotal: 5,
    hasErrorIn,
    status,
    result,
    submit,
    reset,
  };
}
