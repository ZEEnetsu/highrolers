import { motion } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { SPRING_SNAPPY } from '../../../animations/variants.js';
import './ThemeToggle.css';

const MORPH = { type: 'spring', stiffness: 260, damping: 20 };
const MASK_ID = 'hr-theme-toggle-moon-mask';

// Eight short rays around the sun, as [x1, y1, x2, y2] in the 24×24 viewBox
const RAYS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4;
  const [inner, outer] = [8.2, 10.6];
  return [
    12 + Math.cos(angle) * inner,
    12 + Math.sin(angle) * inner,
    12 + Math.cos(angle) * outer,
    12 + Math.sin(angle) * outer,
  ];
});

// Twinkle into the empty side of the track in dark mode
const STARS = [
  { left: '16%', top: '28%', size: 3, delay: 0.1 },
  { left: '31%', top: '60%', size: 2, delay: 0.18 },
  { left: '44%', top: '30%', size: 2, delay: 0.26 },
];

// Sun's core grows and a masking circle slides over it to carve the moon
function SunMoonIcon({ isDark }) {
  return (
    <motion.svg
      className="theme-toggle-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      initial={false}
      animate={{ rotate: isDark ? -25 : 90 }}
      transition={MORPH}
    >
      <mask id={MASK_ID}>
        <rect width="24" height="24" fill="white" />
        <motion.circle
          r="8"
          fill="black"
          initial={false}
          animate={isDark ? { cx: 17, cy: 7 } : { cx: 30, cy: -6 }}
          transition={MORPH}
        />
      </mask>
      <motion.circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask={`url(#${MASK_ID})`}
        initial={false}
        animate={{ r: isDark ? 9 : 5 }}
        transition={MORPH}
      />
      <motion.g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={isDark ? { opacity: 0, scale: 0.3, rotate: -60 } : { opacity: 1, scale: 1, rotate: 0 }}
        transition={MORPH}
      >
        {RAYS.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </motion.g>
    </motion.svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleClick = (e) => {
    // The reveal grows out of the toggle itself
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={handleClick}
    >
      <span className="theme-toggle-stars" aria-hidden="true">
        {STARS.map((star) => (
          <motion.span
            key={star.left}
            className="theme-toggle-star"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
            initial={false}
            animate={isDark ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ ...MORPH, delay: isDark ? star.delay : 0 }}
          />
        ))}
      </span>

      <motion.span className="theme-toggle-knob" layout transition={SPRING_SNAPPY}>
        <SunMoonIcon isDark={isDark} />
      </motion.span>
    </button>
  );
}
