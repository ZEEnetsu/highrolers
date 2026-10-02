import { MotionConfig } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import AmbientBackground from './components/effects/AmbientBackground/AmbientBackground.jsx';
import CustomCursor from './components/effects/CustomCursor/CustomCursor.jsx';
import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import Hero from './components/sections/Hero/Hero.jsx';
import Methodology from './components/sections/Methodology/Methodology.jsx';
import Services from './components/sections/Services/Services.jsx';
import StudioShowcase from './components/sections/StudioShowcase/StudioShowcase.jsx';
import PixelDivider from './components/sections/PixelDivider/PixelDivider.jsx';

export default function App() {
  return (
    // "user" skips transform animations when the OS asks for reduced motion
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <AmbientBackground />
          <CustomCursor />

          <Header />
          <main>
            <Hero />
            <Methodology />
            <Services />
            <StudioShowcase />
            <PixelDivider />
          </main>
          <Footer />
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
