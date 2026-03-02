// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

// Navigation switching
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionName = this.getAttribute('data-section');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            const activeSection = document.getElementById(sectionName);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            // Update navigation active state
            navItems.forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');

            // Update page title
            updatePageTitle(sectionName);
        });
    });
});

// Update page title based on section
function updatePageTitle(section) {
    const titles = {
        'overview': {
            title: 'Parent Dashboard',
            subtitle: "Monitor your child's academic journey"
        },
        'progress': {
            title: 'Academic Progress',
            subtitle: "View detailed academic performance reports"
        },
        'attendance': {
            title: 'Attendance Records',
            subtitle: "Track your child's attendance history"
        },
        'messages': {
            title: 'Messages',
            subtitle: "Communicate with teachers and staff"
        },
        'reports': {
            title: 'Reports',
            subtitle: "Download academic reports and documents"
        },
        'fees': {
            title: 'Fee Statements',
            subtitle: "View and manage school fees"
        },
        'events': {
            title: 'Events Calendar',
            subtitle: "Stay updated on school events and activities"
        },
        'profile': {
            title: 'Family Profile',
            subtitle: "Manage your family information"
        }
    };

    const titleInfo = titles[section] || titles['overview'];
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    
    if (pageTitle) pageTitle.textContent = titleInfo.title;
    if (pageSubtitle) pageSubtitle.textContent = titleInfo.subtitle;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored data
        localStorage.removeItem('parentSession');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }
}

// Mobile sidebar toggle
if (window.innerWidth <= 768) {
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }
}

// Child selector change handler
const childSelect = document.getElementById('childSelect');
if (childSelect) {
    childSelect.addEventListener('change', function() {
        // Here you would load data for the selected child
        console.log('Selected child:', this.value);
        showNotification('Loaded data for ' + this.value, 'success');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);