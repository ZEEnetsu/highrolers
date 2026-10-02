import { AnimatePresence, MotionConfig } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import AmbientBackground from './components/effects/AmbientBackground/AmbientBackground.jsx';
import CustomCursor from './components/effects/CustomCursor/CustomCursor.jsx';
import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import SmoothScroll from './components/layout/SmoothScroll.jsx';
import HomePage from './pages/HomePage.jsx';
import CapabilityPage from './pages/CapabilityPage/CapabilityPage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import LegalPage from './pages/LegalPage/LegalPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import { scrollToY } from './utils/smoothScroll.js';

// Full-screen pages that bring their own legal links and skip the footer
const FOOTERLESS_PATHS = ['/contact'];

// Start each new page at the top, once the previous one has faded out
const resetScroll = () => scrollToY(0, { immediate: true });

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={resetScroll}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/capabilities/:slug" element={<PageTransition><CapabilityPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><LegalPage doc="privacy" /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><LegalPage doc="terms" /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const showFooter = !FOOTERLESS_PATHS.includes(pathname);

  return (
    // "user" skips transform animations when the OS asks for reduced motion
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <SmoothScroll />
          <AmbientBackground />
          <CustomCursor />
          <Header />
          <main>
            <AnimatedRoutes />
          </main>
          {showFooter && <Footer />}
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
