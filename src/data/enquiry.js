/**
 * Enquiry form options and validation rules (front-end only).
 */
import { CAPABILITIES, CAPABILITY_GROUPS } from './capabilities.js';

export const PURPOSES = [
  { value: 'business', label: 'BUSINESS' },
  { value: 'personal', label: 'PERSONAL' },
];

export const SEGMENTS = CAPABILITY_GROUPS.map((group) => ({ value: group.id, label: group.title }));

export const OTHER_SUB_SEGMENT = 'other';

// Capabilities in a group, plus a catch-all
export function subSegmentsFor(segment) {
  if (!segment) return [];
  return [
    ...CAPABILITIES.filter((c) => c.group === segment).map((c) => ({ value: c.slug, label: c.name })),
    { value: OTHER_SUB_SEGMENT, label: 'SOMETHING ELSE / NOT SURE YET' },
  ];
}

export const LIMITS = { nameMin: 2, nameMax: 80, messageMax: 2000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value) => EMAIL_RE.test(String(value ?? '').trim());

export function isValidPhone(value) {
  const raw = String(value ?? '').trim();
  if (!/^[+\d][\d\s\-().]*$/.test(raw)) return false;
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export const labelOf = (options, value) => options.find((o) => o.value === value)?.label ?? '';

/**
 * Returns { ok, errors, data } — errors is keyed by field name;
 * `contact` covers the "phone or email, at least one" rule.
 */
export function validateEnquiry(input = {}) {
  const data = {
    name: String(input.name ?? '').trim(),
    purpose: String(input.purpose ?? ''),
    segment: String(input.segment ?? ''),
    subSegment: String(input.subSegment ?? ''),
    phone: String(input.phone ?? '').trim(),
    email: String(input.email ?? '').trim(),
    message: String(input.message ?? '').trim(),
  };
  const errors = {};

  if (data.name.length < LIMITS.nameMin) errors.name = 'Please enter your full name.';
  else if (data.name.length > LIMITS.nameMax) errors.name = `Keep it under ${LIMITS.nameMax} characters.`;

  if (!PURPOSES.some((p) => p.value === data.purpose)) errors.purpose = 'Choose business or personal.';

  if (!SEGMENTS.some((s) => s.value === data.segment)) errors.segment = 'Choose the area you need help with.';
  else if (!subSegmentsFor(data.segment).some((s) => s.value === data.subSegment)) {
    errors.subSegment = 'Pick the service you are interested in.';
  }

  const hasPhone = data.phone.length > 0;
  const hasEmail = data.email.length > 0;
  if (hasPhone && !isValidPhone(data.phone)) errors.phone = 'That phone number looks incomplete.';
  if (hasEmail && !isValidEmail(data.email)) errors.email = 'That email address looks incomplete.';
  if (!hasPhone && !hasEmail) errors.contact = 'Add a phone number or an email — at least one.';

  if (data.message.length > LIMITS.messageMax) errors.message = `Keep it under ${LIMITS.messageMax} characters.`;

  return { ok: Object.keys(errors).length === 0, errors, data };
}
