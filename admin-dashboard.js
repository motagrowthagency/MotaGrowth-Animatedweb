/**
 * MotaGrowth — Admin Dashboard Engine
 * Light luxury pearl-and-gold operations hub synced with Client Portal & Proposal Estimator.
 * Uses ONLY actual studio clients & real inbound leads from localStorage (zero fake placeholders).
 */

(function () {
  'use strict';

  const MASTER_PASS = 'Mogamedtazi223';
  const AUTH_KEY = 'motagrowth_admin_auth';

  const STORAGE_CLIENTS = 'motagrowth_v7_clients_db';
  const STORAGE_INQUIRIES = 'motagrowth_v7_inquiries_db';
  const STORAGE_USERS = 'motagrowth_v7_users_db';
  const STORAGE_INVOICES = 'motagrowth_v7_invoices_db';
  const STORAGE_ACTIVITY = 'motagrowth_v7_activity_db';
  const STORAGE_SETTINGS = 'motagrowth_v7_settings_db';

  // Actual MotaGrowth Studio Clients (strictly real portfolio clients)
  function getActualStudioClients() {
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
        projectsCount: 1,
        status: 'Active',
        progress: 65,
        trackStatus: 'On track',
        hasProject: true,
        cpUpgraded: true,
        summary: 'Complete luxury visual identity refresh, editorial brand guidelines, and high-converting bespoke flagship e-commerce experience.',
        director: { name: 'Yassine El Amrani', role: 'Project Manager' },
        tasks: [
          { id: 'T-VEL-1', title: 'Approve homepage design', tag: 'Design', dueDate: 'Due Nov 20', status: 'Pending' },
          { id: 'T-VEL-2', title: 'Review brand guidelines', tag: 'Brand', dueDate: 'Due Nov 22', status: 'Pending' }
        ],
        deliverables: [
          { id: 'D-VEL-1', title: 'Brand Strategy & Positioning Deck', phase: 'Discovery', date: 'Oct 28', status: 'Approved' },
          { id: 'D-VEL-2', title: 'Visual Identity & Logo System', phase: 'Brand', date: 'Nov 04', status: 'Approved' }
        ],
        files: [
          { id: 'F-VEL-1', name: 'Main concept.pdf', size: '5.1 MB', date: 'Nov 15', type: 'pdf' },
          { id: 'F-VEL-2', name: 'Brand guidelines.pdf', size: '2.4 MB', date: 'Nov 12', type: 'pdf' },
          { id: 'F-VEL-3', name: 'Agency client contract.doc', size: '1.2 MB', date: 'Nov 10', type: 'doc' }
        ],
        meetings: [
          { id: 'M-VEL-1', title: 'Homepage Concept & Brand Guidelines Sign-off', date: 'Nov 21, 2026', time: '15:00', platform: 'Google Meet', status: 'Confirmed' }
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
        projectsCount: 2,
        status: 'Active',
        progress: 80,
        trackStatus: 'On track',
        hasProject: true,
        summary: 'Complete digital structuring for TG2D (Travaux Généraux de Développement Durable): 6-page architectural website and internal commercial CRM.',
        director: { name: 'Yassine El Amrani', role: 'Project Manager' },
        tasks: [
          { id: 'T-TG-1', title: 'Validate fleet photography captions', tag: 'Brand', dueDate: 'Due Nov 22', status: 'Pending' },
          { id: 'T-TG-2', title: 'Confirm CRM pipeline stages', tag: 'Web', dueDate: 'Due Nov 24', status: 'Pending' }
        ],
        deliverables: [
          { id: 'D-TG-1', title: 'Architectural Visual Direction', phase: 'Brand', date: 'Oct 20', status: 'Approved' },
          { id: 'D-TG-2', title: '6-Page Corporate Website', phase: 'Web', date: 'Nov 08', status: 'Approved' }
        ],
        files: [
          { id: 'F-TG-1', name: 'TG2D_Site_Architecture.pdf', size: '4.2 MB', date: 'Nov 10', type: 'pdf' },
          { id: 'F-TG-2', name: 'CRM_Workflow_Guide.pdf', size: '2.1 MB', date: 'Nov 16', type: 'pdf' }
        ],
        meetings: [
          { id: 'M-TG-1', title: 'CRM Team Onboarding & Pre-Launch QA', date: 'Nov 24, 2026', time: '11:00', platform: 'Google Meet', status: 'Confirmed' }
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
        projectsCount: 2,
        status: 'Active',
        progress: 90,
        trackStatus: 'On track',
        hasProject: true,
        summary: 'Connected B2B industrial storefront combining product catalogue discovery, express quotation workflows, and customer administration.',
        director: { name: 'Mohamed Tazi', role: 'Managing Director' },
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
        ]
      },
      {
        id: 'CLI-CRECHE',
        clientName: 'Direction Campus',
        companyName: 'La Centrale Crèche',
        email: 'contact@lacentralecreche.ma',
        username: 'creche',
        password: 'growth2026',
        servicesTier: 'Admissions Funnel & Paid Ads',
        projectName: 'Parent Trust Platform & Meta Ads Funnel',
        projectsCount: 1,
        status: 'Active',
        progress: 100,
        trackStatus: '100% Enrolment Achieved',
        hasProject: true,
        summary: 'High-trust digital presence and localized Meta Ads acquisition funnel for Casablanca’s premier early childhood campus.',
        director: { name: 'Mohamed Tazi', role: 'Managing Director' },
        tasks: [],
        deliverables: [
          { id: 'D-CR-1', title: 'Parent Landing Page & Tour Booking', phase: 'Web', date: 'Sep 15', status: 'Approved' },
          { id: 'D-CR-2', title: 'Hyper-Local Meta Ads Funnel', phase: 'Marketing', date: 'Oct 01', status: 'Approved' }
        ],
        files: [
          { id: 'F-CR-1', name: 'Enrolment_Campaign_Report.pdf', size: '2.9 MB', date: 'Oct 25', type: 'pdf' }
        ],
        meetings: []
      }
    ];
  }

  function getDefaultUsers() {
    return [
      { id: 'USR-1', name: 'Mohamed Tazi', email: 'mohamed@motagrowth.com', role: 'Admin', workspace: 'MotaGrowth Studio' },
      { id: 'USR-2', name: 'Yassine El Amrani', email: 'yassine@motagrowth.com', role: 'Project Manager', workspace: 'MotaGrowth Studio' }
    ];
  }

  function getDefaultActivity() {
    return [
      { id: 'ACT-1', type: 'green', title: 'Project "Brand & Website Redesign" updated', meta: 'Velour Luxury Apparel • Recently' },
      { id: 'ACT-2', type: 'gray', title: 'CRM workflow guide shared', meta: 'TG2D • Recently' },
      { id: 'ACT-3', type: 'gold', title: 'Connected B2B Platform live', meta: 'Orsap.ma • Active' }
    ];
  }

  // Storage helpers
  function loadClients() {
    try {
      const raw = localStorage.getItem(STORAGE_CLIENTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out empty-state demo helper account from admin clients list
          const cleaned = parsed.filter(c => c && c.username !== 'newclient');
          if (cleaned.length > 0) return cleaned;
        }
      }
    } catch (e) {}
    const seeds = getActualStudioClients();
    saveClients(seeds);
    return seeds;
  }

  function saveClients(list) {
    try { localStorage.setItem(STORAGE_CLIENTS, JSON.stringify(list)); } catch (e) {}
  }

  // Load ONLY real leads (submitted via proposal.html or added manually — NO fake demo leads)
  function loadLeads() {
    try {
      const raw = localStorage.getItem(STORAGE_INQUIRIES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Strip legacy hardcoded fake demo leads if any remain in browser storage
          const fakeDemoCompanies = ['Maison Argana', 'Atlas Bio Cosmetics', 'Dar Al Andalus', 'Lumina Health'];
          return parsed.filter(item =>
            item &&
            !fakeDemoCompanies.includes(item.companyName) &&
            !(item.id && /^DEVIS-00[1-4]$/.test(item.id))
          );
        }
      }
    } catch (e) {}
    return [];
  }

  function saveLeads(list) {
    try { localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(list)); } catch (e) {}
  }

  function loadUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    const seeds = getDefaultUsers();
    saveUsers(seeds);
    return seeds;
  }

  function saveUsers(list) {
    try { localStorage.setItem(STORAGE_USERS, JSON.stringify(list)); } catch (e) {}
  }

  function loadInvoices() {
    try {
      const raw = localStorage.getItem(STORAGE_INVOICES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  }

  function saveInvoices(list) {
    try { localStorage.setItem(STORAGE_INVOICES, JSON.stringify(list)); } catch (e) {}
  }

  function loadActivity() {
    try {
      const raw = localStorage.getItem(STORAGE_ACTIVITY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    const seeds = getDefaultActivity();
    saveActivity(seeds);
    return seeds;
  }

  function saveActivity(list) {
    try { localStorage.setItem(STORAGE_ACTIVITY, JSON.stringify(list.slice(0, 25))); } catch (e) {}
  }

  function logActivity(type, title, subject) {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    activity.unshift({
      id: 'ACT-' + Date.now(),
      type: type || 'gold',
      title,
      meta: `${subject} • ${timeStr}`
    });
    saveActivity(activity);
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_SETTINGS);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { agencyName: 'MotaGrowth Studio', email: 'hello@motagrowth.com', currency: 'MAD' };
  }

  // State
  let clients = loadClients();
  let leads = loadLeads();
  let users = loadUsers();
  let invoices = loadInvoices();
  let activity = loadActivity();
  let settings = loadSettings();
  let currentTab = 'dashboard';
  let currentAccountsSub = 'clients';

  // Formatting helpers
  function escapeHtml(str) {
    if (str === undefined || str === null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatMoney(num) {
    const cur = settings.currency || 'MAD';
    const formatted = new Intl.NumberFormat('en-US').format(Math.round(num || 0));
    if (cur === 'EUR') return `€ ${formatted}`;
    if (cur === 'USD') return `$ ${formatted}`;
    return `${formatted} MAD`;
  }

  function parseNumericMAD(str) {
    if (typeof str === 'number') return str;
    if (!str) return 0;
    const s = String(str);
    // Extract first realistic number (e.g. "21,000 MAD" -> 21000, "10,000–19,999 MAD" -> 15000)
    const nums = s.match(/\d[\d,]*/g);
    if (!nums || nums.length === 0) return 0;
    const vals = nums.map(n => parseInt(n.replace(/,/g, ''), 10)).filter(v => !isNaN(v));
    if (vals.length >= 2) return Math.round((vals[0] + vals[1]) / 2);
    return vals[0] || 0;
  }

  function getAvatarColor(idx) {
    const cls = ['ad-av-gold', 'ad-av-slate', 'ad-av-purple', 'ad-av-teal'];
    return cls[idx % cls.length];
  }

  function isTaskPending(t) {
    const s = (t.status || '').toLowerCase();
    return s !== 'completed' && s !== 'done';
  }

  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById('adToast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3000);
  }

  // =========================================================================
  // RENDER ALL VIEWS
  // =========================================================================
  function renderAll() {
    clients = loadClients();
    leads = loadLeads();
    users = loadUsers();
    invoices = loadInvoices();
    activity = loadActivity();

    // Calculate Real KPIs
    const totalAccounts = clients.length;
    const activeProjects = clients.reduce((acc, c) => acc + (c.projectsCount || (c.hasProject !== false ? 1 : 0)), 0);
    const openTasks = clients.reduce((acc, c) => acc + ((c.tasks || []).filter(isTaskPending).length), 0);

    const leadsPipelineSum = leads.reduce((sum, l) => {
      if ((l.status || '').toLowerCase() === 'archived') return sum;
      return sum + parseNumericMAD(l.dealValue || l.estimatedPrice || l.budget);
    }, 0);
    const pendingInvoicesSum = invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + (Number(i.amount) || 0), 0);
    const totalPipeline = leadsPipelineSum + pendingInvoicesSum;

    // Update KPI Cards
    const elAcc = document.getElementById('adKpiAccounts');
    const elProj = document.getElementById('adKpiProjects');
    const elTasks = document.getElementById('adKpiTasks');
    const elPipe = document.getElementById('adKpiPipeline');

    if (elAcc) elAcc.textContent = totalAccounts;
    if (elProj) elProj.textContent = activeProjects;
    if (elTasks) elTasks.textContent = openTasks;
    if (elPipe) elPipe.textContent = formatMoney(totalPipeline);

    // Sidebar Leads Badge
    const leadsBadge = document.getElementById('adNavLeadsBadge');
    if (leadsBadge) {
      if (leads.length > 0) {
        leadsBadge.textContent = leads.length;
        leadsBadge.style.display = 'inline-flex';
      } else {
        leadsBadge.style.display = 'none';
      }
    }

    // Notifications Popover
    const notifList = document.getElementById('adNotifList');
    if (notifList) {
      const items = [];
      if (leads.length > 0) {
        items.push(`<div class="ad-popover-item" style="cursor:default;"><span><strong>${leads.length} inbound lead(s)</strong> in pipeline</span></div>`);
      }
      if (openTasks > 0) {
        items.push(`<div class="ad-popover-item" style="cursor:default;"><span><strong>${openTasks} open task(s)</strong> across client workspaces</span></div>`);
      }
      if (items.length === 0) {
        items.push(`<div class="ad-popover-item" style="cursor:default;color:var(--ad-ink-muted);">All caught up!</div>`);
      }
      notifList.innerHTML = items.join('');
    }

    renderDashboardOverview();
    renderAccountsAndLeadsTab();
    renderProjectsTab();
    renderUsersTab();
    renderBillingTab(leadsPipelineSum);
    populateClientSelects();

    if (window.lucide) window.lucide.createIcons();
  }

  function renderDashboardOverview() {
    // 1. Accounts Table (Dashboard Preview — Real Clients)
    const accBody = document.getElementById('adDashAccountsBody');
    if (accBody) {
      if (clients.length === 0) {
        accBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--ad-ink-muted);padding:1.5rem;">No client accounts yet. Click "+ Create Account" to add one.</td></tr>`;
      } else {
        accBody.innerHTML = clients.slice(0, 5).map((c, idx) => {
          const initials = (c.companyName || c.clientName || 'CL').substring(0, 2).toUpperCase();
          const projCount = c.projectsCount || (c.hasProject !== false ? 1 : 0);
          const isPlanning = (c.status || '').toLowerCase() === 'planning';
          const pillCls = isPlanning ? 'ad-status-planning' : 'ad-status-active';
          const statusLabel = isPlanning ? 'Planning' : 'Active';
          return `
            <tr class="is-clickable" data-inspect-client="${escapeHtml(c.id)}">
              <td>
                <div class="ad-account-cell">
                  <span class="ad-account-avatar ${getAvatarColor(idx)}">${escapeHtml(initials)}</span>
                  <strong style="font-weight:700;">${escapeHtml(c.companyName || c.clientName)}</strong>
                </div>
              </td>
              <td style="font-weight:700;">${projCount}</td>
              <td><span class="ad-status-pill ${pillCls}"><span class="dot"></span>${statusLabel}</span></td>
            </tr>
          `;
        }).join('');
      }
    }

    // 2. Recent Activity Timeline
    const actList = document.getElementById('adDashActivityList');
    if (actList) {
      actList.innerHTML = activity.slice(0, 4).map(a => {
        const iconName = a.type === 'green' ? 'check' : (a.type === 'gray' ? 'upload' : 'users');
        const cls = a.type === 'green' ? 'is-green' : (a.type === 'gray' ? 'is-gray' : 'is-gold');
        return `
          <div class="ad-activity-row">
            <div class="ad-activity-rail">
              <div class="ad-activity-icon ${cls}"><i data-lucide="${iconName}"></i></div>
              <div class="ad-activity-line"></div>
            </div>
            <div>
              <div class="ad-activity-title">${escapeHtml(a.title)}</div>
              <div class="ad-activity-meta">${escapeHtml(a.meta)}</div>
            </div>
          </div>
        `;
      }).join('');
    }

    // 3. Real Inbound Leads Table on Dashboard
    const leadsBody = document.getElementById('adDashLeadsBody');
    if (leadsBody) {
      if (leads.length === 0) {
        leadsBody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--ad-ink-muted);padding:1.75rem;">No inbound leads yet. Proposals submitted on <strong>proposal.html</strong> or added manually will appear here automatically.</td></tr>`;
      } else {
        leadsBody.innerHTML = leads.slice(0, 6).map(l => renderLeadSummaryRow(l)).join('');
      }
    }
  }

  function renderLeadSummaryRow(l) {
    const svc = Array.isArray(l.services) ? l.services[0] : (l.service || 'Website Estimate');
    const val = l.dealValue || l.estimatedPrice || l.budget || '—';
    const stage = l.status || 'New';
    return `
      <tr>
        <td>
          <strong style="display:block;">${escapeHtml(l.companyName || l.clientName || 'Prospect')}</strong>
          <span style="font-size:0.76rem;color:var(--ad-ink-secondary);">${escapeHtml(l.clientName || '')} ${l.clientEmail ? '• ' + escapeHtml(l.clientEmail) : ''}</span>
        </td>
        <td>
          <span style="font-weight:600;">${escapeHtml(svc)}</span>
          ${l.estimatedScope ? `<div style="font-size:0.75rem;color:var(--ad-ink-muted);max-width:240px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(l.estimatedScope)}</div>` : ''}
        </td>
        <td>
          <strong style="color:var(--ad-gold-deep);display:block;">${escapeHtml(val)}</strong>
          ${l.budget && l.budget !== val ? `<span style="font-size:0.74rem;color:var(--ad-ink-muted);">Budget: ${escapeHtml(l.budget)}</span>` : ''}
        </td>
        <td>
          <select class="ad-select-inline" data-lead-stage="${escapeHtml(l.id)}">
            <option value="New" ${stage === 'New' || stage === 'Nouveau' ? 'selected' : ''}>New</option>
            <option value="Contacted" ${stage === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Proposal Sent" ${stage === 'Proposal Sent' ? 'selected' : ''}>Proposal Sent</option>
            <option value="Won" ${stage === 'Won' ? 'selected' : ''}>Won</option>
            <option value="Archived" ${stage === 'Archived' ? 'selected' : ''}>Archived</option>
          </select>
        </td>
        <td>
          <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
            <button type="button" class="ad-btn-sm" data-inspect-lead="${escapeHtml(l.id)}">Inspect</button>
            <button type="button" class="ad-btn-sm is-gold" data-convert-lead="${escapeHtml(l.id)}">Convert</button>
            <button type="button" class="ad-btn-sm is-danger" data-delete-lead="${escapeHtml(l.id)}">✕</button>
          </div>
        </td>
      </tr>
    `;
  }

  function renderAccountsAndLeadsTab() {
    // Full Clients Table
    const clientsBody = document.getElementById('adFullClientsBody');
    if (clientsBody) {
      if (clients.length === 0) {
        clientsBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--ad-ink-muted);padding:1.75rem;">No client accounts yet.</td></tr>`;
      } else {
        clientsBody.innerHTML = clients.map((c, idx) => {
          const initials = (c.companyName || 'CL').substring(0, 2).toUpperCase();
          const isPlanning = (c.status || '').toLowerCase() === 'planning';
          return `
            <tr>
              <td>
                <div class="ad-account-cell">
                  <span class="ad-account-avatar ${getAvatarColor(idx)}">${escapeHtml(initials)}</span>
                  <div>
                    <strong style="display:block;">${escapeHtml(c.companyName)}</strong>
                    <span style="font-size:0.74rem;color:var(--ad-ink-muted);">Login: ${escapeHtml(c.username || '—')}</span>
                  </div>
                </div>
              </td>
              <td>
                <div style="font-weight:600;">${escapeHtml(c.clientName || '—')}</div>
                <div style="font-size:0.75rem;color:var(--ad-ink-muted);">${escapeHtml(c.email || '')}</div>
              </td>
              <td>${escapeHtml(c.projectName || c.servicesTier || '—')}</td>
              <td><strong>${typeof c.progress === 'number' ? c.progress : 65}%</strong></td>
              <td><span class="ad-status-pill ${isPlanning ? 'ad-status-planning' : 'ad-status-active'}"><span class="dot"></span>${isPlanning ? 'Planning' : 'Active'}</span></td>
              <td>
                <div style="display:flex;gap:0.4rem;">
                  <button type="button" class="ad-btn-sm is-gold" data-inspect-client="${escapeHtml(c.id)}">Manage</button>
                  <button type="button" class="ad-btn-sm is-danger" data-delete-client="${escapeHtml(c.id)}">Delete</button>
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    // Full Leads Table
    const fullLeads = document.getElementById('adFullLeadsBody');
    if (fullLeads) {
      if (leads.length === 0) {
        fullLeads.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--ad-ink-muted);padding:1.75rem;">No inbound leads yet. Submit a test inquiry on <strong>proposal.html</strong> or click "+ Add Manual Lead".</td></tr>`;
      } else {
        fullLeads.innerHTML = leads.map(l => {
          const dt = l.createdAt ? new Date(l.createdAt).toLocaleDateString() : 'Recent';
          const svc = Array.isArray(l.services) ? l.services[0] : (l.service || 'Proposal');
          const stage = l.status || 'New';
          return `
            <tr>
              <td style="font-size:0.78rem;color:var(--ad-ink-muted);white-space:nowrap;">${escapeHtml(dt)}</td>
              <td><strong>${escapeHtml(l.companyName || l.clientName)}</strong></td>
              <td>
                <div>${escapeHtml(l.clientName || '—')}</div>
                <div style="font-size:0.75rem;color:var(--ad-ink-muted);">${escapeHtml(l.clientPhone || l.clientEmail || '')}</div>
              </td>
              <td>
                <div style="font-weight:600;">${escapeHtml(svc)}</div>
                <div style="font-size:0.75rem;color:var(--ad-gold-deep);font-weight:700;">${escapeHtml(l.dealValue || l.estimatedPrice || '—')}</div>
              </td>
              <td>${escapeHtml(l.budget || '—')}</td>
              <td>
                <select class="ad-select-inline" data-lead-stage="${escapeHtml(l.id)}">
                  <option value="New" ${stage === 'New' || stage === 'Nouveau' ? 'selected' : ''}>New</option>
                  <option value="Contacted" ${stage === 'Contacted' ? 'selected' : ''}>Contacted</option>
                  <option value="Proposal Sent" ${stage === 'Proposal Sent' ? 'selected' : ''}>Proposal Sent</option>
                  <option value="Won" ${stage === 'Won' ? 'selected' : ''}>Won</option>
                  <option value="Archived" ${stage === 'Archived' ? 'selected' : ''}>Archived</option>
                </select>
              </td>
              <td>
                <div style="display:flex;gap:0.4rem;">
                  <button type="button" class="ad-btn-sm" data-inspect-lead="${escapeHtml(l.id)}">Dossier</button>
                  <button type="button" class="ad-btn-sm is-gold" data-convert-lead="${escapeHtml(l.id)}">Convert</button>
                  <button type="button" class="ad-btn-sm is-danger" data-delete-lead="${escapeHtml(l.id)}">✕</button>
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  function renderProjectsTab() {
    const grid = document.getElementById('adProjectsList');
    if (!grid) return;
    if (clients.length === 0) {
      grid.innerHTML = `<div class="ad-card" style="grid-column:1/-1;text-align:center;color:var(--ad-ink-muted);">No active projects yet.</div>`;
      return;
    }
    grid.innerHTML = clients.map(c => {
      const prog = typeof c.progress === 'number' ? c.progress : 65;
      const openCount = (c.tasks || []).filter(isTaskPending).length;
      const filesCount = (c.files || []).length;
      return `
        <div class="ad-card" style="display:flex;flex-direction:column;gap:0.85rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
            <span style="font-size:0.76rem;font-weight:700;color:var(--ad-gold-deep);text-transform:uppercase;">${escapeHtml(c.companyName)}</span>
            <span class="ad-status-pill ${c.status === 'Planning' ? 'ad-status-planning' : 'ad-status-active'}"><span class="dot"></span>${escapeHtml(c.status || 'Active')}</span>
          </div>
          <h3 style="font-size:1.05rem;font-weight:800;">${escapeHtml(c.projectName || c.servicesTier || 'Digital Project')}</h3>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--ad-ink-secondary);margin-bottom:0.35rem;">
              <span>Completion</span>
              <strong>${prog}%</strong>
            </div>
            <div style="height:8px;background:#e5e7ef;border-radius:999px;overflow:hidden;">
              <div style="height:100%;width:${prog}%;background:linear-gradient(90deg,#ebb846,#d89b26);border-radius:999px;"></div>
            </div>
          </div>
          <div style="display:flex;gap:1rem;font-size:0.78rem;color:var(--ad-ink-secondary);">
            <span><strong>${openCount}</strong> open tasks</span>
            <span><strong>${filesCount}</strong> shared files</span>
          </div>
          <div style="margin-top:auto;padding-top:0.4rem;">
            <button type="button" class="ad-btn-outline" style="width:100%;" data-inspect-client="${escapeHtml(c.id)}">Manage Project, Tasks &amp; Files →</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderUsersTab() {
    const body = document.getElementById('adUsersBody');
    if (!body) return;
    const allRows = [
      ...users.map(u => ({ ...u, isTeam: true })),
      ...clients.map(c => ({ id: c.id, name: c.clientName || c.companyName, email: c.email, role: 'Client Portal', workspace: c.companyName, isTeam: false }))
    ];
    body.innerHTML = allRows.map((u, idx) => `
      <tr>
        <td>
          <div class="ad-account-cell">
            <span class="ad-account-avatar ${getAvatarColor(idx)}">${escapeHtml((u.name || 'US').substring(0, 2).toUpperCase())}</span>
            <strong>${escapeHtml(u.name)}</strong>
          </div>
        </td>
        <td>${escapeHtml(u.email || '—')}</td>
        <td><span class="ad-status-pill ${u.isTeam ? 'ad-status-gold' : 'ad-status-planning'}">${escapeHtml(u.role)}</span></td>
        <td>${escapeHtml(u.workspace)}</td>
        <td>
          ${u.isTeam && u.id !== 'USR-1' ? `<button type="button" class="ad-btn-sm is-danger" data-delete-user="${escapeHtml(u.id)}">Remove</button>` : `<span style="font-size:0.76rem;color:var(--ad-ink-muted);">${u.isTeam ? 'Owner' : 'Portal Access'}</span>`}
        </td>
      </tr>
    `).join('');
  }

  function renderBillingTab(leadsPipelineSum) {
    const collected = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + (Number(i.amount) || 0), 0);
    const pending = invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + (Number(i.amount) || 0), 0);

    const elCol = document.getElementById('adBillCollected');
    const elPen = document.getElementById('adBillPending');
    const elPip = document.getElementById('adBillPipeline');
    if (elCol) elCol.textContent = formatMoney(collected);
    if (elPen) elPen.textContent = formatMoney(pending);
    if (elPip) elPip.textContent = formatMoney(leadsPipelineSum);

    const body = document.getElementById('adInvoicesBody');
    if (!body) return;
    if (invoices.length === 0) {
      body.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--ad-ink-muted);padding:1.75rem;">No invoices created yet. Click "+ Create Invoice" to issue a client invoice.</td></tr>`;
    } else {
      body.innerHTML = invoices.map(inv => `
        <tr>
          <td style="font-family:var(--ad-mono);font-weight:700;">${escapeHtml(inv.id)}</td>
          <td><strong>${escapeHtml(inv.clientName)}</strong></td>
          <td>${escapeHtml(inv.description)}</td>
          <td><strong>${formatMoney(inv.amount)}</strong></td>
          <td>${escapeHtml(inv.dueDate || '—')}</td>
          <td><span class="ad-status-pill ${inv.status === 'Paid' ? 'ad-status-active' : 'ad-status-gold'}"><span class="dot"></span>${escapeHtml(inv.status)}</span></td>
          <td>
            <div style="display:flex;gap:0.4rem;">
              <button type="button" class="ad-btn-sm is-gold" data-toggle-invoice="${escapeHtml(inv.id)}">${inv.status === 'Paid' ? 'Mark Pending' : 'Mark Paid'}</button>
              <button type="button" class="ad-btn-sm is-danger" data-delete-invoice="${escapeHtml(inv.id)}">✕</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  function populateClientSelects() {
    const opts = clients.map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.companyName)}</option>`).join('');
    const projSel = document.getElementById('projClientSelect');
    const invSel = document.getElementById('invClientSelect');
    if (projSel) projSel.innerHTML = opts || `<option value="">Create a client account first</option>`;
    if (invSel) invSel.innerHTML = opts || `<option value="">Create a client account first</option>`;
  }

  // =========================================================================
  // INSPECTOR DRAWERS (Client Workspace Manager & Lead Dossier)
  // =========================================================================
  const drawerBackdrop = document.getElementById('adDrawerBackdrop');
  const drawerTag = document.getElementById('adDrawerTag');
  const drawerTitle = document.getElementById('adDrawerTitle');
  const drawerBody = document.getElementById('adDrawerBody');

  function openClientDrawer(clientId) {
    const c = clients.find(item => item.id === clientId);
    if (!c) return;

    drawerTag.textContent = 'CLIENT WORKSPACE MANAGER';
    drawerTitle.textContent = c.companyName || c.clientName;

    const prog = typeof c.progress === 'number' ? c.progress : 65;
    const tasksHtml = (c.tasks || []).map(t => `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;padding:0.5rem 0;border-bottom:1px solid #f1f2f6;">
        <span style="font-size:0.84rem;${!isTaskPending(t) ? 'text-decoration:line-through;color:var(--ad-ink-muted);' : 'font-weight:600;'}">${escapeHtml(t.title)}</span>
        <span style="font-size:0.74rem;color:var(--ad-gold-deep);font-weight:700;">${escapeHtml(t.status)}</span>
      </div>
    `).join('') || `<div style="font-size:0.82rem;color:var(--ad-ink-muted);">No tasks assigned yet.</div>`;

    drawerBody.innerHTML = `
      <div class="ad-detail-box">
        <div class="ad-detail-label">Client Portal Credentials</div>
        <div style="font-size:0.86rem;line-height:1.6;">
          <div><strong>Contact:</strong> ${escapeHtml(c.clientName)} (${escapeHtml(c.email)})</div>
          <div><strong>Username:</strong> <code>${escapeHtml(c.username || '—')}</code> &bull; <strong>Passcode:</strong> <code>${escapeHtml(c.password || 'growth2026')}</code></div>
        </div>
        <button type="button" class="ad-btn-sm is-gold" id="drawerCopyInviteBtn" style="margin-top:0.65rem;">Copy Portal Onboarding Invite</button>
      </div>

      <div class="ad-detail-box">
        <div class="ad-detail-label">Live Project Progress (Syncs to Client Portal)</div>
        <div style="font-weight:700;margin-bottom:0.55rem;">${escapeHtml(c.projectName || c.servicesTier)}</div>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.65rem;">
          <input type="range" id="drawerProgSlider" min="0" max="100" value="${prog}" style="flex:1;accent-color:var(--ad-gold-deep);">
          <strong id="drawerProgVal" style="width:42px;text-align:right;">${prog}%</strong>
        </div>
        <div style="display:flex;gap:0.6rem;align-items:center;">
          <select id="drawerStatusSelect" class="ad-input" style="padding:0.5rem 0.75rem;">
            <option value="Active" ${c.status !== 'Planning' ? 'selected' : ''}>Active / In Progress</option>
            <option value="Planning" ${c.status === 'Planning' ? 'selected' : ''}>Planning</option>
          </select>
          <button type="button" class="ad-btn-gold" id="drawerSaveProgBtn" style="padding:0.55rem 1rem;font-size:0.82rem;white-space:nowrap;">Save Sync</button>
        </div>
      </div>

      <div class="ad-detail-box">
        <div class="ad-detail-label">Client Tasks (Next Actions)</div>
        <div style="margin-bottom:0.8rem;">${tasksHtml}</div>
        <form id="drawerAddTaskForm" style="display:flex;gap:0.5rem;">
          <input type="text" id="drawerNewTaskInput" class="ad-input" placeholder="Add new action item for client..." style="padding:0.55rem 0.8rem;" required>
          <button type="submit" class="ad-btn-sm is-gold" style="white-space:nowrap;">+ Add</button>
        </form>
      </div>

      <div class="ad-detail-box">
        <div class="ad-detail-label">Share File to Client Vault</div>
        <form id="drawerAddFileForm" style="display:flex;gap:0.5rem;">
          <input type="text" id="drawerNewFileInput" class="ad-input" placeholder="e.g. Final_Proposal.pdf" style="padding:0.55rem 0.8rem;" required>
          <button type="submit" class="ad-btn-sm is-gold" style="white-space:nowrap;">+ Share</button>
        </form>
      </div>
    `;

    drawerBackdrop.classList.add('is-open');

    // Bind Drawer Controls
    const slider = document.getElementById('drawerProgSlider');
    const valEl = document.getElementById('drawerProgVal');
    if (slider && valEl) {
      slider.addEventListener('input', () => { valEl.textContent = slider.value + '%'; });
    }

    const saveProgBtn = document.getElementById('drawerSaveProgBtn');
    if (saveProgBtn) {
      saveProgBtn.addEventListener('click', () => {
        c.progress = parseInt(slider.value, 10);
        c.status = document.getElementById('drawerStatusSelect').value;
        saveClients(clients);
        logActivity('green', `Project "${c.projectName || 'Workspace'}" updated to ${c.progress}%`, c.companyName);
        renderAll();
        showToast(`Synced ${c.companyName} progress (${c.progress}%) to Client Portal!`);
      });
    }

    const copyBtn = document.getElementById('drawerCopyInviteBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const portalUrl = `${window.location.origin}/client-space.html`;
        const text = `Hello ${c.clientName}, your MotaGrowth Client Portal is ready:\nLink: ${portalUrl}\nUsername: ${c.username}\nPasscode: ${c.password}`;
        navigator.clipboard?.writeText(text).catch(() => {});
        showToast('Portal invite copied to clipboard!');
      });
    }

    const addTaskForm = document.getElementById('drawerAddTaskForm');
    if (addTaskForm) {
      addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('drawerNewTaskInput').value.trim();
        if (!title) return;
        c.tasks = c.tasks || [];
        c.tasks.unshift({ id: 'T-' + Date.now(), title, tag: 'Design', dueDate: 'Action Required', status: 'Pending' });
        saveClients(clients);
        logActivity('gold', `New task assigned: "${title}"`, c.companyName);
        renderAll();
        openClientDrawer(c.id);
        showToast('Task added and synced to Client Portal!');
      });
    }

    const addFileForm = document.getElementById('drawerAddFileForm');
    if (addFileForm) {
      addFileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fname = document.getElementById('drawerNewFileInput').value.trim();
        if (!fname) return;
        const ext = fname.split('.').pop().toLowerCase();
        c.files = c.files || [];
        c.files.unshift({ id: 'F-' + Date.now(), name: fname, size: '2.0 MB', date: 'Today', type: ext });
        saveClients(clients);
        logActivity('gray', `New file uploaded: ${fname}`, c.companyName);
        renderAll();
        openClientDrawer(c.id);
        showToast(`Shared "${fname}" to ${c.companyName}'s vault!`);
      });
    }
  }

  function openLeadDrawer(leadId) {
    const l = leads.find(item => item.id === leadId);
    if (!l) return;

    drawerTag.textContent = `INBOUND LEAD DOSSIER • ${l.id || ''}`;
    drawerTitle.textContent = l.companyName || l.clientName || 'Prospect';

    const waNumber = (l.clientPhone || '').replace(/\D/g, '');
    drawerBody.innerHTML = `
      <div style="display:flex;gap:0.6rem;flex-wrap:wrap;">
        ${waNumber ? `<a href="https://wa.me/${waNumber}" target="_blank" rel="noopener" class="ad-btn-gold" style="padding:0.55rem 1.05rem;font-size:0.82rem;">WhatsApp Lead ↗</a>` : ''}
        ${l.clientEmail ? `<a href="mailto:${escapeHtml(l.clientEmail)}" class="ad-btn-outline" style="padding:0.55rem 1rem;font-size:0.82rem;">Send Email</a>` : ''}
        <button type="button" class="ad-btn-outline" data-convert-lead="${escapeHtml(l.id)}" style="padding:0.55rem 1rem;font-size:0.82rem;">Convert to Client Account</button>
      </div>

      <div class="ad-detail-box">
        <div class="ad-detail-label">Contact &amp; Company</div>
        <div style="font-size:0.86rem;line-height:1.65;">
          <div><strong>Name:</strong> ${escapeHtml(l.clientName || '—')}</div>
          <div><strong>Company:</strong> ${escapeHtml(l.companyName || '—')}</div>
          <div><strong>Email:</strong> ${escapeHtml(l.clientEmail || '—')}</div>
          <div><strong>Phone:</strong> ${escapeHtml(l.clientPhone || '—')}</div>
          <div><strong>Location:</strong> ${escapeHtml(l.location || '—')}</div>
        </div>
      </div>

      <div class="ad-detail-box">
        <div class="ad-detail-label">Scope Estimate &amp; Budget Qualification</div>
        <div style="font-size:0.86rem;line-height:1.65;">
          <div><strong>Calculated Estimate:</strong> <span style="color:var(--ad-gold-deep);font-weight:800;">${escapeHtml(l.dealValue || l.estimatedPrice || '—')}</span></div>
          <div><strong>Selected Budget:</strong> ${escapeHtml(l.budget || '—')}</div>
          <div><strong>Timeline / Priority:</strong> ${escapeHtml(l.timeline || '—')}</div>
          ${l.budgetAlignment ? `<div><strong>Alignment:</strong> ${escapeHtml(l.budgetAlignment.toUpperCase())}</div>` : ''}
          ${l.proceedPreference ? `<div><strong>Preferred Approach:</strong> ${escapeHtml(l.proceedPreference)}</div>` : ''}
        </div>
      </div>

      <div class="ad-detail-box">
        <div class="ad-detail-label">Full Brief &amp; Scope Details</div>
        <pre style="white-space:pre-wrap;font-family:inherit;font-size:0.83rem;color:var(--ad-ink-secondary);line-height:1.6;">${escapeHtml(l.notes || l.businessDescription || 'No additional notes.')}</pre>
      </div>
    `;

    drawerBackdrop.classList.add('is-open');
  }

  // =========================================================================
  // NAVIGATION, MODALS & ACTIONS
  // =========================================================================
  function switchTab(tabName, subtab) {
    currentTab = tabName;
    document.querySelectorAll('.ad-nav-item, .ad-support-pill').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tabName);
    });

    const map = {
      dashboard: 'adPanelDashboard',
      accounts: 'adPanelAccounts',
      projects: 'adPanelProjects',
      users: 'adPanelUsers',
      billing: 'adPanelBilling',
      settings: 'adPanelSettings',
      support: 'adPanelSupport'
    };
    document.querySelectorAll('.ad-tab-panel').forEach(p => { p.style.display = 'none'; });
    const panel = document.getElementById(map[tabName] || 'adPanelDashboard');
    if (panel) panel.style.display = 'block';

    if (tabName === 'accounts' && subtab) {
      switchAccountsSub(subtab);
    }

    document.getElementById('adSidebar')?.classList.remove('is-open');
    document.getElementById('adSidebarBackdrop')?.classList.remove('is-open');
    if (window.lucide) window.lucide.createIcons();
  }

  function switchAccountsSub(sub) {
    currentAccountsSub = sub;
    document.getElementById('adSubtabClientsBtn')?.classList.toggle('is-active', sub === 'clients');
    document.getElementById('adSubtabLeadsBtn')?.classList.toggle('is-active', sub === 'leads');
    const cPane = document.getElementById('adAccountsClientsPane');
    const lPane = document.getElementById('adAccountsLeadsPane');
    if (cPane) cPane.style.display = sub === 'clients' ? 'block' : 'none';
    if (lPane) lPane.style.display = sub === 'leads' ? 'block' : 'none';
  }

  function openModal(name) {
    const map = {
      createAccount: 'modalCreateAccount',
      createProject: 'modalCreateProject',
      addUser: 'modalAddUser',
      createInvoice: 'modalCreateInvoice',
      addLead: 'modalAddLead'
    };
    populateClientSelects();
    const el = document.getElementById(map[name]);
    if (el) el.classList.add('is-open');
  }

  function closeAllModals() {
    document.querySelectorAll('.ad-modal-backdrop').forEach(m => m.classList.remove('is-open'));
  }

  // Event Listeners
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
  });

  document.querySelectorAll('[data-accounts-sub]').forEach(btn => {
    btn.addEventListener('click', () => switchAccountsSub(btn.getAttribute('data-accounts-sub')));
  });

  document.addEventListener('click', (e) => {
    const openM = e.target.closest('[data-open-modal]');
    if (openM) {
      openModal(openM.getAttribute('data-open-modal'));
      return;
    }

    if (e.target.closest('[data-close-modal]')) {
      closeAllModals();
      return;
    }

    const jump = e.target.closest('[data-jump-tab]');
    if (jump) {
      switchTab(jump.getAttribute('data-jump-tab'), jump.getAttribute('data-subtab'));
      return;
    }

    const inspClient = e.target.closest('[data-inspect-client]');
    if (inspClient) {
      openClientDrawer(inspClient.getAttribute('data-inspect-client'));
      return;
    }

    const inspLead = e.target.closest('[data-inspect-lead]');
    if (inspLead) {
      openLeadDrawer(inspLead.getAttribute('data-inspect-lead'));
      return;
    }

    const convLead = e.target.closest('[data-convert-lead]');
    if (convLead) {
      const id = convLead.getAttribute('data-convert-lead');
      const l = leads.find(x => x.id === id);
      if (l) {
        const uname = (l.companyName || l.clientName || 'client').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12) || 'client';
        const newClient = {
          id: 'CLI-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
          clientName: l.clientName || 'Client',
          companyName: l.companyName || l.clientName || 'New Client',
          email: l.clientEmail || '',
          username: uname,
          password: 'growth2026',
          servicesTier: Array.isArray(l.services) ? l.services[0] : (l.service || 'Digital Architecture'),
          projectName: Array.isArray(l.services) ? l.services[0] : (l.service || 'Website Project'),
          projectsCount: 1,
          status: 'Active',
          progress: 10,
          trackStatus: 'Kickoff',
          hasProject: true,
          director: { name: 'Yassine El Amrani', role: 'Project Manager' },
          tasks: [{ id: 'T-' + Date.now(), title: 'Complete onboarding brief', tag: 'Brand', dueDate: 'This Week', status: 'Pending' }],
          deliverables: [],
          files: [],
          meetings: []
        };
        clients.unshift(newClient);
        l.status = 'Won';
        saveClients(clients);
        saveLeads(leads);
        logActivity('gold', `Client account created from lead`, newClient.companyName);
        drawerBackdrop.classList.remove('is-open');
        renderAll();
        showToast(`Converted ${newClient.companyName} into an active Client Account!`);
      }
      return;
    }

    const delLead = e.target.closest('[data-delete-lead]');
    if (delLead) {
      const id = delLead.getAttribute('data-delete-lead');
      if (confirm('Delete this inbound lead?')) {
        leads = leads.filter(x => x.id !== id);
        saveLeads(leads);
        renderAll();
        showToast('Lead removed.');
      }
      return;
    }

    const delClient = e.target.closest('[data-delete-client]');
    if (delClient) {
      const id = delClient.getAttribute('data-delete-client');
      const target = clients.find(x => x.id === id);
      if (target && confirm(`Delete client account "${target.companyName}"?`)) {
        clients = clients.filter(x => x.id !== id);
        saveClients(clients);
        renderAll();
        showToast(`Account "${target.companyName}" deleted.`);
      }
      return;
    }

    const delUser = e.target.closest('[data-delete-user]');
    if (delUser) {
      const id = delUser.getAttribute('data-delete-user');
      users = users.filter(u => u.id !== id);
      saveUsers(users);
      renderAll();
      showToast('User removed.');
      return;
    }

    const togInv = e.target.closest('[data-toggle-invoice]');
    if (togInv) {
      const id = togInv.getAttribute('data-toggle-invoice');
      const inv = invoices.find(i => i.id === id);
      if (inv) {
        inv.status = inv.status === 'Paid' ? 'Pending' : 'Paid';
        saveInvoices(invoices);
        logActivity('green', `Invoice ${inv.id} marked ${inv.status}`, inv.clientName);
        renderAll();
        showToast(`Invoice ${inv.id} marked as ${inv.status}`);
      }
      return;
    }

    const delInv = e.target.closest('[data-delete-invoice]');
    if (delInv) {
      const id = delInv.getAttribute('data-delete-invoice');
      invoices = invoices.filter(i => i.id !== id);
      saveInvoices(invoices);
      renderAll();
      showToast('Invoice deleted.');
      return;
    }

    // Close popovers on outside click
    if (!e.target.closest('#adNotifPopover') && !e.target.closest('#adNotifBtn')) {
      const np = document.getElementById('adNotifPopover');
      if (np) np.style.display = 'none';
    }
    if (!e.target.closest('#adProfilePopover') && !e.target.closest('#adProfileBtn')) {
      const pp = document.getElementById('adProfilePopover');
      if (pp) pp.style.display = 'none';
    }
    if (!e.target.closest('.ad-topbar-left')) {
      const sr = document.getElementById('adSearchResults');
      if (sr) sr.style.display = 'none';
    }
  });

  // Lead Stage Inline Dropdown
  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-lead-stage]');
    if (!sel) return;
    const id = sel.getAttribute('data-lead-stage');
    const l = leads.find(x => x.id === id);
    if (l) {
      l.status = sel.value;
      saveLeads(leads);
      logActivity('gold', `Lead stage updated to ${l.status}`, l.companyName || l.clientName);
      renderAll();
      showToast(`Stage updated to ${l.status}`);
    }
  });

  // Form Handlers
  document.getElementById('formCreateAccount')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newClient = {
      id: 'CLI-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      companyName: document.getElementById('accCompany').value.trim(),
      clientName: document.getElementById('accClientName').value.trim(),
      email: document.getElementById('accEmail').value.trim(),
      username: document.getElementById('accUsername').value.trim().toLowerCase(),
      password: document.getElementById('accPassword').value.trim() || 'growth2026',
      projectName: document.getElementById('accProjectName').value.trim(),
      servicesTier: document.getElementById('accProjectName').value.trim(),
      projectsCount: 1,
      status: document.getElementById('accStatus').value,
      progress: 10,
      trackStatus: 'On track',
      hasProject: true,
      director: { name: 'Yassine El Amrani', role: 'Project Manager' },
      tasks: [],
      deliverables: [],
      files: [],
      meetings: []
    };
    clients.unshift(newClient);
    saveClients(clients);
    logActivity('gold', 'Client account created', newClient.companyName);
    e.target.reset();
    closeAllModals();
    renderAll();
    showToast(`Account "${newClient.companyName}" created & synced to Client Portal!`);
  });

  document.getElementById('formCreateProject')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cid = document.getElementById('projClientSelect').value;
    const c = clients.find(x => x.id === cid);
    if (!c) { showToast('Please create a client account first.'); return; }
    const title = document.getElementById('projTitle').value.trim();
    c.projectName = title;
    c.status = document.getElementById('projStatus').value;
    c.progress = parseInt(document.getElementById('projProgress').value, 10) || 15;
    c.projectsCount = (c.projectsCount || 0) + 1;
    c.hasProject = true;
    const sum = document.getElementById('projSummary').value.trim();
    if (sum) c.summary = sum;
    saveClients(clients);
    logActivity('green', `Project "${title}" updated`, c.companyName);
    e.target.reset();
    closeAllModals();
    renderAll();
    showToast(`Project "${title}" assigned to ${c.companyName}!`);
  });

  document.getElementById('formAddUser')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = {
      id: 'USR-' + Date.now(),
      name: document.getElementById('userFullName').value.trim(),
      email: document.getElementById('userEmail').value.trim(),
      role: document.getElementById('userRole').value,
      workspace: 'MotaGrowth Studio'
    };
    users.push(u);
    saveUsers(users);
    logActivity('gold', `Team user added (${u.role})`, u.name);
    e.target.reset();
    closeAllModals();
    renderAll();
    showToast(`Added ${u.name} to Users!`);
  });

  document.getElementById('formCreateInvoice')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cid = document.getElementById('invClientSelect').value;
    const c = clients.find(x => x.id === cid);
    const inv = {
      id: 'INV-' + String(invoices.length + 101),
      clientId: cid,
      clientName: c ? c.companyName : 'Client',
      description: document.getElementById('invDesc').value.trim(),
      amount: parseFloat(document.getElementById('invAmount').value) || 0,
      dueDate: document.getElementById('invDue').value,
      status: 'Pending'
    };
    invoices.unshift(inv);
    saveInvoices(invoices);
    logActivity('gold', `Invoice ${inv.id} created (${formatMoney(inv.amount)})`, inv.clientName);
    e.target.reset();
    closeAllModals();
    renderAll();
    showToast(`Invoice ${inv.id} created!`);
  });

  document.getElementById('formAddLead')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const valNum = parseFloat(document.getElementById('leadValue').value) || 0;
    const newLead = {
      id: 'INQ-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      createdAt: new Date().toISOString(),
      clientName: document.getElementById('leadName').value.trim(),
      companyName: document.getElementById('leadCompany').value.trim(),
      clientEmail: document.getElementById('leadEmail').value.trim(),
      clientPhone: document.getElementById('leadPhone').value.trim(),
      services: [document.getElementById('leadService').value],
      dealValue: `${new Intl.NumberFormat('en-US').format(valNum)} MAD`,
      budget: `${new Intl.NumberFormat('en-US').format(valNum)} MAD`,
      notes: document.getElementById('leadNotes').value.trim(),
      status: 'New'
    };
    leads.unshift(newLead);
    saveLeads(leads);
    logActivity('gold', `New lead added (${newLead.dealValue})`, newLead.companyName);
    e.target.reset();
    closeAllModals();
    renderAll();
    showToast(`Lead "${newLead.companyName}" added to pipeline!`);
  });

  // Settings & Exports
  document.getElementById('adSettingsForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    settings = {
      agencyName: document.getElementById('adSetAgencyName').value.trim(),
      email: document.getElementById('adSetEmail').value.trim(),
      currency: document.getElementById('adSetCurrency').value
    };
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
    renderAll();
    showToast('System settings saved!');
  });

  function downloadFile(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function exportJsonBackup() {
    const payload = { exportedAt: new Date().toISOString(), clients, leads, users, invoices, activity };
    downloadFile(JSON.stringify(payload, null, 2), `motagrowth-backup-${new Date().toISOString().slice(0, 10)}.json`, 'application/json');
    showToast('JSON backup downloaded!');
  }

  document.getElementById('adExportJsonBtn')?.addEventListener('click', exportJsonBackup);
  document.getElementById('adExportFullJsonBtn')?.addEventListener('click', exportJsonBackup);

  document.getElementById('adExportCsvBtn')?.addEventListener('click', () => {
    const rows = [['ID', 'Date', 'Company', 'Contact', 'Email', 'Phone', 'Estimate', 'Budget', 'Stage']];
    leads.forEach(l => {
      rows.push([
        l.id || '',
        l.createdAt ? l.createdAt.slice(0, 10) : '',
        l.companyName || '',
        l.clientName || '',
        l.clientEmail || '',
        l.clientPhone || '',
        l.dealValue || l.estimatedPrice || '',
        l.budget || '',
        l.status || 'New'
      ].map(v => `"${String(v).replace(/"/g, '""')}"`));
    });
    downloadFile(rows.map(r => r.join(',')).join('\n'), `motagrowth-leads-${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv');
    showToast('Leads exported to CSV!');
  });

  // Global Search
  const globalSearch = document.getElementById('adGlobalSearch');
  const searchResults = document.getElementById('adSearchResults');
  if (globalSearch && searchResults) {
    globalSearch.addEventListener('input', () => {
      const q = globalSearch.value.trim().toLowerCase();
      if (!q) { searchResults.style.display = 'none'; return; }
      const hits = [];
      clients.forEach(c => {
        if ((c.companyName || '').toLowerCase().includes(q) || (c.projectName || '').toLowerCase().includes(q)) {
          hits.push({ title: c.companyName, type: 'Account', action: () => openClientDrawer(c.id) });
        }
      });
      leads.forEach(l => {
        if ((l.companyName || '').toLowerCase().includes(q) || (l.clientName || '').toLowerCase().includes(q)) {
          hits.push({ title: l.companyName || l.clientName, type: 'Lead', action: () => openLeadDrawer(l.id) });
        }
      });
      searchResults.style.display = 'block';
      searchResults.innerHTML = hits.length > 0
        ? hits.slice(0, 6).map((h, i) => `
            <button type="button" class="ad-search-item" data-hit="${i}">
              <span style="font-size:0.85rem;font-weight:600;">${escapeHtml(h.title)}</span>
              <span class="ad-status-pill ad-status-gold" style="font-size:0.7rem;padding:0.15rem 0.55rem;">${h.type}</span>
            </button>
          `).join('')
        : `<div style="padding:0.7rem;text-align:center;font-size:0.82rem;color:var(--ad-ink-muted);">No matching accounts or leads</div>`;
      searchResults.querySelectorAll('[data-hit]').forEach(btn => {
        btn.addEventListener('click', () => {
          hits[parseInt(btn.getAttribute('data-hit'), 10)].action();
          searchResults.style.display = 'none';
          globalSearch.value = '';
        });
      });
    });
  }

  // Drawer & Popover Controls
  document.getElementById('adCloseDrawerBtn')?.addEventListener('click', () => drawerBackdrop.classList.remove('is-open'));
  drawerBackdrop?.addEventListener('click', (e) => { if (e.target === drawerBackdrop) drawerBackdrop.classList.remove('is-open'); });

  document.getElementById('adNotifBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('adProfilePopover').style.display = 'none';
    const np = document.getElementById('adNotifPopover');
    np.style.display = np.style.display === 'block' ? 'none' : 'block';
  });

  document.getElementById('adProfileBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('adNotifPopover').style.display = 'none';
    const pp = document.getElementById('adProfilePopover');
    pp.style.display = pp.style.display === 'block' ? 'none' : 'block';
  });

  // Mobile Menu
  document.getElementById('adMobileMenuBtn')?.addEventListener('click', () => {
    document.getElementById('adSidebar')?.classList.toggle('is-open');
    document.getElementById('adSidebarBackdrop')?.classList.toggle('is-open');
  });
  document.getElementById('adSidebarBackdrop')?.addEventListener('click', () => {
    document.getElementById('adSidebar')?.classList.remove('is-open');
    document.getElementById('adSidebarBackdrop')?.classList.remove('is-open');
  });

  // Master Lock / Auth
  const lockScreen = document.getElementById('adLockScreen');
  const appShell = document.getElementById('adAppShell');
  const lockForm = document.getElementById('adLockForm');
  const passInput = document.getElementById('adMasterPass');
  const lockError = document.getElementById('adLockError');

  function unlockAdmin() {
    sessionStorage.setItem(AUTH_KEY, 'true');
    if (lockScreen) lockScreen.style.display = 'none';
    if (appShell) appShell.style.display = 'flex';
    renderAll();
  }

  function lockAdmin() {
    sessionStorage.removeItem(AUTH_KEY);
    if (appShell) appShell.style.display = 'none';
    if (lockScreen) lockScreen.style.display = 'flex';
    if (passInput) passInput.value = '';
    if (lockError) lockError.textContent = '';
  }

  document.getElementById('adTogglePassBtn')?.addEventListener('click', () => {
    if (!passInput) return;
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
  });

  lockForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if ((passInput.value || '').trim() === MASTER_PASS) {
      unlockAdmin();
    } else {
      lockError.textContent = 'Incorrect master password.';
    }
  });

  document.getElementById('adLockOutBtn')?.addEventListener('click', lockAdmin);

  // Live Cross-Tab Sync
  window.addEventListener('storage', (e) => {
    if ([STORAGE_CLIENTS, STORAGE_INQUIRIES, STORAGE_INVOICES, STORAGE_USERS].includes(e.key)) {
      if (sessionStorage.getItem(AUTH_KEY) === 'true') renderAll();
    }
  });

  // Boot
  document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem(AUTH_KEY) === 'true') {
      unlockAdmin();
    } else if (window.lucide) {
      window.lucide.createIcons();
    }
  });

})();
