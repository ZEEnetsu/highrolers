import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import './PixelParticleField.css';

/**
 * Tunables. Override any of them per instance via props,
 * e.g. <PixelParticleField density={1 / 14000} radius={110} />
 */
export const PARTICLE_DEFAULTS = {
  density: 1 / 4800,         // particles per px² of the host element
  maxParticles: 480,
  sizeRange: [2, 7],         // whole CSS pixels, weighted toward small
  alphaRange: [0.18, 0.7],
  radius: 140,               // cursor influence radius (px)
  repelForce: 2.4,           // push strength at the cursor's center
  spring: 0.012,             // pull back toward each pixel's home
  damping: 0.86,             // velocity kept per frame (60 fps baseline)
  drift: 10,                 // idle wander amplitude (px)
  shockwave: 16,             // click impulse
  glowSize: 2,               // extra px a pixel grows when the cursor is near
};

const FRAME_MS = 1000 / 60;

// "0 0 0" (theme channel token) -> "0, 0, 0" for rgba()
function readInkRgb() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--ink-rgb').trim();
  return raw ? raw.split(/\s+/).join(', ') : '0, 0, 0';
}

const rand = (min, max) => min + Math.random() * (max - min);

/**
 * Interactive field of square pixels that drift in place, scatter away from
 * the pointer and spring back home. Fills its nearest positioned parent.
 */
export default function PixelParticleField({ className = '', ...overrides }) {
  const canvasRef = useRef(null);
  const colorRef = useRef('0, 0, 0');
  const redrawRef = useRef(() => {});
  const configRef = useRef(PARTICLE_DEFAULTS);
  configRef.current = { ...PARTICLE_DEFAULTS, ...overrides };

  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();

  // Recolor when the theme flips (static frames need an explicit redraw)
  useEffect(() => {
    colorRef.current = readInkRgb();
    redrawRef.current();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const cfg = configRef.current;

    let width = 0;
    let height = 0;
    let particles = [];
    let frameId = null;
    let lastTime = 0;
    let elapsed = 0;
    let inView = true;
    const pointer = { clientX: -9999, clientY: -9999, active: false };

    const seed = () => {
      const count = Math.min(cfg.maxParticles, Math.round(width * height * cfg.density));
      const [minSize, maxSize] = cfg.sizeRange;
      particles = Array.from({ length: count }, () => {
        const hx = Math.random() * width;
        const hy = Math.random() * height;
        return {
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          size: Math.round(minSize + Math.pow(Math.random(), 2.2) * (maxSize - minSize)),
          alpha: rand(cfg.alphaRange[0], cfg.alphaRange[1]),
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.15, 0.5),
          glow: 0,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const rgb = colorRef.current;
      for (const p of particles) {
        const size = p.size + Math.round(p.glow * cfg.glowSize);
        const alpha = Math.min(1, p.alpha + p.glow * 0.45);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fillRect(Math.round(p.x - size / 2), Math.round(p.y - size / 2), size, size);
      }
    };
    redrawRef.current = draw;

    const step = (dt) => {
      elapsed += dt * FRAME_MS / 1000;
      const rect = canvas.getBoundingClientRect();
      const px = pointer.clientX - rect.left;
      const py = pointer.clientY - rect.top;
      const r = cfg.radius;
      const damping = Math.pow(cfg.damping, dt);

      for (const p of particles) {
        const homeX = p.hx + Math.sin(elapsed * p.speed + p.phase) * cfg.drift;
        const homeY = p.hy + Math.cos(elapsed * p.speed * 0.8 + p.phase) * cfg.drift;
        p.vx += (homeX - p.x) * cfg.spring * dt;
        p.vy += (homeY - p.y) * cfg.spring * dt;

        let glowTarget = 0;
        if (pointer.active) {
          const dx = p.x - px;
          const dy = p.y - py;
          const dist = Math.hypot(dx, dy);
          if (dist < r && dist > 0.1) {
            const falloff = 1 - dist / r;
            const force = falloff * falloff * cfg.repelForce * dt;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            glowTarget = falloff;
          }
        }

        p.glow += (glowTarget - p.glow) * Math.min(1, 0.15 * dt);
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
    };

    const loop = (time) => {
      const dt = lastTime ? Math.min((time - lastTime) / FRAME_MS, 3) : 1;
      lastTime = time;
      step(dt);
      draw();
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || frameId !== null || !inView || document.hidden) return;
      lastTime = 0;
      frameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const onPointerMove = (e) => {
      pointer.clientX = e.clientX;
      pointer.clientY = e.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onPointerDown = (e) => {
      if (reduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px < 0 || py < 0 || px > width || py > height) return;

      const reach = cfg.radius * 2.2;
      for (const p of particles) {
        const dx = p.x - px;
        const dy = p.y - py;
        const dist = Math.hypot(dx, dy);
        if (dist < reach && dist > 0.1) {
          const impulse = (1 - dist / reach) * cfg.shockwave;
          p.vx += (dx / dist) * impulse;
          p.vy += (dy / dist) * impulse;
        }
      }
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      inView ? start() : stop();
    });
    intersectionObserver.observe(canvas);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      redrawRef.current = () => {};
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className={`pixel-particle-field ${className}`.trim()} aria-hidden="true" />;
}
