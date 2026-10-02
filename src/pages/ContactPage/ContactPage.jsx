import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { getCapability } from '../../data/capabilities.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { usePageMeta } from '../../hooks/usePageMeta.js';
import ContactIntro from '../../components/contact/ContactIntro/ContactIntro.jsx';
import EnquiryForm from '../../components/contact/EnquiryForm/EnquiryForm.jsx';
import PixelParticleField from '../../components/effects/PixelParticleField/PixelParticleField.jsx';
import './ContactPage.css';

// Below this the page switches to the 3-step form so it still fits one screen
const STEPPED_QUERY = '(max-width: 899px), (max-height: 639px)';

// /contact?service=<capability-slug> preselects segment + service
function prefillFrom(params) {
  const capability = getCapability(params.get('service') ?? '');
  return capability ? { segment: capability.group, subSegment: capability.slug } : {};
}

/**
 * Single-screen contact page ("signal console"): direct channels on the left,
 * the enquiry terminal on the right. No footer (App.jsx) — it fits the viewport.
 */
export default function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description: 'Start a project with HIGHROLERS — automation, websites, apps, AI, marketing and creative. Send an enquiry, call, WhatsApp or email us.',
  });

  const stepped = useMediaQuery(STEPPED_QUERY);
  const [params] = useSearchParams();
  // Read once: later URL changes shouldn't overwrite what the visitor typed
  const [prefill] = useState(() => prefillFrom(params));

  return (
    <section className={`contact-page${stepped ? ' is-stepped' : ''}`}>
      <PixelParticleField density={1 / 6500} radius={130} />

      <div className="container contact-layout">
        <ContactIntro compact={stepped} />
        <EnquiryForm stepped={stepped} prefill={prefill} />
      </div>
    </section>
  );
}
