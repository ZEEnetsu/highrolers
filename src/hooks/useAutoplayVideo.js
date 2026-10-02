import { useEffect } from 'react';

const INTERACTION_EVENTS = ['click', 'touchstart', 'scroll', 'keydown'];
const LOOP_GAP_SECONDS = 0.08;

/**
 * Keeps a muted background video playing smoothly:
 * - retries playback on first user interaction if autoplay is blocked
 * - restarts just before the end to avoid the loop freeze
 * - pauses decoding while the video is off-screen
 */
export function useAutoplayVideo(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not reflect `muted` as an attribute, which some browsers require for autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startOnInteraction = () => {
      video.play().catch(() => {});
      INTERACTION_EVENTS.forEach((ev) => window.removeEventListener(ev, startOnInteraction));
    };

    const play = () => {
      video.muted = true;
      video.play()?.catch(() => {
        INTERACTION_EVENTS.forEach((ev) =>
          window.addEventListener(ev, startOnInteraction, { once: true, passive: true })
        );
      });
    };

    const onTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - LOOP_GAP_SECONDS) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    play();
    video.addEventListener('timeupdate', onTimeUpdate);

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : video.pause()),
        { threshold: 0.1 }
      );
      observer.observe(video);
    }

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      INTERACTION_EVENTS.forEach((ev) => window.removeEventListener(ev, startOnInteraction));
      observer?.disconnect();
    };
  }, [videoRef]);
}
