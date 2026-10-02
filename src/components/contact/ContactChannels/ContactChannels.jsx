import { motion } from 'motion/react';
import { fadeUp, stagger } from '../../../animations/variants.js';
import {
  ADDRESS_SHORT,
  EMAIL,
  GMAIL_COMPOSE_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_URL,
  WHATSAPP_URL,
} from '../../../data/contact.js';
import { useToast } from '../../../context/ToastContext.jsx';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import PixelEmblem from '../../ui/PixelEmblem/PixelEmblem.jsx';
import { PIXEL_ICONS } from '../pixelIcons.js';
import './ContactChannels.css';

const CHANNELS = [
  { id: 'gmail', label: 'GMAIL', value: EMAIL, href: GMAIL_COMPOSE_URL, external: true, icon: PIXEL_ICONS.envelope, hint: 'WRITE TO US', copy: EMAIL },
  { id: 'phone', label: 'PHONE', value: PHONE_DISPLAY, href: PHONE_URL, icon: PIXEL_ICONS.phone, hint: 'CALL THE STUDIO', copy: PHONE_DISPLAY },
  { id: 'whatsapp', label: 'WHATSAPP', value: PHONE_DISPLAY, href: WHATSAPP_URL, external: true, icon: PIXEL_ICONS.chat, hint: 'CHAT INSTANTLY' },
  { id: 'address', label: 'ADDRESS', value: ADDRESS_SHORT, href: MAPS_URL, external: true, icon: PIXEL_ICONS.pin, hint: 'OPEN IN MAPS' },
];

// Two overlapping pixel squares
function CopyIcon() {
  return (
    <svg viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M2 0h5v5h-1v-4h-4z" fill="currentColor" />
      <path d="M0 2h5v5h-5z M1 3v3h3v-3z" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

// Let long values break at natural points (email before "@") instead of being cut off
const breakable = (value) => {
  const at = value.indexOf('@');
  return at > 0 ? (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  ) : (
    value
  );
};

const linkProps = (channel) =>
  channel.external ? { href: channel.href, target: '_blank', rel: 'noopener noreferrer' } : { href: channel.href };

/**
 * Direct contact channels. `compact` renders a row of icon buttons (phones);
 * otherwise 2×2 bracket tiles with copy buttons.
 */
export default function ContactChannels({ compact = false }) {
  const showToast = useToast();

  const copy = async (channel) => {
    try {
      await navigator.clipboard.writeText(channel.copy);
      showToast(`${channel.label} COPIED // ${channel.copy}`);
    } catch {
      showToast(`${channel.label} // ${channel.copy}`);
    }
  };

  if (compact) {
    return (
      <motion.ul className="contact-channel-icons" variants={stagger(0.06, 0.2)} initial="hidden" animate="visible">
        {CHANNELS.map((channel) => (
          <motion.li key={channel.id} variants={fadeUp}>
            <a {...linkProps(channel)} className="contact-channel-icon-btn" aria-label={`${channel.label}: ${channel.value}`}>
              <PixelEmblem pattern={channel.icon} />
              <span className="contact-channel-icon-label">{channel.label}</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  return (
    <motion.div className="contact-channels" variants={stagger(0.08, 0.35)} initial="hidden" animate="visible">
      {CHANNELS.map((channel) => (
        <motion.div key={channel.id} className="contact-channel-motion" variants={fadeUp}>
          <BracketBox className="contact-channel">
            <span className="contact-channel-icon">
              <PixelEmblem pattern={channel.icon} />
            </span>
            <span className="contact-channel-text">
              <span className="contact-channel-label">{channel.label}</span>
              {/* Stretched link: the whole tile is clickable */}
              <a {...linkProps(channel)} className="contact-channel-link">
                {breakable(channel.value)}
              </a>
              <span className="contact-channel-hint">
                {channel.hint} <span aria-hidden="true">{channel.external ? '↗' : '→'}</span>
              </span>
            </span>
            {channel.copy && (
              <button
                type="button"
                className="contact-channel-copy"
                onClick={() => copy(channel)}
                aria-label={`Copy ${channel.label.toLowerCase()}`}
                title="Copy"
              >
                <CopyIcon />
              </button>
            )}
          </BracketBox>
        </motion.div>
      ))}
    </motion.div>
  );
}
