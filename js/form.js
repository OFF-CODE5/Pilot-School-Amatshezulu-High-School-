
        let currentStep = 1;
        const totalSteps = 5;

        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const submitBtn = document.getElementById('submitBtn');

        function showStep(step) {
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            document.querySelector(`[data-section="${step}"]`).classList.add('active');

            document.querySelectorAll('.step').forEach(stepEl => {
                stepEl.classList.remove('active', 'completed');
                const stepNum = parseInt(stepEl.dataset.step);
                if (stepNum === step) {
                    stepEl.classList.add('active');
                } else if (stepNum < step) {
                    stepEl.classList.add('completed');
                }
            });

            prevBtn.style.display = step === 1 ? 'none' : 'flex';
            nextBtn.style.display = step === totalSteps ? 'none' : 'flex';
            submitBtn.style.display = step === totalSteps ? 'flex' : 'none';

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function validateStep(step) {
            const section = document.querySelector(`[data-section="${step}"]`);
            const requiredFields = section.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--error)';
                } else {
                    field.style.borderColor = '#e5e7eb';
                }
            });

            return isValid;
        }

        nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            } else {
                alert('Please fill in all required fields before proceeding.');
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });

        document.getElementById('applicationForm').addEventListener('submit', (e) => {
            if (!validateStep(currentStep)) {
                e.preventDefault();
                alert('Please fill in all required fields before submitting.');
            }
        });

        document.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                if (field.value.trim()) {
                    field.style.borderColor = '#e5e7eb';
                }
            });
        });

        showStep(1);
   