/**
 * MotaGrowth Studio — Human-Crafted Micro-Interactions & Experience Layer
 * - Studio Time (Casablanca MA) via Native IANA Timezone (Zero External Trackers)
 * - Smart Scroll-Aware Navigation Bar
 * - Energy-Efficient Intersection-Observed Hero Parallax & Ambient Light
 * - Diffused Atmospheric Champagne Glow
 * - Interactive 3D Perspective Card Tilt
 * - Responsive 3D Cover Flow Showcase (Orsap.ma, TG2D, La Centrale Crèche)
 * - Studio Precision Cursor (Pointer-Fine Gated)
 * - Accessible Modal Dialogs (Privacy Statement & Terms of Engagement)
 * - Full Internationalization (EN / FR)
 */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ========================================================================
  // 1. Visitor Local Time & Country Clock (Auto-Detects Visitor's Country & Time)
  // ========================================================================
  const clockEl = document.getElementById('studio-clock');
  const frameClockEl = document.getElementById('frame-clock-display');

  // IANA timezone to Country Code mapping (Zero-latency instant resolution)
  const TZ_TO_COUNTRY = {
  "Europe/Andorra": "AD",
  "Asia/Dubai": "AE",
  "Asia/Kabul": "AF",
  "America/Antigua": "AG",
  "America/Anguilla": "AI",
  "Europe/Tirane": "AL",
  "Asia/Yerevan": "AM",
  "Africa/Luanda": "AO",
  "Antarctica/McMurdo": "AQ",
  "Antarctica/Casey": "AQ",
  "Antarctica/Davis": "AQ",
  "Antarctica/DumontDUrville": "AQ",
  "Antarctica/Mawson": "AQ",
  "Antarctica/Palmer": "AQ",
  "Antarctica/Rothera": "AQ",
  "Antarctica/Syowa": "AQ",
  "Antarctica/Troll": "AQ",
  "Antarctica/Vostok": "AQ",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Argentina/Cordoba": "AR",
  "America/Argentina/Salta": "AR",
  "America/Argentina/Jujuy": "AR",
  "America/Argentina/Tucuman": "AR",
  "America/Argentina/Catamarca": "AR",
  "America/Argentina/La_Rioja": "AR",
  "America/Argentina/San_Juan": "AR",
  "America/Argentina/Mendoza": "AR",
  "America/Argentina/San_Luis": "AR",
  "America/Argentina/Rio_Gallegos": "AR",
  "America/Argentina/Ushuaia": "AR",
  "Pacific/Pago_Pago": "AS",
  "Europe/Vienna": "AT",
  "Australia/Lord_Howe": "AU",
  "Antarctica/Macquarie": "AU",
  "Australia/Hobart": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Sydney": "AU",
  "Australia/Broken_Hill": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Lindeman": "AU",
  "Australia/Adelaide": "AU",
  "Australia/Darwin": "AU",
  "Australia/Perth": "AU",
  "Australia/Eucla": "AU",
  "America/Aruba": "AW",
  "Europe/Mariehamn": "AX",
  "Asia/Baku": "AZ",
  "Europe/Sarajevo": "BA",
  "America/Barbados": "BB",
  "Asia/Dhaka": "BD",
  "Europe/Brussels": "BE",
  "Africa/Ouagadougou": "BF",
  "Europe/Sofia": "BG",
  "Asia/Bahrain": "BH",
  "Africa/Bujumbura": "BI",
  "Africa/Porto-Novo": "BJ",
  "America/St_Barthelemy": "BL",
  "Atlantic/Bermuda": "BM",
  "Asia/Brunei": "BN",
  "America/La_Paz": "BO",
  "America/Kralendijk": "BQ",
  "America/Noronha": "BR",
  "America/Belem": "BR",
  "America/Fortaleza": "BR",
  "America/Recife": "BR",
  "America/Araguaina": "BR",
  "America/Maceio": "BR",
  "America/Bahia": "BR",
  "America/Sao_Paulo": "BR",
  "America/Campo_Grande": "BR",
  "America/Cuiaba": "BR",
  "America/Santarem": "BR",
  "America/Porto_Velho": "BR",
  "America/Boa_Vista": "BR",
  "America/Manaus": "BR",
  "America/Eirunepe": "BR",
  "America/Rio_Branco": "BR",
  "America/Nassau": "BS",
  "Asia/Thimphu": "BT",
  "Africa/Gaborone": "BW",
  "Europe/Minsk": "BY",
  "America/Belize": "BZ",
  "America/St_Johns": "CA",
  "America/Halifax": "CA",
  "America/Glace_Bay": "CA",
  "America/Moncton": "CA",
  "America/Goose_Bay": "CA",
  "America/Blanc-Sablon": "CA",
  "America/Toronto": "CA",
  "America/Iqaluit": "CA",
  "America/Atikokan": "CA",
  "America/Winnipeg": "CA",
  "America/Resolute": "CA",
  "America/Rankin_Inlet": "CA",
  "America/Regina": "CA",
  "America/Swift_Current": "CA",
  "America/Edmonton": "CA",
  "America/Cambridge_Bay": "CA",
  "America/Inuvik": "CA",
  "America/Vancouver": "CA",
  "America/Creston": "CA",
  "America/Dawson_Creek": "CA",
  "America/Fort_Nelson": "CA",
  "America/Whitehorse": "CA",
  "America/Dawson": "CA",
  "Indian/Cocos": "CC",
  "Africa/Kinshasa": "CD",
  "Africa/Lubumbashi": "CD",
  "Africa/Bangui": "CF",
  "Africa/Brazzaville": "CG",
  "Europe/Zurich": "CH",
  "Africa/Abidjan": "CI",
  "Pacific/Rarotonga": "CK",
  "America/Santiago": "CL",
  "America/Coyhaique": "CL",
  "America/Punta_Arenas": "CL",
  "Pacific/Easter": "CL",
  "Africa/Douala": "CM",
  "Asia/Shanghai": "CN",
  "Asia/Urumqi": "CN",
  "America/Bogota": "CO",
  "America/Costa_Rica": "CR",
  "America/Havana": "CU",
  "Atlantic/Cape_Verde": "CV",
  "America/Curacao": "CW",
  "Indian/Christmas": "CX",
  "Asia/Nicosia": "CY",
  "Asia/Famagusta": "CY",
  "Europe/Prague": "CZ",
  "Europe/Berlin": "DE",
  "Europe/Busingen": "DE",
  "Africa/Djibouti": "DJ",
  "Europe/Copenhagen": "DK",
  "America/Dominica": "DM",
  "America/Santo_Domingo": "DO",
  "Africa/Algiers": "DZ",
  "America/Guayaquil": "EC",
  "Pacific/Galapagos": "EC",
  "Europe/Tallinn": "EE",
  "Africa/Cairo": "EG",
  "Africa/El_Aaiun": "EH",
  "Africa/Asmara": "ER",
  "Europe/Madrid": "ES",
  "Africa/Ceuta": "ES",
  "Atlantic/Canary": "ES",
  "Africa/Addis_Ababa": "ET",
  "Europe/Helsinki": "FI",
  "Pacific/Fiji": "FJ",
  "Atlantic/Stanley": "FK",
  "Pacific/Chuuk": "FM",
  "Pacific/Pohnpei": "FM",
  "Pacific/Kosrae": "FM",
  "Atlantic/Faroe": "FO",
  "Europe/Paris": "FR",
  "Africa/Libreville": "GA",
  "Europe/London": "GB",
  "America/Grenada": "GD",
  "Asia/Tbilisi": "GE",
  "America/Cayenne": "GF",
  "Europe/Guernsey": "GG",
  "Africa/Accra": "GH",
  "Europe/Gibraltar": "GI",
  "America/Nuuk": "GL",
  "America/Danmarkshavn": "GL",
  "America/Scoresbysund": "GL",
  "America/Thule": "GL",
  "Africa/Banjul": "GM",
  "Africa/Conakry": "GN",
  "America/Guadeloupe": "GP",
  "Africa/Malabo": "GQ",
  "Europe/Athens": "GR",
  "Atlantic/South_Georgia": "GS",
  "America/Guatemala": "GT",
  "Pacific/Guam": "GU",
  "Africa/Bissau": "GW",
  "America/Guyana": "GY",
  "Asia/Hong_Kong": "HK",
  "America/Tegucigalpa": "HN",
  "Europe/Zagreb": "HR",
  "America/Port-au-Prince": "HT",
  "Europe/Budapest": "HU",
  "Asia/Jakarta": "ID",
  "Asia/Pontianak": "ID",
  "Asia/Makassar": "ID",
  "Asia/Jayapura": "ID",
  "Europe/Dublin": "IE",
  "Asia/Jerusalem": "IL",
  "Europe/Isle_of_Man": "IM",
  "Asia/Kolkata": "IN",
  "Indian/Chagos": "IO",
  "Asia/Baghdad": "IQ",
  "Asia/Tehran": "IR",
  "Atlantic/Reykjavik": "IS",
  "Europe/Rome": "IT",
  "Europe/Jersey": "JE",
  "America/Jamaica": "JM",
  "Asia/Amman": "JO",
  "Asia/Tokyo": "JP",
  "Africa/Nairobi": "KE",
  "Asia/Bishkek": "KG",
  "Asia/Phnom_Penh": "KH",
  "Pacific/Tarawa": "KI",
  "Pacific/Kanton": "KI",
  "Pacific/Kiritimati": "KI",
  "Indian/Comoro": "KM",
  "America/St_Kitts": "KN",
  "Asia/Pyongyang": "KP",
  "Asia/Seoul": "KR",
  "Asia/Kuwait": "KW",
  "America/Cayman": "KY",
  "Asia/Almaty": "KZ",
  "Asia/Qyzylorda": "KZ",
  "Asia/Qostanay": "KZ",
  "Asia/Aqtobe": "KZ",
  "Asia/Aqtau": "KZ",
  "Asia/Atyrau": "KZ",
  "Asia/Oral": "KZ",
  "Asia/Vientiane": "LA",
  "Asia/Beirut": "LB",
  "America/St_Lucia": "LC",
  "Europe/Vaduz": "LI",
  "Asia/Colombo": "LK",
  "Africa/Monrovia": "LR",
  "Africa/Maseru": "LS",
  "Europe/Vilnius": "LT",
  "Europe/Luxembourg": "LU",
  "Europe/Riga": "LV",
  "Africa/Tripoli": "LY",
  "Africa/Casablanca": "MA",
  "Europe/Monaco": "MC",
  "Europe/Chisinau": "MD",
  "Europe/Podgorica": "ME",
  "America/Marigot": "MF",
  "Indian/Antananarivo": "MG",
  "Pacific/Majuro": "MH",
  "Pacific/Kwajalein": "MH",
  "Europe/Skopje": "MK",
  "Africa/Bamako": "ML",
  "Asia/Yangon": "MM",
  "Asia/Ulaanbaatar": "MN",
  "Asia/Hovd": "MN",
  "Asia/Macau": "MO",
  "Pacific/Saipan": "MP",
  "America/Martinique": "MQ",
  "Africa/Nouakchott": "MR",
  "America/Montserrat": "MS",
  "Europe/Malta": "MT",
  "Indian/Mauritius": "MU",
  "Indian/Maldives": "MV",
  "Africa/Blantyre": "MW",
  "America/Mexico_City": "MX",
  "America/Cancun": "MX",
  "America/Merida": "MX",
  "America/Monterrey": "MX",
  "America/Matamoros": "MX",
  "America/Chihuahua": "MX",
  "America/Ciudad_Juarez": "MX",
  "America/Ojinaga": "MX",
  "America/Mazatlan": "MX",
  "America/Bahia_Banderas": "MX",
  "America/Hermosillo": "MX",
  "America/Tijuana": "MX",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Kuching": "MY",
  "Africa/Maputo": "MZ",
  "Africa/Windhoek": "NA",
  "Pacific/Noumea": "NC",
  "Africa/Niamey": "NE",
  "Pacific/Norfolk": "NF",
  "Africa/Lagos": "NG",
  "America/Managua": "NI",
  "Europe/Amsterdam": "NL",
  "Europe/Oslo": "NO",
  "Asia/Kathmandu": "NP",
  "Pacific/Nauru": "NR",
  "Pacific/Niue": "NU",
  "Pacific/Auckland": "NZ",
  "Pacific/Chatham": "NZ",
  "Asia/Muscat": "OM",
  "America/Panama": "PA",
  "America/Lima": "PE",
  "Pacific/Tahiti": "PF",
  "Pacific/Marquesas": "PF",
  "Pacific/Gambier": "PF",
  "Pacific/Port_Moresby": "PG",
  "Pacific/Bougainville": "PG",
  "Asia/Manila": "PH",
  "Asia/Karachi": "PK",
  "Europe/Warsaw": "PL",
  "America/Miquelon": "PM",
  "Pacific/Pitcairn": "PN",
  "America/Puerto_Rico": "PR",
  "Asia/Gaza": "PS",
  "Asia/Hebron": "PS",
  "Europe/Lisbon": "PT",
  "Atlantic/Madeira": "PT",
  "Atlantic/Azores": "PT",
  "Pacific/Palau": "PW",
  "America/Asuncion": "PY",
  "Asia/Qatar": "QA",
  "Indian/Reunion": "RE",
  "Europe/Bucharest": "RO",
  "Europe/Belgrade": "RS",
  "Europe/Kaliningrad": "RU",
  "Europe/Moscow": "RU",
  "Europe/Simferopol": "UA",
  "Europe/Kirov": "RU",
  "Europe/Volgograd": "RU",
  "Europe/Astrakhan": "RU",
  "Europe/Saratov": "RU",
  "Europe/Ulyanovsk": "RU",
  "Europe/Samara": "RU",
  "Asia/Yekaterinburg": "RU",
  "Asia/Omsk": "RU",
  "Asia/Novosibirsk": "RU",
  "Asia/Barnaul": "RU",
  "Asia/Tomsk": "RU",
  "Asia/Novokuznetsk": "RU",
  "Asia/Krasnoyarsk": "RU",
  "Asia/Irkutsk": "RU",
  "Asia/Chita": "RU",
  "Asia/Yakutsk": "RU",
  "Asia/Khandyga": "RU",
  "Asia/Vladivostok": "RU",
  "Asia/Ust-Nera": "RU",
  "Asia/Magadan": "RU",
  "Asia/Sakhalin": "RU",
  "Asia/Srednekolymsk": "RU",
  "Asia/Kamchatka": "RU",
  "Asia/Anadyr": "RU",
  "Africa/Kigali": "RW",
  "Asia/Riyadh": "SA",
  "Pacific/Guadalcanal": "SB",
  "Indian/Mahe": "SC",
  "Africa/Khartoum": "SD",
  "Europe/Stockholm": "SE",
  "Asia/Singapore": "SG",
  "Atlantic/St_Helena": "SH",
  "Europe/Ljubljana": "SI",
  "Arctic/Longyearbyen": "SJ",
  "Europe/Bratislava": "SK",
  "Africa/Freetown": "SL",
  "Europe/San_Marino": "SM",
  "Africa/Dakar": "SN",
  "Africa/Mogadishu": "SO",
  "America/Paramaribo": "SR",
  "Africa/Juba": "SS",
  "Africa/Sao_Tome": "ST",
  "America/El_Salvador": "SV",
  "America/Lower_Princes": "SX",
  "Asia/Damascus": "SY",
  "Africa/Mbabane": "SZ",
  "America/Grand_Turk": "TC",
  "Africa/Ndjamena": "TD",
  "Indian/Kerguelen": "TF",
  "Africa/Lome": "TG",
  "Asia/Bangkok": "TH",
  "Asia/Dushanbe": "TJ",
  "Pacific/Fakaofo": "TK",
  "Asia/Dili": "TL",
  "Asia/Ashgabat": "TM",
  "Africa/Tunis": "TN",
  "Pacific/Tongatapu": "TO",
  "Europe/Istanbul": "TR",
  "America/Port_of_Spain": "TT",
  "Pacific/Funafuti": "TV",
  "Asia/Taipei": "TW",
  "Africa/Dar_es_Salaam": "TZ",
  "Europe/Kyiv": "UA",
  "Africa/Kampala": "UG",
  "Pacific/Midway": "UM",
  "Pacific/Wake": "UM",
  "America/New_York": "US",
  "America/Detroit": "US",
  "America/Kentucky/Louisville": "US",
  "America/Kentucky/Monticello": "US",
  "America/Indiana/Indianapolis": "US",
  "America/Indiana/Vincennes": "US",
  "America/Indiana/Winamac": "US",
  "America/Indiana/Marengo": "US",
  "America/Indiana/Petersburg": "US",
  "America/Indiana/Vevay": "US",
  "America/Chicago": "US",
  "America/Indiana/Tell_City": "US",
  "America/Indiana/Knox": "US",
  "America/Menominee": "US",
  "America/North_Dakota/Center": "US",
  "America/North_Dakota/New_Salem": "US",
  "America/North_Dakota/Beulah": "US",
  "America/Denver": "US",
  "America/Boise": "US",
  "America/Phoenix": "US",
  "America/Los_Angeles": "US",
  "America/Anchorage": "US",
  "America/Juneau": "US",
  "America/Sitka": "US",
  "America/Metlakatla": "US",
  "America/Yakutat": "US",
  "America/Nome": "US",
  "America/Adak": "US",
  "Pacific/Honolulu": "US",
  "America/Montevideo": "UY",
  "Asia/Samarkand": "UZ",
  "Asia/Tashkent": "UZ",
  "Europe/Vatican": "VA",
  "America/St_Vincent": "VC",
  "America/Caracas": "VE",
  "America/Tortola": "VG",
  "America/St_Thomas": "VI",
  "Asia/Ho_Chi_Minh": "VN",
  "Pacific/Efate": "VU",
  "Pacific/Wallis": "WF",
  "Pacific/Apia": "WS",
  "Asia/Aden": "YE",
  "Indian/Mayotte": "YT",
  "Africa/Johannesburg": "ZA",
  "Africa/Lusaka": "ZM",
  "Africa/Harare": "ZW",
  "America/Montreal": "CA",
  "America/Buenos_Aires": "AR",
  "UTC": "UTC",
  "GMT": "GMT"
};

  function getLocalTzLocation() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (!tz) return 'LOCAL';
      const parts = tz.split('/');
      let city = (parts[parts.length - 1] || 'LOCAL').replace(/_/g, ' ').toUpperCase();
      const cc = TZ_TO_COUNTRY[tz] || (parts[0] === 'Europe' ? 'EU' : parts[0] === 'America' ? 'US' : '');
      return cc ? `${city} ${cc}` : city;
    } catch {
      return 'LOCAL';
    }
  }

  let visitorLocation = getLocalTzLocation();

  // Non-blocking background IP refinement (refines city and country code if reachable)
  try {
    fetch('https://ipapi.co/json/', { mode: 'cors' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.city && data.country_code) {
          visitorLocation = `${data.city.toUpperCase()} ${data.country_code.toUpperCase()}`;
          updateStudioClock();
        }
      })
      .catch(() => {});
  } catch (e) {}

  function updateStudioClock() {
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const displayStr = `${visitorLocation} • ${timeStr}`;

      if (clockEl) {
        clockEl.textContent = displayStr;
      }
      if (frameClockEl) {
        frameClockEl.textContent = displayStr;
      }
    } catch {
      // Native fallback
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const displayStr = `${visitorLocation || 'LOCAL'} • ${h}:${m}:${s}`;
      if (clockEl) clockEl.textContent = displayStr;
      if (frameClockEl) frameClockEl.textContent = displayStr;
    }
  }

  updateStudioClock();
  setInterval(updateStudioClock, 1000);

  // ========================================================================
  // 2. Smart Sticky Header (Hide on scroll down, reveal on scroll up)
  // ========================================================================
  const header = document.getElementById('site-header');
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const isSubpage = document.body.classList.contains('is-subpage');

    const updateHeaderOnScroll = () => {
      const currentScrollY = window.scrollY;

      if (isSubpage) {
        // Subpage: Always visible at top; smart hide/reveal on scroll down/up
        if (currentScrollY > 120) {
          if (currentScrollY > lastScrollY + 6) {
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
            header.setAttribute('aria-hidden', 'true');
          } else if (currentScrollY < lastScrollY - 6) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            header.setAttribute('aria-hidden', 'false');
          }
        } else {
          header.classList.remove('header-hidden');
          header.classList.add('header-visible');
          header.setAttribute('aria-hidden', 'false');
        }
      } else {
        // Landing page: frame-top-bar handles the hero view.
        // Reveal sticky site-header only once scrolled past hero frame to eliminate competing duplicate headers.
        const heroThreshold = Math.max(window.innerHeight * 0.7, 480);
        if (currentScrollY > heroThreshold) {
          if (currentScrollY > lastScrollY + 8) {
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
            header.setAttribute('aria-hidden', 'true');
          } else if (currentScrollY < lastScrollY - 8) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            header.setAttribute('aria-hidden', 'false');
          }
        } else {
          header.classList.remove('header-visible');
          header.classList.add('header-hidden');
          header.setAttribute('aria-hidden', 'true');
        }
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

    // Initial check on page load
    updateHeaderOnScroll();
  }

  // ========================================================================
  // 3. Hero Parallax & Ambient Light (IntersectionObserver Optimized)
  // ========================================================================
  const heroSection = document.getElementById('hero');
  const ambientLight = document.getElementById('hero-cursor-ambient');
  const blockTop = document.querySelector('.block-top');
  const blockMid = document.querySelector('.block-mid');
  const blockBot = document.querySelector('.block-bot');

  if (heroSection && ambientLight && isFinePointer && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isHoveringHero = false;
    let isHeroInView = true;
    let ambientRafId = null;

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroInView = entry.isIntersecting;
        if (!isHeroInView && ambientRafId) {
          cancelAnimationFrame(ambientRafId);
          ambientRafId = null;
        }
      });
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);

    const stepAmbient = () => {
      if (!isHeroInView) {
        ambientRafId = null;
        return;
      }

      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      currentX += dx * 0.08;
      currentY += dy * 0.08;

      ambientLight.style.left = `${currentX.toFixed(1)}px`;
      ambientLight.style.top = `${currentY.toFixed(1)}px`;

      // Settle loop when idle
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || isHoveringHero) {
        ambientRafId = requestAnimationFrame(stepAmbient);
      } else {
        ambientRafId = null;
      }
    };

    const wakeAmbient = () => {
      if (!ambientRafId && isHeroInView) {
        ambientRafId = requestAnimationFrame(stepAmbient);
      }
    };

    heroSection.addEventListener('mouseenter', () => {
      isHoveringHero = true;
      ambientLight.style.opacity = '1';
      wakeAmbient();
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

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normX = (mouseX - centerX) / centerX;
      const normY = (mouseY - centerY) / centerY;

      if (blockTop) blockTop.style.transform = `translate3d(${(normX * -8).toFixed(1)}px, ${(normY * -5).toFixed(1)}px, 0)`;
      if (blockMid) blockMid.style.transform = `translate3d(${(normX * 12).toFixed(1)}px, ${(normY * 7).toFixed(1)}px, 0)`;
      if (blockBot) blockBot.style.transform = `translate3d(${(normX * -6).toFixed(1)}px, ${(normY * 4).toFixed(1)}px, 0)`;

      wakeAmbient();
    }, { passive: true });
  }

  // Signature GROWTH Word Image Reveal (Desktop Pointer Tracking)
  const growthWord = document.getElementById('hero-growth-word');
  if (growthWord && isFinePointer && !prefersReducedMotion) {
    growthWord.addEventListener('mousemove', (e) => {
      const rect = growthWord.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pctX = Math.max(0, Math.min(100, ((x / rect.width) * 100))).toFixed(1);
      const pctY = Math.max(0, Math.min(100, ((y / rect.height) * 100))).toFixed(1);
      growthWord.style.setProperty('--growth-reveal-x', `${pctX}%`);
      growthWord.style.setProperty('--growth-reveal-y', `${pctY}%`);
      growthWord.style.setProperty('--growth-reveal-pos', `${pctX}% ${pctY}%`);
    }, { passive: true });
  }

  // ========================================================================
  // 4. Interactive 3D Card Tilt & Specular Glare (Audiences Section)
  // ========================================================================
  const audienceCards = document.querySelectorAll('.comma-card');

  if (isFinePointer && !prefersReducedMotion) {
    audienceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(1)}%`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ========================================================================
  // 4B. Diffused Champagne-Gold Atmospheric Glow (Philosophy Section)
  // ========================================================================
  const constellation = document.getElementById('outcomes-constellation');
  const champagneGlow = document.getElementById('outcomes-glow');

  if (constellation && champagneGlow && isFinePointer && !prefersReducedMotion) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let glowRafId = null;
    let isPhilosophyInView = true;

    const philObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isPhilosophyInView = entry.isIntersecting;
        if (!isPhilosophyInView && glowRafId) {
          cancelAnimationFrame(glowRafId);
          glowRafId = null;
        }
      });
    }, { threshold: 0.1 });

    philObserver.observe(constellation);

    const stepGlow = () => {
      if (!isPhilosophyInView) {
        glowRafId = null;
        return;
      }

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.06;
      currentY += dy * 0.06;

      champagneGlow.style.transform = `translate(calc(-50% + ${currentX.toFixed(1)}px), calc(-50% + ${currentY.toFixed(1)}px))`;

      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        glowRafId = requestAnimationFrame(stepGlow);
      } else {
        glowRafId = null;
      }
    };

    const wakeGlow = () => {
      if (!glowRafId && isPhilosophyInView) {
        glowRafId = requestAnimationFrame(stepGlow);
      }
    };

    constellation.addEventListener('mousemove', (e) => {
      const rect = constellation.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      targetX = normX * 36;
      targetY = normY * 26;
      wakeGlow();
    }, { passive: true });

    constellation.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      wakeGlow();
    });
  }

  // ========================================================================
  // 5. Universal Studio Precision Cursor (Every Device, OS & Platform)
  // ========================================================================
  (function initUniversalCursor() {
    let cursorDot = document.getElementById('cursor-dot');
    let cursorRing = document.getElementById('cursor-ring');

    if (!cursorDot) {
      cursorDot = document.createElement('div');
      cursorDot.className = 'studio-cursor-dot cursor-dot';
      cursorDot.id = 'cursor-dot';
      cursorDot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursorDot);
    } else {
      cursorDot.classList.add('studio-cursor-dot');
    }

    if (!cursorRing) {
      cursorRing = document.createElement('div');
      cursorRing.className = 'studio-cursor-ring cursor-ring';
      cursorRing.id = 'cursor-ring';
      cursorRing.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursorRing);
    } else {
      cursorRing.classList.add('studio-cursor-ring');
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hasMoved = false;
    let ringRafId = null;

    const stepRing = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.22;
      ringY += dy * 0.22;

      cursorRing.style.left = `${ringX.toFixed(1)}px`;
      cursorRing.style.top = `${ringY.toFixed(1)}px`;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        ringRafId = requestAnimationFrame(stepRing);
      } else {
        ringRafId = null;
      }
    };

    const wakeRing = () => {
      if (!ringRafId) {
        ringRafId = requestAnimationFrame(stepRing);
      }
    };

    const updatePosition = (x, y) => {
      mouseX = x;
      mouseY = y;

      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
      }

      if (!document.documentElement.classList.contains('has-custom-cursor')) {
        document.documentElement.classList.add('has-custom-cursor');
      }
      if (!document.body.classList.contains('cursor-active')) {
        document.body.classList.add('cursor-active');
      }

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      wakeRing();
    };

    // Desktop mice, trackpads & styluses across Mac, Windows, Linux, Chromebook
    window.addEventListener('pointermove', (e) => {
      updatePosition(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      updatePosition(e.clientX, e.clientY);
    }, { passive: true });

    // Touch & tablet devices (iPad, Surface, Android tablet, mobile)
    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
      document.body.classList.add('cursor-clicking');
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      document.body.classList.remove('cursor-clicking');
      setTimeout(() => {
        document.body.classList.remove('cursor-active');
      }, 700);
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

    // Intelligent Event Delegation for Hover States Everywhere (including questionnaire, options & modals)
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target) return;

      const textInput = target.closest('input[type="text"], input[type="password"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], input[type="search"], textarea, [contenteditable="true"]');
      const interactive = target.closest('a, button, [role="button"], [role="radio"], [role="checkbox"], input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"], select, label, summary, [data-case-inspect], .case-screen-card, .btn-ref, .btn-inspect-pill, .browser-inspect-action, .orsap-tab-btn, .orsap-tab-item, .orsap-tab-arrow, .orsap-laptop-viewport, .orsap-mockup-frame, .orsap-mockup-img, .orsap-title-link, .orsap-eyebrow-link, .orsap-cta-primary, .orsap-cta-secondary, .lightbox-nav-btn, .lightbox-size-btn, .lightbox-close-btn, .comma-card, .frame-brand, .frame-menu-dots, .lang-btn, .case-flow-card, .cases-nav-btn, .cases-dot, .portal-nav-btn, .tab-btn, .portal-btn, .action-btn, .document-card, .deliverable-card, .q-service-box, .q-option-row, .q-service-card, .btn-wizard-nav, .wizard-exit-btn, .q-agree-row');

      if (textInput) {
        document.body.classList.remove('cursor-hover');
        document.body.classList.add('cursor-text');
      } else if (interactive) {
        document.body.classList.remove('cursor-text');
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
        document.body.classList.remove('cursor-text');
      }
    });
  })();

  // ========================================================================
  // 5B. ORSAP Interactive Showcase Tabs & High-Fidelity Lightbox Viewer
  // ========================================================================
  const orsapCatalog = [
    {
      src: 'assets/orsap/orsap_01_home.svg',
      title: 'Storefront Architecture & Value Proposition',
      desc: 'Brand hero, video presentation, 4 key commercial stats & BUTEC corporate proof',
      url: 'https://orsap.ma'
    },
    {
      src: 'assets/orsap/orsap_02_about.svg',
      title: 'Strategic Story & Market Differentiation',
      desc: 'Company heritage, 5 core operational values & 4 pillar differentiators for Moroccan industry',
      url: 'https://orsap.ma/a-propos'
    },
    {
      src: 'assets/orsap/orsap_03_services.svg',
      title: '7 Technical Industrial Services Engine',
      desc: 'End-to-end solutions: importation, industrial flooring, fluids, air handling & site fitting',
      url: 'https://orsap.ma/services'
    },
    {
      src: 'assets/orsap/orsap_04_services_detail.svg',
      title: '5-Step Engineering & Delivery Process',
      desc: 'Rigorous execution method: Audit, Étude, Validation, Réalisation & Suivi SAV with SLA',
      url: 'https://orsap.ma/methode'
    },
    {
      src: 'assets/orsap/orsap_05_catalog.svg',
      title: '15-Sector Industrial Catalog Taxonomy',
      desc: 'Structured browsing for 15,000+ references: EPI, work at heights, heavy handling & tooling',
      url: 'https://orsap.ma/catalogue'
    },
    {
      src: 'assets/orsap/orsap_06_temoignages.svg',
      title: 'Enterprise Proof & Client Dossiers',
      desc: 'Validated testimonials from BUTEC (1,200 employees), Dislog Group, SNEP, and Ventec',
      url: 'https://orsap.ma/temoignages'
    },
    {
      src: 'assets/orsap/orsap_07_marques.svg',
      title: '300+ Global Brand Directory',
      desc: 'International distributor partnerships with 3M, Makita, Bosch, DeWalt, ABB, Honeywell, Sika',
      url: 'https://orsap.ma/marques'
    },
    {
      src: 'assets/orsap/orsap_08_recrutement.svg',
      title: 'Corporate Careers & Talent Acquisition',
      desc: 'Inbound recruitment pipeline, employer value proposition & structured CV intake portal',
      url: 'https://orsap.ma/recrutement'
    },
    {
      src: 'assets/orsap/orsap_09_contact_rfq.svg',
      title: 'Casablanca RFQ Hub & Inbound Engine',
      desc: 'Multi-channel procurement engine: direct WhatsApp, phone desk & Casablanca depot coordinates',
      url: 'https://orsap.ma/contact-devis'
    },
    {
      src: 'assets/orsap/orsap_10_blog_technique.svg',
      title: 'HSE Technical Knowledge Base & SEO Hub',
      desc: 'Educational guides on Moroccan workplace safety standards (Loi 65-99) & high-intent B2B SEO',
      url: 'https://orsap.ma/blog-technique'
    },
    {
      src: 'assets/orsap/orsap_11_navigation_menu.svg',
      title: 'Slide-Out Architecture & Navigation Drawer',
      desc: 'Frictionless information architecture designed for high-conversion B2B buyer journeys',
      url: 'https://orsap.ma/#menu'
    },
    {
      src: 'assets/orsap/orsap_12_ecommerce_store.svg',
      title: 'B2B E-Commerce & Express Outillage Store',
      desc: 'Real-time pricing in MAD, stock availability, digital cart and corporate account portal',
      url: 'https://orsap.ma/boutique-express'
    }
  ];

  let currentOrsapIndex = 0;
  const orsapLightboxModal = document.getElementById('orsapLightboxModal');
  const lightboxFullImg = document.getElementById('lightboxFullImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSubtitle = document.getElementById('lightboxSubtitle');
  const lightboxDeviceUrl = document.getElementById('lightboxDeviceUrl');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxSizeBtn = document.getElementById('lightboxSizeBtn');
  const lightboxDeviceWindow = document.getElementById('lightboxDeviceWindow');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  function renderLightboxScreen(index) {
    if (!orsapCatalog[index]) return;
    currentOrsapIndex = index;
    const item = orsapCatalog[index];

    if (lightboxFullImg) {
      lightboxFullImg.src = item.src;
      lightboxFullImg.alt = item.title;
    }
    if (lightboxTitle) {
      lightboxTitle.textContent = `ORSAP.MA — ${item.title}`;
    }
    if (lightboxSubtitle) {
      lightboxSubtitle.textContent = item.desc;
    }
    if (lightboxDeviceUrl) {
      lightboxDeviceUrl.textContent = item.url;
    }
    if (lightboxCounter) {
      const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
      lightboxCounter.textContent = `${pad(index + 1)} / ${pad(orsapCatalog.length)}`;
    }

    // Scroll stage back to top
    const stage = document.getElementById('lightboxScrollStage');
    if (stage) stage.scrollTop = 0;
  }

  function openOrsapLightbox(index = 0) {
    if (!orsapLightboxModal) return;
    renderLightboxScreen(index);
    orsapLightboxModal.classList.add('active');
    orsapLightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  window.openOrsapLightbox = openOrsapLightbox;

  function closeOrsapLightbox() {
    if (!orsapLightboxModal) return;
    orsapLightboxModal.classList.remove('active');
    orsapLightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  window.closeOrsapLightbox = closeOrsapLightbox;

  // Global Tab Switcher Function (Works from HTML onclick and event listeners)
  function switchOrsapTab(tab) {
    if (!tab) return;
    const tabs = document.querySelectorAll('.orsap-tab-item, .orsap-tab-btn');
    const mockupImg = document.getElementById('orsapMockupImg') || document.getElementById('orsapActiveImg');
    const wasActive = tab.classList.contains('active');

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const svgSrc = tab.getAttribute('data-svg') || tab.getAttribute('data-img');
    const mockupSrc = tab.getAttribute('data-mockup') || tab.getAttribute('data-img');

    if (svgSrc) {
      const foundIdx = orsapCatalog.findIndex(item => item.src === svgSrc);
      if (foundIdx !== -1) {
        currentOrsapIndex = foundIdx;
        window.currentOrsapIndex = foundIdx;
      }
    }

    if (mockupImg && mockupSrc) {
      mockupImg.style.opacity = '0.35';
      setTimeout(() => {
        mockupImg.src = mockupSrc;
        mockupImg.style.opacity = '1';
      }, 90);
    }

    // Scroll active tab smoothly into view if near edges
    if (typeof tab.scrollIntoView === 'function') {
      try {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } catch (err) {}
    }

    // If clicking an already active tab, open the full-screen 2358px SVG lightbox modal
    if (wasActive) {
      openOrsapLightbox(currentOrsapIndex);
    }
  }
  window.switchOrsapTab = switchOrsapTab;
  window.currentOrsapIndex = 0;

  // Global Tab Strip Scroller
  function scrollOrsapTabs(offset) {
    const tabsStrip = document.getElementById('orsapTabsStrip');
    if (tabsStrip) {
      tabsStrip.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }
  window.scrollOrsapTabs = scrollOrsapTabs;

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      const nextIdx = (currentOrsapIndex - 1 + orsapCatalog.length) % orsapCatalog.length;
      renderLightboxScreen(nextIdx);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      const nextIdx = (currentOrsapIndex + 1) % orsapCatalog.length;
      renderLightboxScreen(nextIdx);
    });
  }

  if (lightboxSizeBtn && lightboxDeviceWindow) {
    lightboxSizeBtn.addEventListener('click', () => {
      const isWide = lightboxDeviceWindow.classList.toggle('is-wide');
      lightboxSizeBtn.textContent = isWide ? 'Standard (620px)' : 'Toggle Wide (820px)';
    });
  }

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeOrsapLightbox);
  }

  if (orsapLightboxModal) {
    orsapLightboxModal.addEventListener('click', (e) => {
      if (e.target === orsapLightboxModal || e.target.id === 'lightboxScrollStage') {
        closeOrsapLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!orsapLightboxModal || !orsapLightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeOrsapLightbox();
    } else if (e.key === 'ArrowRight') {
      const nextIdx = (currentOrsapIndex + 1) % orsapCatalog.length;
      renderLightboxScreen(nextIdx);
    } else if (e.key === 'ArrowLeft') {
      const nextIdx = (currentOrsapIndex - 1 + orsapCatalog.length) % orsapCatalog.length;
      renderLightboxScreen(nextIdx);
    }
  });

  // Homepage flagship tabs & 3D laptop mockup interactions
  const orsapTabs = document.querySelectorAll('.orsap-tab-item, .orsap-tab-btn');
  const orsapLaptopViewport = document.getElementById('orsapLaptopViewport');
  const orsapTabsStrip = document.getElementById('orsapTabsStrip');
  const inspectBtns = [document.getElementById('orsapInspectBtn'), document.getElementById('orsapInspectPill')];

  // Mouse wheel horizontal scrolling over the tabs strip
  if (orsapTabsStrip) {
    orsapTabsStrip.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        orsapTabsStrip.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  if (orsapTabs.length > 0) {
    orsapTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        switchOrsapTab(tab);
      });
    });

    if (orsapLaptopViewport) {
      orsapLaptopViewport.addEventListener('click', () => {
        openOrsapLightbox(window.currentOrsapIndex || 0);
      });
      orsapLaptopViewport.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openOrsapLightbox(window.currentOrsapIndex || 0);
        }
      });
    }

    inspectBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => openOrsapLightbox(currentOrsapIndex));
    });
  }

  // Cards on cases.html
  document.querySelectorAll('[data-case-inspect]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const rawIdx = btn.getAttribute('data-case-index');
      let targetIdx = rawIdx !== null ? parseInt(rawIdx, 10) : -1;
      if (isNaN(targetIdx) || targetIdx < 0) {
        const imgSrc = btn.getAttribute('data-case-inspect');
        targetIdx = orsapCatalog.findIndex(item => item.src === imgSrc);
      }
      openOrsapLightbox(targetIdx >= 0 ? targetIdx : 0);
    });
  });

  // Fade viewport hint on scroll inside homepage browser viewport
  const orsapScreenViewport = document.getElementById('orsapScreenViewport');
  const orsapViewportHint = document.getElementById('orsapViewportHint');
  if (orsapScreenViewport && orsapViewportHint) {
    orsapScreenViewport.addEventListener('scroll', () => {
      if (orsapScreenViewport.scrollTop > 40) {
        orsapViewportHint.style.opacity = '0';
        orsapViewportHint.style.pointerEvents = 'none';
      } else {
        orsapViewportHint.style.opacity = '1';
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
      'nav.about': 'About',
      'btn.proposal': 'Request Proposal',
      'btn.cases': 'OUR CASES ↗',
      'hero.eyebrow': 'INDEPENDENT DIGITAL GROWTH STUDIO',
      'hero.eyebrowLoc': 'BARCELONA & CASABLANCA · INTERNATIONAL PRACTICE',
      'hero.line1': 'WE TURN',
      'hero.line2': 'ATTENTION',
      'hero.line3prefix': 'INTO ',
      'hero.line3accent': 'GROWTH',
      'hero.m1': 'WE',
      'hero.m2': 'TURN',
      'hero.m3': 'ATTENTION',
      'hero.m4': 'INTO',
      'hero.m5': 'GROWTH',
      'hero.supportingCopy': 'We build websites, brands, and paid campaigns that help ambitious businesses attract customers and turn attention into enquiries, bookings, and sales.',
      'hero.serviceLine': 'WEB DESIGN & DEVELOPMENT • PAID MEDIA • BRAND IDENTITY',
      'hero.subLeft': 'We build <span class="highlight-gold">full-service</span> growth engines —<br>for founders, ambitious brands, and hospitality.',
      'hero.subRight': 'and turn attention<br>into scalable revenue.',
      'audiences.title': 'BUILT FOR<br>AMBITIOUS BUSINESSES.',
      'card1.title': 'FOUNDERS & GROWING BUSINESSES',
      'card1.desc': 'Launch with a clear identity, a professional website, and a focused plan for attracting customers.',
      'card2.title': 'HOSPITALITY & EXPERIENCES',
      'card2.desc': 'Bring your venue to life online and make it easier for people to discover, enquire, and book.',
      'card3.title': 'E-COMMERCE BRANDS',
      'card3.desc': 'Connect your storefront, advertising, and creative around a better path from discovery to purchase.',
      'btn.examples': 'EXPLORE SELECTED CASES ↗',
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
      'outcomes.cta': 'EXPLORE OUR WORK ↗',
      'outcomes.stmtLeft': 'FROM FIRST IMPRESSION',
      'outcomes.capLeft': 'MAKE YOUR BRAND MATTER.',
      'outcomes.stmtRight': 'TO LASTING GROWTH.',
      'outcomes.capRight': 'TURN ATTENTION INTO ACTION.',
      'cases.tag': '04 / SELECTED WORK',
      'cases.title': 'PROJECTS THAT DEFINE THE STANDARD',
      'cases.subtitle': 'CLEAR STRATEGY. DISTINCTIVE DESIGN. PURPOSEFUL EXECUTION.',
      'cases.cta': 'REQUEST A PROPOSAL ↗',
      'about.tag': '05 / LEADERSHIP & FOUNDER',
      'about.title': 'BUILT IN BARCELONA.<br><span class="gold-gradient-text">DIRECTED BY MOHAMED TAZI.</span>',
      'about.badgeRole': 'Founder & Growth Strategist',
      'about.badgeLocation': 'Barcelona, Spain',
      'about.desc1': 'MotaGrowth is an independent growth studio founded by Mohamed Tazi in Barcelona. We partner with ambitious founders, luxury hospitality venues, and modern digital brands who refuse to look or perform like generic templates.',
      'about.desc2': 'Every strategic roadmap, conversion architecture, and high-stakes performance campaign is directly overseen by the founder. No junior account handoffs, no vanity impressions, and zero wasted ad spend.'
    },
    fr: {
      'nav.home': 'Accueil',
      'nav.audiences': 'Secteurs',
      'nav.cases': 'Projets',
      'nav.about': 'À Propos',
      'btn.proposal': 'Demander un devis',
      'btn.cases': 'NOS PROJETS ↗',
      'hero.eyebrow': 'STUDIO INDÉPENDANT DE CROISSANCE DIGITALE',
      'hero.eyebrowLoc': 'BARCELONE & CASABLANCA · PRATIQUE INTERNATIONALE',
      'hero.line1': 'NOUS TRANSFORMONS',
      'hero.line2': "L'ATTENTION",
      'hero.line3prefix': 'EN ',
      'hero.line3accent': 'CROISSANCE',
      'hero.m1': 'NOUS',
      'hero.m2': 'TRANSFORMANS',
      'hero.m3': "L'ATTENTION",
      'hero.m4': 'EN',
      'hero.m5': 'CROISSANCE',
      'hero.supportingCopy': 'Nous concevons des plateformes web, identités de marque et campagnes d’acquisition pour aider les entreprises ambitieuses à transformer l’attention en réservations et revenus.',
      'hero.serviceLine': 'CONCEPTION WEB & DÉVELOPPEMENT • MÉDIAS PAYANTS • IDENTITÉ DE MARQUE',
      'hero.m4': 'EN',
      'hero.m5': 'CROISSANCE',
      'hero.subLeft': 'Nous bâtissons des moteurs de croissance <span class="highlight-gold">sur-mesure</span> —<br>pour fondateurs, marques et hospitalité.',
      'hero.subRight': "et convertissons l'attention<br>en revenus scalables.",
      'audiences.title': 'CONÇU POUR LES<br>ENTREPRISES AMBITIEUSES.',
      'card1.title': 'FONDATEURS & CROISSANCE',
      'card1.desc': "Démarrez avec une identité claire, un site professionnel et un plan précis d'acquisition.",
      'card2.title': 'HOSPITALITÉ & EXPÉRIENCES',
      'card2.desc': 'Donnez vie à votre lieu en ligne et simplifiez la découverte, la prise de contact et les réservations.',
      'card3.title': 'MARQUES E-COMMERCE',
      'card3.desc': "Harmonisez boutique, acquisition payante et créatifs pour fluidifier le passage à l'achat.",
      'btn.examples': 'DÉCOUVRIR NOS CAS ↗',
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
      'outcomes.cta': 'DÉCOUVRIR NOTRE TRAVAIL ↗',
      'outcomes.stmtLeft': 'DE LA PREMIÈRE IMPRESSION',
      'outcomes.capLeft': 'DONNEZ DU SENS À VOTRE MARQUE.',
      'outcomes.stmtRight': 'À UNE CROISSANCE DURABLE.',
      'outcomes.capRight': "TRANSFORMEZ L'ATTENTION EN ACTION.",
      'cases.title': "DES CAS QUI RACONTENT L'HISTOIRE",
      'cases.subtitle': 'STRATÉGIE CLAIRE. DESIGN DISTINCTIF. EXÉCUTION MAÎTRISÉE.',
      'cases.cta': 'DEMANDER UNE PROPOSITION ↗',
      'about.tag': '05 / LEADERSHIP & FONDATEUR',
      'about.title': 'NÉ À BARCELONE.<br><span class="gold-gradient-text">DIRIGÉ PAR MOHAMED TAZI.</span>',
      'about.badgeRole': 'Fondateur & Stratège Digital',
      'about.badgeLocation': 'Barcelone, Espagne',
      'about.desc1': 'MotaGrowth est un studio indépendant de croissance digitale fondé par Mohamed Tazi à Barcelone. Nous accompagnons les fondateurs ambitieux, les acteurs de l’hôtellerie de luxe et les marques digitales résolues à dépasser les templates génériques.',
      'about.desc2': 'Chaque feuille de route stratégique, architecture de conversion et campagne à haute rentabilité est directement pilotée par le fondateur. Aucun intermédiaire junior, aucune métrique d’illusion.'
    }
  };

  let currentLang = localStorage.getItem('motagrowth_lang') || 'en';

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('motagrowth_lang', lang);

    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

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

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        document.body.classList.add('lang-transition');
        applyLanguage(targetLang);
        setTimeout(() => {
          document.body.classList.remove('lang-transition');
        }, 180);
      }
    });
  });

  applyLanguage(currentLang);

  // ========================================================================
  // 7. Verified Client Engagements & 3D Cover Flow Carousel
  // ========================================================================
  // Real client engagements: Orsap.ma, TG2D, La Centrale Crèche
  const defaultCases = [
    {
      id: 1,
      title: 'ORSAP.MA',
      subtitle: 'Digital Commerce Platform • Scale & Architecture',
      category: 'E-Commerce & Scale',
      badge: 'STUDIO CASE DOSSIER',
      image: 'assets/card1_clean_hd.jpg',
      link: 'https://wa.me/34675194956?text=Hello%20MotaGrowth%20Studio%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20Orsap.ma%20case'
    },
    {
      id: 2,
      title: 'TG2D',
      subtitle: 'Corporate Brand Experience • Enterprise & Strategy',
      category: 'Enterprise Strategy',
      badge: 'STUDIO CASE DOSSIER',
      image: 'assets/card2_clean_hd.jpg',
      link: 'https://wa.me/34675194956?text=Hello%20MotaGrowth%20Studio%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20TG2D%20case'
    },
    {
      id: 3,
      title: 'LA CENTRALE CRÈCHE',
      subtitle: 'Early Education Acquisition • Service & Authority',
      category: 'Authority & Acquisition',
      badge: 'STUDIO CASE DOSSIER',
      image: 'assets/card3_clean_hd.jpg',
      link: 'https://wa.me/34675194956?text=Hello%20MotaGrowth%20Studio%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20La%20Centrale%20Cr%C3%A8che%20case'
    }
  ];

  // Global Admin Access Layer (Extensible via upcoming admin dashboard)
  window.MotaCases = {
    getAll: function() {
      try {
        const stored = localStorage.getItem('motagrowth_cases');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse stored cases', e);
      }
      return defaultCases;
    },
    save: function(casesArray) {
      if (!Array.isArray(casesArray)) return;
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

  const casesSection = document.getElementById('cases');
  const track = document.getElementById('cases-track');
  const prevBtn = document.getElementById('cases-prev');
  const nextBtn = document.getElementById('cases-next');
  const dotsContainer = document.getElementById('cases-dots');
  const stage = document.getElementById('cases-stage');

  if (track && casesSection) {
    let cases = window.MotaCases.getAll();
    let currentFloatIndex = 0;
    let targetFloatIndex = 0;
    let carouselRafId = null;
    let isCasesInView = true;

    const casesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCasesInView = entry.isIntersecting;
      });
    }, { threshold: 0.1 });

    casesObserver.observe(casesSection);

    // DOM-safe card renderer
    function renderCasesCarousel() {
      cases = window.MotaCases.getAll();
      track.textContent = '';
      if (dotsContainer) dotsContainer.textContent = '';

      cases.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'case-flow-card';
        card.setAttribute('data-index', String(index));
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${item.title || 'Case'} — ${item.subtitle || ''}`);

        // Safe Media Box
        const mediaBox = document.createElement('div');
        mediaBox.className = 'case-media-box';

        const safeImgSrc = (typeof item.image === 'string' && (item.image.startsWith('assets/') || item.image.startsWith('https://') || item.image.startsWith('data:image/')))
          ? item.image
          : '';

        if (safeImgSrc) {
          const img = document.createElement('img');
          img.src = safeImgSrc;
          img.alt = item.title || 'MotaGrowth Case Study';
          img.className = 'case-image';
          img.loading = 'lazy';
          mediaBox.appendChild(img);
        } else {
          const blankInner = document.createElement('div');
          blankInner.className = 'case-blank-inner';

          const badge = document.createElement('span');
          badge.className = 'case-badge-pill';
          badge.textContent = item.badge || `CASE ${String(index + 1).padStart(2, '0')}`;

          const notice = document.createElement('p');
          notice.className = 'case-placeholder-notice';
          notice.textContent = 'Studio Case Dossier';

          blankInner.appendChild(badge);
          blankInner.appendChild(notice);
          mediaBox.appendChild(blankInner);
        }

        // Safe Info Block
        const infoBlock = document.createElement('div');
        infoBlock.className = 'case-info-block';

        const titleEl = document.createElement('h3');
        titleEl.className = 'case-title-text';
        titleEl.textContent = item.title || 'Case Study';

        const subEl = document.createElement('p');
        subEl.className = 'case-sub-text';
        subEl.textContent = item.subtitle || '';

        infoBlock.appendChild(titleEl);
        infoBlock.appendChild(subEl);

        card.appendChild(mediaBox);
        card.appendChild(infoBlock);

        // Click to center
        card.addEventListener('click', () => {
          scrollToCaseIndex(index);
        });

        // Keyboard Enter/Space to select
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToCaseIndex(index);
          }
        });

        track.appendChild(card);

        // Accessible Dot
        if (dotsContainer) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = `cases-dot ${index === 0 ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Navigate to case ${index + 1}: ${item.title || ''}`);
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

    // 3D Perspective layout algorithm
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
          tx = sign * abs * 68;
          rY = -sign * abs * 16;
          tZ = -abs * 110;
          sc = 1.05 - abs * 0.16;
          op = 1 - abs * 0.25;
          br = 1 - abs * 0.3;
          z = Math.round(10 - abs * 2);
        } else if (abs <= 2) {
          const t = abs - 1;
          tx = sign * (68 + t * 60);
          rY = -sign * (16 + t * 9);
          tZ = -(110 + t * 110);
          sc = 0.89 - t * 0.16;
          op = 0.75 - t * 0.28;
          br = 0.7 - t * 0.25;
          z = Math.round(8 - t * 2);
        } else {
          const t = Math.min(1, abs - 2);
          tx = sign * (128 + t * 45);
          rY = -sign * (25 + t * 5);
          tZ = -(220 + t * 140);
          sc = Math.max(0.5, 0.73 - t * 0.2);
          op = Math.max(0, 0.47 - t * 0.47);
          br = 0.4;
          z = 1;
        }

        card.style.transform = `translate3d(${tx.toFixed(1)}%, 0, ${tZ.toFixed(1)}px) rotateY(${rY.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        card.style.opacity = op.toFixed(2);
        card.style.filter = `brightness(${br.toFixed(2)})`;
        card.style.zIndex = z;
        card.style.pointerEvents = abs > 2.5 ? 'none' : 'auto';

        card.classList.toggle('active', index === activeIdx);
        card.setAttribute('aria-current', index === activeIdx ? 'true' : 'false');
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIdx);
      });
    }

    // Calculate vertical scroll progress inside the cases container
    function getScrollProgress() {
      const rect = casesSection.getBoundingClientRect();
      const maxScroll = casesSection.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / maxScroll));
    }

    function updateFromScroll() {
      const rect = casesSection.getBoundingClientRect();
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const progress = getScrollProgress();
        targetFloatIndex = progress * (cases.length - 1);
        wakeCarousel();
      }
    }

    // Scroll window smoothly to a specific case index
    function scrollToCaseIndex(index) {
      const rect = casesSection.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const maxScroll = casesSection.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) {
        targetFloatIndex = index;
        wakeCarousel();
        return;
      }

      const targetProgress = index / (cases.length - 1);
      const targetScroll = sectionTop + targetProgress * maxScroll;

      targetFloatIndex = index;
      wakeCarousel();

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }

    // Step physics loop
    function stepCarousel() {
      const diff = targetFloatIndex - currentFloatIndex;
      if (Math.abs(diff) > 0.001) {
        currentFloatIndex += diff * 0.16;
        applyCardPositions(currentFloatIndex);
        carouselRafId = requestAnimationFrame(stepCarousel);
      } else {
        currentFloatIndex = targetFloatIndex;
        applyCardPositions(currentFloatIndex);
        carouselRafId = null;
      }
    }

    function wakeCarousel() {
      if (!carouselRafId) {
        carouselRafId = requestAnimationFrame(stepCarousel);
      }
    }

    // Window scroll listeners to drive horizontal scrub
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll, { passive: true });

    // Prev / Next button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cur = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.max(0, cur - 1));
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cur = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.min(cases.length - 1, cur + 1));
      });
    }

    // Keyboard Arrow navigation when cases section is in viewport
    document.addEventListener('keydown', (e) => {
      if (!isCasesInView) return;
      if (e.key === 'ArrowLeft') {
        const cur = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.max(0, cur - 1));
      } else if (e.key === 'ArrowRight') {
        const cur = Math.round(targetFloatIndex);
        scrollToCaseIndex(Math.min(cases.length - 1, cur + 1));
      }
    });

    // Touch Swipe gesture support
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
      }
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // Ensure horizontal swipe intent
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        const cur = Math.round(targetFloatIndex);
        if (deltaX > 0) {
          scrollToCaseIndex(Math.min(cases.length - 1, cur + 1));
        } else {
          scrollToCaseIndex(Math.max(0, cur - 1));
        }
      }
    }, { passive: true });

    // Mouse drag support for desktop
    if (stage) {
      let isMouseDown = false;
      let mouseStartX = 0;

      stage.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isMouseDown = true;
        mouseStartX = e.clientX;
      });

      window.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;
        isMouseDown = false;
        const deltaX = mouseStartX - e.clientX;
        if (Math.abs(deltaX) > 50) {
          const cur = Math.round(targetFloatIndex);
          if (deltaX > 0) {
            scrollToCaseIndex(Math.min(cases.length - 1, cur + 1));
          } else {
            scrollToCaseIndex(Math.max(0, cur - 1));
          }
        }
      });
    }

    window.renderCasesCarousel = renderCasesCarousel;
    renderCasesCarousel();
  }

  // ========================================================================
  // 8. Accessible Legal Modals (Privacy Statement & Terms)
  // ========================================================================
  const legalModal = document.getElementById('legalModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const openPrivacyBtn = document.getElementById('openPrivacyBtn');
  const openTermsBtn = document.getElementById('openTermsBtn');

  let lastActiveElement = null;

  const legalContent = {
    privacy: {
      title: 'Privacy Statement',
      body: [
        'MotaGrowth operates under strict client confidentiality and data integrity. We do not sell, rent, monetize, or disclose visitor or client information to third-party brokers.',
        'Direct project inquiries received via WhatsApp, email, or digital channels are utilized exclusively for inquiry evaluation, scope scoping, and professional collaboration.',
        'This client prototype performs all clock, geolocation, and animation computations natively within your browser without invasive trackers, third-party beacons, or external telemetry.'
      ]
    },
    terms: {
      title: 'Terms of Engagement',
      body: [
        'All client collaborations with MotaGrowth are governed by formal, bilateral Master Services Agreements (MSA) and tailored Statements of Work (SOW).',
        'Intellectual property, proprietary design systems, software assets, and custom digital infrastructure developed under active contracts transfer to the client upon full payment of agreed milestones.',
        'All client case studies and performance figures referenced by MotaGrowth represent authentic, verified commercial partnerships and are presented with client authorization.'
      ]
    }
  };

  function openModal(type) {
    if (!legalModal || !legalContent[type]) return;
    lastActiveElement = document.activeElement;

    const data = legalContent[type];
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody) {
      modalBody.textContent = '';
      data.body.forEach(para => {
        const p = document.createElement('p');
        p.textContent = para;
        modalBody.appendChild(p);
      });
    }

    legalModal.classList.add('is-open');
    legalModal.setAttribute('aria-hidden', 'false');
    if (closeModalBtn) closeModalBtn.focus();
  }

  function closeModal() {
    if (!legalModal) return;
    legalModal.classList.remove('is-open');
    legalModal.setAttribute('aria-hidden', 'true');
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener('click', () => openModal('privacy'));
  }

  if (openTermsBtn) {
    openTermsBtn.addEventListener('click', () => openModal('terms'));
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal && legalModal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // ========================================================================
  
  // ========================================================================
  // 8B. Interactive Studio Menu Chooser (Triggered by 4-Dots Button)
  // ========================================================================
  const menuTriggers = document.querySelectorAll('.menu-chooser-trigger');
  const menuModal = document.getElementById('studioMenuModal');
  const closeMenuBtn = document.getElementById('closeStudioMenuBtn');
  const menuBackdrop = document.getElementById('studioMenuBackdrop');
  const menuCloseLinks = document.querySelectorAll('[data-menu-close]');

  function openStudioMenu() {
    if (!menuModal) return;
    menuModal.classList.add('is-open');
    menuModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    menuTriggers.forEach(t => t.setAttribute('aria-expanded', 'true'));
  }

  function closeStudioMenu() {
    if (!menuModal) return;
    menuModal.classList.remove('is-open');
    menuModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    menuTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
  }

  menuTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (menuModal && menuModal.classList.contains('is-open')) {
        closeStudioMenu();
      } else {
        openStudioMenu();
      }
    });
  });

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeStudioMenu);
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeStudioMenu);
  }

  menuCloseLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      closeStudioMenu();
      if (href && !href.startsWith('#') && !href.startsWith('https://') && !href.startsWith('mailto:')) {
        window.location.href = href;
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal && menuModal.classList.contains('is-open')) {
      closeStudioMenu();
    }
  });

  // 9. Client Enquiries Hook (Future Admin Dashboard Data Layer)
  // ========================================================================
  window.MotaInquiries = {
    getAll: function() {
      try {
        const stored = localStorage.getItem('motagrowth_inquiries');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    },
    recordInquiry: function(inquiryData) {
      try {
        const list = window.MotaInquiries.getAll();
        const entry = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...inquiryData
        };
        list.push(entry);
        localStorage.setItem('motagrowth_inquiries', JSON.stringify(list));
        return entry;
      } catch (e) {
        console.warn('Inquiry storage error', e);
        return null;
      }
    }
  };

  // 11. ORSAP Editorial Showcase Controller (.ocs & #ocsViewer)
  // ========================================================================
  (function initOcsShowcase() {
    const ocs = document.querySelector('[data-ocs]');
    const viewer = document.getElementById('ocsViewer');
    if (!ocs) return;

    const tabs = Array.from(ocs.querySelectorAll('.ocs-tab'));
    const img = ocs.querySelector('.ocs-img');
    const caption = ocs.querySelector('.ocs-caption');
    const panel = ocs.querySelector('.ocs-figure');
    const enlargeBtn = ocs.querySelector('.ocs-enlarge');

    let currentIndex = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    if (currentIndex < 0) currentIndex = 0;
    let lastActiveTrigger = null;

    function selectTab(index, moveFocus = false) {
      if (index < 0 || index >= tabs.length) return;
      currentIndex = index;
      const tab = tabs[index];

      tabs.forEach((t, i) => {
        const isSelected = i === index;
        t.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        t.setAttribute('tabindex', isSelected ? '0' : '-1');
      });

      if (moveFocus) tab.focus();
      if (panel) panel.setAttribute('aria-labelledby', tab.id);

      if (img && tab.dataset.src) {
        img.style.opacity = '0.5';
        setTimeout(() => {
          img.src = tab.dataset.src;
          if (tab.dataset.alt) img.alt = tab.dataset.alt;
          img.style.opacity = '1';
        }, 80);
      }

      if (caption && tab.dataset.caption) {
        caption.textContent = tab.dataset.caption;
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(index));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          selectTab((index + 1) % tabs.length, true);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          selectTab((index - 1 + tabs.length) % tabs.length, true);
        }
      });
    });

    // Enlarge modal / dialog
    if (viewer) {
      const viewerTitle = document.getElementById('ocsViewerTitle');
      const viewerImg = viewer.querySelector('.ocs-viewer-img');
      const viewerClose = viewer.querySelector('[data-ocs-close]');
      const viewerPrev = viewer.querySelector('[data-ocs-prev]');
      const viewerNext = viewer.querySelector('[data-ocs-next]');
      const viewerBody = viewer.querySelector('.ocs-viewer-body');

      function updateViewer() {
        const currentTab = tabs[currentIndex];
        if (!currentTab) return;
        if (viewerTitle) viewerTitle.textContent = `ORSAP — ${currentTab.textContent.trim()}`;
        if (viewerImg && currentTab.dataset.full) {
          viewerImg.src = currentTab.dataset.full;
          viewerImg.alt = currentTab.dataset.alt || '';
        }
        if (viewerBody) viewerBody.scrollTop = 0;
      }

      function openViewer() {
        lastActiveTrigger = document.activeElement;
        updateViewer();
        viewer.setAttribute('open', '');
        document.body.style.overflow = 'hidden';

        // Teleport custom cursor inside the active viewer to guarantee visibility
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');
        if (cursorDot && cursorRing) {
          viewer.appendChild(cursorDot);
          viewer.appendChild(cursorRing);
        }

        if (viewerClose) viewerClose.focus();
      }

      function closeViewer() {
        viewer.removeAttribute('open');
        if (typeof viewer.close === 'function') {
          try { viewer.close(); } catch (err) {}
        }
        document.body.style.overflow = '';

        // Teleport custom cursor back to document.body
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');
        if (cursorDot && cursorRing) {
          document.body.appendChild(cursorDot);
          document.body.appendChild(cursorRing);
        }

        if (lastActiveTrigger && typeof lastActiveTrigger.focus === 'function') {
          lastActiveTrigger.focus();
        }
      }

      if (enlargeBtn) {
        enlargeBtn.addEventListener('click', openViewer);
      }

      // Also clicking the frame opens viewer
      const frame = ocs.querySelector('.ocs-frame');
      if (frame) {
        frame.style.cursor = 'pointer';
        frame.addEventListener('click', openViewer);
      }

      if (viewerClose) {
        viewerClose.addEventListener('click', closeViewer);
      }

      if (viewerPrev) {
        viewerPrev.addEventListener('click', () => {
          selectTab((currentIndex - 1 + tabs.length) % tabs.length);
          updateViewer();
        });
      }

      if (viewerNext) {
        viewerNext.addEventListener('click', () => {
          selectTab((currentIndex + 1) % tabs.length);
          updateViewer();
        });
      }

      viewer.addEventListener('click', (e) => {
        if (e.target === viewer) closeViewer();
      });

      viewer.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeViewer();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          selectTab((currentIndex + 1) % tabs.length);
          updateViewer();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          selectTab((currentIndex - 1 + tabs.length) % tabs.length);
          updateViewer();
        }
      });
    }
  })();

  // 12. Case Study Image Zoom Controller (.cse-decision-img-wrap[data-zoom])
  // ========================================================================
  (function initCaseZoom() {
    const zoomWraps = document.querySelectorAll('.cse-decision-img-wrap[data-zoom]');
    const viewer = document.getElementById('cseViewer');
    if (!zoomWraps.length || !viewer) return;

    const viewerTitle = document.getElementById('cseViewerTitle');
    const viewerImg = viewer.querySelector('.ocs-viewer-img');
    const viewerClose = viewer.querySelector('[data-ocs-close]');
    const viewerBody = viewer.querySelector('.ocs-viewer-body');
    let lastActiveTrigger = null;

    function openZoom(src, title, alt) {
      lastActiveTrigger = document.activeElement;
      if (viewerTitle && title) viewerTitle.textContent = title;
      if (viewerImg && src) {
        viewerImg.src = src;
        viewerImg.alt = alt || '';
      }
      if (viewerBody) viewerBody.scrollTop = 0;
      viewer.setAttribute('open', '');
      document.body.style.overflow = 'hidden';

      // Teleport custom cursor inside the active viewer to guarantee visibility
      const cursorDot = document.getElementById('cursor-dot');
      const cursorRing = document.getElementById('cursor-ring');
      if (cursorDot && cursorRing) {
        viewer.appendChild(cursorDot);
        viewer.appendChild(cursorRing);
      }

      if (viewerClose) viewerClose.focus();
    }

    function closeZoom() {
      viewer.removeAttribute('open');
      if (typeof viewer.close === 'function') {
        try { viewer.close(); } catch (err) {}
      }
      document.body.style.overflow = '';

      // Teleport custom cursor back to document.body
      const cursorDot = document.getElementById('cursor-dot');
      const cursorRing = document.getElementById('cursor-ring');
      if (cursorDot && cursorRing) {
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);
      }

      if (lastActiveTrigger && typeof lastActiveTrigger.focus === 'function') {
        lastActiveTrigger.focus();
      }
    }

    zoomWraps.forEach(wrap => {
      wrap.setAttribute('tabindex', '0');
      wrap.setAttribute('role', 'button');
      wrap.setAttribute('aria-label', 'Click to enlarge capture');
      const action = () => {
        const src = wrap.dataset.zoom || wrap.querySelector('img')?.src;
        const title = wrap.dataset.title || 'ORSAP Architecture Capture';
        const alt = wrap.querySelector('img')?.alt || '';
        openZoom(src, title, alt);
      };
      wrap.addEventListener('click', action);
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          action();
        }
      });
    });

    if (viewerClose) viewerClose.addEventListener('click', closeZoom);
    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) closeZoom();
    });
    viewer.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeZoom();
      }
    });
  })();

  // ========================================================================
  // 13. Dynamic Multi-Path Project Proposal Questionnaire & CRM Pipeline
  // ========================================================================
  (function initProjectQuestionnaire() {
    const form = document.getElementById('projectInquiryForm');
    if (!form) return;

    const SERVICE_CONFIG = {
      'performance-marketing': {
        key: 'performance-marketing',
        name: 'Performance Marketing',
        discipline: 'Paid Acquisition & Revenue Scaling',
        price: 'From 5,000 MAD / month',
        shortPrice: '5,000 MAD / month',
        pathId: 'path-performance-marketing'
      },
      'digital-architecture': {
        key: 'digital-architecture',
        name: 'Digital Architecture',
        discipline: 'Bespoke Web Design & Development',
        price: 'From 15,000 MAD / project',
        shortPrice: '15,000 MAD',
        pathId: 'path-digital-architecture'
      },
      'creative-direction': {
        key: 'creative-direction',
        name: 'Creative Direction',
        discipline: 'Brand Identity & Visual Worlds',
        price: 'From 8,000 MAD / project',
        shortPrice: '8,000 MAD',
        pathId: 'path-creative-direction'
      },
      'conversion-strategy': {
        key: 'conversion-strategy',
        name: 'Conversion Strategy',
        discipline: 'Conversion Rate Optimization',
        price: 'Audits from 5,000 MAD',
        shortPrice: '5,000 MAD',
        pathId: 'path-conversion-strategy'
      }
    };

    const serviceCards = document.querySelectorAll('.q-service-card');
    const serviceRadios = form.querySelectorAll('input[name="selectedService"]');
    const paths = document.querySelectorAll('.q-path');
    const summaryServiceName = document.getElementById('qSummaryServiceName');
    const summaryPrice = document.getElementById('qSummaryPrice');
    const priceAgreeText = document.getElementById('qPriceAgreeText');
    const privacyBtn = document.getElementById('qPrivacyPolicyBtn');
    const successCard = document.getElementById('qSuccessCard');
    const successMeta = document.getElementById('qSuccessMeta');
    const resetBtn = document.getElementById('qResetBtn');
    const choiceCards = form.querySelectorAll('.q-choice-card');

    let currentSelectedService = 'performance-marketing';

    function syncChoiceCardStates() {
      choiceCards.forEach(card => {
        const inp = card.querySelector('input');
        if (inp) {
          card.classList.toggle('is-checked', inp.checked);
        }
      });
    }

    function selectService(serviceKey, shouldScroll) {
      const cfg = SERVICE_CONFIG[serviceKey] || SERVICE_CONFIG['performance-marketing'];
      currentSelectedService = cfg.key;

      // 1. Radio state
      serviceRadios.forEach(radio => {
        radio.checked = (radio.value === cfg.key);
      });

      // 2. Card state
      serviceCards.forEach(card => {
        const isMatch = (card.dataset.service === cfg.key);
        card.classList.toggle('is-selected', isMatch);
        card.setAttribute('aria-checked', isMatch ? 'true' : 'false');
      });

      // 3. Dynamic path visibility
      paths.forEach(path => {
        const isMatch = (path.id === cfg.pathId || path.dataset.path === cfg.key);
        path.classList.toggle('is-active', isMatch);
      });

      // 4. Update dynamic summary
      if (summaryServiceName) summaryServiceName.textContent = cfg.name;
      if (summaryPrice) summaryPrice.textContent = cfg.price;

      // 5. Update required checkbox notice
      if (priceAgreeText) {
        priceAgreeText.textContent = `I understand this service starts at ${cfg.shortPrice}, and additional requirements may increase the final quote.`;
      }

      // 6. Smooth scroll to form if requested
      if (shouldScroll) {
        const proposalSec = document.getElementById('proposal');
        if (proposalSec) {
          proposalSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    // Attach click listeners to service cards
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.service;
        if (key) {
          selectService(key, false);
        }
      });
    });

    // Listen to changes on service radios
    serviceRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          selectService(radio.value, false);
        }
      });
    });

    // Listen to choice card toggles
    form.addEventListener('change', (e) => {
      if (e.target.matches('.q-choice-card input')) {
        syncChoiceCardStates();
      }
    });

    // Handle all external "data-inquire" buttons
    document.querySelectorAll('[data-inquire]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetService = btn.getAttribute('data-inquire');
        if (targetService && SERVICE_CONFIG[targetService]) {
          const href = btn.getAttribute('href') || '';
          if (href === '#proposal' || href.endsWith('#proposal')) {
            e.preventDefault();
            selectService(targetService, true);
            if (history.pushState) {
              history.pushState(null, null, '#proposal');
            }
          }
        }
      });
    });

    // Check URL search params for ?service=...
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramService = urlParams.get('service');
      if (paramService && SERVICE_CONFIG[paramService]) {
        selectService(paramService, window.location.hash === '#proposal');
      } else {
        const checked = form.querySelector('input[name="selectedService"]:checked');
        selectService(checked ? checked.value : 'performance-marketing', false);
      }
    } catch (e) {
      selectService('performance-marketing', false);
    }

    // Hashchange listener
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#proposal') {
        const proposalSec = document.getElementById('proposal');
        if (proposalSec) {
          proposalSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });

    // Privacy modal trigger
    if (privacyBtn) {
      privacyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const openPrivacy = document.getElementById('openPrivacyBtn');
        if (openPrivacy) {
          openPrivacy.click();
        } else {
          const privModal = document.getElementById('privacyModal');
          if (privModal) {
            privModal.setAttribute('open', '');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    }

    // Helper: Mark field error
    function markError(el, message) {
      if (!el) return;
      el.classList.add('has-error');
      
      const parent = el.closest('.q-field') || el.closest('.q-choice-grid') || el.parentElement;
      if (parent) {
        parent.classList.add('has-error');
        let tip = parent.querySelector('.q-error-tip');
        if (!tip) {
          tip = document.createElement('span');
          tip.className = 'q-error-tip';
          parent.appendChild(tip);
        }
        tip.textContent = message || 'This field is required.';
      }

      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (typeof el.focus === 'function') {
        try { el.focus(); } catch (err) {}
      }
    }

    function clearAllErrors() {
      form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
      form.querySelectorAll('.q-error-tip').forEach(el => el.remove());
    }

    // Form submit validation & persistence
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors();

      // 1. Universal Business Details
      const fullName = (document.getElementById('qFullName')?.value || '').trim();
      if (!fullName) {
        markError(document.getElementById('qFullName'), 'Please enter your full name.');
        return;
      }

      const companyName = (document.getElementById('qCompanyName')?.value || '').trim();
      if (!companyName) {
        markError(document.getElementById('qCompanyName'), 'Please enter your company or brand name.');
        return;
      }

      const email = (document.getElementById('qEmail')?.value || '').trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        markError(document.getElementById('qEmail'), 'Please enter a valid email address.');
        return;
      }

      const phone = (document.getElementById('qPhone')?.value || '').trim();
      if (!phone || phone.length < 5) {
        markError(document.getElementById('qPhone'), 'Please provide your WhatsApp number with country code.');
        return;
      }

      const locationVal = (document.getElementById('qLocation')?.value || '').trim();
      if (!locationVal) {
        markError(document.getElementById('qLocation'), 'Please specify where your business is based.');
        return;
      }

      const website = (document.getElementById('qWebsite')?.value || '').trim();

      const bizDesc = (document.getElementById('qBizDesc')?.value || '').trim();
      if (!bizDesc || bizDesc.length < 5) {
        markError(document.getElementById('qBizDesc'), 'Please briefly describe your business and what you sell.');
        return;
      }

      // 2. Active Path Specific Validations & Data Extraction
      const answers = {};
      const answerNotesList = [];

      if (currentSelectedService === 'performance-marketing') {
        const goal = form.querySelector('input[name="pm_goal"]:checked');
        if (!goal) {
          const grid = document.querySelector('input[name="pm_goal"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select your primary performance goal.');
          return;
        }
        answers['Primary Goal'] = goal.value;
        answerNotesList.push(`Goal: ${goal.value}`);

        const platforms = Array.from(form.querySelectorAll('input[name="pm_platforms"]:checked')).map(cb => cb.value);
        if (platforms.length === 0) {
          const grid = document.querySelector('input[name="pm_platforms"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select at least one advertising platform.');
          return;
        }
        answers['Platforms'] = platforms;
        answerNotesList.push(`Platforms: ${platforms.join(', ')}`);

        const runningAds = form.querySelector('input[name="pm_running_ads"]:checked');
        if (!runningAds) {
          const grid = document.querySelector('input[name="pm_running_ads"]')?.closest('.q-choice-grid');
          markError(grid, 'Please specify if you are currently running paid ads.');
          return;
        }
        answers['Currently Running Ads'] = runningAds.value;
        answerNotesList.push(`Current Ads: ${runningAds.value}`);

        const budget = form.querySelector('input[name="pm_budget"]:checked');
        if (!budget) {
          const grid = document.querySelector('input[name="pm_budget"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select your monthly advertising budget.');
          return;
        }
        answers['Monthly Ad Budget'] = budget.value;
        answerNotesList.push(`Ad Budget: ${budget.value}`);

        const content = form.querySelector('input[name="pm_content"]:checked');
        if (!content) {
          const grid = document.querySelector('input[name="pm_content"]')?.closest('.q-choice-grid');
          markError(grid, 'Please indicate your existing ad content availability.');
          return;
        }
        answers['Creative Content Status'] = content.value;
        answerNotesList.push(`Creative Content: ${content.value}`);

        const improvements = (document.getElementById('pm_improvements')?.value || '').trim();
        if (!improvements) {
          markError(document.getElementById('pm_improvements'), 'Please describe your targets or biggest acquisition challenge.');
          return;
        }
        answers['Targets & Challenges'] = improvements;
        answerNotesList.push(`Targets/Challenges: ${improvements}`);

      } else if (currentSelectedService === 'digital-architecture') {
        const buildType = form.querySelector('input[name="da_build_type"]:checked');
        if (!buildType) {
          const grid = document.querySelector('input[name="da_build_type"]')?.closest('.q-choice-grid');
          markError(grid, 'Please specify what you are looking to build.');
          return;
        }
        answers['Build Type'] = buildType.value;
        answerNotesList.push(`Build Type: ${buildType.value}`);

        const goals = Array.from(form.querySelectorAll('input[name="da_goals"]:checked')).map(cb => cb.value);
        if (goals.length === 0) {
          const grid = document.querySelector('input[name="da_goals"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select at least one primary website objective.');
          return;
        }
        answers['Objectives'] = goals;
        answerNotesList.push(`Objectives: ${goals.join(', ')}`);

        const pages = form.querySelector('input[name="da_pages"]:checked');
        if (!pages) {
          const grid = document.querySelector('input[name="da_pages"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select approximate number of pages.');
          return;
        }
        answers['Scope Pages'] = pages.value;
        answerNotesList.push(`Pages: ${pages.value}`);

        const features = Array.from(form.querySelectorAll('input[name="da_features"]:checked')).map(cb => cb.value);
        if (features.length === 0) {
          const grid = document.querySelector('input[name="da_features"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select required features.');
          return;
        }
        answers['Required Features'] = features;
        answerNotesList.push(`Features: ${features.join(', ')}`);

        const materials = Array.from(form.querySelectorAll('input[name="da_materials"]:checked')).map(cb => cb.value);
        if (materials.length === 0) {
          const grid = document.querySelector('input[name="da_materials"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select which materials you already have.');
          return;
        }
        answers['Existing Materials'] = materials;
        answerNotesList.push(`Existing Materials: ${materials.join(', ')}`);

        const examples = (document.getElementById('da_examples')?.value || '').trim();
        if (examples) {
          answers['Reference Websites'] = examples;
          answerNotesList.push(`Reference Websites: ${examples}`);
        }

        const daNotes = (document.getElementById('da_notes')?.value || '').trim();
        if (daNotes) {
          answers['Project Notes'] = daNotes;
          answerNotesList.push(`Architecture Notes: ${daNotes}`);
        }

      } else if (currentSelectedService === 'creative-direction') {
        const stage = form.querySelector('input[name="cd_stage"]:checked');
        if (!stage) {
          const grid = document.querySelector('input[name="cd_stage"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select what stage your brand is at.');
          return;
        }
        answers['Brand Stage'] = stage.value;
        answerNotesList.push(`Brand Stage: ${stage.value}`);

        const customer = (document.getElementById('cd_customer')?.value || '').trim();
        if (!customer) {
          markError(document.getElementById('cd_customer'), 'Please describe your ideal customer.');
          return;
        }
        answers['Ideal Customer'] = customer;
        answerNotesList.push(`Ideal Customer: ${customer}`);

        const deliverables = Array.from(form.querySelectorAll('input[name="cd_deliverables"]:checked')).map(cb => cb.value);
        if (deliverables.length === 0) {
          const grid = document.querySelector('input[name="cd_deliverables"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select what you need us to create.');
          return;
        }
        answers['Deliverables'] = deliverables;
        answerNotesList.push(`Deliverables: ${deliverables.join(', ')}`);

        const aesthetic = (document.getElementById('cd_aesthetic')?.value || '').trim();
        if (!aesthetic) {
          markError(document.getElementById('cd_aesthetic'), 'Please describe how your brand should look and feel.');
          return;
        }
        answers['Look & Feel'] = aesthetic;
        answerNotesList.push(`Look & Feel: ${aesthetic}`);

        const existing = form.querySelector('input[name="cd_existing_materials"]:checked');
        if (!existing) {
          const grid = document.querySelector('input[name="cd_existing_materials"]')?.closest('.q-choice-grid');
          markError(grid, 'Please specify if you have existing reference materials.');
          return;
        }
        answers['Existing Assets'] = existing.value;
        answerNotesList.push(`Existing Assets: ${existing.value}`);

        const refs = (document.getElementById('cd_references')?.value || '').trim();
        if (refs) {
          answers['Admiration References'] = refs;
          answerNotesList.push(`Visual References: ${refs}`);
        }

        const launchEssentials = (document.getElementById('cd_launch_essentials')?.value || '').trim();
        if (!launchEssentials) {
          markError(document.getElementById('cd_launch_essentials'), 'Please specify essential launch deliverables.');
          return;
        }
        answers['Launch Essentials'] = launchEssentials;
        answerNotesList.push(`Launch Essentials: ${launchEssentials}`);

      } else if (currentSelectedService === 'conversion-strategy') {
        const csWebsite = (document.getElementById('cs_website')?.value || '').trim();
        if (!csWebsite) {
          markError(document.getElementById('cs_website'), 'Please enter the URL of the website or funnel to review.');
          return;
        }
        answers['Target URL'] = csWebsite;
        answerNotesList.push(`Funnel URL: ${csWebsite}`);

        const action = form.querySelector('input[name="cs_action"]:checked');
        if (!action) {
          const grid = document.querySelector('input[name="cs_action"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select the key action you want visitors to take.');
          return;
        }
        answers['Desired Action'] = action.value;
        answerNotesList.push(`Desired Action: ${action.value}`);

        const visitors = form.querySelector('input[name="cs_visitors"]:checked');
        if (!visitors) {
          const grid = document.querySelector('input[name="cs_visitors"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select your monthly visitor tier.');
          return;
        }
        answers['Monthly Visitors'] = visitors.value;
        answerNotesList.push(`Monthly Traffic: ${visitors.value}`);

        const challenges = Array.from(form.querySelectorAll('input[name="cs_challenges"]:checked')).map(cb => cb.value);
        if (challenges.length === 0) {
          const grid = document.querySelector('input[name="cs_challenges"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select your biggest conversion challenges.');
          return;
        }
        answers['Challenges'] = challenges;
        answerNotesList.push(`Challenges: ${challenges.join(', ')}`);

        const tools = Array.from(form.querySelectorAll('input[name="cs_tools"]:checked')).map(cb => cb.value);
        if (tools.length > 0) {
          answers['Installed Tools'] = tools;
          answerNotesList.push(`Tracking Tools: ${tools.join(', ')}`);
        }

        const csRate = (document.getElementById('cs_rate')?.value || '').trim();
        if (csRate) {
          answers['Current Rate'] = csRate;
          answerNotesList.push(`Current Conv Rate: ${csRate}`);
        }

        const support = form.querySelector('input[name="cs_support"]:checked');
        if (!support) {
          const grid = document.querySelector('input[name="cs_support"]')?.closest('.q-choice-grid');
          markError(grid, 'Please select the kind of optimization support you need.');
          return;
        }
        answers['Support Type'] = support.value;
        answerNotesList.push(`Support Type: ${support.value}`);
      }

      // 3. Timing & Price Acknowledgment
      const timelineRadio = form.querySelector('input[name="timeline"]:checked');
      if (!timelineRadio) {
        const grid = document.querySelector('input[name="timeline"]')?.closest('.q-choice-grid');
        markError(grid, 'Please select when you would like to start.');
        return;
      }
      const timelineVal = timelineRadio.value;
      answers['Target Timeline'] = timelineVal;

      const additionalNotes = (document.getElementById('qAdditionalNotes')?.value || '').trim();
      if (additionalNotes) {
        answers['Additional Notes'] = additionalNotes;
        answerNotesList.push(`Additional Notes: ${additionalNotes}`);
      }

      const priceAgree = document.getElementById('qPriceAgree');
      if (!priceAgree || !priceAgree.checked) {
        markError(priceAgree?.parentElement, 'Please acknowledge the starting price scope to proceed.');
        return;
      }

      // 4. Build CRM Payload
      const cfg = SERVICE_CONFIG[currentSelectedService];
      const refSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const refId = `INQ-${cfg.name.substring(0, 4).toUpperCase().replace(/\s/g, '')}-${refSuffix}`;
      
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const dateDisplay = `${day}/${month}/${year}<br><span style="color: #64748b; font-weight: 500;">${hours}:${minutes}</span>`;

      const fullNotes = [
        `BUSINESS CONTEXT: ${bizDesc}`,
        website ? `WEBSITE / SOCIAL: ${website}` : '',
        `LOCATION: ${locationVal}`,
        `TIMELINE: ${timelineVal}`,
        '--- SERVICE REQUIREMENTS ---',
        ...answerNotesList
      ].filter(Boolean).join('\n');

      const inquiryRecord = {
        id: refId,
        createdAt: now.toISOString(),
        dateDisplay: dateDisplay,
        type: 'PRO',
        clientName: fullName,
        companyName: companyName,
        clientEmail: email,
        clientPhone: phone,
        location: locationVal,
        website: website || '—',
        businessDescription: bizDesc,
        serviceKey: currentSelectedService,
        services: [`${cfg.name} (${cfg.price})`],
        sector: locationVal || 'Studio Client',
        timeline: timelineVal,
        notes: fullNotes,
        answers: answers,
        status: 'Nouveau',
        priceNoticeAgreed: true
      };

      // 5. Save to LocalStorage CRM DB
      try {
        const STORAGE_KEY = 'motagrowth_v7_inquiries_db';
        const existingData = localStorage.getItem(STORAGE_KEY);
        let list = [];
        if (existingData) {
          try {
            const parsed = JSON.parse(existingData);
            if (Array.isArray(parsed)) list = parsed;
          } catch (e) { list = []; }
        }
        list.unshift(inquiryRecord);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (err) {
        console.error('MotaGrowth CRM Inquiry Storage Error:', err);
      }

      // 6. Transition to Confirmation State
      form.style.display = 'none';
      if (successCard) {
        successCard.classList.add('is-active');
        successCard.style.display = 'block';
      }

      if (successMeta) {
        successMeta.innerHTML = `
          <div class="q-success-meta-row">
            <span class="q-success-meta-label">Inquiry Reference</span>
            <span class="q-success-meta-val">${refId}</span>
          </div>
          <div class="q-success-meta-row">
            <span class="q-success-meta-label">Selected Service</span>
            <span class="q-success-meta-val">${cfg.name}</span>
          </div>
          <div class="q-success-meta-row">
            <span class="q-success-meta-label">Starting Scope</span>
            <span class="q-success-meta-val">${cfg.price}</span>
          </div>
          <div class="q-success-meta-row">
            <span class="q-success-meta-label">Client</span>
            <span class="q-success-meta-val">${fullName} (${companyName})</span>
          </div>
          <div class="q-success-meta-row">
            <span class="q-success-meta-label">Direct Contact</span>
            <span class="q-success-meta-val">${phone} • ${email}</span>
          </div>
          <div class="q-success-meta-row">
            <span class="q-success-meta-label">Target Launch</span>
            <span class="q-success-meta-val">${timelineVal}</span>
          </div>
        `;
      }

      const proposalSec = document.getElementById('proposal');
      if (proposalSec) {
        proposalSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // 7. Reset Form for new inquiry
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        clearAllErrors();
        selectService('performance-marketing', false);
        if (successCard) {
          successCard.classList.remove('is-active');
          successCard.style.display = 'none';
        }
        form.style.display = 'block';
        syncChoiceCardStates();
        const proposalSec = document.getElementById('proposal');
        if (proposalSec) {
          proposalSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Initial sync
    syncChoiceCardStates();
  })();

});
