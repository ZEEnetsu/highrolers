import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Hero from '../components/sections/Hero/Hero.jsx';
import Methodology from '../components/sections/Methodology/Methodology.jsx';
import Services from '../components/sections/Services/Services.jsx';
import StudioShowcase from '../components/sections/StudioShowcase/StudioShowcase.jsx';
import PixelDivider from '../components/sections/PixelDivider/PixelDivider.jsx';
import { scrollToSection } from '../utils/scrollToSection.js';

const HASH_SCROLL_DELAY_MS = 80;

export default function HomePage() {
  const location = useLocation();

  // Arriving from another page via /#section: scroll there once the page has mounted
  useEffect(() => {
    if (!location.hash) return undefined;
    const id = decodeURIComponent(location.hash.slice(1));
    const timer = setTimeout(() => scrollToSection(id), HASH_SCROLL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [location.key, location.hash]);

  return (
    <>
      <Hero />
      <Methodology />
      <Services />
      <StudioShowcase />
      <PixelDivider />
    </>
  );
}
