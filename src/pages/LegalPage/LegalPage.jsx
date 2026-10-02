import { Fragment, useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { EASE_OUT_EXPO, fadeUp, revealOnScroll, stagger } from '../../animations/variants.js';
import { PRIVACY_POLICY } from '../../data/legal/privacyContent.js';
import { TERMS } from '../../data/legal/terms.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { usePageMeta } from '../../hooks/usePageMeta.js';
import { pad2 } from '../../utils/format.js';
import { scrollToSection } from '../../utils/scrollToSection.js';
import BracketBox from '../../components/ui/BracketBox/BracketBox.jsx';
import PixelEmblem from '../../components/ui/PixelEmblem/PixelEmblem.jsx';
import RevealText from '../../components/ui/RevealText/RevealText.jsx';
import PixelDivider from '../../components/sections/PixelDivider/PixelDivider.jsx';
import '../../components/capability/capability.css';
import './LegalPage.css';

const DOCUMENTS = { privacy: PRIVACY_POLICY, terms: TERMS };
const OTHER = { privacy: TERMS, terms: PRIVACY_POLICY };
const WORDS_PER_MINUTE = 200;

function countWords(legalDoc) {
  const text = [legalDoc.intro, ...legalDoc.sections.flatMap((s) => s.blocks.flatMap((b) =>
    typeof b === 'string' ? [b] : b.list.map((item) => (typeof item === 'string' ? item : `${item.lead} ${item.text}`))
  ))].join(' ');
  return text.split(/\s+/).length;
}

function ListItem({ item }) {
  if (typeof item === 'string') return item;
  const text = item.href ? <a href={item.href}>{item.text}</a> : item.text;
  return (
    <>
      <strong>{item.lead}</strong> — {text}
    </>
  );
}

/**
 * Privacy Policy / Terms & Conditions. Content lives in src/data/legal/*.
 * Sticky contents list (chip bar on phones) tracks the section being read.
 */
export default function LegalPage({ doc }) {
  const legalDoc = DOCUMENTS[doc];
  const other = OTHER[doc];
  usePageMeta({ title: legalDoc.title, description: legalDoc.description });

  const sectionIds = useMemo(() => legalDoc.sections.map((s) => s.id), [legalDoc]);
  const activeId = useActiveSection(sectionIds);
  const activeIndex = Math.max(0, sectionIds.indexOf(activeId));
  const tocRef = useRef(null);

  // Phones: keep the active chip centred in the horizontal contents bar
  useEffect(() => {
    const toc = tocRef.current;
    const link = toc?.querySelector('.legal-toc-link.is-active');
    if (!toc || !link || toc.scrollWidth <= toc.clientWidth) return;
    toc.scrollTo({ left: link.offsetLeft - toc.clientWidth / 2 + link.offsetWidth / 2, behavior: 'smooth' });
  }, [activeId]);
  const readingMinutes = Math.max(1, Math.round(countWords(legalDoc) / WORDS_PER_MINUTE));

  const jumpTo = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const meta = [
    { label: 'LAST UPDATED', value: legalDoc.updated.toUpperCase() },
    { label: 'SECTIONS', value: pad2(legalDoc.sections.length) },
    { label: 'READING TIME', value: `${readingMinutes} MIN` },
    { label: 'APPLIES TO', value: 'WEBSITE + SERVICES' },
  ];

  return (
    <div className="legal-page">
      <section className="capability-section legal-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}>
            <BracketBox className="capability-frame legal-hero-frame">
              <div className="legal-hero-grid">
                <div>
                  <span className="section-tag">[ LEGAL // {legalDoc.tag} ]</span>
                  <RevealText as="h1" className="legal-title" text={legalDoc.title} delay={0.15} amount={0.1} />
                  <motion.p
                    className="capability-body-text legal-intro"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT_EXPO }}
                  >
                    {legalDoc.intro}
                  </motion.p>
                </div>
                <div className="legal-emblem" aria-hidden="true">
                  <PixelEmblem seed={`legal-${doc}`} />
                </div>
              </div>

              <dl className="legal-meta">
                {meta.map((item) => (
                  <div key={item.label} className="legal-meta-item">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </BracketBox>
          </motion.div>
        </div>
      </section>

      <section className="capability-section">
        <div className="container legal-body">
          <nav ref={tocRef} className="legal-toc" aria-label="Contents">
            <span className="legal-toc-title">CONTENTS</span>
            <ol className="legal-toc-list">
              {legalDoc.sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => jumpTo(e, section.id)}
                    className={`legal-toc-link${section.id === activeId ? ' is-active' : ''}`}
                    aria-current={section.id === activeId ? 'location' : undefined}
                  >
                    <span className="legal-toc-num">{pad2(i + 1)}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            <span className="legal-toc-rail" aria-hidden="true">
              <span className="legal-toc-progress" style={{ transform: `scaleY(${(activeIndex + 1) / sectionIds.length})` }} />
            </span>
          </nav>

          <BracketBox as="article" className="capability-frame legal-content">
            {legalDoc.sections.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                className="legal-section"
                variants={stagger(0.05)}
                {...revealOnScroll(0.05)}
              >
                <motion.h2 className="legal-section-title" variants={fadeUp}>
                  <span className="legal-section-num">{pad2(i + 1)} —</span> {section.title}
                </motion.h2>
                {section.blocks.map((block, j) => (
                  <Fragment key={j}>
                    {typeof block === 'string' ? (
                      <motion.p className="legal-text" variants={fadeUp}>
                        {block}
                      </motion.p>
                    ) : (
                      <motion.ul className="legal-list" variants={fadeUp}>
                        {block.list.map((item, k) => (
                          <li key={k}>
                            <ListItem item={item} />
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </Fragment>
                ))}
              </motion.section>
            ))}
          </BracketBox>
        </div>
      </section>

      <section className="capability-section">
        <motion.div className="container legal-next" variants={stagger(0.12)} {...revealOnScroll(0.3)}>
          <motion.div variants={fadeUp} className="legal-next-motion">
            <BracketBox as={Link} to={other.path} className="legal-next-card">
              <span className="legal-next-label">ALSO READ</span>
              <span className="legal-next-title">{other.title} →</span>
            </BracketBox>
          </motion.div>
          <motion.div variants={fadeUp} className="legal-next-motion">
            <BracketBox as={Link} to="/contact" className="legal-next-card dark-inverted inverse-surface">
              <span className="legal-next-label">QUESTIONS ABOUT THIS?</span>
              <span className="legal-next-title">CONTACT US →</span>
            </BracketBox>
          </motion.div>
        </motion.div>
      </section>

      <PixelDivider />
    </div>
  );
}
