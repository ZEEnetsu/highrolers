import { useEffect } from 'react';
import 'lenis/dist/lenis.css';
import { startSmoothScroll } from '../../utils/smoothScroll.js';

// Mounts Lenis smooth scrolling for the whole page (options in src/utils/smoothScroll.js)
export default function SmoothScroll() {
  useEffect(() => startSmoothScroll(), []);
  return null;
}
