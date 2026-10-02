import { ADDRESS_INLINE, EMAIL, PHONE_DISPLAY } from '../contact.js';
import { LEGAL_NAME } from '../site.js';

/**
 * Terms & Conditions content. Same block format as privacyContent.js.
 */
export const TERMS = {
  slug: 'terms',
  path: '/terms',
  tag: 'TERMS',
  title: 'TERMS & CONDITIONS',
  updated: '2 October 2026',
  description: 'The terms that govern use of the HIGHROLERS website and our digital technology, marketing and creative services.',
  intro: `These Terms & Conditions ("Terms") govern your use of this website and the services provided by ${LEGAL_NAME} ("HIGHROLERS", "we", "us") to you ("Client", "you"). By using the website, accepting a proposal or paying an invoice, you agree to these Terms.`,
  sections: [
    {
      id: 'acceptance',
      title: 'ACCEPTANCE OF THESE TERMS',
      blocks: [
        'If you accept on behalf of a company or other organisation, you confirm that you are authorised to bind it.',
        'Where a signed proposal, statement of work ("SOW") or contract conflicts with these Terms, that document takes priority for the project it covers.',
      ],
    },
    {
      id: 'website-use',
      title: 'USING THIS WEBSITE',
      blocks: [
        'You may browse and share this website for personal and business information. You may not copy, scrape or reuse our content, branding or design without written permission, try to disrupt or overload the site, or submit false, abusive or automated enquiries.',
      ],
    },
    {
      id: 'services',
      title: 'OUR SERVICES',
      blocks: [
        'We provide digital technology and growth services across four areas:',
        {
          list: [
            { lead: 'Technology & Infrastructure', text: 'business and workflow automation, AI systems, websites, web and mobile app development, cloud and IT, data dashboards and custom digital solutions.' },
            { lead: 'Digital Growth', text: 'SEO, performance media and paid advertising, e-commerce, Google Business and local presence, social media management and personal branding.' },
            { lead: 'Design & Experience', text: 'UI/UX design, branding, presentations and business materials.' },
            { lead: 'Content & Creative', text: 'graphic design, video, content, and photography and creative production.' },
          ],
        },
        'The scope, deliverables, timeline and price of each engagement are set out in a proposal or SOW. Anything not listed there is outside the scope.',
      ],
    },
    {
      id: 'proposals',
      title: 'PROPOSALS, QUOTES & STATEMENTS OF WORK',
      blocks: [
        'Quotes are valid for 30 days unless stated otherwise. Work begins once a proposal is accepted in writing (email is enough) and any advance payment is received.',
        'Changes requested after acceptance are handled through a written change request and may affect cost and timeline.',
      ],
    },
    {
      id: 'client-responsibilities',
      title: 'YOUR RESPONSIBILITIES',
      blocks: [
        {
          list: [
            'Provide accurate information, content and brand assets, and give feedback and approvals on time.',
            'Provide access to the platforms, accounts and tools we need, and keep your own credentials secure.',
            'Make sure you have the rights to all material you give us — text, images, logos and data — and that our use of it does not infringe anyone else\'s rights.',
            'Make sure your business, products and any data you ask us to process comply with applicable law, including privacy, advertising and consumer-protection rules.',
            'Review and test deliverables within the agreed review period.',
          ],
        },
        'Delays in feedback, content or access may move delivery dates.',
      ],
    },
    {
      id: 'fees',
      title: 'FEES, INVOICES & PAYMENT',
      blocks: [
        {
          list: [
            'Unless the proposal says otherwise, projects require an advance payment (typically 50%) before work starts, with the balance due on completion or at agreed milestones.',
            'Retainers — such as SEO, social media, maintenance or ad management — are billed monthly in advance.',
            'Invoices are payable within 7 days of issue. Prices exclude GST and other applicable taxes, which are added where required.',
            'Advertising spend, domains, hosting, software licences, stock assets, paid plugins, API and AI usage and other third-party costs are paid by you — directly to the provider or reimbursed to us — and are separate from our fees.',
            'If payment is overdue we may pause work and withhold deliverables until it is received.',
          ],
        },
        'Payments for work already performed are non-refundable.',
      ],
    },
    {
      id: 'timelines',
      title: 'TIMELINES & REVISIONS',
      blocks: [
        'Timelines are estimates based on the agreed scope and on receiving your inputs on time. Each deliverable includes the number of revision rounds stated in the proposal — two rounds if none is specified. Additional revisions or new requirements are billed separately.',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'INTELLECTUAL PROPERTY',
      blocks: [
        {
          list: [
            { lead: 'Your deliverables', text: 'on full payment you own the final deliverables created specifically for you — such as designs, project code, content and creative assets — unless the proposal states otherwise.' },
            { lead: 'Our tools', text: 'we keep ownership of our pre-existing tools, code libraries, templates, frameworks, automations and know-how. You receive a perpetual, non-exclusive licence to use them as part of your deliverables.' },
            { lead: 'Third-party components', text: 'open-source software, fonts, stock media, plugins and platforms remain subject to their own licences.' },
            { lead: 'Before payment', text: 'deliverables remain our property until they are paid for in full.' },
            { lead: 'Portfolio', text: 'unless you ask us not to in writing, we may show non-confidential work in our portfolio and marketing.' },
          ],
        },
      ],
    },
    {
      id: 'third-party-platforms',
      title: 'THIRD-PARTY PLATFORMS & RESULTS',
      blocks: [
        'Many services depend on platforms we do not control — for example Google, Meta, YouTube, LinkedIn, WhatsApp, Shopify, app stores, hosting and AI providers. Their policies, algorithms, approvals, pricing and availability can change at any time.',
        'We work to agreed best practices, but we do not guarantee specific outcomes such as search rankings, traffic, followers, leads, sales, return on ad spend (ROAS) or app-store approval.',
        'Ad accounts, business profiles, domains and app-store listings should be owned by you; we manage them with the access you grant.',
      ],
    },
    {
      id: 'hosting-support',
      title: 'HOSTING, MAINTENANCE & SUPPORT',
      blocks: [
        'Hosting, maintenance and support are provided only when included in your proposal or a separate plan. Without an active plan we are not responsible for updates, security patches, backups or downtime after handover, and support requests are billed at our current rates.',
      ],
    },
    {
      id: 'ai-output',
      title: 'AI-GENERATED OUTPUT',
      blocks: [
        'Some solutions use artificial intelligence — for example chatbots, assistants, content and data workflows. AI output can be inaccurate or incomplete. You are responsible for reviewing AI-generated content and decisions before relying on them, and for keeping human oversight where outcomes matter. We will tell you which AI providers a solution uses.',
      ],
    },
    {
      id: 'confidentiality',
      title: 'CONFIDENTIALITY',
      blocks: [
        "Each party will keep the other's non-public business information confidential and use it only for the engagement. This does not apply to information that is public, already known, independently developed, or required to be disclosed by law. Personal data is handled as described in our Privacy Policy.",
      ],
    },
    {
      id: 'warranties',
      title: 'WARRANTIES & DISCLAIMERS',
      blocks: [
        'We perform our services with reasonable skill and care, in line with good industry practice, and will fix defects in deliverables we built that you report within 30 days of delivery at no extra cost.',
        'Except as stated in these Terms, the website and services are provided "as is", and all other warranties are excluded to the extent permitted by law.',
      ],
    },
    {
      id: 'liability',
      title: 'LIMITATION OF LIABILITY',
      blocks: [
        'To the extent permitted by law, we are not liable for indirect, incidental or consequential losses, including lost profits, revenue, data or business opportunities.',
        'Our total liability arising from an engagement is limited to the fees you paid us for that engagement in the three months before the claim. Nothing in these Terms limits liability that cannot be limited by law.',
      ],
    },
    {
      id: 'indemnity',
      title: 'INDEMNITY',
      blocks: [
        'You agree to indemnify us against claims arising from materials you supplied, your instructions, your products or services, or your breach of these Terms or applicable law.',
      ],
    },
    {
      id: 'termination',
      title: 'TERMINATION',
      blocks: [
        'Either party may end a project with 15 days\' written notice, and a retainer with 30 days\' written notice. Either party may end an engagement immediately if the other materially breaches these Terms and does not fix the breach within 7 days of notice.',
        'On termination you pay for work completed and costs incurred up to the termination date, and we hand over completed deliverables that have been paid for.',
      ],
    },
    {
      id: 'governing-law',
      title: 'GOVERNING LAW & DISPUTES',
      blocks: [
        'These Terms are governed by the laws of India. We will first try to resolve any dispute through good-faith discussion; if it is not resolved within 30 days, the courts at Patna, Bihar have exclusive jurisdiction.',
      ],
    },
    {
      id: 'changes',
      title: 'CHANGES TO THESE TERMS',
      blocks: [
        'We may update these Terms from time to time. The version in force when you accept a proposal applies to that engagement; updates apply to new engagements and to continued use of the website.',
      ],
    },
    {
      id: 'contact',
      title: 'CONTACT',
      blocks: [
        {
          list: [
            { lead: 'Organisation', text: LEGAL_NAME },
            { lead: 'Address', text: ADDRESS_INLINE },
            { lead: 'Email', text: EMAIL, href: `mailto:${EMAIL}` },
            { lead: 'Phone', text: PHONE_DISPLAY, href: `tel:${PHONE_DISPLAY.replace(/\s/g, '')}` },
          ],
        },
      ],
    },
  ],
};
