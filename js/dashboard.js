/* ========================================
   DASHBOARD JAVASCRIPT
   ======================================== */

// Page Titles Configuration
const pageTitles = {
    overview:    { title: 'Dashboard Overview',  subtitle: "Welcome back! Here's your academic summary" },
    results:     { title: 'My Results',           subtitle: 'View your academic performance and reports' },
    resources:   { title: 'Learning Resources',   subtitle: 'Access study materials and past papers' },
    letters:     { title: 'Request Letters',       subtitle: 'Request official documents and letters' },
    profile:     { title: 'My Profile',            subtitle: 'Manage your personal information' },
    timetable:   { title: 'My Timetable',          subtitle: 'View your class schedule' },
    assignments: { title: 'Assignments',           subtitle: 'Track your homework and tasks' },
    fees:        { title: 'Fees & Payments',        subtitle: 'View your fee statements' },
    calculator:  { title: 'Grade Calculator',       subtitle: 'Predict your final grades' },
    planner:     { title: 'Study Planner',          subtitle: 'Plan your study schedule' }
};

// Navigation System
function initDashboardNavigation() {
    const navItems       = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle      = document.getElementById('pageTitle');
    const pageSubtitle   = document.getElementById('pageSubtitle');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.getAttribute('href')) return; // allow real links
            e.preventDefault();

            const section = item.dataset.section;

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            contentSections.forEach(content => content.classList.remove('active'));
            const targetSection = document.getElementById(section);
            if (targetSection) targetSection.classList.add('active');

            if (pageTitles[section]) {
                if (pageTitle)    pageTitle.textContent    = pageTitles[section].title;
                if (pageSubtitle) pageSubtitle.textContent = pageTitles[section].subtitle;
            }

            // Auto-close sidebar on mobile
            if (window.innerWidth <= 1024) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('active');
            }
        });
    });
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    const darkModeIcon = darkModeToggle.querySelector('i');
    if (!darkModeIcon) return;

    // Restore saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');

        if (isDark) {
            darkModeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'enabled');
            showNotification('Dark mode enabled', 'success');
        } else {
            darkModeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'disabled');
            showNotification('Light mode enabled', 'info');
        }
    });
}

// Notification System
function initNotifications() {
    const notificationBtn      = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');

    if (!notificationBtn || !notificationDropdown) return;

    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
            notificationDropdown.classList.remove('show');
        }
    });
}

function viewNotification(element) {
    element.classList.remove('unread');
    updateNotificationCount();
}

function markAllAsRead() {
    document.querySelectorAll('.notification-item').forEach(item => {
        item.classList.remove('unread');
    });
    updateNotificationCount();
}

function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.getElementById('notificationCount');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount === 0 ? 'none' : '';
    }
}

// Grade Calculator
function calculateGrade() {
    const val = id => parseFloat(document.getElementById(id)?.value) || 0;

    const term1 = val('term1'), weight1 = val('weight1');
    const term2 = val('term2'), weight2 = val('weight2');
    const term3 = val('term3'), weight3 = val('weight3');
    const exam  = val('exam'),  examWeight = val('examWeight');

    const finalGrade = (term1 * weight1 / 100) + (term2 * weight2 / 100) +
                       (term3 * weight3 / 100) + (exam  * examWeight / 100);

    const finalGradeEl = document.getElementById('finalGrade');
    if (finalGradeEl) finalGradeEl.textContent = finalGrade.toFixed(1) + '%';

    let letter = 'F';
    if      (finalGrade >= 80) letter = 'A';
    else if (finalGrade >= 70) letter = 'B';
    else if (finalGrade >= 60) letter = 'C';
    else if (finalGrade >= 50) letter = 'D';

    const letterGradeEl = document.getElementById('letterGrade');
    if (letterGradeEl) letterGradeEl.textContent = letter;

    // Scenarios
    const baseGrade = (term1 * weight1 / 100) + (term2 * weight2 / 100) + (term3 * weight3 / 100);
    const s1 = document.getElementById('scenario1');
    const s2 = document.getElementById('scenario2');
    const s3 = document.getElementById('scenario3');
    if (s1) s1.textContent = (baseGrade + (60  * examWeight / 100)).toFixed(1) + '%';
    if (s2) s2.textContent = (baseGrade + (80  * examWeight / 100)).toFixed(1) + '%';
    if (s3) s3.textContent = (baseGrade + (100 * examWeight / 100)).toFixed(1) + '%';

    // Score needed for A
    const neededForA   = examWeight > 0 ? ((80 - baseGrade) / (examWeight / 100)).toFixed(1) : 'N/A';
    const neededScoreEl = document.getElementById('neededScore');
    if (neededScoreEl) neededScoreEl.textContent = neededForA + (examWeight > 0 ? '%' : '');
}

// Study Planner
function addStudySession() {
    const subject  = document.getElementById('plannerSubject')?.value  || '';
    const topic    = document.getElementById('plannerTopic')?.value    || '';
    const date     = document.getElementById('plannerDate')?.value     || '';
    const duration = document.getElementById('plannerDuration')?.value || '1';

    if (!topic || !date) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const sessionsList = document.getElementById('studySessionsList');
    if (!sessionsList) return;

    const subjectIcons = {
        'Mathematics':      '📐',
        'Physical Science': '🧪',
        'Life Sciences':    '🔬',
        'English':          '📖',
        'IsiZulu':          '🗣️'
    };

    const newSession = document.createElement('div');
    newSession.style.cssText = 'background:var(--white);padding:1.5rem;border-radius:8px;margin-bottom:1rem;box-shadow:var(--shadow);display:flex;justify-content:space-between;align-items:center;';
    newSession.innerHTML = `
        <div>
            <h4 style="margin-bottom:.5rem;">${subjectIcons[subject] || '📚'} ${subject} – ${topic}</h4>
            <div style="color:var(--text-light);font-size:.9rem;">
                <i class="fas fa-calendar"></i> ${new Date(date).toLocaleDateString()} (${duration} hours)
            </div>
        </div>
        <button class="btn btn-secondary" onclick="this.parentElement.remove()">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    sessionsList.insertBefore(newSession, sessionsList.firstChild);

    // Reset fields
    const topicEl    = document.getElementById('plannerTopic');
    const dateEl     = document.getElementById('plannerDate');
    const durationEl = document.getElementById('plannerDuration');
    if (topicEl)    topicEl.value = '';
    if (dateEl)     dateEl.valueAsDate = new Date();
    if (durationEl) durationEl.value = '1';

    showNotification('Study session added successfully!', 'success');
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('darkMode');
        window.location.href = 'login.html';
    }
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initDashboardNavigation();
    initDarkMode();
    initNotifications();

    // Default planner date
    const plannerDate = document.getElementById('plannerDate');
    if (plannerDate) plannerDate.valueAsDate = new Date();

    // Init calculator if present
    if (document.getElementById('term1')) calculateGrade();

    console.log('Dashboard loaded successfully');
});
