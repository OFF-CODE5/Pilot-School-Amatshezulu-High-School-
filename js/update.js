const searchInput = document.getElementById('searchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const updateCards = document.querySelectorAll('.update-card');
        const updatesGrid = document.getElementById('updatesGrid');
        const emptyState = document.getElementById('emptyState');

        let currentFilter = 'all';

        // Filter functionality
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                filterUpdates();
            });
        });

        // Search functionality
        searchInput.addEventListener('input', filterUpdates);

        function filterUpdates() {
            const searchTerm = searchInput.value.toLowerCase();
            let visibleCount = 0;

            updateCards.forEach(card => {
                const category = card.dataset.category;
                const title = card.querySelector('h2').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();

                const matchesFilter = currentFilter === 'all' || category === currentFilter;
                const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);

                if (matchesFilter && matchesSearch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleCount === 0) {
                emptyState.classList.add('show');
                updatesGrid.style.display = 'none';
            } else {
                emptyState.classList.remove('show');
                updatesGrid.style.display = 'grid';
            }
        }

        // Read more links
        document.querySelectorAll('.read-more').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Full article view would open here');
            });
        });