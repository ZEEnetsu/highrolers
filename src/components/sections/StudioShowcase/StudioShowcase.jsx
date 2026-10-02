import { useRef } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from '../../../animations/variants.js';
import { useAutoplayVideo } from '../../../hooks/useAutoplayVideo.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import './StudioShowcase.css';

export default function StudioShowcase() {
  const videoRef = useRef(null);
  useAutoplayVideo(videoRef);

  return (
    <section className="studio-showcase-section">
      <div className="container">
        {/* Cinematic "letterbox opening" reveal */}
        <motion.div
          initial={{ clipPath: 'inset(14% 8% 14% 8% round 6px)', opacity: 0.4 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 6px)', opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        >
          <BracketBox className="studio-frame">
            <video
              ref={videoRef}
              className="studio-video"
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              poster="/assets/starmedia_bw/office_studio.png"
            >
              <source src="/assets/video/office.mp4" type="video/mp4" />
              <source src="/assets/starmedia_bw/office.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
