 let selectedDate = null;
        let selectedTime = null;
        let currentDate = new Date();

        // Generate Calendar
        function generateCalendar() {
            const calendar = document.getElementById('calendar');
            const monthYear = document.getElementById('currentMonth');
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            
            // Clear previous days
            const dayElements = calendar.querySelectorAll('.calendar-day');
            dayElements.forEach(el => el.remove());
            
            // Add empty cells
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day disabled';
                calendar.appendChild(emptyDay);
            }
            
            // Add days
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                const dayDate = new Date(year, month, day);
                
                // Disable past dates and weekends
                if (dayDate < today || dayDate.getDay() === 0 || dayDate.getDay() === 6) {
                    dayElement.classList.add('disabled');
                } else {
                    dayElement.onclick = () => selectDate(dayElement, dayDate);
                }
                
                calendar.appendChild(dayElement);
            }
        }

        function selectDate(element, date) {
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected');
            });
            element.classList.add('selected');
            selectedDate = date.toLocaleDateString('en-US');
            document.getElementById('selectedDate').value = selectedDate;
        }

        function selectTime(element) {
            if (element.classList.contains('booked')) return;
            
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('selected');
            });
            element.classList.add('selected');
            selectedTime = element.textContent;
            document.getElementById('selectedTime').value = selectedTime;
        }

        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
        }

        function closeModal() {
            document.getElementById('successModal').classList.remove('show');
            location.reload();
        }

        // Form submission
        document.getElementById('appointmentForm').addEventListener('submit', (e) => {
            if (!selectedDate || !selectedTime) {
                e.preventDefault();
                alert('Please select both date and time for your appointment.');
                return;
            }
            
            // Show success modal (in production, this would happen after server confirmation)
            setTimeout(() => {
                document.getElementById('successModal').classList.add('show');
            }, 500);
        });

        // Initialize
        generateCalendar();