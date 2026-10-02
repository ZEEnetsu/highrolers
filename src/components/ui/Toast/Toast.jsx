import './Toast.css';

// Always mounted so screen readers keep the live region registered
export default function Toast({ message, visible }) {
  return (
    <div className={`highrolers-toast${visible ? ' show' : ''}`} role="alert" aria-live="polite">
      <span className="toast-bracket">[</span>
      <span className="toast-msg">{message}</span>
      <span className="toast-bracket">]</span>
    </div>
  );
}
