/**
 * MotaGrowth Studio — Project Proposal Scope Wizard Engine
 * One-question-at-a-time fluid experience with dynamic branching,
 * keyboard accessibility, starting prices, and direct CRM persistence.
 */

(function () {
  'use strict';

  // 1. Service Definitions & Starting Prices
  const SERVICES = {
    'performance-marketing': {
      id: 'performance-marketing',
      title: 'Performance Marketing',
      discipline: 'Paid Acquisition & Revenue Scaling',
      price: 'From 5,000 MAD / month',
      shortPrice: '5,000 MAD / month',
      notice: 'Management starts at 5,000 MAD / month for one advertising platform. Advertising spend is separate. Additional platforms, extensive creative production, and advanced tracking are quoted according to scope.',
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
          id: 'pm_budget',
          eyebrow: '04 / Advertising Spend',
          title: 'What is your monthly advertising budget?',
          subtitle: 'Required · Single selection',
          helper: 'This is the amount paid to the advertising platforms, separate from MotaGrowth’s management fee.',
          type: 'single',
          required: true,
          options: [
            { value: 'Under 5,000 MAD', label: 'Under 5,000 MAD' },
            { value: '5,000–9,999 MAD', label: '5,000–9,999 MAD' },
            { value: '10,000–24,999 MAD', label: '10,000–24,999 MAD' },
            { value: '25,000–49,999 MAD', label: '25,000–49,999 MAD' },
            { value: '50,000 MAD or more', label: '50,000 MAD or more' },
            { value: 'Not decided yet', label: 'Not decided yet' }
          ]
        },
        {
          id: 'pm_content',
          eyebrow: '05 / Creative Production',
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
          eyebrow: '06 / Targets & Objectives',
          title: 'What would you like to improve or achieve?',
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
      notice: 'Projects start at 15,000 MAD for a bespoke showcase website of up to 5 pages. E-commerce, advanced animation, custom integrations, hosting, and maintenance are quoted separately.',
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
          title: 'Tell us anything else we should know about the project.',
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
      notice: 'Projects start at 8,000 MAD for a core visual identity: logo system, color palette, typography, and concise brand guidelines. Photography, video production, packaging, and additional collateral are quoted separately.',
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
          placeholder: 'Describe the impression you want to create—for example, refined, bold, understated, editorial, or energetic.'
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
      notice: 'Audits start at 5,000 MAD for one website or funnel, including a conversion review and prioritized improvement plan. Implementation and ongoing testing are quoted separately.',
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
      subtitle: 'Required · Please include your country code',
      type: 'tel',
      required: true,
      placeholder: '+212 6... or +34 6...',
      autocomplete: 'tel'
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

  // 3. Closing Questions (Timing, Extra Notes & Dynamic Review/Agreement)
  const CLOSING_QUESTIONS = [
    {
      id: 'timeline',
      eyebrow: 'Timing · 01',
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
    },
    {
      id: 'additionalNotes',
      eyebrow: 'Timing · 02',
      title: 'Anything else we should know?',
      subtitle: 'Optional · Long text',
      type: 'textarea',
      required: false,
      placeholder: 'Share any important requirements, deadlines, or questions.'
    },
    {
      id: 'reviewAgreement',
      eyebrow: 'Scope Review & Confirmation',
      title: 'Let’s build your next stage of growth.',
      subtitle: 'Review your selected service scope and submit your inquiry.',
      type: 'agreement'
    }
  ];

  // 4. Wizard State Store
  const state = {
    selectedService: 'performance-marketing',
    answers: {},
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

  // Build the dynamic question chain based on currently selected service
  function getQuestionsList() {
    // Step 0: Service Selection
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

    const serviceSpecific = (SERVICES[state.selectedService] || SERVICES['performance-marketing']).questions;

    return [
      serviceQuestion,
      ...UNIVERSAL_CONTACT_QUESTIONS,
      ...serviceSpecific,
      ...CLOSING_QUESTIONS
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
  const privacyModal = document.getElementById('privacyModal');
  const closePrivacyBtn = document.getElementById('closePrivacyBtn');
  const ackPrivacyBtn = document.getElementById('ackPrivacyBtn');

  // Modal Controls
  if (closePrivacyBtn) {
    closePrivacyBtn.addEventListener('click', () => {
      privacyModal?.removeAttribute('open');
      document.body.style.overflow = '';
    });
  }
  if (ackPrivacyBtn) {
    ackPrivacyBtn.addEventListener('click', () => {
      privacyModal?.removeAttribute('open');
      document.body.style.overflow = '';
    });
  }

  function openPrivacy() {
    if (privacyModal) {
      privacyModal.setAttribute('open', '');
      document.body.style.overflow = 'hidden';
    }
  }

  // Validation function for current step
  function validateCurrentStep() {
    const list = getQuestionsList();
    const q = list[state.currentStepIndex];
    if (!q) return true;

    clearStepError();

    // Agreement Step Validation
    if (q.type === 'agreement') {
      const chk = document.getElementById('qAgreeCheckbox');
      if (!chk || !chk.checked) {
        showStepError('Please acknowledge the starting price scope to submit your inquiry.');
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
      if (q.type === 'tel' && String(val).trim().length < 6) {
        showStepError('Please enter a valid phone number including country code.');
        return false;
      }
      if (q.type === 'url') {
        if (!/^https?:\/\/.+/i.test(val)) {
          showStepError('Please enter a full URL starting with https://');
          return false;
        }
      }
    }

    return true;
  }

  function showStepError(msg) {
    let err = document.getElementById('qStepError');
    if (!err) {
      err = document.createElement('div');
      err.id = 'qStepError';
      err.className = 'q-step-error-banner';
      const container = stageEl.querySelector('.q-step-wrap');
      if (container) container.appendChild(err);
    }
    err.textContent = msg;
    err.classList.add('is-visible');
    const input = stageEl.querySelector('.q-input, .q-textarea');
    if (input) input.classList.add('has-error');
  }

  function clearStepError() {
    const err = document.getElementById('qStepError');
    if (err) err.remove();
    const inputs = stageEl.querySelectorAll('.has-error');
    inputs.forEach(i => i.classList.remove('has-error'));
  }

  // Render the current question
  function renderStep(direction) {
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
      } else {
        nextBtn.innerHTML = `<span>Continue</span><span class="btn-arrow">→</span>`;
        nextBtn.classList.remove('btn-wizard-submit');
      }
    }

    if (hintEl) {
      if (currentQ.type === 'single' || currentQ.type === 'service_select') {
        hintEl.innerHTML = `<span>Select an option to proceed · or press <kbd>Enter ↵</kbd></span>`;
      } else if (currentQ.type === 'multi') {
        hintEl.innerHTML = `<span>Select all that apply · then click Continue</span>`;
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
    } else if (currentQ.type === 'single') {
      const currentVal = state.answers[currentQ.id];
      bodyHtml = `
        ${currentQ.helper ? `<p class="q-step-helper-box"><span class="helper-icon">ℹ</span> ${currentQ.helper}</p>` : ''}
        <div class="q-options-stack" role="radiogroup" aria-label="${currentQ.title}">
          ${currentQ.options.map((opt, idx) => {
            const isChecked = currentVal === opt.value;
            const letter = String.fromCharCode(65 + idx);
            return `
              <div class="q-option-row ${isChecked ? 'is-selected' : ''}" data-value="${opt.value}" role="radio" aria-checked="${isChecked}" tabindex="0">
                <span class="q-key-pill">${letter}</span>
                <span class="q-option-label">${opt.label}</span>
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

      bodyHtml = `
        <div class="q-agreement-card">
          <div class="q-agreement-summary-head">
            <span class="q-agree-tag">PROJECT SUMMARY</span>
            <h4 class="q-agree-title">${svc.title}</h4>
            <div class="q-agree-price">${svc.price}</div>
            <p class="q-agree-notice">${svc.notice}</p>
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
            <div class="q-recap-item">
              <span class="q-recap-lbl">Target Timeline</span>
              <span class="q-recap-val">${escapeHtml(timeline)}</span>
            </div>
            <div class="q-recap-item">
              <span class="q-recap-lbl">Commitment</span>
              <span class="q-recap-val">Submitting this form does not commit you to a purchase.</span>
            </div>
          </div>

          <label class="q-agree-row" for="qAgreeCheckbox">
            <input type="checkbox" id="qAgreeCheckbox" class="q-agree-chk">
            <span class="q-agree-text">
              I understand this service starts at <strong>${svc.shortPrice}</strong>, and additional requirements may increase the final quote.
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

    // Focus input if available
    const activeInput = document.getElementById('activeInput');
    if (activeInput) {
      setTimeout(() => {
        try { activeInput.focus(); } catch (e) {}
      }, 50);

      activeInput.addEventListener('input', (e) => {
        state.answers[currentQ.id] = e.target.value.trim();
        clearStepError();
      });

      // Press Enter in text/email/tel/url triggers Next
      if (currentQ.type !== 'textarea') {
        activeInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleNext();
          }
        });
      }
    }

    // Attach listeners for Service Selector
    if (currentQ.type === 'service_select') {
      const boxes = stageEl.querySelectorAll('.q-service-box');
      boxes.forEach(box => {
        const val = box.getAttribute('data-value');
        box.addEventListener('click', () => {
          state.selectedService = val;
          state.answers['selectedService'] = val;
          boxes.forEach(b => {
            const isMatch = b.getAttribute('data-value') === val;
            b.classList.toggle('is-selected', isMatch);
            b.setAttribute('aria-checked', isMatch);
            b.querySelector('.q-check-circle').textContent = isMatch ? '✓' : '';
          });
          clearStepError();
          // Auto advance after short tactile delay
          setTimeout(() => {
            handleNext();
          }, 240);
        });

        box.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            box.click();
          }
        });
      });
    }

    // Attach listeners for Single Choice
    if (currentQ.type === 'single') {
      const rows = stageEl.querySelectorAll('.q-option-row');
      rows.forEach(row => {
        const val = row.getAttribute('data-value');
        row.addEventListener('click', () => {
          state.answers[currentQ.id] = val;
          rows.forEach(r => {
            const isMatch = r.getAttribute('data-value') === val;
            r.classList.toggle('is-selected', isMatch);
            r.setAttribute('aria-checked', isMatch);
            r.querySelector('.q-check-circle').textContent = isMatch ? '✓' : '';
          });
          clearStepError();
          setTimeout(() => {
            handleNext();
          }, 240);
        });

        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            row.click();
          }
        });
      });
    }

    // Attach listeners for Multiple Choice
    if (currentQ.type === 'multi') {
      const rows = stageEl.querySelectorAll('.q-option-row');
      rows.forEach(row => {
        const val = row.getAttribute('data-value');
        row.addEventListener('click', () => {
          let selected = state.answers[currentQ.id] || [];
          if (!Array.isArray(selected)) selected = [];

          if (selected.includes(val)) {
            selected = selected.filter(item => item !== val);
          } else {
            selected.push(val);
          }
          state.answers[currentQ.id] = selected;

          const isSelected = selected.includes(val);
          row.classList.toggle('is-selected', isSelected);
          row.setAttribute('aria-checked', isSelected);
          row.querySelector('.q-check-box').textContent = isSelected ? '✓' : '';
          clearStepError();
        });

        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            row.click();
          }
        });
      });
    }

    // Attach listener for Privacy modal trigger in agreement step
    const privLink = document.getElementById('triggerPrivacyModal');
    if (privLink) {
      privLink.addEventListener('click', (e) => {
        e.preventDefault();
        openPrivacy();
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNext() {
    if (!validateCurrentStep()) return;

    const list = getQuestionsList();
    const currentQ = list[state.currentStepIndex];

    // If agreement step, submit inquiry
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

  // Handle inquiry submission & storage
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
      `TIMELINE: ${timeline}`,
      '--- SERVICE SPECIFIC ---',
      ...answerNotes,
      additionalNotes ? `ADDITIONAL NOTES: ${additionalNotes}` : ''
    ].filter(Boolean).join('\n');

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
      businessDescription: bizDesc,
      serviceKey: state.selectedService,
      services: [`${svc.title} (${svc.price})`],
      sector: location || 'Studio Client',
      timeline: timeline,
      notes: fullNotes,
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

    // Hide bottom wizard footer
    const footer = document.getElementById('wizardFooter');
    if (footer) footer.style.display = 'none';

    stageEl.innerHTML = `
      <section class="q-confirmation-view">
        <div class="q-success-ring" aria-hidden="true">✓</div>
        <h2 class="q-confirmation-heading">Your next stage starts here.</h2>
        <p class="q-confirmation-copy">
          Thank you for reaching out to MotaGrowth. We’ve received your inquiry and will contact you to discuss your project, scope, and next steps.
        </p>

        <div class="q-confirmation-card">
          <div class="q-conf-row">
            <span class="q-conf-lbl">Inquiry Reference</span>
            <span class="q-conf-val q-conf-ref">${refId}</span>
          </div>
          <div class="q-conf-row">
            <span class="q-conf-lbl">Selected Service</span>
            <span class="q-conf-val">${svc.title}</span>
          </div>
          <div class="q-conf-row">
            <span class="q-conf-lbl">Scope Foundation</span>
            <span class="q-conf-val">${svc.price}</span>
          </div>
          <div class="q-conf-row">
            <span class="q-conf-lbl">Client Contact</span>
            <span class="q-conf-val">${escapeHtml(record.clientName)} (${escapeHtml(record.companyName)})</span>
          </div>
          <div class="q-conf-row">
            <span class="q-conf-lbl">Direct WhatsApp</span>
            <span class="q-conf-val">${escapeHtml(record.clientPhone)}</span>
          </div>
          <div class="q-conf-row">
            <span class="q-conf-lbl">Target Timeline</span>
            <span class="q-conf-val">${escapeHtml(record.timeline)}</span>
          </div>
        </div>

        <div class="q-confirmation-actions">
          <a href="https://wa.me/34675194956?text=Hello%20MotaGrowth%2C%20I%20just%20submitted%20inquiry%20${refId}%20and%20wanted%20to%20connect%20directly."
             target="_blank" rel="noopener" class="btn-ref btn-ref-gold">
            <span class="btn-text">Connect on WhatsApp Direct ↗</span>
          </a>
          <a href="index.html" class="btn-ref">
            <span class="btn-text">Return to Studio Home</span>
          </a>
          <button type="button" class="btn-ref" id="restartWizardBtn">
            <span class="btn-text">Start Another Inquiry</span>
          </button>
        </div>
      </section>
    `;

    const restartBtn = document.getElementById('restartWizardBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        state.answers = {};
        state.currentStepIndex = 0;
        if (footer) footer.style.display = 'block';
        renderStep('back');
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Keyboard shortcut navigation (Letter keys A, B, C, D, Esc, Enter)
  window.addEventListener('keydown', (e) => {
    // If typing in input or textarea, let user type
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    if (e.key === 'Escape') {
      if (privacyModal && privacyModal.hasAttribute('open')) {
        privacyModal.removeAttribute('open');
        document.body.style.overflow = '';
      } else {
        handleBack();
      }
      return;
    }

    if (isTyping) return;

    // A-Z shortcut for options
    if (/^[a-z]$/i.test(e.key)) {
      const charCode = e.key.toUpperCase().charCodeAt(0);
      const optionIndex = charCode - 65;
      const options = stageEl.querySelectorAll('.q-service-box, .q-option-row');
      if (options[optionIndex]) {
        options[optionIndex].click();
      }
    }
  });

  // Attach button listeners
  if (nextBtn) nextBtn.addEventListener('click', handleNext);
  if (backBtn) backBtn.addEventListener('click', handleBack);

  // Helper function to escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initial Step Render
  renderStep('init');

})();
