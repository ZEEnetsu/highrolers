import { scrollToY } from './smoothScroll.js';

const HEADER_GAP = 16;

// Smooth-scrolls to a section, leaving room for the sticky header
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 70;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - HEADER_GAP;
  scrollToY(top);
}
