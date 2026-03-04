/* ========================================
   EDUCATORS PAGE JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks   = document.getElementById('navLinks');

    // Guard: only wire up if both elements exist
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger → X
            menuToggle.classList.toggle('open');
        });

        // Close menu when any nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }
});
