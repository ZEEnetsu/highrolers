import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TIMEZONE, TIMEZONE_LABEL } from '../../../data/contact.js';
import './StudioClock.css';

// Live studio time; each digit rolls over like a split-flap display
export default function StudioClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatters = useMemo(
    () => ({
      time: new Intl.DateTimeFormat('en-GB', { timeZone: TIMEZONE, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      day: new Intl.DateTimeFormat('en-GB', { timeZone: TIMEZONE, weekday: 'short', day: '2-digit', month: 'short' }),
    }),
    []
  );

  const time = formatters.time.format(now);

  return (
    <div className="studio-clock" aria-label={`Studio time ${time} ${TIMEZONE_LABEL}`}>
      <span className="studio-clock-label">PATNA STUDIO</span>
      <span className="studio-clock-time" aria-hidden="true">
        {[...time].map((char, i) => (
          <span key={i} className={`studio-clock-slot${char === ':' ? ' is-colon' : ''}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={char}
                className="studio-clock-char"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
        <span className="studio-clock-zone">{TIMEZONE_LABEL}</span>
      </span>
      <span className="studio-clock-day">{formatters.day.format(now).toUpperCase()}</span>
    </div>
  );
}
