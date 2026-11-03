/**
 * MotaGrowth Studio — Human-Crafted Micro-Interactions & Experience Layer
 * - Dynamic Local Geolocation & Real-time Clock
 * - Smart Scroll-Aware Navigation Bar
 * - Interactive Cursor Ambient Light & Kinetic Headline Parallax
 * - Interactive 3D Perspective Card Tilt & Specular Lighting
 * - Custom Precision Studio Cursor
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. Live Geolocation & Local Time Clock (Automatic Country & City Detection)
  // ========================================================================
  const clockEl = document.getElementById('studio-clock');
  const frameClockEl = document.getElementById('frame-clock-display');

  let detectedLocation = '';

  // 1A. Comprehensive IANA Timezone to Location Map (Instant 0ms fallback)
  const tzToLocation = {
    // United States
    'America/New_York': 'NEW YORK US',
    'America/Detroit': 'DETROIT US',
    'America/Kentucky/Louisville': 'LOUISVILLE US',
    'America/Chicago': 'CHICAGO US',
    'America/Indiana/Indianapolis': 'INDIANAPOLIS US',
    'America/Denver': 'DENVER US',
    'America/Boise': 'BOISE US',
    'America/Phoenix': 'PHOENIX US',
    'America/Los_Angeles': 'LOS ANGELES US',
    'America/Anchorage': 'ANCHORAGE US',
    'Pacific/Honolulu': 'HONOLULU US',

    // Morocco
    'Africa/Casablanca': 'CASABLANCA MA',
    'Africa/El_Aaiun': 'LAAYOUNE MA',

    // Spain
    'Europe/Madrid': 'MADRID ES',
    'Africa/Ceuta': 'CEUTA ES',
    'Atlantic/Canary': 'CANARY ES',

    // Brazil
    'America/Sao_Paulo': 'SÃO PAULO BR',
    'America/Rio_Branco': 'RIO BRANCO BR',
    'America/Manaus': 'MANAUS BR',
    'America/Belem': 'BELÉM BR',
    'America/Fortaleza': 'FORTALEZA BR',
    'America/Recife': 'RECIFE BR',
    'America/Cuiaba': 'CUIABÁ BR',
    'America/Bahia': 'SALVADOR BR',

    // Canada
    'America/Toronto': 'TORONTO CA',
    'America/Vancouver': 'VANCOUVER CA',
    'America/Montreal': 'MONTREAL CA',
    'America/Edmonton': 'EDMONTON CA',
    'America/Winnipeg': 'WINNIPEG CA',
    'America/Halifax': 'HALIFAX CA',

    // Latin America
    'America/Mexico_City': 'MEXICO CITY MX',
    'America/Bogota': 'BOGOTÁ CO',
    'America/Buenos_Aires': 'BUENOS AIRES AR',
    'America/Santiago': 'SANTIAGO CL',
    'America/Lima': 'LIMA PE',

    // Europe
    'Europe/London': 'LONDON GB',
    'Europe/Paris': 'PARIS FR',
    'Europe/Berlin': 'BERLIN DE',
    'Europe/Rome': 'ROME IT',
    'Europe/Amsterdam': 'AMSTERDAM NL',
    'Europe/Brussels': 'BRUSSELS BE',
    'Europe/Lisbon': 'LISBON PT',
    'Europe/Zurich': 'ZURICH CH',
    'Europe/Vienna': 'VIENNA AT',
    'Europe/Dublin': 'DUBLIN IE',
    'Europe/Stockholm': 'STOCKHOLM SE',
    'Europe/Oslo': 'OSLO NO',
    'Europe/Copenhagen': 'COPENHAGEN DK',
    'Europe/Helsinki': 'HELSINKI FI',
    'Europe/Warsaw': 'WARSAW PL',
    'Europe/Prague': 'PRAGUE CZ',
    'Europe/Budapest': 'BUDAPEST HU',
    'Europe/Athens': 'ATHENS GR',
    'Europe/Kyiv': 'KYIV UA',
    'Europe/Bucharest': 'BUCHAREST RO',
    'Europe/Istanbul': 'ISTANBUL TR',

    // Middle East & Africa
    'Asia/Dubai': 'DUBAI AE',
    'Asia/Riyadh': 'RIYADH SA',
    'Asia/Qatar': 'DOHA QA',
    'Africa/Cairo': 'CAIRO EG',
    'Africa/Johannesburg': 'JOHANNESBURG ZA',
    'Africa/Lagos': 'LAGOS NG',
    'Africa/Nairobi': 'NAIROBI KE',
    'Africa/Tunis': 'TUNIS TN',
    'Africa/Algiers': 'ALGIERS DZ',

    // Asia & Pacific
    'Asia/Tokyo': 'TOKYO JP',
    'Asia/Seoul': 'SEOUL KR',
    'Asia/Singapore': 'SINGAPORE SG',
    'Asia/Hong_Kong': 'HONG KONG HK',
    'Asia/Shanghai': 'SHANGHAI CN',
    'Asia/Bangkok': 'BANGKOK TH',
    'Asia/Kolkata': 'MUMBAI IN',
    'Asia/Jakarta': 'JAKARTA ID',
    'Australia/Sydney': 'SYDNEY AU',
    'Australia/Melbourne': 'MELBOURNE AU',
    'Australia/Brisbane': 'BRISBANE AU',
    'Australia/Perth': 'PERTH AU',
    'Pacific/Auckland': 'AUCKLAND NZ'
  };

  // Determine initial location instantly from browser timezone
  let detectedTimezone = 'Africa/Casablanca';
  try {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (userTz) detectedTimezone = userTz;
    if (userTz && tzToLocation[userTz]) {
      detectedLocation = tzToLocation[userTz];
    } else if (userTz) {
      const parts = userTz.split('/');
      const city = parts[parts.length - 1].replace(/_/g, ' ').toUpperCase();
      let countrySuffix = '';
      if (navigator.language && navigator.language.includes('-')) {
        countrySuffix = ' ' + navigator.language.split('-')[1].toUpperCase();
      }
      detectedLocation = city + countrySuffix;
    }
  } catch {
    detectedLocation = 'CASABLANCA MA';
  }

  // 1B. Fast asynchronous IP Geolocation to refine exact city & country
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      if (data && data.city && data.country_code) {
        detectedLocation = `${data.city.toUpperCase()} ${data.country_code.toUpperCase()}`;
        if (data.timezone) detectedTimezone = data.timezone;
        updateClock();
      }
    })
    .catch(() => {
      fetch('https://ipwho.is/')
        .then(res => res.json())
        .then(data => {
          if (data && data.city && data.country_code) {
            detectedLocation = `${data.city.toUpperCase()} ${data.country_code.toUpperCase()}`;
            if (data.timezone && data.timezone.id) detectedTimezone = data.timezone.id;
            updateClock();
          }
        })
        .catch(() => {});
    });

  function updateClock() {
    const now = new Date();
    let timeString;

    // Morocco is officially on GMT (UTC+0)
    const isMorocco = detectedLocation.includes('MA') || 
                      detectedLocation.includes('CASABLANCA') || 
                      detectedLocation.includes('MOROCCO') || 
                      detectedTimezone === 'Africa/Casablanca';

    if (isMorocco) {
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      timeString = `${h}:${m}`;
    } else {
      try {
        const options = {
          timeZone: detectedTimezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        };
        timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
      } catch {
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        timeString = `${h}:${m}`;
      }
    }

    const display = detectedLocation ? `${timeString}, ${detectedLocation}` : timeString;

    if (clockEl) clockEl.textContent = display;
    if (frameClockEl) frameClockEl.textContent = display;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // ========================================================================
  // 2. Smart Sticky Header (Hide on scroll down, reappear on scroll up)
  // ========================================================================
  const header = document.getElementById('site-header');
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeaderOnScroll = () => {
      const currentScrollY = window.scrollY;

      // Only toggle after scrolling past top of hero
      if (currentScrollY > 260) {
        if (currentScrollY > lastScrollY + 6) {
          // Scrolling Down -> Hide Header
          header.classList.remove('header-visible');
          header.classList.add('header-hidden');
        } else if (currentScrollY < lastScrollY - 6) {
          // Scrolling Up -> Show Header
          header.classList.remove('header-hidden');
          header.classList.add('header-visible');
        }
      } else {
        // Near Top of Page -> Hide fixed sticky header (frame bar is visible)
        header.classList.remove('header-visible');
        header.classList.add('header-hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderOnScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // ========================================================================
  // 3. Interactive Ambient Light & Kinetic Parallax on Hero Section
  // ========================================================================
  const heroSection = document.getElementById('hero');
  const ambientLight = document.getElementById('hero-cursor-ambient');
  const blockTop = document.querySelector('.block-top');
  const blockMid = document.querySelector('.block-mid');
  const blockBot = document.querySelector('.block-bot');

  if (heroSection && ambientLight) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isHoveringHero = false;

    heroSection.addEventListener('mouseenter', () => {
      isHoveringHero = true;
      ambientLight.style.opacity = '1';
    });

    heroSection.addEventListener('mouseleave', () => {
      isHoveringHero = false;
      ambientLight.style.opacity = '0';
      if (blockTop) blockTop.style.transform = '';
      if (blockMid) blockMid.style.transform = '';
      if (blockBot) blockBot.style.transform = '';
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Normalized offset from center [-1, 1]
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normX = (mouseX - centerX) / centerX;
      const normY = (mouseY - centerY) / centerY;

      // Kinetic Parallax on Headline Blocks
      if (blockTop) {
        blockTop.style.transform = `translate3d(${normX * -10}px, ${normY * -6}px, 0)`;
      }
      if (blockMid) {
        blockMid.style.transform = `translate3d(${normX * 14}px, ${normY * 8}px, 0)`;
      }
      if (blockBot) {
        blockBot.style.transform = `translate3d(${normX * -8}px, ${normY * 5}px, 0)`;
      }
    });

    // Smooth lerp for ambient light
    const renderAmbient = () => {
      if (isHoveringHero) {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        ambientLight.style.left = `${currentX}px`;
        ambientLight.style.top = `${currentY}px`;
      }
      requestAnimationFrame(renderAmbient);
    };
    renderAmbient();
  }

  // ========================================================================
  // 4. Interactive 3D Perspective Tilt & Specular Glare on Cards
  // ========================================================================
  const cards = document.querySelectorAll('.comma-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Pass coordinates for specular glare
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

      // 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ========================================================================
  // 4B. Soft Diffused Champagne-Gold Atmospheric Glow (Smooth Drift)
  // ========================================================================
  const constellation = document.getElementById('outcomes-constellation');
  const champagneGlow = document.getElementById('outcomes-glow');

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (constellation && champagneGlow && canHover && !prefersReducedMotion) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    constellation.addEventListener('mousemove', (e) => {
      const rect = constellation.getBoundingClientRect();
      // Normalized offset from center [-1, 1]
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Gentle drift: text stays completely still while glow moves smoothly
      targetX = normX * 42;
      targetY = normY * 30;
    });

    constellation.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      champagneGlow.style.transform = `translate(calc(-50% + ${currentX.toFixed(2)}px), calc(-50% + ${currentY.toFixed(2)}px))`;
      requestAnimationFrame(updateGlow);
    };
    updateGlow();
  }

  // ========================================================================
  // 5. Custom Precision Studio Cursor (Desktop Only)
  // ========================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hasMoved = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        document.body.classList.add('cursor-active');
        ringX = mouseX;
        ringY = mouseY;
        hasMoved = true;
      }

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
    });

    document.addEventListener('mouseenter', () => {
      if (hasMoved) document.body.classList.add('cursor-active');
    });

    window.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-clicking');
    });

    window.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-clicking');
    });

    const updateRing = () => {
      if (hasMoved) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
      }
      requestAnimationFrame(updateRing);
    };
    updateRing();

    // Event delegation for interactive hover states across all interactive elements
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, [role="button"], .btn-ref, .btn-outcomes-gold, .btn-contact-header, .comma-card, .frame-brand, .frame-menu-dots, .lang-btn, .proof-point, .case-flow-card, .cases-nav-btn, .cases-dot, .cases-cta-btn');
      if (target) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  // ========================================================================
  // 6. Internationalization / Language Switcher (EN <-> FR)
  // ========================================================================
  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.audiences': 'Audiences',
      'nav.cases': 'Cases',
      'btn.proposal': 'REQUEST PROPOSAL',
      'btn.cases': 'OUR CASES',
      'hero.line1': 'WE TURN',
      'hero.line2': 'ATTENTION',
      'hero.line3prefix': 'INTO ',
      'hero.line3accent': 'GROWTH',
      'hero.m1': 'WE',
      'hero.m2': 'TURN',
      'hero.m3': 'ATTENTION',
      'hero.m4': 'INTO',
      'hero.m5': 'GROWTH',
      'hero.subLeft': 'We build <span class="highlight-gold">full-service</span> growth engines —<br>for founders, ambitious brands, and hospitality.',
      'hero.subRight': 'and turn attention<br>into scalable revenue.',
      'audiences.title': 'MOTAGROWTH SCALES<br>THE BRANDS OF FOUNDERS<br>HOSPITALITY &amp; E-COM',
      'card1.title': 'FOUNDERS &amp; E-COMMERCE',
      'card1.desc': 'Performance marketing, conversion-focused web design, and scalable acquisition funnels.',
      'card2.title': 'HOSPITALITY &amp; NIGHTLIFE',
      'card2.desc': 'Distinctive brand identity, creative direction, and premium booking experiences in Morocco &amp; beyond.',
      'card3.title': 'SERVICE &amp; ENTERPRISE',
      'card3.desc': 'Systematic lead generation, brand authority, and rigorous conversion optimization.',
      'btn.examples': 'VIEW CASE STUDIES',
      'outcomes.line1': 'STRATEGY MEETS',
      'outcomes.line2': 'PERFORMANCE.',
      'outcomes.support': 'WE CONNECT DESIGN, MARKETING, AND TECHNOLOGY TO HELP BRANDS GROW.',
      'outcomes.topHead': 'GROWTH',
      'outcomes.topSub': 'at the heart of every decision',
      'outcomes.leftHead': 'STRATEGY',
      'outcomes.leftSub': 'clear direction. focused execution.',
      'outcomes.centreHead': 'DESIGN',
      'outcomes.centreSub': 'built to stand out. made to convert.',
      'outcomes.rightHead': 'PERFORMANCE',
      'outcomes.rightSub': 'campaigns tested, measured, and refined.',
      'outcomes.bottomHead': 'PARTNERSHIP',
      'outcomes.bottomSub': 'clear communication. shared ambition.',
      'outcomes.cta': 'EXPLORE OUR SERVICES ↗',
      'outcomes.stmtLeft': 'FROM FIRST IMPRESSION',
      'outcomes.capLeft': 'MAKE YOUR BRAND MATTER.',
      'outcomes.stmtRight': 'TO LASTING GROWTH.',
      'outcomes.capRight': 'TURN ATTENTION INTO ACTION.',
      'cases.title': 'CASES THAT TELL THE STORY',
      'cases.subtitle': 'VISUALLY STRONG. LOGICALLY BUILT. BACKED BY RESULTS.',
      'cases.cta': 'VIEW PRESENTATIONS'
    },
    fr: {
      'nav.home': 'Accueil',
      'nav.audiences': 'Secteurs',
      'nav.cases': 'Projets',
      'btn.proposal': 'DEMANDER UN DEVIS',
      'btn.cases': 'NOS PROJETS',
      'hero.line1': 'NOUS TRANSFORMONS',
      'hero.line2': "L'ATTENTION",
      'hero.line3prefix': 'EN ',
      'hero.line3accent': 'CROISSANCE',
      'hero.m1': 'NOUS',
      'hero.m2': 'TRANSFORMANS',
      'hero.m3': "L'ATTENTION",
      'hero.m4': 'EN',
      'hero.m5': 'CROISSANCE',
      'hero.subLeft': 'Nous bâtissons des moteurs de croissance <span class="highlight-gold">sur-mesure</span> —<br>pour fondateurs, marques et hospitalité.',
      'hero.subRight': "et convertissons l'attention<br>en revenus scalables.",
      'audiences.title': 'MOTAGROWTH ACCÉLÈRE<br>LES MARQUES DE FONDATEURS<br>HOSPITALITÉ &amp; E-COM',
      'card1.title': 'FONDATEURS &amp; E-COMMERCE',
      'card1.desc': "Marketing de performance, web design orienté conversion et tunnels d'acquisition scalables.",
      'card2.title': 'HOSPITALITÉ &amp; NIGHTLIFE',
      'card2.desc': "Identité de marque distinctive, direction créative et expériences de réservation haut de gamme au Maroc &amp; à l'international.",
      'card3.title': 'SERVICES &amp; ENTREPRISES',
      'card3.desc': 'Génération systématique de leads, autorité de marque et optimisation rigoureuse de la conversion.',
      'btn.examples': 'VOIR LES ÉTUDES DE CAS',
      'outcomes.line1': 'LA STRATÉGIE RENCONTRE',
      'outcomes.line2': 'LA PERFORMANCE.',
      'outcomes.support': 'NOUS CONNECTONS DESIGN, MARKETING ET TECHNOLOGIE POUR FAIRE GRANDIR LES MARQUES.',
      'outcomes.topHead': 'CROISSANCE',
      'outcomes.topSub': 'au cœur de chaque décision',
      'outcomes.leftHead': 'STRATÉGIE',
      'outcomes.leftSub': 'direction claire. exécution ciblée.',
      'outcomes.centreHead': 'DESIGN',
      'outcomes.centreSub': 'conçu pour marquer les esprits. fait pour convertir.',
      'outcomes.rightHead': 'PERFORMANCE',
      'outcomes.rightSub': 'campagnes testées, mesurées et affinées.',
      'outcomes.bottomHead': 'PARTENARIAT',
      'outcomes.bottomSub': 'communication transparente. ambition partagée.',
      'outcomes.cta': 'DÉCOUVRIR NOS SERVICES ↗',
      'outcomes.stmtLeft': 'DE LA PREMIÈRE IMPRESSION',
      'outcomes.capLeft': 'DONNEZ DU SENS À VOTRE MARQUE.',
      'outcomes.stmtRight': 'À UNE CROISSANCE DURABLE.',
      'outcomes.capRight': "TRANSFORMEZ L'ATTENTION EN ACTION.",
      'cases.title': "DES CAS QUI RACONTENT L'HISTOIRE",
      'cases.subtitle': 'VISUELLEMENT FORTS. LOGIQUEMENT CONÇUS. VALIDÉS PAR LES RÉSULTATS.',
      'cases.cta': 'VOIR LES PRÉSENTATIONS'
    }
  };

  let currentLang = localStorage.getItem('motagrowth_lang') || 'en';

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('motagrowth_lang', lang);

    document.documentElement.lang = lang;

    // Update active class on all lang buttons across both headers
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = translations[lang][key];
      if (val !== undefined) {
        if (val.includes('<')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });
  }

  // Bind click handlers to all lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang === currentLang) return;

      document.body.classList.add('lang-transition');
      setTimeout(() => {
        applyLanguage(targetLang);
        document.body.classList.remove('lang-transition');
      }, 150);
    });
  });

  // Apply saved language on load if French
  if (currentLang !== 'en') {
    applyLanguage(currentLang);
  }

  // ========================================================================
  // 7. Interactive 3D Cover Flow Cases Showcase (Admin-Ready Data Layer)
  // ========================================================================
  const defaultCases = [
    {
      id: 1,
      title: 'SkyRoute — Brand Event',
      subtitle: 'FastLine Launch',
      category: 'Brand Experience',
      image: '',
      link: '#'
    },
    {
      id: 2,
      title: 'Fintech Company',
      subtitle: 'CEO-Level Event',
      category: 'Enterprise',
      image: '',
      link: '#'
    },
    {
      id: 3,
      title: 'Corporate Event',
      subtitle: 'Global Leadership Summit',
      category: 'Hospitality',
      image: '',
      link: '#'
    },
    {
      id: 4,
      title: 'E-Commerce Scale',
      subtitle: 'Full-Funnel Growth',
      category: 'Performance',
      image: '',
      link: '#'
    },
    {
      id: 5,
      title: 'Hospitality Flagship',
      subtitle: 'Brand & Booking CRO',
      category: 'Creative Direction',
      image: '',
      link: '#'
    }
  ];

  // Global Admin Access Layer (Can be read & mutated by the upcoming admin panel)
  window.MotaCases = {
    getAll: function() {
      try {
        const stored = localStorage.getItem('motagrowth_cases');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored cases', e);
      }
      return defaultCases;
    },
    save: function(casesArray) {
      localStorage.setItem('motagrowth_cases', JSON.stringify(casesArray));
      if (typeof window.renderCasesCarousel === 'function') {
        window.renderCasesCarousel();
      }
    },
    reset: function() {
      localStorage.removeItem('motagrowth_cases');
      if (typeof window.renderCasesCarousel === 'function') {
        window.renderCasesCarousel();
      }
    }
  };

  const section = document.getElementById('cases');
  const track = document.getElementById('cases-track');
  const prevBtn = document.getElementById('cases-prev');
  const nextBtn = document.getElementById('cases-next');
  const dotsContainer = document.getElementById('cases-dots');

  if (track && section) {
    let cases = window.MotaCases.getAll();
    let currentFloatIndex = 0;
    let targetFloatIndex = 0;

    function renderCasesCarousel() {
      cases = window.MotaCases.getAll();
      track.innerHTML = '';
      if (dotsContainer) dotsContainer.innerHTML = '';

      cases.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'case-flow-card';
        card.setAttribute('data-index', index);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${item.title} — ${item.subtitle}`);

        // Render uploaded image or high-end blank studio placeholder
        const hasImage = item.image && item.image.trim() !== '';
        const mediaContent = hasImage
          ? `<img src="${item.image}" alt="${item.title}" class="case-image" loading="lazy">`
          : `<div class="case-blank-inner">
               <span class="case-badge-pill">CASE ${String(index + 1).padStart(2, '0')}</span>
               <p class="case-placeholder-notice">Studio Case Asset<br><span style="font-size:0.68rem; opacity:0.6;">(Configurable via Admin)</span></p>
             </div>`;

        card.innerHTML = `
          <div class="case-media-box">
            ${mediaContent}
          </div>
          <div class="case-info-block">
            <h3 class="case-title-text">${item.title}</h3>
            <p class="case-sub-text">${item.subtitle}</p>
          </div>
        `;

        card.addEventListener('click', () => {
          scrollToCaseIndex(index);
        });

        track.appendChild(card);

        // Dot indicator
        if (dotsContainer) {
          const dot = document.createElement('button');
          dot.className = `cases-dot ${index === 0 ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to case ${index + 1}`);
          dot.addEventListener('click', () => {
            scrollToCaseIndex(index);
          });
          dotsContainer.appendChild(dot);
        }
      });

      updateFromScroll();
      currentFloatIndex = targetFloatIndex;
      applyCardPositions(currentFloatIndex);
    }

    // Smooth continuous 3D card layout based on continuous float index
    function applyCardPositions(floatIndex) {
      const cards = track.querySelectorAll('.case-flow-card');
      const dots = dotsContainer ? dotsContainer.querySelectorAll('.cases-dot') : [];
      const activeIdx = Math.max(0, Math.min(cases.length - 1, Math.round(floatIndex)));

      cards.forEach((card, index) => {
        const offset = index - floatIndex;
        const abs = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        let tx = 0;
        let rY = 0;
        let tZ = 0;
        let sc = 1;
        let op = 1;
        let br = 1;
        let z = 10;

        if (abs <= 1) {
          // Continuous interpolation around the active card
          tx = sign * abs * 70;
          rY = -sign * abs * 16;
          tZ = -abs * 120;
          sc = 1.05 - abs * 0.17;
          op = 1 - abs * 0.28;
          br = 1 - abs * 0.35;
          z = Math.round(10 - abs * 2);
        } else if (abs <= 2) {
          // Continuous interpolation for secondary neighbor
          const t = abs - 1;
          tx = sign * (70 + t * 62);
          rY = -sign * (16 + t * 10);
          tZ = -(120 + t * 120);
          sc = 0.88 - t * 0.16;
          op = 0.72 - t * 0.28;
          br = 0.65 - t * 0.25;
          z = Math.round(8 - t * 2);
        } else {
          // Outlying cards
          const t = Math.min(1, abs - 2);
          tx = sign * (132 + t * 50);
          rY = -sign * (26 + t * 6);
          tZ = -(240 + t * 160);
          sc = Math.max(0.5, 0.72 - t * 0.22);
          op = Math.max(0, 0.44 - t * 0.44);
          br = 0.35;
          z = 1;
        }

        card.style.transform = `translate3d(${tx}%, 0, ${tZ}px) rotateY(${rY}deg) scale(${sc})`;
        card.style.opacity = op;
        card.style.filter = `brightness(${br})`;
        card.style.zIndex = z;
        card.style.pointerEvents = abs > 2.5 ? 'none' : 'auto';

        card.classList.toggle('active', index === activeIdx);
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIdx);
      });
    }

    // Calculate vertical scroll progress inside the cases container
    function getScrollProgress() {
      const rect = section.getBoundingClientRect();
      const maxScroll = section.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;

      // rect.top is distance from viewport top to section top
      // When section hits viewport top: rect.top = 0.
      // As user scrolls down, rect.top becomes negative until -maxScroll.
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / maxScroll));
    }

    function updateFromScroll() {
      const rect = section.getBoundingClientRect();
      // If within scrolling range
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const progress = getScrollProgress();
        targetFloatIndex = progress * (cases.length - 1);
      }
    }

    // Scroll window smoothly to a specific case index
    function scrollToCaseIndex(index) {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const maxScroll = section.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const targetProgress = index / (cases.length - 1);
      const targetScroll = sectionTop + targetProgress * maxScroll;

      targetFloatIndex = index;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }

    // Smooth animation loop for physics-based fluid horizontal scrubbing
    function animLoop() {
      const diff = targetFloatIndex - currentFloatIndex;
      if (Math.abs(diff) > 0.0005) {
        currentFloatIndex += diff * 0.14;
        applyCardPositions(currentFloatIndex);
      }
      requestAnimationFrame(animLoop);
    }
    requestAnimationFrame(animLoop);

    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll, { passive: true });

    window.renderCasesCarousel = renderCasesCarousel;
    renderCasesCarousel();

    // Controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const currentInt = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.max(0, currentInt - 1));
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentInt = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.min(cases.length - 1, currentInt + 1));
      });
    }

    // Keyboard Arrow navigation when section is in view
    document.addEventListener('keydown', (e) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        const currentInt = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.max(0, currentInt - 1));
      } else if (e.key === 'ArrowRight') {
        const currentInt = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.min(cases.length - 1, currentInt + 1));
      }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) {
        const currentInt = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.min(cases.length - 1, currentInt + 1));
      } else if (touchEndX - touchStartX > 40) {
        const currentInt = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.max(0, currentInt - 1));
      }
    }, { passive: true });
  }

});
