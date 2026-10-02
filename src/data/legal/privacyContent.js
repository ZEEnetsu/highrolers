import { ADDRESS_INLINE, EMAIL, PHONE_DISPLAY } from '../contact.js';
import { LEGAL_NAME } from '../site.js';

/**
 * Privacy Policy content. Blocks are either a paragraph string or
 * { list: [string | { lead, text, href? }] }.
 *
 * Don't rename this file to privacyPolicy.js: ad-blocker cookie-notice lists
 * (used by Brave Shields, uBlock) block "/privacypolicy.js", which stops the
 * dev server's module graph and leaves a blank page.
 */
export const PRIVACY_POLICY = {
  slug: 'privacy',
  path: '/privacy-policy',
  tag: 'PRIVACY',
  title: 'PRIVACY POLICY',
  updated: '2 October 2026',
  description: 'How HIGHROLERS collects, uses and protects personal data across our website and digital services.',
  intro: `This Privacy Policy explains how ${LEGAL_NAME} ("HIGHROLERS", "we", "us") collects, uses, shares and protects personal data when you visit this website, contact us, or work with us on a project — from automation, websites, apps and AI systems to marketing, branding and creative production.`,
  sections: [
    {
      id: 'who-we-are',
      title: 'WHO WE ARE',
      blocks: [
        `HIGHROLERS is a technology-first digital solutions agency based in ${ADDRESS_INLINE}. We design, build, automate and grow digital products and brands for businesses and individuals.`,
        "For the personal data described in this policy we act as the \"Data Fiduciary\" under India's Digital Personal Data Protection Act, 2023 (\"DPDP Act\") — the equivalent of a \"controller\" under the EU and UK GDPR. When we process data on behalf of a client as part of a project, we act as that client's Data Processor (see Section 04).",
      ],
    },
    {
      id: 'information-we-collect',
      title: 'INFORMATION WE COLLECT',
      blocks: [
        'Information you give us:',
        {
          list: [
            { lead: 'Enquiries', text: 'your full name, whether your enquiry is business or personal, the service you are interested in, your phone number and/or email address, and anything else you choose to tell us.' },
            { lead: 'Project information', text: 'business details, briefs, brand assets, content, product data and feedback you share while we work together.' },
            { lead: 'Access you grant', text: 'logins, API keys or admin access to platforms such as websites, hosting, CRMs, ad accounts and analytics — only as needed to deliver a service.' },
            { lead: 'Communications', text: 'emails, calls, WhatsApp messages and meeting notes.' },
            { lead: 'Billing details', text: 'name, billing address, GST number and payment records. We do not store full card numbers.' },
          ],
        },
        'Information collected automatically:',
        {
          list: [
            { lead: 'Server logs', text: 'IP address, browser and device type, pages requested and the date and time — used to keep the website secure and running.' },
            { lead: 'Browser storage', text: 'we save your light/dark theme choice in your browser\'s local storage. It contains no personal data and is never sent to us.' },
            { lead: 'Cookies', text: 'this website does not currently use analytics, advertising or tracking cookies. If that changes we will update this policy and ask for consent where required.' },
          ],
        },
      ],
    },
    {
      id: 'how-we-use-it',
      title: 'HOW WE USE YOUR INFORMATION',
      blocks: [
        {
          list: [
            'To reply to enquiries and prepare proposals, quotes and statements of work.',
            'To deliver, support and maintain the services you engage us for.',
            'To communicate with you about projects, invoices and support.',
            'To keep our website and systems secure and to improve our services.',
            'To meet legal, tax and accounting obligations.',
            'To protect our rights and prevent fraud or misuse.',
          ],
        },
        'We do not sell personal data, and we do not use it for automated decisions that have legal or similarly significant effects on you.',
      ],
    },
    {
      id: 'client-data',
      title: 'DATA WE PROCESS FOR CLIENTS',
      blocks: [
        "Many of our services involve systems that handle our clients' own customer data — for example business and workflow automation, CRM and WhatsApp workflows, AI assistants and chatbots, e-commerce stores, web applications and customer portals, data and business dashboards, and advertising audiences.",
        "In these cases the client decides why and how that data is processed. We process it only on the client's documented instructions and only to deliver the agreed services, keep access limited to the people who need it, apply the safeguards in Section 10, and return or delete client data at the end of the engagement unless the law requires us to keep it.",
        'If you are a customer of one of our clients, please contact that business directly to exercise your rights — we will help them respond.',
      ],
    },
    {
      id: 'third-party-services',
      title: 'AI, AUTOMATION & THIRD-PARTY SERVICES',
      blocks: [
        'We use trusted service providers to run our business and deliver projects. Depending on the service, these may include:',
        {
          list: [
            { lead: 'Hosting & cloud', text: 'website and application hosting, domains, storage and backups.' },
            { lead: 'Email & messaging', text: 'including Google Workspace / Gmail and WhatsApp.' },
            { lead: 'Automation & integration platforms', text: 'that connect forms, databases, CRMs and notification tools.' },
            { lead: 'AI model providers', text: 'used inside assistants, content and data-processing workflows — configured, where the provider allows it, so your data is not used to train their models.' },
            { lead: 'Advertising & analytics platforms', text: 'such as Meta, Google, YouTube and LinkedIn, when we run campaigns or set up tracking on your behalf.' },
            { lead: 'E-commerce & payments', text: 'such as Shopify, WooCommerce and payment gateways for stores we build.' },
            'Design, project-management and file-sharing tools.',
          ],
        },
        'These providers process data under their own terms and only as needed to provide their service. Where a project needs a new third-party tool, we will tell you which one and why.',
      ],
    },
    {
      id: 'legal-basis',
      title: 'LEGAL BASIS & CONSENT',
      blocks: [
        'We process personal data on the basis of your consent (for example when you send an enquiry), the performance of a contract with you or steps you ask us to take before one, compliance with legal obligations, and other legitimate uses permitted by law such as security and fraud prevention.',
        'Where we rely on consent you can withdraw it at any time (Section 11); this does not affect processing that already took place. If you visit from the European Union or the United Kingdom, we apply the principles of the GDPR / UK GDPR to your data.',
      ],
    },
    {
      id: 'sharing',
      title: 'SHARING & DISCLOSURE',
      blocks: [
        {
          list: [
            'With the service providers described in Section 05.',
            'With your consent or at your direction — for example when you ask us to give a developer access to your project.',
            'With professional advisers such as accountants and lawyers, under confidentiality.',
            'When required by law, court order or a competent government authority.',
            'In connection with a merger, acquisition or sale of all or part of our business, subject to this policy.',
          ],
        },
      ],
    },
    {
      id: 'international-transfers',
      title: 'INTERNATIONAL TRANSFERS',
      blocks: [
        'Some providers store or process data outside India — for example cloud, email and AI services. When data is transferred abroad we take reasonable steps to keep it protected, and we follow any restrictions notified by the Government of India under the DPDP Act.',
      ],
    },
    {
      id: 'retention',
      title: 'HOW LONG WE KEEP DATA',
      blocks: [
        {
          list: [
            { lead: 'Enquiries', text: 'that do not become a project — up to 24 months, then deleted.' },
            { lead: 'Client records & communications', text: 'for the engagement and up to 8 years afterwards, to meet tax and accounting requirements.' },
            { lead: 'Server logs', text: 'usually up to 90 days, unless needed to investigate a security incident.' },
            { lead: 'Access credentials', text: 'removed or handed back once the work they were needed for is complete.' },
          ],
        },
      ],
    },
    {
      id: 'security',
      title: 'SECURITY',
      blocks: [
        'We use reasonable technical and organisational safeguards, including encrypted connections (HTTPS), access controls with least-privilege permissions, strong authentication on our accounts, secure handling of credentials, regular backups and timely updates.',
        'No method of transmission or storage is completely secure. If a personal data breach affects you, we will notify you and the Data Protection Board of India as required by law.',
      ],
    },
    {
      id: 'your-rights',
      title: 'YOUR RIGHTS',
      blocks: [
        {
          list: [
            { lead: 'Access', text: 'ask for a summary of the personal data we hold about you and how we use it.' },
            { lead: 'Correction & completion', text: 'ask us to correct inaccurate data or complete incomplete data.' },
            { lead: 'Erasure', text: 'ask us to delete data we no longer need, subject to legal retention requirements.' },
            { lead: 'Withdraw consent', text: 'at any time, as easily as you gave it.' },
            { lead: 'Grievance redressal', text: 'raise a complaint with us (Section 15). If it is not resolved, you may approach the Data Protection Board of India.' },
            { lead: 'Nomination', text: 'nominate another person to exercise your rights in the event of death or incapacity.' },
          ],
        },
        `Visitors from the EU and UK also have rights to restriction, objection and data portability. To exercise any right, email ${EMAIL}. We will respond within 30 days and may first need to verify your identity.`,
      ],
    },
    {
      id: 'children',
      title: 'CHILDREN',
      blocks: [
        'Our services are intended for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has contacted us, email us and we will delete their information.',
      ],
    },
    {
      id: 'marketing',
      title: 'MARKETING COMMUNICATIONS',
      blocks: [
        'We only send marketing messages if you have agreed to receive them or where the law allows it. Every message includes a way to opt out, and you can also email us at any time.',
      ],
    },
    {
      id: 'changes',
      title: 'CHANGES TO THIS POLICY',
      blocks: [
        'We may update this policy as our services, tools or legal requirements change. The "Last updated" date at the top shows the latest revision, and significant changes will be highlighted on this page.',
      ],
    },
    {
      id: 'contact',
      title: 'GRIEVANCE OFFICER & CONTACT',
      blocks: [
        'For questions, requests or complaints about this policy or your personal data, contact our Grievance Officer:',
        {
          list: [
            { lead: 'Organisation', text: LEGAL_NAME },
            { lead: 'Address', text: ADDRESS_INLINE },
            { lead: 'Email', text: EMAIL, href: `mailto:${EMAIL}` },
            { lead: 'Phone', text: PHONE_DISPLAY, href: `tel:${PHONE_DISPLAY.replace(/\s/g, '')}` },
          ],
        },
        'We aim to resolve every grievance within 30 days.',
      ],
    },
  ],
};
