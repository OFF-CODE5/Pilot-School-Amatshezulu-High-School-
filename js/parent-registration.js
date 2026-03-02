// Step navigation
let currentStep = 1;

function nextStep(step) {
    // Validate current step
    if (!validateStep(step)) {
        return;
    }
    
    // Hide current step
    document.getElementById(`step${step}`).classList.remove('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('completed');
    
    // Show next step
    currentStep = step + 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
    // Hide current step
    document.getElementById(`step${step}`).classList.remove('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.remove('active');
    
    // Show previous step
    currentStep = step - 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('completed');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
    const stepElement = document.getElementById(`step${step}`);
    const inputs = stepElement.querySelectorAll('input[required], select[required]');
    
    for (let input of inputs) {
        if (!input.value) {
            showNotification(`Please fill in all required fields`, 'error');
            input.focus();
            return false;
        }
    }
    
    // Additional validations
    if (step === 1) {
        const idNumber = document.getElementById('idNumber').value;
        if (idNumber.length !== 13) {
            showNotification('ID number must be 13 digits', 'error');
            return false;
        }
        
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }
    }
    
    if (step === 2) {
        const childIdNumber = document.getElementById('childIdNumber').value;
        if (childIdNumber.length !== 13) {
            showNotification('Child\'s ID number must be 13 digits', 'error');
            return false;
        }
    }
    
    if (step === 3) {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            return false;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return false;
        }
        
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            showNotification('Please accept the Terms & Conditions', 'error');
            return false;
        }
    }
    
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateStep(3)) {
            return;
        }
        
        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            idNumber: document.getElementById('idNumber').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            childFirstName: document.getElementById('childFirstName').value,
            childLastName: document.getElementById('childLastName').value,
            childIdNumber: document.getElementById('childIdNumber').value,
            studentId: document.getElementById('studentId').value,
            grade: document.getElementById('grade').value,
            relationship: document.getElementById('relationship').value,
            password: document.getElementById('password').value,
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Here you would send the data to your backend
        console.log('Form Data:', formData);
        
        // Show success message
        showNotification('Registration successful! Redirecting to login...', 'success');
        
        // Redirect to parent login after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
});

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

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);