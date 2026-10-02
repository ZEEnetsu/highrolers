import { SEAL_TEXT } from '../../../data/site.js';

// Circular text badge, rotated by the CSS spinSlow keyframes
export default function FooterSeal() {
  return (
    <div className="footer-seal-wrap">
      <div className="seal-rotating">
        <svg viewBox="0 0 160 160" className="seal-svg" aria-hidden="true">
          <path id="footerSealPath" d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="none" />
          <text fontSize="8.8" fontWeight="700" letterSpacing="2" fill="#ffffff">
            <textPath href="#footerSealPath" startOffset="0%">
              {SEAL_TEXT}
            </textPath>
          </text>
        </svg>
        <div className="seal-inner-star">✦</div>
      </div>
    </div>
  );
}
