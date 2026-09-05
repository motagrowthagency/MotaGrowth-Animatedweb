/**
 * MotaGrowth - Unified Agency Platform Engine
 * 1. Native Seamless Video Animation with Sound
 * 2. 4-Step Agency Intake Brief Wizard
 * 3. Dedicated Client Space Portal (Calendar, Approvals, Ideas, Assets)
 * 4. Private Agency Admin CRM (Leads, Client Account Creator, Workspace Manager)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Icons
  if (window.lucide) window.lucide.createIcons();

  // Storage Keys
  const STORAGE_INQUIRIES = 'motagrowth_inquiries_db';
  const STORAGE_CLIENTS = 'motagrowth_clients_db';

  // Load Initial State
  let inquiries = loadInquiries();
  let clients = loadClients();
  let loggedInClient = null;
  let activeEditingClientId = null;
  let currentWizardStep = 1;

  // DOM Elements - Views
  const landingView = document.getElementById('landingView');
  const clientPortalView = document.getElementById('clientPortalView');
  const adminPortalView = document.getElementById('adminPortalView');

  // DOM Elements - Hero & Animation
  const startExperienceBtn = document.getElementById('startExperienceBtn');
  const heroCenterContent = document.getElementById('heroCenterContent');
  const handsStillImg = document.getElementById('handsStillImg');
  const seamlessVideo = document.getElementById('seamlessVideo');

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
    landingView.style.display = 'flex';
    clientPortalView.style.display = 'none';
    adminPortalView.style.display = 'none';
    if (window.lucide) window.lucide.createIcons();
  }

  function showClientSpaceView() {
    landingView.style.display = 'none';
    adminPortalView.style.display = 'none';
    clientPortalView.style.display = 'block';

    if (loggedInClient) {
      renderClientDashboard(loggedInClient);
    } else {
      clientLoginScreen.style.display = 'block';
      clientDashboardScreen.style.display = 'none';
      clientLogoutBtn.style.display = 'none';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function showAdminView() {
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
  // 2. SEAMLESS NATIVE VIDEO ANIMATION WITH AUDIO (NO VIDEO OVERLAYS/TIMERS)
  // =========================================================================

  function triggerAnimation() {
    // Fade out hero text
    heroCenterContent.classList.add('animating-out');

    // Switch image to video and play unmuted
    seamlessVideo.classList.add('playing');
    seamlessVideo.currentTime = 0;
    seamlessVideo.muted = false;
    seamlessVideo.volume = 1.0;

    const playPromise = seamlessVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Audio autoplay fallback:', err);
        // Fallback to muted if browser requires
        seamlessVideo.muted = true;
        seamlessVideo.play();
      });
    }
  }

  function finishAnimationAndOpenForm() {
    seamlessVideo.pause();
    seamlessVideo.classList.remove('playing');
    heroCenterContent.classList.remove('animating-out');
    openIntakeModal();
  }

  if (startExperienceBtn) {
    startExperienceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAnimation();
    });
  }

  if (seamlessVideo) {
    seamlessVideo.addEventListener('ended', () => {
      finishAnimationAndOpenForm();
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
        id: 'BRIEF-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        createdAt: new Date().toISOString(),
        clientName: document.getElementById('inputClientName').value.trim(),
        clientEmail: document.getElementById('inputClientEmail').value.trim(),
        clientPhone: document.getElementById('inputClientPhone').value.trim(),
        companyName: document.getElementById('inputCompanyName').value.trim(),
        currentUrl: document.getElementById('inputCurrentUrl').value.trim(),
        services: selectedServices,
        primaryGoal: document.getElementById('inputPrimaryGoal').value,
        targetAudience: document.getElementById('inputAudience').value.trim(),
        businessStage: document.getElementById('inputBusinessStage').value,
        budget: document.getElementById('inputBudget').value,
        timeline: document.getElementById('inputTimeline').value,
        notes: document.getElementById('inputNotes').value.trim(),
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
  // 4. CLIENT SPACE PORTAL
  // =========================================================================

  if (clientLoginForm) {
    clientLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clientLoginError.textContent = '';

      const user = clientLoginUser.value.trim().toLowerCase();
      const pass = clientLoginPass.value.trim();

      const foundClient = clients.find(c => 
        (c.email.toLowerCase() === user || c.username.toLowerCase() === user) &&
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

  function renderClientDashboard(client) {
    clientLoginScreen.style.display = 'none';
    clientDashboardScreen.style.display = 'block';
    clientLogoutBtn.style.display = 'inline-flex';

    document.getElementById('clientTagTier').textContent = client.servicesTier || 'Active Client Workspace';
    document.getElementById('clientBrandName').textContent = client.companyName;
    document.getElementById('clientProjectSummary').textContent = client.summary || 'Your dedicated roadmap and deliverables.';

    // 1. Render Approvals
    renderClientApprovals(client);

    // 2. Render Timeline
    renderClientTimeline(client);

    // 3. Render Ideas
    renderClientIdeas(client);

    // 4. Render Info
    renderClientInfo(client);

    if (window.lucide) window.lucide.createIcons();
  }

  function renderClientApprovals(client) {
    const list = document.getElementById('clientApprovalsList');
    const countBadge = document.getElementById('clientPendingCount');
    const pendingCount = (client.approvals || []).filter(a => a.status === 'Pending').length;
    countBadge.textContent = `${pendingCount} Pending`;

    if (!client.approvals || client.approvals.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.88rem;">No approval items currently pending review.</p>`;
      return;
    }

    list.innerHTML = client.approvals.map(item => `
      <div class="approval-item">
        <div class="approval-item-top">
          <span class="approval-item-title">${escapeHtml(item.title)}</span>
          <span class="status-tag ${item.status.toLowerCase().replace(/\s+/g, '-')}">${escapeHtml(item.status)}</span>
        </div>
        <p class="approval-item-desc">${escapeHtml(item.description)}</p>
        ${item.status === 'Pending' ? `
          <div class="approval-actions">
            <button class="btn-approve" data-id="${item.id}">Approve</button>
            <button class="btn-changes" data-id="${item.id}">Request Changes</button>
          </div>
        ` : ''}
      </div>
    `).join('');

    // Attach client approval actions
    list.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const target = client.approvals.find(a => a.id === id);
        if (target) {
          target.status = 'Approved';
          saveClients(clients);
          renderClientDashboard(client);
        }
      });
    });

    list.querySelectorAll('.btn-changes').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const target = client.approvals.find(a => a.id === id);
        if (target) {
          const reason = prompt('Please describe the adjustments you would like:');
          if (reason) {
            target.status = 'Changes Requested';
            target.description += ` [Client note: ${reason}]`;
            saveClients(clients);
            renderClientDashboard(client);
          }
        }
      });
    });
  }

  function renderClientTimeline(client) {
    const list = document.getElementById('clientTimelineList');
    if (!client.timeline || client.timeline.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.88rem;">No schedule events posted yet.</p>`;
      return;
    }

    list.innerHTML = client.timeline.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-date">${escapeHtml(item.date)}</span>
          <span class="timeline-title">${escapeHtml(item.title)}</span>
          <p class="timeline-desc">${escapeHtml(item.description)}</p>
        </div>
      </div>
    `).join('');
  }

  function renderClientIdeas(client) {
    const list = document.getElementById('clientIdeasList');
    if (!client.ideas || client.ideas.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.88rem;">No creative ideas posted yet.</p>`;
      return;
    }

    list.innerHTML = client.ideas.map(item => `
      <div class="idea-card-item">
        <div class="idea-card-title">${escapeHtml(item.title)}</div>
        <p class="idea-card-desc">${escapeHtml(item.description)}</p>
      </div>
    `).join('');
  }

  function renderClientInfo(client) {
    const body = document.getElementById('clientInfoBody');
    const linksHtml = (client.links || []).map(link => `
      <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">
        <i data-lucide="external-link"></i>
        <span>${escapeHtml(link.label)}</span>
      </a>
    `).join('');

    body.innerHTML = `
      <div class="info-block">
        <strong>Assigned Package</strong>
        <p>${escapeHtml(client.servicesTier || 'Full-Service Growth')}</p>
      </div>
      <div class="info-block">
        <strong>Project Guidelines</strong>
        <p>${escapeHtml(client.summary || 'Tailored brand acceleration & growth strategy.')}</p>
      </div>
      ${linksHtml ? `
        <div class="info-block">
          <strong>Key Links & Assets</strong>
          <div class="info-links-list">${linksHtml}</div>
        </div>
      ` : ''}
    `;
  }

  // =========================================================================
  // 5. PRIVATE ADMIN CRM & CLIENT WORKSPACE MANAGEMENT
  // =========================================================================

  function renderAdminPortal() {
    updateAdminKPIs();
    renderInquiriesTable();
    renderClientsGrid();
  }

  function updateAdminKPIs() {
    const total = inquiries.length;
    const newCount = inquiries.filter(i => i.status === 'New').length;
    const discussCount = inquiries.filter(i => i.status === 'Contacted' || i.status === 'Proposal Sent').length;
    const closedCount = inquiries.filter(i => i.status === 'Closed Won').length;

    let pipeline = 0;
    inquiries.forEach(i => {
      if (i.budget.includes('15,000+')) pipeline += 20000;
      else if (i.budget.includes('8,000')) pipeline += 11500;
      else if (i.budget.includes('4,000')) pipeline += 6000;
      else pipeline += 3000;
    });

    document.getElementById('kpiSubmissionsTotal').textContent = total;
    document.getElementById('kpiSubmissionsNew').textContent = newCount;
    document.getElementById('kpiSubmissionsDiscuss').textContent = discussCount;
    document.getElementById('kpiSubmissionsClosed').textContent = closedCount;
    document.getElementById('kpiSubmissionsPipeline').textContent = `$${pipeline.toLocaleString()}`;

    document.getElementById('tabLeadCountBadge').textContent = total;
    document.getElementById('tabClientCountBadge').textContent = clients.length;
  }

  function renderInquiriesTable() {
    const search = inquirySearchInput.value.toLowerCase().trim();
    const status = inquiryStatusFilter.value;

    const filtered = inquiries.filter(i => {
      const matchSearch = i.clientName.toLowerCase().includes(search) ||
                          i.companyName.toLowerCase().includes(search) ||
                          i.clientEmail.toLowerCase().includes(search);
      const matchStatus = status === 'all' || i.status === status;
      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      inquiriesTableBody.innerHTML = '';
      inquiriesEmptyState.style.display = 'block';
      return;
    }

    inquiriesEmptyState.style.display = 'none';

    inquiriesTableBody.innerHTML = filtered.map(item => `
      <tr>
        <td>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${item.id}</div>
          <div style="font-size: 0.82rem; color: var(--text-gray);">${new Date(item.createdAt).toLocaleDateString()}</div>
        </td>
        <td>
          <strong style="display: block;">${escapeHtml(item.clientName)}</strong>
          <span style="font-size: 0.8rem; color: var(--text-gray);">${escapeHtml(item.companyName)} • ${escapeHtml(item.clientEmail)}</span>
        </td>
        <td>${item.services.map(s => `<span class="stat-chip">${escapeHtml(s)}</span>`).join(' ')}</td>
        <td><strong class="gold-text">${escapeHtml(item.budget)}</strong></td>
        <td><span style="font-size: 0.85rem; color: var(--text-gray);">${escapeHtml(item.timeline)}</span></td>
        <td>
          <select class="inquiry-status-sel" data-id="${item.id}" style="background: #141720; border: 1px solid var(--border-line); color: var(--gold-primary); border-radius: 6px; padding: 0.25rem 0.5rem; font-size: 0.8rem;">
            <option value="New" ${item.status === 'New' ? 'selected' : ''}>New</option>
            <option value="Contacted" ${item.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Proposal Sent" ${item.status === 'Proposal Sent' ? 'selected' : ''}>Proposal Sent</option>
            <option value="Closed Won" ${item.status === 'Closed Won' ? 'selected' : ''}>Closed Won</option>
            <option value="Closed Lost" ${item.status === 'Closed Lost' ? 'selected' : ''}>Closed Lost</option>
          </select>
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <a href="mailto:${item.clientEmail}" class="btn-ghost-small" title="Email"><i data-lucide="mail"></i></a>
            <button class="btn-ghost-small delete-inquiry-btn" data-id="${item.id}" title="Delete"><i data-lucide="trash-2"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    inquiriesTableBody.querySelectorAll('.inquiry-status-sel').forEach(sel => {
      sel.addEventListener('change', () => {
        const id = sel.getAttribute('data-id');
        const target = inquiries.find(i => i.id === id);
        if (target) {
          target.status = sel.value;
          saveInquiries(inquiries);
          updateAdminKPIs();
        }
      });
    });

    inquiriesTableBody.querySelectorAll('.delete-inquiry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this inquiry?')) {
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

  inquirySearchInput.addEventListener('input', renderInquiriesTable);
  inquiryStatusFilter.addEventListener('change', renderInquiriesTable);

  // CSV Export
  exportCsvBtn.addEventListener('click', () => {
    if (inquiries.length === 0) { alert('No inquiries to export.'); return; }
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Services', 'Budget', 'Timeline', 'Status'];
    const rows = inquiries.map(i => [
      `"${i.id}"`, `"${i.createdAt}"`, `"${i.clientName}"`, `"${i.clientEmail}"`, `"${i.clientPhone}"`,
      `"${i.companyName}"`, `"${i.services.join('; ')}"`, `"${i.budget}"`, `"${i.timeline}"`, `"${i.status}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadBlob(csv, `motagrowth_inquiries_${Date.now()}.csv`, 'text/csv');
  });

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

    const title = prompt('Creative Concept Title (e.g. Dark-Mode 3D Product Interactive Page):');
    if (!title) return;
    const desc = prompt('Idea Details / Strategic Impact:') || '';

    if (!client.ideas) client.ideas = [];
    client.ideas.push({
      id: 'IDEA-' + Date.now().toString(36),
      title: title.trim(),
      description: desc.trim()
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
      if (data) return JSON.parse(data);
    } catch (e) { console.error(e); }
    return getSeedInquiries();
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
        id: 'BRIEF-K9A1',
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        clientName: 'Julian Hayes',
        clientEmail: 'julian@apexzenith.co',
        clientPhone: '+1 (415) 890-4411',
        companyName: 'Apex Zenith Co',
        currentUrl: 'https://apexzenith.co',
        services: ['Custom Website Design & Development', 'Paid Ads & Performance Marketing'],
        primaryGoal: 'Redesign existing site to boost conversions',
        targetAudience: 'High-ticket B2B founders',
        businessStage: 'Scaling ($50k - $200k/mo)',
        budget: '$8,000 - $15,000',
        timeline: 'Immediately (1-2 weeks)',
        notes: 'We want smooth scroll dynamics and a high-end luxury feel.',
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
        servicesTier: 'Full-Service Growth Package',
        status: 'Active',
        summary: 'Complete brand relaunch including animated Shopify Plus flagship, organic TikTok growth engine, and Meta scale.',
        approvals: [
          {
            id: 'APP-1',
            title: 'Website Homepage Interactive Draft v2',
            description: 'Hero section interactive mockup with hand-drawn motion accents and 3D product showcase.',
            status: 'Pending'
          },
          {
            id: 'APP-2',
            title: 'October Social Content & Video Script Batch',
            description: '15 high-converting short-form video concepts scheduled for Meta & TikTok.',
            status: 'Approved'
          }
        ],
        timeline: [
          {
            id: 'CAL-1',
            date: 'OCTOBER 15, 2026',
            title: 'Website Alpha Staging Launch',
            description: 'Private testing of checkout funnel and custom micro-animations.'
          },
          {
            id: 'CAL-2',
            date: 'OCTOBER 22, 2026',
            title: 'Brand Campaign Live Kickoff',
            description: 'Launch of Meta Ads and TikTok Creator Spark collaborations.'
          }
        ],
        ideas: [
          {
            id: 'IDEA-1',
            title: 'VIP Lookbook Animated Experience',
            description: 'Interactive page allowing users to swipe through curated seasonal outfits with instant checkout drawer.'
          },
          {
            id: 'IDEA-2',
            title: 'Behind-The-Design Mini-Doc Reel',
            description: 'Artisanal production storytelling reel designed to build luxury brand authority.'
          }
        ],
        links: [
          { label: 'Figma Design System', url: 'https://figma.com' },
          { label: 'Cloud Asset Drive', url: 'https://drive.google.com' }
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
