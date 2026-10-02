import { AnimatePresence, MotionConfig } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import AmbientBackground from './components/effects/AmbientBackground/AmbientBackground.jsx';
import CustomCursor from './components/effects/CustomCursor/CustomCursor.jsx';
import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import HomePage from './pages/HomePage.jsx';
import CapabilityPage from './pages/CapabilityPage/CapabilityPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

// Start each new page at the top, once the previous one has faded out
const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={resetScroll}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/capabilities/:slug" element={<PageTransition><CapabilityPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

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
            <AnimatedRoutes />
          </main>
          <Footer />
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
