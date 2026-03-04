/* ========================================
   SUBJECT DETAIL JAVASCRIPT
   ======================================== */

// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.tab);
        if (target) target.classList.add('active');
    });
});

// Download functionality
document.querySelectorAll('.download-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        if (typeof showNotification === 'function') {
            showNotification('Downloading resource...', 'info');
        } else {
            alert('Downloading resource...');
        }
    });
});

// Contact teacher — guard against missing element
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        if (typeof showNotification === 'function') {
            showNotification('Opening email to contact Mrs. Nkosi...', 'success');
        } else {
            alert('Opening email client to contact Mrs. Nkosi...');
        }
    });
}
