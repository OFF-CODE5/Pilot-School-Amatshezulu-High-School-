 // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        const contentSections = document.querySelectorAll('.content-section');
        const pageTitle = document.getElementById('pageTitle');
        const pageSubtitle = document.getElementById('pageSubtitle');

        const pageTitles = {
            overview: { title: 'Dashboard Overview', subtitle: "Welcome back! Here's your academic summary" },
            results: { title: 'My Results', subtitle: 'View your academic performance and reports' },
            resources: { title: 'Learning Resources', subtitle: 'Access study materials and past papers' },
            letters: { title: 'Request Letters', subtitle: 'Request official documents and letters' },
            profile: { title: 'My Profile', subtitle: 'Manage your personal information' },
            timetable: { title: 'My Timetable', subtitle: 'View your class schedule' },
            assignments: { title: 'Assignments', subtitle: 'Track your homework and tasks' },
            fees: { title: 'Fees & Payments', subtitle: 'View your fee statements' }
        };

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (item.getAttribute('href')) return;
                e.preventDefault();
                
                const section = item.dataset.section;
                
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                contentSections.forEach(content => content.classList.remove('active'));
                document.getElementById(section).classList.add('active');
                
                if (pageTitles[section]) {
                    pageTitle.textContent = pageTitles[section].title;
                    pageSubtitle.textContent = pageTitles[section].subtitle;
                }

                if (window.innerWidth <= 1024) {
                    document.getElementById('sidebar').classList.remove('active');
                }
            });
        });

        // Sidebar toggle
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('active');
        }

        // Logout
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'login.html';
            }
        }

        // Download button handlers
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!btn.disabled) {
                    alert('Downloading report...');
                }
            });
        });

        // Change photo
        document.querySelector('.change-photo-btn').addEventListener('click', () => {
            const input = document.querySelector('.change-photo-btn input');
            input.click();
        });

        document.querySelector('.change-photo-btn input').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.querySelector('.profile-avatar').src = e.target.result;
                    document.querySelector('.user-avatar').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });