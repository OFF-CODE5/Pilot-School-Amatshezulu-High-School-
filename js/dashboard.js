/* ========================================
   DASHBOARD JAVASCRIPT
   ======================================== */

// Page Titles Configuration
const pageTitles = {
    overview: { title: 'Dashboard Overview', subtitle: "Welcome back! Here's your academic summary" },
    results: { title: 'My Results', subtitle: 'View your academic performance and reports' },
    resources: { title: 'Learning Resources', subtitle: 'Access study materials and past papers' },
    letters: { title: 'Request Letters', subtitle: 'Request official documents and letters' },
    profile: { title: 'My Profile', subtitle: 'Manage your personal information' },
    timetable: { title: 'My Timetable', subtitle: 'View your class schedule' },
    assignments: { title: 'Assignments', subtitle: 'Track your homework and tasks' },
    fees: { title: 'Fees & Payments', subtitle: 'View your fee statements' },
    calculator: { title: 'Grade Calculator', subtitle: 'Predict your final grades' },
    planner: { title: 'Study Planner', subtitle: 'Plan your study schedule' }
};

// Navigation System
function initDashboardNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.getAttribute('href')) return;
            e.preventDefault();
            
            const section = item.dataset.section;
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            contentSections.forEach(content => content.classList.remove('active'));
            const targetSection = document.getElementById(section);
            if (targetSection) targetSection.classList.add('active');
            
            if (pageTitles[section]) {
                pageTitle.textContent = pageTitles[section].title;
                pageSubtitle.textContent = pageTitles[section].subtitle;
            }

            if (window.innerWidth <= 1024) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
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
    const notificationBtn = document.getElementById('notificationBtn');
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
        if (unreadCount === 0) {
            badge.style.display = 'none';
        }
    }
}

// Grade Calculator
function calculateGrade() {
    const term1 = parseFloat(document.getElementById('term1')?.value) || 0;
    const weight1 = parseFloat(document.getElementById('weight1')?.value) || 0;
    const term2 = parseFloat(document.getElementById('term2')?.value) || 0;
    const weight2 = parseFloat(document.getElementById('weight2')?.value) || 0;
    const term3 = parseFloat(document.getElementById('term3')?.value) || 0;
    const weight3 = parseFloat(document.getElementById('weight3')?.value) || 0;
    const exam = parseFloat(document.getElementById('exam')?.value) || 0;
    const examWeight = parseFloat(document.getElementById('examWeight')?.value) || 0;

    const finalGrade = (term1 * weight1/100) + (term2 * weight2/100) + 
                       (term3 * weight3/100) + (exam * examWeight/100);
    
    const finalGradeEl = document.getElementById('finalGrade');
    if (finalGradeEl) finalGradeEl.textContent = finalGrade.toFixed(1) + '%';
    
    let letter = 'F';
    if (finalGrade >= 80) letter = 'A';
    else if (finalGrade >= 70) letter = 'B';
    else if (finalGrade >= 60) letter = 'C';
    else if (finalGrade >= 50) letter = 'D';
    
    const letterGradeEl = document.getElementById('letterGrade');
    if (letterGradeEl) letterGradeEl.textContent = letter;

    // Calculate scenarios
    const baseGrade = (term1 * weight1/100) + (term2 * weight2/100) + (term3 * weight3/100);
    const scenario1El = document.getElementById('scenario1');
    const scenario2El = document.getElementById('scenario2');
    const scenario3El = document.getElementById('scenario3');
    
    if (scenario1El) scenario1El.textContent = (baseGrade + (60 * examWeight/100)).toFixed(1) + '%';
    if (scenario2El) scenario2El.textContent = (baseGrade + (80 * examWeight/100)).toFixed(1) + '%';
    if (scenario3El) scenario3El.textContent = (baseGrade + (100 * examWeight/100)).toFixed(1) + '%';

    // Calculate needed score
    const neededForA = ((80 - baseGrade) / (examWeight/100)).toFixed(1);
    const neededScoreEl = document.getElementById('neededScore');
    if (neededScoreEl) neededScoreEl.textContent = neededForA + '%';
}

// Study Planner
function addStudySession() {
    const subject = document.getElementById('plannerSubject')?.value;
    const topic = document.getElementById('plannerTopic')?.value;
    const date = document.getElementById('plannerDate')?.value;
    const duration = document.getElementById('plannerDuration')?.value;

    if (!topic || !date) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const sessionsList = document.getElementById('studySessionsList');
    if (!sessionsList) return;

    const newSession = document.createElement('div');
    newSession.style.cssText = 'background: var(--white); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; box-shadow: var(--shadow); display: flex; justify-content: space-between; align-items: center;';
    
    const subjectIcons = {
        'Mathematics': '📐',
        'Physical Science': '🧪',
        'Life Sciences': '🔬',
        'English': '📖',
        'IsiZulu': '🗣️'
    };

    newSession.innerHTML = `
        <div>
            <h4 style="margin-bottom: 0.5rem;">${subjectIcons[subject] || '📚'} ${subject} - ${topic}</h4>
            <div style="color: var(--text-light); font-size: 0.9rem;">
                <i class="fas fa-calendar"></i> ${new Date(date).toLocaleDateString()} (${duration} hours)
            </div>
        </div>
        <button class="btn btn-secondary" onclick="this.parentElement.remove()">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;

    sessionsList.insertBefore(newSession, sessionsList.firstChild);

    // Clear form
    const topicInput = document.getElementById('plannerTopic');
    const dateInput = document.getElementById('plannerDate');
    const durationInput = document.getElementById('plannerDuration');
    
    if (topicInput) topicInput.value = '';
    if (dateInput) dateInput.valueAsDate = new Date();
    if (durationInput) durationInput.value = '1';

    showNotification('Study session added successfully!', 'success');
}

// Logout Function
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
    
    // Set today's date as default in planner
    const plannerDate = document.getElementById('plannerDate');
    if (plannerDate) plannerDate.valueAsDate = new Date();
    
    // Initialize calculator
    if (document.getElementById('term1')) {
        calculateGrade();
    }
    
    console.log('Dashboard loaded successfully');
});