/**
 * MotaGrowth Studio — Project Proposal Scope Wizard Engine (V8)
 * 
 * Order of flow:
 * 1. Select service
 * 2. Contact details (Name, Company, Email, Phone split, Location, Website, Business description)
 * 3. Service-specific scope questions
 * 4. Live scope estimate (Calculates estimated project price based on selections)
 * 5. Budget (Separate question near the end, including ad spend split for Performance Marketing)
 * 6. Start date (Priority qualification: ASAP, 1 month, 3 months, exploring)
 * 7. Additional notes (Optional long text)
 * 8. Submit & Agreement (Compares estimate with budget; guides phased/tailored next step)
 */

(function () {
  'use strict';

  // Comprehensive Country Dialing Codes List (Morocco +212 default)
  const COUNTRY_CODES = [
    { code: '+212', label: '🇲🇦 Morocco (+212)' },
    { code: '+34', label: '🇪🇸 Spain (+34)' },
    { code: '+33', label: '🇫🇷 France (+33)' },
    { code: '+1', label: '🇺🇸 United States / Canada (+1)' },
    { code: '+44', label: '🇬🇧 United Kingdom (+44)' },
    { code: '+971', label: '🇦🇪 United Arab Emirates (+971)' },
    { code: '+966', label: '🇸🇦 Saudi Arabia (+966)' },
    { code: '+974', label: '🇶🇦 Qatar (+974)' },
    { code: '+32', label: '🇧🇪 Belgium (+32)' },
    { code: '+41', label: '🇨🇭 Switzerland (+41)' },
    { code: '+49', label: '🇩🇪 Germany (+49)' },
    { code: '+31', label: '🇳🇱 Netherlands (+31)' },
    { code: '+39', label: '🇮🇹 Italy (+39)' },
    { code: '+351', label: '🇵🇹 Portugal (+351)' },
    { code: '+213', label: '🇩🇿 Algeria (+213)' },
    { code: '+216', label: '🇹🇳 Tunisia (+216)' },
    { code: '+20', label: '🇪🇬 Egypt (+20)' },
    { code: '+221', label: '🇸🇳 Senegal (+221)' },
    { code: '+225', label: '🇨🇮 Ivory Coast (+225)' },
    { code: '+965', label: '🇰🇼 Kuwait (+965)' },
    { code: '+973', label: '🇧🇭 Bahrain (+973)' },
    { code: '+968', label: '🇴🇲 Oman (+968)' },
    { code: '+961', label: '🇱🇧 Lebanon (+961)' },
    { code: '+962', label: '🇯🇴 Jordan (+962)' },
    { code: '+90', label: '🇹🇷 Turkey (+90)' },
    { code: '+61', label: '🇦🇺 Australia (+61)' },
    { code: '+86', label: '🇨🇳 China (+86)' },
    { code: '+65', label: '🇸🇬 Singapore (+65)' },
    { code: '+91', label: '🇮🇳 India (+91)' },
    { code: '+55', label: '🇧🇷 Brazil (+55)' },
    { code: '+52', label: '🇲🇽 Mexico (+52)' },
    { code: '+27', label: '🇿🇦 South Africa (+27)' },
    { code: '+234', label: '🇳🇬 Nigeria (+234)' },
    { code: '+353', label: '🇮🇪 Ireland (+353)' },
    { code: '+46', label: '🇸🇪 Sweden (+46)' },
    { code: '+47', label: '🇳🇴 Norway (+47)' },
    { code: '+45', label: '🇩🇰 Denmark (+45)' },
    { code: '+43', label: '🇦🇹 Austria (+43)' },
    { code: '+352', label: '🇱🇺 Luxembourg (+352)' },
    { code: '+377', label: '🇲🇨 Monaco (+377)' },
    { code: '+other', label: '🌐 Other Country (+)' }
  ];

  function detectDefaultCountryCode() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Casablanca')) return '+212';
      if (tz.includes('Madrid') || tz.includes('Canary')) return '+34';
      if (tz.includes('Paris')) return '+33';
      if (tz.includes('London')) return '+44';
      if (tz.includes('Dubai')) return '+971';
      if (tz.includes('Riyadh')) return '+966';
      if (tz.includes('Brussels')) return '+32';
      if (tz.includes('Zurich')) return '+41';
      if (tz.includes('Berlin')) return '+49';
      if (tz.includes('New_York') || tz.includes('Los_Angeles') || tz.includes('Chicago') || tz.includes('Toronto')) return '+1';
    } catch (e) {}
    return '+212'; // Default Morocco
  }

  // 1. Service Definitions & Scope Questions (Budget questions removed — moved to Step 5)
  const SERVICES = {
    'performance-marketing': {
      id: 'performance-marketing',
      title: 'Performance Marketing',
      discipline: 'Paid Acquisition & Revenue Scaling',
      price: 'From 5,000 MAD / month',
      shortPrice: '5,000 MAD / month',
      period: 'month',
      notice: 'Management starts at 5,000 MAD / month for one advertising platform. Advertising spend is separate. Additional platforms, creative production, and advanced funnel tracking are quoted according to scope.',
      questions: [
        {
          id: 'pm_goal',
          eyebrow: '01 / Goal Specification',
          title: 'What is your main goal?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'Increase online sales', label: 'Increase online sales' },
            { value: 'Generate qualified leads', label: 'Generate qualified leads' },
            { value: 'Get more bookings', label: 'Get more bookings' },
            { value: 'Generate WhatsApp inquiries', label: 'Generate WhatsApp inquiries' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          id: 'pm_platforms',
          eyebrow: '02 / Acquisition Channels',
          title: 'Which platforms are you interested in?',
          subtitle: 'Required · Select all that apply',
          type: 'multi',
          required: true,
          options: [
            { value: 'Meta — Instagram & Facebook', label: 'Meta — Instagram & Facebook' },
            { value: 'Google Ads', label: 'Google Ads' },
            { value: 'TikTok Ads', label: 'TikTok Ads' },
            { value: 'I need your recommendation', label: 'I need your recommendation' }
          ]
        },
        {
          id: 'pm_running_ads',
          eyebrow: '03 / Campaign Background',
          title: 'Are you currently running paid ads?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'Yes, managed internally', label: 'Yes, managed internally' },
            { value: 'Yes, with an agency or freelancer', label: 'Yes, with an agency or freelancer' },
            { value: 'No, this would be our first campaign', label: 'No, this would be our first campaign' }
          ]
        },
        {
          id: 'pm_content',
          eyebrow: '04 / Creative Production',
          title: 'Do you have existing ad content?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'Yes, photos and videos are ready', label: 'Yes, photos and videos are ready' },
            { value: 'Some content, but we need more', label: 'Some content, but we need more' },
            { value: 'No, we need creative support', label: 'No, we need creative support' }
          ]
        },
        {
          id: 'pm_improvements',
          eyebrow: '05 / Targets & Objectives',
          title: 'What would you like to achieve?',
          subtitle: 'Required · Long text',
          type: 'textarea',
          required: true,
          placeholder: 'Tell us about your targets, previous results, or biggest acquisition challenge.'
        }
      ]
    },
    'digital-architecture': {
      id: 'digital-architecture',
      title: 'Digital Architecture',
      discipline: 'Bespoke Web Design & Development',
      price: 'From 15,000 MAD / project',
      shortPrice: '15,000 MAD',
      period: 'project',
      notice: 'Projects start at 15,000 MAD for a bespoke showcase website of up to 5 pages. Custom booking flows, e-commerce, custom animations, hosting, and maintenance are quoted according to selected scope.',
      questions: [
        {
          id: 'da_build_type',
          eyebrow: '01 / Build Type',
          title: 'What are you looking to build?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'A new business website', label: 'A new business website' },
            { value: 'A redesign of an existing website', label: 'A redesign of an existing website' },
            { value: 'A landing page', label: 'A landing page' },
            { value: 'An e-commerce website', label: 'An e-commerce website' },
            { value: 'A custom platform or more complex project', label: 'A custom platform or more complex project' }
          ]
        },
        {
          id: 'da_goals',
          eyebrow: '02 / Strategic Outcomes',
          title: 'What should the website help your business achieve?',
          subtitle: 'Required · Select all that apply',
          type: 'multi',
          required: true,
          options: [
            { value: 'Generate inquiries', label: 'Generate inquiries' },
            { value: 'Sell products', label: 'Sell products' },
            { value: 'Drive bookings', label: 'Drive bookings' },
            { value: 'Present our brand and services', label: 'Present our brand and services' },
            { value: 'Showcase projects or a portfolio', label: 'Showcase projects or a portfolio' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          id: 'da_pages',
          eyebrow: '03 / Scope & Page Scale',
          title: 'Approximately how many pages do you need?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: '1–5 pages', label: '1–5 pages (Bespoke Showcase baseline)' },
            { value: '6–10 pages', label: '6–10 pages' },
            { value: 'More than 10 pages', label: 'More than 10 pages' },
            { value: 'I need guidance', label: 'I need guidance' }
          ]
        },
        {
          id: 'da_features',
          eyebrow: '04 / Interactive Features',
          title: 'Which features do you need?',
          subtitle: 'Required · Select all that apply',
          type: 'multi',
          required: true,
          options: [
            { value: 'Contact form / WhatsApp integration', label: 'Contact form / WhatsApp integration' },
            { value: 'Booking system', label: 'Booking system' },
            { value: 'Product catalogue', label: 'Product catalogue' },
            { value: 'Online payments', label: 'Online payments' },
            { value: 'Multiple languages', label: 'Multiple languages' },
            { value: 'Blog or editable content', label: 'Blog or editable content' },
            { value: 'Custom animations or 3D', label: 'Custom animations or 3D' },
            { value: 'CRM or other integrations', label: 'CRM or other integrations' },
            { value: 'Not sure yet', label: 'Not sure yet' }
          ]
        },
        {
          id: 'da_materials',
          eyebrow: '05 / Current Assets',
          title: 'What materials do you already have?',
          subtitle: 'Required · Select all that apply',
          type: 'multi',
          required: true,
          options: [
            { value: 'Logo and brand guidelines', label: 'Logo and brand guidelines' },
            { value: 'Website text', label: 'Website text' },
            { value: 'Professional photos or videos', label: 'Professional photos or videos' },
            { value: 'Domain and hosting', label: 'Domain and hosting' },
            { value: 'We need help with everything', label: 'We need help with everything' }
          ]
        },
        {
          id: 'da_examples',
          eyebrow: '06 / Design Benchmarks',
          title: 'Share up to three websites you like.',
          subtitle: 'Optional · Long text',
          type: 'textarea',
          required: false,
          placeholder: 'Paste the links and tell us what you like about them.'
        },
        {
          id: 'da_notes',
          eyebrow: '07 / Technical Context',
          title: 'Tell us anything else we should know about the website.',
          subtitle: 'Optional · Long text',
          type: 'textarea',
          required: false,
          placeholder: 'Share any important requirements, integrations, or specific wishes.'
        }
      ]
    },
    'creative-direction': {
      id: 'creative-direction',
      title: 'Creative Direction',
      discipline: 'Brand Identity & Visual Worlds',
      price: 'From 8,000 MAD / project',
      shortPrice: '8,000 MAD',
      period: 'project',
      notice: 'Projects start at 8,000 MAD for a core visual identity: logo system, color palette, typography, and concise brand guidelines. Photography, video production, packaging, and collateral are quoted according to selected scope.',
      questions: [
        {
          id: 'cd_stage',
          eyebrow: '01 / Brand Lifecycle',
          title: 'What stage is your brand at?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'Launching a new brand', label: 'Launching a new brand' },
            { value: 'Refreshing an existing identity', label: 'Refreshing an existing identity' },
            { value: 'Full rebrand', label: 'Full rebrand' },
            { value: 'Expanding an existing visual identity', label: 'Expanding an existing visual identity' }
          ]
        },
        {
          id: 'cd_customer',
          eyebrow: '02 / Customer Persona',
          title: 'Who is your ideal customer?',
          subtitle: 'Required · Long text',
          type: 'textarea',
          required: true,
          placeholder: 'Describe the people you want to attract and what matters to them.'
        },
        {
          id: 'cd_deliverables',
          eyebrow: '03 / Core Deliverables',
          title: 'What do you need us to create?',
          subtitle: 'Required · Select all that apply',
          type: 'multi',
          required: true,
          options: [
            { value: 'Logo and core visual identity', label: 'Logo and core visual identity' },
            { value: 'Brand guidelines', label: 'Brand guidelines' },
            { value: 'Social media and digital assets', label: 'Social media and digital assets' },
            { value: 'Packaging', label: 'Packaging' },
            { value: 'Menus, print, or hospitality collateral', label: 'Menus, print, or hospitality collateral' },
            { value: 'Photography or video creative direction', label: 'Photography or video creative direction' },
            { value: 'A complete brand system', label: 'A complete brand system' }
          ]
        },
        {
          id: 'cd_aesthetic',
          eyebrow: '04 / Aesthetic Tone',
          title: 'How should your brand look and feel?',
          subtitle: 'Required · Long text',
          type: 'textarea',
          required: true,
          placeholder: 'Describe the impression you want to create—e.g., refined, bold, understated, editorial, or energetic.'
        },
        {
          id: 'cd_existing_materials',
          eyebrow: '05 / Reference Material',
          title: 'Do you have an existing identity or reference materials?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'Yes, we can share them', label: 'Yes, we can share them' },
            { value: 'Some materials, but no clear identity', label: 'Some materials, but no clear identity' },
            { value: 'No, we’re starting from scratch', label: 'No, we’re starting from scratch' }
          ]
        },
        {
          id: 'cd_references',
          eyebrow: '06 / Visual References',
          title: 'Share brands or visual references you admire.',
          subtitle: 'Optional · Long text',
          type: 'textarea',
          required: false,
          placeholder: 'Add links and briefly explain what appeals to you.'
        },
        {
          id: 'cd_launch_essentials',
          eyebrow: '07 / Launch Priorities',
          title: 'Which deliverables are essential for launch?',
          subtitle: 'Required · Long text',
          type: 'textarea',
          required: true,
          placeholder: 'List the assets strictly required for your target launch date.'
        }
      ]
    },
    'conversion-strategy': {
      id: 'conversion-strategy',
      title: 'Conversion Strategy',
      discipline: 'Conversion Rate Optimization',
      price: 'Audits from 5,000 MAD',
      shortPrice: '5,000 MAD',
      period: 'project',
      notice: 'Audits start at 5,000 MAD for one website or funnel, including a conversion review and prioritized improvement plan. Direct implementation and ongoing testing are quoted according to scope.',
      questions: [
        {
          id: 'cs_website',
          eyebrow: '01 / Target URL',
          title: 'Which website or funnel would you like us to review?',
          subtitle: 'Required · Valid URL',
          type: 'url',
          required: true,
          placeholder: 'https://yourdomain.com'
        },
        {
          id: 'cs_action',
          eyebrow: '02 / Target Conversion',
          title: 'What action do you want more visitors to take?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'Complete a purchase', label: 'Complete a purchase' },
            { value: 'Submit an inquiry', label: 'Submit an inquiry' },
            { value: 'Book an appointment', label: 'Book an appointment' },
            { value: 'Contact us on WhatsApp', label: 'Contact us on WhatsApp' },
            { value: 'Sign up or register', label: 'Sign up or register' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          id: 'cs_visitors',
          eyebrow: '03 / Monthly Traffic',
          title: 'Approximately how many monthly visitors do you receive?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'Under 1,000', label: 'Under 1,000' },
            { value: '1,000–4,999', label: '1,000–4,999' },
            { value: '5,000–19,999', label: '5,000–19,999' },
            { value: '20,000 or more', label: '20,000 or more' },
            { value: 'I don’t know', label: 'I don’t know' }
          ]
        },
        {
          id: 'cs_challenges',
          eyebrow: '04 / Friction Points',
          title: 'What is your biggest conversion challenge?',
          subtitle: 'Required · Select all that apply',
          type: 'multi',
          required: true,
          options: [
            { value: 'Visitors don’t submit inquiries', label: 'Visitors don’t submit inquiries' },
            { value: 'Visitors abandon checkout', label: 'Visitors abandon checkout' },
            { value: 'Landing pages aren’t converting', label: 'Landing pages aren’t converting' },
            { value: 'Mobile users drop off', label: 'Mobile users drop off' },
            { value: 'Bookings or WhatsApp inquiries are low', label: 'Bookings or WhatsApp inquiries are low' },
            { value: 'We don’t know where the problem is', label: 'We don’t know where the problem is' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          id: 'cs_tools',
          eyebrow: '05 / Tracking Infrastructure',
          title: 'Which tracking tools are currently installed?',
          subtitle: 'Optional · Select all that apply',
          type: 'multi',
          required: false,
          options: [
            { value: 'Google Analytics', label: 'Google Analytics' },
            { value: 'Meta Pixel', label: 'Meta Pixel' },
            { value: 'Heatmap or session-recording tools', label: 'Heatmap or session-recording tools' },
            { value: 'Other tools', label: 'Other tools' },
            { value: 'None / Not sure', label: 'None / Not sure' }
          ]
        },
        {
          id: 'cs_rate',
          eyebrow: '06 / Current Baseline',
          title: 'Do you know your current conversion rate?',
          subtitle: 'Optional · Short text',
          type: 'text',
          required: false,
          placeholder: 'Enter your approximate rate, or leave blank if unknown.'
        },
        {
          id: 'cs_support',
          eyebrow: '07 / Scope of Support',
          title: 'What kind of support are you looking for?',
          subtitle: 'Required · Single selection',
          type: 'single',
          required: true,
          options: [
            { value: 'Audit and recommendations', label: 'Audit and recommendations' },
            { value: 'Audit plus implementation', label: 'Audit plus implementation' },
            { value: 'Ongoing optimization and testing', label: 'Ongoing optimization and testing' },
            { value: 'I need your recommendation', label: 'I need your recommendation' }
          ]
        }
      ]
    }
  };

  // 2. Universal Contact Questions (1 Question per step)
  const UNIVERSAL_CONTACT_QUESTIONS = [
    {
      id: 'fullName',
      eyebrow: 'Your Details · 01',
      title: 'What’s your full name?',
      subtitle: 'Required · We will address you personally',
      type: 'text',
      required: true,
      placeholder: 'e.g. Alex Morgan',
      autocomplete: 'name'
    },
    {
      id: 'companyName',
      eyebrow: 'Your Details · 02',
      title: 'What’s your company or brand name?',
      subtitle: 'Required · Commercial or brand designation',
      type: 'text',
      required: true,
      placeholder: 'e.g. Maison Atelier',
      autocomplete: 'organization'
    },
    {
      id: 'email',
      eyebrow: 'Your Details · 03',
      title: 'What’s your email address?',
      subtitle: 'Required · Where we send your brief evaluation & proposal',
      type: 'email',
      required: true,
      placeholder: 'name@company.com',
      autocomplete: 'email'
    },
    {
      id: 'phone',
      eyebrow: 'Your Details · 04',
      title: 'What’s your WhatsApp number?',
      subtitle: 'Required · Select your country code and enter your number',
      type: 'phone_split',
      required: true,
      placeholder: '6 12 34 56 78',
      autocomplete: 'tel-national'
    },
    {
      id: 'location',
      eyebrow: 'Your Details · 05',
      title: 'Where is your business based?',
      subtitle: 'Required · Country and city of operation',
      type: 'text',
      required: true,
      placeholder: 'e.g. Morocco, Casablanca'
    },
    {
      id: 'website',
      eyebrow: 'Your Details · 06',
      title: 'What’s your website or social media profile?',
      subtitle: 'Optional · Share a direct URL or @handle',
      type: 'text',
      required: false,
      placeholder: 'https://... or @instagram'
    },
    {
      id: 'businessDescription',
      eyebrow: 'Your Details · 07',
      title: 'Briefly describe your business.',
      subtitle: 'Required',
      helper: 'What do you sell, who are your customers, and where do you operate?',
      type: 'textarea',
      required: true,
      placeholder: 'What do you sell, who are your customers, and where do you operate?'
    }
  ];

  // Helper: Format MAD Currency
  function formatMAD(amount) {
    return new Intl.NumberFormat('en-US').format(amount) + ' MAD';
  }

  // 3. Dynamic Scope Pricing Calculator
  function calculateScopeEstimate(serviceKey, answers) {
    answers = answers || {};
    let amount = 15000;
    let period = 'project';
    let scopeSummary = '';
    let pills = [];
    let inclusions = [];

    if (serviceKey === 'digital-architecture') {
      amount = 15000; // Baseline 5-page bespoke showcase
      period = 'project';
      const pages = answers['da_pages'] || '1–5 pages';
      const buildType = answers['da_build_type'] || 'A new business website';
      const features = Array.isArray(answers['da_features']) ? answers['da_features'] : [];

      let pageLabel = '5-page website';
      if (pages.includes('6–10')) {
        amount += 5000;
        pageLabel = '6–10 page website';
      } else if (pages.includes('More than 10')) {
        amount += 12000;
        pageLabel = '10+ page scalable website';
      }

      if (buildType.includes('e-commerce')) {
        amount += 8000;
      } else if (buildType.includes('custom platform')) {
        amount += 15000;
      } else if (buildType.includes('landing page')) {
        amount = Math.max(11000, amount - 4000);
        pageLabel = 'High-converting landing page';
      }

      pills.push(pageLabel);

      const featureLabels = [];
      if (features.includes('Booking system')) {
        amount += 6000;
        featureLabels.push('booking system');
        pills.push('Booking system');
      }
      if (features.includes('Online payments')) {
        amount += 5000;
        featureLabels.push('online checkout');
        pills.push('Online payments');
      }
      if (features.includes('Product catalogue')) {
        amount += 4000;
        featureLabels.push('product catalogue');
        pills.push('Product catalogue');
      }
      if (features.includes('Multiple languages')) {
        amount += 3500;
        featureLabels.push('multilingual');
        pills.push('Multiple languages');
      }
      if (features.includes('Custom animations or 3D')) {
        amount += 5000;
        featureLabels.push('custom animations');
        pills.push('3D & Custom Animations');
      }
      if (features.includes('CRM or other integrations')) {
        amount += 4000;
        featureLabels.push('CRM integration');
        pills.push('CRM Sync');
      }
      if (features.includes('Contact form / WhatsApp integration')) {
        featureLabels.push('WhatsApp integration');
        pills.push('WhatsApp Integration');
      }

      if (featureLabels.length > 0) {
        scopeSummary = `${pageLabel} + ${featureLabels.join(' + ')}`;
      } else {
        scopeSummary = `${pageLabel} bespoke showcase website`;
      }

      inclusions = [
        'Bespoke visual architecture & responsive UI/UX',
        'Direct WhatsApp & interactive inquiry funnel',
        'Mobile performance & technical SEO foundation',
        'Content management system & live deployment'
      ];
    } else if (serviceKey === 'performance-marketing') {
      amount = 5000;
      period = 'month';
      const platforms = Array.isArray(answers['pm_platforms']) ? answers['pm_platforms'] : [];
      const content = answers['pm_content'] || '';

      let channelCount = platforms.filter(p => !p.includes('recommendation')).length;
      if (channelCount >= 3) {
        amount += 4500;
      } else if (channelCount === 2) {
        amount += 2500;
      }

      const activeChannels = platforms.length > 0 ? platforms.map(p => p.split('—')[0].trim()).join(' + ') : 'Meta & Google';
      pills.push(activeChannels);

      if (content.includes('need creative support')) {
        amount += 3000;
        scopeSummary = `${activeChannels} · Campaign architecture & full creative production`;
        pills.push('Creative Video & Ad Production');
      } else if (content.includes('Some content')) {
        amount += 1500;
        scopeSummary = `${activeChannels} · Campaign management & creative remixing`;
        pills.push('Creative Asset Enhancement');
      } else {
        scopeSummary = `${activeChannels} · Paid campaign management & optimization`;
        pills.push('Media Buying & Funnel Optimization');
      }

      inclusions = [
        'Full campaign setup & ad account architecture',
        'Weekly optimization, bid adjustments & scaling',
        'Real-time conversion tracking & CAPI validation',
        'Executive bi-weekly reporting & CAC / ROAS dashboard'
      ];
    } else if (serviceKey === 'creative-direction') {
      amount = 8000;
      period = 'project';
      const stage = answers['cd_stage'] || '';
      const deliverables = Array.isArray(answers['cd_deliverables']) ? answers['cd_deliverables'] : [];

      if (stage.includes('Full rebrand')) amount += 6000;
      else if (stage.includes('Expanding')) amount += 3000;
      else if (stage.includes('Refreshing')) amount += 2000;

      pills.push('Core Visual Identity');

      const extraItems = [];
      if (deliverables.includes('A complete brand system')) {
        amount += 10000;
        extraItems.push('complete brand universe');
        pills.push('Complete Brand Universe');
      }
      if (deliverables.includes('Packaging')) {
        amount += 6000;
        extraItems.push('packaging design');
        pills.push('Luxury Packaging');
      }
      if (deliverables.includes('Photography or video creative direction')) {
        amount += 5000;
        extraItems.push('photoshoot art direction');
        pills.push('Art & Shoot Direction');
      }
      if (deliverables.includes('Social media and digital assets')) {
        amount += 3000;
        extraItems.push('digital & social kit');
        pills.push('Digital Brand Kit');
      }
      if (deliverables.includes('Menus, print, or hospitality collateral')) {
        amount += 3500;
        extraItems.push('hospitality collateral');
        pills.push('Hospitality Print Collateral');
      }

      if (extraItems.length > 0) {
        scopeSummary = `Core visual identity + ${extraItems.join(' + ')}`;
      } else {
        scopeSummary = `Core brand identity system & comprehensive guidelines`;
      }

      inclusions = [
        'Distinctive logo system & responsive marks',
        'Curated color harmonies & typography hierarchy',
        'Comprehensive brand guidelines (PDF & digital)',
        'Vector source master files ready for production'
      ];
    } else if (serviceKey === 'conversion-strategy') {
      amount = 5000;
      period = 'project';
      const support = answers['cs_support'] || 'Audit and recommendations';
      const visitors = answers['cs_visitors'] || '';

      if (support.includes('Audit plus implementation')) {
        amount += 7000;
        scopeSummary = 'Full conversion funnel audit + direct UI implementation';
        pills.push('Audit & Implementation');
      } else if (support.includes('Ongoing optimization')) {
        amount += 10000;
        period = 'month';
        scopeSummary = 'Ongoing conversion rate optimization & split-testing program';
        pills.push('Continuous CRO Program');
      } else {
        scopeSummary = 'Diagnostic funnel audit & prioritized CRO roadmap';
        pills.push('Funnel Audit & Roadmap');
      }

      if (visitors.includes('20,000 or more')) {
        amount += 3000;
        pills.push('High-Traffic Optimization');
      }

      inclusions = [
        'Heuristic UI/UX friction analysis across mobile & desktop',
        'Checkout, lead form & micro-conversion drop-off audit',
        'Prioritized ICE impact roadmap with quick wins',
        'Direct consultation call with senior conversion strategist'
      ];
    }

    return {
      amount,
      formattedPrice: formatMAD(amount),
      period,
      scopeSummary,
      pills,
      inclusions
    };
  }

  // Parse Budget String into min/max range
  function parseBudgetRange(str) {
    if (!str) return { min: 0, max: Infinity, isGuidance: true };
    if (str.includes('Under 5,000')) return { min: 0, max: 4999 };
    if (str.includes('5,000–9,999')) return { min: 5000, max: 9999 };
    if (str.includes('10,000–19,999')) return { min: 10000, max: 19999 };
    if (str.includes('10,000–24,999')) return { min: 10000, max: 24999 };
    if (str.includes('20,000–39,999')) return { min: 20000, max: 39999 };
    if (str.includes('25,000–49,999')) return { min: 25000, max: 49999 };
    if (str.includes('40,000–74,999')) return { min: 40000, max: 74999 };
    if (str.includes('25,000 MAD or more')) return { min: 25000, max: Infinity };
    if (str.includes('75,000 MAD or more') || str.includes('60,000 MAD or more') || str.includes('50,000 MAD or more') || str.includes('100,000 MAD or more')) return { min: 75000, max: Infinity };
    if (str.includes('guidance') || str.includes('Not decided') || str.includes('Flexible')) return { min: 0, max: Infinity, isGuidance: true };
    return { min: 0, max: Infinity };
  }

  // 4. Wizard State Store
  const state = {
    selectedService: 'performance-marketing',
    answers: {
      phoneCountryCode: detectDefaultCountryCode(),
      phoneNumberRaw: ''
    },
    currentStepIndex: 0
  };

  // Pre-seed from URL params if available
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && SERVICES[serviceParam]) {
      state.selectedService = serviceParam;
      state.answers['selectedService'] = serviceParam;
    }
  } catch (e) {}

  // 5. Build dynamic question chain based on user's exact 8-stage sequence
  function getQuestionsList() {
    // Stage 1: Service Selection
    const serviceQuestion = {
      id: 'selectedService',
      eyebrow: '01 / Scope Foundation',
      title: 'Which service are you interested in?',
      subtitle: 'Required · Single selection · Select to view tailored scope',
      type: 'service_select',
      required: true,
      options: [
        {
          value: 'performance-marketing',
          label: 'Performance Marketing',
          price: 'From 5,000 MAD / month',
          desc: 'Paid Acquisition & Revenue Scaling across Meta, Google & TikTok'
        },
        {
          value: 'digital-architecture',
          label: 'Digital Architecture',
          price: 'From 15,000 MAD / project',
          desc: 'Bespoke Web Design & Development (Up to 5 pages baseline)'
        },
        {
          value: 'creative-direction',
          label: 'Creative Direction',
          price: 'From 8,000 MAD / project',
          desc: 'Brand Identity, Visual Worlds & Design Collateral'
        },
        {
          value: 'conversion-strategy',
          label: 'Conversion Strategy',
          price: 'Audits from 5,000 MAD',
          desc: 'Conversion Rate Optimization & Funnel Friction Audits'
        }
      ]
    };

    // Stage 2: Universal Contact Questions (7 items)
    // Stage 3: Service-Specific Scope Questions
    const currentService = SERVICES[state.selectedService] || SERVICES['performance-marketing'];
    const serviceSpecific = currentService.questions;

    // Stage 4: Live Scope Estimate Question
    const scopeEstimateQuestion = {
      id: 'liveScopeEstimate',
      eyebrow: 'Investment Scope Calculation',
      title: 'Your Tailored Scope Estimate',
      subtitle: 'Calculated in real-time based on your selected features & specifications',
      type: 'scope_estimate',
      required: false
    };

    // Stage 5: Budget Question(s)
    const budgetQuestions = [];
    if (state.selectedService === 'performance-marketing') {
      budgetQuestions.push({
        id: 'pm_management_budget',
        eyebrow: 'Budget Qualification · 01',
        title: 'What is your monthly budget for advertising and marketing?',
        subtitle: 'Required · Single selection',
        helper: 'This covers campaign strategy, architecture, testing, and weekly optimization.',
        type: 'single',
        required: true,
        options: [
          { value: 'Under 5,000 MAD', label: 'Under 5,000 MAD', badge: 'Low-budget lead' },
          { value: '5,000–9,999 MAD', label: '5,000–9,999 MAD', badge: 'Entry-level projects' },
          { value: '10,000–19,999 MAD', label: '10,000–19,999 MAD', badge: 'Standard small-business projects' },
          { value: '20,000–39,999 MAD', label: '20,000–39,999 MAD', badge: 'Larger websites, branding, or CRO work' },
          { value: '40,000–74,999 MAD', label: '40,000–74,999 MAD', badge: 'Premium or multi-feature projects' },
          { value: '75,000 MAD or more', label: '75,000 MAD or more', badge: 'High-end / complex projects' },
          { value: 'I need guidance on the right budget', label: 'I need guidance on the right budget', badge: 'Consultation lead' }
        ]
      });

      budgetQuestions.push({
        id: 'pm_ad_spend',
        eyebrow: 'Budget Qualification · 02',
        title: 'What is your planned monthly advertising spend?',
        subtitle: 'Required · Single selection',
        helper: 'This separates your management fee from the money paid directly to Meta, Google, or TikTok.',
        type: 'single',
        required: true,
        options: [
          { value: 'Under 5,000 MAD', label: 'Under 5,000 MAD', badge: 'Small campaigns' },
          { value: '5,000–9,999 MAD', label: '5,000–9,999 MAD', badge: 'Entry-level campaigns' },
          { value: '10,000–24,999 MAD', label: '10,000–24,999 MAD', badge: 'Standard campaigns' },
          { value: '25,000 MAD or more', label: '25,000 MAD or more', badge: 'Scaling campaigns' },
          { value: 'Not decided yet', label: 'Not decided yet', badge: 'Needs guidance' }
        ]
      });
    } else {
      budgetQuestions.push({
        id: 'project_budget',
        eyebrow: 'Budget Qualification',
        title: 'What is your budget for this project?',
        subtitle: 'Required · Single selection',
        helper: 'This allows us to evaluate initial proposal alignment and recommend appropriate scoping.',
        type: 'single',
        required: true,
        options: [
          { value: 'Under 5,000 MAD', label: 'Under 5,000 MAD', badge: 'Low-budget lead' },
          { value: '5,000–9,999 MAD', label: '5,000–9,999 MAD', badge: 'Entry-level projects' },
          { value: '10,000–19,999 MAD', label: '10,000–19,999 MAD', badge: 'Standard small-business projects' },
          { value: '20,000–39,999 MAD', label: '20,000–39,999 MAD', badge: 'Larger websites, branding, or CRO work' },
          { value: '40,000–74,999 MAD', label: '40,000–74,999 MAD', badge: 'Premium or multi-feature projects' },
          { value: '75,000 MAD or more', label: '75,000 MAD or more', badge: 'High-end / complex projects' },
          { value: 'I need guidance on the right budget', label: 'I need guidance on the right budget', badge: 'Consultation lead' }
        ]
      });
    }

    // Stage 6: Start Date / Priority Question
    const timelineQuestion = {
      id: 'timeline',
      eyebrow: 'Project Priority & Timing',
      title: 'How soon do you want to start?',
      subtitle: 'Required · Single selection',
      type: 'single',
      required: true,
      options: [
        { value: 'As soon as possible', label: 'As soon as possible', badge: 'High priority', badgeClass: 'p-high' },
        { value: 'Within one month', label: 'Within one month', badge: 'High priority', badgeClass: 'p-high' },
        { value: 'Within three months', label: 'Within three months', badge: 'Medium priority', badgeClass: 'p-med' },
        { value: 'I’m exploring options', label: 'I’m exploring options', badge: 'Low priority', badgeClass: 'p-low' }
      ]
    };

    // Stage 7: Additional Notes Question
    const notesQuestion = {
      id: 'additionalNotes',
      eyebrow: 'Additional Details',
      title: 'Anything else we should know?',
      subtitle: 'Optional · Long text',
      type: 'textarea',
      required: false,
      placeholder: 'Share any important requirements, specific deadlines, or context.'
    };

    // Stage 8: Scope Review & Comparison / Submit
    const agreementQuestion = {
      id: 'reviewAgreement',
      eyebrow: 'Inquiry Review & Alignment',
      title: 'Let’s build your next stage of growth.',
      subtitle: 'Review how your scope aligns with your budget before submitting.',
      type: 'agreement',
      required: true
    };

    return [
      serviceQuestion,
      ...UNIVERSAL_CONTACT_QUESTIONS,
      ...serviceSpecific,
      scopeEstimateQuestion,
      ...budgetQuestions,
      timelineQuestion,
      notesQuestion,
      agreementQuestion
    ];
  }

  // DOM Elements
  const stageEl = document.getElementById('wizardStage');
  const stepBadgeEl = document.getElementById('wizardStepBadge');
  const servicePillEl = document.getElementById('wizardServicePill');
  const progressFillEl = document.getElementById('wizardProgressFill');
  const backBtn = document.getElementById('wizardBackBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const hintEl = document.getElementById('wizardHint');
  const errorBanner = document.getElementById('wizardErrorBanner');
  const errorText = document.getElementById('wizardErrorText');

  function showStepError(msg) {
    if (errorText) errorText.textContent = msg;
    if (errorBanner) {
      errorBanner.style.display = 'flex';
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function clearStepError() {
    if (errorBanner) errorBanner.style.display = 'none';
    if (errorText) errorText.textContent = '';
  }

  function validateCurrentStep() {
    const list = getQuestionsList();
    const q = list[state.currentStepIndex];
    if (!q) return true;

    clearStepError();

    // Agreement Step Validation
    if (q.type === 'agreement') {
      const chk = document.getElementById('qAgreeCheckbox');
      if (!chk || !chk.checked) {
        showStepError('Please acknowledge the scope estimate to submit your inquiry.');
        return false;
      }
      return true;
    }

    // Live Scope Estimate step has no validation
    if (q.type === 'scope_estimate') {
      return true;
    }

    // Split Phone Validation
    if (q.type === 'phone_split') {
      const rawDigits = (state.answers['phoneNumberRaw'] || '').replace(/\D/g, '');
      if (rawDigits.length < 6) {
        showStepError('Please enter your valid phone number in the number box (at least 6 digits).');
        const phoneBox = document.getElementById('activePhoneNumber');
        if (phoneBox) phoneBox.classList.add('has-error');
        return false;
      }
      return true;
    }

    const val = state.answers[q.id];

    if (q.required) {
      if (val === undefined || val === null || val === '') {
        showStepError('Please complete this required question to continue.');
        return false;
      }
      if (Array.isArray(val) && val.length === 0) {
        showStepError('Please select at least one option to continue.');
        return false;
      }
      if (q.type === 'email') {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(val)) {
          showStepError('Please enter a valid email address (e.g. name@company.com).');
          return false;
        }
      }
      if (q.type === 'url') {
        const urlStr = val.startsWith('http://') || val.startsWith('https://') ? val : `https://${val}`;
        try {
          new URL(urlStr);
          state.answers[q.id] = urlStr;
        } catch (e) {
          showStepError('Please enter a valid website address (e.g. yourdomain.com).');
          return false;
        }
      }
    }

    return true;
  }

  function renderStep(direction) {
    if (!stageEl) return;

    clearStepError();

    const list = getQuestionsList();
    const total = list.length;
    const currentQ = list[state.currentStepIndex];

    if (!currentQ) return;

    // Update Progress Bar & Counter
    const progressPercent = Math.round(((state.currentStepIndex + 1) / total) * 100);
    if (progressFillEl) {
      progressFillEl.style.width = `${progressPercent}%`;
    }

    if (stepBadgeEl) {
      stepBadgeEl.textContent = `Question ${state.currentStepIndex + 1} of ${total}`;
    }

    if (servicePillEl) {
      const currentSvc = SERVICES[state.selectedService];
      if (currentSvc && state.currentStepIndex > 0) {
        servicePillEl.textContent = `${currentSvc.title} (${currentSvc.shortPrice})`;
        servicePillEl.style.display = 'inline-flex';
      } else {
        servicePillEl.style.display = 'none';
      }
    }

    // Update Bottom Navigation Buttons
    if (backBtn) {
      backBtn.disabled = (state.currentStepIndex === 0);
    }

    if (nextBtn) {
      if (currentQ.type === 'agreement') {
        nextBtn.innerHTML = `<span>Send My Project Inquiry ↗</span>`;
        nextBtn.classList.add('btn-wizard-submit');
      } else if (currentQ.type === 'scope_estimate') {
        nextBtn.innerHTML = `<span>Review Budget &amp; Next Steps</span><span class="btn-arrow">→</span>`;
        nextBtn.classList.remove('btn-wizard-submit');
      } else {
        nextBtn.innerHTML = `<span>Continue</span><span class="btn-arrow">→</span>`;
        nextBtn.classList.remove('btn-wizard-submit');
      }
    }

    // Update Helper Hint
    if (hintEl) {
      if (currentQ.type === 'service_select' || currentQ.type === 'single') {
        hintEl.innerHTML = `<span>Select an option to proceed · or press <kbd>Enter ↵</kbd></span>`;
      } else if (currentQ.type === 'multi') {
        hintEl.innerHTML = `<span>Select all that apply · then click Continue</span>`;
      } else if (currentQ.type === 'phone_split') {
        hintEl.innerHTML = `<span>Select code &amp; enter number · press <kbd>Enter ↵</kbd></span>`;
      } else if (currentQ.type === 'scope_estimate') {
        hintEl.innerHTML = `<span>Click Continue to match with your planned budget</span>`;
      } else if (currentQ.type === 'textarea') {
        hintEl.innerHTML = `<span>Shift + Enter for new line · or click Continue</span>`;
      } else {
        hintEl.innerHTML = `<span>Press <kbd>Enter ↵</kbd> to continue</span>`;
      }
    }

    // Build Step HTML
    let bodyHtml = '';

    if (currentQ.type === 'service_select') {
      bodyHtml = `
        <div class="q-service-selector-grid" role="radiogroup" aria-label="Which service are you interested in?">
          ${currentQ.options.map((opt, idx) => {
            const isChecked = state.selectedService === opt.value;
            const letter = String.fromCharCode(65 + idx);
            return `
              <div class="q-service-box ${isChecked ? 'is-selected' : ''}" data-value="${opt.value}" role="radio" aria-checked="${isChecked}" tabindex="0">
                <div class="q-service-box-top">
                  <span class="q-key-pill">${letter}</span>
                  <span class="q-check-circle">${isChecked ? '✓' : ''}</span>
                </div>
                <h4 class="q-service-box-title">${opt.label}</h4>
                <div class="q-service-box-price">${opt.price}</div>
                <p class="q-service-box-desc">${opt.desc}</p>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (currentQ.type === 'phone_split') {
      const activeCode = state.answers['phoneCountryCode'] || detectDefaultCountryCode();
      const activeNumber = state.answers['phoneNumberRaw'] || '';
      bodyHtml = `
        <div class="q-phone-split-group">
          <div>
            <label for="activeCountryCode" class="q-recap-lbl" style="margin-bottom: 0.35rem; display: block;">Country Code</label>
            <select class="q-input q-country-code-select" id="activeCountryCode" aria-label="Country Code">
              ${COUNTRY_CODES.map(c => `
                <option value="${c.code}" ${c.code === activeCode ? 'selected' : ''}>
                  ${c.label}
                </option>
              `).join('')}
            </select>
          </div>
          <div>
            <label for="activePhoneNumber" class="q-recap-lbl" style="margin-bottom: 0.35rem; display: block;">Phone Number</label>
            <input type="tel"
                   class="q-input q-wizard-input q-phone-number-input"
                   id="activePhoneNumber"
                   placeholder="6 12 34 56 78"
                   value="${escapeHtml(activeNumber)}"
                   autocomplete="tel-national">
          </div>
        </div>
      `;
    } else if (currentQ.type === 'single') {
      const currentVal = state.answers[currentQ.id];
      bodyHtml = `
        ${currentQ.helper ? `<p class="q-step-helper-box"><span class="helper-icon">ℹ</span> ${currentQ.helper}</p>` : ''}
        <div class="q-options-stack" role="radiogroup" aria-label="${currentQ.title}">
          ${currentQ.options.map((opt, idx) => {
            const isChecked = currentVal === opt.value;
            const letter = String.fromCharCode(65 + idx);
            const badgeHtml = opt.badge ? `<span class="q-option-badge ${opt.badgeClass || ''}">${opt.badge}</span>` : '';
            return `
              <div class="q-option-row ${isChecked ? 'is-selected' : ''}" data-value="${opt.value}" role="radio" aria-checked="${isChecked}" tabindex="0">
                <span class="q-key-pill">${letter}</span>
                <div class="q-option-text-group">
                  <span class="q-option-label">${opt.label}</span>
                  ${badgeHtml}
                </div>
                <span class="q-check-circle">${isChecked ? '✓' : ''}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (currentQ.type === 'multi') {
      const selectedArr = state.answers[currentQ.id] || [];
      bodyHtml = `
        <div class="q-options-stack" role="group" aria-label="${currentQ.title}">
          ${currentQ.options.map((opt, idx) => {
            const isChecked = selectedArr.includes(opt.value);
            const letter = String.fromCharCode(65 + idx);
            return `
              <div class="q-option-row ${isChecked ? 'is-selected' : ''}" data-value="${opt.value}" role="checkbox" aria-checked="${isChecked}" tabindex="0">
                <span class="q-key-pill">${letter}</span>
                <span class="q-option-label">${opt.label}</span>
                <span class="q-check-box">${isChecked ? '✓' : ''}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (currentQ.type === 'scope_estimate') {
      const estimate = calculateScopeEstimate(state.selectedService, state.answers);
      const svc = SERVICES[state.selectedService];
      bodyHtml = `
        <div class="q-scope-estimate-view">
          <div class="q-scope-estimate-card">
            <span class="q-scope-estimate-badge">SCOPE ESTIMATE</span>
            <h3 class="q-scope-service-name">${svc.title}</h3>
            
            <div class="q-scope-price-box">
              <span class="q-scope-price-val">${estimate.formattedPrice}</span>
              <span class="q-scope-price-period">${estimate.period === 'month' ? '/ month' : 'estimated investment'}</span>
            </div>

            <div class="q-scope-summary-line">
              <span class="q-scope-summary-label">Estimated Scope:</span>
              <span class="q-scope-summary-text">${escapeHtml(estimate.scopeSummary)}</span>
            </div>

            ${estimate.pills.length > 0 ? `
              <div class="q-scope-pills-row">
                ${estimate.pills.map(p => `
                  <span class="q-scope-pill"><span class="pill-check">✓</span> ${escapeHtml(p)}</span>
                `).join('')}
              </div>
            ` : ''}

            <div class="q-scope-inclusions">
              <div class="q-scope-inclusions-title">Included in this scope tier</div>
              <ul class="q-scope-inclusions-list">
                ${estimate.inclusions.map(inc => `
                  <li><span class="inc-check">✦</span> ${escapeHtml(inc)}</li>
                `).join('')}
              </ul>
            </div>

            <div class="q-scope-next-note">
              <svg class="q-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Next, select your budget range and target start date so we can ensure proposal alignment.</span>
            </div>
          </div>
        </div>
      `;
    } else if (currentQ.type === 'textarea') {
      const currentVal = state.answers[currentQ.id] || '';
      bodyHtml = `
        ${currentQ.helper ? `<p class="q-step-helper-box"><span class="helper-icon">ℹ</span> ${currentQ.helper}</p>` : ''}
        <div class="q-input-wrap">
          <textarea class="q-textarea q-wizard-textarea" id="activeInput" placeholder="${currentQ.placeholder || 'Type your response here...'}" rows="4">${escapeHtml(currentVal)}</textarea>
        </div>
      `;
    } else if (currentQ.type === 'agreement') {
      const svc = SERVICES[state.selectedService];
      const fullName = state.answers['fullName'] || '—';
      const companyName = state.answers['companyName'] || '—';
      const email = state.answers['email'] || '—';
      const phone = state.answers['phone'] || '—';
      const timeline = state.answers['timeline'] || 'As soon as possible';

      const estimate = calculateScopeEstimate(state.selectedService, state.answers);
      
      const budgetKey = (state.selectedService === 'performance-marketing') ? 'pm_management_budget' : 'project_budget';
      const selectedBudget = state.answers[budgetKey] || 'I need guidance on the right budget';
      const plannedAdSpend = state.answers['pm_ad_spend'] || '';

      const budgetRange = parseBudgetRange(selectedBudget);

      let comparisonHead = '';
      let comparisonMsg = '';
      let alertClass = 'q-alert-fit';
      let showProceedChoices = false;

      if (budgetRange.isGuidance) {
        alertClass = 'q-alert-guidance';
        comparisonHead = 'Consultation & Guidance Requested';
        comparisonMsg = `Your selected scope is estimated at <strong>${estimate.formattedPrice}</strong>. We will review your goals during our consultation and provide tiered options to match your exact business priorities.`;
      } else if (estimate.amount > budgetRange.max) {
        alertClass = 'q-alert-above';
        comparisonHead = 'Investment Alignment Note';
        comparisonMsg = `Your selected scope is estimated at <strong>${estimate.formattedPrice}</strong>. Based on your selected budget (${escapeHtml(selectedBudget)}), we can discuss a phased approach, a reduced initial scope, or a custom proposal.`;
        showProceedChoices = true;
      } else {
        alertClass = 'q-alert-fit';
        comparisonHead = 'Direct Budget Alignment';
        comparisonMsg = `Your selected scope fits your selected budget range. Submit your request and we’ll confirm the final proposal within 24 hours.`;
      }

      bodyHtml = `
        <div class="q-agreement-card">
          <!-- Live Comparison Card -->
          <div class="q-budget-comparison-card">
            <div class="q-comparison-row">
              <div class="q-comp-col">
                <span class="q-comp-label">Calculated Scope Estimate</span>
                <span class="q-comp-price">${estimate.formattedPrice}</span>
                <span class="q-comp-value" style="font-size: 0.88rem; color: #cbd5e1;">${escapeHtml(estimate.scopeSummary)}</span>
              </div>
              <div class="q-comp-col">
                <span class="q-comp-label">Your Selected Budget</span>
                <span class="q-comp-badge" style="color: var(--brand-gold);">${escapeHtml(selectedBudget)}</span>
                ${plannedAdSpend ? `<span style="font-size: 0.84rem; color: #94a3b8;">Planned Ad Spend: ${escapeHtml(plannedAdSpend)}</span>` : ''}
                <div style="margin-top: 0.35rem;">
                  <span class="q-priority-tag ${timeline.includes('soon') || timeline.includes('month') ? 'p-high' : 'p-med'}">${escapeHtml(timeline)}</span>
                </div>
              </div>
            </div>

            <!-- Alignment Alert -->
            <div class="q-comparison-feedback">
              <div class="q-feedback-alert ${alertClass}">
                <div class="q-alert-head">
                  <span class="q-alert-icon">✦</span>
                  <span>${comparisonHead}</span>
                </div>
                <p class="q-alert-msg">${comparisonMsg}</p>

                ${showProceedChoices ? `
                  <div class="q-proceed-choice-box">
                    <span class="q-proceed-title">Preferred consultation approach:</span>
                    <div class="q-proceed-options">
                      <label class="q-proceed-opt">
                        <input type="radio" name="proceedPref" value="Phased approach" ${!state.answers['proceedPreference'] || state.answers['proceedPreference'] === 'Phased approach' ? 'checked' : ''}>
                        <span>Phased approach — start with high-impact core features first</span>
                      </label>
                      <label class="q-proceed-opt">
                        <input type="radio" name="proceedPref" value="Adjusted scope" ${state.answers['proceedPreference'] === 'Adjusted scope' ? 'checked' : ''}>
                        <span>Adjusted scope — streamline requirements to fit target budget</span>
                      </label>
                      <label class="q-proceed-opt">
                        <input type="radio" name="proceedPref" value="Custom proposal" ${state.answers['proceedPreference'] === 'Custom proposal' ? 'checked' : ''}>
                        <span>Custom proposal — explore creative options during discovery</span>
                      </label>
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>

          <div class="q-recap-grid">
            <div class="q-recap-item">
              <span class="q-recap-lbl">Client Contact</span>
              <span class="q-recap-val">${escapeHtml(fullName)} (${escapeHtml(companyName)})</span>
            </div>
            <div class="q-recap-item">
              <span class="q-recap-lbl">WhatsApp / Email</span>
              <span class="q-recap-val">${escapeHtml(phone)} • ${escapeHtml(email)}</span>
            </div>
          </div>

          <label class="q-agree-row" for="qAgreeCheckbox">
            <input type="checkbox" id="qAgreeCheckbox" class="q-agree-chk">
            <span class="q-agree-text">
              I acknowledge this estimate is based on my selected scope, and final investment is confirmed upon project briefing review.
            </span>
          </label>

          <p class="q-agree-privacy">
            MotaGrowth will use the information you provide to review and respond to your inquiry.
            See our <button type="button" class="legal-trigger-btn" id="triggerPrivacyModal">Privacy Statement</button>.
          </p>
        </div>
      `;
    } else {
      // Standard input: text, email, tel, url
      const currentVal = state.answers[currentQ.id] || '';
      bodyHtml = `
        <div class="q-input-wrap">
          <input type="${currentQ.type}"
                 class="q-input q-wizard-input"
                 id="activeInput"
                 placeholder="${currentQ.placeholder || ''}"
                 value="${escapeHtml(currentVal)}"
                 ${currentQ.autocomplete ? `autocomplete="${currentQ.autocomplete}"` : ''}>
        </div>
      `;
    }

    const animClass = direction === 'back' ? 'slide-from-left' : 'slide-from-right';

    stageEl.innerHTML = `
      <section class="q-step-wrap ${animClass}">
        <p class="q-step-eyebrow">${currentQ.eyebrow}</p>
        <h2 class="q-step-title">${currentQ.title}</h2>
        ${currentQ.subtitle ? `<p class="q-step-subtitle">${currentQ.subtitle}</p>` : ''}
        <div class="q-step-body">${bodyHtml}</div>
      </section>
    `;

    // Split Phone Listeners
    if (currentQ.type === 'phone_split') {
      const codeSelect = document.getElementById('activeCountryCode');
      const numberInput = document.getElementById('activePhoneNumber');

      const syncPhoneState = () => {
        const code = codeSelect ? codeSelect.value : '+212';
        let rawNum = (numberInput ? numberInput.value : '').trim();
        // Remove leading 0 if typed (e.g. 061234 -> 61234)
        if (rawNum.startsWith('0') && code !== '+other') {
          rawNum = rawNum.replace(/^0+/, '');
        }
        state.answers['phoneCountryCode'] = code;
        state.answers['phoneNumberRaw'] = rawNum;
        state.answers['phone'] = `${code} ${rawNum}`.trim();
        clearStepError();
      };

      if (codeSelect) {
        codeSelect.addEventListener('change', syncPhoneState);
      }
      if (numberInput) {
        setTimeout(() => {
          try { numberInput.focus(); } catch (e) {}
        }, 50);

        numberInput.addEventListener('input', syncPhoneState);
        numberInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleNext();
          }
        });
      }
    }

    // Standard input focus
    const activeInput = document.getElementById('activeInput');
    if (activeInput) {
      setTimeout(() => {
        try { activeInput.focus(); } catch (e) {}
      }, 50);

      activeInput.addEventListener('input', (e) => {
        state.answers[currentQ.id] = e.target.value.trim();
        clearStepError();
      });

      if (currentQ.type !== 'textarea') {
        activeInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleNext();
          }
        });
      }
    }

    // Service Selector listeners
    if (currentQ.type === 'service_select') {
      const boxes = stageEl.querySelectorAll('.q-service-box');
      boxes.forEach(box => {
        const val = box.getAttribute('data-value');
        box.addEventListener('click', () => {
          state.selectedService = val;
          state.answers['selectedService'] = val;
          boxes.forEach(b => {
            b.classList.remove('is-selected');
            b.setAttribute('aria-checked', 'false');
            const chk = b.querySelector('.q-check-circle');
            if (chk) chk.textContent = '';
          });
          box.classList.add('is-selected');
          box.setAttribute('aria-checked', 'true');
          const chk = box.querySelector('.q-check-circle');
          if (chk) chk.textContent = '✓';
          setTimeout(() => handleNext(), 160);
        });

        box.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            box.click();
          }
        });
      });
    }

    // Single choice listener
    if (currentQ.type === 'single') {
      const rows = stageEl.querySelectorAll('.q-option-row');
      rows.forEach(row => {
        const val = row.getAttribute('data-value');
        row.addEventListener('click', () => {
          state.answers[currentQ.id] = val;
          rows.forEach(r => {
            r.classList.remove('is-selected');
            r.setAttribute('aria-checked', 'false');
            const chk = r.querySelector('.q-check-circle');
            if (chk) chk.textContent = '';
          });
          row.classList.add('is-selected');
          row.setAttribute('aria-checked', 'true');
          const chk = row.querySelector('.q-check-circle');
          if (chk) chk.textContent = '✓';
          setTimeout(() => handleNext(), 160);
        });

        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            row.click();
          }
        });
      });
    }

    // Multi choice listener
    if (currentQ.type === 'multi') {
      const rows = stageEl.querySelectorAll('.q-option-row');
      rows.forEach(row => {
        const val = row.getAttribute('data-value');
        row.addEventListener('click', () => {
          let arr = state.answers[currentQ.id] || [];
          if (!Array.isArray(arr)) arr = [];
          if (arr.includes(val)) {
            arr = arr.filter(item => item !== val);
          } else {
            arr.push(val);
          }
          state.answers[currentQ.id] = arr;

          const isNowChecked = arr.includes(val);
          row.classList.toggle('is-selected', isNowChecked);
          row.setAttribute('aria-checked', isNowChecked ? 'true' : 'false');
          const chk = row.querySelector('.q-check-box');
          if (chk) chk.textContent = isNowChecked ? '✓' : '';
        });

        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            row.click();
          }
        });
      });
    }

    // Agreement radio proceed choices
    if (currentQ.type === 'agreement') {
      const radios = stageEl.querySelectorAll('input[name="proceedPref"]');
      radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          state.answers['proceedPreference'] = e.target.value;
        });
      });

      const privacyTrigger = document.getElementById('triggerPrivacyModal');
      if (privacyTrigger) {
        privacyTrigger.addEventListener('click', () => {
          const modal = document.getElementById('privacyModal');
          if (modal) modal.classList.add('is-open');
        });
      }
    }
  }

  function handleNext() {
    if (!validateCurrentStep()) return;

    const list = getQuestionsList();
    const currentQ = list[state.currentStepIndex];

    if (currentQ.type === 'agreement') {
      submitInquiry();
      return;
    }

    if (state.currentStepIndex < list.length - 1) {
      state.currentStepIndex++;
      renderStep('next');
    }
  }

  function handleBack() {
    if (state.currentStepIndex > 0) {
      state.currentStepIndex--;
      renderStep('back');
    }
  }

  // Inquiry submission & storage
  function submitInquiry() {
    const svc = SERVICES[state.selectedService] || SERVICES['performance-marketing'];
    const refSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const refId = `INQ-${svc.title.substring(0, 4).toUpperCase().replace(/\s/g, '')}-${refSuffix}`;

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dateDisplay = `${day}/${month}/${year}<br><span style="color: #64748b; font-weight: 500;">${hours}:${minutes}</span>`;

    const fullName = state.answers['fullName'] || '—';
    const companyName = state.answers['companyName'] || '—';
    const email = state.answers['email'] || '—';
    const phone = state.answers['phone'] || '—';
    const location = state.answers['location'] || '—';
    const website = state.answers['website'] || '—';
    const bizDesc = state.answers['businessDescription'] || '—';
    const timeline = state.answers['timeline'] || 'As soon as possible';
    const additionalNotes = state.answers['additionalNotes'] || '';

    // Calculate scope estimate
    const estimate = calculateScopeEstimate(state.selectedService, state.answers);

    // Selected budget
    const budgetKey = (state.selectedService === 'performance-marketing') ? 'pm_management_budget' : 'project_budget';
    const selectedBudget = state.answers[budgetKey] || 'I need guidance on the right budget';
    const plannedAdSpend = state.answers['pm_ad_spend'] || '';
    const proceedPreference = state.answers['proceedPreference'] || '';

    const budgetRange = parseBudgetRange(selectedBudget);
    let budgetAlignment = 'fit';
    if (budgetRange.isGuidance) budgetAlignment = 'guidance';
    else if (estimate.amount > budgetRange.max) budgetAlignment = 'above';

    // Collect service responses
    const answerNotes = [];
    svc.questions.forEach(q => {
      const ans = state.answers[q.id];
      if (ans) {
        const formatted = Array.isArray(ans) ? ans.join(', ') : ans;
        answerNotes.push(`${q.title}: ${formatted}`);
      }
    });

    const fullNotes = [
      `BUSINESS CONTEXT: ${bizDesc}`,
      `LOCATION: ${location}`,
      website && website !== '—' ? `WEBSITE: ${website}` : '',
      `ESTIMATED SCOPE: ${estimate.scopeSummary}`,
      `ESTIMATED INVESTMENT: ${estimate.formattedPrice}`,
      `SELECTED BUDGET: ${selectedBudget}`,
      plannedAdSpend ? `PLANNED AD SPEND: ${plannedAdSpend}` : '',
      `BUDGET ALIGNMENT: ${budgetAlignment.toUpperCase()}`,
      proceedPreference ? `PROCEED PREFERENCE: ${proceedPreference}` : '',
      `TIMELINE / PRIORITY: ${timeline}`,
      '--- SERVICE SPECIFIC ---',
      ...answerNotes,
      additionalNotes ? `ADDITIONAL NOTES: ${additionalNotes}` : ''
    ].filter(Boolean).join('\n');

    // CRM Lead Record
    const record = {
      id: refId,
      createdAt: now.toISOString(),
      dateDisplay: dateDisplay,
      type: 'PRO',
      clientName: fullName,
      companyName: companyName,
      clientEmail: email,
      clientPhone: phone,
      location: location,
      website: website,
      budget: selectedBudget,
      dealValue: estimate.formattedPrice,
      businessDescription: bizDesc,
      serviceKey: state.selectedService,
      services: [`${svc.title} (${estimate.formattedPrice})`],
      sector: location || 'Studio Client',
      timeline: timeline,
      priority: (timeline === 'As soon as possible' || timeline === 'Within one month') ? 'High' : (timeline === 'Within three months' ? 'Medium' : 'Low'),
      notes: fullNotes,
      estimatedScope: estimate.scopeSummary,
      estimatedPrice: estimate.formattedPrice,
      budgetAlignment: budgetAlignment,
      proceedPreference: proceedPreference,
      plannedAdSpend: plannedAdSpend,
      answers: state.answers,
      status: 'Nouveau',
      priceNoticeAgreed: true
    };

    // Save to private admin CRM storage key
    try {
      const STORAGE_KEY = 'motagrowth_v7_inquiries_db';
      const raw = localStorage.getItem(STORAGE_KEY);
      let list = [];
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) list = parsed;
        } catch (e) { list = []; }
      }
      list.unshift(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('MotaGrowth CRM Save Error:', e);
    }

    renderConfirmation(refId, svc, record);
  }

  // Render Confirmation Screen
  function renderConfirmation(refId, svc, record) {
    if (progressFillEl) progressFillEl.style.width = '100%';
    if (stepBadgeEl) stepBadgeEl.textContent = 'Inquiry Received';
    if (servicePillEl) servicePillEl.style.display = 'none';

    const footer = document.getElementById('wizardFooter');
    if (footer) footer.style.display = 'none';

    const estimate = calculateScopeEstimate(state.selectedService, state.answers);

    stageEl.innerHTML = `
      <section class="q-confirmation-card slide-from-right">
        <div class="q-conf-icon">✓</div>
        <p class="q-conf-eyebrow">Project Brief Received · Reference ${refId}</p>
        <h2 class="q-conf-title">Thank you, ${escapeHtml(record.clientName.split(' ')[0])}.</h2>
        <p class="q-conf-lead">
          We have received your project details for <strong>${svc.title}</strong> (${estimate.formattedPrice}).
          Our team is reviewing your requirements and will reach out via WhatsApp / Email within 24 business hours.
        </p>

        <div class="q-conf-summary-grid">
          <div class="q-conf-item">
            <span class="q-conf-lbl">Reference ID</span>
            <span class="q-conf-val q-conf-mono">${refId}</span>
          </div>
          <div class="q-conf-item">
            <span class="q-conf-lbl">Scope Estimate</span>
            <span class="q-conf-val" style="color: var(--brand-gold);">${estimate.formattedPrice}</span>
          </div>
          <div class="q-conf-item">
            <span class="q-conf-lbl">Selected Budget</span>
            <span class="q-conf-val">${escapeHtml(record.budget)}</span>
          </div>
          <div class="q-conf-item">
            <span class="q-conf-lbl">Target Start</span>
            <span class="q-conf-val">${escapeHtml(record.timeline)}</span>
          </div>
        </div>

        <div class="q-conf-actions">
          <a href="index.html" class="btn btn-primary">Return to Homepage ↗</a>
          <a href="cases.html" class="btn btn-secondary">Explore Client Case Studies</a>
        </div>
      </section>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // If modal is open, ignore
    const modal = document.getElementById('privacyModal');
    if (modal && modal.classList.contains('is-open')) return;

    // Ignore when typing inside input / textarea / select
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') {
      if (e.key === 'Escape') {
        e.target.blur();
      }
      return;
    }

    const list = getQuestionsList();
    const currentQ = list[state.currentStepIndex];

    // Number / Letter selection on service or single choice
    if (currentQ && (currentQ.type === 'service_select' || currentQ.type === 'single')) {
      const char = e.key.toUpperCase();
      if (char.length === 1 && char >= 'A' && char <= 'Z') {
        const idx = char.charCodeAt(0) - 65;
        if (currentQ.options && currentQ.options[idx]) {
          e.preventDefault();
          const targetOpt = currentQ.options[idx];
          if (currentQ.type === 'service_select') {
            state.selectedService = targetOpt.value;
            state.answers['selectedService'] = targetOpt.value;
          } else {
            state.answers[currentQ.id] = targetOpt.value;
          }
          renderStep('next');
          setTimeout(() => handleNext(), 160);
          return;
        }
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Backspace' && e.altKey) {
      e.preventDefault();
      handleBack();
    }
  });

  // Attach button listeners
  if (nextBtn) nextBtn.addEventListener('click', handleNext);
  if (backBtn) backBtn.addEventListener('click', handleBack);

  // Initial render
  document.addEventListener('DOMContentLoaded', () => {
    renderStep('init');
  });

  // Export state for debugging if needed
  window._motaProposalEngine = {
    getState: () => state,
    calculateScopeEstimate
  };

})();
