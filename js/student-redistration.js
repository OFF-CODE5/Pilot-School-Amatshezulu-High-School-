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
    
    // Step-specific validations
    if (step === 1) {
        const idNumber = document.getElementById('idNumber').value;
        if (idNumber.length !== 13 || !/^\d+$/.test(idNumber)) {
            showNotification('ID number must be 13 digits', 'error');
            return false;
        }
        
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        if (!dateOfBirth) {
            showNotification('Please select date of birth', 'error');
            return false;
        }
    }
    
    if (step === 2) {
        const parentIdNumber = document.getElementById('parentIdNumber').value;
        if (parentIdNumber.length !== 13 || !/^\d+$/.test(parentIdNumber)) {
            showNotification('Parent ID number must be 13 digits', 'error');
            return false;
        }
        
        const email = document.getElementById('parentEmail').value;
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        const phone = document.getElementById('parentPhone').value;
        if (!/^0\d{9}$/.test(phone)) {
            showNotification('Please enter a valid 10-digit phone number', 'error');
            return false;
        }
    }
    
    if (step === 4) {
        const email = document.getElementById('studentEmail').value;
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            return false;
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            showNotification('Password must contain uppercase, lowercase, and numbers', 'error');
            return false;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return false;
        }
        
        const terms = document.getElementById('terms');
        const consent = document.getElementById('consent');
        
        if (!terms.checked) {
            showNotification('Please accept the Terms & Conditions', 'error');
            return false;
        }
        
        if (!consent.checked) {
            showNotification('Parent/Guardian consent is required', 'error');
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
        
        if (!validateStep(4)) {
            return;
        }
        
        // Collect form data
        const formData = {
            // Personal Information
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            idNumber: document.getElementById('idNumber').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            gender: document.getElementById('gender').value,
            homeLanguage: document.getElementById('homeLanguage').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            
            // Parent/Guardian Information
            parentFirstName: document.getElementById('parentFirstName').value,
            parentLastName: document.getElementById('parentLastName').value,
            relationship: document.getElementById('relationship').value,
            parentIdNumber: document.getElementById('parentIdNumber').value,
            parentPhone: document.getElementById('parentPhone').value,
            parentEmail: document.getElementById('parentEmail').value,
            alternativePhone: document.getElementById('alternativePhone').value,
            
            // Academic Information
            gradeApplying: document.getElementById('gradeApplying').value,
            academicYear: document.getElementById('academicYear').value,
            previousSchool: document.getElementById('previousSchool').value,
            lastGrade: document.getElementById('lastGrade').value,
            stream: document.getElementById('stream').value,
            specialNeeds: document.getElementById('specialNeeds').checked,
            specialNeedsText: document.getElementById('specialNeedsText').value,
            
            // Account Setup
            studentEmail: document.getElementById('studentEmail').value,
            password: document.getElementById('password').value
        };
        
        // Here you would send the data to your backend
        console.log('Application Data:', formData);
        
        // Show success message
        showSuccessModal();
    });
    
    // Special needs checkbox handler
    const specialNeedsCheckbox = document.getElementById('specialNeeds');
    const specialNeedsDetails = document.getElementById('specialNeedsDetails');
    
    specialNeedsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            specialNeedsDetails.style.display = 'block';
        } else {
            specialNeedsDetails.style.display = 'none';
            document.getElementById('specialNeedsText').value = '';
        }
    });
    
    // Profile photo preview
    const profilePhoto = document.getElementById('profilePhoto');
    const photoPreview = document.getElementById('photoPreview');
    
    profilePhoto.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                showNotification('File size must be less than 2MB', 'error');
                this.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                photoPreview.src = event.target.result;
                photoPreview.style.display = 'block';
                document.querySelector('.upload-placeholder').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
});

function showSuccessModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            border-radius: 16px;
            text-align: center;
            max-width: 500px;
            animation: slideUp 0.4s ease;
        ">
            <div style="
                width: 80px;
                height: 80px;
                background: rgba(34, 197, 94, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
            ">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #22c55e;"></i>
            </div>
            <h2 style="margin-bottom: 1rem; color: #0f172a;">Application Submitted Successfully!</h2>
            <p style="color: #64748b; line-height: 1.6; margin-bottom: 2rem;">
                Thank you for applying to AmatsheZulu High School. We have received your application 
                and will review it shortly. You will receive a confirmation email with your application 
                reference number.
            </p>
            <button onclick="window.location.href='login.html'" style="
                background: #2563eb;
                color: white;
                border: none;
                padding: 0.875rem 2rem;
                border-radius: 8px;
                font-weight: 500;
                cursor: pointer;
                font-size: 0.95rem;
            ">
                <i class="fas fa-sign-in-alt"></i> Go to Login
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

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
        max-width: 400px;
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
    }, 4000);
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
    @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);