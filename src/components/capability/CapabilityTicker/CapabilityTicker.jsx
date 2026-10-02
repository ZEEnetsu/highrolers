import { Fragment } from 'react';
import './CapabilityTicker.css';

const SECONDS_PER_ITEM = 2.2;
// Short lists are repeated so one run is always wider than the screen
const MIN_ITEMS_PER_RUN = 14;

/**
 * Two crossing "tape" bands that scroll every service name.
 * The content is rendered twice so the loop is seamless.
 */
export default function CapabilityTicker({ sections }) {
  const names = sections.flatMap((section) => section.items);
  const items = names.length < MIN_ITEMS_PER_RUN ? [...names, ...names] : names;
  const duration = `${Math.max(30, items.length * SECONDS_PER_ITEM)}s`;

  const renderRun = (copy) => (
    <div className="capability-ticker-run" aria-hidden={copy > 0 ? 'true' : undefined}>
      {items.map((item, i) => (
        <Fragment key={`${copy}-${i}`}>
          <span className="capability-ticker-item">{item}</span>
          <span className="capability-ticker-star" aria-hidden="true">✦</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <section className="capability-ticker" aria-label="Services overview">
      <div className="capability-ticker-band capability-ticker-band-back" aria-hidden="true">
        <div className="capability-ticker-track reverse" style={{ animationDuration: duration }}>
          {renderRun(1)}
          {renderRun(2)}
        </div>
      </div>
      <div className="capability-ticker-band capability-ticker-band-front inverse-surface">
        <div className="capability-ticker-track" style={{ animationDuration: duration }}>
          {renderRun(0)}
          {renderRun(1)}
        </div>
      </div>
    </section>
  );
}
