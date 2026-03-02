// Tab functionality
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(tc => tc.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        // Download functionality
        document.querySelectorAll('.download-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                alert('Downloading resource...');
            });
        });

        // Contact teacher
        document.querySelector('.contact-btn').addEventListener('click', () => {
            alert('Opening email client to contact Mrs. Nkosi...');
        });