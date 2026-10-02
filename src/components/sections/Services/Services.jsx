import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { fadeUp, revealOnScroll, stagger } from '../../../animations/variants.js';
import { CAPABILITIES, CAPABILITY_GROUPS, DEFAULT_OPEN_CAPABILITY } from '../../../data/capabilities.js';
import BracketBox from '../../ui/BracketBox/BracketBox.jsx';
import RevealText from '../../ui/RevealText/RevealText.jsx';
import CapabilityTabs from './CapabilityTabs.jsx';
import ServiceRow from './ServiceRow.jsx';
import './Services.css';

const ALL_TAB = 'all';
const LIST_ID = 'capabilities-list';

const TABS = [
  { id: ALL_TAB, label: 'ALL', title: 'All capabilities', count: CAPABILITIES.length },
  ...CAPABILITY_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    title: group.title,
    count: CAPABILITIES.filter((c) => c.group === group.id).length,
  })),
];

const capabilitiesIn = (tabId) =>
  tabId === ALL_TAB ? CAPABILITIES : CAPABILITIES.filter((c) => c.group === tabId);

const listExit = { opacity: 0, y: -8, transition: { duration: 0.18 } };

export default function Services() {
  const [activeTab, setActiveTab] = useState(ALL_TAB);
  const [openSlug, setOpenSlug] = useState(DEFAULT_OPEN_CAPABILITY);
  const visible = capabilitiesIn(activeTab);

  const toggle = (slug) => setOpenSlug((current) => (current === slug ? null : slug));

  // Keep the open row if it is still listed, otherwise open the first one in the tab
  const selectTab = (tabId) => {
    const list = capabilitiesIn(tabId);
    setActiveTab(tabId);
    setOpenSlug((current) => (list.some((c) => c.slug === current) ? current : list[0]?.slug ?? null));
  };

  return (
    <section className="services-section" id="services">
      <div className="container">
        <motion.div variants={fadeUp} {...revealOnScroll(0.08)}>
          <BracketBox className="services-main-frame">
            <div className="services-header-row">
              <div className="services-title-left">
                <span className="section-tag">[ SERVICES WE DELIVER ]</span>
                <RevealText as="h2" className="editorial-headline-services" text={'CAPABILITIES THAT\nDRIVE'} delay={0.2} />
              </div>

              <motion.div
                className="services-pegasus-wrap"
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.3 }}
              >
                <motion.img
                  src="/assets/starmedia_bw/pegasus_bw.png"
                  alt="Highrolers Pegasus Emblem"
                  className="pegasus-img"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              <div className="services-title-right">
                <RevealText as="h2" className="editorial-headline-services right-text" text="MEASURABLE GROWTH" delay={0.35} />
                <motion.p className="services-subtitle-desc" variants={fadeUp} {...revealOnScroll(0.5)}>
                  COMBINING ENGINEERING, CREATIVE AGILITY, AND PERFORMANCE MEDIA TO SCALE YOUR ENTERPRISE REVENUE.
                </motion.p>
              </div>
            </div>

            <div className="services-filter-row">
              <CapabilityTabs tabs={TABS} activeId={activeTab} onChange={selectTab} controls={LIST_ID} />
              <span className="services-filter-count" aria-live="polite">
                SHOWING {String(visible.length).padStart(2, '0')} / {String(CAPABILITIES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Keyed by tab so each switch replays the staggered cascade */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                id={LIST_ID}
                role="tabpanel"
                className="services-interactive-list"
                variants={stagger(0.06)}
                exit={listExit}
                {...revealOnScroll(0.05)}
              >
                {visible.map((capability) => (
                  <ServiceRow
                    key={capability.slug}
                    capability={capability}
                    isOpen={openSlug === capability.slug}
                    onToggle={() => toggle(capability.slug)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </BracketBox>
        </motion.div>
      </div>
    </section>
  );
}
