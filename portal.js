/**
 * MotaGrowth - Unified Agency Platform Engine
 * 1. Native Motion Video Animation with Sound (finalanimation.mp4)
 * 2. 4-Step Agency Intake Brief Wizard
 * 3. Dedicated Client Space Portal (Calendar, Approvals, Ideas, Assets)
 * 4. Private Agency Admin CRM (Leads, Client Account Creator, Workspace Manager)
 */

function initMotaGrowthApp() {
  // Initialize Icons
  if (window.lucide) window.lucide.createIcons();

  // Storage Keys
  const STORAGE_INQUIRIES = 'motagrowth_v7_inquiries_db';
  const STORAGE_CLIENTS = 'motagrowth_v6_clients_db';
  const STORAGE_ACTIVE_CLIENT_SESSION = 'motagrowth_active_client_session_v1';

  function saveActiveSession(client) {
    try {
      if (client && client.id) {
        sessionStorage.setItem(STORAGE_ACTIVE_CLIENT_SESSION, client.id);
        localStorage.setItem(STORAGE_ACTIVE_CLIENT_SESSION, client.id);
        sessionStorage.setItem('motagrowth_active_client_obj', JSON.stringify(client));
        localStorage.setItem('motagrowth_active_client_obj', JSON.stringify(client));
      } else {
        sessionStorage.removeItem(STORAGE_ACTIVE_CLIENT_SESSION);
        localStorage.removeItem(STORAGE_ACTIVE_CLIENT_SESSION);
        sessionStorage.removeItem('motagrowth_active_client_obj');
        localStorage.removeItem('motagrowth_active_client_obj');
      }
    } catch (e) {}
  }

  function getActiveSessionClient() {
    try {
      const activeId = sessionStorage.getItem(STORAGE_ACTIVE_CLIENT_SESSION) || localStorage.getItem(STORAGE_ACTIVE_CLIENT_SESSION);
      const allClients = loadClients();
      if (activeId && Array.isArray(allClients)) {
        const found = allClients.find(c => c.id === activeId);
        if (found) return found;
      }
      const rawObj = sessionStorage.getItem('motagrowth_active_client_obj') || localStorage.getItem('motagrowth_active_client_obj');
      if (rawObj) {
        return JSON.parse(rawObj);
      }
    } catch (e) {}
    return null;
  }

  // Load Initial State
  let loggedInClient = null;
  let inquiries = loadInquiries();
  let clients = loadClients();
  loggedInClient = getActiveSessionClient();
  let activeEditingClientId = null;
  let currentWizardStep = 1;
  let activeClientTab = 'home';
  let activeFolderCategory = 'all';
  let activeCalendarPlatform = 'all';
  let activeIdeasFilter = 'all';
  let activeDetailIdeaId = null;
  let isClientPortalInitialized = false;

  // DOM Elements - Views
  const landingView = document.getElementById('landingView');
  const clientSignInView = document.getElementById('clientSignInView');
  const clientPortalView = document.getElementById('clientPortalView');
  const adminPortalView = document.getElementById('adminPortalView');
  const clientSignInForm = document.getElementById('clientSignInForm');
  const clientSignInUsername = document.getElementById('clientSignInUsername');
  const clientSignInPassword = document.getElementById('clientSignInPassword');
  const clientSignInError = document.getElementById('clientSignInError');
  const clientSignInHomeLink = document.getElementById('clientSignInHomeLink');

  // DOM Elements - Hero & Motion Animation
  const getInTouchBtn = document.getElementById('getInTouchBtn');
  const heroCenterWrapper = document.getElementById('heroCenterWrapper');
  const motionVideo = document.getElementById('motionVideo');

  // DOM Elements - Intake Modal
  const intakeModal = document.getElementById('intakeModal');
  const intakeBackdrop = document.getElementById('intakeBackdrop');
  const closeIntakeBtn = document.getElementById('closeIntakeBtn');
  const projectIntakeForm = document.getElementById('projectIntakeForm');
  const stepBackBtn = document.getElementById('stepBackBtn');
  const stepNextBtn = document.getElementById('stepNextBtn');
  const stepSubmitBtn = document.getElementById('stepSubmitBtn');
  const intakeConfirmation = document.getElementById('intakeConfirmation');
  const confirmDoneBtn = document.getElementById('confirmDoneBtn');
  const confirmClientName = document.getElementById('confirmClientName');
  const confirmClientEmail = document.getElementById('confirmClientEmail');

  // DOM Elements - Client Space
  const clientLoginScreen = document.getElementById('clientLoginScreen');
  const clientLoginForm = document.getElementById('clientLoginForm');
  const clientLoginUser = document.getElementById('clientLoginUser');
  const clientLoginPass = document.getElementById('clientLoginPass');
  const clientLoginError = document.getElementById('clientLoginError');
  const clientDashboardScreen = document.getElementById('clientDashboardScreen');
  const clientLogoutBtn = document.getElementById('clientLogoutBtn');
  const fillDemoClient1 = document.getElementById('fillDemoClient1');
  const portalClientProfile = document.getElementById('portalClientProfile');

  // Client Modals
  const ideaDetailModal = document.getElementById('ideaDetailModal');
  const closeIdeaDetailModalBtn = document.getElementById('closeIdeaDetailModalBtn');
  const cancelIdeaDetailBtn = document.getElementById('cancelIdeaDetailBtn');
  const ideaDetailForm = document.getElementById('ideaDetailForm');
  const detailModalIdeaTitle = document.getElementById('detailModalIdeaTitle');
  const detailTopicSelect = document.getElementById('detailTopicSelect');
  const detailClientNote = document.getElementById('detailClientNote');

  const proposeIdeaModal = document.getElementById('proposeIdeaModal');
  const openProposeIdeaModalBtn = document.getElementById('openProposeIdeaModalBtn');
  const closeProposeIdeaModalBtn = document.getElementById('closeProposeIdeaModalBtn');
  const cancelProposeIdeaBtn = document.getElementById('cancelProposeIdeaBtn');
  const proposeIdeaForm = document.getElementById('proposeIdeaForm');

  // DOM Elements - Admin Portal
  const adminHomeLink = document.getElementById('adminHomeLink');
  const tabInquiriesBtn = document.getElementById('tabInquiriesBtn');
  const tabMeetingsBtn = document.getElementById('tabMeetingsBtn');
  const tabClientsBtn = document.getElementById('tabClientsBtn');
  const adminInquiriesSection = document.getElementById('adminInquiriesSection');
  const adminMeetingsSection = document.getElementById('adminMeetingsSection');
  const adminClientsSection = document.getElementById('adminClientsSection');
  const inquiriesTableBody = document.getElementById('inquiriesTableBody');
  const inquiriesEmptyState = document.getElementById('inquiriesEmptyState');
  const inquirySearchInput = document.getElementById('inquirySearchInput');
  const inquiryStatusFilter = document.getElementById('inquiryStatusFilter');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const meetingsTableBody = document.getElementById('meetingsTableBody');
  const meetingsEmptyState = document.getElementById('meetingsEmptyState');
  const meetingSearchInput = document.getElementById('meetingSearchInput');
  const exportMeetingsCsvBtn = document.getElementById('exportMeetingsCsvBtn');
  const openNewClientModalBtn = document.getElementById('openNewClientModalBtn');
  const adminClientsGrid = document.getElementById('adminClientsGrid');

  // Admin Modals
  const createClientModal = document.getElementById('createClientModal');
  const closeCreateClientBtn = document.getElementById('closeCreateClientBtn');
  const cancelCreateClientBtn = document.getElementById('cancelCreateClientBtn');
  const createClientForm = document.getElementById('createClientForm');

  const manageClientModal = document.getElementById('manageClientModal');
  const closeManageClientBtn = document.getElementById('closeManageClientBtn');
  const manageClientTitle = document.getElementById('manageClientTitle');
  const manageClientSub = document.getElementById('manageClientSub');

  // =========================================================================
  // 1. ROUTING CONTROLLER
  // =========================================================================

  function handleRoute() {
    const hash = (window.location.hash || '').toLowerCase();
    const href = (window.location.href || '').toLowerCase();
    const isDocAdmin = document.body && document.body.classList.contains('is-admin-route');
    const isDocClient = document.body && document.body.classList.contains('is-client-route');

    if (hash === '#admin' || href.includes('admin.html') || href.includes('#admin') || isDocAdmin) {
      showAdminView();
    } else if (hash === '#client-space' || href.includes('client-space.html') || href.includes('#client-space') || isDocClient) {
      showClientSpaceView();
    } else {
      showLandingView();
    }
  }

  function showLandingView() {
    document.body.classList.remove('is-admin-route');
    document.body.classList.remove('is-client-route');
    if (landingView) landingView.style.display = 'block';
    if (clientSignInView) clientSignInView.style.display = 'none';
    if (clientPortalView) clientPortalView.style.display = 'none';
    if (adminPortalView) adminPortalView.style.display = 'none';
    if (window.lucide) window.lucide.createIcons();
  }

  function showClientSpaceView() {
    document.body.classList.remove('is-admin-route');
    document.body.classList.add('is-client-route');
    if (landingView) landingView.style.display = 'none';
    if (adminPortalView) adminPortalView.style.display = 'none';

    // Always synchronize latest client session state from storage
    loggedInClient = getActiveSessionClient();

    // Gate Client Portal behind Sign In
    if (!loggedInClient) {
      if (clientPortalView) clientPortalView.style.display = 'none';
      if (clientSignInView) {
        clientSignInView.style.display = 'flex';
        if (clientSignInError) {
          clientSignInError.style.display = 'none';
          clientSignInError.textContent = '';
        }
      }
    } else {
      if (clientSignInView) clientSignInView.style.display = 'none';
      if (clientPortalView) clientPortalView.style.display = 'block';

      // Inject Active Client Details into header / dropdown / avatars
      const clientNameEl = document.getElementById('portalHeroUserName');
      if (clientNameEl) clientNameEl.textContent = loggedInClient.companyName || loggedInClient.clientName || 'Client';

      const dropdownName = document.getElementById('dropdownClientName');
      if (dropdownName) dropdownName.textContent = loggedInClient.companyName || loggedInClient.clientName || 'Client';

      const dropdownEmail = document.getElementById('dropdownClientEmail');
      if (dropdownEmail) dropdownEmail.textContent = loggedInClient.email || '';

      const nameToInit = loggedInClient.companyName || loggedInClient.clientName || 'Client';
      const initials = nameToInit.substring(0, 2).toUpperCase();
      
      const portalAvatarBtn = document.getElementById('portalUserAvatarBtn');
      const dropdownAvatar = document.querySelector('.profile-dropdown-avatar');

      if (loggedInClient.logo) {
        if (portalAvatarBtn) portalAvatarBtn.innerHTML = `<img src="${loggedInClient.logo}" class="portal-header-avatar-img" alt="${escapeHtml(nameToInit)}" />`;
        if (dropdownAvatar) dropdownAvatar.innerHTML = `<img src="${loggedInClient.logo}" class="portal-header-avatar-img" alt="${escapeHtml(nameToInit)}" />`;
      } else {
        if (portalAvatarBtn) portalAvatarBtn.innerHTML = `<span class="portal-avatar-inner-text">${initials}</span>`;
        if (dropdownAvatar) dropdownAvatar.innerHTML = initials;
      }

      // Initialize portal engine and refresh current views
      initMotaGrowthClientSpace();
      if (typeof window._motaRefreshPortal === 'function') {
        window._motaRefreshPortal();
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function showAdminView() {
    document.body.classList.remove('is-client-route');
    document.body.classList.add('is-admin-route');
    if (landingView) landingView.style.display = 'none';
    if (clientSignInView) clientSignInView.style.display = 'none';
    if (clientPortalView) clientPortalView.style.display = 'none';

    // Master Authentication Check
    const isMasterAuth = sessionStorage.getItem('motagrowth_admin_auth') === 'true';
    const adminLockScreen = document.getElementById('adminLockScreen');
    if (!isMasterAuth) {
      if (adminLockScreen) adminLockScreen.style.display = 'flex';
      if (adminPortalView) adminPortalView.style.display = 'none';
    } else {
      if (adminLockScreen) adminLockScreen.style.display = 'none';
      if (adminPortalView) adminPortalView.style.display = 'block';
      renderAdminPortal();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  if (adminHomeLink) {
    adminHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '';
      showLandingView();
    });
  }

  const adminLogoHomeLink = document.getElementById('adminLogoHomeLink');
  if (adminLogoHomeLink) {
    adminLogoHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '';
      showLandingView();
    });
  }

  const portalHomeLink = document.getElementById('portalHomeLink');
  if (portalHomeLink) {
    portalHomeLink.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  if (clientSignInHomeLink) {
    clientSignInHomeLink.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  // Handle Client Sign In Form Submission
  if (clientSignInForm) {
    clientSignInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (clientSignInError) {
        clientSignInError.style.display = 'none';
        clientSignInError.textContent = '';
      }

      const enteredUsername = (clientSignInUsername?.value || '').trim().toLowerCase();
      const enteredPassword = (clientSignInPassword?.value || '').trim();

      // Retrieve latest client list (includes newly admin-created clients)
      const currentClients = loadClients();

      const foundClient = currentClients.find(c => {
        const u = (c.username || '').toLowerCase().trim();
        const em = (c.email || '').toLowerCase().trim();
        const comp = (c.companyName || '').toLowerCase().trim();
        const name = (c.clientName || '').toLowerCase().trim();
        const pass = (c.password || '').trim();

        const matchesUser = Boolean(
          enteredUsername && (
            u === enteredUsername ||
            em === enteredUsername ||
            comp === enteredUsername ||
            name === enteredUsername ||
            em.split('@')[0] === enteredUsername
          )
        );
        const matchesPass = (pass === enteredPassword);
        return matchesUser && matchesPass;
      });

      if (foundClient) {
        loggedInClient = foundClient;
        saveActiveSession(foundClient);
        clientSignInForm.reset();
        showClientSpaceView();
        window.location.hash = '#client-space';
      } else {
        if (clientSignInError) {
          clientSignInError.textContent = 'Nom d\'utilisateur, email ou mot de passe incorrect.';
          clientSignInError.style.display = 'block';
        }
      }
    });
  }

  // Quick Demo Client Login Handlers
  const demoBtn1 = document.getElementById('fillDemoClient1');
  const demoBtn2 = document.getElementById('fillDemoClient2');

  if (demoBtn1) {
    demoBtn1.addEventListener('click', () => {
      if (clientSignInUsername) clientSignInUsername.value = 'velour';
      if (clientSignInPassword) clientSignInPassword.value = 'growth2026';
      if (clientSignInForm) clientSignInForm.dispatchEvent(new Event('submit'));
    });
  }

  if (demoBtn2) {
    demoBtn2.addEventListener('click', () => {
      if (clientSignInUsername) clientSignInUsername.value = 'lumina';
      if (clientSignInPassword) clientSignInPassword.value = 'growth2026';
      if (clientSignInForm) clientSignInForm.dispatchEvent(new Event('submit'));
    });
  }

  // User Profile Dropdown & Sign Out Handler
  const portalAvatarBtn = document.getElementById('portalUserAvatarBtn');
  const portalProfileDropdown = document.getElementById('portalProfileDropdown');
  const portalSignOutBtn = document.getElementById('portalSignOutBtn');

  if (portalAvatarBtn && portalProfileDropdown) {
    portalAvatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = portalProfileDropdown.style.display === 'block';
      portalProfileDropdown.style.display = isVisible ? 'none' : 'block';
      portalAvatarBtn.classList.toggle('is-active', !isVisible);
      portalAvatarBtn.setAttribute('aria-expanded', !isVisible ? 'true' : 'false');
      if (window.lucide) window.lucide.createIcons();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!portalAvatarBtn.contains(e.target) && !portalProfileDropdown.contains(e.target)) {
        portalProfileDropdown.style.display = 'none';
        portalAvatarBtn.classList.remove('is-active');
        portalAvatarBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (portalSignOutBtn) {
    portalSignOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loggedInClient = null;
      saveActiveSession(null);
      if (portalProfileDropdown) portalProfileDropdown.style.display = 'none';
      if (portalAvatarBtn) portalAvatarBtn.classList.remove('is-active');
      showLandingView();
      window.location.hash = '';
      
      // Toast confirmation
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #0f172a;
        color: #f8fafc;
        padding: 0.85rem 1.3rem;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-size: 0.85rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        z-index: 999999;
        animation: fadeIn 0.3s ease;
      `;
      toast.innerHTML = `<i data-lucide="log-out" style="width: 16px; height: 16px; color: #38bdf8;"></i> <span>Signed out successfully</span>`;
      document.body.appendChild(toast);
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
      }, 3000);
    });
  }

  // =========================================================================
  // 2. GET IN TOUCH ACTION
  // =========================================================================

  if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openIntakeModal();
    });
  }

  // =========================================================================
  // 3. INTAKE BRIEF QUESTIONNAIRE
  // =========================================================================

  function openIntakeModal() {
    if (!intakeModal) return;
    intakeModal.classList.add('active');
    intakeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    resetIntakeForm();
    if (window.lucide) window.lucide.createIcons();
  }

  function closeIntakeModal() {
    if (!intakeModal) return;
    intakeModal.classList.remove('active');
    intakeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function resetIntakeForm() {
    currentWizardStep = 1;
    updateWizardUI();
    projectIntakeForm.style.display = 'block';
    intakeConfirmation.style.display = 'none';
    clearErrors();
  }

  function updateWizardUI() {
    for (let i = 1; i <= 4; i++) {
      const stepEl = document.getElementById(`wizardStep${i}`);
      const stepItem = document.querySelector(`.step-item[data-step="${i}"]`);
      if (stepEl) stepEl.classList.toggle('active', i === currentWizardStep);
      if (stepItem) {
        stepItem.classList.toggle('active', i === currentWizardStep);
        stepItem.classList.toggle('done', i < currentWizardStep);
      }
    }

    stepBackBtn.style.display = currentWizardStep > 1 ? 'inline-flex' : 'none';
    if (currentWizardStep === 4) {
      stepNextBtn.style.display = 'none';
      stepSubmitBtn.style.display = 'inline-flex';
    } else {
      stepNextBtn.style.display = 'inline-flex';
      stepSubmitBtn.style.display = 'none';
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function validateStep(step) {
    clearErrors();
    let valid = true;

    if (step === 1) {
      const name = document.getElementById('inputClientName').value.trim();
      const email = document.getElementById('inputClientEmail').value.trim();
      const phone = document.getElementById('inputClientPhone').value.trim();
      const company = document.getElementById('inputCompanyName').value.trim();

      if (!name) { setError('nameError', 'Please enter your name.'); valid = false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('emailError', 'Please enter a valid email.'); valid = false; }
      if (!phone) { setError('phoneError', 'Please enter your phone number.'); valid = false; }
      if (!company) { setError('companyError', 'Please enter your company name.'); valid = false; }
    } else if (step === 2) {
      const checked = projectIntakeForm.querySelectorAll('input[name="services"]:checked');
      if (checked.length === 0) {
        setError('servicesError', 'Please select at least one service.');
        valid = false;
      }
    } else if (step === 3) {
      const goal = document.getElementById('inputPrimaryGoal').value;
      if (!goal) { setError('goalError', 'Please select your primary objective.'); valid = false; }
    } else if (step === 4) {
      const budget = document.getElementById('inputBudget').value;
      if (!budget) { setError('budgetError', 'Please select an estimated budget.'); valid = false; }
    }

    return valid;
  }

  function setError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');
  }

  if (stepNextBtn) {
    stepNextBtn.addEventListener('click', () => {
      if (validateStep(currentWizardStep)) {
        currentWizardStep++;
        updateWizardUI();
      }
    });
  }

  if (stepBackBtn) {
    stepBackBtn.addEventListener('click', () => {
      if (currentWizardStep > 1) {
        currentWizardStep--;
        updateWizardUI();
      }
    });
  }

  if (closeIntakeBtn) closeIntakeBtn.addEventListener('click', closeIntakeModal);
  if (intakeBackdrop) intakeBackdrop.addEventListener('click', closeIntakeModal);
  if (confirmDoneBtn) confirmDoneBtn.addEventListener('click', closeIntakeModal);

  // Submit Brief
  if (projectIntakeForm) {
    projectIntakeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateStep(4)) return;

      const selectedServices = Array.from(
        projectIntakeForm.querySelectorAll('input[name="services"]:checked')
      ).map(cb => cb.value);

      const submission = {
        id: 'DEVIS-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        createdAt: new Date().toISOString(),
        dateDisplay: new Date().toLocaleDateString('fr-FR') + '<br>' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'PRO',
        clientName: document.getElementById('inputClientName').value.trim(),
        clientEmail: document.getElementById('inputClientEmail').value.trim() || '—',
        clientPhone: document.getElementById('inputClientPhone').value.trim() || '—',
        companyName: document.getElementById('inputCompanyName').value.trim() || '—',
        currentUrl: document.getElementById('inputCurrentUrl').value.trim() || '—',
        services: selectedServices,
        primaryGoal: document.getElementById('inputPrimaryGoal').value || '—',
        sector: 'DIGITAL',
        notes: document.getElementById('inputNotes').value.trim() || '—',
        status: 'New'
      };

      inquiries.unshift(submission);
      saveInquiries(inquiries);

      projectIntakeForm.style.display = 'none';
      confirmClientName.textContent = submission.clientName;
      confirmClientEmail.textContent = submission.clientEmail;
      intakeConfirmation.style.display = 'block';

      projectIntakeForm.reset();
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // =========================================================================
  // 4. CLIENT SPACE PORTAL (CLEAN 6-MODULE LUXURY ARCHITECTURE)
  // =========================================================================

  // DOM Elements - Client Modals & Actions
  const uploadFileModal = document.getElementById('uploadFileModal');
  const openUploadModalBtn = document.getElementById('openUploadModalBtn');
  const closeUploadFileModalBtn = document.getElementById('closeUploadFileModalBtn');
  const cancelUploadFileBtn = document.getElementById('cancelUploadFileBtn');
  const uploadFileForm = document.getElementById('uploadFileForm');

  const meetingRequestForm = document.getElementById('meetingRequestForm');
  const meetingConfirmationBox = document.getElementById('meetingConfirmationBox');
  const bookedTimeDisplay = document.getElementById('bookedTimeDisplay');
  const meetingDateInput = document.getElementById('meetingDateInput');

  if (clientLoginForm) {
    clientLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clientLoginError.textContent = '';

      const user = clientLoginUser.value.trim().toLowerCase();
      const pass = clientLoginPass.value.trim();

      const foundClient = clients.find(c => 
        (c.email.toLowerCase() === user || (c.username && c.username.toLowerCase() === user)) &&
        c.password === pass
      );

      if (foundClient) {
        loggedInClient = foundClient;
        renderClientDashboard(foundClient);
      } else {
        clientLoginError.textContent = 'Invalid client credentials. Please check with your MotaGrowth manager.';
      }
    });
  }

  if (fillDemoClient1) {
    fillDemoClient1.addEventListener('click', () => {
      clientLoginUser.value = 'elena@velourclothing.co';
      clientLoginPass.value = 'growth2026';
    });
  }

  if (clientLogoutBtn) {
    clientLogoutBtn.addEventListener('click', () => {
      loggedInClient = null;
      showClientSpaceView();
    });
  }

  function switchClientTab(tabName) {
    activeClientTab = tabName;
    document.querySelectorAll('.portal-tab-link').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    const views = {
      'home': document.getElementById('viewHome'),
      'files': document.getElementById('viewFiles'),
      'calendar': document.getElementById('viewCalendar'),
      'ideas': document.getElementById('viewIdeas'),
      'moodboard': document.getElementById('viewMoodboard'),
      'meeting': document.getElementById('viewMeeting')
    };

    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].style.display = (key === tabName) ? 'block' : 'none';
        if (key === tabName) views[key].classList.add('active');
        else views[key].classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) window.lucide.createIcons();
  }

  function renderClientDashboard(client) {
    clientLoginScreen.style.display = 'none';
    clientDashboardScreen.style.display = 'block';
    
    // Top Bar Client Profile
    if (clientLogoutBtn) clientLogoutBtn.style.display = 'inline-flex';
    if (portalClientProfile) {
      portalClientProfile.style.display = 'flex';
      const initials = (client.companyName || 'Client').substring(0, 2).toUpperCase();
      document.getElementById('clientAvatarInitials').textContent = initials;
      document.getElementById('clientHeaderName').textContent = client.clientName || client.companyName;
      document.getElementById('clientHeaderEmail').textContent = client.email || 'client@motagrowth.agency';
      document.getElementById('clientHeaderBadge').textContent = client.companyName || 'Client Workspace';
    }

    // Update Tab Badges
    const files = client.files || [];
    const schedule = client.contentSchedule || [];
    const ideas = client.ideas || [];
    const pendingIdeasCount = ideas.filter(i => i.status === 'Pending').length;

    const tabFilesBadge = document.getElementById('tabFilesBadge');
    if (tabFilesBadge) tabFilesBadge.textContent = files.length;

    const tabCalendarBadge = document.getElementById('tabCalendarBadge');
    if (tabCalendarBadge) tabCalendarBadge.textContent = schedule.length;

    const tabIdeasBadge = document.getElementById('tabIdeasBadge');
    if (tabIdeasBadge) tabIdeasBadge.textContent = pendingIdeasCount || ideas.length;

    // Render All 6 Modular Tabs
    renderHomeTab(client);
    renderFilesTab(client);
    renderCalendarTab(client);
    renderIdeasTab(client);
    renderMeetingTab(client);

    // Bind Tab Switching Clicks
    document.querySelectorAll('.portal-tab-link').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const tab = btn.getAttribute('data-tab');
        switchClientTab(tab);
      };
    });

    // Bind Jump Links from Homepage Cards
    document.querySelectorAll('[data-jump]').forEach(el => {
      el.onclick = (e) => {
        e.preventDefault();
        const targetTab = el.getAttribute('data-jump');
        switchClientTab(targetTab);
      };
    });

    // Make sure initial active tab is displayed
    switchClientTab(activeClientTab || 'home');

    if (window.lucide) window.lucide.createIcons();
  }

  // -------------------------------------------------------------------------
  // MODULE 1: HOMEPAGE (OVERVIEW & ROADMAP)
  // -------------------------------------------------------------------------
  function renderHomeTab(client) {
    const tierTag = document.getElementById('clientTagTier');
    if (tierTag) tierTag.textContent = client.servicesTier || 'Full-Service Growth Retainer';

    const brandName = document.getElementById('clientBrandName');
    if (brandName) brandName.textContent = client.companyName;

    const summaryText = document.getElementById('clientProjectSummary');
    if (summaryText) summaryText.textContent = client.summary || 'Your centralized portal for strategic ideas, deliverable approvals, roadmap milestones, and key creative assets.';

    const pendingIdeas = (client.ideas || []).filter(i => i.status === 'Pending').length;
    const homePendingCount = document.getElementById('homePendingCount');
    if (homePendingCount) homePendingCount.textContent = `${pendingIdeas} Pending Idea${pendingIdeas === 1 ? '' : 's'}`;

    const quickMeetingBtn = document.getElementById('homeQuickMeetingBtn');
    if (quickMeetingBtn) {
      quickMeetingBtn.onclick = () => switchClientTab('meeting');
    }

    // Milestones List
    const milestonesList = document.getElementById('homeMilestonesList');
    if (milestonesList) {
      const timeline = client.timeline || [];
      if (timeline.length === 0) {
        milestonesList.innerHTML = `<p style="color: #64748b; font-size: 0.85rem; grid-column: span 3;">No milestones scheduled yet.</p>`;
      } else {
        milestonesList.innerHTML = timeline.map(item => `
          <div class="home-milestone-card">
            <div class="home-milestone-top">
              <span class="timeline-date-pill">${escapeHtml(item.date)}</span>
              <span class="timeline-status-dot">● ${escapeHtml(item.status || 'Scheduled')}</span>
            </div>
            <strong style="font-size: 0.95rem; color: #0f172a; display: block; margin-top: 0.3rem;">${escapeHtml(item.title)}</strong>
            <p style="font-size: 0.82rem; color: #64748b; line-height: 1.45; margin: 0;">${escapeHtml(item.description)}</p>
          </div>
        `).join('');
      }
    }
  }

  // -------------------------------------------------------------------------
  // MODULE 2: FILE FOLDER (CATEGORIZED ASSET VAULT)
  // -------------------------------------------------------------------------
  function renderFilesTab(client) {
    const tableBody = document.getElementById('filesTableBody');
    if (!tableBody) return;

    const files = client.files || [];

    // Filter files according to active folder
    let filteredFiles = files;
    if (activeFolderCategory !== 'all') {
      const categoryMap = {
        'brand': '01_Brand_Identity',
        'design': '02_Web_Prototypes',
        'video': '03_Video_Assets_4K',
        'copy': '04_Ad_Creatives_Copy',
        'legal': '05_Contracts_Invoices'
      };
      const targetCat = categoryMap[activeFolderCategory];
      if (targetCat) {
        filteredFiles = files.filter(f => f.category === targetCat);
      }
    }

    if (filteredFiles.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2.5rem; color: #64748b;">
            <i data-lucide="folder" style="width: 32px; height: 32px; margin: 0 auto 0.5rem; display: block; color: #94a3b8;"></i>
            No files found in this folder. Click "Upload Client Asset" to add one.
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = filteredFiles.map(file => {
        const typeClass = (file.type || 'file').toLowerCase();
        let iconName = 'file-text';
        if (typeClass === 'figma') iconName = 'layout';
        else if (typeClass === 'video') iconName = 'film';
        else if (typeClass === 'zip') iconName = 'folder-archive';
        else if (typeClass === 'pdf') iconName = 'file-check';

        return `
          <tr>
            <td>
              <div class="file-name-cell">
                <div class="file-type-pill ${typeClass}">
                  <i data-lucide="${iconName}"></i>
                </div>
                <div class="file-meta-name">
                  <strong>${escapeHtml(file.name)}</strong>
                  <span>${escapeHtml(file.type ? file.type.toUpperCase() : 'DOCUMENT')}</span>
                </div>
              </div>
            </td>
            <td><span class="category-tag">${escapeHtml(file.category || '01_Brand_Identity')}</span></td>
            <td><span style="font-weight: 600; color: #475569;">${escapeHtml(file.size || '—')}</span></td>
            <td><span style="color: #64748b; font-size: 0.84rem;">${escapeHtml(file.date || 'Recent')}</span></td>
            <td style="text-align: right;">
              <a href="${escapeHtml(file.url || '#')}" target="_blank" rel="noopener" class="btn-file-action">
                <i data-lucide="external-link"></i>
                <span>Open / View</span>
              </a>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Bind Folder Card Filters
    document.querySelectorAll('.folder-card').forEach(card => {
      card.onclick = () => {
        document.querySelectorAll('.folder-card').forEach(c => c.classList.remove('active-folder'));
        card.classList.add('active-folder');
        activeFolderCategory = card.getAttribute('data-folder');
        renderFilesTab(client);
        if (window.lucide) window.lucide.createIcons();
      };
    });

    // Upload Modal Triggers
    if (openUploadModalBtn) {
      openUploadModalBtn.onclick = () => {
        if (uploadFileModal) uploadFileModal.style.display = 'flex';
      };
    }
    if (closeUploadFileModalBtn) {
      closeUploadFileModalBtn.onclick = () => {
        if (uploadFileModal) uploadFileModal.style.display = 'none';
      };
    }
    if (cancelUploadFileBtn) {
      cancelUploadFileBtn.onclick = () => {
        if (uploadFileModal) uploadFileModal.style.display = 'none';
      };
    }
    if (uploadFileForm) {
      uploadFileForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('uploadFileName').value.trim();
        const category = document.getElementById('uploadFileCategory').value;
        const size = document.getElementById('uploadFileSize').value.trim() || '12.4 MB';
        const link = document.getElementById('uploadFileLink').value.trim();

        if (!client.files) client.files = [];

        // Determine file type from extension or category
        let type = 'pdf';
        if (name.toLowerCase().endsWith('.fig') || category.includes('Prototypes')) type = 'figma';
        else if (name.toLowerCase().endsWith('.zip') || name.toLowerCase().endsWith('.rar')) type = 'zip';
        else if (name.toLowerCase().endsWith('.mp4') || name.toLowerCase().endsWith('.mov') || category.includes('Video')) type = 'video';
        else if (name.toLowerCase().endsWith('.doc') || name.toLowerCase().endsWith('.docx') || category.includes('Copy')) type = 'doc';

        client.files.unshift({
          id: 'FILE-' + Date.now().toString(36),
          name: name,
          category: category,
          size: size,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          url: link,
          type: type
        });

        saveClients(clients);
        if (uploadFileModal) uploadFileModal.style.display = 'none';
        uploadFileForm.reset();
        renderClientDashboard(client);
      };
    }
  }

  // -------------------------------------------------------------------------
  // MODULE 3: CONTENT CALENDAR (SCHEDULE & CHANNELS)
  // -------------------------------------------------------------------------
  function renderCalendarTab(client) {
    const grid = document.getElementById('calendarPostsGrid');
    if (!grid) return;

    const schedule = client.contentSchedule || [];

    let filtered = schedule;
    if (activeCalendarPlatform !== 'all') {
      filtered = schedule.filter(item => (item.platform || '').toLowerCase() === activeCalendarPlatform.toLowerCase());
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 16px;">
          <i data-lucide="calendar-x" style="width: 36px; height: 36px; margin: 0 auto 0.8rem; display: block; color: #94a3b8;"></i>
          <strong style="color: #0f172a; font-size: 1rem; display: block; margin-bottom: 0.3rem;">No content scheduled for this channel</strong>
          <p style="color: #64748b; font-size: 0.85rem;">Check back soon or select "All Channels" to view full monthly pipeline.</p>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(item => {
        const plat = (item.platform || 'General').toLowerCase();
        let platLabel = 'GENERAL';
        let platClass = 'meta';

        if (plat === 'tiktok') {
          platLabel = 'TIKTOK REELS';
          platClass = 'tiktok';
        } else if (plat === 'instagram') {
          platLabel = 'INSTAGRAM';
          platClass = 'instagram';
        } else if (plat === 'meta') {
          platLabel = 'META ADS';
          platClass = 'meta';
        }

        let statusClass = 'pending';
        if (item.status === 'Ready to Publish' || item.status === 'Published') statusClass = 'approved';
        else if (item.status === 'In Creative Review') statusClass = 'needs-detail';

        return `
          <div class="calendar-post-card">
            <div class="calendar-post-top">
              <span class="platform-chip ${platClass}">${platLabel}</span>
              <span class="post-date-badge">${escapeHtml(item.dateDisplay || 'Scheduled')}</span>
            </div>

            <h4 class="post-title">${escapeHtml(item.title)}</h4>
            <p class="post-caption-preview">${escapeHtml(item.caption)}</p>

            <div class="post-footer-row">
              <span class="decision-status-pill ${statusClass}">
                <i data-lucide="clock"></i>
                <span>${escapeHtml(item.status || 'Scheduled')}</span>
              </span>

              <a href="${escapeHtml(item.previewUrl || '#')}" target="_blank" rel="noopener" class="post-preview-link">
                <span>View Asset Preview</span>
                <i data-lucide="external-link"></i>
              </a>
            </div>
          </div>
        `;
      }).join('');
    }

    // Platform Filter Pills Click Handlers
    document.querySelectorAll('.calendar-platform-filters .filter-tab-pill').forEach(pill => {
      pill.onclick = () => {
        document.querySelectorAll('.calendar-platform-filters .filter-tab-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCalendarPlatform = pill.getAttribute('data-platform');
        renderCalendarTab(client);
        if (window.lucide) window.lucide.createIcons();
      };
    });
  }

  // -------------------------------------------------------------------------
  // MODULE 4: IDEAS BANK (PRIORITY-RANKED APPROVALS)
  // -------------------------------------------------------------------------
  function renderIdeasTab(client) {
    const list = document.getElementById('clientIdeasList');
    if (!list) return;

    let items = (client.ideas || []).slice();

    // Priority rank sorting helper: High = 1, Medium = 2, Low = 3
    const priorityWeight = { 'High': 1, 'Medium': 2, 'Low': 3 };
    items.sort((a, b) => {
      const weightA = priorityWeight[a.priority] || 2;
      const weightB = priorityWeight[b.priority] || 2;
      if (weightA !== weightB) return weightA - weightB;
      return (a.rank || 99) - (b.rank || 99);
    });

    const allCountBadge = document.getElementById('allIdeasCount');
    if (allCountBadge) allCountBadge.textContent = (client.ideas || []).length;

    const pendingCountBadge = document.getElementById('filterPendingCount');
    const pendingItemsCount = (client.ideas || []).filter(i => i.status === 'Pending').length;
    if (pendingCountBadge) pendingCountBadge.textContent = pendingItemsCount;

    // Apply Filter
    if (activeIdeasFilter === 'pending') {
      items = items.filter(i => i.status === 'Pending');
    } else if (activeIdeasFilter === 'approved') {
      items = items.filter(i => i.status === 'Approved');
    } else if (activeIdeasFilter === 'detail') {
      items = items.filter(i => i.status === 'Needs Detail');
    } else if (activeIdeasFilter === 'denied') {
      items = items.filter(i => i.status === 'Denied');
    }

    if (items.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; background: #ffffff; border: 1.5px dashed #e2e8f0; border-radius: 16px;">
          <i data-lucide="inbox" style="width: 36px; height: 36px; color: #94a3b8; margin: 0 auto 0.8rem; display: block;"></i>
          <strong style="color: #0f172a; font-size: 1rem; display: block; margin-bottom: 0.3rem;">No proposals in this view</strong>
          <p style="color: #64748b; font-size: 0.85rem;">No items currently match the "${escapeHtml(activeIdeasFilter)}" filter.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    list.innerHTML = items.map((item, idx) => {
      const priorityClass = (item.priority || 'Medium').toLowerCase();
      const priorityLabel = item.priority === 'High' ? 'HIGH PRIORITY' : (item.priority === 'Medium' ? 'MEDIUM PRIORITY' : 'LOW PRIORITY');
      
      let statusPillHtml = '';
      if (item.status === 'Approved') {
        statusPillHtml = `<span class="decision-status-pill approved"><i data-lucide="check-circle-2"></i> Approved</span>`;
      } else if (item.status === 'Denied') {
        statusPillHtml = `<span class="decision-status-pill denied"><i data-lucide="x-circle"></i> Denied</span>`;
      } else if (item.status === 'Needs Detail') {
        statusPillHtml = `<span class="decision-status-pill needs-detail"><i data-lucide="help-circle"></i> Needs Detail</span>`;
      } else {
        statusPillHtml = `<span class="decision-status-pill pending"><i data-lucide="clock"></i> Pending Review</span>`;
      }

      // Action Buttons
      let actionButtonsHtml = '';
      if (item.status === 'Pending') {
        actionButtonsHtml = `
          <div class="idea-action-buttons-group">
            <button class="btn-idea-action accept" data-id="${item.id}" title="Approve this proposal">
              <i data-lucide="check"></i>
              <span>Accept Idea</span>
            </button>
            <button class="btn-idea-action deny" data-id="${item.id}" title="Decline this proposal">
              <i data-lucide="x"></i>
              <span>Deny</span>
            </button>
            <button class="btn-idea-action detail" data-id="${item.id}" title="Ask questions or request modifications">
              <i data-lucide="message-square"></i>
              <span>Need More Detail</span>
            </button>
          </div>
        `;
      } else {
        actionButtonsHtml = `
          <div class="idea-action-buttons-group">
            <button class="btn-idea-action detail" data-id="${item.id}" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
              <i data-lucide="message-square"></i>
              <span>Update Feedback</span>
            </button>
          </div>
        `;
      }

      return `
        <div class="idea-ranked-card priority-${priorityClass}">
          <!-- Top Row: Priority Badge, Category, Date & Status -->
          <div class="idea-card-header-row">
            <div class="idea-badges-group">
              <span class="priority-tag ${priorityClass}">${priorityLabel} #${idx + 1}</span>
              <span class="category-tag">${escapeHtml(item.category || 'Growth Strategy')}</span>
              <span class="idea-date-label">${escapeHtml(item.date || 'Active')}</span>
            </div>
            ${statusPillHtml}
          </div>

          <!-- Main Content -->
          <div class="idea-card-title">${escapeHtml(item.title)}</div>
          <p class="idea-card-desc">${escapeHtml(item.description)}</p>

          <!-- Impact Scope -->
          ${item.impact ? `
            <div class="idea-impact-box">
              <i data-lucide="sparkles"></i>
              <span><strong>Strategic Impact:</strong> ${escapeHtml(item.impact)}</span>
            </div>
          ` : ''}

          <!-- Asset Link (if any) -->
          ${item.assetLink ? `
            <a href="${escapeHtml(item.assetLink.url)}" target="_blank" rel="noopener" class="idea-asset-preview-link">
              <i data-lucide="external-link"></i>
              <span>${escapeHtml(item.assetLink.label || 'View Deliverable Prototype')}</span>
            </a>
          ` : ''}

          <!-- Feedback Thread (if Needs Detail) -->
          ${item.clientFeedback ? `
            <div class="idea-feedback-thread">
              <div class="feedback-thread-title">
                <i data-lucide="message-circle-question"></i>
                <span>Client Clarification (${escapeHtml(item.clientFeedback.topic || 'Inquiry')}):</span>
              </div>
              <div>"${escapeHtml(item.clientFeedback.note)}"</div>
              <span style="font-size: 0.72rem; color: #b45309; margin-top: 0.2rem;">Submitted on ${escapeHtml(item.clientFeedback.date || 'Recent')}</span>
            </div>
          ` : ''}

          <!-- Action Buttons Bar -->
          <div class="idea-actions-row">
            <span style="font-size: 0.78rem; font-weight: 700; color: #475569;">Client Decision:</span>
            ${actionButtonsHtml}
          </div>
        </div>
      `;
    }).join('');

    // Attach Action Listeners for Accept, Deny, and Need Detail
    list.querySelectorAll('.btn-idea-action.accept').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const target = (client.ideas || []).find(i => i.id === id);
        if (target) {
          target.status = 'Approved';
          saveClients(clients);
          renderClientDashboard(client);
        }
      };
    });

    list.querySelectorAll('.btn-idea-action.deny').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const target = (client.ideas || []).find(i => i.id === id);
        if (target) {
          target.status = 'Denied';
          saveClients(clients);
          renderClientDashboard(client);
        }
      };
    });

    list.querySelectorAll('.btn-idea-action.detail').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        openIdeaDetailModal(client, id);
      };
    });

    // Ideas Filter Tabs
    document.querySelectorAll('.ideas-filter-tabs .filter-tab-pill').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.ideas-filter-tabs .filter-tab-pill').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeIdeasFilter = tab.getAttribute('data-filter');
        renderIdeasTab(client);
        if (window.lucide) window.lucide.createIcons();
      };
    });

    // Propose Idea Trigger
    if (openProposeIdeaModalBtn) {
      openProposeIdeaModalBtn.onclick = () => {
        if (proposeIdeaModal) {
          proposeIdeaModal.style.display = 'flex';
          proposeIdeaForm.reset();
        }
      };
    }
  }

  // Modal: Need More Detail
  function openIdeaDetailModal(client, ideaId) {
    activeDetailIdeaId = ideaId;
    const target = (client.ideas || []).find(i => i.id === ideaId);
    if (!target) return;

    if (detailModalIdeaTitle) detailModalIdeaTitle.textContent = `Proposal: ${target.title}`;
    if (detailClientNote) {
      detailClientNote.value = target.clientFeedback ? target.clientFeedback.note : '';
    }
    if (ideaDetailModal) {
      ideaDetailModal.style.display = 'flex';
      if (window.lucide) window.lucide.createIcons();
    }
  }

  if (closeIdeaDetailModalBtn) {
    closeIdeaDetailModalBtn.onclick = () => {
      if (ideaDetailModal) ideaDetailModal.style.display = 'none';
      activeDetailIdeaId = null;
    };
  }

  if (cancelIdeaDetailBtn) {
    cancelIdeaDetailBtn.onclick = () => {
      if (ideaDetailModal) ideaDetailModal.style.display = 'none';
      activeDetailIdeaId = null;
    };
  }

  if (ideaDetailForm) {
    ideaDetailForm.onsubmit = (e) => {
      e.preventDefault();
      if (!loggedInClient || !activeDetailIdeaId) return;

      const target = (loggedInClient.ideas || []).find(i => i.id === activeDetailIdeaId);
      if (target) {
        target.status = 'Needs Detail';
        target.clientFeedback = {
          topic: detailTopicSelect.value,
          note: detailClientNote.value.trim(),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        saveClients(clients);
        if (ideaDetailModal) ideaDetailModal.style.display = 'none';
        renderClientDashboard(loggedInClient);
      }
    };
  }

  // Modal: Propose Idea
  if (closeProposeIdeaModalBtn) {
    closeProposeIdeaModalBtn.onclick = () => {
      if (proposeIdeaModal) proposeIdeaModal.style.display = 'none';
    };
  }

  if (cancelProposeIdeaBtn) {
    cancelProposeIdeaBtn.onclick = () => {
      if (proposeIdeaModal) proposeIdeaModal.style.display = 'none';
    };
  }

  if (proposeIdeaForm) {
    proposeIdeaForm.onsubmit = (e) => {
      e.preventDefault();
      if (!loggedInClient) return;

      const title = document.getElementById('proposeIdeaTitle').value.trim();
      const category = document.getElementById('proposeIdeaCategory').value;
      const priority = document.getElementById('proposeIdeaPriority').value;
      const desc = document.getElementById('proposeIdeaDesc').value.trim();

      if (!loggedInClient.ideas) loggedInClient.ideas = [];

      loggedInClient.ideas.unshift({
        id: 'IDEA-' + Date.now().toString(36),
        rank: loggedInClient.ideas.length + 1,
        priority: priority,
        category: category,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        title: title,
        description: desc,
        impact: 'Client-Proposed Strategic Concept',
        assetLink: null,
        status: 'Pending',
        clientFeedback: null
      });

      saveClients(clients);
      if (proposeIdeaModal) proposeIdeaModal.style.display = 'none';
      proposeIdeaForm.reset();
      renderClientDashboard(loggedInClient);
    };
  }

  // -------------------------------------------------------------------------
  // MODULE 6: REQUEST MEETING (DIRECT CALENDAR BOOKING)
  // -------------------------------------------------------------------------
  function renderMeetingTab(client) {
    // Set default meeting date to tomorrow if empty
    if (meetingDateInput && !meetingDateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      meetingDateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    if (meetingRequestForm) {
      meetingRequestForm.onsubmit = (e) => {
        e.preventDefault();

        const typeInput = document.querySelector('input[name="meetingType"]:checked');
        const sessionType = typeInput ? typeInput.value : '30-min Weekly Growth Review';
        const dateVal = meetingDateInput ? meetingDateInput.value : 'Upcoming';
        const timeVal = document.getElementById('meetingTimeInput').value;
        const agendaVal = document.getElementById('meetingAgendaInput').value.trim();

        if (bookedTimeDisplay) {
          bookedTimeDisplay.textContent = `${dateVal} at ${timeVal} (${sessionType})`;
        }

        if (meetingConfirmationBox) {
          meetingConfirmationBox.style.display = 'block';
          meetingConfirmationBox.scrollIntoView({ behavior: 'smooth' });
        }

        meetingRequestForm.style.display = 'none';

        if (window.lucide) window.lucide.createIcons();
      };
    }
  }

  // =========================================================================
  // 5. PRIVATE ADMIN CRM & CLIENT WORKSPACE MANAGEMENT
  // =========================================================================

  function getAllAdminMeetings() {
    const allMeetings = [];
    clients.forEach(client => {
      const timelineMeets = (Array.isArray(client.timeline) ? client.timeline : []).filter(e => e.type === 'Meeting');
      timelineMeets.forEach(m => {
        allMeetings.push({
          ...m,
          clientId: client.id,
          clientName: client.clientName || client.companyName || 'Client',
          companyName: client.companyName || client.clientName || 'Workspace',
          clientEmail: client.email || '—',
          clientPhone: client.phone || '—',
          clientLogo: client.logo || ''
        });
      });
    });
    return allMeetings;
  }

  // =========================================================================
  // 5. PRIVATE AGENCY ADMIN CRM ENGINE (MASTER AUTH, PIPELINE & DOSSIER)
  // =========================================================================

  let activeDateRange = 'All Time';

  function getFilteredInquiriesByDate() {
    if (activeDateRange === 'All Time') return inquiries;
    const now = Date.now();
    if (activeDateRange === 'Last 30 Days') {
      const cut = now - 30 * 86400000;
      return inquiries.filter(i => new Date(i.createdAt || now).getTime() >= cut);
    }
    if (activeDateRange === 'Last 90 Days') {
      const cut = now - 90 * 86400000;
      return inquiries.filter(i => new Date(i.createdAt || now).getTime() >= cut);
    }
    if (activeDateRange === 'Year to Date (2026)') {
      const start2026 = new Date('2026-01-01T00:00:00Z').getTime();
      return inquiries.filter(i => new Date(i.createdAt || now).getTime() >= start2026);
    }
    return inquiries;
  }

  // Pipeline Stage Normalizer (Option A)
  function normalizeLeadStage(rawStatus) {
    if (!rawStatus) return 'New Lead';
    const s = String(rawStatus).toLowerCase().trim();
    if (s === 'new lead' || s === 'nouveau' || s === 'new' || s === 'lead') return 'New Lead';
    if (s === 'contacted' || s === 'contacté' || s === 'in contact') return 'Contacted';
    if (s === 'proposal sent' || s === 'devis envoyé' || s === 'proposal') return 'Proposal Sent';
    if (s.includes('negotiat') || s.includes('meeting') || s.includes('rdv')) return 'Negotiation / Meeting';
    if (s.includes('won') || s.includes('active') || s.includes('gagné')) return 'Won / Active Client';
    if (s.includes('archiv') || s.includes('lost') || s.includes('perdu')) return 'Archived / Lost';
    return 'New Lead';
  }

  function getLeadStageClass(stage) {
    switch (stage) {
      case 'New Lead': return 'status-new-lead';
      case 'Contacted': return 'status-contacted';
      case 'Proposal Sent': return 'status-proposal-sent';
      case 'Negotiation / Meeting': return 'status-negotiation';
      case 'Won / Active Client': return 'status-won';
      case 'Archived / Lost': return 'status-archived';
      default: return 'status-new-lead';
    }
  }

  function parseLeadBudgetMAD(budgetStr) {
    if (!budgetStr) return 20000;
    const str = String(budgetStr).toLowerCase();
    if (str.includes('50,000+')) return 55000;
    if (str.includes('25,000–49,999') || str.includes('25,000-49,999')) return 35000;
    if (str.includes('15,000–24,999') || str.includes('15,000-24,999')) return 20000;
    if (str.includes('10,000–19,999') || str.includes('10,000-19,999')) return 15000;
    if (str.includes('7,000–11,999') || str.includes('7,000-11,999')) return 9500;
    const nums = String(budgetStr).match(/\d+([.,]\d+)?/g);
    if (nums && nums.length > 0) {
      const parsed = parseInt(nums[0].replace(/[.,]/g, ''), 10);
      if (!isNaN(parsed) && parsed > 500) return parsed;
    }
    return 20000;
  }

  function formatCurrencyMAD(amount) {
    return (Number(amount) || 0).toLocaleString('en-US') + ' MAD';
  }

  function cleanPhoneForWhatsApp(rawPhone) {
    if (!rawPhone) return '';
    let digits = String(rawPhone).replace(/[^\d]/g, '');
    if (digits.startsWith('0') && digits.length === 10) {
      digits = '212' + digits.substring(1);
    }
    return digits;
  }

  let activeVelocityRange = '30d';

  function renderPipelineTrendChart() {
    const waveStroke = document.getElementById('dynamicWaveStroke');
    const waveArea = document.getElementById('dynamicWaveArea');
    const waveNodes = document.getElementById('dynamicWaveNodes');
    const waveTooltip = document.getElementById('waveChartTooltip');
    const waveCrosshair = document.getElementById('waveHoverCrosshair');
    const waveXLabels = document.getElementById('waveXAxisLabels');
    const velocityRateText = document.getElementById('velocityRateText');
    const velocitySubText = document.getElementById('velocitySubText');

    if (!waveStroke || !waveArea) return;

    const currentInquiries = getFilteredInquiriesByDate();
    const now = Date.now();
    let numBuckets = 6;
    let rangeDurationMs = 30 * 86400000;

    if (activeVelocityRange === '7d') {
      numBuckets = 7;
      rangeDurationMs = 7 * 86400000;
    } else if (activeVelocityRange === '30d') {
      numBuckets = 6;
      rangeDurationMs = 30 * 86400000;
    } else if (activeVelocityRange === '90d') {
      numBuckets = 6;
      rangeDurationMs = 90 * 86400000;
    } else if (activeVelocityRange === 'all') {
      numBuckets = 7;
      let oldest = now - 180 * 86400000;
      if (currentInquiries.length > 0) {
        const times = currentInquiries.map(i => new Date(i.createdAt || Date.now()).getTime()).filter(t => !isNaN(t));
        if (times.length > 0) oldest = Math.min(...times);
      }
      rangeDurationMs = Math.max(30 * 86400000, now - oldest);
    }

    const startMs = now - rangeDurationMs;
    const bucketDurationMs = rangeDurationMs / numBuckets;

    // Create intervals
    const buckets = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let b = 0; b < numBuckets; b++) {
      const bStart = startMs + b * bucketDurationMs;
      const bEnd = (b === numBuckets - 1) ? now + 86400000 : bStart + bucketDurationMs;
      const midDate = new Date(bStart + bucketDurationMs / 2);

      let label = '';
      if (activeVelocityRange === '7d') {
        label = dayNames[midDate.getDay()];
      } else if (activeVelocityRange === '30d') {
        label = `${monthNames[midDate.getMonth()]} ${midDate.getDate()}`;
      } else {
        label = `${monthNames[midDate.getMonth()]} '${String(midDate.getFullYear()).slice(-2)}`;
      }

      // Filter inquiries falling into this interval
      const bucketLeads = currentInquiries.filter(i => {
        const t = new Date(i.createdAt || now).getTime();
        return !isNaN(t) && t >= bStart && t < bEnd;
      });

      const count = bucketLeads.length;
      const madValue = bucketLeads.reduce((sum, l) => sum + parseLeadBudgetMAD(l.budget), 0);

      buckets.push({
        bStart,
        bEnd,
        label,
        count,
        madValue,
        leads: bucketLeads
      });
    }

    // Inbound velocity calculation (leads per week)
    const rangeWeeks = Math.max(1, rangeDurationMs / (7 * 86400000));
    const totalLeadsInRange = buckets.reduce((acc, b) => acc + b.count, 0);
    const totalMadInRange = buckets.reduce((acc, b) => acc + b.madValue, 0);
    const weeklyVelocity = (totalLeadsInRange / rangeWeeks).toFixed(1);

    if (velocityRateText) {
      velocityRateText.textContent = totalLeadsInRange > 0 
        ? `+${weeklyVelocity} briefs/wk` 
        : `0.0 briefs/wk`;
    }

    if (velocitySubText) {
      velocitySubText.textContent = totalLeadsInRange > 0
        ? `${totalLeadsInRange} briefs • ${formatCurrencyMAD(totalMadInRange)} pipeline in selected window`
        : `Inbound brief progression & flow rate (Waiting for leads)`;
    }

    // Compute SVG coordinates
    const svgWidth = 540;
    const svgHeight = 140;
    const paddingX = 30;
    const topY = 22;
    const baselineY = 118;

    const maxCount = Math.max(...buckets.map(b => b.count));
    const points = buckets.map((bucket, idx) => {
      const x = paddingX + (idx / (numBuckets - 1)) * (svgWidth - 2 * paddingX);
      let y = baselineY;
      if (maxCount > 0) {
        y = baselineY - (bucket.count / maxCount) * (baselineY - topY);
      }
      return {
        x,
        y,
        ...bucket
      };
    });

    // Generate smooth cubic bezier spline curve
    let pathD = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      pathD += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }

    const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)},140 L ${points[0].x.toFixed(1)},140 Z`;

    waveStroke.setAttribute('d', pathD);
    waveArea.setAttribute('d', areaD);

    // If empty, style with a gentle subtle dashed baseline
    if (maxCount === 0) {
      waveStroke.setAttribute('stroke-dasharray', '5,5');
      waveStroke.setAttribute('opacity', '0.45');
    } else {
      waveStroke.removeAttribute('stroke-dasharray');
      waveStroke.setAttribute('opacity', '1');
    }

    // Render interactive data nodes & hit targets
    if (waveNodes) {
      waveNodes.innerHTML = points.map((p, i) => {
        const hasLeads = p.count > 0;
        return `
          <g class="wave-point-group" data-idx="${i}">
            <circle class="wave-data-node" id="waveNode_${i}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${hasLeads ? 4.5 : 3}" fill="${hasLeads ? '#fbbf24' : '#475569'}" stroke="#0d0f14" stroke-width="2"></circle>
            <circle class="wave-hit-target" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="22" fill="transparent" data-idx="${i}"></circle>
          </g>
        `;
      }).join('');

      // Wire interactive hover on hit targets
      waveNodes.querySelectorAll('.wave-hit-target').forEach(target => {
        target.addEventListener('mouseenter', () => {
          const idx = parseInt(target.getAttribute('data-idx'), 10);
          const p = points[idx];
          if (!p) return;

          // Highlight node
          const node = document.getElementById(`waveNode_${idx}`);
          if (node) node.classList.add('active-hover-node');

          // Snap vertical crosshair
          if (waveCrosshair) {
            waveCrosshair.setAttribute('x1', p.x.toFixed(1));
            waveCrosshair.setAttribute('x2', p.x.toFixed(1));
            waveCrosshair.style.opacity = '1';
          }

          // Position & show floating tooltip
          if (waveTooltip) {
            const leftPercent = (p.x / svgWidth) * 100;
            const topPercent = (p.y / svgHeight) * 100;
            waveTooltip.style.left = `${leftPercent}%`;
            waveTooltip.style.top = `${topPercent}%`;

            waveTooltip.innerHTML = `
              <div class="tip-date">${escapeHtml(p.label)}</div>
              <div class="tip-val"><strong>${p.count}</strong> Inbound Brief${p.count === 1 ? '' : 's'}</div>
              <div class="tip-mad">${formatCurrencyMAD(p.madValue)} est. value</div>
            `;
            waveTooltip.style.display = 'block';
          }
        });

        target.addEventListener('mouseleave', () => {
          const idx = parseInt(target.getAttribute('data-idx'), 10);
          const node = document.getElementById(`waveNode_${idx}`);
          if (node) node.classList.remove('active-hover-node');

          if (waveCrosshair) waveCrosshair.style.opacity = '0';
          if (waveTooltip) waveTooltip.style.display = 'none';
        });
      });
    }

    // Render X-axis date labels
    if (waveXLabels) {
      waveXLabels.innerHTML = points.map(p => `
        <span class="wave-xaxis-label-item">${escapeHtml(p.label)}</span>
      `).join('');
    }

    // Range buttons active state
    const rangePills = document.querySelectorAll('#velocityRangePills .chart-time-pill');
    rangePills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-range') === activeVelocityRange);
    });
  }

  function renderAdminPortal() {
    updateAdminKPIs();
    renderPipelineTrendChart();
    renderInquiriesTable();
    renderClientsGrid();
    renderAnalyticsSection();
    if (window.lucide) window.lucide.createIcons();
  }

  function updateAdminKPIs() {
    const currentInquiries = getFilteredInquiriesByDate();
    const totalInquiries = currentInquiries.length;
    const totalClients = clients.length;

    // Calculate Estimated Pipeline Value in MAD (sum of open leads not won or archived)
    const openLeads = currentInquiries.filter(i => {
      const st = normalizeLeadStage(i.status);
      return st !== 'Archived / Lost' && st !== 'Won / Active Client';
    });
    const totalPipelineMAD = openLeads.reduce((sum, i) => sum + parseLeadBudgetMAD(i.budget), 0);

    // Active Negotiations / Meetings
    const activeNegotiations = currentInquiries.filter(i => {
      const st = normalizeLeadStage(i.status);
      return st === 'Negotiation / Meeting' || st === 'Proposal Sent';
    }).length;

    // Won Retainer MRR
    const wonMRR = clients.reduce((sum, c) => sum + (Number(c.retainerMRR) || 25000), 0);

    // Conversion Win Rate
    const wonLeads = currentInquiries.filter(i => normalizeLeadStage(i.status) === 'Won / Active Client').length;
    const closedLeads = currentInquiries.filter(i => {
      const st = normalizeLeadStage(i.status);
      return st === 'Won / Active Client' || st === 'Archived / Lost';
    }).length;
    const winRate = closedLeads > 0 
      ? Math.round((wonLeads / closedLeads) * 100) 
      : (totalInquiries > 0 ? Math.round((wonLeads / totalInquiries) * 100) : 0);

    // Update KPI Elements
    const elPipe = document.getElementById('kpiPipelineValue');
    if (elPipe) elPipe.textContent = formatCurrencyMAD(totalPipelineMAD);

    const elTotalInq = document.getElementById('kpiTotalInquiries');
    if (elTotalInq) elTotalInq.textContent = totalInquiries;

    const elWorkspaces = document.getElementById('kpiWorkspacesCount');
    if (elWorkspaces) elWorkspaces.textContent = totalClients;

    const elNeg = document.getElementById('kpiActiveNegotiations');
    if (elNeg) elNeg.textContent = activeNegotiations;

    const elWonMRR = document.getElementById('kpiWonMRR');
    if (elWonMRR) elWonMRR.textContent = formatCurrencyMAD(wonMRR);

    const elWonCount = document.getElementById('kpiWonCount');
    if (elWonCount) elWonCount.textContent = `${totalClients} Active Client Accounts`;

    const elWinRate = document.getElementById('kpiWinRate');
    if (elWinRate) elWinRate.textContent = `${winRate}%`;

    // Nav Badges
    const badgeLeads = document.getElementById('tabLeadCountBadge');
    if (badgeLeads) badgeLeads.textContent = totalInquiries;

    const badgeClients = document.getElementById('tabClientCountBadge');
    if (badgeClients) badgeClients.textContent = totalClients;

    const inqTitle = document.getElementById('inquiriesCardTitle');
    if (inqTitle) inqTitle.textContent = `Lead Pipeline & Inquiries (${totalInquiries})`;

    // Donut Chart Calculations (Circumference = 2 * PI * 38 = ~238.76)
    const countWeb = currentInquiries.filter(i => (i.services || []).some(s => s.toLowerCase().includes('web'))).length;
    const countSocial = currentInquiries.filter(i => (i.services || []).some(s => s.toLowerCase().includes('social'))).length;
    const countAds = currentInquiries.filter(i => (i.services || []).some(s => s.toLowerCase().includes('paid') || s.toLowerCase().includes('performance'))).length;
    const countFull = currentInquiries.filter(i => (i.services || []).some(s => s.toLowerCase().includes('full'))).length;

    const elCountWeb = document.getElementById('countWeb');
    if (elCountWeb) elCountWeb.textContent = countWeb;
    const elCountSocial = document.getElementById('countSocial');
    if (elCountSocial) elCountSocial.textContent = countSocial;
    const elCountAds = document.getElementById('countAds');
    if (elCountAds) elCountAds.textContent = countAds;
    const elCountFull = document.getElementById('countFull');
    if (elCountFull) elCountFull.textContent = countFull;

    const elDonutTotal = document.getElementById('donutTotalCount');
    if (elDonutTotal) elDonutTotal.textContent = totalInquiries;

    const circ = 238.76;
    const sumServices = (countWeb + countSocial + countAds + countFull) || 1;
    const pWeb = (countWeb / sumServices) * circ;
    const pSocial = (countSocial / sumServices) * circ;
    const pAds = (countAds / sumServices) * circ;
    const pFull = (countFull / sumServices) * circ;

    const segWeb = document.getElementById('donutSegWeb');
    const segSocial = document.getElementById('donutSegSocial');
    const segAds = document.getElementById('donutSegAds');
    const segFull = document.getElementById('donutSegFull');

    if (segWeb) {
      segWeb.setAttribute('stroke-dasharray', `${pWeb} ${circ}`);
      segWeb.setAttribute('stroke-dashoffset', '0');
    }
    if (segSocial) {
      segSocial.setAttribute('stroke-dasharray', `${pSocial} ${circ}`);
      segSocial.setAttribute('stroke-dashoffset', `-${pWeb}`);
    }
    if (segAds) {
      segAds.setAttribute('stroke-dasharray', `${pAds} ${circ}`);
      segAds.setAttribute('stroke-dashoffset', `-${pWeb + pSocial}`);
    }
    if (segFull) {
      segFull.setAttribute('stroke-dasharray', `${pFull} ${circ}`);
      segFull.setAttribute('stroke-dashoffset', `-${pWeb + pSocial + pAds}`);
    }
  }

  function formatDateTime(isoString) {
    if (!isoString) return '—';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const m = monthNames[d.getMonth()];
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `<div class="date-stamp">${day} ${m} ${year}<br><span style="color: #64748b; font-weight: 500;">${hours}:${minutes}</span></div>`;
    } catch (e) {
      return isoString;
    }
  }

  // Render Inbound Inquiries Table
  function renderInquiriesTable() {
    const currentInquiries = getFilteredInquiriesByDate();
    const search = (inquirySearchInput ? inquirySearchInput.value : '').toLowerCase().trim();
    const statusFilter = (document.getElementById('inquiryStatusFilter')?.value || 'ALL');
    const serviceFilter = (document.getElementById('inquiryServiceFilter')?.value || 'ALL');

    const filtered = currentInquiries.filter(i => {
      const stage = normalizeLeadStage(i.status);
      if (statusFilter !== 'ALL' && stage !== statusFilter) return false;

      if (serviceFilter !== 'ALL') {
        const joinedServices = (i.services || []).join(' ').toLowerCase();
        if (!joinedServices.includes(serviceFilter.toLowerCase())) return false;
      }

      if (!search) return true;
      const name = (i.clientName || '').toLowerCase();
      const company = (i.companyName || '').toLowerCase();
      const email = (i.clientEmail || '').toLowerCase();
      const phone = (i.clientPhone || '').toLowerCase();
      const notes = (i.notes || '').toLowerCase();
      const sector = (i.sector || i.location || '').toLowerCase();
      const services = (i.services || []).join(' ').toLowerCase();
      const budget = (i.budget || '').toLowerCase();

      return name.includes(search) || company.includes(search) || email.includes(search) ||
             phone.includes(search) || notes.includes(search) || sector.includes(search) || 
             services.includes(search) || budget.includes(search);
    });

    if (filtered.length === 0) {
      if (inquiriesTableBody) inquiriesTableBody.innerHTML = '';
      if (inquiriesEmptyState) inquiriesEmptyState.style.display = 'block';
      return;
    }

    if (inquiriesEmptyState) inquiriesEmptyState.style.display = 'none';

    if (!inquiriesTableBody) return;

    inquiriesTableBody.innerHTML = filtered.map(item => {
      const stage = normalizeLeadStage(item.status);
      const stageClass = getLeadStageClass(stage);
      const initials = ((item.clientName || item.companyName || 'LEAD').substring(0, 2)).toUpperCase();
      const isSelected = item.id === activeDossierLeadId;

      const servicesHtml = (item.services && item.services.length > 0)
        ? item.services.map(s => `<span class="solution-tag">${escapeHtml(s)}</span>`).join('')
        : '—';

      const emailHtml = (item.clientEmail && item.clientEmail !== '—')
        ? `<a href="mailto:${escapeHtml(item.clientEmail)}" class="tbl-link" title="Send Direct Email" onclick="event.stopPropagation();"><i data-lucide="mail" style="width:13px;height:13px;"></i> ${escapeHtml(item.clientEmail)}</a>`
        : '—';

      const phoneHtml = (item.clientPhone && item.clientPhone !== '—')
        ? `<a href="tel:${escapeHtml(item.clientPhone)}" class="tbl-link" title="Call Prospect" onclick="event.stopPropagation();"><i data-lucide="phone" style="width:13px;height:13px;"></i> ${escapeHtml(item.clientPhone)}</a>`
        : '';

      const locationHtml = (item.location || item.sector)
        ? `<span style="font-size: 0.76rem; color: #64748b; display: flex; align-items: center; gap: 0.3rem;"><i data-lucide="map-pin" style="width:11px;height:11px;"></i> ${escapeHtml(item.location || item.sector)}</span>`
        : '';

      const dateHtml = item.dateDisplay ? `<div class="date-stamp">${item.dateDisplay}</div>` : formatDateTime(item.createdAt);

      const cleanPhone = cleanPhoneForWhatsApp(item.clientPhone);
      const waGreeting = `Hi ${item.clientName || 'there'}, thank you for contacting MotaGrowth Agency regarding your project. When would be a great time for a brief 15-minute discovery call?`;
      const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waGreeting)}` : '#';

      return `
        <tr class="clickable-lead-row ${isSelected ? 'is-selected-row' : ''}" data-id="${item.id}" style="cursor: pointer;" title="Click to inspect lead questionnaire">
          <td>${dateHtml}</td>
          <td><span class="status-pill ${stageClass}">${stage}</span></td>
          <td>
            <div class="client-lead-meta">
              <div class="client-lead-avatar">${initials}</div>
              <div>
                <span class="tbl-name">${escapeHtml(item.clientName || 'Prospect')}</span>
                <span class="tbl-company">${escapeHtml(item.companyName || '—')}</span>
              </div>
            </div>
          </td>
          <td>
            <div class="contact-links-box">
              ${emailHtml}
              ${phoneHtml}
              ${locationHtml}
            </div>
          </td>
          <td>${servicesHtml}</td>
          <td><span class="budget-badge">${escapeHtml(item.budget || '15,000+ MAD')}</span></td>
          <td>
            <div class="tbl-actions-wrap" onclick="event.stopPropagation();">
              <button class="btn-action-icon inspect inspect-lead-btn" data-id="${item.id}" title="Inspect Dossier">
                <i data-lucide="eye" style="width:14px;height:14px;"></i>
              </button>
              ${cleanPhone ? `
                <a href="${waUrl}" target="_blank" class="btn-action-icon whatsapp wa-lead-btn" title="Open WhatsApp Chat">
                  <i data-lucide="message-circle" style="width:14px;height:14px;"></i>
                </a>
              ` : ''}
              <button class="btn-action-icon convert convert-lead-btn" data-id="${item.id}" title="Convert to Client Workspace">
                <i data-lucide="user-plus" style="width:14px;height:14px;"></i>
              </button>
              <button class="btn-action-icon delete delete-inquiry-btn" data-id="${item.id}" title="Delete Lead">
                <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Row Click & Inspect Events
    inquiriesTableBody.querySelectorAll('.clickable-lead-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        const item = inquiries.find(i => i.id === id);
        if (item) {
          selectLeadForRightPanel(item);
        }
      });
    });

    inquiriesTableBody.querySelectorAll('.inspect-lead-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const item = inquiries.find(i => i.id === id);
        if (item) {
          selectLeadForRightPanel(item);
          openLeadDossier(item);
        }
      });
    });

    inquiriesTableBody.querySelectorAll('.convert-lead-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const item = inquiries.find(i => i.id === id);
        if (item) startLeadConversion(item);
      });
    });

    inquiriesTableBody.querySelectorAll('.delete-inquiry-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        if (!id) return;
        if (confirm('Are you sure you want to delete this inquiry?')) {
          inquiries = inquiries.filter(i => i.id !== id);
          saveInquiries(inquiries);
          renderAdminPortal();
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // LEAD DOSSIER DRAWER (INSPECT QUESTIONNAIRE & REAL-TIME STAGE UPDATES)
  // =========================================================================

  const leadDossierDrawer = document.getElementById('leadDossierDrawer');
  const dossierBackdrop = document.getElementById('dossierBackdrop');
  const closeDossierBtn = document.getElementById('closeDossierBtn');
  let activeDossierLeadId = null;

  function closeLeadDossier() {
    if (leadDossierDrawer) leadDossierDrawer.classList.remove('open');
    if (dossierBackdrop) dossierBackdrop.classList.remove('open');
    activeDossierLeadId = null;
  }

  if (closeDossierBtn) closeDossierBtn.addEventListener('click', closeLeadDossier);
  if (dossierBackdrop) dossierBackdrop.addEventListener('click', closeLeadDossier);

  function openLeadDossier(item) {
    if (!item) return;
    activeDossierLeadId = item.id;

    // Header info
    const refTag = document.getElementById('drawerRefId');
    if (refTag) refTag.textContent = item.id || 'INQ-BRIEF';

    const clientName = document.getElementById('drawerClientName');
    if (clientName) clientName.textContent = item.clientName || 'Prospect Name';

    const compName = document.getElementById('drawerCompanyName');
    if (compName) compName.textContent = item.companyName || 'Private Client';

    // Quick Actions
    const waBtn = document.getElementById('drawerWhatsappBtn');
    const cleanPhone = cleanPhoneForWhatsApp(item.clientPhone);
    if (waBtn) {
      if (cleanPhone) {
        const greeting = `Hi ${item.clientName || 'there'}, thank you for contacting MotaGrowth Agency regarding your project. When would be a great time for a brief 15-minute discovery call?`;
        waBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
        waBtn.style.display = 'inline-flex';
      } else {
        waBtn.style.display = 'none';
      }
    }

    const emailBtn = document.getElementById('drawerEmailBtn');
    if (emailBtn) {
      if (item.clientEmail) {
        emailBtn.href = `mailto:${item.clientEmail}?subject=${encodeURIComponent('MotaGrowth Agency — Proposal & Strategy')}`;
        emailBtn.style.display = 'inline-flex';
      } else {
        emailBtn.style.display = 'none';
      }
    }

    // Stage Selector
    const stageSelect = document.getElementById('drawerStageSelect');
    if (stageSelect) {
      stageSelect.value = normalizeLeadStage(item.status);
      stageSelect.onchange = () => {
        item.status = stageSelect.value;
        saveInquiries(inquiries);
        renderAdminPortal();
      };
    }

    // Convert Button
    const convertBtn = document.getElementById('drawerConvertBtn');
    if (convertBtn) {
      convertBtn.onclick = () => {
        closeLeadDossier();
        startLeadConversion(item);
      };
    }

    // Overview Meta
    const budgetEl = document.getElementById('drawerBudget');
    if (budgetEl) budgetEl.textContent = item.budget || '15,000+ MAD';

    const timelineEl = document.getElementById('drawerTimeline');
    if (timelineEl) timelineEl.textContent = item.timeline || 'Immediate';

    const phoneEl = document.getElementById('drawerPhone');
    if (phoneEl) {
      phoneEl.innerHTML = item.clientPhone ? `<a href="tel:${escapeHtml(item.clientPhone)}" style="color:#38bdf8;">${escapeHtml(item.clientPhone)}</a>` : '—';
    }

    const mailEl = document.getElementById('drawerEmail');
    if (mailEl) {
      mailEl.innerHTML = item.clientEmail ? `<a href="mailto:${escapeHtml(item.clientEmail)}" style="color:#38bdf8;">${escapeHtml(item.clientEmail)}</a>` : '—';
    }

    const locEl = document.getElementById('drawerLocation');
    if (locEl) locEl.textContent = item.location || item.sector || 'Morocco';

    const siteEl = document.getElementById('drawerWebsite');
    if (siteEl) {
      if (item.website && item.website !== '—') {
        const fullUrl = item.website.startsWith('http') ? item.website : `https://${item.website}`;
        siteEl.innerHTML = `<a href="${fullUrl}" target="_blank" style="color:#0088ff;text-decoration:underline;">${escapeHtml(item.website)} ↗</a>`;
      } else {
        siteEl.textContent = 'None';
      }
    }

    const descEl = document.getElementById('drawerBusinessDesc');
    if (descEl) descEl.textContent = item.businessDescription || item.notes || 'No preliminary notes provided.';

    // Detailed Questionnaire Answers
    const answersList = document.getElementById('drawerAnswersList');
    if (answersList) {
      let answersHtml = '';
      if (item.answers && Object.keys(item.answers).length > 0) {
        answersHtml = Object.entries(item.answers).map(([key, val]) => {
          let formattedVal = Array.isArray(val) ? val.join(', ') : String(val);
          if (typeof val === 'object' && val !== null) formattedVal = JSON.stringify(val);
          const prettyKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          return `
            <div class="dossier-answer-item">
              <div class="dossier-q">${escapeHtml(prettyKey)}</div>
              <div class="dossier-a">${escapeHtml(formattedVal)}</div>
            </div>
          `;
        }).join('');
      } else if (item.notes) {
        answersHtml = `
          <div class="dossier-answer-item">
            <div class="dossier-q">Brief Submission</div>
            <div class="dossier-a">${escapeHtml(item.notes)}</div>
          </div>
        `;
      } else {
        answersHtml = '<div style="color:#64748b;font-size:0.85rem;">No questionnaire answers recorded.</div>';
      }
      answersList.innerHTML = answersHtml;
    }

    // Internal Notes
    const notesInput = document.getElementById('drawerNotesInput');
    if (notesInput) notesInput.value = item.internalNotes || '';

    const saveNotesBtn = document.getElementById('saveDrawerNotesBtn');
    if (saveNotesBtn) {
      saveNotesBtn.onclick = () => {
        item.internalNotes = (notesInput ? notesInput.value : '').trim();
        saveInquiries(inquiries);
        saveNotesBtn.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;"></i><span>Saved!</span>';
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          saveNotesBtn.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;"></i><span>Save Notes</span>';
          if (window.lucide) window.lucide.createIcons();
        }, 1800);
      };
    }

    // Open Drawer
    if (leadDossierDrawer) leadDossierDrawer.classList.add('open');
    if (dossierBackdrop) dossierBackdrop.classList.add('open');
    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // LEAD DETAILS RIGHT PANEL CONTROLLER
  // =========================================================================

  function selectLeadForRightPanel(item) {
    if (!item) return;
    activeDossierLeadId = item.id;

    // Highlight row in leads table
    const tableBody = document.getElementById('inquiriesTableBody');
    if (tableBody) {
      tableBody.querySelectorAll('.clickable-lead-row').forEach(r => {
        r.classList.toggle('is-selected-row', r.getAttribute('data-id') === item.id);
      });
    }

    const emptyPanel = document.getElementById('leadPanelEmpty');
    const dossierPanel = document.getElementById('leadPanelDossier');
    if (emptyPanel) emptyPanel.style.display = 'none';
    if (dossierPanel) dossierPanel.style.display = 'flex';

    const pRef = document.getElementById('panelRefId');
    if (pRef) pRef.textContent = item.id || 'INQ-LEAD';

    const pName = document.getElementById('panelClientName');
    if (pName) pName.textContent = item.clientName || 'Prospect Name';

    const pComp = document.getElementById('panelCompanyName');
    if (pComp) pComp.textContent = item.companyName || 'Private Client';

    const pStage = document.getElementById('panelStageSelect');
    if (pStage) {
      pStage.value = normalizeLeadStage(item.status);
      pStage.onchange = () => {
        item.status = pStage.value;
        saveInquiries(inquiries);
        renderAdminPortal();
      };
    }

    const cleanPhone = cleanPhoneForWhatsApp(item.clientPhone);
    const pWa = document.getElementById('panelWhatsappBtn');
    if (pWa) {
      if (cleanPhone) {
        const greeting = `Hi ${item.clientName || 'there'}, thank you for contacting MotaGrowth Agency regarding your project. When would be a great time for a brief 15-minute discovery call?`;
        pWa.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
        pWa.style.display = 'inline-flex';
      } else {
        pWa.style.display = 'none';
      }
    }

    const pEmail = document.getElementById('panelEmailBtn');
    if (pEmail) {
      if (item.clientEmail) {
        pEmail.href = `mailto:${item.clientEmail}?subject=${encodeURIComponent('MotaGrowth Agency — Proposal & Strategy')}`;
        pEmail.style.display = 'inline-flex';
      } else {
        pEmail.style.display = 'none';
      }
    }

    const pConvert = document.getElementById('panelConvertBtn');
    if (pConvert) {
      pConvert.onclick = () => {
        startLeadConversion(item);
      };
    }

    const pBudget = document.getElementById('panelBudget');
    if (pBudget) pBudget.textContent = item.budget || '15,000+ MAD';

    const pTime = document.getElementById('panelTimeline');
    if (pTime) pTime.textContent = item.timeline || 'Immediate';

    const pPhone = document.getElementById('panelPhone');
    if (pPhone) {
      pPhone.innerHTML = item.clientPhone ? `<a href="tel:${escapeHtml(item.clientPhone)}" style="color:#38bdf8;">${escapeHtml(item.clientPhone)}</a>` : '—';
    }

    const pMail = document.getElementById('panelEmail');
    if (pMail) {
      pMail.innerHTML = item.clientEmail ? `<a href="mailto:${escapeHtml(item.clientEmail)}" style="color:#38bdf8;">${escapeHtml(item.clientEmail)}</a>` : '—';
    }

    const pLoc = document.getElementById('panelLocation');
    if (pLoc) pLoc.textContent = item.location || item.sector || 'Morocco';

    const pWeb = document.getElementById('panelWebsite');
    if (pWeb) {
      if (item.website && item.website !== '—') {
        const fullUrl = item.website.startsWith('http') ? item.website : `https://${item.website}`;
        pWeb.innerHTML = `<a href="${fullUrl}" target="_blank" style="color:#f59e0b;text-decoration:underline;">${escapeHtml(item.website)} ↗</a>`;
      } else {
        pWeb.textContent = 'None';
      }
    }

    const pDesc = document.getElementById('panelBusinessDesc');
    if (pDesc) pDesc.textContent = item.businessDescription || item.notes || 'No preliminary notes provided.';

    const pAnswers = document.getElementById('panelAnswersList');
    if (pAnswers) {
      let answersHtml = '';
      if (item.answers && Object.keys(item.answers).length > 0) {
        answersHtml = Object.entries(item.answers).map(([key, val]) => {
          let formattedVal = Array.isArray(val) ? val.join(', ') : String(val);
          if (typeof val === 'object' && val !== null) formattedVal = JSON.stringify(val);
          const prettyKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          return `
            <div class="dossier-answer-item">
              <div class="dossier-q">${escapeHtml(prettyKey)}</div>
              <div class="dossier-a">${escapeHtml(formattedVal)}</div>
            </div>
          `;
        }).join('');
      } else if (item.notes) {
        answersHtml = `
          <div class="dossier-answer-item">
            <div class="dossier-q">Brief Submission</div>
            <div class="dossier-a">${escapeHtml(item.notes)}</div>
          </div>
        `;
      } else {
        answersHtml = '<div style="color:#64748b;font-size:0.82rem;">No questionnaire answers recorded.</div>';
      }
      pAnswers.innerHTML = answersHtml;
    }

    const pNotes = document.getElementById('panelNotesInput');
    if (pNotes) pNotes.value = item.internalNotes || '';

    const pSaveNotes = document.getElementById('savePanelNotesBtn');
    if (pSaveNotes) {
      pSaveNotes.onclick = () => {
        item.internalNotes = (pNotes ? pNotes.value : '').trim();
        saveInquiries(inquiries);
        pSaveNotes.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;"></i><span>Saved!</span>';
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          pSaveNotes.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;"></i><span>Save Notes</span>';
          if (window.lucide) window.lucide.createIcons();
        }, 1800);
      };
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // FINANCIALS & ANALYTICS TAB
  // =========================================================================

  function renderAnalyticsSection() {
    const serviceListEl = document.getElementById('serviceBreakdownList');
    const funnelListEl = document.getElementById('pipelineFunnelList');

    // 1. Service Breakdown
    const serviceCategories = [
      'Website Design & Development',
      'Social Media Management',
      'Paid Performance Marketing',
      'Full-Service Growth Package'
    ];

    if (serviceListEl) {
      serviceListEl.innerHTML = serviceCategories.map(cat => {
        const matchingLeads = inquiries.filter(i => {
          const joined = (i.services || []).join(' ').toLowerCase();
          return joined.includes(cat.toLowerCase());
        });
        const totalCatVal = matchingLeads.reduce((sum, i) => sum + parseLeadBudgetMAD(i.budget), 0);

        return `
          <div class="service-stat-item">
            <div>
              <div class="service-stat-name">${cat}</div>
              <span style="font-size:0.75rem;color:#94a3b8;">${matchingLeads.length} Inbound Leads</span>
            </div>
            <div class="service-stat-val">${formatCurrencyMAD(totalCatVal)}</div>
          </div>
        `;
      }).join('');
    }

    // 2. Deal Conversion Funnel
    const stages = [
      { name: 'New Lead', color: '#38bdf8' },
      { name: 'Contacted', color: '#fbbf24' },
      { name: 'Proposal Sent', color: '#c084fc' },
      { name: 'Negotiation / Meeting', color: '#38bdf8' },
      { name: 'Won / Active Client', color: '#34d399' }
    ];

    const totalCount = inquiries.length || 1;

    if (funnelListEl) {
      funnelListEl.innerHTML = stages.map(st => {
        const count = inquiries.filter(i => normalizeLeadStage(i.status) === st.name).length;
        const pct = Math.round((count / totalCount) * 100);

        return `
          <div class="funnel-stage-item">
            <div class="funnel-stage-meta">
              <span style="color:#ffffff;">${st.name}</span>
              <span style="color:${st.color};">${count} leads (${pct}%)</span>
            </div>
            <div class="funnel-bar-wrap">
              <div class="funnel-bar-fill" style="width: ${Math.max(pct, 4)}%; background: ${st.color};"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // =========================================================================
  // CLIENT WORKSPACES GRID (ACTIVE CLIENTS & 1-CLICK WHATSAPP ONBOARDING)
  // =========================================================================

  function renderClientsGrid() {
    const search = (document.getElementById('clientSearchInput')?.value || '').toLowerCase().trim();
    const filteredClients = clients.filter(c => {
      if (!search) return true;
      const comp = (c.companyName || '').toLowerCase();
      const name = (c.clientName || '').toLowerCase();
      const email = (c.email || '').toLowerCase();
      return comp.includes(search) || name.includes(search) || email.includes(search);
    });

    if (!adminClientsGrid) return;

    if (filteredClients.length === 0) {
      adminClientsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: rgba(14, 18, 28, 0.7); border-radius: 16px; border: 1px dashed rgba(255, 255, 255, 0.12); color: #64748b;">
          <i data-lucide="users" style="width: 36px; height: 36px; color: #0088ff; margin-bottom: 0.75rem; opacity: 0.7;"></i>
          <h4 style="font-size: 1.05rem; color: #ffffff; margin-bottom: 0.35rem;">No Client Workspaces Found</h4>
          <p style="font-size: 0.85rem; margin-bottom: 1.25rem;">Create a new client account to provision access and deliverables.</p>
          <button type="button" class="btn-blue-pill btn-small" id="emptyStateAddClientBtn">
            <i data-lucide="plus"></i>
            <span>+ Create Client Account</span>
          </button>
        </div>
      `;
      document.getElementById('emptyStateAddClientBtn')?.addEventListener('click', () => {
        openCreateClientModal();
      });
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    adminClientsGrid.innerHTML = filteredClients.map(c => {
      const initials = ((c.companyName || c.clientName || 'CL').substring(0, 2)).toUpperCase();
      const statusClass = (c.status || 'Active').toLowerCase();
      const hasLogo = Boolean(c.logo);
      const avatarInner = hasLogo
        ? `<img src="${c.logo}" class="client-card-logo-img" alt="${escapeHtml(c.companyName)}" />`
        : initials;

      const retainerMAD = c.retainerMRR ? formatCurrencyMAD(c.retainerMRR) : '25,000 MAD / mo';

      return `
        <div class="admin-client-card" id="clientCard-${c.id}">
          <div class="client-card-top">
            <div class="client-card-identity">
              <div class="client-card-avatar ${hasLogo ? 'has-logo-img' : ''}">${avatarInner}</div>
              <div class="client-card-title">
                <h3>${escapeHtml(c.companyName)}</h3>
                <span>${escapeHtml(c.clientName)}</span>
              </div>
            </div>
            <span class="status-badge-pill ${statusClass}">${escapeHtml(c.status || 'Active')}</span>
          </div>

          <div class="client-meta-box">
            <div><strong>Email :</strong> ${escapeHtml(c.email)}</div>
            <div><strong>Passcode :</strong> <code style="color: #f3c644; font-weight:700;">${escapeHtml(c.password)}</code></div>
            <div><strong>Retainer :</strong> <span style="color:#34d399; font-weight:700;">${retainerMAD}</span></div>
            <div><span class="client-service-chip">${escapeHtml(c.servicesTier || 'Full-Service Growth Package')}</span></div>
          </div>

          <div class="client-stats-badges">
            <span class="stat-chip"><i data-lucide="check-square" style="width:13px;height:13px;color:#0088ff;"></i> ${(c.approvals || []).length} Deliverables</span>
            <span class="stat-chip"><i data-lucide="calendar" style="width:13px;height:13px;color:#7e22ce;"></i> ${(c.timeline || []).length} Milestones</span>
            <span class="stat-chip"><i data-lucide="lightbulb" style="width:13px;height:13px;color:#d97706;"></i> ${(c.ideas || []).length} Ideas</span>
          </div>

          <div class="client-card-actions">
            <!-- 1-Click WhatsApp Onboarding Invite -->
            <button type="button" class="btn-copy-wa-invite copy-wa-invite-btn" data-id="${c.id}" title="Copy ready-to-send WhatsApp onboarding invite">
              <i data-lucide="share-2" style="width:13px;height:13px;"></i>
              <span>WhatsApp Invite</span>
            </button>

            <!-- Manage Details Modal -->
            <button type="button" class="btn-blue-pill btn-small manage-client-btn" data-id="${c.id}">
              <i data-lucide="sliders" style="width:14px;height:14px;"></i>
              <span>Manage</span>
            </button>

            <!-- Preview / Login to Client Space -->
            <button type="button" class="btn-test-client test-client-login-btn" data-id="${c.id}" title="Login directly into this client's portal">
              <i data-lucide="log-in" style="width:14px;height:14px;"></i>
              <span>Preview</span>
            </button>

            <!-- Delete -->
            <button type="button" class="btn-delete-row delete-client-btn" data-id="${c.id}" title="Delete Client Account">
              <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // WhatsApp Invite Copy Handlers
    adminClientsGrid.querySelectorAll('.copy-wa-invite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const client = clients.find(c => c.id === id);
        if (!client) return;

        const portalUrl = 'https://motagrowthagency.github.io/MotaGrowth-Animatedweb/client-space.html';
        const msg = `Hello ${client.clientName}, welcome to MotaGrowth Agency!\n\nYour dedicated Client Workspace is active:\n🔗 Portal Link: ${portalUrl}\n👤 Login: ${client.email}\n🔑 Passcode: ${client.password}\n\nYou can review your project roadmap, approvals, and growth ideas anytime. Let's scale together! 🚀`;

        navigator.clipboard.writeText(msg).then(() => {
          btn.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;"></i><span>Copied!</span>';
          if (window.lucide) window.lucide.createIcons();
          setTimeout(() => {
            btn.innerHTML = '<i data-lucide="share-2" style="width:13px;height:13px;"></i><span>WhatsApp Invite</span>';
            if (window.lucide) window.lucide.createIcons();
          }, 2000);
        }).catch(() => {
          prompt('Copy Onboarding Invite Message:', msg);
        });
      });
    });

    adminClientsGrid.querySelectorAll('.manage-client-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openManageClientModal(id);
      });
    });

    adminClientsGrid.querySelectorAll('.test-client-login-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const client = clients.find(c => c.id === id);
        if (client) {
          loggedInClient = client;
          saveActiveSession(client);
          window.location.href = 'client-space.html';
        }
      });
    });

    adminClientsGrid.querySelectorAll('.delete-client-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        if (!id) return;
        if (confirm('Are you sure you want to delete this client account?')) {
          clients = clients.filter(c => c.id !== id);
          saveClients(clients);
          renderAdminPortal();
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // ADMIN TAB SWITCHER & NAVIGATION
  // =========================================================================

  const tabAnalyticsBtn = document.getElementById('tabAnalyticsBtn');
  const adminAnalyticsSection = document.getElementById('adminAnalyticsSection');

  function switchAdminTab(activeTab, originView) {
    if (tabInquiriesBtn) tabInquiriesBtn.classList.toggle('active', activeTab === 'inquiries');
    if (tabClientsBtn) tabClientsBtn.classList.toggle('active', activeTab === 'clients');
    if (tabAnalyticsBtn) tabAnalyticsBtn.classList.toggle('active', activeTab === 'analytics');

    if (adminInquiriesSection) adminInquiriesSection.style.display = (activeTab === 'inquiries') ? 'block' : 'none';
    if (adminClientsSection) adminClientsSection.style.display = (activeTab === 'clients') ? 'block' : 'none';
    if (adminAnalyticsSection) adminAnalyticsSection.style.display = (activeTab === 'analytics') ? 'block' : 'none';

    // Synchronize left sidebar nav items
    if (typeof updateSidebarNavState === 'function') {
      if (originView) {
        updateSidebarNavState(originView);
      } else if (activeTab === 'inquiries') {
        updateSidebarNavState('pipeline');
      } else if (activeTab === 'clients') {
        updateSidebarNavState('clients');
      } else if (activeTab === 'analytics') {
        updateSidebarNavState('analytics');
      }
    }

    if (activeTab === 'inquiries') renderInquiriesTable();
    if (activeTab === 'clients') renderClientsGrid();
    if (activeTab === 'analytics') renderAnalyticsSection();
    if (window.lucide) window.lucide.createIcons();
  }

  // Sidebar navigation handlers
  const navItemDashboard = document.getElementById('navItemDashboard');
  const navItemPipeline = document.getElementById('navItemPipeline');
  const navItemClients = document.getElementById('navItemClients');
  const navItemAnalytics = document.getElementById('navItemAnalytics');

  function updateSidebarNavState(view) {
    if (navItemDashboard) navItemDashboard.classList.toggle('active', view === 'dashboard');
    if (navItemPipeline) navItemPipeline.classList.toggle('active', view === 'pipeline');
    if (navItemClients) navItemClients.classList.toggle('active', view === 'clients');
    if (navItemAnalytics) navItemAnalytics.classList.toggle('active', view === 'analytics');
  }

  if (navItemDashboard) {
    navItemDashboard.addEventListener('click', () => {
      switchAdminTab('inquiries', 'dashboard');
    });
  }
  if (navItemPipeline) {
    navItemPipeline.addEventListener('click', () => {
      switchAdminTab('inquiries', 'pipeline');
    });
  }
  if (navItemClients) {
    navItemClients.addEventListener('click', () => {
      switchAdminTab('clients', 'clients');
    });
  }
  if (navItemAnalytics) {
    navItemAnalytics.addEventListener('click', () => {
      switchAdminTab('analytics', 'analytics');
    });
  }

  // 4 Interactive KPI Summary Cards
  const kpiCardLeads = document.getElementById('kpiCardLeads');
  if (kpiCardLeads) {
    kpiCardLeads.addEventListener('click', () => {
      switchAdminTab('inquiries', 'pipeline');
      const sf = document.getElementById('inquiryStatusFilter');
      if (sf) sf.value = 'ALL';
      renderInquiriesTable();
    });
  }

  const kpiCardWorkspaces = document.getElementById('kpiCardWorkspaces');
  if (kpiCardWorkspaces) {
    kpiCardWorkspaces.addEventListener('click', () => {
      switchAdminTab('clients', 'clients');
    });
  }

  const kpiCardDeals = document.getElementById('kpiCardDeals');
  if (kpiCardDeals) {
    kpiCardDeals.addEventListener('click', () => {
      switchAdminTab('inquiries', 'pipeline');
      const sf = document.getElementById('inquiryStatusFilter');
      if (sf) sf.value = 'Negotiation / Meeting';
      renderInquiriesTable();
    });
  }

  const kpiCardFinance = document.getElementById('kpiCardFinance');
  if (kpiCardFinance) {
    kpiCardFinance.addEventListener('click', () => {
      switchAdminTab('analytics', 'analytics');
    });
  }

  // Interactive Donut Chart Legend Filter
  const countWebEl = document.getElementById('countWeb')?.closest('.donut-legend-item');
  if (countWebEl) {
    countWebEl.addEventListener('click', () => {
      switchAdminTab('inquiries', 'pipeline');
      const svcFilter = document.getElementById('inquiryServiceFilter');
      if (svcFilter) svcFilter.value = 'Website Design & Development';
      renderInquiriesTable();
    });
  }

  const countSocialEl = document.getElementById('countSocial')?.closest('.donut-legend-item');
  if (countSocialEl) {
    countSocialEl.addEventListener('click', () => {
      switchAdminTab('inquiries', 'pipeline');
      const svcFilter = document.getElementById('inquiryServiceFilter');
      if (svcFilter) svcFilter.value = 'Social Media Management';
      renderInquiriesTable();
    });
  }

  const countAdsEl = document.getElementById('countAds')?.closest('.donut-legend-item');
  if (countAdsEl) {
    countAdsEl.addEventListener('click', () => {
      switchAdminTab('inquiries', 'pipeline');
      const svcFilter = document.getElementById('inquiryServiceFilter');
      if (svcFilter) svcFilter.value = 'Paid Performance Marketing';
      renderInquiriesTable();
    });
  }

  const countFullEl = document.getElementById('countFull')?.closest('.donut-legend-item');
  if (countFullEl) {
    countFullEl.addEventListener('click', () => {
      switchAdminTab('inquiries', 'pipeline');
      const svcFilter = document.getElementById('inquiryServiceFilter');
      if (svcFilter) svcFilter.value = 'Full-Service Growth Package';
      renderInquiriesTable();
    });
  }

  const donutTotalCountEl = document.getElementById('donutTotalCount')?.parentElement;
  if (donutTotalCountEl) {
    donutTotalCountEl.style.cursor = 'pointer';
    donutTotalCountEl.title = 'Reset service filter';
    donutTotalCountEl.addEventListener('click', () => {
      const svcFilter = document.getElementById('inquiryServiceFilter');
      if (svcFilter) svcFilter.value = 'ALL';
      renderInquiriesTable();
    });
  }

  // Right Panel Lead Details Buttons
  const closeLeadDetailsBtn = document.getElementById('closeLeadDetailsBtn');
  if (closeLeadDetailsBtn) {
    closeLeadDetailsBtn.addEventListener('click', () => {
      const emptyPanel = document.getElementById('leadPanelEmpty');
      const dossierPanel = document.getElementById('leadPanelDossier');
      if (emptyPanel) emptyPanel.style.display = 'flex';
      if (dossierPanel) dossierPanel.style.display = 'none';
      document.querySelectorAll('.clickable-lead-row').forEach(r => r.classList.remove('is-selected-row'));
      activeDossierLeadId = null;
    });
  }

  const expandLeadDetailsBtn = document.getElementById('expandLeadDetailsBtn');
  if (expandLeadDetailsBtn) {
    expandLeadDetailsBtn.addEventListener('click', () => {
      const activeLead = inquiries.find(i => i.id === activeDossierLeadId);
      if (activeLead) {
        openLeadDossier(activeLead);
      } else if (inquiries.length > 0) {
        openLeadDossier(inquiries[0]);
      }
    });
  }

  // Global Search Controller & Cmd+K Shortcut
  const adminGlobalSearchInput = document.getElementById('adminGlobalSearchInput');
  if (adminGlobalSearchInput) {
    adminGlobalSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (inquirySearchInput) inquirySearchInput.value = val;
      if (clientSearchInput) clientSearchInput.value = val;
      renderInquiriesTable();
      renderClientsGrid();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        adminGlobalSearchInput.focus();
        adminGlobalSearchInput.select();
      }
    });
  }

  // Date Range Selector & Dropdown Menu
  const adminDateRangeBtn = document.getElementById('adminDateRangeBtn');
  const adminDateRangeMenu = document.getElementById('adminDateRangeMenu');
  const dateRangeSelectedText = document.getElementById('dateRangeSelectedText');

  if (adminDateRangeBtn && adminDateRangeMenu) {
    adminDateRangeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = adminDateRangeMenu.style.display === 'flex';
      adminDateRangeMenu.style.display = isVisible ? 'none' : 'flex';
      if (adminNotifDropdown) adminNotifDropdown.style.display = 'none';
      if (adminProfileMenu) adminProfileMenu.style.display = 'none';
    });

    adminDateRangeMenu.querySelectorAll('.date-menu-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const range = btn.getAttribute('data-range') || 'All Time';
        activeDateRange = range;
        if (dateRangeSelectedText) dateRangeSelectedText.textContent = range;
        adminDateRangeMenu.querySelectorAll('.date-menu-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        adminDateRangeMenu.style.display = 'none';
        renderAdminPortal();
      });
    });
  }

  // Notifications Bell Dropdown
  const adminNotifBellBtn = document.getElementById('adminNotifBellBtn');
  const adminNotifDropdown = document.getElementById('adminNotifDropdown');
  const adminNotifList = document.getElementById('adminNotifList');
  const adminNotifDot = document.getElementById('adminNotifDot');
  const clearNotifsBtn = document.getElementById('clearNotifsBtn');

  function renderAdminNotifications() {
    if (!adminNotifList) return;
    const items = [
      {
        icon: 'briefcase',
        title: 'New High-Ticket Brief: Atlas Luxury Living (50,000+ MAD)',
        time: '4 hours ago'
      },
      {
        icon: 'file-text',
        title: 'Proposal sent to Noor Botanical Skincare for Q4 Media Scale',
        time: '18 hours ago'
      },
      {
        icon: 'check-circle-2',
        title: 'Orsap.ma Web Architecture milestone approved by client',
        time: 'Yesterday'
      },
      {
        icon: 'shield-check',
        title: 'Database integrity verified: 256-bit AES vault active',
        time: 'Live'
      }
    ];

    adminNotifList.innerHTML = items.map(n => `
      <div class="notif-item">
        <div class="notif-icon"><i data-lucide="${n.icon}" style="width:14px;height:14px;"></i></div>
        <div>
          <div class="notif-title">${escapeHtml(n.title)}</div>
          <div class="notif-time">${escapeHtml(n.time)}</div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  if (adminNotifBellBtn && adminNotifDropdown) {
    adminNotifBellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = adminNotifDropdown.style.display === 'block';
      adminNotifDropdown.style.display = isVisible ? 'none' : 'block';
      if (adminDateRangeMenu) adminDateRangeMenu.style.display = 'none';
      if (adminProfileMenu) adminProfileMenu.style.display = 'none';
      if (!isVisible) renderAdminNotifications();
    });
  }

  if (clearNotifsBtn) {
    clearNotifsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (adminNotifDot) adminNotifDot.style.display = 'none';
      if (adminNotifList) {
        adminNotifList.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: #64748b; font-size: 0.8rem;">All notifications cleared.</div>';
      }
    });
  }

  // Fouad Tazi Profile Widget Dropdown
  const adminProfileWidget = document.getElementById('adminProfileWidget');
  const adminProfileMenu = document.getElementById('adminProfileMenu');
  const pmOpenToolsBtn = document.getElementById('pmOpenToolsBtn');
  const pmAddLeadBtn = document.getElementById('pmAddLeadBtn');
  const pmLockoutBtn = document.getElementById('pmLockoutBtn');

  if (adminProfileWidget && adminProfileMenu) {
    adminProfileWidget.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = adminProfileMenu.style.display === 'flex';
      adminProfileMenu.style.display = isVisible ? 'none' : 'flex';
      if (adminDateRangeMenu) adminDateRangeMenu.style.display = 'none';
      if (adminNotifDropdown) adminNotifDropdown.style.display = 'none';
    });
  }

  if (pmOpenToolsBtn) {
    pmOpenToolsBtn.addEventListener('click', () => {
      if (adminProfileMenu) adminProfileMenu.style.display = 'none';
      if (backupToolsModal) backupToolsModal.style.display = 'flex';
    });
  }

  if (pmAddLeadBtn) {
    pmAddLeadBtn.addEventListener('click', () => {
      if (adminProfileMenu) adminProfileMenu.style.display = 'none';
      if (manualLeadModal) manualLeadModal.style.display = 'flex';
    });
  }

  if (pmLockoutBtn) {
    pmLockoutBtn.addEventListener('click', (e) => {
      if (adminLockoutBtn) adminLockoutBtn.click();
    });
  }

  // Close Popovers on Outside Click
  document.addEventListener('click', (e) => {
    if (adminDateRangeMenu && !adminDateRangeMenu.contains(e.target) && e.target !== adminDateRangeBtn) {
      adminDateRangeMenu.style.display = 'none';
    }
    if (adminNotifDropdown && !adminNotifDropdown.contains(e.target) && e.target !== adminNotifBellBtn) {
      adminNotifDropdown.style.display = 'none';
    }
    if (adminProfileMenu && !adminProfileMenu.contains(e.target) && e.target !== adminProfileWidget) {
      adminProfileMenu.style.display = 'none';
    }
  });

  // Velocity Chart Time Pill Filters (7D, 30D, 90D, All)
  const velocityRangePills = document.getElementById('velocityRangePills');
  if (velocityRangePills) {
    velocityRangePills.querySelectorAll('.chart-time-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeVelocityRange = btn.getAttribute('data-range') || '30d';
        renderPipelineTrendChart();
      });
    });
  }

  if (tabInquiriesBtn) tabInquiriesBtn.addEventListener('click', () => switchAdminTab('inquiries', 'pipeline'));
  if (tabClientsBtn) tabClientsBtn.addEventListener('click', () => switchAdminTab('clients', 'clients'));
  if (tabAnalyticsBtn) tabAnalyticsBtn.addEventListener('click', () => switchAdminTab('analytics', 'analytics'));

  if (inquirySearchInput) inquirySearchInput.addEventListener('input', renderInquiriesTable);
  document.getElementById('inquiryStatusFilter')?.addEventListener('change', renderInquiriesTable);
  document.getElementById('inquiryServiceFilter')?.addEventListener('change', renderInquiriesTable);
  document.getElementById('clientSearchInput')?.addEventListener('input', renderClientsGrid);

  // CSV Export for Inbound Leads
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      if (inquiries.length === 0) { alert('No leads to export.'); return; }
      const headers = ['REFERENCE_ID', 'DATE', 'STAGE', 'CLIENT_NAME', 'COMPANY', 'EMAIL', 'PHONE', 'LOCATION', 'SERVICES', 'BUDGET', 'NOTES'];
      const rows = inquiries.map(i => [
        `"${i.id || 'INQ'}"`,
        `"${(i.dateDisplay || i.createdAt || '').replace(/<br>/g, ' ')}"`,
        `"${normalizeLeadStage(i.status)}"`,
        `"${(i.clientName || '').replace(/"/g, '""')}"`,
        `"${(i.companyName || '').replace(/"/g, '""')}"`,
        `"${i.clientEmail || ''}"`,
        `"${i.clientPhone || ''}"`,
        `"${i.location || i.sector || ''}"`,
        `"${(i.services || []).join('; ')}"`,
        `"${i.budget || ''}"`,
        `"${(i.notes || '').replace(/"/g, '""')}"`
      ]);
      const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      downloadBlob(csv, `motagrowth_crm_leads_${Date.now()}.csv`, 'text/csv;charset=utf-8;');
    });
  }

  // =========================================================================
  // MASTER LOCK & LOGOUT CONTROLLER
  // =========================================================================

  const adminLockScreen = document.getElementById('adminLockScreen');
  const adminLockForm = document.getElementById('adminLockForm');
  const adminMasterPassInput = document.getElementById('adminMasterPassInput');
  const adminLockError = document.getElementById('adminLockError');
  const toggleAdminPassBtn = document.getElementById('toggleAdminPassBtn');
  const passToggleIcon = document.getElementById('passToggleIcon');
  const adminLockoutBtn = document.getElementById('adminLockoutBtn');

  if (toggleAdminPassBtn && adminMasterPassInput) {
    toggleAdminPassBtn.addEventListener('click', () => {
      const isPass = adminMasterPassInput.type === 'password';
      adminMasterPassInput.type = isPass ? 'text' : 'password';
      if (passToggleIcon) {
        passToggleIcon.setAttribute('data-lucide', isPass ? 'eye-off' : 'eye');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  if (adminLockForm) {
    adminLockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (adminMasterPassInput ? adminMasterPassInput.value : '').trim();
      if (val === 'Mogamedtazi223') {
        sessionStorage.setItem('motagrowth_admin_auth', 'true');
        if (adminLockError) adminLockError.style.display = 'none';
        if (adminLockScreen) adminLockScreen.style.display = 'none';
        if (adminPortalView) adminPortalView.style.display = 'block';
        renderAdminPortal();
      } else {
        if (adminLockError) adminLockError.style.display = 'block';
        if (adminMasterPassInput) {
          adminMasterPassInput.focus();
          adminMasterPassInput.select();
        }
      }
    });
  }

  if (adminLockoutBtn) {
    adminLockoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('motagrowth_admin_auth');
      if (adminPortalView) adminPortalView.style.display = 'none';
      if (adminLockScreen) adminLockScreen.style.display = 'flex';
      if (adminMasterPassInput) {
        adminMasterPassInput.value = '';
        adminMasterPassInput.focus();
      }
      if (adminLockError) adminLockError.style.display = 'none';
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // =========================================================================
  // MANUAL LEAD MODAL CONTROLLER
  // =========================================================================

  const btnOpenManualLeadModal = document.getElementById('btnOpenManualLeadModal');
  const manualLeadModal = document.getElementById('manualLeadModal');
  const closeManualLeadBtn = document.getElementById('closeManualLeadBtn');
  const cancelManualLeadBtn = document.getElementById('cancelManualLeadBtn');
  const manualLeadForm = document.getElementById('manualLeadForm');

  if (btnOpenManualLeadModal && manualLeadModal) {
    btnOpenManualLeadModal.addEventListener('click', () => {
      manualLeadModal.style.display = 'flex';
    });
  }

  if (closeManualLeadBtn && manualLeadModal) {
    closeManualLeadBtn.addEventListener('click', () => manualLeadModal.style.display = 'none');
  }
  if (cancelManualLeadBtn && manualLeadModal) {
    cancelManualLeadBtn.addEventListener('click', () => manualLeadModal.style.display = 'none');
  }

  if (manualLeadForm) {
    manualLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('manLeadName')?.value.trim();
      const company = document.getElementById('manLeadCompany')?.value.trim();
      const email = document.getElementById('manLeadEmail')?.value.trim() || '—';
      const phone = document.getElementById('manLeadPhone')?.value.trim() || '—';
      const service = document.getElementById('manLeadService')?.value;
      const budget = document.getElementById('manLeadBudget')?.value;
      const stage = document.getElementById('manLeadStage')?.value || 'New Lead';
      const timeline = document.getElementById('manLeadTimeline')?.value.trim() || 'Immediate';
      const notes = document.getElementById('manLeadNotes')?.value.trim();

      const newLead = {
        id: 'INQ-MAN-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
        createdAt: new Date().toISOString(),
        clientName: name,
        companyName: company,
        clientEmail: email,
        clientPhone: phone,
        location: 'Morocco',
        website: '—',
        budget: budget,
        timeline: timeline,
        services: [service],
        status: stage,
        notes: notes || 'Manual lead entry from direct contact.',
        answers: { Service: service, Budget: budget, Timeline: timeline }
      };

      inquiries.unshift(newLead);
      saveInquiries(inquiries);
      manualLeadModal.style.display = 'none';
      manualLeadForm.reset();
      renderAdminPortal();
    });
  }

  // =========================================================================
  // BACKUP, RESTORE & DATA TOOLS MODAL
  // =========================================================================

  const btnOpenDataToolsModal = document.getElementById('btnOpenDataToolsModal');
  const backupToolsModal = document.getElementById('backupToolsModal');
  const closeBackupToolsBtn = document.getElementById('closeBackupToolsBtn');
  const cancelBackupToolsBtn = document.getElementById('cancelBackupToolsBtn');
  const btnDownloadJsonBackup = document.getElementById('btnDownloadJsonBackup');
  const restoreFileInput = document.getElementById('restoreFileInput');
  const btnLoadDemoLeads = document.getElementById('btnLoadDemoLeads');
  const btnClearInquiries = document.getElementById('btnClearInquiries');

  if (btnOpenDataToolsModal && backupToolsModal) {
    btnOpenDataToolsModal.addEventListener('click', () => {
      backupToolsModal.style.display = 'flex';
    });
  }
  if (closeBackupToolsBtn && backupToolsModal) {
    closeBackupToolsBtn.addEventListener('click', () => backupToolsModal.style.display = 'none');
  }
  if (cancelBackupToolsBtn && backupToolsModal) {
    cancelBackupToolsBtn.addEventListener('click', () => backupToolsModal.style.display = 'none');
  }

  // Export JSON Backup
  if (btnDownloadJsonBackup) {
    btnDownloadJsonBackup.addEventListener('click', () => {
      const backupData = {
        version: '7.0',
        exportedAt: new Date().toISOString(),
        inquiries: inquiries,
        clients: clients
      };
      const json = JSON.stringify(backupData, null, 2);
      downloadBlob(json, `motagrowth_crm_backup_${Date.now()}.json`, 'application/json');
    });
  }

  // Restore JSON Backup
  if (restoreFileInput) {
    restoreFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (parsed && (Array.isArray(parsed.inquiries) || Array.isArray(parsed.clients))) {
            if (Array.isArray(parsed.inquiries)) {
              inquiries = parsed.inquiries;
              saveInquiries(inquiries);
            }
            if (Array.isArray(parsed.clients)) {
              clients = parsed.clients;
              saveClients(clients);
            }
            renderAdminPortal();
            if (backupToolsModal) backupToolsModal.style.display = 'none';
            alert('Database successfully restored from backup!');
          } else {
            alert('Invalid backup file format.');
          }
        } catch (err) {
          alert('Failed to parse JSON backup file.');
        }
      };
      reader.readAsText(file);
    });
  }

  function getDefaultDemoInquiries() {
    return [
      {
        id: 'INQ-ATLAS-91A',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        clientName: 'Yassine Bennani',
        companyName: 'Atlas Luxury Living',
        clientEmail: 'yassine@atlasliving.ma',
        clientPhone: '+212 661 248910',
        location: 'Casablanca, Morocco',
        website: 'atlasliving.ma',
        budget: '50,000+ MAD',
        timeline: '1–2 Months',
        services: ['Full-Service Growth Package'],
        status: 'Negotiation / Meeting',
        businessDescription: 'High-end interior design and architectural real estate studio expanding across Morocco and the UAE.',
        notes: 'Wants full rebrand, cinematic 3D web experience, and private client presentation vaults.',
        answers: { 'Primary Objective': 'Scale High-Ticket Inquiries', 'Target Market': 'Luxury HNWIs in Casablanca & Dubai', 'Allocated Budget': '50,000+ MAD' }
      },
      {
        id: 'INQ-NOOR-42B',
        createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
        clientName: 'Sofia El Amrani',
        companyName: 'Noor Botanical Skincare',
        clientEmail: 'sofia@noorbotanics.com',
        clientPhone: '+212 662 550192',
        location: 'Marrakech, Morocco',
        website: 'noorbotanics.com',
        budget: '25,000–49,999 MAD',
        timeline: '2–4 Weeks',
        services: ['Paid Performance Marketing'],
        status: 'Proposal Sent',
        businessDescription: 'Organic argan and prickly pear seed luxury cosmetics brand retailing in high-end hotels and e-commerce.',
        notes: 'Seeking Meta & TikTok Ads scale to achieve 4x ROAS on direct-to-consumer store.',
        answers: { 'Current Monthly Spend': '30,000 MAD', 'Ad Objective': 'Scale to 100k MAD/mo profitably' }
      },
      {
        id: 'INQ-CASA-18C',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        clientName: 'Mehdi Tazi',
        companyName: 'Casa FinTech Solutions',
        clientEmail: 'mehdi@casafintech.io',
        clientPhone: '+212 663 881204',
        location: 'Casablanca Finance City',
        website: 'casafintech.io',
        budget: '25,000–49,999 MAD',
        timeline: 'Immediate',
        services: ['Website Design & Development'],
        status: 'Contacted',
        businessDescription: 'B2B payment infrastructure and embedded financing gateway for North African merchants.',
        notes: 'Needs enterprise dark-mode interactive website with interactive API docs and fast conversion flow.',
        answers: { 'Tech Stack': 'Next.js / Tailwind CSS', 'Security Requirements': 'PCI-DSS Compliant' }
      },
      {
        id: 'INQ-SOL-77D',
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        clientName: 'Laila Chraibi',
        companyName: 'Maison Soliel Hospitality',
        clientEmail: 'laila@maisonsoliel.com',
        clientPhone: '+212 665 339011',
        location: 'Tangier, Morocco',
        website: 'maisonsoliel.com',
        budget: '15,000–24,999 MAD',
        timeline: '2–4 Weeks',
        services: ['Social Media Management'],
        status: 'New Lead',
        businessDescription: 'Boutique riad and culinary retreat overlooking the Strait of Gibraltar.',
        notes: 'Needs daily organic Instagram reels, influencer partnerships, and direct booking engine growth.',
        answers: { 'Content Style': 'Cinematic luxury lifestyle', 'Publishing Cadence': '5 Reels / Week' }
      },
      {
        id: 'INQ-MARA-55E',
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        clientName: 'Tariq Alami',
        companyName: 'Marrakech Oasis Villas',
        clientEmail: 'tariq@oasisvillas.ma',
        clientPhone: '+212 667 992014',
        location: 'Marrakech Palm Grove',
        website: 'oasisvillas.ma',
        budget: '50,000+ MAD',
        timeline: 'Immediate',
        services: ['Full-Service Growth Package'],
        status: 'Negotiation / Meeting',
        businessDescription: 'Luxury private rental estates catering to international executives and royal families.',
        notes: 'Requires automated booking integration, VIP concierge portal, and Meta advertising.',
        answers: { 'Target ROI': '6x Gross Booking Revenue', 'Scope': 'Full-Service Web & Paid Acquisition' }
      },
      {
        id: 'INQ-RIAD-33F',
        createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
        clientName: 'Kenza Benjelloun',
        companyName: 'Maison Dar Anbar',
        clientEmail: 'kenza@daranbar.com',
        clientPhone: '+212 669 443210',
        location: 'Fes Medina, Morocco',
        website: 'daranbar.com',
        budget: '25,000–49,999 MAD',
        timeline: '2–4 Weeks',
        services: ['Paid Performance Marketing'],
        status: 'Proposal Sent',
        businessDescription: 'Historic palace hotel & botanical spa expanding into artisan fragrance e-commerce.',
        notes: 'Wants performance ads launched across France, UK, and GCC markets.',
        answers: { 'Target Markets': 'France, UK, UAE, Saudi Arabia' }
      },
      {
        id: 'INQ-CAP-12G',
        createdAt: new Date(Date.now() - 86400000 * 21).toISOString(),
        clientName: 'Adil Mansouri',
        companyName: 'Atlas Capital Partners',
        clientEmail: 'adil@atlascapital.ma',
        clientPhone: '+212 668 119933',
        location: 'Rabat, Morocco',
        website: 'atlascapital.ma',
        budget: '25,000–49,999 MAD',
        timeline: '1–2 Months',
        services: ['Website Design & Development'],
        status: 'Won / Active Client',
        businessDescription: 'Boutique private equity and real estate investment firm.',
        notes: 'Contract signed for high-converting deal portal and portfolio showcases.',
        answers: { 'Security Requirements': 'High-level encryption & NDA client portals' }
      },
      {
        id: 'INQ-MED-88H',
        createdAt: new Date(Date.now() - 86400000 * 28).toISOString(),
        clientName: 'Samir Chaoui',
        companyName: 'Morocco Green Mobility',
        clientEmail: 'samir@greenmobility.ma',
        clientPhone: '+212 660 778899',
        location: 'Tangier Med Zone',
        website: 'greenmobility.ma',
        budget: '50,000+ MAD',
        timeline: '2–4 Weeks',
        services: ['Social Media Management'],
        status: 'Contacted',
        businessDescription: 'Electric vehicle charging and solar mobility operator.',
        notes: 'High-visibility thought leadership campaigns and B2B partner acquisition.',
        answers: { 'Primary Goal': 'Nationwide fleet expansion' }
      }
    ];
  }

  // Load Demo Leads
  if (btnLoadDemoLeads) {
    btnLoadDemoLeads.addEventListener('click', () => {
      localStorage.removeItem('motagrowth_inquiries_wiped');
      const demoLeads = getDefaultDemoInquiries();
      inquiries = [...demoLeads];
      saveInquiries(inquiries);
      renderAdminPortal();
      if (backupToolsModal) backupToolsModal.style.display = 'none';
      alert('Sample production leads successfully loaded!');
    });
  }

  // Clear Inquiries
  if (btnClearInquiries) {
    btnClearInquiries.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all inquiries? This action cannot be undone.')) {
        localStorage.setItem('motagrowth_inquiries_wiped', 'true');
        inquiries = [];
        saveInquiries(inquiries);
        renderAdminPortal();
        if (backupToolsModal) backupToolsModal.style.display = 'none';
      }
    });
  }

  // =========================================================================
  // CLIENT ONBOARDING & PASSCODE GENERATOR
  // =========================================================================

  function generateClientPasscode(companyName) {
    const cleanComp = (companyName || 'MOTA')
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase()
      .substring(0, 5) || 'CLIENT';
    const rand = Math.floor(100 + Math.random() * 900);
    return `MOTA-${cleanComp}-${rand}`;
  }

  const btnGenPasscode = document.getElementById('btnGenPasscode');
  if (btnGenPasscode) {
    btnGenPasscode.addEventListener('click', () => {
      const compInput = document.getElementById('newClientCompany')?.value;
      const passInput = document.getElementById('newClientPassword');
      if (passInput) passInput.value = generateClientPasscode(compInput);
    });
  }

  function openCreateClientModal() {
    createClientForm.reset();
    const passInput = document.getElementById('newClientPassword');
    if (passInput) passInput.value = generateClientPasscode('');
    createClientModal.style.display = 'flex';
  }

  function startLeadConversion(lead) {
    if (!lead) return;
    openCreateClientModal();

    if (document.getElementById('newClientName')) document.getElementById('newClientName').value = lead.clientName || '';
    if (document.getElementById('newClientCompany')) document.getElementById('newClientCompany').value = lead.companyName || '';
    if (document.getElementById('newClientEmail')) document.getElementById('newClientEmail').value = lead.clientEmail || '';
    if (document.getElementById('newClientPhone')) document.getElementById('newClientPhone').value = lead.clientPhone || '';

    const passInput = document.getElementById('newClientPassword');
    if (passInput) passInput.value = generateClientPasscode(lead.companyName);

    const mrrInput = document.getElementById('newClientRetainerMRR');
    if (mrrInput) mrrInput.value = parseLeadBudgetMAD(lead.budget);

    const summaryInput = document.getElementById('newClientSummary');
    if (summaryInput) summaryInput.value = lead.businessDescription || lead.notes || '';

    // Mark lead stage as Won / Active Client
    lead.status = 'Won / Active Client';
    saveInquiries(inquiries);
  }

  if (openNewClientModalBtn) {
    openNewClientModalBtn.addEventListener('click', openCreateClientModal);
  }
  if (closeCreateClientBtn) closeCreateClientBtn.addEventListener('click', () => createClientModal.style.display = 'none');
  if (cancelCreateClientBtn) cancelCreateClientBtn.addEventListener('click', () => createClientModal.style.display = 'none');

  if (createClientForm) {
    createClientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailVal = document.getElementById('newClientEmail').value.trim();
      const companyVal = document.getElementById('newClientCompany').value.trim();
      const clientNameVal = document.getElementById('newClientName').value.trim();
      const passwordVal = document.getElementById('newClientPassword').value.trim();
      const phoneVal = document.getElementById('newClientPhone')?.value.trim() || '';
      const retainerVal = Number(document.getElementById('newClientRetainerMRR')?.value) || 25000;

      const newClient = {
        id: 'CLI-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        createdAt: new Date().toISOString(),
        clientName: clientNameVal,
        companyName: companyVal,
        email: emailVal,
        username: emailVal,
        password: passwordVal,
        phone: phoneVal,
        retainerMRR: retainerVal,
        logo: '',
        servicesTier: document.getElementById('newClientServices').value,
        status: document.getElementById('newClientStatus').value,
        summary: document.getElementById('newClientSummary').value.trim(),
        approvals: [
          {
            id: 'APP-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
            title: 'Onboarding & Strategic Brief Approval',
            description: 'Confirmation of project scope, timelines, and communications channels.',
            status: 'Pending',
            createdAt: new Date().toISOString()
          }
        ],
        timeline: [
          {
            id: 'TL-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
            title: 'Kickoff Discovery & Assets Handover',
            date: 'Phase 1',
            status: 'In Progress'
          }
        ],
        ideas: [],
        files: [],
        tasks: [],
        calendarEvents: {},
        links: []
      };

      clients = loadClients();
      clients.unshift(newClient);
      saveClients(clients);
      createClientModal.style.display = 'none';
      createClientForm.reset();
      renderAdminPortal();

      // Show alert with 1-click details
      alert(`Client Workspace Created Successfully!\n\nCompany: ${newClient.companyName}\nClient: ${newClient.clientName}\nEmail: ${newClient.email}\nPasscode: ${newClient.password}\n\nYou can now share the WhatsApp onboarding invite with them in 1 click!`);
    });
  }

  // =========================================================================
  // ADMIN WORKSPACE MANAGER (CALENDAR, IDEAS/NOTES, DOCUMENTS, VALIDATIONS)
  // =========================================================================

  let adminCalYear = 2026;
  let adminCalMonth = 9; // October (0-indexed)
  let selectedAdminDate = '2026-10-12';
  const englishMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const d = parseInt(parts[2], 10);
        return `${englishMonthNames[m]} ${d}, ${y}`;
      }
    } catch (e) {}
    return dateStr;
  }

  function openManageClientModal(clientId) {
    activeEditingClientId = clientId;
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    manageClientTitle.textContent = `Workspace: ${client.companyName}`;
    manageClientSub.textContent = `Client: ${client.clientName} (${client.email})`;

    // Reset active subtab to calendar
    document.querySelectorAll('.client-editor-tabs .editor-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.client-editor-content .editor-pane').forEach(p => p.classList.remove('active'));
    document.querySelector('.client-editor-tabs .editor-tab[data-tab="calendar"]')?.classList.add('active');
    document.getElementById('paneCalendar')?.classList.add('active');

    renderAdminInteractiveCalendar(client);
    renderAdminMeetingsList(client);
    renderAdminIdeasList(client);
    renderAdminDocsList(client);
    renderEditorApprovals(client);
    renderEditorInfo(client);

    manageClientModal.style.display = 'flex';
    if (window.lucide) window.lucide.createIcons();
  }

  closeManageClientBtn.addEventListener('click', () => {
    manageClientModal.style.display = 'none';
    activeEditingClientId = null;
    renderAdminPortal();
  });

  // Sub-tabs in Manage Client Modal
  document.querySelectorAll('.client-editor-tabs .editor-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.client-editor-tabs .editor-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.client-editor-content .editor-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      if (target === 'calendar') document.getElementById('paneCalendar')?.classList.add('active');
      if (target === 'meetings') document.getElementById('paneMeetings')?.classList.add('active');
      if (target === 'ideas') document.getElementById('paneIdeas')?.classList.add('active');
      if (target === 'documents') document.getElementById('paneDocuments')?.classList.add('active');
      if (target === 'approvals') document.getElementById('paneApprovals')?.classList.add('active');
      if (target === 'info') document.getElementById('paneInfo')?.classList.add('active');
      if (window.lucide) window.lucide.createIcons();
    });
  });

  // 1. ADMIN INTERACTIVE CALENDAR
  function renderAdminInteractiveCalendar(client) {
    if (!client) return;
    if (!client.timeline) client.timeline = [];

    const monthTitleEl = document.getElementById('adminCalMonthTitle');
    const gridEl = document.getElementById('adminCalGrid');
    const headingEl = document.getElementById('adminSelectedDateHeading');

    if (monthTitleEl) {
      monthTitleEl.textContent = `${englishMonthNames[adminCalMonth]} ${adminCalYear}`;
    }

    if (headingEl) {
      headingEl.textContent = `Schedule Event for ${formatDisplayDate(selectedAdminDate)}`;
    }

    if (gridEl) {
      gridEl.innerHTML = '';
      const firstDayIndex = new Date(adminCalYear, adminCalMonth, 1).getDay();
      const totalDays = new Date(adminCalYear, adminCalMonth + 1, 0).getDate();

      // Empty cells before start of month
      for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'admin-cal-day-cell empty-day';
        gridEl.appendChild(emptyCell);
      }

      // Day cells 1..totalDays
      for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement('div');
        cell.className = 'admin-cal-day-cell';
        const dayStr = `${adminCalYear}-${String(adminCalMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        const dayNumberSpan = document.createElement('span');
        dayNumberSpan.className = 'cal-day-num';
        dayNumberSpan.textContent = day;
        cell.appendChild(dayNumberSpan);

        // Check if there is an event on this date
        const hasEvent = client.timeline.some(ev => {
          if (ev.rawDate === dayStr) return true;
          if (ev.date) {
            const evUpper = ev.date.toUpperCase();
            const engMonthUpper = englishMonthNames[adminCalMonth].toUpperCase();
            if ((evUpper.includes(engMonthUpper) || evUpper.includes(String(adminCalMonth + 1))) && evUpper.includes(String(day))) {
              return true;
            }
          }
          return false;
        });

        if (hasEvent) {
          cell.classList.add('has-event');
        }

        if (selectedAdminDate === dayStr) {
          cell.classList.add('is-selected');
        }

        cell.addEventListener('click', () => {
          selectedAdminDate = dayStr;
          renderAdminInteractiveCalendar(client);
        });

        gridEl.appendChild(cell);
      }
    }

    renderAdminCalendarList(client);
  }

  function renderAdminCalendarList(client) {
    const list = document.getElementById('editorCalendarList');
    if (!list) return;

    if (!client.timeline || client.timeline.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0;">Aucun événement planifié pour ce client. Cliquez sur une date du calendrier pour en ajouter.</p>`;
      return;
    }

    list.innerHTML = client.timeline.map(item => `
      <div class="editor-row-item">
        <div>
          <span style="font-size: 0.78rem; font-weight: 700; color: #0088ff; display: block; margin-bottom: 0.2rem;">
            ${escapeHtml(item.date || formatDisplayDate(item.rawDate))}
          </span>
          <strong style="display: block; color: #0f172a; font-size: 0.9rem;">${escapeHtml(item.title)}</strong>
          ${item.description ? `<p style="font-size: 0.82rem; color: var(--text-gray); margin-top: 0.2rem;">${escapeHtml(item.description)}</p>` : ''}
        </div>
        <button type="button" class="btn-ghost-small delete-cal-btn" data-id="${item.id}" title="Supprimer cet événement">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.delete-cal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const eventItem = (client.timeline || []).find(t => t.id === id);
        const eventDate = eventItem ? (eventItem.rawDate || eventItem.date) : '';

        client.timeline = client.timeline.filter(t => t.id !== id);

        if (client.calendarEvents) {
          Object.keys(client.calendarEvents).forEach(d => {
            client.calendarEvents[d] = (client.calendarEvents[d] || []).filter(ev => {
              if (ev.id === id) return false;
              if (eventDate && d === eventDate && (ev.title === eventItem?.title || ev.desc === eventItem?.description)) return false;
              return true;
            });
          });
        }

        saveClients(clients);
        renderAdminInteractiveCalendar(client);
        renderAdminCalendarList(client);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  const saveAdminCalEventBtn = document.getElementById('saveAdminCalEventBtn');
  if (saveAdminCalEventBtn) {
    saveAdminCalEventBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;

      const titleInput = document.getElementById('adminEventTitle');
      const descInput = document.getElementById('adminEventDesc');
      const title = (titleInput?.value || '').trim();
      const desc = (descInput?.value || '').trim();

      if (!title) {
        alert('Veuillez saisir un titre pour l\'événement.');
        titleInput?.focus();
        return;
      }

      if (!client.timeline) client.timeline = [];
      const displayDate = formatDisplayDate(selectedAdminDate);

      client.timeline.push({
        id: 'CAL-' + Date.now().toString(36),
        date: displayDate,
        rawDate: selectedAdminDate,
        title: title,
        description: desc,
        status: 'Scheduled'
      });

      if (titleInput) titleInput.value = '';
      if (descInput) descInput.value = '';

      saveClients(clients);
      renderAdminInteractiveCalendar(client);
    });
  }

  const adminCalPrevMonthBtn = document.getElementById('adminCalPrevMonthBtn');
  const adminCalNextMonthBtn = document.getElementById('adminCalNextMonthBtn');

  if (adminCalPrevMonthBtn) {
    adminCalPrevMonthBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (adminCalMonth === 0) {
        adminCalMonth = 11;
        adminCalYear--;
      } else {
        adminCalMonth--;
      }
      renderAdminInteractiveCalendar(client);
    });
  }

  if (adminCalNextMonthBtn) {
    adminCalNextMonthBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (adminCalMonth === 11) {
        adminCalMonth = 0;
        adminCalYear++;
      } else {
        adminCalMonth++;
      }
      renderAdminInteractiveCalendar(client);
    });
  }

  // 1.5 ADMIN MEETINGS & STRATEGY SYNCS
  function renderAdminMeetingsList(client) {
    const list = document.getElementById('editorMeetingsList');
    if (!list) return;

    if (!client.timeline) client.timeline = [];
    const meetings = client.timeline.filter(item => item.type === 'Meeting');

    if (meetings.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0;">Aucun rendez-vous planifié pour ce client.</p>`;
      return;
    }

    list.innerHTML = meetings.map(item => `
      <div class="editor-row-item">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <strong style="color: #0f172a; font-size: 0.88rem;">${escapeHtml(item.title)}</strong>
            <span class="type-chip meeting" style="font-size: 0.68rem; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #e0f2fe; color: #0284c7; font-weight: 700;">RDV</span>
            <span class="status-tag scheduled" style="font-size: 0.72rem;">${escapeHtml(item.status || 'Planifié')}</span>
          </div>
          <div style="font-size: 0.8rem; color: #0284c7; font-weight: 600; margin-top: 0.2rem;">
            ${escapeHtml(item.date || item.rawDate || 'Date non spécifiée')}
          </div>
          ${item.description ? `<p style="font-size: 0.82rem; color: var(--text-gray); margin-top: 0.2rem; margin-bottom: 0;">${escapeHtml(item.description)}</p>` : ''}
          ${item.link ? `<div style="margin-top: 0.3rem;"><a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" style="font-size: 0.78rem; color: #0088ff; text-decoration: underline; display: inline-flex; align-items: center; gap: 0.25rem;"><i data-lucide="video" style="width:12px;height:12px;"></i> Ouvrir le lien de réunion</a></div>` : ''}
        </div>
        <button type="button" class="btn-ghost-small delete-meet-btn" data-id="${item.id}" title="Supprimer ce rendez-vous">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.delete-meet-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const meetingItem = (client.timeline || []).find(t => t.id === id);
        const meetDate = meetingItem ? (meetingItem.rawDate || meetingItem.date) : '';

        client.timeline = client.timeline.filter(t => t.id !== id);
        
        if (client.calendarEvents) {
          Object.keys(client.calendarEvents).forEach(d => {
            client.calendarEvents[d] = (client.calendarEvents[d] || []).filter(ev => {
              if (ev.id === id) return false;
              if (meetDate && d === meetDate && (ev.type === 'Sync' || (ev.title && (ev.title.includes('Strategy Session') || ev.title.includes('Rendez-vous'))))) return false;
              return true;
            });
          });
        }

        inquiries = inquiries.filter(inq => {
          if (inq.type === 'MEETING') {
            const matches = (inq.clientEmail && client.email && inq.clientEmail.toLowerCase() === client.email.toLowerCase()) ||
                            (inq.companyName && client.companyName && inq.companyName.toLowerCase() === client.companyName.toLowerCase());
            if (matches && meetDate && inq.notes && inq.notes.includes(meetDate)) return false;
            if (inq.id === id || inq.id.toLowerCase() === id.toLowerCase()) return false;
          }
          return true;
        });
        saveInquiries(inquiries);

        saveClients(clients);
        renderAdminMeetingsList(client);
        renderAdminInteractiveCalendar(client);
        updateAdminKPIs();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  const saveAdminMeetBtn = document.getElementById('saveAdminMeetBtn');
  if (saveAdminMeetBtn) {
    saveAdminMeetBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;

      const titleInput = document.getElementById('adminMeetTitle');
      const typeInput = document.getElementById('adminMeetType');
      const dateInput = document.getElementById('adminMeetDate');
      const timeInput = document.getElementById('adminMeetTime');
      const linkInput = document.getElementById('adminMeetLink');
      const agendaInput = document.getElementById('adminMeetAgenda');

      const title = (titleInput?.value || '').trim();
      const format = typeInput?.value || '30-min Growth Review';
      const date = dateInput?.value || selectedAdminDate;
      const time = (timeInput?.value || '').trim() || '14:30';
      const link = (linkInput?.value || '').trim();
      const agenda = (agendaInput?.value || '').trim();

      if (!title) {
        alert('Veuillez entrer un titre pour la session.');
        return;
      }
      if (!date) {
        alert('Veuillez sélectionner une date pour le rendez-vous.');
        return;
      }

      if (!client.timeline) client.timeline = [];
      if (!client.calendarEvents) client.calendarEvents = {};
      if (!client.calendarEvents[date]) client.calendarEvents[date] = [];

      const meetId = 'MEET-' + Date.now().toString(36);
      const displayDate = typeof formatDisplayDate === 'function' ? formatDisplayDate(date) : date;

      // Add to timeline
      client.timeline.unshift({
        id: meetId,
        date: displayDate,
        rawDate: date,
        title: `Rendez-vous : ${title} (${format})`,
        description: `${time}${agenda ? ` — ${agenda}` : ''}`,
        link: link,
        type: 'Meeting',
        status: 'Scheduled'
      });

      // Add to calendarEvents
      client.calendarEvents[date].push({
        id: meetId,
        title: `${title} (${format})`,
        type: 'Sync',
        time: time,
        desc: agenda || 'Session planifiée par l\'administrateur',
        link: link
      });

      if (titleInput) titleInput.value = '';
      if (dateInput) dateInput.value = '';
      if (timeInput) timeInput.value = '';
      if (linkInput) linkInput.value = '';
      if (agendaInput) agendaInput.value = '';

      saveClients(clients);
      renderAdminMeetingsList(client);
      renderAdminInteractiveCalendar(client);
    });
  }

  // 2. ADMIN IDEAS & NOTES BANK
  function renderAdminIdeasList(client) {
    const list = document.getElementById('editorIdeasList');
    if (!list) return;

    if (!client.ideas || client.ideas.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0;">Aucune proposition ou note stratégique enregistrée pour ce client.</p>`;
      return;
    }

    list.innerHTML = client.ideas.map(item => `
      <div class="editor-idea-card">
        <div style="flex: 1;">
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
            <span class="idea-cat-tag">${escapeHtml(item.category || 'Stratégie')}</span>
            <span class="status-tag ${(item.priority || 'medium').toLowerCase()}" style="font-size: 0.72rem; padding: 0.15rem 0.5rem;">
              Priorité: ${escapeHtml(item.priority || 'Moyenne')}
            </span>
            ${item.date ? `<span style="font-size: 0.75rem; color: #94a3b8;">${escapeHtml(item.date)}</span>` : ''}
          </div>
          <strong style="color: #0f172a; font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">${escapeHtml(item.title)}</strong>
          <p style="font-size: 0.84rem; color: #475569; line-height: 1.45; margin: 0;">${escapeHtml(item.description || item.desc || '')}</p>
          ${item.impact ? `<div style="font-size: 0.78rem; color: #0088ff; font-weight: 600; margin-top: 0.35rem;">Impact: ${escapeHtml(item.impact)}</div>` : ''}
        </div>
        <button type="button" class="btn-ghost-small delete-idea-btn" data-id="${item.id}" title="Supprimer cette idée">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.delete-idea-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        client.ideas = client.ideas.filter(i => i.id !== id);
        saveClients(clients);
        renderAdminIdeasList(client);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  const saveAdminIdeaBtn = document.getElementById('saveAdminIdeaBtn');
  if (saveAdminIdeaBtn) {
    saveAdminIdeaBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;

      const titleInput = document.getElementById('adminIdeaTitle');
      const catInput = document.getElementById('adminIdeaCategory');
      const prioInput = document.getElementById('adminIdeaPriority');
      const impactInput = document.getElementById('adminIdeaImpact');
      const descInput = document.getElementById('adminIdeaDesc');

      const title = (titleInput?.value || '').trim();
      const category = catInput?.value || 'Concept Créatif & UX';
      const priority = prioInput?.value || 'Medium';
      const impact = (impactInput?.value || '').trim();
      const desc = (descInput?.value || '').trim();

      if (!title || !desc) {
        alert('Veuillez renseigner au minimum un titre et une description.');
        return;
      }

      if (!client.ideas) client.ideas = [];
      const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

      client.ideas.unshift({
        id: 'IDEA-' + Date.now().toString(36),
        title: title,
        category: category,
        priority: priority,
        impact: impact || 'Recommandation Stratégique MotaGrowth',
        description: desc,
        desc: desc,
        date: dateStr,
        status: 'Pending'
      });

      if (titleInput) titleInput.value = '';
      if (impactInput) impactInput.value = '';
      if (descInput) descInput.value = '';

      saveClients(clients);
      renderAdminIdeasList(client);
    });
  }

  const clearPremadeIdeasBtn = document.getElementById('clearPremadeIdeasBtn');
  if (clearPremadeIdeasBtn) {
    clearPremadeIdeasBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;
      client.ideas = [];
      saveClients(clients);
      renderAdminIdeasList(client);
    });
  }

  // 3. ADMIN DOCUMENTS & FILE UPLOADS
  const adminDocFileInput = document.getElementById('adminDocFileInput');
  const adminDocTitleInput = document.getElementById('adminDocTitle');
  const adminDocSizeInput = document.getElementById('adminDocSize');
  const uploadAdminDocBtn = document.getElementById('uploadAdminDocBtn');

  if (adminDocFileInput) {
    adminDocFileInput.addEventListener('change', () => {
      const file = adminDocFileInput.files[0];
      if (file) {
        if (adminDocTitleInput && !adminDocTitleInput.value) {
          adminDocTitleInput.value = file.name;
        }
        if (adminDocSizeInput) {
          let sizeStr = '';
          if (file.size < 1024 * 1024) {
            sizeStr = `${Math.round(file.size / 1024)} KB`;
          } else {
            sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
          }
          adminDocSizeInput.value = sizeStr;
        }
      }
    });
  }

  function renderAdminDocsList(client) {
    const list = document.getElementById('editorDocsList');
    if (!list) return;

    if (!client.files || client.files.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0;">Aucun document téléversé pour ce client.</p>`;
      return;
    }

    list.innerHTML = client.files.map(doc => {
      const name = doc.name || doc.title || 'Document';
      const isPdf = name.toLowerCase().endsWith('.pdf');
      const isZip = name.toLowerCase().endsWith('.zip');
      const isFigma = name.toLowerCase().endsWith('.fig') || doc.type === 'figma';
      
      let icon = 'file-text';
      if (isPdf) icon = 'file-check';
      if (isZip) icon = 'archive';
      if (isFigma) icon = 'layout';

      return `
        <div class="editor-doc-item">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 0;">
            <div class="doc-icon-badge">
              <i data-lucide="${icon}"></i>
            </div>
            <div style="min-width: 0;">
              <strong style="display: block; font-size: 0.88rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${escapeHtml(name)}
              </strong>
              <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.15rem; display: flex; gap: 0.5rem; align-items: center;">
                <span class="category-tag" style="font-size: 0.7rem; padding: 0.1rem 0.4rem;">${escapeHtml(doc.category || 'Général')}</span>
                <span>${escapeHtml(doc.size || '1.0 MB')}</span>
                <span>• ${escapeHtml(doc.date || 'Oct 2026')}</span>
              </div>
            </div>
          </div>
          <button type="button" class="btn-ghost-small delete-doc-btn" data-id="${doc.id}" title="Supprimer ce document">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.delete-doc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        client.files = client.files.filter(f => f.id !== id);
        saveClients(clients);
        renderAdminDocsList(client);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  if (uploadAdminDocBtn) {
    uploadAdminDocBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;

      const file = adminDocFileInput?.files[0];
      const title = (adminDocTitleInput?.value || '').trim() || (file ? file.name : '');
      const category = document.getElementById('adminDocCategory')?.value || 'Contrats & Accords';
      const sizeVal = (adminDocSizeInput?.value || '').trim() || '1.2 MB';

      if (!title) {
        alert('Veuillez sélectionner un fichier ou entrer un nom de document.');
        return;
      }

      if (!client.files) client.files = [];
      const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

      client.files.unshift({
        id: 'FILE-' + Date.now().toString(36),
        name: title,
        title: title,
        category: category,
        size: sizeVal,
        date: dateStr,
        type: title.toLowerCase().endsWith('.pdf') ? 'pdf' : (title.toLowerCase().endsWith('.doc') ? 'doc' : 'file'),
        downloadName: title,
        url: '#'
      });

      if (adminDocFileInput) adminDocFileInput.value = '';
      if (adminDocTitleInput) adminDocTitleInput.value = '';
      if (adminDocSizeInput) adminDocSizeInput.value = '';

      saveClients(clients);
      renderAdminDocsList(client);
    });
  }

  // 4. ADMIN VALIDATIONS / APPROVALS
  function renderEditorApprovals(client) {
    const list = document.getElementById('editorApprovalsList');
    if (!list) return;

    if (!client.approvals || client.approvals.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0;">Aucune validation en attente pour ce client.</p>`;
      return;
    }

    list.innerHTML = client.approvals.map(item => `
      <div class="editor-row-item">
        <div>
          <strong style="color: #0f172a; font-size: 0.88rem;">${escapeHtml(item.title)}</strong>
          <span class="status-tag ${(item.status || 'pending').toLowerCase().replace(/\s+/g, '-')}" style="margin-left: 0.5rem; font-size: 0.72rem;">${escapeHtml(item.status || 'En attente')}</span>
          ${item.description ? `<p style="font-size: 0.82rem; color: var(--text-gray); margin-top: 0.2rem;">${escapeHtml(item.description)}</p>` : ''}
        </div>
        <button type="button" class="btn-ghost-small delete-appr-btn" data-id="${item.id}" title="Supprimer cette validation">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.delete-appr-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        client.approvals = client.approvals.filter(a => a.id !== id);
        saveClients(clients);
        renderEditorApprovals(client);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  const saveAdminApprovalBtn = document.getElementById('saveAdminApprovalBtn');
  if (saveAdminApprovalBtn) {
    saveAdminApprovalBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;

      const titleInput = document.getElementById('adminApprovalTitle');
      const descInput = document.getElementById('adminApprovalDesc');
      const title = (titleInput?.value || '').trim();
      const desc = (descInput?.value || '').trim();

      if (!title) {
        alert('Veuillez entrer un titre pour la validation.');
        return;
      }

      if (!client.approvals) client.approvals = [];
      client.approvals.push({
        id: 'APP-' + Date.now().toString(36),
        title: title,
        description: desc,
        status: 'En attente'
      });

      if (titleInput) titleInput.value = '';
      if (descInput) descInput.value = '';

      saveClients(clients);
      renderEditorApprovals(client);
    });
  }

  // 5. ADMIN INFO & SCOPE OF WORK + LOGO MANAGEMENT
  const manageClientLogoInput = document.getElementById('manageClientLogoInput');
  const manageClientLogoImg = document.getElementById('manageClientLogoImg');
  const manageClientLogoDefaultIcon = document.getElementById('manageClientLogoDefaultIcon');
  const removeManageClientLogoBtn = document.getElementById('removeManageClientLogoBtn');

  if (manageClientLogoInput) {
    manageClientLogoInput.addEventListener('change', (e) => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        client.logo = evt.target.result;
        saveClients(clients);
        renderEditorInfo(client);
        renderClientsGrid();
      };
      reader.readAsDataURL(file);
    });
  }

  if (removeManageClientLogoBtn) {
    removeManageClientLogoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;
      client.logo = '';
      if (manageClientLogoInput) manageClientLogoInput.value = '';
      saveClients(clients);
      renderEditorInfo(client);
      renderClientsGrid();
    });
  }

  function renderEditorInfo(client) {
    const summaryEl = document.getElementById('editorProjectSummary');
    const linksEl = document.getElementById('editorSharedLinks');
    if (summaryEl) summaryEl.value = client.summary || '';
    if (linksEl) {
      const linksText = (client.links || []).map(l => `${l.label}: ${l.url}`).join('\n');
      linksEl.value = linksText;
    }

    if (manageClientLogoImg && manageClientLogoDefaultIcon && removeManageClientLogoBtn) {
      if (client.logo) {
        manageClientLogoImg.src = client.logo;
        manageClientLogoImg.style.display = 'block';
        manageClientLogoDefaultIcon.style.display = 'none';
        removeManageClientLogoBtn.style.display = 'inline-flex';
      } else {
        manageClientLogoImg.src = '';
        manageClientLogoImg.style.display = 'none';
        manageClientLogoDefaultIcon.style.display = 'block';
        removeManageClientLogoBtn.style.display = 'none';
      }
    }
  }

  const saveProjectInfoBtn = document.getElementById('saveProjectInfoBtn');
  if (saveProjectInfoBtn) {
    saveProjectInfoBtn.addEventListener('click', () => {
      const client = clients.find(c => c.id === activeEditingClientId);
      if (!client) return;

      client.summary = document.getElementById('editorProjectSummary')?.value.trim() || '';
      const rawLinks = (document.getElementById('editorSharedLinks')?.value || '').trim().split('\n');
      
      client.links = rawLinks
        .filter(line => line.includes(':'))
        .map(line => {
          const parts = line.split(/:\s*(.+)/);
          return { label: parts[0].trim(), url: parts[1].trim() };
        });

      saveClients(clients);
      alert('Cahier des charges et liens mis à jour !');
    });
  }

  // =========================================================================
  // 6. DATA PERSISTENCE & SEEDING
  // =========================================================================

  function loadInquiries() {
    try {
      if (localStorage.getItem('motagrowth_inquiries_wiped') === 'true') {
        return [];
      }
      const data = localStorage.getItem(STORAGE_INQUIRIES);
      if (data !== null) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.filter(item => 
            item &&
            item.companyName !== 'Orsap' && 
            item.companyName !== 'ORSAP' && 
            !(item.id && (item.id === 'DEVIS-001' || item.id === 'DEVIS-002' || item.id === 'DEVIS-003' || item.id === 'DEVIS-004')) &&
            !(item.sector && item.sector.includes('BTP')) && 
            !(item.services && JSON.stringify(item.services).includes('PROTECTION')) &&
            item.type !== 'PARTICULIER'
          );
          if (valid.length > 0) return valid;
        }
      }
    } catch (e) { console.error(e); }
    const seeds = getSeedInquiries();
    saveInquiries(seeds);
    return seeds;
  }

  function saveInquiries(arr) {
    try { localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(arr)); }
    catch (e) { console.error(e); }
  }

  function loadClients() {
    try {
      const data = localStorage.getItem(STORAGE_CLIENTS);
      if (data !== null) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) { console.error(e); }
    const seeds = getSeedClients();
    saveClients(seeds);
    return seeds;
  }

  function saveClients(arr) {
    try {
      localStorage.setItem(STORAGE_CLIENTS, JSON.stringify(arr));
      if (loggedInClient && loggedInClient.id) {
        const fresh = arr.find(c => c.id === loggedInClient.id);
        if (fresh) loggedInClient = fresh;
      }
      if (typeof window._motaRefreshPortal === 'function') {
        window._motaRefreshPortal();
      }
    }
    catch (e) { console.error(e); }
  }

  function getTimelineItemDateKey(item) {
    if (!item) return null;
    if (item.rawDate && /^\d{4}-\d{2}-\d{2}$/.test(item.rawDate)) {
      return item.rawDate;
    }
    let str = item.date || item.dateDisplay || '';
    if (!str) return null;
    str = str.split('•')[0].split('<br>')[0].trim();
    
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      return str;
    }

    const dmyMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmyMatch) {
      return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`;
    }

    const frMonths = {
      'janv': 1, 'janvier': 1, 'january': 1, 'jan': 1,
      'févr': 2, 'fevr': 2, 'février': 2, 'fevrier': 2, 'february': 2, 'feb': 2,
      'mars': 3, 'march': 3, 'mar': 3,
      'avril': 4, 'april': 4, 'avr': 4, 'apr': 4,
      'mai': 5, 'may': 5,
      'juin': 6, 'june': 6, 'jun': 6,
      'juil': 7, 'juillet': 7, 'july': 7, 'jul': 7,
      'août': 8, 'aout': 8, 'august': 8, 'aug': 8,
      'sept': 9, 'septembre': 9, 'september': 9, 'sep': 9,
      'oct': 10, 'octobre': 10, 'october': 10,
      'nov': 11, 'novembre': 11, 'november': 11,
      'déc': 12, 'dec': 12, 'décembre': 12, 'decembre': 12, 'december': 12
    };

    const mMatch = str.toLowerCase().replace(/,/g, '').split(/\s+/);
    if (mMatch.length >= 3) {
      if (!isNaN(parseInt(mMatch[0], 10)) && isNaN(parseInt(mMatch[1], 10))) {
        const d = String(parseInt(mMatch[0], 10)).padStart(2, '0');
        const cleanMonth = mMatch[1].replace('.', '');
        const mNum = frMonths[cleanMonth];
        const y = mMatch[2];
        if (mNum && y && y.length === 4) {
          return `${y}-${String(mNum).padStart(2, '0')}-${d}`;
        }
      }
      if (isNaN(parseInt(mMatch[0], 10)) && !isNaN(parseInt(mMatch[1], 10))) {
        const cleanMonth = mMatch[0].replace('.', '');
        const mNum = frMonths[cleanMonth];
        const d = String(parseInt(mMatch[1], 10)).padStart(2, '0');
        const y = mMatch[2];
        if (mNum && y && y.length === 4) {
          return `${y}-${String(mNum).padStart(2, '0')}-${d}`;
        }
      }
    }

    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
      const y = parsed.getFullYear();
      const m = String(parsed.getMonth() + 1).padStart(2, '0');
      const d = String(parsed.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    return null;
  }

  function getSeedInquiries() {
    return getDefaultDemoInquiries();
  }

  function getSeedClients() {
    return [
            {
        id: 'CLI-ORSAP',
        createdAt: new Date().toISOString(),
        clientName: 'Karim Bennani',
        companyName: 'Orsap.ma',
        email: 'karim@orsap.ma',
        username: 'orsap',
        password: 'growth2026',
        servicesTier: 'Digital Commerce Scale Retainer',
        status: 'Active',
        summary: 'Full-funnel digital commerce architecture, custom headless storefront, and automated paid traffic scaling across Meta and Google.',
        director: {
          name: 'Mohamed Tazi',
          role: 'Managing Director & Lead Strategist'
        },
        files: [
          {
            id: 'FILE-ORSAP-1',
            name: 'Orsap_Digital_Commerce_Architecture_Spec.pdf',
            category: '02_Web_Prototypes',
            size: '12.4 MB',
            date: 'Nov 01, 2026',
            url: 'https://drive.google.com',
            type: 'pdf'
          },
          {
            id: 'FILE-ORSAP-2',
            name: 'Orsap_Checkout_CRO_Audit_and_Roadmap.pdf',
            category: '04_Ad_Creatives_Copy',
            size: '4.2 MB',
            date: 'Oct 28, 2026',
            url: 'https://drive.google.com',
            type: 'pdf'
          }
        ],
        contentSchedule: [
          {
            id: 'SCHED-ORSAP-1',
            platform: 'Meta Ads',
            publishDate: '2026-11-10T12:00:00Z',
            postCopy: 'Q4 Black Friday Advantage+ Acquisition Funnel',
            creativeTitle: 'Storefront Launch Visuals'
          }
        ],
        tasks: [
          {
            id: 'TASK-ORSAP-1',
            title: 'Headless Storefront Architecture & Speed Optimization',
            tag: 'Web Architecture',
            category: 'web',
            assignedTo: 'Lead Creative Engineer',
            status: 'Completed',
            dueDate: 'Nov 02, 2026',
            timelineIndex: 1
          },
          {
            id: 'TASK-ORSAP-2',
            title: 'Checkout Funnel CRO Audit & Pixel CAPI Deployment',
            tag: 'Attribution',
            category: 'marketing',
            assignedTo: 'Mohamed Tazi',
            status: 'Completed',
            dueDate: 'Nov 03, 2026',
            timelineIndex: 2
          },
          {
            id: 'TASK-ORSAP-3',
            title: 'Meta Ads Q4 Scaling Funnel & Retargeting Setup',
            tag: 'Paid Ads',
            category: 'marketing',
            assignedTo: 'Performance Strategist',
            status: 'In Production',
            dueDate: 'Nov 12, 2026',
            timelineIndex: 3
          }
        ],
        ideas: [
          {
            id: 'IDEA-ORSAP-1',
            title: '1-Click WhatsApp Instant Checkout for High-Intent Traffic',
            platform: 'CRO / Growth',
            description: 'Direct transaction routing from mobile landing pages to sales rep for orders over 500 MAD.',
            impact: 'High',
            effort: 'Low',
            votes: 14,
            status: 'Approved'
          }
        ],
        meetings: [
          {
            id: 'MEET-ORSAP-1',
            title: 'Q4 Paid Media Attribution & Black Friday Scale Review',
            datetime: '2026-11-04T15:30:00Z',
            platform: 'WhatsApp Video Conference',
            link: 'https://wa.me/34675194956',
            status: 'Confirmed'
          }
        ]
      },
      {
        id: 'CLI-TG2D',
        createdAt: new Date().toISOString(),
        clientName: 'Youssef Alami',
        companyName: 'TG2D',
        email: 'youssef@tg2d.com',
        username: 'tg2d',
        password: 'growth2026',
        servicesTier: 'Enterprise Brand Experience',
        status: 'Active',
        summary: 'Corporate repositioning, executive digital platform, and institutional credentials kit for European tenders.',
        director: {
          name: 'Mohamed Tazi',
          role: 'Managing Director & Lead Strategist'
        },
        files: [
          {
            id: 'FILE-TG2D-1',
            name: 'TG2D_Corporate_Identity_System.pdf',
            category: '01_Brand_Identity',
            size: '22.8 MB',
            date: 'Oct 25, 2026',
            url: 'https://drive.google.com',
            type: 'pdf'
          }
        ],
        contentSchedule: [],
        tasks: [
          {
            id: 'TASK-TG2D-1',
            title: 'Corporate Identity System & Guidelines',
            tag: 'Branding',
            category: 'brand',
            assignedTo: 'Creative Director',
            status: 'Completed',
            dueDate: 'Oct 28, 2026',
            timelineIndex: 1
          },
          {
            id: 'TASK-TG2D-2',
            title: 'Executive Digital Experience Web Platform',
            tag: 'Web Platform',
            category: 'web',
            assignedTo: 'Senior Frontend Dev',
            status: 'Completed',
            dueDate: 'Nov 01, 2026',
            timelineIndex: 2
          }
        ],
        ideas: [],
        meetings: [
          {
            id: 'MEET-TG2D-1',
            title: 'Executive Pitch Deck Review & Tender Credentials Sign-off',
            datetime: '2026-11-05T11:00:00Z',
            platform: 'WhatsApp Video Conference',
            link: 'https://wa.me/34675194956',
            status: 'Confirmed'
          }
        ]
      },
      {
        id: 'CLI-CRECHE',
        createdAt: new Date().toISOString(),
        clientName: 'Sanaa Cherkaoui',
        companyName: 'La Centrale Crèche',
        email: 'direction@lacentralecreche.ma',
        username: 'creche',
        password: 'growth2026',
        servicesTier: 'Authority & Admissions Acquisition',
        status: 'Active',
        summary: 'Community-first digital presence, local SEO authority, and automated admissions WhatsApp workflow.',
        director: {
          name: 'Mohamed Tazi',
          role: 'Managing Director & Lead Strategist'
        },
        files: [],
        contentSchedule: [],
        tasks: [
          {
            id: 'TASK-CRECHE-1',
            title: 'Admission Funnel Web Presence & Parent Portal',
            tag: 'Web Experience',
            category: 'web',
            assignedTo: 'Lead Designer',
            status: 'Completed',
            dueDate: 'Oct 20, 2026',
            timelineIndex: 1
          },
          {
            id: 'TASK-CRECHE-2',
            title: 'Casablanca Local Search Authority & Google Maps Placement',
            tag: 'SEO & Inbound',
            category: 'marketing',
            assignedTo: 'SEO Strategist',
            status: 'Completed',
            dueDate: 'Oct 30, 2026',
            timelineIndex: 2
          }
        ],
        ideas: [],
        meetings: []
      },
{
        id: 'CLI-VELOUR',
        createdAt: new Date().toISOString(),
        clientName: 'Elena Rostova',
        companyName: 'Velour Luxury Apparel',
        email: 'elena@velourclothing.co',
        username: 'velour',
        password: 'growth2026',
        servicesTier: 'Full-Service Growth Retainer',
        status: 'Active',
        summary: 'Full-funnel luxury brand scaling program including custom 3D flagship web experience, organic TikTok virality engine, and Advantage+ Meta performance marketing.',
        director: {
          name: 'Marcus Vance',
          role: 'Senior Growth & Creative Director'
        },
        files: [
          {
            id: 'FILE-1',
            name: 'Velour_Master_Brand_Guidelines_v3.pdf',
            category: '01_Brand_Identity',
            size: '14.8 MB',
            date: 'Oct 01, 2026',
            url: 'https://drive.google.com',
            type: 'pdf'
          },
          {
            id: 'FILE-2',
            name: 'Velour_Vector_Logos_Master_Pack.zip',
            category: '01_Brand_Identity',
            size: '32.5 MB',
            date: 'Sep 28, 2026',
            url: 'https://drive.google.com',
            type: 'zip'
          },
          {
            id: 'FILE-3',
            name: 'Velour_3D_Flagship_Figma_Kit.fig',
            category: '02_Web_Prototypes',
            size: '48.2 MB',
            date: 'Oct 04, 2026',
            url: 'https://figma.com',
            type: 'figma'
          },
          {
            id: 'FILE-4',
            name: 'Autumn_Lookbook_Raw_4K_B-Roll.zip',
            category: '03_Video_Assets_4K',
            size: '2.4 GB',
            date: 'Oct 02, 2026',
            url: 'https://drive.google.com',
            type: 'video'
          },
          {
            id: 'FILE-5',
            name: 'Q4_Meta_TikTok_Viral_Scripts.docx',
            category: '04_Ad_Creatives_Copy',
            size: '1.8 MB',
            date: 'Oct 03, 2026',
            url: 'https://docs.google.com',
            type: 'doc'
          },
          {
            id: 'FILE-6',
            name: 'MotaGrowth_SOW_October_Retainer.pdf',
            category: '05_Contracts_Invoices',
            size: '420 KB',
            date: 'Sep 25, 2026',
            url: 'https://drive.google.com',
            type: 'pdf'
          }
        ],
        contentSchedule: [
          {
            id: 'SCHED-1',
            platform: 'TikTok',
            dateDisplay: 'OCT 08, 2026 • 6:30 PM EST',
            title: 'Behind the Silk: Italian Atelier Craftsmanship',
            caption: '38s Macro-fabric ASMR reel with trending luxury audio hook and atelier process narrative.',
            status: 'Ready to Publish',
            previewUrl: 'https://tiktok.com'
          },
          {
            id: 'SCHED-2',
            platform: 'Instagram',
            dateDisplay: 'OCT 11, 2026 • 12:00 PM EST',
            title: 'Autumn Capsule 01: Midnight Silhouette Lookbook',
            caption: '7-slide carousel featuring model editorial studio shots, texture highlights, and product tag links.',
            status: 'Scheduled',
            previewUrl: 'https://instagram.com'
          },
          {
            id: 'SCHED-3',
            platform: 'Meta',
            dateDisplay: 'OCT 14, 2026 • 9:00 AM EST',
            title: 'Advantage+ Dynamic Catalog: Velvet Bomber Showcase',
            caption: 'High-contrast video ad test targeting Tier-1 luxury demographics with 1-click cart drawer hook.',
            status: 'In Creative Review',
            previewUrl: 'https://facebook.com'
          },
          {
            id: 'SCHED-4',
            platform: 'TikTok',
            dateDisplay: 'OCT 18, 2026 • 7:15 PM EST',
            title: 'Reverse Quality Test: $80 vs $450 Trench Coat',
            caption: 'Viral comparison hook with macro stitching analysis and unboxing experience breakdown.',
            status: 'Scheduled',
            previewUrl: 'https://tiktok.com'
          },
          {
            id: 'SCHED-5',
            platform: 'Instagram',
            dateDisplay: 'OCT 22, 2026 • 1:00 PM EST',
            title: 'VIP Pre-Sale Access Invitation Story & Drop',
            caption: 'Gated VIP preview story sticker & dynamic lookbook link for top 1,000 tier-1 customers.',
            status: 'Scheduled',
            previewUrl: 'https://instagram.com'
          }
        ],
        timeline: [
          {
            id: 'CAL-1',
            date: 'OCTOBER 15, 2026',
            title: 'Website Alpha Staging Launch',
            description: 'Private client preview of 3D interactive hero, dynamic lookbook, and high-conversion sliding checkout drawer.',
            status: 'Upcoming'
          },
          {
            id: 'CAL-2',
            date: 'OCTOBER 22, 2026',
            title: 'Autumn Campaign Live Kickoff',
            description: 'Dispersal of Meta dynamic ads & TikTok Creator Spark collaborations across tier-1 luxury demographics.',
            status: 'Scheduled'
          },
          {
            id: 'CAL-3',
            date: 'NOVEMBER 05, 2026',
            title: 'VIP Black Friday Early Drop',
            description: 'Gated preview launch for top 1,000 tier-1 VIP customers with bespoke discount tokens.',
            status: 'Upcoming'
          }
        ],
        ideas: [
          {
            id: 'IDEA-1',
            rank: 1,
            priority: 'High',
            category: 'Website & 3D UX',
            date: 'Oct 04, 2026',
            title: 'Interactive 3D Lookbook with Instant Swipe-to-Cart',
            description: 'High-converting interactive experience allowing VIP shoppers to explore curated seasonal outfits with fluid 3D fabric physics and a 1-click sliding checkout drawer.',
            impact: '+35% Mobile Conversion & $42k/mo Added GMV',
            assetLink: { label: 'Preview Figma Interactive Prototype', url: 'https://figma.com' },
            status: 'Pending',
            clientFeedback: null
          },
          {
            id: 'IDEA-2',
            rank: 2,
            priority: 'High',
            category: 'Paid Growth & Ads',
            date: 'Oct 03, 2026',
            title: 'Meta Advantage+ Dynamic Retargeting Architecture',
            description: 'Full revamp of Meta catalog ad sets using bespoke cinematic product overlays, urgency badges, and custom review carousels.',
            impact: '3.8x Target ROAS & 22% Lower Customer Acquisition Cost',
            assetLink: { label: 'View Ad Creatives & Motion Storyboard', url: 'https://drive.google.com' },
            status: 'Approved',
            clientFeedback: null
          },
          {
            id: 'IDEA-3',
            rank: 3,
            priority: 'Medium',
            category: 'Viral Video Production',
            date: 'Oct 02, 2026',
            title: '15-Part Behind-The-Atelier Artisanal Documentary Reels',
            description: 'Short-form episodic series documenting the raw craftsmanship, luxury Italian textiles, and studio design process to establish undeniable heritage authority.',
            impact: '500k+ Organic Views & Brand Prestige Elevation',
            assetLink: { label: 'Review Video Script Batch (PDF)', url: '#' },
            status: 'Needs Detail',
            clientFeedback: {
              topic: 'Timeline & Rollout Schedule Details',
              note: 'Could we schedule 5 reels before the Autumn drop, and ensure sound design uses trending luxury audio?',
              date: 'Oct 04, 2026'
            }
          },
          {
            id: 'IDEA-4',
            rank: 4,
            priority: 'Low',
            category: 'Brand Strategy',
            date: 'Sep 29, 2026',
            title: 'Custom Unboxing NFC Smart Card Authentication',
            description: 'Embedded NFC micro-tags inside garment tags directing buyers to private editorial drops and authenticity certificates.',
            impact: 'Premium Customer Retention & Secondary Market Verification',
            assetLink: null,
            status: 'Pending',
            clientFeedback: null
          }
        ],
        concepts: [
          {
            id: 'CON-1',
            tag: 'VIRAL HOOK',
            title: '"The Unseen Flaw" Reverse Hook Experiment',
            desc: 'High-retention reel opening with extreme close-ups examining luxury stitching compared against generic fast-fashion items.',
            impact: 'Estimated Reach: 250k+'
          },
          {
            id: 'CON-2',
            tag: 'A/B TEST',
            title: 'Sticky Micro-Cart vs Slide-Out Drawer Funnel',
            desc: 'Split-testing streamlined mobile checkout velocity to eliminate cart abandonment during high-traffic ad spikes.',
            impact: '+18% Checkout Speed'
          },
          {
            id: 'CON-3',
            tag: 'CREATIVE DIRECTION',
            title: 'Obsidian & Warm Champagne Visual Palette',
            desc: 'Ultra-minimalist aesthetic system designed to evoke old-money European luxury while remaining hyper-modern.',
            impact: 'Brand Prestige'
          }
        ],
        links: [
          { label: 'Figma UI Kit & Design System', url: 'https://figma.com', icon: 'layout' },
          { label: 'Shared Google Drive Brand Assets', url: 'https://drive.google.com', icon: 'folder' },
          { label: '4K Raw Video & B-Roll Vault', url: 'https://drive.google.com', icon: 'film' },
          { label: 'High-Converting Ad Copy Vault', url: '#', icon: 'file-text' },
          { label: 'Brand Guidelines & Motion Specs PDF', url: '#', icon: 'file-check' }
        ]
      },
      {
        id: 'CLI-LUMINA',
        createdAt: new Date().toISOString(),
        clientName: 'Liam Thorne',
        companyName: 'Lumina Health & Wellness',
        email: 'liam@luminahealth.co',
        username: 'lumina',
        password: 'growth2026',
        servicesTier: 'Performance Marketing & Brand Scaling',
        status: 'Active',
        summary: 'Direct-to-consumer nutraceutical brand scaling via viral short-form video creative and multi-channel acquisition funnels.',
        director: {
          name: 'Marcus Vance',
          role: 'Senior Growth & Creative Director'
        },
        files: [
          {
            id: 'FILE-L1',
            name: 'Lumina_Q4_Paid_Media_Strategy.pdf',
            category: '04_Ad_Creatives_Copy',
            size: '8.4 MB',
            date: 'Oct 04, 2026',
            url: 'https://drive.google.com',
            type: 'pdf'
          },
          {
            id: 'FILE-L2',
            name: 'Lumina_Brand_Assets_Pack.zip',
            category: '01_Brand_Identity',
            size: '64.2 MB',
            date: 'Oct 02, 2026',
            url: 'https://drive.google.com',
            type: 'zip'
          }
        ],
        tasks: [
          {
            id: 'TASK-L1',
            title: 'Review Meta Ad Creatives Batch 3',
            desc: 'Inspect 6 video ad hooks and copy variations for the Q4 sale launch.',
            badge: 'Action Needed',
            badgeClass: 'badge-action-needed',
            completed: false
          },
          {
            id: 'TASK-L2',
            title: 'Approve Influencer Partnership List',
            desc: 'Review 20 vetted wellness creators selected for November seeding.',
            badge: 'In Review',
            badgeClass: 'badge-in-progress',
            completed: false
          },
          {
            id: 'TASK-L3',
            title: 'Website Checkout Optimization Sign-off',
            desc: 'Confirm 1-click Shopify checkout redesign and mobile upsell flow.',
            badge: 'Completed',
            badgeClass: 'badge-done',
            completed: true
          }
        ],
        timeline: [
          {
            id: 'TIME-L1',
            date: '10/12/2026',
            rawDate: '2026-10-12',
            dateDisplay: '12 Oct 2026',
            title: 'Meta Advantage+ Campaign Launch',
            type: 'Deliverable',
            description: 'Launch 12 new high-converting ad variants across Meta and TikTok.'
          },
          {
            id: 'TIME-L2',
            date: '10/16/2026',
            rawDate: '2026-10-16',
            dateDisplay: '16 Oct 2026',
            title: 'Bi-Weekly Growth Sync',
            type: 'Meeting',
            description: 'Review ROAS milestones and scale budget for top performing creative angles.'
          }
        ],
        ideas: [
          {
            id: 'IDEA-L1',
            rank: 1,
            priority: 'High',
            category: 'Paid Growth & Ads',
            date: 'Oct 04, 2026',
            title: 'UGC Unboxing Video Funnel with Dermatologist Endorsements',
            description: 'Deploy 8 physician-backed testimonial clips addressing ingredient bio-availability to overcome cold traffic skepticism.',
            impact: '+34% Cold Traffic Conversion Rate',
            assetLink: { label: 'Review Creative Brief', url: 'https://drive.google.com' },
            status: 'Pending',
            clientFeedback: null
          }
        ],
        approvals: [
          {
            id: 'APP-L1',
            title: 'TikTok UGC Ad Scripts Batch #2',
            description: '6 high-energy script concepts featuring before/after lifestyle routines.',
            status: 'pending',
            date: 'Oct 04, 2026'
          }
        ],
        links: [
          { label: 'Shopify Storefront', url: 'https://shopify.com', icon: 'shopping-bag' },
          { label: 'Meta Ads Manager Dashboard', url: '#', icon: 'trending-up' }
        ]
      }
    ];
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function downloadBlob(content, filename, type) {
    const a = document.createElement('a');
    const blob = new Blob([content], { type });
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // =========================================================================
  // 5. MOTAGROWTH CLIENT PORTAL ENGINE (CALENDAR, AI SEARCH, CHAT, TASKS, DOCS)
  // =========================================================================

  function initMotaGrowthClientSpace() {
    if (isClientPortalInitialized) return;
    isClientPortalInitialized = true;

    // --- Dynamic Current Date & Calendar State ---
    const today = new Date();
    let currentCalYear = today.getFullYear();
    let currentCalMonth = today.getMonth(); // 0-indexed (e.g. 8 for September)
    let selectedCalDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    let currentActiveTab = 'home';
    let ideasFilter = 'all';
    let tasksFilter = 'all';

    // --- Real-time Data Linking Helpers (Directly Connected to Admin Dashboard) ---
    function getActiveClient() {
      const allClients = loadClients();
      const activeSessionId = sessionStorage.getItem(STORAGE_ACTIVE_CLIENT_SESSION) || localStorage.getItem(STORAGE_ACTIVE_CLIENT_SESSION);
      if (activeSessionId && Array.isArray(allClients)) {
        const found = allClients.find(c => c.id === activeSessionId);
        if (found) {
          loggedInClient = found;
          return found;
        }
      }
      if (loggedInClient && loggedInClient.id && Array.isArray(allClients)) {
        const found = allClients.find(c => c.id === loggedInClient.id);
        if (found) {
          loggedInClient = found;
          return found;
        }
      }
      return loggedInClient;
    }

    function getActiveCalendarEvents() {
      const client = getActiveClient();
      const eventsMap = {};
      if (!client) return eventsMap;

      // 1. Map client.timeline from Admin Dashboard
      if (Array.isArray(client.timeline)) {
        client.timeline.forEach(item => {
          const dKey = getTimelineItemDateKey(item);
          if (dKey) {
            if (!eventsMap[dKey]) eventsMap[dKey] = [];
            if (!eventsMap[dKey].some(e => e.id === item.id)) {
              eventsMap[dKey].push({
                id: item.id || 'EV-' + Math.random().toString(36).substr(2, 6),
                title: item.title,
                type: item.type === 'Meeting' ? 'Sync' : (item.type || 'Deliverable'),
                time: item.time || 'All Day',
                desc: item.description || ''
              });
            }
          }
        });
      }

      // 2. Map client.calendarEvents from client portal bookings
      if (client.calendarEvents && typeof client.calendarEvents === 'object') {
        Object.keys(client.calendarEvents).forEach(dKey => {
          if (Array.isArray(client.calendarEvents[dKey])) {
            client.calendarEvents[dKey].forEach(ev => {
              // If it's a meeting/sync event, only include if it's confirmed in client.timeline
              if (ev.type === 'Sync' || (ev.title && (ev.title.includes('Strategy Session') || ev.title.includes('Rendez-vous')))) {
                const isInTimeline = Array.isArray(client.timeline) && client.timeline.some(t => t.id === ev.id || (t.type === 'Meeting' && (t.rawDate === dKey || t.date === dKey)));
                if (!isInTimeline) return;
              }

              if (!eventsMap[dKey]) eventsMap[dKey] = [];
              if (!eventsMap[dKey].some(e => e.id === ev.id)) {
                eventsMap[dKey].push(ev);
              }
            });
          }
        });
      }

      return eventsMap;
    }

    function getActiveTasks() {
      const client = getActiveClient();
      if (!client) return [];
      return Array.isArray(client.tasks) ? client.tasks : [];
    }

    function getActiveIdeas() {
      const client = getActiveClient();
      if (!client) return [];
      return Array.isArray(client.ideas) ? client.ideas : [];
    }

    function getActiveDocs() {
      const client = getActiveClient();
      if (!client) return [];
      return Array.isArray(client.files) ? client.files : [];
    }

    // --- DOM Elements ---
    const portalSubViews = {
      'home': document.getElementById('portalSubViewHome'),
      'calendar': document.getElementById('portalSubViewCalendar'),
      'meetings': document.getElementById('portalSubViewMeetings'),
      'ideas': document.getElementById('portalSubViewIdeas'),
      'tasks': document.getElementById('portalSubViewTasks'),
      'documents': document.getElementById('portalSubViewDocs')
    };

    // -----------------------------------------------------------------------
    // A. TOAST NOTIFICATION SYSTEM
    // -----------------------------------------------------------------------
    function showPortalToast(message, icon = 'check-circle') {
      let toast = document.getElementById('portalFloatingToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'portalFloatingToast';
        toast.style.cssText = `
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #0f172a;
          color: #f8fafc;
          padding: 0.9rem 1.4rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.15);
          z-index: 99999;
          transform: translateY(100px);
          opacity: 0;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        `;
        document.body.appendChild(toast);
      }
      toast.innerHTML = `<i data-lucide="${icon}" style="width: 18px; height: 18px; color: #38bdf8;"></i> <span>${escapeHtml(message)}</span>`;
      if (window.lucide) window.lucide.createIcons();

      requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
      });

      clearTimeout(toast._timeout);
      toast._timeout = setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
      }, 3500);
    }

    // -----------------------------------------------------------------------
    // B. NAVIGATION & SUBVIEW SWITCHER
    // -----------------------------------------------------------------------
    function switchPortalSubView(tabName) {
      if (!tabName) return;
      currentActiveTab = tabName;

      // Update Navigation Row States
      document.querySelectorAll('[data-portal-tab]').forEach(el => {
        const tab = el.getAttribute('data-portal-tab');
        el.classList.toggle('active', tab === tabName);
      });

      // Show Selected Subview
      Object.keys(portalSubViews).forEach(key => {
        const viewEl = portalSubViews[key];
        if (viewEl) {
          viewEl.style.display = '';
          if (key === tabName) {
            viewEl.classList.add('active');
          } else {
            viewEl.classList.remove('active');
          }
        }
      });

      // Render tab-specific dynamic content
      if (tabName === 'calendar') {
        renderInteractiveCalendar();
      } else if (tabName === 'meetings') {
        renderMeetingsList();
      } else if (tabName === 'tasks') {
        renderFullTasksList();
      } else if (tabName === 'ideas') {
        renderIdeasList();
      } else if (tabName === 'documents') {
        renderVaultDocs();
      } else if (tabName === 'home') {
        renderHomeTasksTable();
      }

      updateTasksCounters();
      if (window.lucide) window.lucide.createIcons();
    }

    // Bind Navigation Clicks
    document.querySelectorAll('[data-portal-tab]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = el.getAttribute('data-portal-tab');
        switchPortalSubView(targetTab);
      });
    });

    // -----------------------------------------------------------------------
    // C. INTERACTIVE CALENDAR ENGINE
    // -----------------------------------------------------------------------
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function renderInteractiveCalendar() {
      const titleEl = document.getElementById('calendarCurrentMonthTitle');
      const gridEl = document.getElementById('calendarDaysGrid');
      if (!gridEl) return;

      if (titleEl) {
        titleEl.textContent = `${monthNames[currentCalMonth]} ${currentCalYear}`;
      }

      gridEl.innerHTML = '';

      const firstDayIndex = new Date(currentCalYear, currentCalMonth, 1).getDay();
      const totalDays = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
      const activeCalendar = getActiveCalendarEvents();

      // Empty cells before start of month
      for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'cal-day-cell empty-day';
        gridEl.appendChild(emptyCell);
      }

      // Day cells 1 to totalDays
      for (let d = 1; d <= totalDays; d++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'cal-day-cell';

        const monthStr = String(currentCalMonth + 1).padStart(2, '0');
        const dayStr = String(d).padStart(2, '0');
        const dateKey = `${currentCalYear}-${monthStr}-${dayStr}`;

        if (dateKey === selectedCalDate) {
          dayCell.classList.add('active-cal-day');
        }

        const events = activeCalendar[dateKey] || [];
        let eventDotsHtml = '';
        if (events.length > 0) {
          dayCell.classList.add('has-events');
          eventDotsHtml = `
            <div class="cal-day-dots">
              ${events.slice(0, 3).map(ev => {
                const typeClass = (ev.type || 'Deliverable').toLowerCase();
                return `<span class="cal-dot ${typeClass}" title="${escapeHtml(ev.title)}"></span>`;
              }).join('')}
              ${events.length > 3 ? `<span class="cal-dot more">+${events.length - 3}</span>` : ''}
            </div>
          `;
        }

        dayCell.innerHTML = `
          <div class="cal-day-number">${d}</div>
          ${eventDotsHtml}
        `;

        dayCell.addEventListener('click', () => {
          selectedCalDate = dateKey;
          document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('active-cal-day'));
          dayCell.classList.add('active-cal-day');
          renderSelectedDateDetails(dateKey);
        });

        gridEl.appendChild(dayCell);
      }

      renderSelectedDateDetails(selectedCalDate);
      if (window.lucide) window.lucide.createIcons();
    }

    function renderSelectedDateDetails(dateKey) {
      const titleEl = document.getElementById('selectedDateDisplayTitle');
      const countEl = document.getElementById('selectedDateEventsCount');
      const listEl = document.getElementById('selectedDateEventsList');
      if (!listEl) return;

      const [y, m, d] = dateKey.split('-').map(Number);
      const dateObj = new Date(y, (m || 1) - 1, d || 1);
      const formattedDate = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }) : dateKey;

      if (titleEl) titleEl.textContent = formattedDate;

      const activeCalendar = getActiveCalendarEvents();
      const events = activeCalendar[dateKey] || [];
      if (countEl) {
        countEl.textContent = `${events.length} Item${events.length === 1 ? '' : 's'}`;
      }

      if (events.length === 0) {
        listEl.innerHTML = `
          <div class="no-events-placeholder">
            <i data-lucide="calendar" style="width: 28px; height: 28px; color: #94a3b8; display: block; margin: 0 auto 0.4rem;"></i>
            <p style="margin: 0; font-size: 0.85rem; color: #64748b;">No deliverables or shoots scheduled on this date.</p>
          </div>
        `;
      } else {
        listEl.innerHTML = events.map((ev) => {
          const typeClass = (ev.type || 'Deliverable').toLowerCase();
          let badgeColor = '#0284c7';
          let iconName = 'sparkles';
          if (typeClass === 'reel') { badgeColor = '#ea580c'; iconName = 'video'; }
          else if (typeClass === 'shoot') { badgeColor = '#7c3aed'; iconName = 'camera'; }
          else if (typeClass === 'sync') { badgeColor = '#10b981'; iconName = 'users'; }

          return `
            <div class="date-event-item">
              <div class="event-item-top">
                <span class="event-tag-badge" style="background: ${badgeColor}15; color: ${badgeColor}; border: 1px solid ${badgeColor}30;">
                  <i data-lucide="${iconName}"></i> ${escapeHtml(ev.type || 'Deliverable')}
                </span>
                <span class="event-time-text">${escapeHtml(ev.time || 'All Day')}</span>
              </div>
              <h5 class="event-item-title">${escapeHtml(ev.title)}</h5>
              ${ev.desc ? `<p class="event-item-desc">${escapeHtml(ev.desc)}</p>` : ''}
            </div>
          `;
        }).join('');
      }

      if (window.lucide) window.lucide.createIcons();
    }

    // Calendar Month Navigation Buttons
    const calPrevMonthBtn = document.getElementById('calPrevMonthBtn');
    const calNextMonthBtn = document.getElementById('calNextMonthBtn');
    const calTodayBtn = document.getElementById('calTodayBtn');

    if (calPrevMonthBtn) {
      calPrevMonthBtn.addEventListener('click', () => {
        currentCalMonth--;
        if (currentCalMonth < 0) {
          currentCalMonth = 11;
          currentCalYear--;
        }
        renderInteractiveCalendar();
      });
    }

    if (calNextMonthBtn) {
      calNextMonthBtn.addEventListener('click', () => {
        currentCalMonth++;
        if (currentCalMonth > 11) {
          currentCalMonth = 0;
          currentCalYear++;
        }
        renderInteractiveCalendar();
      });
    }

    if (calTodayBtn) {
      calTodayBtn.addEventListener('click', () => {
        const now = new Date();
        currentCalYear = now.getFullYear();
        currentCalMonth = now.getMonth();
        selectedCalDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        renderInteractiveCalendar();
      });
    }

    // -----------------------------------------------------------------------
    // D. CONTEXT-AWARE AI SEARCH ENGINE
    // -----------------------------------------------------------------------
    const portalAiSearchInput = document.getElementById('portalAiSearchInput');
    const portalAiSearchBtn = document.getElementById('portalAiSearchBtn');
    const portalAiAnswerCard = document.getElementById('portalAiAnswerCard');
    const portalAiAnswerBody = document.getElementById('portalAiAnswerBody');
    const portalAiAnswerCloseBtn = document.getElementById('portalAiAnswerCloseBtn');

    function handleAiPortalSearch(query) {
      if (!query || !portalAiAnswerCard || !portalAiAnswerBody) return;
      const cleanQ = query.trim().toLowerCase();
      const currentTasks = getActiveTasks();
      const currentCalendar = getActiveCalendarEvents();
      const currentIdeas = getActiveIdeas();
      const currentDocs = getActiveDocs();

      // Show Answer Card with loading state
      portalAiAnswerCard.style.display = 'block';
      portalAiAnswerBody.innerHTML = `
        <div class="ai-searching-state">
          <div class="ai-pulse-dot"></div>
          <span>Searching live portal data for <em>"${escapeHtml(query)}"</em>...</span>
        </div>
      `;

      setTimeout(() => {
        let answerTitle = '';
        let answerSummary = '';
        let matches = [];
        let jumpTarget = 'home';
        let jumpLabel = 'View Dashboard';

        // Intent Matching
        if (cleanQ.includes('task') || cleanQ.includes('todo') || cleanQ.includes('pending') || cleanQ.includes('footage') || cleanQ.includes('action')) {
          jumpTarget = 'tasks';
          jumpLabel = 'Go to Tasks Manager';
          const pendingTasks = currentTasks.filter(t => t.status === 'Pending');
          answerTitle = `You have ${pendingTasks.length} pending tasks:`;
          answerSummary = `Your team currently has ${currentTasks.length} total tasks tracked in this workspace.`;
          matches = currentTasks.map(t => ({
            tag: t.status === 'Pending' ? 'Action Required' : 'Completed',
            badgeClass: t.status === 'Pending' ? 'warn' : 'success',
            title: t.title,
            meta: `Due: ${t.date || 'TBD'} • Priority: ${t.priority || 'Normal'}`
          }));
        } else if (cleanQ.includes('calendar') || cleanQ.includes('shoot') || cleanQ.includes('tiktok') || cleanQ.includes('reel') || cleanQ.includes('date') || cleanQ.includes('schedule') || cleanQ.includes('deadline')) {
          jumpTarget = 'calendar';
          jumpLabel = 'Open Full Calendar';
          answerTitle = `Key Scheduled Dates & Deliverables:`;
          answerSummary = `Review your active timeline and production schedule in the calendar.`;
          
          Object.keys(currentCalendar).forEach(date => {
            (currentCalendar[date] || []).forEach(ev => {
              matches.push({
                tag: ev.type || 'Deliverable',
                badgeClass: 'info',
                title: `${ev.title} (${date})`,
                meta: `${ev.time || 'All Day'} — ${ev.desc || ''}`
              });
            });
          });
        } else if (cleanQ.includes('idea') || cleanQ.includes('proposal') || cleanQ.includes('concept')) {
          jumpTarget = 'ideas';
          jumpLabel = 'Explore Idea Bank';
          answerTitle = `Strategic Proposals & Concept Bank:`;
          answerSummary = `MotaGrowth has proposed ${currentIdeas.length} strategic concepts for review.`;
          matches = currentIdeas.map(idea => ({
            tag: idea.status || 'Pending',
            badgeClass: (idea.status === 'Approved') ? 'success' : 'warn',
            title: idea.title,
            meta: idea.impact || idea.desc || ''
          }));
        } else if (cleanQ.includes('doc') || cleanQ.includes('contract') || cleanQ.includes('file') || cleanQ.includes('download') || cleanQ.includes('pdf')) {
          jumpTarget = 'documents';
          jumpLabel = 'Open Documents Vault';
          answerTitle = `Official Documents & Downloadable Files:`;
          answerSummary = `All official legal agreements, retainers, and strategy briefs are stored in your secure vault.`;
          matches = currentDocs.map(doc => ({
            tag: doc.category || 'Document',
            badgeClass: 'info',
            title: doc.name || doc.title || 'Document.pdf',
            meta: `${doc.size || '1.0 MB'} • ${doc.date || 'Active'}`
          }));
        } else if (cleanQ.includes('meet') || cleanQ.includes('call') || cleanQ.includes('sync') || cleanQ.includes('schedule')) {
          jumpTarget = 'meeting';
          jumpLabel = 'Schedule Meeting Now';
          answerTitle = `Schedule Strategy Session:`;
          answerSummary = `You can book a 15-min Sprint Sync, 30-min Growth Review, or 45-min Creative Strategy session with Marcus Vance and the MotaGrowth team.`;
          matches = [
            { tag: '15-Min', badgeClass: 'info', title: '15-Min Sprint Sync', meta: 'Rapid approvals and urgent blockers' },
            { tag: '30-Min', badgeClass: 'info', title: '30-Min Growth Review', meta: 'Performance analytics and campaign optimization' },
            { tag: '45-Min', badgeClass: 'info', title: '45-Min Strategy Session', meta: 'New campaign launch & creative brainstorming' }
          ];
        } else {
          jumpTarget = 'home';
          jumpLabel = 'Return to Overview';
          answerTitle = `Portal Search Results for "${escapeHtml(query)}":`;
          answerSummary = `Found active items across your project schedule, tasks tracker, and documents vault.`;
          matches = [
            { tag: 'Status', badgeClass: 'info', title: 'Project Progress: Stage 2 Active', meta: 'Research & Briefing in progress' }
          ];
        }

        // Render Answer Markup
        portalAiAnswerBody.innerHTML = `
          <div class="ai-answer-content">
            <div class="ai-answer-header">
              <i data-lucide="sparkles" style="color: #0284c7;"></i>
              <strong>${answerTitle}</strong>
            </div>
            <p class="ai-answer-text">${answerSummary}</p>
            
            <div class="ai-matches-list">
              ${matches.slice(0, 4).map(m => `
                <div class="ai-match-row">
                  <span class="ai-match-badge badge-${m.badgeClass}">${escapeHtml(m.tag)}</span>
                  <div class="ai-match-info">
                    <strong>${escapeHtml(m.title)}</strong>
                    <span>${escapeHtml(m.meta)}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="ai-answer-footer">
              <button type="button" class="btn-ai-jump" id="btnAiJumpAction">
                <span>${jumpLabel}</span>
                <i data-lucide="arrow-right"></i>
              </button>
            </div>
          </div>
        `;

        if (window.lucide) window.lucide.createIcons();

        const jumpBtn = document.getElementById('btnAiJumpAction');
        if (jumpBtn) {
          jumpBtn.addEventListener('click', () => {
            if (jumpTarget === 'meeting') {
              openPortalMeetingModal();
            } else {
              switchPortalSubView(jumpTarget);
            }
            portalAiAnswerCard.style.display = 'none';
          });
        }
      }, 300);
    }

    if (portalAiSearchBtn && portalAiSearchInput) {
      portalAiSearchBtn.addEventListener('click', () => {
        handleAiPortalSearch(portalAiSearchInput.value);
      });
      portalAiSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAiPortalSearch(portalAiSearchInput.value);
        }
      });
    }

    if (portalAiAnswerCloseBtn && portalAiAnswerCard) {
      portalAiAnswerCloseBtn.addEventListener('click', () => {
        portalAiAnswerCard.style.display = 'none';
      });
    }

    document.querySelectorAll('.portal-query-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (portalAiSearchInput) portalAiSearchInput.value = query;
        handleAiPortalSearch(query);
      });
    });

    // -----------------------------------------------------------------------
    // E. RIGHT-SIDE AI CHAT ASSISTANT
    // -----------------------------------------------------------------------
    const portalChatForm = document.getElementById('portalChatForm');
    const portalChatInput = document.getElementById('portalChatInput');
    const portalChatMessages = document.getElementById('portalChatMessages');

    function appendUserChatMessage(text) {
      if (!portalChatMessages) return;
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble user-bubble';
      bubble.innerHTML = `
        <div class="chat-bubble-sender">You</div>
        <p>${escapeHtml(text)}</p>
        <span class="chat-time">Just now</span>
      `;
      portalChatMessages.appendChild(bubble);
      portalChatMessages.scrollTop = portalChatMessages.scrollHeight;
    }

    function appendBotChatMessage(text) {
      if (!portalChatMessages) return;
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble bot-bubble';
      bubble.innerHTML = `
        <div class="chat-bubble-sender">MotaGrowth AI</div>
        <p>${text}</p>
        <span class="chat-time">Just now</span>
      `;
      portalChatMessages.appendChild(bubble);
      portalChatMessages.scrollTop = portalChatMessages.scrollHeight;
      if (window.lucide) window.lucide.createIcons();
    }

    function handleChatSubmit(userText) {
      if (!userText.trim()) return;
      appendUserChatMessage(userText);

      // Typing Indicator
      const typingEl = document.createElement('div');
      typingEl.className = 'chat-bubble bot-bubble typing-bubble';
      typingEl.innerHTML = `
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      `;
      portalChatMessages.appendChild(typingEl);
      portalChatMessages.scrollTop = portalChatMessages.scrollHeight;

      setTimeout(() => {
        typingEl.remove();
        const cleanT = userText.toLowerCase();
        const currentTasks = getActiveTasks();
        let reply = '';

        if (cleanT.includes('status') || cleanT.includes('progress') || cleanT.includes('sprint')) {
          reply = `We are currently in <strong>Stage 2: Research & Briefing</strong>. Your creative deliverables and roadmap milestones are continuously updated by MotaGrowth.`;
        } else if (cleanT.includes('task') || cleanT.includes('need') || cleanT.includes('attention') || cleanT.includes('todo')) {
          const pending = currentTasks.filter(t => t.status === 'Pending');
          if (pending.length > 0) {
            reply = `You have <strong>${pending.length} pending tasks</strong>: <ul style="margin: 0.4rem 0 0 1rem; padding: 0;">${pending.map(p => `<li>${escapeHtml(p.title)}</li>`).join('')}</ul>`;
          } else {
            reply = `You have <strong>0 pending tasks</strong>! Everything in your workspace is currently up to date.`;
          }
        } else if (cleanT.includes('meeting') || cleanT.includes('sync') || cleanT.includes('call') || cleanT.includes('schedule')) {
          reply = `You can click the <em>"Request Meeting"</em> button on the top right to book a dedicated 1-on-1 strategy session with the MotaGrowth team anytime.`;
        } else if (cleanT.includes('contract') || cleanT.includes('download') || cleanT.includes('doc') || cleanT.includes('pdf')) {
          reply = `All your agreements, briefs, and deliverables are stored in the <strong>Documents</strong> tab for instant 1-click download.`;
        } else {
          reply = `I have logged your request: "${escapeHtml(userText)}". The MotaGrowth account team is at your service. You can check the <strong>Calendar</strong>, review <strong>Idea Bank</strong> proposals, or request a meeting above.`;
        }

        appendBotChatMessage(reply);
      }, 600);
    }

    if (portalChatForm && portalChatInput) {
      portalChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = portalChatInput.value.trim();
        if (text) {
          handleChatSubmit(text);
          portalChatInput.value = '';
        }
      });
    }

    document.querySelectorAll('.chat-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-chat-prompt');
        if (prompt) {
          handleChatSubmit(prompt);
        }
      });
    });

    // -----------------------------------------------------------------------
    // F. CLIENT TASKS MANAGEMENT (HOME & DEDICATED VIEW)
    // -----------------------------------------------------------------------
    function updateTasksCounters() {
      const currentTasks = getActiveTasks();
      const completed = currentTasks.filter(t => t.status === 'Done').length;
      const total = currentTasks.length;
      const text = `${completed} of ${total} Completed`;

      const counterEl = document.getElementById('portalTasksCounter');
      if (counterEl) counterEl.textContent = text;

      const miniCounterEl = document.getElementById('miniTasksCount');
      if (miniCounterEl) miniCounterEl.textContent = total - completed;

      const miniIdeaEl = document.getElementById('miniIdeaCount');
      if (miniIdeaEl) {
        const ideas = getActiveIdeas();
        miniIdeaEl.textContent = ideas.length;
      }

      const miniDocsEl = document.getElementById('miniDocsCount');
      if (miniDocsEl) {
        const docs = getActiveDocs();
        miniDocsEl.textContent = docs.length;
      }

      const miniCalEl = document.getElementById('miniCalCount');
      if (miniCalEl) {
        const cal = getActiveCalendarEvents();
        let totalEvents = 0;
        Object.values(cal).forEach(arr => { if (Array.isArray(arr)) totalEvents += arr.length; });
        miniCalEl.textContent = totalEvents;
      }

      const miniMeetingsEl = document.getElementById('miniMeetingsCount');
      if (miniMeetingsEl) {
        const client = getActiveClient();
        let count = 0;
        if (client) {
          const timelineMeets = Array.isArray(client.timeline) ? client.timeline.filter(e => e.type === 'Meeting') : [];
          count = timelineMeets.length;
        }
        miniMeetingsEl.textContent = count;
      }
    }

    function toggleTaskStatus(taskId) {
      const currentTasks = getActiveTasks();
      const task = currentTasks.find(t => t.id === taskId);
      if (task) {
        task.status = (task.status === 'Done') ? 'Pending' : 'Done';
        if (loggedInClient && loggedInClient.id !== 'CLI-VELOUR') {
          const currentClients = loadClients();
          const cIdx = currentClients.findIndex(c => c.id === loggedInClient.id);
          if (cIdx !== -1) {
            currentClients[cIdx].tasks = loggedInClient.tasks;
            saveClients(currentClients);
          }
        } else {
          saveStoredPortalTasks(portalTasks);
        }
        renderHomeTasksTable();
        renderFullTasksList();
        updateTasksCounters();
        showPortalToast(task.status === 'Done' ? 'Task marked complete!' : 'Task reopened');
      }
    }

    function renderHomeTasksTable() {
      const listEl = document.getElementById('portalHomeTasksList');
      if (!listEl) return;

      const currentTasks = getActiveTasks();
      if (currentTasks.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1rem; color: #64748b; background: #ffffff; border-radius: 0.75rem; border: 1px dashed #e2e8f0;">
            <i data-lucide="check-circle" style="width: 28px; height: 28px; color: #0088ff; margin: 0 auto 0.4rem; display: block; opacity: 0.7;"></i>
            <strong style="color: #0f172a; display: block; margin-bottom: 0.2rem;">All caught up!</strong>
            <span style="font-size: 0.84rem;">No pending tasks assigned to your workspace.</span>
          </div>
        `;
        updateTasksCounters();
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      listEl.innerHTML = currentTasks.map(task => {
        const isDone = task.status === 'Done';
        return `
          <div class="task-table-row ${isDone ? 'is-completed' : ''}" data-task-id="${task.id}">
            <div class="task-checkbox-wrap">
              <input type="checkbox" class="task-checkbox" id="check_${task.id}" ${isDone ? 'checked' : ''} />
              <label for="check_${task.id}"></label>
            </div>
            <div class="task-title-wrap">
              <span class="task-name">${escapeHtml(task.title)}</span>
              <span class="task-meta-tag">${escapeHtml(task.tag || 'Project')} • Due ${escapeHtml(task.date || 'Upcoming')}</span>
            </div>
            <div class="task-status-wrap">
              <span class="task-status-pill ${isDone ? 'pill-done' : 'pill-pending'}">
                <i data-lucide="${isDone ? 'check' : 'clock'}"></i>
                ${isDone ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        `;
      }).join('');

      listEl.querySelectorAll('.task-checkbox').forEach(box => {
        box.addEventListener('change', () => {
          const row = box.closest('.task-table-row');
          const taskId = row.getAttribute('data-task-id');
          toggleTaskStatus(taskId);
        });
      });

      updateTasksCounters();
      if (window.lucide) window.lucide.createIcons();
    }

    function renderFullTasksList() {
      const containerEl = document.getElementById('portalFullTasksContainer');
      if (!containerEl) return;

      const currentTasks = getActiveTasks();
      let filtered = currentTasks;
      if (tasksFilter === 'pending') filtered = currentTasks.filter(t => t.status === 'Pending');
      else if (tasksFilter === 'completed') filtered = currentTasks.filter(t => t.status === 'Done');

      if (filtered.length === 0) {
        containerEl.innerHTML = `<div style="text-align: center; padding: 3rem; color: #64748b; background: #ffffff; border-radius: 0.75rem; border: 1px dashed #e2e8f0;">No tasks match this filter.</div>`;
        return;
      }

      containerEl.innerHTML = filtered.map(task => {
        const isDone = task.status === 'Done';
        return `
          <div class="task-full-card ${isDone ? 'is-completed' : ''}" data-task-id="${task.id}">
            <div class="task-card-left">
              <div class="task-checkbox-wrap">
                <input type="checkbox" class="task-checkbox" id="fullcheck_${task.id}" ${isDone ? 'checked' : ''} />
                <label for="fullcheck_${task.id}"></label>
              </div>
              <div class="task-card-info">
                <h4>${escapeHtml(task.title)}</h4>
                <div class="task-card-tags">
                  <span class="task-tag-badge">${escapeHtml(task.tag || 'General')}</span>
                  <span class="task-priority-badge priority-${(task.priority || 'Normal').toLowerCase()}">${escapeHtml(task.priority || 'Normal')} Priority</span>
                  <span class="task-due-date"><i data-lucide="calendar"></i> Due ${escapeHtml(task.date || 'Upcoming')}</span>
                </div>
              </div>
            </div>
            <div class="task-card-right">
              <span class="task-status-pill ${isDone ? 'pill-done' : 'pill-pending'}">
                <i data-lucide="${isDone ? 'check' : 'clock'}"></i>
                ${isDone ? 'Completed' : 'In Progress'}
              </span>
            </div>
          </div>
        `;
      }).join('');

      containerEl.querySelectorAll('.task-checkbox').forEach(box => {
        box.addEventListener('change', () => {
          const card = box.closest('.task-full-card');
          const taskId = card.getAttribute('data-task-id');
          toggleTaskStatus(taskId);
        });
      });

      if (window.lucide) window.lucide.createIcons();
    }

    // Tasks filter bar
    document.querySelectorAll('[data-task-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-task-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tasksFilter = btn.getAttribute('data-task-filter');
        renderFullTasksList();
      });
    });

    // -----------------------------------------------------------------------
    // G. IDEA BANK & PROPOSALS
    // -----------------------------------------------------------------------
    function renderIdeasList() {
      const container = document.getElementById('portalIdeasListContainer');
      if (!container) return;

      const activeIdeas = getActiveIdeas();
      let filtered = activeIdeas;
      if (ideasFilter === 'pending') filtered = activeIdeas.filter(i => (i.status || 'Pending') === 'Pending');
      else if (ideasFilter === 'approved') filtered = activeIdeas.filter(i => i.status === 'Approved');

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #64748b; background: #ffffff; border-radius: 1rem; border: 1px dashed #e2e8f0;">
            <i data-lucide="lightbulb" style="width: 32px; height: 32px; color: #0088ff; margin-bottom: 0.5rem; opacity: 0.6;"></i>
            <h4 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.25rem;">No proposals in this category</h4>
            <p style="font-size: 0.85rem;">Your MotaGrowth growth director will share new strategy concepts here.</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      container.innerHTML = filtered.map(idea => {
        const isApproved = idea.status === 'Approved';
        return `
          <div class="idea-proposal-card ${isApproved ? 'is-approved' : ''}" data-idea-id="${idea.id}">
            <div class="idea-card-header">
              <span class="idea-cat-tag">${escapeHtml(idea.category || 'Strategy')}</span>
              <span class="idea-status-badge ${isApproved ? 'badge-approved' : 'badge-pending'}">
                <i data-lucide="${isApproved ? 'check-circle' : 'clock'}"></i>
                ${isApproved ? 'Approved for Production' : 'Pending Client Review'}
              </span>
            </div>
            <h4 class="idea-title">${escapeHtml(idea.title)}</h4>
            <p class="idea-desc">${escapeHtml(idea.description || idea.desc || '')}</p>
            ${idea.impact ? `
              <div class="idea-impact-box">
                <i data-lucide="trending-up"></i>
                <span><strong>Projected Impact:</strong> ${escapeHtml(idea.impact)}</span>
              </div>
            ` : ''}
            <div class="idea-footer-actions">
              <button type="button" class="btn-idea-approve ${isApproved ? 'is-active' : ''}" data-approve-id="${idea.id}">
                <i data-lucide="${isApproved ? 'check' : 'thumbs-up'}"></i>
                <span>${isApproved ? 'Approved ✓' : 'Approve Proposal'}</span>
              </button>
              <button type="button" class="btn-idea-feedback" data-feedback-id="${idea.id}">
                <i data-lucide="message-square"></i>
                <span>Request Revision</span>
              </button>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('[data-approve-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-approve-id');
          const client = getActiveClient();
          if (client && Array.isArray(client.ideas)) {
            const item = client.ideas.find(i => i.id === id);
            if (item) {
              item.status = (item.status === 'Approved') ? 'Pending' : 'Approved';
              const currentClients = loadClients();
              const cIdx = currentClients.findIndex(c => c.id === client.id);
              if (cIdx !== -1) {
                currentClients[cIdx].ideas = client.ideas;
                saveClients(currentClients);
              }
              renderIdeasList();
              showPortalToast(item.status === 'Approved' ? `Approved "${item.title}"!` : 'Status updated to pending');
            }
          }
        });
      });

      container.querySelectorAll('[data-feedback-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          showPortalToast('Feedback note saved to creative director review queue.');
        });
      });

      if (window.lucide) window.lucide.createIcons();
    }

    document.querySelectorAll('.ideas-filter-bar .btn-filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ideas-filter-bar .btn-filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        ideasFilter = btn.getAttribute('data-filter');
        renderIdeasList();
      });
    });

    // -----------------------------------------------------------------------
    // H. DOCUMENTS VAULT & 1-CLICK DOWNLOADS
    // -----------------------------------------------------------------------

    function renderVaultDocs() {
      const tbody = document.getElementById('portalVaultFilesBody');
      if (!tbody) return;

      const activeDocs = getActiveDocs();

      if (activeDocs.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 2.5rem 1rem; color: #64748b;">
              <i data-lucide="folder-open" style="width: 28px; height: 28px; color: #0088ff; margin: 0 auto 0.5rem; display: block; opacity: 0.7;"></i>
              <strong style="color: #0f172a; display: block; margin-bottom: 0.25rem;">No documents uploaded yet</strong>
              <span style="font-size: 0.85rem;">Official deliverables, strategy briefs, and contracts will appear here once uploaded by MotaGrowth.</span>
            </td>
          </tr>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      tbody.innerHTML = activeDocs.map(doc => {
        const docName = doc.name || doc.title || 'Document.pdf';
        const isPdf = docName.toLowerCase().endsWith('.pdf');
        const cat = doc.category || (isPdf ? 'PDF Document' : 'Document');
        const dlName = doc.downloadName || docName;

        return `
          <tr>
            <td>
              <div class="file-name-cell">
                <div class="file-type-pill ${isPdf ? 'pdf' : 'doc'}">
                  <i data-lucide="${isPdf ? 'file-check' : 'file-text'}"></i>
                </div>
                <div class="file-meta-name">
                  <strong>${escapeHtml(docName)}</strong>
                  <span>MotaGrowth Verified Asset</span>
                </div>
              </div>
            </td>
            <td><span class="category-tag">${escapeHtml(cat)}</span></td>
            <td><span style="font-weight: 600; color: #475569;">${escapeHtml(doc.size || '1.0 MB')}</span></td>
            <td><span style="color: #64748b; font-size: 0.84rem;">${escapeHtml(doc.date || 'Active')}</span></td>
            <td style="text-align: right;">
              <button type="button" class="btn-file-action" data-download="${escapeHtml(dlName)}">
                <i data-lucide="download"></i>
                <span>Download</span>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      bindDownloadButtons();
      if (window.lucide) window.lucide.createIcons();
    }

    function triggerDocumentDownload(filename) {
      if (!filename) filename = 'MotaGrowth_Document.pdf';

      let fileType = 'text/plain';
      let content = '';

      if (filename.toLowerCase().endsWith('.doc') || filename.toLowerCase().endsWith('.docx')) {
        fileType = 'application/msword';
        content = `========================================================================\nMOTAGROWTH GROWTH AGENCY — EXECUTIVE CLIENT BRIEF\nDocument: ${filename}\nDate: October 2026\n========================================================================\n\n1. SCOPE OF ENGAGEMENT\n- High-conversion bespoke 3D web experience architecture\n- Organic viral TikTok & Reels content production engine\n- Advantage+ Meta retargeting & performance growth retainer\n\n2. DELIVERABLES & TIMELINE\n- Milestone 1: Stage 2 Briefing & Brand Visual Sign-Off (COMPLETED)\n- Milestone 2: Alpha Staging Launch (Scheduled: Oct 15, 2026)\n- Milestone 3: Live Campaign Dispersal & Ad Retargeting (Target: Nov 2026)\n\n3. SIGNATURES & AUTHORIZATION\nMotaGrowth Strategic Director: Marcus Vance\nClient Partner: Authorized Workspace Executive\n========================================================================`;
      } else {
        fileType = 'application/pdf';
        content = `%PDF-1.4\n% MOTAGROWTH EXECUTIVE STRATEGY DOCUMENT: ${filename}\n% Generated for private client workspace session.\n\nPROJECT: Brand & Website Redesign\nSTATUS: Stage 2 Active (Research & Briefing)\nTARGET ROAS: 3.8x\nTARGET GMV GROWTH: +35% Mobile Conversion\n\n© 2026 MotaGrowth Agency. All rights reserved.`;
      }

      downloadBlob(content, filename, fileType);
      showPortalToast(`Downloaded ${filename}`, 'download');
    }

    function bindDownloadButtons() {
      document.querySelectorAll('[data-download]').forEach(el => {
        el.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const docName = el.getAttribute('data-download');
          triggerDocumentDownload(docName);
        };
      });
    }

    // -----------------------------------------------------------------------
    // I. AESTHETIC MEETING MODAL SCHEDULER
    // -----------------------------------------------------------------------
    const portalRequestMeetingBtn = document.getElementById('portalRequestMeetingBtn');
    const portalMeetingModal = document.getElementById('portalMeetingModal');
    const closePortalMeetingModalBtn = document.getElementById('closePortalMeetingModalBtn');
    const portalMeetingModalForm = document.getElementById('portalMeetingModalForm');
    const portalMeetingSuccessBox = document.getElementById('portalMeetingSuccessBox');
    const portalMeetingDoneBtn = document.getElementById('portalMeetingDoneBtn');
    const portalBookedTimeText = document.getElementById('portalBookedTimeText');

    function openPortalMeetingModal() {
      if (!portalMeetingModal) return;
      portalMeetingModal.style.display = 'flex';
      
      const meetDateInput = document.getElementById('portalMeetDate');
      if (meetDateInput && !meetDateInput.value) {
        meetDateInput.value = selectedCalDate;
      }

      if (portalMeetingModalForm) portalMeetingModalForm.style.display = 'block';
      if (portalMeetingSuccessBox) portalMeetingSuccessBox.style.display = 'none';
      if (window.lucide) window.lucide.createIcons();
    }

    function closePortalMeetingModal() {
      if (portalMeetingModal) portalMeetingModal.style.display = 'none';
    }

    if (portalRequestMeetingBtn) {
      portalRequestMeetingBtn.addEventListener('click', openPortalMeetingModal);
    }

    if (closePortalMeetingModalBtn) {
      closePortalMeetingModalBtn.addEventListener('click', closePortalMeetingModal);
    }

    if (portalMeetingModal) {
      portalMeetingModal.addEventListener('click', (e) => {
        if (e.target === portalMeetingModal) closePortalMeetingModal();
      });
    }

    if (portalMeetingModalForm) {
      portalMeetingModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formatRadio = portalMeetingModalForm.querySelector('input[name="portalMeetType"]:checked');
        const format = formatRadio ? formatRadio.value : '30-min Growth Review';
        const date = document.getElementById('portalMeetDate').value || selectedCalDate;
        const time = document.getElementById('portalMeetTime').value || '2:00 PM EST';
        const agenda = document.getElementById('portalMeetAgenda').value.trim();

        const client = getActiveClient();
        if (client) {
          // 1. Add to client calendarEvents (for client portal calendar display)
          if (!client.calendarEvents) client.calendarEvents = {};
          if (!client.calendarEvents[date]) client.calendarEvents[date] = [];
          const meetingId = 'MEET-' + Date.now().toString(36);
          client.calendarEvents[date].push({
            id: meetingId,
            title: `Strategy Session (${format})`,
            type: 'Sync',
            time: time,
            desc: agenda || 'Scheduled directly from client meeting portal'
          });

          // 2. Add to client timeline (visible inside Admin Workspace modal)
          if (!client.timeline) client.timeline = [];
          const displayDate = typeof formatDisplayDate === 'function' ? formatDisplayDate(date) : date;
          client.timeline.unshift({
            id: meetingId,
            date: displayDate,
            rawDate: date,
            title: `Rendez-vous : ${format}`,
            description: `${time}${agenda ? ` — Ordre du jour : ${agenda}` : ''}`,
            type: 'Meeting',
            status: 'Scheduled'
          });

          const currentClients = loadClients();
          const cIdx = currentClients.findIndex(c => c.id === client.id);
          if (cIdx !== -1) {
            currentClients[cIdx].calendarEvents = client.calendarEvents;
            currentClients[cIdx].timeline = client.timeline;
            saveClients(currentClients);
          }

          // 3. Register as an Inquiries / Demandes entry in Admin Dashboard main view
          try {
            const currentInquiries = loadInquiries();
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const dateDisplay = `${day}/${month}/${now.getFullYear()}<br><span style="color: #64748b; font-weight: 500;">${hours}:${minutes}</span>`;

            currentInquiries.unshift({
              id: 'MEET-' + Date.now().toString(36).toUpperCase(),
              createdAt: now.toISOString(),
              dateDisplay: dateDisplay,
              type: 'MEETING',
              clientName: client.clientName || client.companyName || 'Client',
              companyName: client.companyName || client.clientName || 'Client Workspace',
              clientEmail: client.email || '—',
              clientPhone: client.phone || '—',
              services: [`Rendez-vous : ${format}`],
              sector: client.servicesTier || 'WORKSPACE CLIENT',
              notes: `Rendez-vous prévu le ${displayDate} à ${time}.${agenda ? `\nOrdre du jour : ${agenda}` : ''}`,
              status: 'Nouveau RDV'
            });

            saveInquiries(currentInquiries);
            inquiries = currentInquiries;
            if (typeof updateAdminKPIs === 'function') updateAdminKPIs();
            if (typeof renderInquiriesTable === 'function') renderInquiriesTable();
          } catch (err) {
            console.error('Error saving meeting to admin inquiries:', err);
          }
        }

        // Show Success confirmation inside modal
        if (portalMeetingModalForm) portalMeetingModalForm.style.display = 'none';
        if (portalMeetingSuccessBox) {
          portalMeetingSuccessBox.style.display = 'block';
          if (portalBookedTimeText) {
            portalBookedTimeText.textContent = `${format} on ${date} at ${time}`;
          }
        }

        renderInteractiveCalendar();
        renderMeetingsList();
        updateTasksCounters();
        showPortalToast(`Meeting confirmed for ${date} at ${time}!`);
        if (window.lucide) window.lucide.createIcons();
      });
    }

    if (portalMeetingDoneBtn) {
      portalMeetingDoneBtn.addEventListener('click', closePortalMeetingModal);
    }

    // -----------------------------------------------------------------------
    // J. DEDICATED MEETINGS SUBVIEW & DIRECT SCHEDULER
    // -----------------------------------------------------------------------
    function renderMeetingsList() {
      const container = document.getElementById('portalScheduledMeetingsList');
      const countSub = document.getElementById('meetingsTabCountSub');
      if (!container) return;

      const client = getActiveClient();
      if (!client) {
        container.innerHTML = `
          <div class="empty-state-card" style="text-align:center; padding: 2.5rem 1rem; color: #64748b; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 0.85rem;">
            <i data-lucide="video-off" style="width: 36px; height: 36px; color: #94a3b8; margin-bottom: 0.8rem;"></i>
            <h4 style="color: #0f172a; font-size: 1rem; font-weight: 700; margin-bottom: 0.3rem;">No Active Client Session</h4>
            <p style="font-size: 0.85rem; max-width: 320px; margin: 0 auto;">Please sign in with your client account to view and book strategy sessions.</p>
          </div>
        `;
        if (countSub) countSub.textContent = '0 upcoming meetings';
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      const meetings = (Array.isArray(client.timeline) ? client.timeline : []).filter(e => e.type === 'Meeting');

      if (countSub) {
        countSub.textContent = `${meetings.length} upcoming session${meetings.length === 1 ? '' : 's'}`;
      }

      if (meetings.length === 0) {
        container.innerHTML = `
          <div class="empty-state-card" style="text-align:center; padding: 2.5rem 1rem; color: #64748b; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 0.85rem;">
            <i data-lucide="calendar" style="width: 36px; height: 36px; color: #0088ff; margin-bottom: 0.8rem;"></i>
            <h4 style="color: #0f172a; font-size: 1rem; font-weight: 700; margin-bottom: 0.3rem;">No Scheduled Sessions Yet</h4>
            <p style="font-size: 0.85rem; max-width: 320px; margin: 0 auto; line-height: 1.45;">Select a format on the left and book your next 1-on-1 strategy sync with your dedicated MotaGrowth team.</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      container.innerHTML = meetings.map((meet, idx) => {
        const meetLink = meet.link || 'https://meet.google.com/new';
        return `
          <div class="meeting-feed-card">
            <div class="meeting-feed-top">
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="type-chip meeting" style="padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; background: #e0f2fe; color: #0284c7;">
                  <i data-lucide="video" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle; margin-right: 3px;"></i>
                  ${escapeHtml(meet.title.replace('Rendez-vous : ', ''))}
                </span>
                <span class="status-tag scheduled" style="font-size: 0.72rem;">${escapeHtml(meet.status || 'Confirmed')}</span>
              </div>
              <span style="font-size: 0.78rem; font-weight: 700; color: #0088ff; background: rgba(0,136,255,0.08); padding: 0.2rem 0.5rem; border-radius: 6px;">
                Session #${idx + 1}
              </span>
            </div>

            <div class="meeting-feed-body">
              <div style="font-size: 0.88rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">
                ${escapeHtml(meet.date || meet.rawDate || 'Date to be confirmed')}
              </div>
              <div style="font-size: 0.82rem; color: #475569; line-height: 1.45;">
                ${escapeHtml(meet.description || 'Dedicated 1-on-1 strategy alignment session with Mohamed Tazi.')}
              </div>
            </div>

            <div class="meeting-feed-footer" style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-top: 0.4rem; padding-top: 0.6rem; border-top: 1px solid #f1f5f9; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; color: #64748b;">
                <i data-lucide="user" style="width: 13px; height: 13px; color: #0088ff;"></i>
                <span>Host: <strong>Mohamed Tazi (Lead Strategist)</strong></span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <a href="${escapeHtml(meetLink)}" target="_blank" rel="noopener noreferrer" class="btn-meeting-join" style="padding: 0.45rem 0.9rem; background: #0088ff; color: #fff; border-radius: 6px; font-size: 0.78rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; transition: background 0.2s;">
                  <i data-lucide="video" style="width: 13px; height: 13px;"></i>
                  <span>Join Call</span>
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (window.lucide) window.lucide.createIcons();
    }

    // Handle session type card selection highlight in Meetings tab
    document.querySelectorAll('#meetingsTabBookingForm .meet-type-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('#meetingsTabBookingForm .meet-type-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });

    const meetingsTabBookingForm = document.getElementById('meetingsTabBookingForm');
    if (meetingsTabBookingForm) {
      const tabMeetDate = document.getElementById('tabMeetDate');
      if (tabMeetDate && !tabMeetDate.value) {
        tabMeetDate.value = selectedCalDate || new Date().toISOString().split('T')[0];
      }

      meetingsTabBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formatRadio = meetingsTabBookingForm.querySelector('input[name="tabMeetType"]:checked');
        const format = formatRadio ? formatRadio.value : '30-min Growth Review';
        const date = document.getElementById('tabMeetDate')?.value || selectedCalDate;
        const time = document.getElementById('tabMeetTime')?.value || '2:00 PM EST';
        const agenda = document.getElementById('tabMeetAgenda')?.value.trim();

        const client = getActiveClient();
        if (!client) {
          showPortalToast('Please sign in to book a session.', 'alert-circle');
          return;
        }

        // Add to calendarEvents
        if (!client.calendarEvents) client.calendarEvents = {};
        if (!client.calendarEvents[date]) client.calendarEvents[date] = [];
        const meetingId = 'MEET-' + Date.now().toString(36);
        client.calendarEvents[date].push({
          id: meetingId,
          title: `Strategy Session (${format})`,
          type: 'Sync',
          time: time,
          desc: agenda || 'Scheduled directly from client meeting portal'
        });

        // Add to timeline
        if (!client.timeline) client.timeline = [];
        const displayDate = typeof formatDisplayDate === 'function' ? formatDisplayDate(date) : date;
        client.timeline.unshift({
          id: meetingId,
          date: displayDate,
          rawDate: date,
          title: `Rendez-vous : ${format}`,
          description: `${time}${agenda ? ` — Ordre du jour : ${agenda}` : ''}`,
          type: 'Meeting',
          status: 'Scheduled'
        });

        const currentClients = loadClients();
        const cIdx = currentClients.findIndex(c => c.id === client.id);
        if (cIdx !== -1) {
          currentClients[cIdx].calendarEvents = client.calendarEvents;
          currentClients[cIdx].timeline = client.timeline;
          saveClients(currentClients);
        }

        // Add to admin inquiries
        try {
          const currentInquiries = loadInquiries();
          const now = new Date();
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const dateDisplay = `${day}/${month}/${now.getFullYear()}<br><span style="color: #64748b; font-weight: 500;">${hours}:${minutes}</span>`;

          currentInquiries.unshift({
            id: 'MEET-' + Date.now().toString(36).toUpperCase(),
            createdAt: now.toISOString(),
            dateDisplay: dateDisplay,
            type: 'MEETING',
            clientName: client.clientName || client.companyName || 'Client',
            companyName: client.companyName || client.clientName || 'Client Workspace',
            clientEmail: client.email || '—',
            clientPhone: client.phone || '—',
            services: [`Rendez-vous : ${format}`],
            sector: client.servicesTier || 'WORKSPACE CLIENT',
            notes: `Rendez-vous prévu le ${displayDate} à ${time}.${agenda ? `\nOrdre du jour : ${agenda}` : ''}`,
            status: 'Nouveau RDV'
          });

          saveInquiries(currentInquiries);
          inquiries = currentInquiries;
          if (typeof updateAdminKPIs === 'function') updateAdminKPIs();
          if (typeof renderInquiriesTable === 'function') renderInquiriesTable();
        } catch (err) {
          console.error('Error saving meeting to admin inquiries:', err);
        }

        renderMeetingsList();
        renderInteractiveCalendar();
        updateTasksCounters();
        showPortalToast(`Meeting booked for ${date} at ${time}! Admin notified.`);
        if (document.getElementById('tabMeetAgenda')) document.getElementById('tabMeetAgenda').value = '';
      });
    }

    // Expose portal refresher for dynamic switching & account logins
    window._motaSwitchPortalTab = switchPortalSubView;
    window._motaRefreshPortal = function() {
      try {
        renderHomeTasksTable();
        renderInteractiveCalendar();
        renderMeetingsList();
        renderIdeasList();
        renderVaultDocs();
        updateTasksCounters();
        bindDownloadButtons();
        switchPortalSubView(currentActiveTab || 'home');
      } catch (err) {
        console.warn('Portal refresh error:', err);
      }
    };

    // Auto-refresh when localStorage is updated across tabs or admin modals
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_INQUIRIES) {
        inquiries = loadInquiries();
        renderAdminPortal();
      }
      if (e.key === STORAGE_CLIENTS) {
        clients = loadClients();
        renderAdminPortal();
        if (typeof window._motaRefreshPortal === 'function') {
          window._motaRefreshPortal();
        }
      }
    });

    // --- Initial Boot of Interactive Portal Components ---
    renderHomeTasksTable();
    bindDownloadButtons();
    updateTasksCounters();

    // --- Universal Studio Precision Cursor for Client Space ---
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isFinePointer) {
      let cursorDot = document.getElementById('cursor-dot');
      let cursorRing = document.getElementById('cursor-ring');

      if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'studio-cursor-dot';
        cursorDot.id = 'cursor-dot';
        cursorDot.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cursorDot);
      }
      if (!cursorRing) {
        cursorRing = document.createElement('div');
        cursorRing.className = 'studio-cursor-ring';
        cursorRing.id = 'cursor-ring';
        cursorRing.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cursorRing);
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

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

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

      document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (!target) return;

        const textInput = target.closest('input[type="text"], input[type="password"], input[type="email"], input[type="number"], input[type="search"], textarea, [contenteditable="true"]');
        const interactive = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], select, label, summary, .portal-nav-btn, .tab-btn, .portal-btn, .action-btn, .btn-gold-pill, .btn-ghost, .folder-card, .btn-file-action, .chip');

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
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotaGrowthApp);
} else {
  initMotaGrowthApp();
}

