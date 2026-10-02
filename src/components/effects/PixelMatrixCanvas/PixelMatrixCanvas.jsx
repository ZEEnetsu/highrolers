import { useEffect, useRef } from 'react';
import './PixelMatrixCanvas.css';

const CANVAS_HEIGHT = 120;
const PIXEL_SIZE = 8;
const FALLBACK_WIDTH = 1400;

// Animated dithered wave of black pixels; pauses while off-screen
export default function PixelMatrixCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let tick = 0;
    let frameId = null;

    const resize = () => {
      width = canvas.width = canvas.parentElement.clientWidth || FALLBACK_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    };

    const draw = () => {
      const cols = Math.ceil(width / PIXEL_SIZE);
      const rows = Math.ceil(CANVAS_HEIGHT / PIXEL_SIZE);

      ctx.clearRect(0, 0, width, CANVAS_HEIGHT);
      tick += 0.03;

      for (let r = 0; r < rows; r++) {
        const threshold = (r / rows) * 1.8 - 0.4;
        for (let c = 0; c < cols; c++) {
          const n = Math.sin(c * 0.15 + tick) * Math.cos(r * 0.3 - tick * 0.5) + Math.sin((c + r) * 0.08);
          if (n > threshold) {
            const alpha = Math.min(1, Math.max(0.1, (n - threshold) * 1.2));
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.85})`;
            ctx.fillRect(c * PIXEL_SIZE, r * PIXEL_SIZE, PIXEL_SIZE - 1.5, PIXEL_SIZE - 1.5);
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frameId === null) frameId = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    observer.observe(canvas);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-matrix-canvas" width={FALLBACK_WIDTH} height={CANVAS_HEIGHT} />;
}
