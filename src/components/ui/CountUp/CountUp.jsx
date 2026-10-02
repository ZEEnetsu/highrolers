import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO } from '../../../animations/variants.js';

// Counts from 0 to `value` the first time it scrolls into view
export default function CountUp({ value, pad = 2, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  return <span ref={ref}>{String(display).padStart(pad, '0')}</span>;
}
