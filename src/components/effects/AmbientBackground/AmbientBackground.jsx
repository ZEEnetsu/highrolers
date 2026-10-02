import './AmbientBackground.css';

// Film grain + drifting glass orbs behind the frosted panels
export default function AmbientBackground() {
  return (
    <>
      <div className="dither-noise-overlay" aria-hidden="true" />
      <div className="glass-ambient-atmosphere" aria-hidden="true">
        <div className="glass-ambient-orb orb-1" />
        <div className="glass-ambient-orb orb-2" />
        <div className="glass-ambient-orb orb-3" />
        <div className="glass-ambient-orb orb-4" />
      </div>
    </>
  );
}
