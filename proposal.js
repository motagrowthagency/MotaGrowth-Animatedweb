/**
 * MotaGrowth Studio — Scope-Based Website Estimator & Proposal Engine (V9)
 * 
 * Digital Architecture Scope-Based Estimator:
 * - Calculates estimated investment from the client’s selected scope, not from budget.
 * - Budget question appears after the live estimate and acts purely as qualification.
 * - Live estimate updates in real-time as selections change with sticky desktop rail
 *   and collapsible mobile summary bar.
 * - Clearly separates one-time project investment from monthly support fees.
 * - Handles custom complexity triggers (from 100,000 MAD starting estimate).
 * - Simple landing page baseline starts at 4,000 MAD.
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

  function formatMAD(amount) {
    return new Intl.NumberFormat('en-US').format(amount) + ' MAD';
  }

  // 1. Digital Architecture Service Definition & Scope Questions
  const DIGITAL_ARCHITECTURE_QUESTIONS = [
    {
      id: 'da_website_type',
      eyebrow: 'Step 2 · Architecture Specification',
      title: 'What type of website do you need?',
      subtitle: 'Required · Single selection',
      helper: 'A simple landing page is ideal for one offer, campaign, service, or lead-generation page.',
      type: 'single',
      required: true,
      options: [
        { value: 'Simple landing page', label: 'Simple landing page', badge: '4,000 MAD', priceAmount: 4000 },
        { value: 'Business website — up to 5 pages', label: 'Business website — up to 5 pages', badge: '15,000 MAD', priceAmount: 15000 },
        { value: 'Business website — 6 to 10 pages', label: 'Business website — 6 to 10 pages', badge: '20,000 MAD', priceAmount: 20000 },
        { value: 'E-commerce website', label: 'E-commerce website', badge: '28,000 MAD', priceAmount: 28000 },
        { value: 'Custom platform, dashboard, or web application', label: 'Custom platform, dashboard, or web application', badge: 'Custom quote', isCustom: true }
      ]
    },
    {
      id: 'da_objectives',
      eyebrow: 'Step 3 · Strategic Objective',
      title: 'What should the website help your business achieve?',
      subtitle: 'Required · Multiple selection',
      type: 'multi',
      required: true,
      options: [
        { value: 'Generate inquiries', label: 'Generate inquiries', badge: '0 MAD', priceAmount: 0 },
        { value: 'Showcase services and projects', label: 'Showcase services and projects', badge: '0 MAD', priceAmount: 0 },
        { value: 'Drive bookings', label: 'Drive bookings', badge: '+2,500 MAD', priceAmount: 2500 },
        { value: 'Sell products online', label: 'Sell products online', badge: 'Included in e-commerce', priceAmount: 0 },
        { value: 'Collect quotation requests', label: 'Collect quotation requests', badge: '+2,000 MAD', priceAmount: 2000 },
        { value: 'Build a lead-generation funnel', label: 'Build a lead-generation funnel', badge: '+3,000 MAD', priceAmount: 3000 }
      ]
    },
    {
      id: 'da_page_count',
      eyebrow: 'Step 4 · Page Scale',
      title: 'Approximately how many pages do you need?',
      subtitle: 'Required · Single selection',
      type: 'single',
      required: true,
      options: [
        { value: '1–5 pages', label: '1–5 pages', badge: '0 MAD', priceAmount: 0 },
        { value: '6–10 pages', label: '6–10 pages', badge: '+5,000 MAD', priceAmount: 5000 },
        { value: '11–20 pages', label: '11–20 pages', badge: '+9,000 MAD', priceAmount: 9000 },
        { value: 'More than 20 pages', label: 'More than 20 pages', badge: 'Custom quote', isCustom: true }
      ]
    },
    {
      id: 'da_features',
      eyebrow: 'Step 5 · Interactive Capabilities',
      title: 'Which features do you need?',
      subtitle: 'Required · Multiple selection',
      type: 'multi',
      required: true,
      options: [
        { value: 'Contact form', label: 'Contact form', badge: '0 MAD', priceAmount: 0 },
        { value: 'WhatsApp direct integration', label: 'WhatsApp direct integration', badge: '0 MAD', priceAmount: 0 },
        { value: 'Booking system', label: 'Booking system', badge: '+3,500 MAD', priceAmount: 3500 },
        { value: 'Product catalogue without online payment', label: 'Product catalogue without online payment', badge: '+4,000 MAD', priceAmount: 4000 },
        { value: 'E-commerce checkout and online payments', label: 'E-commerce checkout and online payments', badge: '+7,500 MAD', priceAmount: 7500 },
        { value: 'Delivery / shipping configuration', label: 'Delivery / shipping configuration', badge: '+2,500 MAD', priceAmount: 2500 },
        { value: 'Multi-language website', label: 'Multi-language website', badge: '+4,000 MAD', priceAmount: 4000 },
        { value: 'Blog or editable content system', label: 'Blog or editable content system', badge: '+2,000 MAD', priceAmount: 2000 },
        { value: 'Advanced animations and interactive effects', label: 'Advanced animations and interactive effects', badge: '+1,500 MAD', priceAmount: 1500 },
        { value: '3D visuals or immersive elements', label: '3D visuals or immersive elements', badge: '+6,000 MAD', priceAmount: 6000 },
        { value: 'CRM, email, or third-party integration', label: 'CRM, email, or third-party integration', badge: 'Custom quote', isCustom: true },
        { value: 'Client dashboard or member area', label: 'Client dashboard or member area', badge: 'Custom quote', isCustom: true },
        { value: 'Custom API or workflow automation', label: 'Custom API or workflow automation', badge: 'Custom quote', isCustom: true }
      ]
    },
    {
      id: 'da_seo',
      eyebrow: 'Step 6 · Search Visibility & Growth',
      title: 'Which SEO services do you need?',
      subtitle: 'Optional · Multiple selection',
      type: 'multi',
      required: false,
      options: [
        { value: 'Basic technical SEO setup', label: 'Basic technical SEO setup', badge: '0 MAD — included', priceAmount: 0 },
        { value: 'Keyword research — up to 10 pages', label: 'Keyword research — up to 10 pages', badge: '+1,500 MAD', priceAmount: 1500 },
        { value: 'On-page SEO — up to 5 pages', label: 'On-page SEO — up to 5 pages', badge: '+2,000 MAD', priceAmount: 2000 },
        { value: 'On-page SEO — 6 to 10 pages', label: 'On-page SEO — 6 to 10 pages', badge: '+3,000 MAD', priceAmount: 3000 },
        { value: 'SEO-optimized website copy', label: 'SEO-optimized website copy', badge: '+2,500 MAD', priceAmount: 2500 },
        { value: 'Google Search Console setup', label: 'Google Search Console setup', badge: '+500 MAD', priceAmount: 500 },
        { value: 'Google Business Profile setup and optimization', label: 'Google Business Profile setup and optimization', badge: '+1,500 MAD', priceAmount: 1500 },
        { value: 'Local SEO setup — citations, maps, and location pages', label: 'Local SEO setup — citations, maps, and location pages', badge: '+2,500 MAD', priceAmount: 2500 },
        { value: 'Blog setup with SEO structure', label: 'Blog setup with SEO structure', badge: '+2,000 MAD', priceAmount: 2000 },
        { value: 'Monthly SEO growth package', label: 'Monthly SEO growth package', badge: '+2,500 MAD / month', monthlyAmount: 2500 },
        { value: 'Advanced SEO strategy and content plan', label: 'Advanced SEO strategy and content plan', badge: 'Custom quote', isCustom: true }
      ]
    },
    {
      id: 'da_assets',
      eyebrow: 'Step 7 · Content & Production Assets',
      title: 'What content and assets do you already have?',
      subtitle: 'Required · Multiple selection',
      type: 'multi',
      required: true,
      options: [
        { value: 'Logo and brand guidelines', label: 'Logo and brand guidelines', badge: '0 MAD', priceAmount: 0 },
        { value: 'Website copy / text', label: 'Website copy / text', badge: '0 MAD', priceAmount: 0 },
        { value: 'Professional photos', label: 'Professional photos', badge: '0 MAD', priceAmount: 0 },
        { value: 'Product photos', label: 'Product photos', badge: '0 MAD', priceAmount: 0 },
        { value: 'Professional videos', label: 'Professional videos', badge: '0 MAD', priceAmount: 0 },
        { value: 'I need copywriting support', label: 'I need copywriting support', badge: '+2,500 MAD', priceAmount: 2500 },
        { value: 'I need photography direction or production', label: 'I need photography direction or production', badge: 'Custom quote', isCustom: true },
        { value: 'I need video production', label: 'I need video production', badge: 'Custom quote', isCustom: true },
        { value: 'I need help with everything', label: 'I need help with everything', badge: 'Custom quote', isCustom: true }
      ]
    },
    {
      id: 'da_references',
      eyebrow: 'Step 8 · Design Benchmarks',
      title: 'Share up to three websites you like.',
      subtitle: 'Optional · Long text',
      type: 'textarea',
      required: false,
      placeholder: 'Paste the links and briefly explain what you like about them.'
    },
    {
      id: 'da_support',
      eyebrow: 'Step 9 · Post-Launch Infrastructure',
      title: 'Do you need ongoing support after launch?',
      subtitle: 'Required · Single selection',
      type: 'single',
      required: true,
      options: [
        { value: 'No, I only need the launch', label: 'No, I only need the launch', badge: '0 MAD', monthlyAmount: 0 },
        { value: 'Basic maintenance — updates, backups, and small changes', label: 'Basic maintenance — updates, backups, and small changes', badge: '+1,000 MAD / month', monthlyAmount: 1000 },
        { value: 'Growth support — updates, SEO, and content changes', label: 'Growth support — updates, SEO, and content changes', badge: '+2,000 MAD / month', monthlyAmount: 2000 },
        { value: 'Full management — updates, content, SEO, and performance monitoring', label: 'Full management — updates, content, SEO, and performance monitoring', badge: 'Custom quote', isCustom: true }
      ]
    },
    {
      id: 'da_complexity',
      eyebrow: 'Step 10 · Architecture Complexity Check',
      title: 'Does your project require any of the following?',
      subtitle: 'Optional · Multiple selection',
      type: 'multi',
      required: false,
      options: [
        { value: 'Client or member accounts', label: 'Client or member accounts', badge: 'Custom quote', isCustom: true },
        { value: 'Admin dashboard', label: 'Admin dashboard', badge: 'Custom quote', isCustom: true },
        { value: 'Multiple user roles', label: 'Multiple user roles', badge: 'Custom quote', isCustom: true },
        { value: 'CRM, ERP, or inventory integration', label: 'CRM, ERP, or inventory integration', badge: 'Custom quote', isCustom: true },
        { value: 'Payment system integration', label: 'Payment system integration', badge: 'Custom quote', isCustom: true },
        { value: 'WhatsApp API or automation', label: 'WhatsApp API or automation', badge: 'Custom quote', isCustom: true },
        { value: 'Custom API development', label: 'Custom API development', badge: 'Custom quote', isCustom: true },
        { value: 'Large product or data migration', label: 'Large product or data migration', badge: 'Custom quote', isCustom: true },
        { value: 'Custom workflows or approvals', label: 'Custom workflows or approvals', badge: 'Custom quote', isCustom: true },
        { value: 'Advanced security requirements', label: 'Advanced security requirements', badge: 'Custom quote', isCustom: true }
      ]
    }
  ];

  // Other Services (Performance Marketing, Creative Direction, Conversion Strategy)
  const SERVICES = {
    'digital-architecture': {
      id: 'digital-architecture',
      title: 'Digital Architecture',
      discipline: 'Bespoke Web Design & Development',
      price: 'Starting from 4,000 MAD',
      shortPrice: 'From 4,000 MAD',
      period: 'project',
      notice: 'We design and build digital flagships that convert attention into qualified inquiries, bookings, and revenue. Starting from 4,000 MAD for landing pages, 15,000 MAD for 5-page bespoke flagships. Third-party hosting, domains, and subscriptions are separate.',
      questions: DIGITAL_ARCHITECTURE_QUESTIONS
    },
    'performance-marketing': {
      id: 'performance-marketing',
      title: 'Performance Marketing',
      discipline: 'Paid Acquisition & Revenue Scaling',
      price: 'From 5,000 MAD / month',
      shortPrice: '5,000 MAD / month',
      period: 'month',
      notice: 'Management starts at 5,000 MAD / month for one advertising platform. Advertising spend is paid directly to Meta, Google, or TikTok and is separate.',
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
    'creative-direction': {
      id: 'creative-direction',
      title: 'Creative Direction',
      discipline: 'Brand Identity & Visual Worlds',
      price: 'From 8,000 MAD / project',
      shortPrice: '8,000 MAD',
      period: 'project',
      notice: 'Projects start at 8,000 MAD for a core visual identity: logo system, color palette, typography, and brand guidelines.',
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
      notice: 'Audits start at 5,000 MAD for one website or funnel, including a conversion review and prioritized improvement plan.',
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
          id: 'cs_support',
          eyebrow: '05 / Scope of Support',
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

  // 2. Universal Contact Details (Step 1)
  const UNIVERSAL_CONTACT_QUESTIONS = [
    {
      id: 'fullName',
      eyebrow: 'Step 1 · Client Contact',
      title: 'What’s your full name?',
      subtitle: 'Required · We will address you personally',
      type: 'text',
      required: true,
      placeholder: 'e.g. Alex Morgan',
      autocomplete: 'name'
    },
    {
      id: 'companyName',
      eyebrow: 'Step 1 · Brand Identity',
      title: 'What’s your business / brand name?',
      subtitle: 'Required · Commercial or brand designation',
      type: 'text',
      required: true,
      placeholder: 'e.g. Maison Atelier',
      autocomplete: 'organization'
    },
    {
      id: 'email',
      eyebrow: 'Step 1 · Direct Contact',
      title: 'What’s your email address?',
      subtitle: 'Required · Where we send your tailored scope breakdown & proposal',
      type: 'email',
      required: true,
      placeholder: 'name@company.com',
      autocomplete: 'email'
    },
    {
      id: 'phone',
      eyebrow: 'Step 1 · WhatsApp Contact',
      title: 'What’s your WhatsApp number?',
      subtitle: 'Required · Select country code and enter your direct number',
      type: 'phone_split',
      required: true,
      placeholder: '6 12 34 56 78',
      autocomplete: 'tel-national'
    },
    {
      id: 'location',
      eyebrow: 'Step 1 · Headquarters & Market',
      title: 'What is your country and city of operation?',
      subtitle: 'Required · Primary market and business location',
      type: 'text',
      required: true,
      placeholder: 'e.g. Morocco, Casablanca'
    },
    {
      id: 'website',
      eyebrow: 'Step 1 · Digital Footprint',
      title: 'What’s your current website or Instagram profile?',
      subtitle: 'Optional · Direct link or @handle',
      type: 'text',
      required: false,
      placeholder: 'https://... or @instagram'
    },
    {
      id: 'businessDescription',
      eyebrow: 'Step 1 · Business Context',
      title: 'Briefly describe your business.',
      subtitle: 'Required',
      helper: 'What do you sell, who are your customers, and where do you operate?',
      type: 'textarea',
      required: true,
      placeholder: 'What do you sell, who are your customers, and where do you operate?'
    }
  ];

  // 3. Calculation Engine for Digital Architecture (Scope-Based Estimator)
  function calculateWebsiteEstimate(answers) {
    answers = answers || {};
    let totalProject = 0;
    let totalMonthly = 0;
    let isCustom = false;
    let customReasons = [];
    const breakdownItems = [];

    const webType = answers['da_website_type'] || 'Simple landing page';
    if (webType.includes('Custom platform')) {
      isCustom = true;
      customReasons.push('Custom platform, dashboard, or web application');
      breakdownItems.push({ label: 'Custom platform / web app', priceStr: 'Custom quote', isCustom: true });
    } else if (webType.includes('Simple landing page')) {
      totalProject += 4000;
      breakdownItems.push({ label: 'Simple landing page', priceStr: '4,000 MAD', amount: 4000 });
    } else if (webType.includes('up to 5 pages')) {
      totalProject += 15000;
      breakdownItems.push({ label: 'Business website (up to 5 pages)', priceStr: '15,000 MAD', amount: 15000 });
    } else if (webType.includes('6 to 10 pages')) {
      totalProject += 20000;
      breakdownItems.push({ label: 'Business website (6 to 10 pages)', priceStr: '20,000 MAD', amount: 20000 });
    } else if (webType.includes('E-commerce')) {
      totalProject += 28000;
      breakdownItems.push({ label: 'E-commerce flagship', priceStr: '28,000 MAD', amount: 28000 });
    }

    // Step 3 — Objectives
    const objs = Array.isArray(answers['da_objectives']) ? answers['da_objectives'] : [];
    objs.forEach(o => {
      if (o.includes('Drive bookings')) {
        totalProject += 2500;
        breakdownItems.push({ label: 'Objective: Drive bookings', priceStr: '+2,500 MAD', amount: 2500 });
      } else if (o.includes('Collect quotation')) {
        totalProject += 2000;
        breakdownItems.push({ label: 'Objective: Collect quotations', priceStr: '+2,000 MAD', amount: 2000 });
      } else if (o.includes('Build a lead-generation')) {
        totalProject += 3000;
        breakdownItems.push({ label: 'Objective: Lead-gen funnel', priceStr: '+3,000 MAD', amount: 3000 });
      } else if (o.includes('Sell products')) {
        breakdownItems.push({ label: 'Objective: Sell online', priceStr: 'Included in e-commerce' });
      }
    });

    // Step 4 — Pages (only if not simple landing page)
    if (!webType.includes('Simple landing page')) {
      const pages = answers['da_page_count'] || '1–5 pages';
      if (pages.includes('More than 20')) {
        isCustom = true;
        customReasons.push('More than 20 pages architecture');
        breakdownItems.push({ label: 'Page scale: 20+ pages', priceStr: 'Custom quote', isCustom: true });
      } else if (pages.includes('6–10')) {
        totalProject += 5000;
        breakdownItems.push({ label: 'Scale: 6–10 pages', priceStr: '+5,000 MAD', amount: 5000 });
      } else if (pages.includes('11–20')) {
        totalProject += 9000;
        breakdownItems.push({ label: 'Scale: 11–20 pages', priceStr: '+9,000 MAD', amount: 9000 });
      }
    }

    // Step 5 — Features
    const feats = Array.isArray(answers['da_features']) ? answers['da_features'] : [];
    feats.forEach(f => {
      if (f.includes('Booking system')) {
        totalProject += 3500;
        breakdownItems.push({ label: 'Booking system', priceStr: '+3,500 MAD', amount: 3500 });
      } else if (f.includes('Product catalogue')) {
        totalProject += 4000;
        breakdownItems.push({ label: 'Product catalogue', priceStr: '+4,000 MAD', amount: 4000 });
      } else if (f.includes('E-commerce checkout')) {
        totalProject += 7500;
        breakdownItems.push({ label: 'Checkout & payments', priceStr: '+7,500 MAD', amount: 7500 });
      } else if (f.includes('Delivery / shipping')) {
        totalProject += 2500;
        breakdownItems.push({ label: 'Delivery / shipping configuration', priceStr: '+2,500 MAD', amount: 2500 });
      } else if (f.includes('Multi-language')) {
        totalProject += 4000;
        breakdownItems.push({ label: 'Multi-language website', priceStr: '+4,000 MAD', amount: 4000 });
      } else if (f.includes('Blog or editable')) {
        totalProject += 2000;
        breakdownItems.push({ label: 'Blog / CMS content system', priceStr: '+2,000 MAD', amount: 2000 });
      } else if (f.includes('Advanced animations')) {
        totalProject += 1500;
        breakdownItems.push({ label: 'Interactive animations', priceStr: '+1,500 MAD', amount: 1500 });
      } else if (f.includes('3D visuals')) {
        totalProject += 6000;
        breakdownItems.push({ label: '3D visuals & immersive elements', priceStr: '+6,000 MAD', amount: 6000 });
      } else if (f.includes('CRM, email') || f.includes('Client dashboard') || f.includes('Custom API')) {
        isCustom = true;
        customReasons.push(f);
        breakdownItems.push({ label: f, priceStr: 'Custom quote', isCustom: true });
      } else if (f.includes('WhatsApp')) {
        breakdownItems.push({ label: 'WhatsApp direct integration', priceStr: '0 MAD' });
      } else if (f.includes('Contact form')) {
        breakdownItems.push({ label: 'Contact inquiry form', priceStr: '0 MAD' });
      }
    });

    // Step 6 — SEO
    const seos = Array.isArray(answers['da_seo']) ? answers['da_seo'] : [];
    seos.forEach(s => {
      if (s.includes('Keyword research')) {
        totalProject += 1500;
        breakdownItems.push({ label: 'SEO: Keyword research', priceStr: '+1,500 MAD', amount: 1500 });
      } else if (s.includes('On-page SEO — up to 5')) {
        totalProject += 2000;
        breakdownItems.push({ label: 'SEO: On-page (up to 5 pages)', priceStr: '+2,000 MAD', amount: 2000 });
      } else if (s.includes('On-page SEO — 6 to 10')) {
        totalProject += 3000;
        breakdownItems.push({ label: 'SEO: On-page (6–10 pages)', priceStr: '+3,000 MAD', amount: 3000 });
      } else if (s.includes('SEO-optimized website copy')) {
        totalProject += 2500;
        breakdownItems.push({ label: 'SEO: Optimized copy', priceStr: '+2,500 MAD', amount: 2500 });
      } else if (s.includes('Search Console')) {
        totalProject += 500;
        breakdownItems.push({ label: 'SEO: Search Console setup', priceStr: '+500 MAD', amount: 500 });
      } else if (s.includes('Google Business Profile')) {
        totalProject += 1500;
        breakdownItems.push({ label: 'SEO: Google Business Profile', priceStr: '+1,500 MAD', amount: 1500 });
      } else if (s.includes('Local SEO')) {
        totalProject += 2500;
        breakdownItems.push({ label: 'SEO: Local citations & maps', priceStr: '+2,500 MAD', amount: 2500 });
      } else if (s.includes('Blog setup with SEO')) {
        totalProject += 2000;
        breakdownItems.push({ label: 'SEO: Blog structure setup', priceStr: '+2,000 MAD', amount: 2000 });
      } else if (s.includes('Monthly SEO growth')) {
        totalMonthly += 2500;
        breakdownItems.push({ label: 'Monthly SEO growth package', priceStr: '+2,500 MAD / mo', isMonthly: true, monthlyAmount: 2500 });
      } else if (s.includes('Advanced SEO strategy')) {
        isCustom = true;
        customReasons.push('Advanced SEO strategy & content plan');
        breakdownItems.push({ label: 'Advanced SEO strategy', priceStr: 'Custom quote', isCustom: true });
      } else if (s.includes('Basic technical SEO')) {
        breakdownItems.push({ label: 'Basic technical SEO setup', priceStr: 'Included' });
      }
    });

    // Step 7 — Content & Assets
    const assets = Array.isArray(answers['da_assets']) ? answers['da_assets'] : [];
    assets.forEach(a => {
      if (a.includes('copywriting support')) {
        totalProject += 2500;
        breakdownItems.push({ label: 'Studio copywriting support', priceStr: '+2,500 MAD', amount: 2500 });
      } else if (a.includes('photography direction') || a.includes('video production') || a.includes('help with everything')) {
        isCustom = true;
        customReasons.push(a);
        breakdownItems.push({ label: a, priceStr: 'Custom quote', isCustom: true });
      }
    });

    // Step 9 — Ongoing Support
    const supp = answers['da_support'] || 'No, I only need the launch';
    if (supp.includes('Basic maintenance')) {
      totalMonthly += 1000;
      breakdownItems.push({ label: 'Support: Basic maintenance', priceStr: '+1,000 MAD / mo', isMonthly: true, monthlyAmount: 1000 });
    } else if (supp.includes('Growth support')) {
      totalMonthly += 2000;
      breakdownItems.push({ label: 'Support: Growth maintenance & SEO', priceStr: '+2,000 MAD / mo', isMonthly: true, monthlyAmount: 2000 });
    } else if (supp.includes('Full management')) {
      isCustom = true;
      customReasons.push('Full management ongoing support');
      breakdownItems.push({ label: 'Support: Full management', priceStr: 'Custom quote', isCustom: true });
    }

    // Step 10 — Custom Complexity Check
    const complex = Array.isArray(answers['da_complexity']) ? answers['da_complexity'] : [];
    if (complex.length >= 2) {
      isCustom = true;
      customReasons.push(`${complex.length} complexity triggers (${complex.slice(0, 2).join(', ')})`);
      complex.forEach(c => {
        breakdownItems.push({ label: `Complexity: ${c}`, priceStr: 'Custom quote', isCustom: true });
      });
    } else if (complex.length === 1) {
      const item = complex[0];
      if (item.includes('CRM') || item.includes('API') || item.includes('migration') || item.includes('accounts') || item.includes('dashboard')) {
        isCustom = true;
        customReasons.push(item);
      }
      breakdownItems.push({ label: `Complexity: ${item}`, priceStr: 'Custom quote', isCustom: true });
    }

    return {
      totalProject,
      totalMonthly,
      isCustom,
      customReasons,
      breakdownItems,
      formattedProjectPrice: isCustom ? 'from 100,000 MAD' : formatMAD(totalProject),
      formattedMonthlyPrice: totalMonthly > 0 ? formatMAD(totalMonthly) + ' / month' : null
    };
  }

  // General scope calculator dispatcher
  function calculateScopeEstimate(serviceKey, answers) {
    if (serviceKey === 'digital-architecture') {
      const est = calculateWebsiteEstimate(answers);
      const scopeSummary = est.breakdownItems.map(i => i.label).slice(0, 4).join(' + ') || 'Bespoke web architecture';
      return {
        amount: est.totalProject,
        monthlyAmount: est.totalMonthly,
        isCustom: est.isCustom,
        customReasons: est.customReasons,
        formattedPrice: est.isCustom ? 'from 100,000 MAD' : est.formattedProjectPrice,
        formattedMonthlyPrice: est.formattedMonthlyPrice,
        period: est.totalMonthly > 0 ? 'project + monthly support' : 'project',
        scopeSummary: scopeSummary,
        pills: est.breakdownItems.slice(0, 6).map(i => i.label),
        inclusions: [
          'Bespoke visual architecture & responsive UI/UX',
          'Direct WhatsApp & interactive inquiry funnel',
          'Mobile performance & technical SEO foundation',
          'Content management system & live deployment'
        ]
      };
    }

    // Fallbacks for other services
    let amount = 5000;
    let period = 'month';
    if (serviceKey === 'creative-direction') {
      amount = 8000;
      period = 'project';
    } else if (serviceKey === 'conversion-strategy') {
      amount = 5000;
      period = 'project';
    }

    return {
      amount,
      monthlyAmount: 0,
      isCustom: false,
      customReasons: [],
      formattedPrice: formatMAD(amount),
      formattedMonthlyPrice: null,
      period,
      scopeSummary: 'Standard scope baseline',
      pills: ['Strategy & Architecture', 'Performance Optimization'],
      inclusions: [
        'Dedicated studio management',
        'Direct strategic consultation',
        'Weekly review milestones'
      ]
    };
  }

  // Parse Budget String
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
    selectedService: 'digital-architecture',
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

  // 5. Dynamic Question Chain Assembly
  function getQuestionsList() {
    // Stage 1: Service Selection
    const serviceQuestion = {
      id: 'selectedService',
      eyebrow: '01 / Studio Discipline',
      title: 'Which service are you interested in?',
      subtitle: 'Required · Single selection · Select to configure your estimate',
      type: 'service_select',
      required: true,
      options: [
        {
          value: 'digital-architecture',
          label: 'Digital Architecture',
          price: 'Starting from 4,000 MAD',
          desc: 'Bespoke Web Design & Development · Landing pages from 4k, flagships from 15k'
        },
        {
          value: 'performance-marketing',
          label: 'Performance Marketing',
          price: 'From 5,000 MAD / month',
          desc: 'Paid Acquisition & Revenue Scaling across Meta, Google & TikTok'
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

    // Stage 2: Universal Contact Details (Step 1)
    const currentService = SERVICES[state.selectedService] || SERVICES['digital-architecture'];

    // Stage 3: Service-Specific Scope Questions
    let serviceSpecific = [...currentService.questions];

    // Digital Architecture conditional branching:
    // If "Simple landing page" is selected, hide Step 4 — Pages
    if (state.selectedService === 'digital-architecture') {
      const chosenType = state.answers['da_website_type'] || '';
      if (chosenType.includes('Simple landing page')) {
        serviceSpecific = serviceSpecific.filter(q => q.id !== 'da_page_count');
      }
    }

    // Step 11: Live Scope Estimate Question
    const scopeEstimateQuestion = {
      id: 'liveScopeEstimate',
      eyebrow: 'Step 11 · Investment Calculation',
      title: 'Your Tailored Scope Estimate',
      subtitle: 'Calculated in real-time based on your exact architectural specifications',
      type: 'scope_estimate',
      required: false
    };

    // Step 12: Budget Question
    const budgetQuestion = {
      id: 'project_budget',
      eyebrow: 'Step 12 · Budget Qualification',
      title: 'What is your budget for this project?',
      subtitle: 'Required · Single selection',
      helper: 'This qualifies project alignment so we can recommend a phased rollout, tailored scope, or custom proposal.',
      type: 'single',
      required: true,
      options: [
        { value: 'Under 5,000 MAD', label: 'Under 5,000 MAD' },
        { value: '5,000–9,999 MAD', label: '5,000–9,999 MAD' },
        { value: '10,000–19,999 MAD', label: '10,000–19,999 MAD' },
        { value: '20,000–39,999 MAD', label: '20,000–39,999 MAD' },
        { value: '40,000–74,999 MAD', label: '40,000–74,999 MAD' },
        { value: '75,000 MAD or more', label: '75,000 MAD or more' },
        { value: 'I need guidance on the right budget', label: 'I need guidance on the right budget' }
      ]
    };

    // Step 13: Timeline Question
    const timelineQuestion = {
      id: 'timeline',
      eyebrow: 'Step 13 · Project Timeline',
      title: 'When would you like to start?',
      subtitle: 'Required · Single selection',
      type: 'single',
      required: true,
      options: [
        { value: 'As soon as possible', label: 'As soon as possible' },
        { value: 'Within one month', label: 'Within one month' },
        { value: 'Within three months', label: 'Within three months' },
        { value: 'I’m exploring options', label: 'I’m exploring options' }
      ]
    };

    // Step 14: Additional Details
    const notesQuestion = {
      id: 'additionalNotes',
      eyebrow: 'Step 14 · Additional Details',
      title: 'Anything else we should know?',
      subtitle: 'Optional · Long text',
      type: 'textarea',
      required: false,
      placeholder: 'Share important requirements, deadlines, technical needs, or questions.'
    };

    // Step 15: Review & Submit
    const agreementQuestion = {
      id: 'reviewAgreement',
      eyebrow: 'Step 15 · Confirmation & Scope Review',
      title: 'Let’s build your digital flagship.',
      subtitle: 'Review your calculated estimate and submit your request for proposal review.',
      type: 'agreement',
      required: true
    };

    return [
      serviceQuestion,
      ...UNIVERSAL_CONTACT_QUESTIONS,
      ...serviceSpecific,
      scopeEstimateQuestion,
      budgetQuestion,
      timelineQuestion,
      notesQuestion,
      agreementQuestion
    ];
  }

  // DOM Elements
  const stageEl = document.getElementById('wizardStage');
  const wizardShell = document.getElementById('wizardShell');
  const stepBadgeEl = document.getElementById('wizardStepBadge');
  const servicePillEl = document.getElementById('wizardServicePill');
  const progressFillEl = document.getElementById('wizardProgressFill');
  const backBtn = document.getElementById('wizardBackBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const hintEl = document.getElementById('wizardHint');
  const errorBanner = document.getElementById('wizardErrorBanner');
  const errorText = document.getElementById('wizardErrorText');

  // Sticky Rail & Mobile Summary Elements
  const stickyRail = document.getElementById('wizardStickyRail');
  const stickyEstServiceTitle = document.getElementById('stickyEstServiceTitle');
  const stickyEstPriceVal = document.getElementById('stickyEstPriceVal');
  const stickyEstPeriod = document.getElementById('stickyEstPeriod');
  const stickyEstMonthlyVal = document.getElementById('stickyEstMonthlyVal');
  const stickyEstCustomBanner = document.getElementById('stickyEstCustomBanner');
  const stickyEstBreakdownList = document.getElementById('stickyEstBreakdownList');

  const mobileBar = document.getElementById('wizardMobileEstimateBar');
  const mobileToggleBtn = document.getElementById('mobileEstToggleBtn');
  const mobilePriceVal = document.getElementById('mobileEstPriceVal');
  const mobileMonthlyVal = document.getElementById('mobileEstMonthlyVal');
  const mobileDrawer = document.getElementById('mobileEstDrawer');
  const mobileContent = document.getElementById('mobileEstContent');

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

  // Live Sticky Rail & Mobile Summary Synchronizer
  function updateStickySummary() {
    if (state.selectedService !== 'digital-architecture' || state.currentStepIndex === 0) {
      if (stickyRail) stickyRail.style.display = 'none';
      if (mobileBar) mobileBar.style.display = 'none';
      if (wizardShell) wizardShell.classList.remove('has-sticky-rail');
      return;
    }

    if (stickyRail) stickyRail.style.display = 'block';
    if (mobileBar) mobileBar.style.display = 'block';
    if (wizardShell) wizardShell.classList.add('has-sticky-rail');

    const est = calculateWebsiteEstimate(state.answers);

    // Update Desktop Sticky Rail
    if (stickyEstServiceTitle) stickyEstServiceTitle.textContent = 'Digital Architecture';

    if (est.isCustom) {
      if (stickyEstPriceVal) stickyEstPriceVal.textContent = 'from 100,000 MAD';
      if (stickyEstPeriod) stickyEstPeriod.textContent = 'Custom proposal required';
      if (stickyEstCustomBanner) stickyEstCustomBanner.style.display = 'flex';
    } else {
      if (stickyEstPriceVal) stickyEstPriceVal.textContent = est.formattedProjectPrice;
      if (stickyEstPeriod) stickyEstPeriod.textContent = 'Estimated project investment';
      if (stickyEstCustomBanner) stickyEstCustomBanner.style.display = 'none';
    }

    if (stickyEstMonthlyVal) {
      if (est.formattedMonthlyPrice) {
        stickyEstMonthlyVal.textContent = `+ ${est.formattedMonthlyPrice}`;
        stickyEstMonthlyVal.style.display = 'flex';
      } else {
        stickyEstMonthlyVal.style.display = 'none';
      }
    }

    // Populate Breakdown list
    const itemsHtml = est.breakdownItems.length > 0
      ? est.breakdownItems.map(item => `
          <li class="s-est-item">
            <span class="s-est-item-label" title="${escapeHtml(item.label)}">✦ ${escapeHtml(item.label)}</span>
            <span class="s-est-item-price ${item.isCustom ? 'is-custom' : ''} ${item.isMonthly ? 'is-monthly' : ''}">${escapeHtml(item.priceStr)}</span>
          </li>
        `).join('')
      : `<li class="s-est-item" style="color: #64748b;"><span>No options selected yet</span></li>`;

    if (stickyEstBreakdownList) stickyEstBreakdownList.innerHTML = itemsHtml;

    // Update Mobile Bar
    if (mobilePriceVal) mobilePriceVal.textContent = est.isCustom ? 'from 100,000 MAD' : est.formattedProjectPrice;
    if (mobileMonthlyVal) {
      if (est.formattedMonthlyPrice) {
        mobileMonthlyVal.textContent = `(+${est.formattedMonthlyPrice})`;
        mobileMonthlyVal.style.display = 'inline';
      } else {
        mobileMonthlyVal.style.display = 'none';
      }
    }
    if (mobileContent) mobileContent.innerHTML = itemsHtml;
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

    // Live Scope Estimate step has no input validation
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

    // Progress Bar & Counter
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

    // Bottom Navigation Buttons
    if (backBtn) {
      backBtn.disabled = (state.currentStepIndex === 0);
    }

    if (nextBtn) {
      if (currentQ.type === 'agreement') {
        nextBtn.innerHTML = `<span>Get My Website Estimate ↗</span>`;
        nextBtn.classList.add('btn-wizard-submit');
      } else if (currentQ.type === 'scope_estimate') {
        nextBtn.innerHTML = `<span>Proceed to Budget Qualification</span><span class="btn-arrow">→</span>`;
        nextBtn.classList.remove('btn-wizard-submit');
      } else {
        nextBtn.innerHTML = `<span>Continue</span><span class="btn-arrow">→</span>`;
        nextBtn.classList.remove('btn-wizard-submit');
      }
    }

    // Helper Hint
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
            const badgeHtml = opt.badge ? `<span class="q-option-badge ${opt.isCustom ? 'custom-tag' : ''}">${opt.badge}</span>` : '';
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
        ${currentQ.helper ? `<p class="q-step-helper-box"><span class="helper-icon">ℹ</span> ${currentQ.helper}</p>` : ''}
        <div class="q-options-stack" role="group" aria-label="${currentQ.title}">
          ${currentQ.options.map((opt, idx) => {
            const isChecked = selectedArr.includes(opt.value);
            const letter = String.fromCharCode(65 + idx);
            const badgeHtml = opt.badge ? `<span class="q-option-badge ${opt.isCustom ? 'custom-tag' : ''}">${opt.badge}</span>` : '';
            return `
              <div class="q-option-row ${isChecked ? 'is-selected' : ''}" data-value="${opt.value}" role="checkbox" aria-checked="${isChecked}" tabindex="0">
                <span class="q-key-pill">${letter}</span>
                <div class="q-option-text-group">
                  <span class="q-option-label">${opt.label}</span>
                  ${badgeHtml}
                </div>
                <span class="q-check-box">${isChecked ? '✓' : ''}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (currentQ.type === 'scope_estimate') {
      const est = calculateWebsiteEstimate(state.answers);
      const svc = SERVICES[state.selectedService];
      
      bodyHtml = `
        <div class="q-scope-estimate-view">
          <div class="q-scope-estimate-card">
            <span class="q-scope-estimate-badge">SCOPE ESTIMATE</span>
            <h3 class="q-scope-service-name">${svc.title}</h3>

            ${est.isCustom ? `
              <div class="s-est-custom-banner" style="margin-bottom: 1.5rem;">
                <div class="s-est-custom-icon">✦</div>
                <div class="s-est-custom-text">
                  <strong style="font-size: 1.05rem;">Custom Proposal Required</strong>
                  <span>This project requires a tailored architecture and proposal. MotaGrowth will prepare a detailed scope, timeline, and investment plan following a discovery session.</span>
                </div>
              </div>

              <div class="q-scope-price-box">
                <span class="q-scope-price-val">from 100,000 MAD</span>
                <span class="q-scope-price-period">Estimated starting investment</span>
              </div>

              <p style="font-size: 0.88rem; color: #cbd5e1; margin-bottom: 1.25rem;">
                Final pricing depends on the agreed scope, integrations, and technical requirements.
              </p>
            ` : `
              <div class="q-scope-price-box">
                <span class="q-scope-price-val">${est.formattedProjectPrice}</span>
                <span class="q-scope-price-period">Estimated project investment</span>
              </div>

              ${est.formattedMonthlyPrice ? `
                <div style="font-family: var(--font-mono); font-size: 1.05rem; font-weight: 600; color: #38bdf8; margin-bottom: 1.25rem;">
                  Monthly support: <strong>${est.formattedMonthlyPrice}</strong>
                </div>
              ` : ''}
            `}

            <div class="q-scope-inclusions">
              <div class="q-scope-inclusions-title">Selected Scope &amp; Deliverables</div>
              <ul class="q-scope-inclusions-list">
                ${est.breakdownItems.map(item => `
                  <li><span class="inc-check">✦</span> <strong>${escapeHtml(item.label)}</strong> <span style="color:var(--brand-gold);">(${escapeHtml(item.priceStr)})</span></li>
                `).join('')}
              </ul>
            </div>

            <div class="q-scope-next-note">
              <svg class="q-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>This is an estimate based on your selections. The final proposal is confirmed after reviewing your project requirements. Third-party costs, hosting, advertising spend, and applicable taxes are additional.</span>
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

      const est = calculateWebsiteEstimate(state.answers);
      const selectedBudget = state.answers['project_budget'] || 'I need guidance on the right budget';
      const budgetRange = parseBudgetRange(selectedBudget);

      let comparisonHead = 'Direct Budget Alignment';
      let comparisonMsg = 'Your selected scope fits your selected budget range. Submit your request and we’ll confirm the final proposal.';
      let alertClass = 'q-alert-fit';
      let showProceedChoices = false;

      if (budgetRange.isGuidance) {
        alertClass = 'q-alert-guidance';
        comparisonHead = 'Consultation & Guidance Requested';
        comparisonMsg = `Your selected scope is estimated at <strong>${est.formattedProjectPrice}</strong>. We will review your goals during our consultation and provide tiered options to match your exact business priorities.`;
      } else if (est.isCustom || est.totalProject > budgetRange.max) {
        alertClass = 'q-alert-above';
        comparisonHead = 'Investment Alignment Note';
        comparisonMsg = `Your selected scope is estimated at <strong>${est.formattedProjectPrice}</strong>. Based on your selected budget (${escapeHtml(selectedBudget)}), we can discuss a phased approach, a reduced initial scope, or a custom proposal.`;
        showProceedChoices = true;
      }

      bodyHtml = `
        <div class="q-agreement-card">
          <!-- Live Comparison Card -->
          <div class="q-budget-comparison-card">
            <div class="q-comparison-row">
              <div class="q-comp-col">
                <span class="q-comp-label">Calculated Scope Estimate</span>
                <span class="q-comp-price">${est.formattedProjectPrice}</span>
                ${est.formattedMonthlyPrice ? `<span style="font-size: 0.82rem; color: #38bdf8;">Monthly Support: ${est.formattedMonthlyPrice}</span>` : ''}
              </div>
              <div class="q-comp-col">
                <span class="q-comp-label">Your Selected Budget</span>
                <span class="q-comp-badge" style="color: var(--brand-gold);">${escapeHtml(selectedBudget)}</span>
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
              I understand this is an estimate based on my selected scope, and final investment is confirmed upon project briefing review. Third-party hosting, domains &amp; subscriptions are separate.
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

    // Update sticky summary rail & mobile bar
    updateStickySummary();

    // Split Phone Listeners
    if (currentQ.type === 'phone_split') {
      const codeSelect = document.getElementById('activeCountryCode');
      const numberInput = document.getElementById('activePhoneNumber');

      const syncPhoneState = () => {
        const code = codeSelect ? codeSelect.value : '+212';
        let rawNum = (numberInput ? numberInput.value : '').trim();
        if (rawNum.startsWith('0') && code !== '+other') {
          rawNum = rawNum.replace(/^0+/, '');
        }
        state.answers['phoneCountryCode'] = code;
        state.answers['phoneNumberRaw'] = rawNum;
        state.answers['phone'] = `${code} ${rawNum}`.trim();
        clearStepError();
      };

      if (codeSelect) codeSelect.addEventListener('change', syncPhoneState);
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
        updateStickySummary();
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
          updateStickySummary();
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
          updateStickySummary();
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
          updateStickySummary();
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

  // Inquiry Submission & Storage
  function submitInquiry() {
    const svc = SERVICES[state.selectedService] || SERVICES['digital-architecture'];
    const refSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const refId = `EST-${svc.title.substring(0, 4).toUpperCase().replace(/\s/g, '')}-${refSuffix}`;

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
    const est = calculateWebsiteEstimate(state.answers);
    const selectedBudget = state.answers['project_budget'] || 'I need guidance on the right budget';
    const proceedPreference = state.answers['proceedPreference'] || '';

    const budgetRange = parseBudgetRange(selectedBudget);
    let budgetAlignment = 'fit';
    if (budgetRange.isGuidance) budgetAlignment = 'guidance';
    else if (est.isCustom || est.totalProject > budgetRange.max) budgetAlignment = 'above';

    // Detailed service responses list
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
      website && website !== '—' ? `WEBSITE / INSTAGRAM: ${website}` : '',
      `ESTIMATED SCOPE: ${est.breakdownItems.map(b => b.label).join(' | ')}`,
      `ESTIMATED INVESTMENT: ${est.formattedProjectPrice}`,
      est.formattedMonthlyPrice ? `MONTHLY SUPPORT: ${est.formattedMonthlyPrice}` : '',
      `SELECTED BUDGET: ${selectedBudget}`,
      `BUDGET ALIGNMENT: ${budgetAlignment.toUpperCase()}`,
      proceedPreference ? `PROCEED PREFERENCE: ${proceedPreference}` : '',
      `TARGET START: ${timeline}`,
      '--- SCOPE SPECIFICATIONS ---',
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
      dealValue: est.formattedProjectPrice,
      monthlySupport: est.formattedMonthlyPrice,
      businessDescription: bizDesc,
      serviceKey: state.selectedService,
      services: [`${svc.title} (${est.formattedProjectPrice})`],
      sector: location || 'Studio Client',
      timeline: timeline,
      priority: (timeline === 'As soon as possible' || timeline === 'Within one month') ? 'High' : (timeline === 'Within three months' ? 'Medium' : 'Low'),
      notes: fullNotes,
      estimatedScope: est.breakdownItems.map(b => b.label).join(', '),
      estimatedPrice: est.formattedProjectPrice,
      budgetAlignment: budgetAlignment,
      proceedPreference: proceedPreference,
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

    renderConfirmation(refId, svc, record, est);
  }

  // Render Confirmation Screen
  function renderConfirmation(refId, svc, record, est) {
    if (progressFillEl) progressFillEl.style.width = '100%';
    if (stepBadgeEl) stepBadgeEl.textContent = 'Estimate Received';
    if (servicePillEl) servicePillEl.style.display = 'none';

    if (stickyRail) stickyRail.style.display = 'none';
    if (mobileBar) mobileBar.style.display = 'none';
    if (wizardShell) wizardShell.classList.remove('has-sticky-rail');

    const footer = document.getElementById('wizardFooter');
    if (footer) footer.style.display = 'none';

    stageEl.innerHTML = `
      <section class="q-confirmation-card slide-from-right">
        <div class="q-conf-icon">✓</div>
        <p class="q-conf-eyebrow">Website Estimate Received · Reference ${refId}</p>
        <h2 class="q-conf-title">Your website estimate has been received.</h2>
        <p class="q-conf-lead">
          Thank you for contacting MotaGrowth. We’ll review your selected scope and contact you to discuss the project, timeline, and final proposal.
        </p>

        <div class="q-conf-summary-grid">
          <div class="q-conf-item">
            <span class="q-conf-lbl">Reference ID</span>
            <span class="q-conf-val q-conf-mono">${refId}</span>
          </div>
          <div class="q-conf-item">
            <span class="q-conf-lbl">Scope Estimate</span>
            <span class="q-conf-val" style="color: var(--brand-gold);">${est.formattedProjectPrice}</span>
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
    const modal = document.getElementById('privacyModal');
    if (modal && modal.classList.contains('is-open')) return;

    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') {
      if (e.key === 'Escape') e.target.blur();
      return;
    }

    const list = getQuestionsList();
    const currentQ = list[state.currentStepIndex];

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

  // Mobile collapsible bar toggle listener
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      const isExpanded = mobileToggleBtn.getAttribute('aria-expanded') === 'true';
      mobileToggleBtn.setAttribute('aria-expanded', !isExpanded);
      if (mobileDrawer) {
        mobileDrawer.style.display = !isExpanded ? 'block' : 'none';
      }
    });
  }

  // Navigation button listeners
  if (nextBtn) nextBtn.addEventListener('click', handleNext);
  if (backBtn) backBtn.addEventListener('click', handleBack);

  // Initial render
  document.addEventListener('DOMContentLoaded', () => {
    renderStep('init');
  });

  // Export engine for debugging
  window._motaProposalEngine = {
    getState: () => state,
    calculateWebsiteEstimate,
    calculateScopeEstimate
  };

})();
