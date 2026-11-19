/**
 * MotaGrowth® Client Portal Engine
 * Light luxury pearl-and-gold client workspace synchronized with Admin Hub storage.
 */

(function () {
  'use strict';

  const STORAGE_CLIENTS = 'motagrowth_v7_clients_db';
  const STORAGE_INQUIRIES = 'motagrowth_v7_inquiries_db';
  const STORAGE_SESSION = 'motagrowth_client_session';

  // Default seeded workspaces (compatible with portal.js / admin.html)
  function getDefaultClients() {
    return [
      {
        id: 'CLI-VELOUR',
        clientName: 'Elena Rostova',
        companyName: 'Velour Luxury Apparel',
        email: 'elena@velourclothing.co',
        username: 'velour',
        password: 'growth2026',
        servicesTier: 'Brand & Website Redesign',
        projectName: 'Brand & Website Redesign',
        status: 'In Progress',
        progress: 65,
        trackStatus: 'On track',
        hasProject: true,
        summary: 'Complete luxury visual identity refresh, editorial brand guidelines, and high-converting bespoke flagship e-commerce experience tailored for international clientele.',
        director: {
          name: 'Yassine El Amrani',
          role: 'Project Manager'
        },
        timeline: [
          { step: 1, title: 'Discovery & Briefing', meta: 'Completed • Oct 28', state: 'done' },
          { step: 2, title: 'Design & Validation', meta: 'In Progress • 65%', state: 'active' },
          { step: 3, title: 'Development', meta: 'Planned • Nov 25', state: 'planned' },
          { step: 4, title: 'Launch', meta: 'Planned • Dec 10', state: 'planned' }
        ],
        tasks: [
          { id: 'T-VEL-1', title: 'Approve homepage design', tag: 'Design', dueDate: 'Due Nov 20', status: 'Pending' },
          { id: 'T-VEL-2', title: 'Review brand guidelines', tag: 'Brand', dueDate: 'Due Nov 22', status: 'Pending' },
          { id: 'T-VEL-3', title: 'Confirm product photography selection', tag: 'Brand', dueDate: 'Completed Nov 08', status: 'Completed' },
          { id: 'T-VEL-4', title: 'Sign off discovery & UX wireframe deck', tag: 'Design', dueDate: 'Completed Oct 28', status: 'Completed' }
        ],
        deliverables: [
          { id: 'D-VEL-1', title: 'Brand Strategy & Positioning Deck', phase: 'Discovery', date: 'Oct 28', status: 'Approved' },
          { id: 'D-VEL-2', title: 'Visual Identity & Logo System', phase: 'Brand', date: 'Nov 04', status: 'Approved' },
          { id: 'D-VEL-3', title: 'Editorial Typography & Color Palette', phase: 'Brand', date: 'Nov 08', status: 'Approved' },
          { id: 'D-VEL-4', title: 'Homepage Wireframes & User Flows', phase: 'Design', date: 'Nov 11', status: 'Approved' },
          { id: 'D-VEL-5', title: 'High-Fidelity Desktop Concept', phase: 'Design', date: 'Nov 15', status: 'Approved' },
          { id: 'D-VEL-6', title: 'Interactive Mobile Prototype', phase: 'Design', date: 'Nov 20', status: 'In Review' }
        ],
        files: [
          { id: 'F-VEL-1', name: 'Main concept.pdf', size: '5.1 MB', date: 'Nov 15', type: 'pdf' },
          { id: 'F-VEL-2', name: 'Brand guidelines.pdf', size: '2.4 MB', date: 'Nov 12', type: 'pdf' },
          { id: 'F-VEL-3', name: 'Agency client contract.doc', size: '1.2 MB', date: 'Nov 10', type: 'doc' },
          { id: 'F-VEL-4', name: 'Homepage_UI_Mockups_v2.fig', size: '18.6 MB', date: 'Nov 14', type: 'fig' },
          { id: 'F-VEL-5', name: 'Vector_Logo_Master_Pack.zip', size: '9.4 MB', date: 'Nov 06', type: 'zip' },
          { id: 'F-VEL-6', name: 'Discovery_Workshop_Notes.pdf', size: '1.8 MB', date: 'Oct 29', type: 'pdf' },
          { id: 'F-VEL-7', name: 'Competitor_UX_Audit.pdf', size: '6.3 MB', date: 'Oct 26', type: 'pdf' },
          { id: 'F-VEL-8', name: 'Content_Sitemap_Architecture.doc', size: '0.9 MB', date: 'Oct 24', type: 'doc' }
        ],
        meetings: [
          { id: 'M-VEL-1', title: 'Homepage Concept & Brand Guidelines Sign-off', date: 'Nov 21, 2026', time: '15:00', platform: 'Google Meet', status: 'Confirmed' }
        ],
        messages: [
          { id: 'MSG-1', sender: 'agency', author: 'Yassine El Amrani', text: 'Welcome to your Velour Luxury Apparel portal! We have uploaded Main concept.pdf and Brand guidelines.pdf for your review.', time: 'Nov 15 • 10:15' },
          { id: 'MSG-2', sender: 'client', author: 'Elena Rostova', text: 'Thank you Yassine! The homepage aesthetic looks super refined. Reviewing the brand guidelines with our team today.', time: 'Nov 15 • 14:40' },
          { id: 'MSG-3', sender: 'agency', author: 'Yassine El Amrani', text: 'Wonderful — once you check off the two tasks in Next Actions, we will lock the final tokens and begin development on Nov 25.', time: 'Nov 16 • 09:30' }
        ]
      },
      {
        id: 'CLI-NEW',
        clientName: 'Sofia Benali',
        companyName: 'Velour Luxury Apparel',
        email: 'sofia@velourclothing.co',
        username: 'newclient',
        password: 'growth2026',
        servicesTier: 'New Workspace',
        projectName: '',
        status: 'Onboarding',
        progress: 0,
        trackStatus: 'Ready to start',
        hasProject: false,
        summary: '',
        director: { name: 'Yassine El Amrani', role: 'Project Manager' },
        timeline: [],
        tasks: [],
        deliverables: [],
        files: [],
        meetings: [],
        messages: [
          { id: 'MSG-N1', sender: 'agency', author: 'Yassine El Amrani', text: 'Welcome to your MotaGrowth Client Portal! Click "Create your first project" whenever you are ready to kick off.', time: 'Today' }
        ]
      },
      {
        id: 'CLI-TG2D',
        clientName: 'Youssef Alami',
        companyName: 'TG2D',
        email: 'youssef@tg2d.com',
        username: 'tg2d',
        password: 'growth2026',
        servicesTier: 'Architectural Platform & CRM',
        projectName: 'Corporate Platform & Operational CRM',
        status: 'In Progress',
        progress: 80,
        trackStatus: 'On track',
        hasProject: true,
        summary: 'Complete digital structuring for TG2D: architectural multi-page corporate website and internal commercial CRM backbone.',
        director: { name: 'Yassine El Amrani', role: 'Project Manager' },
        timeline: [
          { step: 1, title: 'Discovery & Briefing', meta: 'Completed • Oct 12', state: 'done' },
          { step: 2, title: 'Design & Validation', meta: 'Completed • Oct 28', state: 'done' },
          { step: 3, title: 'Development & CRM', meta: 'In Progress • 80%', state: 'active' },
          { step: 4, title: 'Launch', meta: 'Planned • Nov 28', state: 'planned' }
        ],
        tasks: [
          { id: 'T-TG-1', title: 'Validate fleet photography captions', tag: 'Brand', dueDate: 'Due Nov 22', status: 'Pending' },
          { id: 'T-TG-2', title: 'Confirm CRM pipeline stages', tag: 'Web', dueDate: 'Due Nov 24', status: 'Pending' }
        ],
        deliverables: [
          { id: 'D-TG-1', title: 'Architectural Visual Direction', phase: 'Brand', date: 'Oct 20', status: 'Approved' },
          { id: 'D-TG-2', title: '6-Page Corporate Website', phase: 'Web', date: 'Nov 08', status: 'Approved' },
          { id: 'D-TG-3', title: 'Internal Lead & Pipeline CRM', phase: 'CRM', date: 'Nov 18', status: 'In Review' }
        ],
        files: [
          { id: 'F-TG-1', name: 'TG2D_Site_Architecture.pdf', size: '4.2 MB', date: 'Nov 10', type: 'pdf' },
          { id: 'F-TG-2', name: 'CRM_Workflow_Guide.pdf', size: '2.1 MB', date: 'Nov 16', type: 'pdf' }
        ],
        meetings: [
          { id: 'M-TG-1', title: 'CRM Team Onboarding & Pre-Launch QA', date: 'Nov 24, 2026', time: '11:00', platform: 'Google Meet', status: 'Confirmed' }
        ],
        messages: [
          { id: 'MSG-TG-1', sender: 'agency', author: 'Yassine El Amrani', text: 'Your 6-page architectural platform and CRM pipeline are ready for pre-launch review.', time: 'Nov 18 • 11:00' }
        ]
      },
      {
        id: 'CLI-ORSAP',
        clientName: 'Karim Bennani',
        companyName: 'Orsap.ma',
        email: 'karim@orsap.ma',
        username: 'orsap',
        password: 'growth2026',
        servicesTier: 'Connected B2B Commerce Platform',
        projectName: 'Connected B2B Storefront & RFQ Engine',
        status: 'In Progress',
        progress: 90,
        trackStatus: 'On track',
        hasProject: true,
        summary: 'Connected B2B industrial storefront combining product catalogue discovery, express quotation workflows, and customer administration.',
        director: { name: 'Yassine El Amrani', role: 'Project Manager' },
        timeline: [
          { step: 1, title: 'Discovery & Briefing', meta: 'Completed • Sep 01', state: 'done' },
          { step: 2, title: 'Design & Validation', meta: 'Completed • Sep 18', state: 'done' },
          { step: 3, title: 'Development & RFQ Engine', meta: 'Completed • Oct 25', state: 'done' },
          { step: 4, title: 'Growth & Optimization', meta: 'In Progress • 90%', state: 'active' }
        ],
        tasks: [
          { id: 'T-OR-1', title: 'Review Q4 B2B quotation analytics report', tag: 'Marketing', dueDate: 'Due Nov 23', status: 'Pending' }
        ],
        deliverables: [
          { id: 'D-OR-1', title: 'B2B Storefront & Catalogue', phase: 'Web', date: 'Oct 10', status: 'Approved' },
          { id: 'D-OR-2', title: 'Express Quotation Engine', phase: 'Web', date: 'Oct 22', status: 'Approved' }
        ],
        files: [
          { id: 'F-OR-1', name: 'Orsap_Commerce_Spec.pdf', size: '8.4 MB', date: 'Nov 02', type: 'pdf' },
          { id: 'F-OR-2', name: 'Q4_Lead_Performance_Report.pdf', size: '3.1 MB', date: 'Nov 14', type: 'pdf' }
        ],
        meetings: [
          { id: 'M-OR-1', title: 'Monthly Growth & Lead Pipeline Sync', date: 'Nov 25, 2026', time: '16:00', platform: 'Google Meet', status: 'Confirmed' }
        ],
        messages: [
          { id: 'MSG-OR-1', sender: 'agency', author: 'Yassine El Amrani', text: 'Your Q4 performance report is now available in the Files tab.', time: 'Nov 14 • 16:20' }
        ]
      }
    ];
  }

  // Enrich legacy client records from portal.js with new portal fields seamlessly
  function normalizeClient(c) {
    if (!c) return null;
    const defaults = getDefaultClients();
    const match = defaults.find(d => d.id === c.id || (d.username && d.username === c.username));

    // One-time upgrade for legacy seeded demo accounts so they immediately reflect the new Client Portal layout
    if (match && !c.cpUpgraded && (c.username === 'velour' || c.username === 'newclient')) {
      return { ...match, cpUpgraded: true };
    }

    const hasProject = typeof c.hasProject === 'boolean' ? c.hasProject : true;
    const tasks = Array.isArray(c.tasks) && c.tasks.length > 0 ? c.tasks : (match ? match.tasks : []);
    const files = Array.isArray(c.files) && c.files.length > 0 ? c.files : (match ? match.files : []);
    const deliverables = Array.isArray(c.deliverables) && c.deliverables.length > 0 ? c.deliverables : (match ? match.deliverables : []);
    const meetings = Array.isArray(c.meetings) && c.meetings.length > 0 ? c.meetings : (match ? match.meetings : []);
    const timeline = Array.isArray(c.timeline) && c.timeline.length > 0 ? c.timeline : (match ? match.timeline : [
      { step: 1, title: 'Discovery & Briefing', meta: 'Completed • Oct 28', state: 'done' },
      { step: 2, title: 'Design & Validation', meta: 'In Progress • 65%', state: 'active' },
      { step: 3, title: 'Development', meta: 'Planned • Nov 25', state: 'planned' },
      { step: 4, title: 'Launch', meta: 'Planned • Dec 10', state: 'planned' }
    ]);
    const messages = Array.isArray(c.messages) && c.messages.length > 0 ? c.messages : (match ? match.messages : [
      { id: 'MSG-DEF', sender: 'agency', author: 'Yassine El Amrani', text: 'Welcome to your MotaGrowth Client Portal! Let us know if you have any questions.', time: 'Today' }
    ]);

    return {
      ...c,
      hasProject,
      projectName: c.projectName || c.servicesTier || (match ? match.projectName : 'Brand & Website Redesign'),
      status: c.status === 'Active' ? 'In Progress' : (c.status || 'In Progress'),
      progress: typeof c.progress === 'number' ? c.progress : (match ? match.progress : 65),
      trackStatus: c.trackStatus || 'On track',
      director: c.director || { name: 'Yassine El Amrani', role: 'Project Manager' },
      timeline,
      tasks,
      deliverables,
      files,
      meetings,
      messages
    };
  }

  function loadClients() {
    const seeds = getDefaultClients();
    try {
      const raw = localStorage.getItem(STORAGE_CLIENTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure demo accounts exist alongside any custom admin-created accounts
          const merged = parsed.map(normalizeClient);
          seeds.forEach(s => {
            if (!merged.some(m => m.username === s.username)) {
              merged.push(s);
            }
          });
          return merged;
        }
      }
    } catch (e) {
      console.warn('Error loading clients DB:', e);
    }
    saveClients(seeds);
    return seeds;
  }

  function saveClients(list) {
    try {
      localStorage.setItem(STORAGE_CLIENTS, JSON.stringify(list));
    } catch (e) {
      console.warn('Error saving clients DB:', e);
    }
  }

  let clients = loadClients();
  let activeClient = null;
  let currentTab = 'overview';
  let currentTaskFilter = 'all';

  // DOM References
  const signInView = document.getElementById('cpSignInView');
  const portalApp = document.getElementById('cpPortalApp');
  const signInForm = document.getElementById('cpSignInForm');
  const signInUser = document.getElementById('cpSignInUser');
  const signInPass = document.getElementById('cpSignInPass');
  const signInError = document.getElementById('cpSignInError');

  const sidebar = document.getElementById('cpSidebar');
  const sidebarBackdrop = document.getElementById('cpSidebarBackdrop');
  const mobileMenuBtn = document.getElementById('cpMobileMenuBtn');

  const emptyStateView = document.getElementById('cpEmptyStateView');
  const globalSearch = document.getElementById('cpGlobalSearch');
  const searchKbd = document.getElementById('cpSearchKbd');
  const searchResults = document.getElementById('cpSearchResults');

  const notifBtn = document.getElementById('cpNotifBtn');
  const notifPopover = document.getElementById('cpNotifPopover');
  const profileBtn = document.getElementById('cpProfileBtn');
  const profilePopover = document.getElementById('cpProfilePopover');

  const createModal = document.getElementById('cpCreateProjectModal');
  const toastEl = document.getElementById('cpToast');

  function escapeHtml(str) {
    if (str === undefined || str === null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 3000);
  }

  function persistActiveClient() {
    if (!activeClient) return;
    const idx = clients.findIndex(c => c.id === activeClient.id);
    if (idx !== -1) {
      clients[idx] = activeClient;
    } else {
      clients.unshift(activeClient);
    }
    saveClients(clients);
  }

  function getTagClass(tag) {
    const t = (tag || '').toLowerCase();
    if (t.includes('design')) return 'cp-tag-design';
    if (t.includes('brand')) return 'cp-tag-brand';
    if (t.includes('market') || t.includes('ads') || t.includes('seo')) return 'cp-tag-marketing';
    return 'cp-tag-web';
  }

  function getFileBadgeInfo(type, name) {
    const ext = (type || (name || '').split('.').pop() || 'pdf').toLowerCase();
    if (ext === 'doc' || ext === 'docx') return { cls: 'is-doc', label: 'DOC' };
    if (ext === 'zip' || ext === 'rar') return { cls: 'is-zip', label: 'ZIP' };
    if (ext === 'fig') return { cls: 'is-fig', label: 'FIG' };
    return { cls: 'is-pdf', label: 'PDF' };
  }

  function isTaskDone(t) {
    return (t.status || '').toLowerCase() === 'completed' || (t.status || '').toLowerCase() === 'done';
  }

  // =========================================================================
  // RENDERING ENGINE
  // =========================================================================
  function renderPortal() {
    if (!activeClient) return;

    const company = activeClient.companyName || activeClient.clientName || 'Client';
    const initials = company.substring(0, 2).toUpperCase();

    // Header Profile & Dropdown
    const headerAvatar = document.getElementById('cpHeaderAvatar');
    if (headerAvatar) {
      headerAvatar.innerHTML = activeClient.logo
        ? `<img src="${activeClient.logo}" alt="${escapeHtml(company)}">`
        : initials;
    }
    const headerName = document.getElementById('cpHeaderName');
    if (headerName) headerName.textContent = company;

    const dropName = document.getElementById('cpDropName');
    if (dropName) dropName.textContent = company;

    const dropEmail = document.getElementById('cpDropEmail');
    if (dropEmail) dropEmail.textContent = activeClient.email || '';

    const toggleEmptyLabel = document.getElementById('cpToggleEmptyLabel');
    if (toggleEmptyLabel) {
      toggleEmptyLabel.textContent = activeClient.hasProject ? 'Preview Empty State' : 'Switch to Active Project';
    }

    // Sidebar Mode (Empty State vs Populated Dashboard — matches Image 1 & Image 2)
    const populatedOnlyItems = document.querySelectorAll('.cp-populated-only');
    populatedOnlyItems.forEach(el => {
      el.style.display = activeClient.hasProject ? 'flex' : 'none';
    });

    const navProjectLabel = document.getElementById('cpNavProjectLabel');
    if (navProjectLabel) {
      navProjectLabel.textContent = activeClient.hasProject ? 'Project' : 'Projects';
    }

    if (globalSearch) {
      globalSearch.placeholder = activeClient.hasProject ? 'Search files, tasks, or messages...' : 'Search...';
    }
    if (searchKbd) {
      searchKbd.style.display = activeClient.hasProject ? 'inline-block' : 'none';
    }

    // Pending Tasks Badge
    const pendingTasks = (activeClient.tasks || []).filter(t => !isTaskDone(t));
    const tasksBadge = document.getElementById('cpNavTasksBadge');
    if (tasksBadge) {
      if (activeClient.hasProject && pendingTasks.length > 0) {
        tasksBadge.textContent = pendingTasks.length;
        tasksBadge.style.display = 'inline-flex';
      } else {
        tasksBadge.style.display = 'none';
      }
    }

    // Notifications List
    const notifList = document.getElementById('cpNotifList');
    if (notifList) {
      if (!activeClient.hasProject) {
        notifList.innerHTML = `<div class="cp-notif-item"><strong>Welcome to MotaGrowth®</strong>Create your first project to start tracking deliverables and milestones.</div>`;
      } else {
        notifList.innerHTML = `
          <div class="cp-notif-item"><strong>${pendingTasks.length} action item(s) waiting</strong>Check Next Actions to keep your project on track.</div>
          <div class="cp-notif-item"><strong>Latest files shared</strong>${escapeHtml((activeClient.files[0] && activeClient.files[0].name) || 'Project documents')} is ready for download.</div>
        `;
      }
    }

    // Empty State vs Tab Panels
    const allPanels = document.querySelectorAll('.cp-tab-panel');
    if (!activeClient.hasProject && (currentTab === 'overview' || currentTab === 'project')) {
      allPanels.forEach(p => { p.style.display = 'none'; });
      if (emptyStateView) emptyStateView.style.display = 'flex';
    } else {
      if (emptyStateView) emptyStateView.style.display = 'none';
      renderOverview();
      renderProjectDetail();
      renderTasksTab();
      renderDeliverablesTab();
      renderFilesTab();
      renderMessagesTab();
      renderMeetingsTab();
      renderProjectInfoTab();
      switchTab(currentTab, true);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function renderOverview() {
    const company = activeClient.companyName || activeClient.clientName || 'Client';
    const welcomeBrand = document.getElementById('cpWelcomeBrand');
    if (welcomeBrand) welcomeBrand.textContent = company;

    const heroName = document.getElementById('cpHeroProjectName');
    if (heroName) heroName.textContent = activeClient.projectName || 'Brand & Website Redesign';

    const statusText = document.getElementById('cpHeroStatusText');
    if (statusText) statusText.textContent = activeClient.status || 'In Progress';

    const progress = Math.min(100, Math.max(0, activeClient.progress || 65));
    const progressBar = document.getElementById('cpHeroProgressBar');
    if (progressBar) progressBar.style.width = `${progress}%`;

    const progressMeta = document.getElementById('cpHeroProgressMeta');
    if (progressMeta) progressMeta.textContent = `${progress}% completed • ${activeClient.trackStatus || 'On track'}`;

    // 4 KPI Cards
    const pendingTasks = (activeClient.tasks || []).filter(t => !isTaskDone(t));
    const completedDeliverables = (activeClient.deliverables || []).filter(d => (d.status || '').toLowerCase() === 'approved');
    const filesCount = (activeClient.files || []).length;
    const meetingsCount = (activeClient.meetings || []).length;

    const kpiTasks = document.getElementById('cpKpiTasks');
    const kpiDeliverables = document.getElementById('cpKpiDeliverables');
    const kpiFiles = document.getElementById('cpKpiFiles');
    const kpiMeetings = document.getElementById('cpKpiMeetings');

    if (kpiTasks) kpiTasks.textContent = pendingTasks.length;
    if (kpiDeliverables) kpiDeliverables.textContent = completedDeliverables.length;
    if (kpiFiles) kpiFiles.textContent = filesCount;
    if (kpiMeetings) kpiMeetings.textContent = meetingsCount;

    // Next Actions (top pending or recent tasks)
    const actionsList = document.getElementById('cpOverviewActionsList');
    if (actionsList) {
      const displayTasks = pendingTasks.length > 0 ? pendingTasks.slice(0, 3) : (activeClient.tasks || []).slice(0, 2);
      if (displayTasks.length === 0) {
        actionsList.innerHTML = `<div class="cp-action-row" style="justify-content:center;color:var(--cp-ink-muted);">All caught up! No pending actions right now.</div>`;
      } else {
        actionsList.innerHTML = displayTasks.map(t => renderTaskRowHtml(t)).join('');
      }
    }

    // Latest Files (top 3)
    const filesList = document.getElementById('cpOverviewFilesList');
    if (filesList) {
      const topFiles = (activeClient.files || []).slice(0, 3);
      if (topFiles.length === 0) {
        filesList.innerHTML = `<div class="cp-file-row" style="justify-content:center;color:var(--cp-ink-muted);">No files shared yet.</div>`;
      } else {
        filesList.innerHTML = topFiles.map(f => renderFileRowHtml(f)).join('');
      }
    }

    // Project Timeline
    const timelineEl = document.getElementById('cpOverviewTimeline');
    if (timelineEl) {
      timelineEl.innerHTML = renderTimelineHtml(activeClient.timeline || []);
    }

    // Team
    const teamRole = document.getElementById('cpTeamRole');
    const teamName = document.getElementById('cpTeamName');
    const chatTeamName = document.getElementById('cpChatTeamName');
    if (teamRole) teamRole.textContent = (activeClient.director && activeClient.director.role) || 'Project Manager';
    if (teamName) teamName.textContent = (activeClient.director && activeClient.director.name) || 'Yassine El Amrani';
    if (chatTeamName) chatTeamName.textContent = (activeClient.director && activeClient.director.name) || 'Yassine El Amrani';
  }

  function renderTaskRowHtml(t) {
    const done = isTaskDone(t);
    const tagCls = getTagClass(t.tag);
    return `
      <div class="cp-action-row ${done ? 'is-done' : ''}">
        <input type="checkbox" class="cp-checkbox" data-toggle-task="${escapeHtml(t.id)}" ${done ? 'checked' : ''} aria-label="Mark ${escapeHtml(t.title)} complete">
        <span class="cp-action-title">${escapeHtml(t.title)}</span>
        <span class="cp-tag-pill ${tagCls}">${escapeHtml(t.tag || 'Project')}</span>
        <span class="cp-action-due">
          <i data-lucide="calendar"></i>
          <span>${escapeHtml(t.dueDate || 'Scheduled')}</span>
        </span>
      </div>
    `;
  }

  function renderFileRowHtml(f) {
    const badge = getFileBadgeInfo(f.type, f.name);
    return `
      <div class="cp-file-row">
        <span class="cp-file-badge ${badge.cls}">${badge.label}</span>
        <span class="cp-file-name" title="${escapeHtml(f.name)}">${escapeHtml(f.name)}</span>
        <span class="cp-file-meta">${escapeHtml(f.size || '1.0 MB')} &bull; ${escapeHtml(f.date || 'Recent')}</span>
        <button type="button" class="cp-file-dl-btn" data-download-file="${escapeHtml(f.name)}" title="Download ${escapeHtml(f.name)}">
          <i data-lucide="download"></i>
        </button>
      </div>
    `;
  }

  function renderTimelineHtml(steps) {
    return steps.map(s => {
      const isDone = s.state === 'done';
      const isActive = s.state === 'active';
      const dotClass = isDone ? 'is-done' : (isActive ? 'is-active' : 'is-planned');
      const dotContent = isDone ? '✓' : s.step;
      const metaClass = isActive ? 'is-gold' : '';
      return `
        <div class="cp-timeline-step ${isDone ? 'is-done' : (isActive ? 'is-active' : '')}">
          <div class="cp-timeline-rail">
            <div class="cp-step-dot ${dotClass}">${dotContent}</div>
            <div class="cp-step-line"></div>
          </div>
          <div class="cp-step-content">
            <div class="cp-step-title">${escapeHtml(s.title)}</div>
            <div class="cp-step-meta ${metaClass}">${escapeHtml(s.meta)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderProjectDetail() {
    const title = document.getElementById('cpDetailProjectTitle');
    const summary = document.getElementById('cpDetailProjectSummary');
    const detailTimeline = document.getElementById('cpDetailTimeline');
    const snapshot = document.getElementById('cpDetailSnapshot');

    if (title) title.textContent = activeClient.projectName || 'Brand & Website Redesign';
    if (summary) summary.textContent = activeClient.summary || 'Your dedicated MotaGrowth project workspace.';
    if (detailTimeline) detailTimeline.innerHTML = renderTimelineHtml(activeClient.timeline || []);
    if (snapshot) {
      snapshot.innerHTML = `
        <div class="cp-action-row"><span class="cp-action-title" style="color:var(--cp-ink-secondary);">Status</span><span class="cp-status-pill"><span class="cp-status-dot"></span>${escapeHtml(activeClient.status)}</span></div>
        <div class="cp-action-row"><span class="cp-action-title" style="color:var(--cp-ink-secondary);">Completion</span><strong>${activeClient.progress}%</strong></div>
        <div class="cp-action-row"><span class="cp-action-title" style="color:var(--cp-ink-secondary);">Service Tier</span><strong>${escapeHtml(activeClient.servicesTier || 'Digital Architecture')}</strong></div>
        <div class="cp-action-row"><span class="cp-action-title" style="color:var(--cp-ink-secondary);">Project Lead</span><strong>${escapeHtml((activeClient.director && activeClient.director.name) || 'Yassine El Amrani')}</strong></div>
      `;
    }
  }

  function renderTasksTab() {
    const container = document.getElementById('cpFullTasksList');
    if (!container) return;
    let list = activeClient.tasks || [];
    if (currentTaskFilter === 'pending') list = list.filter(t => !isTaskDone(t));
    if (currentTaskFilter === 'done') list = list.filter(t => isTaskDone(t));

    if (list.length === 0) {
      container.innerHTML = `<div class="cp-action-row" style="justify-content:center;color:var(--cp-ink-muted);">No tasks match this filter.</div>`;
    } else {
      container.innerHTML = list.map(t => renderTaskRowHtml(t)).join('');
    }
  }

  function renderDeliverablesTab() {
    const grid = document.getElementById('cpDeliverablesGrid');
    if (!grid) return;
    const list = activeClient.deliverables || [];
    if (list.length === 0) {
      grid.innerHTML = `<div class="cp-card" style="grid-column:1/-1;text-align:center;color:var(--cp-ink-muted);">Deliverables will appear here as milestones are completed.</div>`;
      return;
    }
    grid.innerHTML = list.map(d => {
      const approved = (d.status || '').toLowerCase() === 'approved';
      return `
        <div class="cp-deliv-card">
          <div class="cp-deliv-top">
            <span class="cp-tag-pill ${getTagClass(d.phase)}">${escapeHtml(d.phase || 'Milestone')}</span>
            <span class="cp-deliv-status ${approved ? 'is-approved' : 'is-review'}">${escapeHtml(d.status || 'In Review')}</span>
          </div>
          <h4 style="font-size:1rem;font-weight:700;color:var(--cp-ink);">${escapeHtml(d.title)}</h4>
          <span style="font-size:0.78rem;color:var(--cp-ink-muted);">Shared ${escapeHtml(d.date || 'Recently')}</span>
          ${!approved ? `
            <div style="margin-top:0.35rem;display:flex;gap:0.5rem;">
              <button type="button" class="cp-btn-gold" style="padding:0.52rem 1rem;font-size:0.8rem;" data-approve-deliv="${escapeHtml(d.id)}">Approve Item ✓</button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  function renderFilesTab() {
    const container = document.getElementById('cpFullFilesList');
    if (!container) return;
    const list = activeClient.files || [];
    if (list.length === 0) {
      container.innerHTML = `<div class="cp-file-row" style="justify-content:center;color:var(--cp-ink-muted);">No project files uploaded yet.</div>`;
      return;
    }
    container.innerHTML = list.map(f => renderFileRowHtml(f)).join('');
  }

  function renderMessagesTab() {
    const container = document.getElementById('cpChatMessages');
    if (!container) return;
    const list = activeClient.messages || [];
    container.innerHTML = list.map(m => `
      <div class="cp-msg-bubble ${m.sender === 'client' ? 'is-client' : 'is-agency'}">
        <div style="font-weight:700;font-size:0.76rem;margin-bottom:0.2rem;">${escapeHtml(m.author)}</div>
        <div>${escapeHtml(m.text)}</div>
        <div class="cp-msg-meta">${escapeHtml(m.time)}</div>
      </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
  }

  function renderMeetingsTab() {
    const container = document.getElementById('cpMeetingsList');
    if (!container) return;
    const list = activeClient.meetings || [];
    if (list.length === 0) {
      container.innerHTML = `<div class="cp-action-row" style="justify-content:center;color:var(--cp-ink-muted);">No upcoming meetings scheduled.</div>`;
      return;
    }
    container.innerHTML = list.map(m => `
      <div class="cp-action-row">
        <i data-lucide="video" style="width:18px;height:18px;color:var(--cp-gold-deep);"></i>
        <div style="flex:1;min-width:0;">
          <div class="cp-action-title">${escapeHtml(m.title)}</div>
          <div style="font-size:0.76rem;color:var(--cp-ink-secondary);">${escapeHtml(m.date || m.datetime || '')} ${m.time ? '• ' + escapeHtml(m.time) : ''} &bull; ${escapeHtml(m.platform || 'Google Meet')}</div>
        </div>
        <span class="cp-status-pill" style="font-size:0.74rem;padding:0.28rem 0.7rem;">${escapeHtml(m.status || 'Confirmed')}</span>
      </div>
    `).join('');
  }

  function renderProjectInfoTab() {
    const el = document.getElementById('cpProjectInfoBody');
    if (!el) return;
    el.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
        <div class="cp-action-row" style="flex-direction:column;align-items:flex-start;gap:0.25rem;">
          <span style="font-size:0.74rem;color:var(--cp-ink-muted);text-transform:uppercase;font-weight:700;">Client Organization</span>
          <strong>${escapeHtml(activeClient.companyName)}</strong>
        </div>
        <div class="cp-action-row" style="flex-direction:column;align-items:flex-start;gap:0.25rem;">
          <span style="font-size:0.74rem;color:var(--cp-ink-muted);text-transform:uppercase;font-weight:700;">Primary Contact</span>
          <strong>${escapeHtml(activeClient.clientName)} (${escapeHtml(activeClient.email)})</strong>
        </div>
        <div class="cp-action-row" style="flex-direction:column;align-items:flex-start;gap:0.25rem;">
          <span style="font-size:0.74rem;color:var(--cp-ink-muted);text-transform:uppercase;font-weight:700;">Active Engagement</span>
          <strong>${escapeHtml(activeClient.projectName || activeClient.servicesTier)}</strong>
        </div>
        <div class="cp-action-row" style="flex-direction:column;align-items:flex-start;gap:0.25rem;">
          <span style="font-size:0.74rem;color:var(--cp-ink-muted);text-transform:uppercase;font-weight:700;">Dedicated Manager</span>
          <strong>${escapeHtml((activeClient.director && activeClient.director.name) || 'Yassine El Amrani')}</strong>
        </div>
      </div>
    `;
  }

  function switchTab(tabName, skipRender) {
    currentTab = tabName;
    document.querySelectorAll('.cp-nav-item').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tabName);
    });

    if (!activeClient.hasProject && (tabName === 'overview' || tabName === 'project')) {
      document.querySelectorAll('.cp-tab-panel').forEach(p => { p.style.display = 'none'; });
      if (emptyStateView) emptyStateView.style.display = 'flex';
    } else {
      if (emptyStateView) emptyStateView.style.display = 'none';
      const map = {
        overview: 'cpPanelOverview',
        project: 'cpPanelProject',
        tasks: 'cpPanelTasks',
        deliverables: 'cpPanelDeliverables',
        files: 'cpPanelFiles',
        messages: 'cpPanelMessages',
        meetings: 'cpPanelMeetings',
        info: 'cpPanelInfo',
        support: 'cpPanelSupport'
      };
      document.querySelectorAll('.cp-tab-panel').forEach(p => { p.style.display = 'none'; });
      const target = document.getElementById(map[tabName] || 'cpPanelOverview');
      if (target) target.style.display = 'block';
    }

    // Close mobile sidebar if open
    if (sidebar) sidebar.classList.remove('is-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('is-open');

    if (!skipRender && window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // AUTHENTICATION & SESSION
  // =========================================================================
  function loginClient(client) {
    activeClient = normalizeClient(client);
    sessionStorage.setItem(STORAGE_SESSION, activeClient.id);
    if (signInView) signInView.style.display = 'none';
    if (portalApp) portalApp.style.display = 'flex';
    currentTab = 'overview';
    renderPortal();
  }

  function logoutClient() {
    activeClient = null;
    sessionStorage.removeItem(STORAGE_SESSION);
    if (portalApp) portalApp.style.display = 'none';
    if (signInView) signInView.style.display = 'flex';
    if (profilePopover) profilePopover.style.display = 'none';
    if (signInForm) signInForm.reset();
    if (signInError) signInError.textContent = '';
  }

  // Sign-In Form Handler
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = (signInUser.value || '').trim().toLowerCase();
      const p = (signInPass.value || '').trim();
      clients = loadClients();
      const found = clients.find(c =>
        ((c.username || '').toLowerCase() === u || (c.email || '').toLowerCase() === u) &&
        c.password === p
      );
      if (found) {
        if (signInError) signInError.textContent = '';
        loginClient(found);
      } else {
        if (signInError) signInError.textContent = 'Invalid username or password. Try a demo account below.';
      }
    });
  }

  // Quick Demo Account Chips
  document.querySelectorAll('[data-demo-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      const uname = btn.getAttribute('data-demo-user');
      clients = loadClients();
      const found = clients.find(c => c.username === uname);
      if (found) loginClient(found);
    });
  });

  // =========================================================================
  // INTERACTIVE EVENTS & DELEGATION
  // =========================================================================
  // Sidebar navigation
  document.querySelectorAll('.cp-nav-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
  });

  // Jump links (KPI cards, View all tasks, View all files, Team chat button)
  document.addEventListener('click', (e) => {
    const jump = e.target.closest('[data-jump-tab]');
    if (jump) {
      switchTab(jump.getAttribute('data-jump-tab'));
      return;
    }

    // Download file button
    const dl = e.target.closest('[data-download-file]');
    if (dl) {
      const fname = dl.getAttribute('data-download-file');
      showToast(`Downloading ${fname}...`);
      return;
    }

    // Approve deliverable
    const approveBtn = e.target.closest('[data-approve-deliv]');
    if (approveBtn && activeClient) {
      const delivId = approveBtn.getAttribute('data-approve-deliv');
      const item = (activeClient.deliverables || []).find(d => d.id === delivId);
      if (item) {
        item.status = 'Approved';
        persistActiveClient();
        renderPortal();
        showToast(`Approved "${item.title}"!`);
      }
      return;
    }
  });

  // Checkbox task toggling
  document.addEventListener('change', (e) => {
    const chk = e.target.closest('[data-toggle-task]');
    if (!chk || !activeClient) return;
    const taskId = chk.getAttribute('data-toggle-task');
    const task = (activeClient.tasks || []).find(t => t.id === taskId);
    if (task) {
      task.status = chk.checked ? 'Completed' : 'Pending';
      // Dynamically adjust progress subtly when tasks are completed
      const total = activeClient.tasks.length || 1;
      const doneCount = activeClient.tasks.filter(t => isTaskDone(t)).length;
      activeClient.progress = Math.min(100, Math.round(50 + (doneCount / total) * 50));
      persistActiveClient();
      renderPortal();
      showToast(chk.checked ? `Task completed: ${task.title}` : `Task reopened: ${task.title}`);
    }
  });

  // Task Filter Pills
  document.querySelectorAll('#cpTaskFilters .cp-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#cpTaskFilters .cp-filter-pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      currentTaskFilter = pill.getAttribute('data-filter');
      renderTasksTab();
      if (window.lucide) window.lucide.createIcons();
    });
  });

  // Global Search + Cmd+K shortcut
  if (globalSearch) {
    globalSearch.addEventListener('input', () => {
      const q = globalSearch.value.trim().toLowerCase();
      if (!q || !activeClient) {
        if (searchResults) searchResults.style.display = 'none';
        return;
      }
      const matches = [];
      (activeClient.tasks || []).forEach(t => {
        if (t.title.toLowerCase().includes(q)) matches.push({ title: t.title, type: 'Task', tab: 'tasks' });
      });
      (activeClient.files || []).forEach(f => {
        if (f.name.toLowerCase().includes(q)) matches.push({ title: f.name, type: 'File', tab: 'files' });
      });
      (activeClient.deliverables || []).forEach(d => {
        if (d.title.toLowerCase().includes(q)) matches.push({ title: d.title, type: 'Deliverable', tab: 'deliverables' });
      });
      (activeClient.messages || []).forEach(m => {
        if (m.text.toLowerCase().includes(q)) matches.push({ title: m.text.slice(0, 48) + '...', type: 'Message', tab: 'messages' });
      });

      if (searchResults) {
        searchResults.style.display = 'block';
        searchResults.innerHTML = matches.length > 0
          ? matches.slice(0, 6).map(m => `
              <button type="button" class="cp-search-result-item" data-search-tab="${m.tab}">
                <span class="cp-search-result-title">${escapeHtml(m.title)}</span>
                <span class="cp-search-result-type">${m.type}</span>
              </button>
            `).join('')
          : `<div style="padding:0.75rem;font-size:0.84rem;color:var(--cp-ink-muted);text-align:center;">No results found for "${escapeHtml(q)}"</div>`;

        searchResults.querySelectorAll('[data-search-tab]').forEach(btn => {
          btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-search-tab'));
            searchResults.style.display = 'none';
            globalSearch.value = '';
          });
        });
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      if (portalApp && portalApp.style.display !== 'none' && globalSearch) {
        e.preventDefault();
        globalSearch.focus();
      }
    }
    if (e.key === 'Escape') {
      if (searchResults) searchResults.style.display = 'none';
      if (notifPopover) notifPopover.style.display = 'none';
      if (profilePopover) profilePopover.style.display = 'none';
      if (createModal) createModal.classList.remove('is-open');
    }
  });

  // Popovers (Notifications & Profile)
  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (profilePopover) profilePopover.style.display = 'none';
      const open = notifPopover.style.display === 'block';
      notifPopover.style.display = open ? 'none' : 'block';
    });
  }

  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (notifPopover) notifPopover.style.display = 'none';
      const open = profilePopover.style.display === 'block';
      profilePopover.style.display = open ? 'none' : 'block';
    });
  }

  document.addEventListener('click', (e) => {
    if (notifPopover && !e.target.closest('#cpNotifPopover') && !e.target.closest('#cpNotifBtn')) {
      notifPopover.style.display = 'none';
    }
    if (profilePopover && !e.target.closest('#cpProfilePopover') && !e.target.closest('#cpProfileBtn')) {
      profilePopover.style.display = 'none';
    }
    if (searchResults && !e.target.closest('.cp-topbar-left')) {
      searchResults.style.display = 'none';
    }
  });

  // Toggle Empty State Preview / Active Project in Profile Dropdown
  const toggleEmptyBtn = document.getElementById('cpToggleEmptyDemoBtn');
  if (toggleEmptyBtn) {
    toggleEmptyBtn.addEventListener('click', () => {
      if (!activeClient) return;
      activeClient.hasProject = !activeClient.hasProject;
      if (activeClient.hasProject && !activeClient.projectName) {
        activeClient.projectName = 'Brand & Website Redesign';
        activeClient.progress = 65;
        activeClient.status = 'In Progress';
      }
      currentTab = 'overview';
      profilePopover.style.display = 'none';
      renderPortal();
      showToast(activeClient.hasProject ? 'Switched to Active Project Dashboard' : 'Previewing Empty State Portal');
    });
  }

  const goInfoBtn = document.getElementById('cpGoInfoBtn');
  if (goInfoBtn) {
    goInfoBtn.addEventListener('click', () => {
      profilePopover.style.display = 'none';
      switchTab('info');
    });
  }

  const signOutBtn = document.getElementById('cpSignOutBtn');
  if (signOutBtn) signOutBtn.addEventListener('click', logoutClient);

  // Mobile Sidebar Toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      sidebarBackdrop.classList.toggle('is-open');
    });
  }
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      sidebarBackdrop.classList.remove('is-open');
    });
  }

  // Create First Project Modal
  const openCreateBtns = [
    document.getElementById('cpOpenCreateProjectBtn'),
    document.getElementById('cpNewProjectModalTrigger')
  ].filter(Boolean);

  openCreateBtns.forEach(b => {
    b.addEventListener('click', () => {
      if (createModal) createModal.classList.add('is-open');
    });
  });

  const closeCreateBtn = document.getElementById('cpCloseCreateModal');
  if (closeCreateBtn) {
    closeCreateBtn.addEventListener('click', () => createModal.classList.remove('is-open'));
  }

  const createProjectForm = document.getElementById('cpCreateProjectForm');
  if (createProjectForm) {
    createProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!activeClient) return;
      const projName = document.getElementById('cpNewProjName').value.trim();
      const projType = document.getElementById('cpNewProjType').value;
      const projBrief = document.getElementById('cpNewProjBrief').value.trim();

      activeClient.hasProject = true;
      activeClient.projectName = projName || projType;
      activeClient.servicesTier = projType;
      activeClient.status = 'In Progress';
      activeClient.progress = 15;
      activeClient.trackStatus = 'Kickoff scheduled';
      if (projBrief) activeClient.summary = projBrief;

      if (!activeClient.timeline || activeClient.timeline.length === 0) {
        activeClient.timeline = [
          { step: 1, title: 'Discovery & Briefing', meta: 'In Progress • 15%', state: 'active' },
          { step: 2, title: 'Design & Validation', meta: 'Planned • Upcoming', state: 'planned' },
          { step: 3, title: 'Development', meta: 'Planned • Upcoming', state: 'planned' },
          { step: 4, title: 'Launch', meta: 'Planned • Upcoming', state: 'planned' }
        ];
      }
      if (!activeClient.tasks || activeClient.tasks.length === 0) {
        activeClient.tasks = [
          { id: 'T-NEW-1', title: 'Complete onboarding brief & brand assets upload', tag: 'Brand', dueDate: 'Due This Week', status: 'Pending' }
        ];
      }

      persistActiveClient();
      createModal.classList.remove('is-open');
      createProjectForm.reset();
      currentTab = 'overview';
      renderPortal();
      showToast(`Project "${activeClient.projectName}" created!`);
    });
  }

  // Send Direct Message
  const chatForm = document.getElementById('cpChatForm');
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('cpChatInput');
      const txt = (input.value || '').trim();
      if (!txt || !activeClient) return;
      const now = new Date();
      const timeStr = `Today • ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      activeClient.messages = activeClient.messages || [];
      activeClient.messages.push({
        id: 'MSG-' + Date.now(),
        sender: 'client',
        author: activeClient.clientName || activeClient.companyName,
        text: txt,
        time: timeStr
      });
      input.value = '';
      persistActiveClient();
      renderMessagesTab();
    });
  }

  // Book Meeting Form
  const meetForm = document.getElementById('cpBookMeetingForm');
  if (meetForm) {
    meetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!activeClient) return;
      const title = document.getElementById('cpMeetTitle').value.trim();
      const date = document.getElementById('cpMeetDate').value;
      const time = document.getElementById('cpMeetTime').value;

      activeClient.meetings = activeClient.meetings || [];
      activeClient.meetings.unshift({
        id: 'MEET-' + Date.now(),
        title,
        date,
        time,
        platform: 'Google Meet',
        status: 'Requested'
      });
      persistActiveClient();

      // Also notify Admin Hub inquiries
      try {
        const raw = localStorage.getItem(STORAGE_INQUIRIES);
        const list = raw ? JSON.parse(raw) : [];
        if (Array.isArray(list)) {
          list.unshift({
            id: 'MEET-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
            createdAt: new Date().toISOString(),
            clientName: activeClient.clientName,
            companyName: activeClient.companyName,
            clientEmail: activeClient.email,
            services: [`Meeting Request: ${title}`],
            budget: 'Existing Client',
            timeline: `${date} at ${time}`,
            status: 'Nouveau',
            notes: `Client Portal meeting request for ${date} at ${time}: ${title}`
          });
          localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(list));
        }
      } catch (err) {}

      meetForm.reset();
      renderPortal();
      showToast(`Meeting requested for ${date} at ${time}!`);
    });
  }

  // Support Ticket Form
  const supportForm = document.getElementById('cpSupportForm');
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!activeClient) return;
      const subj = document.getElementById('cpSupportSubject').value.trim();
      const msg = document.getElementById('cpSupportMsg').value.trim();
      activeClient.messages = activeClient.messages || [];
      activeClient.messages.push({
        id: 'MSG-SUP-' + Date.now(),
        sender: 'client',
        author: activeClient.clientName || activeClient.companyName,
        text: `[Support: ${subj}] ${msg}`,
        time: 'Just now'
      });
      persistActiveClient();
      supportForm.reset();
      showToast('Support request sent! Redirecting to Messages...');
      setTimeout(() => switchTab('messages'), 600);
    });
  }

  // Cross-tab Sync with Admin Hub
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_CLIENTS) {
      clients = loadClients();
      if (activeClient) {
        const updated = clients.find(c => c.id === activeClient.id);
        if (updated) {
          activeClient = normalizeClient(updated);
          renderPortal();
        }
      }
    }
  });

  // Boot & Auto-restore session
  document.addEventListener('DOMContentLoaded', () => {
    const savedId = sessionStorage.getItem(STORAGE_SESSION);
    if (savedId) {
      const found = clients.find(c => c.id === savedId);
      if (found) {
        loginClient(found);
        return;
      }
    }
    if (window.lucide) window.lucide.createIcons();
  });

})();
