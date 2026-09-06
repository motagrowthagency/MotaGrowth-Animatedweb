/**
 * MotaGrowth - Unified Agency Platform Engine
 * 1. Native Motion Video Animation with Sound (finalanimation.mp4)
 * 2. 4-Step Agency Intake Brief Wizard
 * 3. Dedicated Client Space Portal (Calendar, Approvals, Ideas, Assets)
 * 4. Private Agency Admin CRM (Leads, Client Account Creator, Workspace Manager)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Icons
  if (window.lucide) window.lucide.createIcons();

  // Storage Keys
  const STORAGE_INQUIRIES = 'motagrowth_v6_inquiries_db';
  const STORAGE_CLIENTS = 'motagrowth_v6_clients_db';

  // Load Initial State
  let inquiries = loadInquiries();
  let clients = loadClients();
  let loggedInClient = null;
  let activeEditingClientId = null;
  let currentWizardStep = 1;
  let activeClientTab = 'home';
  let activeFolderCategory = 'all';
  let activeCalendarPlatform = 'all';
  let activeIdeasFilter = 'all';
  let activeDetailIdeaId = null;

  // DOM Elements - Views
  const landingView = document.getElementById('landingView');
  const clientPortalView = document.getElementById('clientPortalView');
  const adminPortalView = document.getElementById('adminPortalView');

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
  const tabClientsBtn = document.getElementById('tabClientsBtn');
  const adminInquiriesSection = document.getElementById('adminInquiriesSection');
  const adminClientsSection = document.getElementById('adminClientsSection');
  const inquiriesTableBody = document.getElementById('inquiriesTableBody');
  const inquiriesEmptyState = document.getElementById('inquiriesEmptyState');
  const inquirySearchInput = document.getElementById('inquirySearchInput');
  const inquiryStatusFilter = document.getElementById('inquiryStatusFilter');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
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
    const hash = window.location.hash.toLowerCase();

    if (hash === '#admin') {
      showAdminView();
    } else if (hash === '#client-space') {
      showClientSpaceView();
    } else {
      showLandingView();
    }
  }

  function showLandingView() {
    document.body.classList.remove('is-admin-route');
    document.body.classList.remove('is-client-route');
    landingView.style.display = 'flex';
    clientPortalView.style.display = 'none';
    adminPortalView.style.display = 'none';
    if (window.lucide) window.lucide.createIcons();
  }

  function showClientSpaceView() {
    document.body.classList.remove('is-admin-route');
    document.body.classList.add('is-client-route');
    landingView.style.display = 'none';
    adminPortalView.style.display = 'none';
    clientPortalView.style.display = 'block';

    if (window.lucide) window.lucide.createIcons();
  }

  function showAdminView() {
    document.body.classList.remove('is-client-route');
    document.body.classList.add('is-admin-route');
    landingView.style.display = 'none';
    clientPortalView.style.display = 'none';
    adminPortalView.style.display = 'block';
    renderAdminPortal();
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

  const portalHomeLink = document.getElementById('portalHomeLink');
  if (portalHomeLink) {
    portalHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '';
      showLandingView();
    });
  }

  // =========================================================================
  // 2. SLEEK NATIVE ANIMATION TRIGGER WITH AUDIO (finalanimation.mp4)
  // =========================================================================

  let isAnimationEnding = false;

  function playNativeAnimation() {
    isAnimationEnding = false;

    // Smoothly fade out center hero copy and button
    if (heroCenterWrapper) {
      heroCenterWrapper.classList.add('animating-out');
    }

    // Play finalanimation.mp4 with audio unmuted
    if (motionVideo) {
      motionVideo.classList.add('playing');
      motionVideo.currentTime = 0;
      motionVideo.muted = false;
      motionVideo.volume = 1.0;

      const playPromise = motionVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Audio autoplay fallback:', err);
          motionVideo.muted = true;
          motionVideo.play();
        });
      }
    }
  }

  function onAnimationComplete() {
    if (isAnimationEnding) return;
    isAnimationEnding = true;

    // Open the white intake modal smoothly over the video's radiant climax
    openIntakeModal();
  }

  if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playNativeAnimation();
    });
  }

  if (motionVideo) {
    motionVideo.addEventListener('ended', () => {
      onAnimationComplete();
    });

    // Seamless trigger near peak illumination
    motionVideo.addEventListener('timeupdate', () => {
      if (motionVideo.duration && motionVideo.currentTime >= motionVideo.duration - 0.12) {
        onAnimationComplete();
      }
    });
  }

  // =========================================================================
  // 3. INTAKE BRIEF QUESTIONNAIRE
  // =========================================================================

  function openIntakeModal() {
    intakeModal.classList.add('active');
    intakeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    resetIntakeForm();
    if (window.lucide) window.lucide.createIcons();
  }

  function closeIntakeModal() {
    intakeModal.classList.remove('active');
    intakeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Smoothly fade out and restore the landing hero state
    setTimeout(() => {
      if (motionVideo) {
        motionVideo.pause();
        motionVideo.currentTime = 0;
        motionVideo.classList.remove('playing');
      }
      if (heroCenterWrapper) {
        heroCenterWrapper.classList.remove('animating-out');
      }
      isAnimationEnding = false;
    }, 450);
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
        let platLabel = '✦ GENERAL';
        let platClass = 'meta';

        if (plat === 'tiktok') {
          platLabel = '🎵 TIKTOK REELS';
          platClass = 'tiktok';
        } else if (plat === 'instagram') {
          platLabel = '📸 INSTAGRAM';
          platClass = 'instagram';
        } else if (plat === 'meta') {
          platLabel = '⚡ META ADS';
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
      const priorityLabel = item.priority === 'High' ? '🔥 HIGH PRIORITY' : (item.priority === 'Medium' ? '⚡ MEDIUM PRIORITY' : '✦ LOW PRIORITY');
      
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
          if (confirm(`Are you sure you want to decline the proposal "${target.title}"?`)) {
            target.status = 'Denied';
            saveClients(clients);
            renderClientDashboard(client);
          }
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
  // 5. PRIVATE ADMIN CRM & CLIENT WORKSPACE MANAGEMENT (ORSAP THEME)
  // =========================================================================

  function renderAdminPortal() {
    updateAdminKPIs();
    renderInquiriesTable();
    renderClientsGrid();
  }

  function updateAdminKPIs() {
    const total = inquiries.length;
    const countBadge = document.getElementById('tabLeadCountBadge');
    if (countBadge) countBadge.textContent = total;

    const inquiriesTitle = document.getElementById('inquiriesCardTitle');
    if (inquiriesTitle) inquiriesTitle.textContent = `Demandes de Devis Reçues (${total})`;

    const clientBadge = document.getElementById('tabClientCountBadge');
    if (clientBadge) clientBadge.textContent = clients.length;
  }

  function formatDateTime(isoString) {
    if (!isoString) return '—';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year}<br>${hours}:${minutes}`;
    } catch (e) {
      return isoString;
    }
  }

  function renderInquiriesTable() {
    const search = (inquirySearchInput ? inquirySearchInput.value : '').toLowerCase().trim();

    const filtered = inquiries.filter(i => {
      if (!search) return true;
      const name = (i.clientName || '').toLowerCase();
      const company = (i.companyName || '').toLowerCase();
      const email = (i.clientEmail || '').toLowerCase();
      const phone = (i.clientPhone || '').toLowerCase();
      const notes = (i.notes || '').toLowerCase();
      const sector = (i.sector || '').toLowerCase();
      const services = (i.services || []).join(' ').toLowerCase();

      return name.includes(search) || company.includes(search) || email.includes(search) ||
             phone.includes(search) || notes.includes(search) || sector.includes(search) || services.includes(search);
    });

    if (filtered.length === 0) {
      inquiriesTableBody.innerHTML = '';
      if (inquiriesEmptyState) inquiriesEmptyState.style.display = 'block';
      return;
    }

    if (inquiriesEmptyState) inquiriesEmptyState.style.display = 'none';

    inquiriesTableBody.innerHTML = filtered.map(item => {
      const typeClass = (item.type || 'PRO').toUpperCase() === 'PRO' ? 'pro' : 'particulier';
      const typeLabel = (item.type || 'PRO').toUpperCase();

      const servicesHtml = (item.services && item.services.length > 0)
        ? item.services.map(s => `<span class="solution-tag">${escapeHtml(s.toUpperCase())}</span>`).join('')
        : '—';

      const sectorHtml = (item.sector && item.sector !== '—')
        ? `<span class="sector-tag">${escapeHtml(item.sector.toUpperCase())}</span>`
        : '—';

      const emailHtml = (item.clientEmail && item.clientEmail !== '—')
        ? `<a href="mailto:${escapeHtml(item.clientEmail)}" class="tbl-link">${escapeHtml(item.clientEmail)}</a>`
        : '—';

      const phoneHtml = (item.clientPhone && item.clientPhone !== '—')
        ? `<a href="tel:${escapeHtml(item.clientPhone)}" class="tbl-link">${escapeHtml(item.clientPhone)}</a>`
        : '—';

      const messageHtml = (item.notes && item.notes !== '—')
        ? escapeHtml(item.notes)
        : '—';

      const dateHtml = item.dateDisplay || formatDateTime(item.createdAt);

      return `
        <tr>
          <td><div class="date-stamp">${dateHtml}</div></td>
          <td><span class="type-chip ${typeClass}">${typeLabel}</span></td>
          <td><span class="tbl-name">${escapeHtml(item.clientName || '—')}</span></td>
          <td>${escapeHtml(item.companyName || '—')}</td>
          <td>${emailHtml}</td>
          <td>${phoneHtml}</td>
          <td>${servicesHtml}</td>
          <td>${sectorHtml}</td>
          <td><div class="tbl-message">${messageHtml}</div></td>
          <td>
            <button class="btn-delete-row delete-inquiry-btn" data-id="${item.id}" title="Supprimer la demande">
              Supprimer
            </button>
          </td>
        </tr>
      `;
    }).join('');

    inquiriesTableBody.querySelectorAll('.delete-inquiry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
          inquiries = inquiries.filter(i => i.id !== id);
          saveInquiries(inquiries);
          renderAdminPortal();
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function renderClientsGrid() {
    adminClientsGrid.innerHTML = clients.map(c => `
      <div class="admin-client-card">
        <div class="client-card-top">
          <div class="client-card-title">
            <h3>${escapeHtml(c.companyName)}</h3>
            <span>${escapeHtml(c.clientName)}</span>
          </div>
          <span class="status-tag approved">${escapeHtml(c.status || 'Active')}</span>
        </div>

        <div class="client-meta-box">
          <div><strong style="color: var(--text-white);">Login Email:</strong> ${escapeHtml(c.email)}</div>
          <div><strong style="color: var(--text-white);">Password:</strong> <code>${escapeHtml(c.password)}</code></div>
          <div><strong style="color: var(--text-white);">Service Tier:</strong> ${escapeHtml(c.servicesTier)}</div>
        </div>

        <div class="client-stats-badges">
          <span class="stat-chip">${(c.approvals || []).length} Approvals</span>
          <span class="stat-chip">${(c.timeline || []).length} Milestones</span>
          <span class="stat-chip">${(c.ideas || []).length} Ideas</span>
        </div>

        <div class="client-card-actions">
          <button class="btn-gold-pill btn-small manage-client-btn" data-id="${c.id}">
            <i data-lucide="sliders"></i>
            <span>Manage Workspace</span>
          </button>
          <button class="btn-ghost-small delete-client-btn" data-id="${c.id}" title="Delete Client">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `).join('');

    adminClientsGrid.querySelectorAll('.manage-client-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openManageClientModal(id);
      });
    });

    adminClientsGrid.querySelectorAll('.delete-client-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this client workspace account?')) {
          clients = clients.filter(c => c.id !== id);
          saveClients(clients);
          renderAdminPortal();
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Admin Tab Switcher
  tabInquiriesBtn.addEventListener('click', () => {
    tabInquiriesBtn.classList.add('active');
    tabClientsBtn.classList.remove('active');
    adminInquiriesSection.style.display = 'block';
    adminClientsSection.style.display = 'none';
  });

  tabClientsBtn.addEventListener('click', () => {
    tabClientsBtn.classList.add('active');
    tabInquiriesBtn.classList.remove('active');
    adminInquiriesSection.style.display = 'none';
    adminClientsSection.style.display = 'block';
    renderClientsGrid();
  });

  if (inquirySearchInput) {
    inquirySearchInput.addEventListener('input', renderInquiriesTable);
  }

  // CSV Export
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      if (inquiries.length === 0) { alert('Aucune demande à exporter.'); return; }
      const headers = ['DATE', 'TYPE', 'NOM', 'ENTREPRISE', 'EMAIL', 'TELEPHONE', 'SOLUTIONS', 'SECTEURS', 'MESSAGE'];
      const rows = inquiries.map(i => [
        `"${(i.dateDisplay || i.createdAt || '').replace(/<br>/g, ' ')}"`,
        `"${i.type || 'PRO'}"`,
        `"${i.clientName || '—'}"`,
        `"${i.companyName || '—'}"`,
        `"${i.clientEmail || '—'}"`,
        `"${i.clientPhone || '—'}"`,
        `"${(i.services || []).join('; ')}"`,
        `"${i.sector || i.primaryGoal || '—'}"`,
        `"${(i.notes || '—').replace(/"/g, '""')}"`
      ]);
      const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      downloadBlob(csv, `motagrowth_inquiries_${Date.now()}.csv`, 'text/csv;charset=utf-8;');
    });
  }

  // Create Client Modal
  openNewClientModalBtn.addEventListener('click', () => {
    createClientModal.style.display = 'flex';
  });
  closeCreateClientBtn.addEventListener('click', () => createClientModal.style.display = 'none');
  cancelCreateClientBtn.addEventListener('click', () => createClientModal.style.display = 'none');

  createClientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newClient = {
      id: 'CLI-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      createdAt: new Date().toISOString(),
      clientName: document.getElementById('newClientName').value.trim(),
      companyName: document.getElementById('newClientCompany').value.trim(),
      email: document.getElementById('newClientEmail').value.trim(),
      username: document.getElementById('newClientEmail').value.trim(),
      password: document.getElementById('newClientPassword').value.trim(),
      servicesTier: document.getElementById('newClientServices').value,
      status: document.getElementById('newClientStatus').value,
      summary: document.getElementById('newClientSummary').value.trim(),
      approvals: [],
      timeline: [],
      ideas: [],
      links: []
    };

    clients.unshift(newClient);
    saveClients(clients);
    createClientModal.style.display = 'none';
    createClientForm.reset();
    renderAdminPortal();
    alert(`Client account created for ${newClient.companyName}! Credentials: ${newClient.email} / ${newClient.password}`);
  });

  // Manage Client Modal Tabs & Editor
  function openManageClientModal(clientId) {
    activeEditingClientId = clientId;
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    manageClientTitle.textContent = `Workspace: ${client.companyName}`;
    manageClientSub.textContent = `Client: ${client.clientName} (${client.email})`;

    renderEditorApprovals(client);
    renderEditorCalendar(client);
    renderEditorIdeas(client);
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
  document.querySelectorAll('.editor-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.editor-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      if (target === 'approvals') document.getElementById('paneApprovals').classList.add('active');
      if (target === 'calendar') document.getElementById('paneCalendar').classList.add('active');
      if (target === 'ideas') document.getElementById('paneIdeas').classList.add('active');
      if (target === 'info') document.getElementById('paneInfo').classList.add('active');
      if (window.lucide) window.lucide.createIcons();
    });
  });

  function renderEditorApprovals(client) {
    const list = document.getElementById('editorApprovalsList');
    if (!client.approvals || client.approvals.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No approval items yet. Click "+ Add Approval Item" above.</p>`;
      return;
    }

    list.innerHTML = client.approvals.map(item => `
      <div class="editor-row-item">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span class="status-tag ${item.status.toLowerCase().replace(/\s+/g, '-')}" style="margin-left: 0.5rem;">${escapeHtml(item.status)}</span>
          <p style="font-size: 0.82rem; color: var(--text-gray); margin-top: 0.2rem;">${escapeHtml(item.description)}</p>
        </div>
        <button class="btn-ghost-small delete-appr-btn" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
      </div>
    `).join('');

    list.querySelectorAll('.delete-appr-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        client.approvals = client.approvals.filter(a => a.id !== id);
        saveClients(clients);
        renderEditorApprovals(client);
      });
    });
  }

  document.getElementById('addApprovalItemBtn').addEventListener('click', () => {
    const client = clients.find(c => c.id === activeEditingClientId);
    if (!client) return;

    const title = prompt('Approval Item Title (e.g. Website Homepage Wireframe v2):');
    if (!title) return;
    const desc = prompt('Description or details of what needs client sign-off:') || '';

    if (!client.approvals) client.approvals = [];
    client.approvals.push({
      id: 'APP-' + Date.now().toString(36),
      title: title.trim(),
      description: desc.trim(),
      status: 'Pending'
    });

    saveClients(clients);
    renderEditorApprovals(client);
  });

  function renderEditorCalendar(client) {
    const list = document.getElementById('editorCalendarList');
    if (!client.timeline || client.timeline.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No calendar events yet. Click "+ Add Calendar Event" above.</p>`;
      return;
    }

    list.innerHTML = client.timeline.map(item => `
      <div class="editor-row-item">
        <div>
          <span class="gold-text" style="font-size: 0.78rem; font-weight: 700;">${escapeHtml(item.date)}</span>
          <strong style="display: block;">${escapeHtml(item.title)}</strong>
          <p style="font-size: 0.82rem; color: var(--text-gray);">${escapeHtml(item.description)}</p>
        </div>
        <button class="btn-ghost-small delete-cal-btn" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
      </div>
    `).join('');

    list.querySelectorAll('.delete-cal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        client.timeline = client.timeline.filter(t => t.id !== id);
        saveClients(clients);
        renderEditorCalendar(client);
      });
    });
  }

  document.getElementById('addCalendarItemBtn').addEventListener('click', () => {
    const client = clients.find(c => c.id === activeEditingClientId);
    if (!client) return;

    const date = prompt('Event Date / Deadline (e.g. Oct 12, 2026):');
    if (!date) return;
    const title = prompt('Event Title (e.g. Social Content Batch Review):');
    if (!title) return;
    const desc = prompt('Event Notes:') || '';

    if (!client.timeline) client.timeline = [];
    client.timeline.push({
      id: 'CAL-' + Date.now().toString(36),
      date: date.trim(),
      title: title.trim(),
      description: desc.trim()
    });

    saveClients(clients);
    renderEditorCalendar(client);
  });

  function renderEditorIdeas(client) {
    const list = document.getElementById('editorIdeasList');
    if (!client.ideas || client.ideas.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No creative ideas posted yet. Click "+ Add Creative Idea" above.</p>`;
      return;
    }

    list.innerHTML = client.ideas.map(item => `
      <div class="editor-row-item">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <p style="font-size: 0.82rem; color: var(--text-gray); margin-top: 0.2rem;">${escapeHtml(item.description)}</p>
        </div>
        <button class="btn-ghost-small delete-idea-btn" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
      </div>
    `).join('');

    list.querySelectorAll('.delete-idea-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        client.ideas = client.ideas.filter(i => i.id !== id);
        saveClients(clients);
        renderEditorIdeas(client);
      });
    });
  }

  document.getElementById('addIdeaItemBtn').addEventListener('click', () => {
    const client = clients.find(c => c.id === activeEditingClientId);
    if (!client) return;

    const title = prompt('Proposal / Concept Title (e.g. Dark-Mode 3D Product Interactive Page):');
    if (!title) return;
    const priority = prompt('Priority ranking (High, Medium, or Low):', 'High') || 'High';
    const category = prompt('Category (e.g. Website & 3D UX, Paid Ads, Viral Video, Brand Strategy):', 'Website & 3D UX') || 'Growth Strategy';
    const desc = prompt('Idea Details / Strategic Impact:') || '';

    if (!client.ideas) client.ideas = [];
    client.ideas.unshift({
      id: 'IDEA-' + Date.now().toString(36),
      rank: 1,
      priority: (priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()),
      category: category.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: title.trim(),
      description: desc.trim(),
      impact: 'Strategic Deliverable Proposal',
      assetLink: null,
      status: 'Pending',
      clientFeedback: null
    });

    saveClients(clients);
    renderEditorIdeas(client);
  });

  function renderEditorInfo(client) {
    document.getElementById('editorProjectSummary').value = client.summary || '';
    const linksText = (client.links || []).map(l => `${l.label}: ${l.url}`).join('\n');
    document.getElementById('editorSharedLinks').value = linksText;
  }

  document.getElementById('saveProjectInfoBtn').addEventListener('click', () => {
    const client = clients.find(c => c.id === activeEditingClientId);
    if (!client) return;

    client.summary = document.getElementById('editorProjectSummary').value.trim();
    const rawLinks = document.getElementById('editorSharedLinks').value.trim().split('\n');
    
    client.links = rawLinks
      .filter(line => line.includes(':'))
      .map(line => {
        const parts = line.split(/:\s*(.+)/);
        return { label: parts[0].trim(), url: parts[1].trim() };
      });

    saveClients(clients);
    alert('Project specifications and links saved!');
  });

  // =========================================================================
  // 6. DATA PERSISTENCE & SEEDING
  // =========================================================================

  function loadInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_INQUIRIES);
      if (data) {
        const parsed = JSON.parse(data);
        const hasLegacy = Array.isArray(parsed) && parsed.some(item => 
          item.companyName === 'Orsap' || 
          item.companyName === 'ORSAP' || 
          (item.sector && item.sector.includes('BTP')) || 
          (item.services && JSON.stringify(item.services).includes('PROTECTION')) ||
          item.type === 'PARTICULIER'
        );
        if (Array.isArray(parsed) && parsed.length > 0 && !hasLegacy) {
          return parsed;
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
      if (data) return JSON.parse(data);
    } catch (e) { console.error(e); }
    return getSeedClients();
  }

  function saveClients(arr) {
    try { localStorage.setItem(STORAGE_CLIENTS, JSON.stringify(arr)); }
    catch (e) { console.error(e); }
  }

  function getSeedInquiries() {
    return [
      {
        id: 'DEVIS-001',
        createdAt: '2026-09-05T14:18:00',
        dateDisplay: '05/09/2026<br>14:18',
        type: 'STARTUP',
        clientName: 'Marcus Vance',
        companyName: 'Hyperion Digital',
        clientEmail: 'marcus@hyperiondigital.co',
        clientPhone: '+1 (555) 345-6789',
        services: ['CUSTOM WEBSITE DESIGN & DEV', 'BRAND IDENTITY & CREATIVE DIRECTION'],
        sector: 'TECH & SAAS',
        notes: 'Need a high-converting 3D animated web platform with client portal.',
        status: 'New'
      },
      {
        id: 'DEVIS-002',
        createdAt: '2026-09-04T19:13:00',
        dateDisplay: '04/09/2026<br>19:13',
        type: 'PRO',
        clientName: 'Elena Rostova',
        companyName: 'Velour Luxury Apparel',
        clientEmail: 'elena@velourclothing.co',
        clientPhone: '+1 (415) 890-4411',
        services: ['CUSTOM WEBSITE DESIGN & DEV', 'PAID ADS & PERFORMANCE MARKETING'],
        sector: 'LUXURY E-COMMERCE',
        notes: 'Looking to scale TikTok & Meta ads to $150k/month revenue.',
        status: 'Contacted'
      },
      {
        id: 'DEVIS-003',
        createdAt: '2026-09-03T14:29:00',
        dateDisplay: '03/09/2026<br>14:29',
        type: 'ENTERPRISE',
        clientName: 'Liam Thorne',
        companyName: 'Lumina Health Global',
        clientEmail: 'liam@luminahealth.com',
        clientPhone: '+44 20 7946 0912',
        services: ['CUSTOM WEBSITE DESIGN & DEV', 'SOCIAL MEDIA GROWTH & MANAGEMENT', 'BRAND IDENTITY & CREATIVE DIRECTION'],
        sector: 'HEALTH & BIO',
        notes: 'Complete rebrand, custom digital experience and monthly viral reels.',
        status: 'Proposal Sent'
      },
      {
        id: 'DEVIS-004',
        createdAt: '2026-09-02T21:49:00',
        dateDisplay: '02/09/2026<br>21:49',
        type: 'PRO',
        clientName: 'Sofia Alami',
        companyName: 'Aura Lifestyle',
        clientEmail: 'sofia@auralifestyle.io',
        clientPhone: '+33 6 12 34 56 78',
        services: ['PAID ADS & PERFORMANCE MARKETING', 'SOCIAL MEDIA GROWTH & MANAGEMENT'],
        sector: 'BEAUTY & LIFESTYLE',
        notes: 'Full-funnel influencer marketing and conversion rate optimization.',
        status: 'New'
      }
    ];
  }

  function getSeedClients() {
    return [
      {
        id: 'CLI-VELOUR',
        createdAt: new Date().toISOString(),
        clientName: 'Elena Rostova',
        companyName: 'Velour Luxury Apparel',
        email: 'elena@velourclothing.co',
        username: 'elena@velourclothing.co',
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
});
