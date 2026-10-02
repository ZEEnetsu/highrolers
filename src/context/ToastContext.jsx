import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Toast from '../components/ui/Toast/Toast.jsx';

const DEFAULT_DURATION = 3500;

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: 'SYSTEM READY // HIGHROLERS INITIALIZED', visible: false });
  const hideTimer = useRef(null);

  const showToast = useCallback((message, duration = DEFAULT_DURATION) => {
    setToast({ message, visible: true });
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), duration);
  }, []);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast message={toast.message} visible={toast.visible} />
    </ToastContext.Provider>
  );
}

// Returns showToast(message, duration?)
export function useToast() {
  return useContext(ToastContext);
}
