// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

// Navigation switching
function switchSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const activeSection = document.getElementById(sectionName);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionName) {
            item.classList.add('active');
        }
    });

    // Update page title
    updatePageTitle(sectionName);
}

// Update page title based on section
function updatePageTitle(section) {
    const titles = {
        'overview': {
            title: 'Admin Dashboard',
            subtitle: "Welcome back! Here's what's happening"
        },
        'students': {
            title: 'Student Management',
            subtitle: 'Manage student records and information'
        },
        'educators': {
            title: 'Educator Management',
            subtitle: 'Manage teaching staff and assignments'
        },
        'results': {
            title: 'Upload Results',
            subtitle: 'Upload and manage student academic results'
        },
        'applications': {
            title: 'Student Applications',
            subtitle: 'Review and process new applications'
        },
        'letters': {
            title: 'Letter Requests',
            subtitle: 'Process student letter requests'
        },
        'updates': {
            title: 'Post Updates',
            subtitle: 'Share announcements with students and parents'
        },
        'resources': {
            title: 'Manage Resources',
            subtitle: 'Upload and organize learning materials'
        },
        'reports': {
            title: 'Generate Reports',
            subtitle: 'Create and download system reports'
        },
        'settings': {
            title: 'System Settings',
            subtitle: 'Configure system preferences'
        }
    };

    const titleInfo = titles[section] || titles['overview'];
    document.getElementById('pageTitle').textContent = titleInfo.title;
    document.getElementById('pageSubtitle').textContent = titleInfo.subtitle;
}

// Add click listeners to all nav items
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                switchSection(section);
            }
        });
    });

    // Profile image upload functionality
    const adminProfile = document.querySelector('.admin-profile');
    const profileImageInput = document.getElementById('profileImageInput');

    if (adminProfile && profileImageInput) {
        adminProfile.addEventListener('click', function(e) {
            // Only trigger if clicking the overlay or profile area
            if (e.target.closest('.admin-profile')) {
                profileImageInput.click();
            }
        });

        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const adminAvatar = document.querySelector('.admin-avatar');
                    if (adminAvatar) {
                        adminAvatar.src = event.target.result;
                        
                        // Save to localStorage for persistence
                        localStorage.setItem('adminProfileImage', event.target.result);
                        
                        // Show success message
                        showNotification('Profile image updated successfully!', 'success');
                    }
                };
                reader.readAsDataURL(file);
            } else {
                showNotification('Please select a valid image file', 'error');
            }
        });

        // Load saved profile image on page load
        const savedImage = localStorage.getItem('adminProfileImage');
        if (savedImage) {
            const adminAvatar = document.querySelector('.admin-avatar');
            if (adminAvatar) {
                adminAvatar.src = savedImage;
            }
        }
    }

    // File upload preview
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const uploadArea = document.querySelector('.upload-area');
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2);
                
                // Update upload area text
                uploadArea.innerHTML = `
                    <i class="fas fa-file-pdf" style="color: var(--danger-color);"></i>
                    <h3>${fileName}</h3>
                    <p>Size: ${fileSize} MB</p>
                    <p style="color: var(--success-color); margin-top: 0.5rem;">
                        <i class="fas fa-check-circle"></i> File selected
                    </p>
                `;
            }
        });
    }
});

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored data
        localStorage.removeItem('adminSession');
        
        // Redirect to login page
        window.location.href = 'login.php'; // Update with your actual login page
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
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
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
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

// Mobile sidebar toggle
if (window.innerWidth <= 768) {
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }
}

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Add your search logic here
        console.log('Searching for:', searchTerm);
    });
}