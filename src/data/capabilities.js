/**
 * Every capability, in one place. Drives the home "Capabilities" accordion
 * (summary + tags) and the /capabilities/:slug detail pages (everything else).
 *
 * Optional blocks render only when present:
 *   badge      chip above the title
 *   flow       steps joined by '→' or '+'
 *   statement  big display lines
 *   callout    inverse box with text and optional pills
 *   idealFor   pill list
 *   highlights "why it matters" trio
 */

export const CAPABILITY_GROUPS = [
  { id: 'technology', label: 'TECHNOLOGY', title: 'TECHNOLOGY & INFRASTRUCTURE' },
  { id: 'growth', label: 'GROWTH', title: 'DIGITAL GROWTH' },
  { id: 'design', label: 'DESIGN', title: 'DESIGN & EXPERIENCE' },
  { id: 'creative', label: 'CREATIVE', title: 'CONTENT & CREATIVE' },
];

export const CAPABILITIES = [
  {
    slug: 'business-workflow-automation',
    num: '01',
    name: 'BUSINESS & WORKFLOW AUTOMATION',
    short: 'AUTOMATION',
    group: 'technology',
    badge: 'OUR FLAGSHIP SERVICE',
    tagline: 'Work smarter. Move faster. Automate everything that can be automated.',
    intro: [
      'We help businesses identify repetitive processes and turn them into efficient digital workflows.',
      'Every manual hand-off — copying a lead into a CRM, chasing an approval, re-typing an invoice — is a place where time leaks and errors creep in. We map those moments and replace them with systems that run on their own.',
    ],
    summary:
      'Our flagship capability. Work smarter. Move faster. We eliminate repetitive manual work by connecting the software tools your business uses into seamless, automated pipelines: Form → Database → Notification → CRM → Follow-up. Less manual errors, faster operations, and more time for revenue growth.',
    tags: ['Lead Qualification', 'WhatsApp Workflows', 'CRM Automation', 'Document Processing', 'Notification Engines'],
    sections: [
      {
        title: 'BUSINESS AUTOMATION',
        items: [
          'Lead capture automation', 'Lead qualification', 'Customer onboarding', 'Follow-up automation',
          'Email automation', 'WhatsApp workflow automation', 'Notification systems', 'Form automation',
          'Data entry automation', 'Document processing', 'Automated reporting', 'Task automation',
          'Approval workflows', 'Appointment workflows', 'Customer support workflows',
        ],
      },
      {
        title: 'AUTOMATION SOLUTIONS',
        items: [
          'CRM automation', 'Marketing automation', 'Sales automation', 'HR workflows', 'Finance workflows',
          'Operations automation', 'Customer service workflows', 'Internal team workflows', 'Business process automation',
        ],
      },
    ],
    flow: {
      title: 'WORKFLOW AUTOMATION',
      text: 'We connect the tools your business already uses and create workflows that move information automatically between them.',
      steps: ['Form', 'Database', 'Notification', 'CRM', 'Follow-up'],
      joiner: '→',
    },
    statement: {
      title: 'THE GOAL',
      lines: ['Less repetitive work.', 'Fewer manual errors.', 'Faster operations.', 'More time for growth.'],
    },
    highlights: [
      { title: 'ALWAYS ON', text: 'Workflows run at 3 a.m. exactly the way they run at 3 p.m. — no queue, no backlog, no forgotten follow-up.' },
      { title: 'ONE SOURCE OF TRUTH', text: 'Data moves once, automatically, between the tools you already use, so every team works from the same numbers.' },
      { title: 'BUILT TO COMPOUND', text: 'Start with one process. Each automation becomes a building block for the next, so the system grows with the business.' },
    ],
  },
  {
    slug: 'custom-websites-digital-platforms',
    num: '02',
    name: 'CUSTOM WEBSITES & DIGITAL PLATFORMS',
    short: 'WEBSITES',
    group: 'technology',
    tagline: 'Build your digital headquarters.',
    intro: [
      'Your website is often the first serious interaction someone has with your business.',
      'We design and develop websites that combine technology, usability, performance, security, and strong visual identity.',
    ],
    summary:
      'We design and build your digital headquarters. Enterprise web applications, customer portals, corporate platforms, and SaaS interfaces built with modern web technologies, military-grade security, and extreme conversion speed. More than websites — functional digital systems tailored to your business.',
    tags: ['Web Applications', 'Customer Portals', 'Interactive Dashboards', 'API Integrations', 'High-Security Hosting'],
    sections: [
      {
        title: 'WEBSITE DESIGN',
        items: [
          'Business websites', 'Corporate websites', 'Portfolio websites', 'Personal websites', 'Service websites',
          'Landing pages', 'Campaign websites', 'Event websites', 'Blog websites', 'Membership websites',
        ],
      },
      {
        title: 'WEBSITE DEVELOPMENT',
        items: [
          'Responsive web development', 'Front-end development', 'Back-end development', 'Database integration',
          'API integration', 'CMS integration', 'Authentication systems', 'Contact systems', 'Booking systems',
          'Payment integration', 'Third-party integrations', 'Analytics integration',
        ],
      },
      {
        title: 'WEBSITE SUPPORT',
        items: [
          'Website maintenance', 'Content updates', 'Technical support', 'Performance optimisation',
          'Security improvements', 'Backup systems', 'Hosting support',
        ],
      },
    ],
    callout: {
      title: 'WEBSITE REDESIGN',
      text: 'Already have a website? We can improve:',
      items: [
        'Design', 'User experience', 'Performance', 'Structure', 'Mobile responsiveness',
        'SEO foundations', 'Conversion flow', 'Technical performance',
      ],
    },
    highlights: [
      { title: 'FIRST IMPRESSIONS, ENGINEERED', text: 'Typography, speed and structure are designed together, so the site feels credible from the very first scroll.' },
      { title: 'BUILT FOR EVERY SCREEN', text: 'Layouts are designed responsive-first and tested across phones, tablets and wide displays.' },
      { title: 'READY TO EVOLVE', text: 'A clean CMS, solid integrations and ongoing support keep the website working as hard as the business.' },
    ],
  },
  {
    slug: 'mobile-app-development',
    num: '03',
    name: 'MOBILE APP DEVELOPMENT (iOS & ANDROID)',
    short: 'APP DEVELOPMENT',
    group: 'technology',
    tagline: 'Turn your idea into an application.',
    intro: [
      'From concept to launch, we help businesses create digital applications tailored to their users and business requirements.',
    ],
    summary:
      'Turn your concept into an intuitive mobile experience. From MVP validation to full-scale cross-platform iOS and Android apps with secure authentication, cloud databases, booking flows, and real-time push notification engines designed for fluid user adoption.',
    tags: ['iOS & Android Native', 'Cross-Platform Apps', 'MVP Prototyping', 'Real-Time Cloud APIs', 'Payment Gateways'],
    sections: [
      {
        title: 'MOBILE APP DEVELOPMENT',
        items: [
          'Android applications', 'iOS applications', 'Cross-platform applications', 'Business applications',
          'Customer applications', 'Service applications', 'Booking applications', 'E-commerce applications',
          'Utility applications',
        ],
      },
      {
        title: 'APP FEATURES',
        items: [
          'User authentication', 'User profiles', 'Notifications', 'Payment systems', 'Booking systems',
          'Chat systems', 'Maps & location', 'Dashboards', 'APIs', 'Databases', 'Analytics', 'Admin panels',
        ],
      },
    ],
    flow: {
      title: 'APP DEVELOPMENT PROCESS',
      text: 'One continuous path from the first sketch to the version people use every day.',
      steps: ['Idea', 'Research', 'UX', 'UI', 'Development', 'Testing', 'Launch', 'Support'],
      joiner: '→',
    },
    callout: {
      title: 'MVP DEVELOPMENT',
      text: "Have an idea but don't need a massive application immediately? We can help create an MVP — Minimum Viable Product — to validate the concept before scaling.",
    },
    highlights: [
      { title: 'USER-FIRST FROM DAY ONE', text: 'Research and UX come before a single screen is coded, so the app solves the problem users actually have.' },
      { title: 'ONE CODEBASE, TWO STORES', text: 'Cross-platform builds reach iOS and Android together without doubling the effort.' },
      { title: 'LAUNCH IS THE BEGINNING', text: 'Analytics, support and iteration are planned in, so the app improves with every release.' },
    ],
  },
  {
    slug: 'ai-systems-automation',
    num: '04',
    name: 'INTELLIGENT AI SYSTEMS & AUTOMATION',
    short: 'AI SOLUTIONS',
    group: 'technology',
    tagline: 'Bring intelligence into your business.',
    intro: [
      'Artificial intelligence can help businesses operate faster, reduce repetitive work, improve decision-making, and create new digital experiences.',
    ],
    summary:
      'Bring intelligence into your daily operations. We build custom AI assistants, automated internal knowledge bases, AI document analysis, and smart lead routing. AI understands. Automation executes. Your business scales.',
    tags: ['AI Strategy', 'Custom AI Chatbots', 'Knowledge Retrieval', 'Automated Research', 'Predictive BI'],
    sections: [
      {
        title: 'AI SERVICES',
        items: [
          'AI strategy', 'AI workflow design', 'AI assistants', 'AI chatbots', 'Customer support AI',
          'Internal knowledge assistants', 'AI content workflows', 'AI research systems', 'AI data processing',
          'AI reporting', 'AI productivity systems', 'AI-powered business tools',
        ],
      },
      {
        title: 'AI APPLICATIONS',
        items: [
          'Customer support', 'Lead qualification', 'Content workflows', 'Research automation',
          'Internal knowledge systems', 'Document processing', 'Data analysis', 'Automated reporting',
          'Business assistance',
        ],
      },
    ],
    statement: {
      title: 'AI + AUTOMATION',
      text: 'We combine AI with automation to create intelligent workflows.',
      lines: ['AI understands.', 'Automation executes.', 'Your business scales.'],
    },
    highlights: [
      { title: 'PRACTICAL, NOT HYPE', text: 'We start from the business problem and use AI only where it genuinely saves time or improves decisions.' },
      { title: 'GROUNDED IN YOUR KNOWLEDGE', text: 'Assistants connect to your own documents and data, so answers reflect how your business actually works.' },
      { title: 'HUMANS STAY IN CONTROL', text: 'Review steps and clear hand-offs keep people in charge of the decisions that matter.' },
    ],
  },
  {
    slug: 'cloud-it-solutions',
    num: '05',
    name: 'CLOUD & IT SOLUTIONS',
    short: 'CLOUD & IT',
    group: 'technology',
    tagline: 'Build a stronger digital foundation.',
    intro: ['We provide practical cloud, hosting, infrastructure, and digital technology support.'],
    summary:
      'A stronger digital foundation. We set up, connect and maintain the cloud, hosting, workspace and backup systems your business runs on — practical infrastructure without the complexity.',
    tags: ['Cloud Setup', 'Hosting & Domains', 'Backup Systems', 'Business Email', 'Technology Consulting'],
    sections: [
      {
        title: 'CLOUD SERVICES',
        items: [
          'Cloud setup', 'Cloud deployment', 'Hosting setup', 'Domain setup', 'Cloud storage', 'Backup systems',
          'Digital workspace setup', 'Deployment support', 'Infrastructure planning',
        ],
      },
      {
        title: 'IT & DIGITAL SERVICES',
        items: [
          'Business email setup', 'Digital tool setup', 'Software integration', 'Technology consulting',
          'Basic system support', 'Backup planning', 'Digital workflow optimisation', 'Infrastructure support',
        ],
      },
    ],
    callout: {
      title: 'DIGITAL INFRASTRUCTURE',
      text: 'We help businesses choose, configure, connect, and maintain the technology that powers their digital operations.',
    },
    highlights: [
      { title: 'SET UP RIGHT, ONCE', text: 'Domains, hosting, email and workspaces configured properly from the start and documented, so nothing depends on guesswork.' },
      { title: 'PROTECTED BY DEFAULT', text: 'Backups and recovery planning are part of every setup, never an afterthought.' },
      { title: 'TECHNOLOGY THAT FITS', text: 'We recommend tools that match your size and budget, then connect them so they work as one system.' },
    ],
  },
  {
    slug: 'web-development',
    num: '06',
    name: 'WEB DEVELOPMENT',
    short: 'WEB DEVELOPMENT',
    group: 'technology',
    tagline: 'More than websites.',
    intro: [
      'For businesses that need more than a traditional website, we develop custom web applications, platforms, dashboards, and digital systems.',
    ],
    summary:
      'Custom web applications, portals, internal tools and SaaS interfaces — functional digital systems built around how your business actually operates.',
    tags: ['Customer Portals', 'Admin Dashboards', 'Internal Tools', 'SaaS Interfaces', 'APIs & Databases'],
    sections: [
      {
        title: 'WEB APPLICATIONS',
        items: [
          'Customer portals', 'Admin dashboards', 'Internal tools', 'Booking systems', 'Management systems',
          'SaaS interfaces', 'CRM-style applications', 'Custom business tools', 'Client portals', 'Data-driven platforms',
        ],
      },
      {
        title: 'DEVELOPMENT CAPABILITIES',
        items: [
          'Front-end development', 'Back-end development', 'APIs', 'Databases', 'Authentication',
          'Payment systems', 'Third-party integrations', 'Cloud deployment', 'Admin systems',
        ],
      },
    ],
    callout: {
      title: 'TECHNOLOGY',
      text: 'Depending on project requirements, we work with modern web technologies, APIs, databases, cloud infrastructure, and third-party services.',
    },
    highlights: [
      { title: 'SHAPED AROUND YOUR PROCESS', text: 'Instead of bending your operations to off-the-shelf software, we build tools that fit the way your team already works.' },
      { title: 'SECURE BY DESIGN', text: 'Authentication, roles and data handling are planned into the architecture from the first sprint.' },
      { title: 'CONNECTED', text: 'APIs and integrations link the platform to payments, CRMs and the rest of your stack.' },
    ],
  },
  {
    slug: 'data-business-dashboards',
    num: '07',
    name: 'DATA & BUSINESS DASHBOARDS',
    short: 'DASHBOARDS',
    group: 'technology',
    tagline: 'Turn data into decisions.',
    intro: ['We create digital dashboards that help businesses understand their operations, performance, and growth.'],
    summary:
      'Dashboards that turn scattered spreadsheets and platform data into one clear view of sales, marketing and operations — updated automatically.',
    tags: ['KPI Dashboards', 'Sales Tracking', 'Automated Reporting', 'Data Visualisation', 'Revenue Reporting'],
    sections: [
      {
        title: 'DASHBOARD SERVICES',
        items: [
          'Business dashboards', 'Sales dashboards', 'Marketing dashboards', 'Social media dashboards',
          'KPI dashboards', 'Analytics dashboards', 'Operations dashboards', 'Performance dashboards',
          'Automated reporting', 'Data visualisation',
        ],
      },
      {
        title: 'DASHBOARD APPLICATIONS',
        items: [
          'Sales tracking', 'Lead tracking', 'Marketing performance', 'Social media performance',
          'Revenue reporting', 'Operational monitoring', 'KPI tracking',
        ],
      },
    ],
    statement: { title: 'THE RESULT', lines: ['Clear data.', 'Better visibility.', 'Faster decisions.'] },
    highlights: [
      { title: 'ONE SCREEN, WHOLE PICTURE', text: 'Sales, marketing and operations data brought together, so nobody has to stitch reports by hand.' },
      { title: 'REPORTS THAT BUILD THEMSELVES', text: 'Automated reporting replaces the weekly copy-paste ritual with live numbers.' },
      { title: 'METRICS THAT MATTER', text: 'We define the KPIs with you first, so every chart answers a real business question.' },
    ],
  },
  {
    slug: 'seo',
    num: '08',
    name: 'SEO',
    short: 'SEO',
    group: 'growth',
    tagline: 'Get found. Get discovered. Get considered.',
    intro: [
      'A great website is only useful when people can find it.',
      'Our SEO services focus on improving visibility, discoverability, and search performance.',
    ],
    summary:
      'Search visibility built on solid foundations — technical SEO, keyword strategy, on-page optimisation and content that helps the right customers find you.',
    tags: ['SEO Audit', 'Keyword Research', 'Technical SEO', 'Local SEO', 'Content SEO'],
    sections: [
      {
        title: 'SEO SERVICES',
        items: [
          'SEO audit', 'Keyword research', 'On-page SEO', 'Technical SEO foundations', 'Metadata optimisation',
          'Heading optimisation', 'Content optimisation', 'Internal linking', 'URL optimisation',
          'Image optimisation', 'Website structure optimisation', 'SEO strategy',
        ],
      },
      {
        title: 'LOCAL SEO',
        items: [
          'Local keyword research', 'Local landing pages', 'Google Business optimisation',
          'Location-based content', 'Citation foundations', 'Review strategy',
        ],
      },
      {
        title: 'CONTENT SEO',
        items: [
          'SEO blogs', 'Search-focused articles', 'Website content', 'Product descriptions', 'Service pages',
          'Content optimisation',
        ],
      },
    ],
    flow: {
      title: 'OUR APPROACH',
      text: 'SEO is a cycle, not a one-off task — every round of measurement feeds the next improvement.',
      steps: ['Research', 'Optimise', 'Publish', 'Measure', 'Improve'],
      joiner: '→',
    },
    highlights: [
      { title: 'FOUNDATIONS FIRST', text: 'Technical issues, structure and metadata are fixed before content is scaled, so every page has a fair chance to rank.' },
      { title: 'INTENT OVER VOLUME', text: 'We target the searches customers make when they are ready to act, not just the biggest numbers.' },
      { title: 'RESULTS THAT COMPOUND', text: 'Good SEO keeps working after it is published — each improvement builds on the last.' },
    ],
  },
  {
    slug: 'branding',
    num: '09',
    name: 'BRANDING',
    short: 'BRANDING',
    group: 'design',
    tagline: 'Build a brand people remember.',
    intro: [
      'Technology builds the infrastructure. Branding creates the identity.',
      'We create strategic and visual identities that make businesses recognisable, consistent, and professional.',
    ],
    summary:
      'Strategic and visual identities — positioning, voice, logo systems and guidelines — that make a business recognisable, consistent and professional everywhere it appears.',
    tags: ['Brand Positioning', 'Logo Systems', 'Visual Identity', 'Brand Guidelines', 'Brand Collateral'],
    sections: [
      {
        title: 'BRAND STRATEGY',
        items: [
          'Brand positioning', 'Brand purpose', 'Brand values', 'Target audience', 'Competitor analysis',
          'USP development', 'Brand personality', 'Brand voice', 'Messaging strategy', 'Taglines',
        ],
      },
      {
        title: 'VISUAL IDENTITY',
        items: [
          'Logo design', 'Logo systems', 'Colour palette', 'Typography', 'Brand patterns', 'Icons',
          'Visual language', 'Brand guidelines',
        ],
      },
      {
        title: 'BRAND COLLATERAL',
        items: [
          'Business cards', 'Letterheads', 'Company profiles', 'Brochures', 'Presentations',
          'Packaging concepts', 'Social media branding', 'Marketing materials',
        ],
      },
    ],
    flow: {
      title: 'FROM STRATEGY TO SYSTEM',
      text: 'Every identity we build moves through the same three layers.',
      steps: ['Strategy', 'Identity', 'Guidelines', 'Collateral'],
      joiner: '→',
    },
    highlights: [
      { title: 'STRATEGY BEFORE STYLE', text: 'Positioning, audience and voice are defined first, so the visuals express something true.' },
      { title: 'A SYSTEM, NOT A LOGO', text: 'Colour, type, patterns and icons work together as a kit any team can apply consistently.' },
      { title: 'CONSISTENT EVERYWHERE', text: 'From business cards to social posts, every touchpoint looks like it came from the same brand.' },
    ],
  },
  {
    slug: 'performance-media-marketing',
    num: '10',
    name: 'PERFORMANCE MEDIA & ROAS ACCELERATOR',
    short: 'PERFORMANCE MEDIA',
    group: 'growth',
    tagline: 'Turn visibility into growth.',
    intro: [
      'We help businesses create marketing strategies that connect the right message with the right audience.',
      'Campaigns are planned from strategy, built with sharp creative and optimised continuously against the numbers that matter.',
    ],
    summary:
      'Your brand in front of the right customer at the exact moment of intent. Full-funnel media acquisition across Meta Ads, Google Search & Performance Max, YouTube, and TikTok with scientific testing and aggressive ROAS governance.',
    tags: ['Meta Ads Scaling', 'Google Search & PMax', 'TikTok Performance', 'Multivariate Testing', 'ROAS Governance'],
    sections: [
      {
        title: 'DIGITAL MARKETING',
        items: [
          'Marketing strategy', 'Campaign planning', 'Lead generation', 'Conversion strategy',
          'Promotional campaigns', 'Digital campaigns', 'Audience research', 'Competitor analysis',
          'Campaign optimisation',
        ],
      },
      {
        title: 'PAID ADVERTISING',
        items: ['Meta Ads', 'Instagram Ads', 'Facebook Ads', 'Google Ads', 'YouTube Ads', 'LinkedIn Ads'],
      },
      {
        title: 'CAMPAIGN SERVICES',
        items: [
          'Campaign concepts', 'Ad creatives', 'Ad copy', 'Landing pages', 'Lead-generation campaigns',
          'Retargeting', 'Performance tracking',
        ],
      },
    ],
    flow: {
      title: 'THE CAMPAIGN LOOP',
      text: 'Budget follows evidence: each cycle tells us where the next one should go.',
      steps: ['Strategy', 'Creative', 'Launch', 'Measure', 'Optimise'],
      joiner: '→',
    },
    highlights: [
      { title: 'RIGHT MESSAGE, RIGHT MOMENT', text: 'Audience research shapes who sees what, so spend goes to people who are ready to listen.' },
      { title: 'CREATIVE THAT CONVERTS', text: 'Ad concepts, copy and landing pages are built together, so every click lands somewhere persuasive.' },
      { title: 'TESTED, NOT GUESSED', text: 'Structured testing and performance tracking decide where the budget goes next.' },
    ],
  },
  {
    slug: 'ui-ux-design',
    num: '11',
    name: 'UI/UX DESIGN',
    short: 'UI/UX',
    group: 'design',
    tagline: 'Make technology easier to use.',
    intro: ['We design interfaces that look good, feel intuitive, and help users complete tasks effortlessly.'],
    summary:
      'Research-led interface design for websites, apps and SaaS products — from user journeys and wireframes to polished UI and interactive prototypes.',
    tags: ['User Research', 'Wireframes', 'Design Systems', 'Interactive Prototypes', 'UX Audits'],
    sections: [
      {
        title: 'UX SERVICES',
        items: [
          'User research', 'User personas', 'Customer journeys', 'User flows', 'Information architecture',
          'Wireframes', 'UX audits', 'Usability improvement',
        ],
      },
      {
        title: 'UI SERVICES',
        items: [
          'Web UI', 'Mobile UI', 'Application interfaces', 'SaaS dashboards', 'Admin panels', 'Design systems',
          'Interactive prototypes', 'Responsive interfaces',
        ],
      },
    ],
    flow: {
      title: 'OUR PROCESS',
      text: 'Structure is solved before style, and every design is tested before it ships.',
      steps: ['Research', 'Structure', 'Wireframe', 'Design', 'Prototype', 'Test'],
      joiner: '→',
    },
    highlights: [
      { title: 'DESIGNED WITH USERS', text: 'Personas, journeys and testing keep real people at the centre of every decision.' },
      { title: 'CLARITY AT EVERY STEP', text: 'Information architecture and flows remove friction before a single pixel is styled.' },
      { title: 'SYSTEMS THAT SCALE', text: 'Design systems keep screens consistent and make future features faster to build.' },
    ],
  },
  {
    slug: 'e-commerce',
    num: '12',
    name: 'E-COMMERCE',
    short: 'E-COMMERCE',
    group: 'growth',
    tagline: 'Build stores designed to sell.',
    intro: [
      'We create e-commerce experiences that combine strong design, smooth user journeys, technology, and conversion-focused functionality.',
    ],
    summary:
      'Online stores designed to sell — product pages, checkout, payments and the automations that keep orders, inventory and customers moving.',
    tags: ['Store Development', 'Checkout Optimisation', 'Payment Integration', 'Shopify & WooCommerce', 'Abandoned-Cart Workflows'],
    sections: [
      {
        title: 'E-COMMERCE SERVICES',
        items: [
          'E-commerce website design', 'Store development', 'Product pages', 'Collection pages', 'Shopping carts',
          'Checkout optimisation', 'Payment integration', 'Product catalogue setup', 'Product descriptions',
          'Promotional banners', 'Conversion optimisation',
        ],
      },
      {
        title: 'PLATFORMS',
        items: ['Shopify', 'WooCommerce', 'Custom e-commerce solutions', 'Other platforms based on requirements'],
      },
      {
        title: 'E-COMMERCE AUTOMATION',
        items: [
          'Order notifications', 'Customer emails', 'Inventory workflows', 'Lead capture',
          'Abandoned-cart workflows', 'Customer follow-ups', 'Reporting automation',
        ],
      },
    ],
    flow: {
      title: 'THE BUYER JOURNEY',
      text: 'Every step from first glance to repeat order is designed — and the parts after checkout run themselves.',
      steps: ['Discover', 'Product', 'Cart', 'Checkout', 'Follow-up'],
      joiner: '→',
    },
    highlights: [
      { title: 'FRICTIONLESS CHECKOUT', text: 'Fewer steps, clear costs and trusted payments keep buyers moving toward the confirmation page.' },
      { title: 'PRODUCTS THAT PERSUADE', text: 'Imagery, copy and page structure answer buyer questions before they need to ask.' },
      { title: 'OPERATIONS ON AUTOPILOT', text: 'Order notifications, inventory workflows and cart recovery run quietly in the background.' },
    ],
  },
  {
    slug: 'google-business-local-presence',
    num: '13',
    name: 'GOOGLE BUSINESS & LOCAL PRESENCE',
    short: 'LOCAL PRESENCE',
    group: 'growth',
    tagline: 'Own your local digital presence.',
    intro: [
      'For local businesses, being visible when customers search is essential.',
      'We help businesses build and optimise their local digital presence.',
    ],
    summary:
      'Google Business Profile and local SEO that put your business on the map — literally — when nearby customers are searching.',
    tags: ['Profile Optimisation', 'Local SEO', 'Review Strategy', 'Local Landing Pages', 'Listing Optimisation'],
    sections: [
      {
        title: 'GOOGLE BUSINESS PROFILE',
        items: [
          'Profile setup', 'Profile optimisation', 'Business category selection', 'Service optimisation',
          'Business information', 'Photo optimisation', 'Review strategy', 'Post strategy',
        ],
      },
      {
        title: 'LOCAL PRESENCE',
        items: [
          'Local SEO', 'Local landing pages', 'Location-focused content', 'Business listing optimisation',
          'Search visibility', 'Reputation support',
        ],
      },
    ],
    idealFor: [
      'Restaurants', 'Clinics', 'Law firms', 'Real estate', 'Retail stores', 'Salons', 'Local services',
      'Professional businesses',
    ],
    highlights: [
      { title: 'FOUND NEARBY', text: 'Accurate categories, services and locations put you in front of people searching around the corner.' },
      { title: 'TRUST AT A GLANCE', text: 'Photos, reviews and complete details let the profile do the selling before anyone visits.' },
      { title: 'ACTIVE, NOT ABANDONED', text: 'Regular posts and review responses show customers the business is open and engaged.' },
    ],
  },
  {
    slug: 'social-media-management',
    num: '14',
    name: 'SOCIAL MEDIA MANAGEMENT',
    short: 'SOCIAL MEDIA',
    group: 'growth',
    tagline: 'Keep your brand active, relevant and consistent.',
    intro: ['Once the technology and strategy are in place, social media becomes a powerful growth channel.'],
    summary:
      'Always-on social presence — strategy, content calendars, captions, community management and reporting across Instagram, Facebook and LinkedIn.',
    tags: ['Social Strategy', 'Content Calendars', 'Community Management', 'Instagram & LinkedIn', 'Performance Reporting'],
    sections: [
      {
        title: 'STRATEGY & PLANNING',
        items: ['Social media strategy', 'Content calendars', 'Post scheduling', 'Hashtag strategy', 'Trend research'],
      },
      {
        title: 'PLATFORM MANAGEMENT',
        items: ['Instagram management', 'Facebook management', 'LinkedIn management', 'Captions'],
      },
      {
        title: 'COMMUNITY & REPORTING',
        items: ['Community management', 'Comment management', 'DM management', 'Performance reporting'],
      },
    ],
    flow: {
      title: 'THE MONTHLY RHYTHM',
      text: 'A predictable cycle keeps the feed consistent and the strategy learning.',
      steps: ['Plan', 'Create', 'Schedule', 'Engage', 'Report'],
      joiner: '→',
    },
    highlights: [
      { title: 'CONSISTENT PRESENCE', text: 'A planned calendar means the brand shows up every week — not only when someone has time.' },
      { title: 'CONVERSATIONS, NOT BROADCASTS', text: "Comments and DMs are managed, so followers feel heard and leads don't slip away." },
      { title: 'LEARN AND ADJUST', text: 'Monthly reporting shows what resonated and shapes the next calendar.' },
    ],
  },
  {
    slug: 'creative-services',
    num: '15',
    name: 'CREATIVE SERVICES',
    short: 'CREATIVE',
    group: 'creative',
    tagline: 'And then, we make it look incredible.',
    intro: [
      'Graphic design, video and content produced as one system — so every post, reel and campaign looks unmistakably like your brand.',
    ],
    summary:
      'Graphic design, video and content that bring the brand to life — social creatives, reels, motion graphics, copywriting and campaign concepts.',
    tags: ['Social Creatives', 'Reels & Shorts', 'Motion Graphics', 'Copywriting', 'Brand Storytelling'],
    sections: [
      {
        title: 'GRAPHIC DESIGN',
        items: [
          'Social media creatives', 'Posters', 'Flyers', 'Brochures', 'Carousels', 'Presentations',
          'Advertisements', 'Infographics', 'Marketing creatives',
        ],
      },
      {
        title: 'VIDEO',
        items: [
          'Reels', 'Shorts', 'Promotional videos', 'Brand videos', 'Video editing', 'Motion graphics',
          'Text animation', 'Subtitles', 'Social-first editing',
        ],
      },
      {
        title: 'CONTENT',
        items: [
          'Social media content', 'Copywriting', 'Scripts', 'Campaign concepts', 'Brand storytelling', 'Product content',
        ],
      },
    ],
    statement: {
      title: 'FOUNDATION & FEELING',
      lines: ['Technology builds the foundation.', 'Creative brings the brand to life.'],
    },
    highlights: [
      { title: 'ON-BRAND, EVERY TIME', text: 'Templates, type and colour rules keep every asset recognisably yours, even at volume.' },
      { title: 'MADE FOR THE FEED', text: 'Formats, pacing and subtitles are designed for how people actually scroll and watch.' },
      { title: 'IDEAS FIRST', text: 'Every asset starts from a concept and a message — never just a template.' },
    ],
  },
  {
    slug: 'photography-creative-production',
    num: '16',
    name: 'PHOTOGRAPHY & CREATIVE PRODUCTION',
    short: 'PHOTOGRAPHY',
    group: 'creative',
    tagline: 'Make your business look as good as it performs.',
    intro: [
      'From planning the shoot to the final retouch, we produce imagery that gives products, people and spaces the presence they deserve.',
    ],
    summary:
      'Product, food, brand, corporate and event photography — with creative direction, shoot planning and post-production handled end to end.',
    tags: ['Product Photography', 'Brand Photography', 'Creative Direction', 'Moodboards', 'Post-production'],
    sections: [
      {
        title: 'PHOTOGRAPHY',
        items: [
          'Product photography', 'Food photography', 'Brand photography', 'Corporate photography',
          'Event photography', 'Lifestyle photography',
        ],
      },
      {
        title: 'CREATIVE PRODUCTION',
        items: ['Creative direction', 'Shoot planning', 'Moodboards', 'Post-production'],
      },
    ],
    flow: {
      title: 'FROM BRIEF TO FINAL FRAME',
      text: 'Planning does the heavy lifting, so the shoot day is about capturing — not improvising.',
      steps: ['Moodboard', 'Shoot plan', 'Production', 'Post-production', 'Delivery'],
      joiner: '→',
    },
    highlights: [
      { title: 'DIRECTED, NOT JUST SHOT', text: 'Creative direction ties every frame to the brand story and where the images will live.' },
      { title: 'PLANNED TO THE SHOT', text: 'Moodboards and shot lists mean nothing important is left to chance on the day.' },
      { title: 'FINISHED TO PUBLISH', text: 'Post-production delivers files sized and graded for web, social and print.' },
    ],
  },
  {
    slug: 'presentations-business-materials',
    num: '17',
    name: 'PRESENTATIONS & BUSINESS MATERIALS',
    short: 'PRESENTATIONS',
    group: 'design',
    tagline: 'Make your ideas impossible to ignore.',
    intro: [
      'Pitch decks, proposals and company profiles designed with the care of a product launch — clear storylines, sharp visuals, zero clutter.',
    ],
    summary:
      'Pitch decks, investor decks, proposals, company profiles and reports — designed to make ideas clear, credible and memorable.',
    tags: ['Pitch Decks', 'Investor Decks', 'Company Profiles', 'Business Proposals', 'Sales Decks'],
    sections: [
      {
        title: 'DECKS',
        items: ['Pitch decks', 'Investor decks', 'Sales decks', 'Corporate presentations', 'Research presentations'],
      },
      {
        title: 'BUSINESS DOCUMENTS',
        items: ['Company profiles', 'Business proposals', 'Digital brochures', 'Catalogues', 'Reports'],
      },
    ],
    flow: {
      title: 'HOW A DECK COMES TOGETHER',
      text: 'The story is locked before the slides are styled.',
      steps: ['Message', 'Storyline', 'Structure', 'Design', 'Delivery'],
      joiner: '→',
    },
    highlights: [
      { title: 'STORY FIRST', text: 'A clear narrative arc turns a pile of slides into an argument people remember.' },
      { title: 'DATA MADE VISUAL', text: 'Numbers become charts and diagrams that land in seconds, not paragraphs.' },
      { title: 'READY FOR THE ROOM', text: 'Delivered as editable files that look as sharp on a projector as they do in an inbox.' },
    ],
  },
  {
    slug: 'personal-branding',
    num: '18',
    name: 'PERSONAL BRANDING',
    short: 'PERSONAL BRANDING',
    group: 'growth',
    tagline: 'Make the founder part of the story.',
    intro: [
      'We help founders, entrepreneurs, professionals, creators, and experts build their personal digital presence.',
    ],
    summary:
      'Personal brand strategy, LinkedIn and Instagram positioning, thought leadership and ghostwriting for founders and experts who want to be known for what they know.',
    tags: ['Founder Branding', 'LinkedIn Optimisation', 'Thought Leadership', 'Ghostwriting', 'Personal Website'],
    sections: [
      {
        title: 'STRATEGY & POSITIONING',
        items: ['Personal brand strategy', 'Founder branding', 'Thought leadership', 'Content strategy'],
      },
      {
        title: 'PLATFORMS',
        items: ['LinkedIn optimisation', 'Instagram positioning', 'Personal website', 'Portfolio development'],
      },
      {
        title: 'CONTENT',
        items: ['Ghostwriting', 'Personal content creation'],
      },
    ],
    idealFor: ['Founders', 'Entrepreneurs', 'Professionals', 'Creators', 'Experts'],
    highlights: [
      { title: 'PEOPLE TRUST PEOPLE', text: 'A visible founder gives the business a face, a voice and a reason to believe.' },
      { title: 'YOUR VOICE, AMPLIFIED', text: 'Ghostwriting captures how you actually think and speak — just more consistently.' },
      { title: 'AUTHORITY OVER TIME', text: 'Steady, useful content builds a reputation that opens doors on its own.' },
    ],
  },
  {
    slug: 'custom-digital-solutions',
    num: '19',
    name: 'CUSTOM DIGITAL SOLUTIONS',
    short: 'CUSTOM SOLUTIONS',
    group: 'technology',
    tagline: "Don't see what you need?",
    intro: [
      'Not every business fits into a predefined package.',
      'We combine any of our capabilities into a solution built specifically around your business — one partner for the complete digital ecosystem.',
    ],
    summary:
      'Not every business fits a package. We combine automation, AI, websites, apps, design, marketing, cloud, data and creative into one solution built around your business.',
    tags: ['Automation + AI', 'Website + App', 'Brand + Marketing', 'Cloud + Data', 'Bespoke Builds'],
    sections: [
      {
        title: 'TECHNOLOGY & INFRASTRUCTURE',
        items: [
          'Automation', 'AI Solutions', 'Website Services', 'Web Development', 'App Development', 'Cloud & IT',
          'Business Dashboards', 'Data Solutions',
        ],
      },
      {
        title: 'DIGITAL GROWTH',
        items: ['SEO', 'Digital Marketing', 'Paid Advertising', 'E-Commerce', 'Google Business', 'Local SEO', 'Social Media'],
      },
      {
        title: 'DESIGN & EXPERIENCE',
        items: ['UI/UX', 'Branding', 'Graphic Design', 'Creative Direction', 'Presentations', 'Corporate Design'],
      },
      {
        title: 'CONTENT & CREATIVE',
        items: [
          'Content Creation', 'Video Editing', 'Reels', 'Motion Graphics', 'Photography', 'Campaign Creatives',
          'Copywriting',
        ],
      },
    ],
    flow: {
      title: 'WE CAN COMBINE',
      text: 'to create a solution built specifically around your business.',
      steps: ['Automation', 'AI', 'Website', 'App', 'UI/UX', 'SEO', 'Branding', 'Marketing', 'Cloud', 'Data', 'Creative'],
      joiner: '+',
    },
    statement: {
      title: 'THE HIGHROLERS APPROACH',
      lines: ['One partner.', 'The complete digital ecosystem.'],
    },
    highlights: [
      { title: 'ONE PARTNER', text: 'Strategy, technology and creative under one roof — no hand-offs between agencies.' },
      { title: 'BUILT AROUND YOU', text: 'The scope is shaped by your goals and constraints, not by a fixed package.' },
      { title: 'FROM IDEA TO ECOSYSTEM', text: 'Start with one workflow or a full digital transformation — every piece is designed to connect.' },
    ],
  },
];

// Service shown expanded when the home accordion first renders
export const DEFAULT_OPEN_CAPABILITY = 'business-workflow-automation';

export const capabilityPath = (slug) => `/capabilities/${slug}`;

export const getCapability = (slug) => CAPABILITIES.find((c) => c.slug === slug);

export const getGroup = (id) => CAPABILITY_GROUPS.find((g) => g.id === id);

// Previous / next in numeric order, wrapping around
export function getAdjacentCapabilities(slug) {
  const index = CAPABILITIES.findIndex((c) => c.slug === slug);
  const total = CAPABILITIES.length;
  return {
    prev: CAPABILITIES[(index - 1 + total) % total],
    next: CAPABILITIES[(index + 1) % total],
  };
}

export const getRelatedCapabilities = (capability) =>
  CAPABILITIES.filter((c) => c.group === capability.group && c.slug !== capability.slug);
