import { Fragment } from 'react';
import { motion } from 'motion/react';
import { revealOnScroll, stagger, wordReveal } from '../../../animations/variants.js';
import './RevealText.css';

/**
 * Headline whose words slide up out of a mask, one after another.
 * Use "\n" in `text` for a line break.
 */
export default function RevealText({ as = 'h2', text, className, delay = 0, staggerBy = 0.08, amount = 0.4 }) {
  const Tag = motion[as];
  const lines = text.split('\n');

  return (
    <Tag
      className={className}
      aria-label={text.replace(/\n/g, ' ')}
      variants={stagger(staggerBy, delay)}
      {...revealOnScroll(amount)}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {words.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <span className="word-mask" aria-hidden="true">
                  <motion.span className="word-inner" variants={wordReveal}>
                    {word}
                  </motion.span>
                </span>
                {wordIndex < words.length - 1 && ' '}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </Tag>
  );
}
