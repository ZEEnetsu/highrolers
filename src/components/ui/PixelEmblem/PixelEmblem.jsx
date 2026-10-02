import { useMemo } from 'react';
import { motion } from 'motion/react';
import { revealOnScroll } from '../../../animations/variants.js';
import './PixelEmblem.css';

const GRID = 11;
const GAP = 0.14; // space between pixels, in grid units
const CENTER = (GRID - 1) / 2;
const MAX_DIST = Math.hypot(CENTER, CENTER);

// FNV-1a string hash -> 32-bit seed
function hashString(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Small deterministic PRNG so every slug always draws the same emblem
function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Mirrored (left/right) grid, denser toward the center, with a few dithered "ghost" pixels
function buildCells(seed) {
  const random = mulberry32(hashString(seed));
  const cells = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x <= CENTER; x++) {
      const dist = Math.hypot(x - CENTER, y - CENTER) / MAX_DIST;
      const isCore = x === CENTER && Math.abs(y - CENTER) <= 1;
      if (!isCore && random() > 0.78 - dist * 0.6) continue;

      const ghost = !isCore && random() < 0.16;
      const mirrorX = GRID - 1 - x;
      const columns = mirrorX === x ? [x] : [x, mirrorX];
      columns.forEach((cx) => cells.push({ key: `${cx}-${y}`, x: cx, y, dist, ghost }));
    }
  }
  return cells;
}

/**
 * Unique, symmetric pixel sigil generated from `seed` (e.g. a capability slug).
 * Pixels pop in from the center outward; ghost pixels twinkle.
 */
export default function PixelEmblem({ seed, className = '' }) {
  const cells = useMemo(() => buildCells(seed), [seed]);

  return (
    <motion.svg
      viewBox={`0 0 ${GRID} ${GRID}`}
      className={`pixel-emblem ${className}`.trim()}
      shapeRendering="crispEdges"
      aria-hidden="true"
      {...revealOnScroll(0.3)}
    >
      {cells.map((cell) => (
        <motion.rect
          key={cell.key}
          x={cell.x + GAP / 2}
          y={cell.y + GAP / 2}
          width={1 - GAP}
          height={1 - GAP}
          fill="currentColor"
          className={cell.ghost ? 'pixel-emblem-ghost' : undefined}
          style={cell.ghost ? { animationDelay: `${(cell.x * 7 + cell.y * 3) % 23 / 10}s` } : undefined}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { type: 'spring', stiffness: 320, damping: 18, delay: 0.15 + cell.dist * 0.7 },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
