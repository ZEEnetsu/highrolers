import { SEAL_TEXT } from '../../../data/site.js';
import './RotatingSeal.css';

/**
 * Circular text badge, rotated by the CSS spinSlow keyframes.
 * Draws in currentColor; give each instance on a page its own `pathId`.
 */
export default function RotatingSeal({ text = SEAL_TEXT, pathId = 'seal-path', className = '' }) {
  return (
    <div className={`rotating-seal ${className}`.trim()}>
      <div className="seal-rotating">
        <svg viewBox="0 0 160 160" className="seal-svg" aria-hidden="true">
          <path id={pathId} d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="none" />
          <text fontSize="8.8" fontWeight="700" letterSpacing="2" fill="currentColor">
            <textPath href={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
        <div className="seal-inner-star">✦</div>
      </div>
    </div>
  );
}
