// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const formContents = document.querySelectorAll('.form-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            formContents.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding form
            const targetForm = document.getElementById(targetTab + 'Form');
            if (targetForm) {
                targetForm.classList.add('active');
            }
            
            // Update sidebar content based on selected tab
            updateSidebarContent(targetTab);
        });
    });

    // Enable admin tab with Ctrl + Shift + A
    document.addEventListener('keydown', function(e) {
        // Check if Ctrl + Shift + A is pressed
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault(); // Prevent default browser behavior
            
            const adminTab = document.getElementById('adminTab');
            if (adminTab.style.display === 'none' || adminTab.style.display === '') {
                adminTab.style.display = 'block';
                showNotification('Admin login enabled', 'info');
            } else {
                adminTab.style.display = 'none';
                showNotification('Admin login hidden', 'info');
            }
        }
    });
});

// Update sidebar content based on login type
function updateSidebarContent(tabType) {
    const sidebarTitle = document.getElementById('sidebarTitle');
    const sidebarText = document.getElementById('sidebarText');
    const portalTitle = document.getElementById('portalTitle');
    const features = document.querySelector('.features');
    
    if (tabType === 'student') {
        sidebarTitle.textContent = 'Welcome Back!';
        sidebarText.textContent = 'Access your student portal to view grades, assignments, and school updates.';
        portalTitle.textContent = 'Student Portal';
        features.innerHTML = `
            <li><i class="fas fa-check-circle"></i><span>View Your Results</span></li>
            <li><i class="fas fa-check-circle"></i><span>Access Resources</span></li>
            <li><i class="fas fa-check-circle"></i><span>Stay Updated</span></li>
            <li><i class="fas fa-check-circle"></i><span>Manage Profile</span></li>
        `;
    } else if (tabType === 'parent') {
        sidebarTitle.textContent = 'Parent Portal';
        sidebarText.textContent = 'Monitor your child\'s academic progress and stay connected with the school.';
        portalTitle.textContent = 'Parent Portal';
        features.innerHTML = `
            <li><i class="fas fa-check-circle"></i><span>Monitor Academic Progress</span></li>
            <li><i class="fas fa-check-circle"></i><span>Track Attendance</span></li>
            <li><i class="fas fa-check-circle"></i><span>Communicate with Teachers</span></li>
            <li><i class="fas fa-check-circle"></i><span>Access Reports</span></li>
        `;
    } else if (tabType === 'admin') {
        sidebarTitle.textContent = 'Admin Access';
        sidebarText.textContent = 'Manage the school system, students, and academic records.';
        portalTitle.textContent = 'Admin Portal';
        features.innerHTML = `
            <li><i class="fas fa-check-circle"></i><span>Manage Students</span></li>
            <li><i class="fas fa-check-circle"></i><span>Upload Results</span></li>
            <li><i class="fas fa-check-circle"></i><span>Post Updates</span></li>
            <li><i class="fas fa-check-circle"></i><span>System Reports</span></li>
        `;
    }
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

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}