/* ========================================
   PARENT PORTAL JAVASCRIPT
   ======================================== */

// ── Notification helper ──────────────────────────────────
function showNotification(message, type = 'info') {
    const colors = { success: '#22c55e', error: '#ef4444', info: '#3b82f6' };
    const icons  = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };

    const el = document.createElement('div');
    el.style.cssText = `
        position: fixed; top: 1rem; right: 1rem;
        padding: .875rem 1.25rem;
        background: ${colors[type] || colors.info};
        color: white; border-radius: 10px;
        box-shadow: 0 8px 20px rgba(0,0,0,.2);
        z-index: 10000; animation: ppSlideIn .3s ease;
        display: flex; align-items: center; gap: .6rem;
        font-weight: 600; font-size: .9rem; max-width: 320px;
    `;
    el.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${message}</span>`;
    document.body.appendChild(el);

    setTimeout(() => {
        el.style.animation = 'ppSlideOut .3s ease forwards';
        setTimeout(() => el.remove(), 300);
    }, 3000);
}

// Inject animation keyframes once
const _style = document.createElement('style');
_style.textContent = `
    @keyframes ppSlideIn  { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes ppSlideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(110%); opacity: 0; } }
`;
document.head.appendChild(_style);

// ── Sidebar logic ────────────────────────────────────────
const sidebar  = document.getElementById('sidebar');
const isMobile = () => window.innerWidth <= 768;

// Create overlay element for mobile
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
overlay.id = 'sidebarOverlay';
document.body.appendChild(overlay);

overlay.addEventListener('click', closeSidebar);

function openMobileSidebar() {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

function toggleSidebar() {
    if (isMobile()) {
        if (sidebar.classList.contains('mobile-open')) {
            closeSidebar();
        } else {
            openMobileSidebar();
        }
    } else {
        // Desktop: collapse to icon-only mode
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('parentSidebarCollapsed', sidebar.classList.contains('collapsed'));
    }
}

// Restore desktop collapsed state
if (!isMobile() && localStorage.getItem('parentSidebarCollapsed') === 'true') {
    sidebar.classList.add('collapsed');
}

// ── Navigation switching ─────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionName = this.getAttribute('data-section');

            // Switch sections
            sections.forEach(s => s.classList.remove('active'));
            const target = document.getElementById(sectionName);
            if (target) target.classList.add('active');

            // Update active nav item
            navItems.forEach(n => n.classList.remove('active'));
            this.classList.add('active');

            // Update page title
            updatePageTitle(sectionName);

            // ── KEY FIX: auto-collapse sidebar on mobile after selection ──
            if (isMobile()) {
                closeSidebar();
            }
        });
    });

    // Child selector
    const childSelect = document.getElementById('childSelect');
    if (childSelect) {
        childSelect.addEventListener('change', function () {
            showNotification('Loaded data for ' + this.value.split(' - ')[0], 'success');
        });
    }
});

// ── Page title updater ───────────────────────────────────
function updatePageTitle(section) {
    const titles = {
        overview:   { title: 'Parent Dashboard',     subtitle: "Monitor your child's academic journey" },
        progress:   { title: 'Academic Progress',    subtitle: 'View detailed academic performance reports' },
        attendance: { title: 'Attendance Records',   subtitle: "Track your child's attendance history" },
        messages:   { title: 'Messages',             subtitle: 'Communicate with teachers and staff' },
        reports:    { title: 'Reports',               subtitle: 'Download academic reports and documents' },
        fees:       { title: 'Fee Statements',        subtitle: 'View and manage school fees' },
        events:     { title: 'Events Calendar',       subtitle: 'Stay updated on school events and activities' },
        profile:    { title: 'Family Profile',        subtitle: 'Manage your family information' }
    };

    const info = titles[section] || titles.overview;
    const titleEl    = document.getElementById('pageTitle');
    const subtitleEl = document.getElementById('pageSubtitle');
    if (titleEl)    titleEl.textContent    = info.title;
    if (subtitleEl) subtitleEl.textContent = info.subtitle;
}

// ── Logout ───────────────────────────────────────────────
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('parentSession');
        localStorage.removeItem('parentSidebarCollapsed');
        window.location.href = 'index.html';
    }
}

// ── Handle resize (desktop ↔ mobile) ────────────────────
window.addEventListener('resize', () => {
    if (!isMobile()) {
        // Make sure mobile-open / overlay are cleaned up
        closeSidebar();
        document.body.style.overflow = '';
    }
});
