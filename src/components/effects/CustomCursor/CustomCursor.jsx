import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const RETICLE_EASE = 0.28;
const BURST_PARTICLES = 6;
const BURST_LIFETIME_MS = 360;

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  '[role="button"]',
  '.clickable',
  '.bracket-box',
  '.nav-pill-btn',
  '.service-row-header',
  '.service-arrow-wrap',
  '.pill-tag',
  '.brand-logo-group',
  '.hero-hashtag',
  '.hero-audience-frame',
  '.pixel-smiley-container',
  '.social-link',
  '[data-interactive]',
].join(', ');

// Surfaces that are dark in every theme
const DARK_SURFACE_SELECTOR = [
  '.main-footer',
  '.audience-overlay-badge',
  '.hero-audience-frame',
].join(', ');

// Surfaces drawn in the inverse of the page color (dark in light theme, light in dark theme)
const INVERSE_SURFACE_SELECTOR = [
  '.hero-hashtag',
  '.process-card.light-card',
  '.service-row-item.active .service-arrow-wrap',
  '.pill-tag:hover',
  '.pill-tag.selected',
  '.theme-toggle-knob',
  '.inverse-surface',
  '.capability-flow-chip.is-lit',
  '.capability-pager-card:hover',
  '.capability-related-link:hover',
  '.service-explore-link',
  '.capability-tab.active',
  '.capability-cta-btn.is-primary',
  '.contact-channel:hover',
  '.contact-channel-icon-btn:hover',
  '.contact-live',
  '.enquiry-send',
  '.enquiry-step-btn.is-primary',
  '.enquiry-reach-badge.is-ready',
  '.enquiry-error',
  '.pixel-select-option.is-selected',
  '.legal-toc-link.is-active',
].join(', ');

/**
 * Retro 8-bit arrow (1:1 tracking) + trailing bracket reticle + click pixel burst.
 * Runs imperatively through refs: re-rendering React on every mousemove would be wasteful.
 */
export default function CustomCursor() {
  const systemRef = useRef(null);
  const cursorRef = useRef(null);
  const reticleRef = useRef(null);
  const burstRef = useRef(null);

  useEffect(() => {
    const system = systemRef.current;
    const cursor = cursorRef.current;
    const reticle = reticleRef.current;
    const burstLayer = burstRef.current;

    let mouseX = -100;
    let mouseY = -100;
    let reticleX = -100;
    let reticleY = -100;
    let isVisible = false;
    let frameId;

    const setVisible = (visible) => {
      isVisible = visible;
      system.classList.toggle('visible', visible);
      cursor.classList.toggle('visible', visible);
    };

    const moveArrow = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        setVisible(true);
        reticleX = mouseX;
        reticleY = mouseY;
      }
      moveArrow();
    };

    const renderReticle = () => {
      if (isVisible) {
        reticleX += (mouseX - reticleX) * RETICLE_EASE;
        reticleY += (mouseY - reticleY) * RETICLE_EASE;
        reticle.style.transform = `translate3d(${reticleX}px, ${reticleY}px, 0)`;
      }
      frameId = requestAnimationFrame(renderReticle);
    };

    const spawnBurst = (x, y) => {
      const angleStep = (Math.PI * 2) / BURST_PARTICLES;
      for (let i = 0; i < BURST_PARTICLES; i++) {
        const particle = document.createElement('div');
        particle.className = 'pixel-burst-particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = i * angleStep + (Math.random() * 0.4 - 0.2);
        const distance = 16 + Math.random() * 16;
        particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);

        burstLayer.appendChild(particle);
        setTimeout(() => particle.remove(), BURST_LIFETIME_MS);
      }
    };

    const onMouseDown = (e) => {
      system.classList.add('active');
      spawnBurst(e.clientX, e.clientY);
    };

    const onMouseUp = () => system.classList.remove('active');

    const onMouseLeave = () => setVisible(false);

    const onMouseEnter = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      moveArrow();
    };

    const onMouseOver = (e) => {
      system.classList.toggle('hovering', Boolean(e.target.closest(INTERACTIVE_SELECTOR)));
      system.classList.toggle('on-dark', Boolean(e.target.closest(DARK_SURFACE_SELECTOR)));
      system.classList.toggle('on-inverse', Boolean(e.target.closest(INVERSE_SURFACE_SELECTOR)));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    frameId = requestAnimationFrame(renderReticle);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div className="custom-pixel-cursor-system" ref={systemRef} aria-hidden="true">
      <div className="cursor-companion-reticle" ref={reticleRef}>
        <span className="reticle-corner r-tl" />
        <span className="reticle-corner r-tr" />
        <span className="reticle-corner r-bl" />
        <span className="reticle-corner r-br" />
      </div>
      <div className="custom-pixel-cursor" ref={cursorRef}>
        <img
          src="/assets/starmedia_bw/custom_pixel_cursor.svg"
          alt=""
          className="pixel-cursor-img"
          width="23"
          height="40"
        />
      </div>
      <div className="cursor-shockwave-container" ref={burstRef} />
    </div>
  );
}
