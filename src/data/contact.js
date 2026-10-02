import { MAPS_URL, OFFICE } from './site.js';

/**
 * Contact details — the single place to change them.
 * Used by the contact page, footer and legal pages.
 */
export const EMAIL = 'highrolers.sg@gmail.com';
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

export const PHONE_DISPLAY = '+91 95087 04701';
export const PHONE_E164 = '+919508704701';
export const PHONE_URL = `tel:${PHONE_E164}`;

export const WHATSAPP_URL = `https://wa.me/${PHONE_E164.replace('+', '')}`;

export const ADDRESS_LINES = [`${OFFICE.address}`, `PIN ${OFFICE.pin}`];
export const ADDRESS_INLINE = `Patna Rural, Bihar, India — ${OFFICE.pin}`;
export const ADDRESS_SHORT = `Patna, Bihar — ${OFFICE.pin}`;
export { MAPS_URL };

// Studio clock on the contact page
export const TIMEZONE = 'Asia/Kolkata';
export const TIMEZONE_LABEL = 'IST';
