 // Global Variables
    let currentProgress = 0;
    let counter = 0;
    let counterStreak = 0;
    let counterHigh = 0;
    let lastCounterAction = '';
    let colorGameSequence = [];
    let playerSequence = [];
    let gameStep = 0;
    let gameActive = false;

    // Dark Mode Toggle
    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      const toggle = document.querySelector('.theme-toggle');
      if (document.body.classList.contains('dark-mode')) {
        toggle.textContent = '☀️';
        toggle.title = 'Switch to Light Mode';
      } else {
        toggle.textContent = '🌙';
        toggle.title = 'Switch to Dark Mode';
      }
    }

    // Event Handling Functions
    function handleSingleClick(button) {
      const feedback = document.getElementById('click-feedback');
      feedback.style.display = 'block';
      feedback.innerHTML = '<strong>Single Click Detected!</strong><br>You clicked the button once.';
      button.classList.add('bounce');
      setTimeout(() => button.classList.remove('bounce'), 500);
    }

    function handleDoubleClick(button) {
      const feedback = document.getElementById('click-feedback');
      feedback.style.display = 'block';
      feedback.innerHTML = '<strong>Double Click Detected!</strong><br>You double-clicked the button quickly!';
      button.classList.add('shake');
      setTimeout(() => button.classList.remove('shake'), 500);
    }

    function handleKeyDown(event) {
      const feedback = document.getElementById('key-feedback');
      feedback.innerHTML = `Key Down: "${event.key}" (Code: ${event.keyCode})<br>Shift: ${event.shiftKey}, Ctrl: ${event.ctrlKey}, Alt: ${event.altKey}`;
    }

    function handleKeyUp(event) {
      const feedback = document.getElementById('key-feedback');
      feedback.innerHTML += `<br>Key Up: "${event.key}" released`;
    }

    function handleMouseEnter(element) {
      element.style.transform = 'scale(1.05)';
      element.innerHTML = 'Mouse is over me! 🎯';
    }

    function handleMouseLeave(element) {
      element.style.transform = 'scale(1)';
      element.innerHTML = 'Hover over me!';
      document.getElementById('mouse-coordinates').innerHTML = '';
    }

    function handleMouseMove(event, element) {
      const rect = element.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);
      document.getElementById('mouse-coordinates').innerHTML = `Mouse position: (${x}, ${y})`;
    }

    function handleSelectChange(select) {
      const feedback = document.getElementById('form-feedback');
      const value = select.value;
      if (value) {
        feedback.innerHTML = `<strong>Great choice!</strong> You selected: <em>${value.toUpperCase()}</em>`;
      } else {
        feedback.innerHTML = 'Please select your favorite technology.';
      }
    }

    function handleRangeInput(range) {
      const feedback = document.getElementById('form-feedback');
      const value = range.value;
      feedback.innerHTML = `<strong>Slider Value:</strong> ${value}%<br><div style="width: ${value}%; height: 10px; background: #3b82f6; border-radius: 5px; margin-top: 0.5rem;"></div>`;
    }

    // Interactive Elements Functions
    function incrementCounter(amount) {
      counter += amount;
      updateCounterDisplay();
      
      if (lastCounterAction === 'increment') {
        counterStreak++;
      } else {
        counterStreak = 1;
        lastCounterAction = 'increment';
      }
      
      if (counter > counterHigh) {
        counterHigh = counter;
      }
      
      updateCounterStats();
      document.getElementById('counter-display').classList.add('bounce');
      setTimeout(() => document.getElementById('counter-display').classList.remove('bounce'), 500);
    }

    function decrementCounter(amount) {
      counter -= amount;
      updateCounterDisplay();
      
      if (lastCounterAction === 'decrement') {
        counterStreak++;
      } else {
        counterStreak = 1;
        lastCounterAction = 'decrement';
      }
      
      updateCounterStats();
      document.getElementById('counter-display').classList.add('shake');
      setTimeout(() => document.getElementById('counter-display').classList.remove('shake'), 500);
    }

    function resetCounter() {
      counter = 0;
      counterStreak = 0;
      lastCounterAction = '';
      updateCounterDisplay();
      updateCounterStats();
    }

    function updateCounterDisplay() {
      document.getElementById('counter-display').textContent = counter;
    }

    function updateCounterStats() {
      document.getElementById('counter-streak').textContent = counterStreak;
      document.getElementById('counter-high').textContent = counterHigh;
    }

    // FAQ Functions
    function toggleFAQ(index) {
      const faqItems = document.querySelectorAll('.faq-item');
      const answer = faqItems[index].querySelector('.faq-answer');
      const icon = faqItems[index].querySelector('.faq-icon');
      
      if (answer.classList.contains('open')) {
        answer.classList.remove('open');
        icon.classList.remove('rotated');
      } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotated'));
        
        // Open clicked FAQ
        answer.classList.add('open');
        icon.classList.add('rotated');
      }
    }

    // Tab Functions
    function switchTab(tabIndex) {
      // Remove active class from all tabs and content
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      // Add active class to selected tab and content
      document.querySelectorAll('.tab')[tabIndex].classList.add('active');
      document.getElementById(`tab-${tabIndex}`).classList.add('active');
    }

    // Progress Functions
    function updateProgress(amount, absolute = false) {
      if (absolute) {
        currentProgress = amount;
      } else {
        currentProgress += amount;
      }
      
      currentProgress = Math.max(0, Math.min(100, currentProgress));
      
      const progressBar = document.getElementById('progress-bar');
      progressBar.style.width = `${currentProgress}%`;
      progressBar.textContent = `${currentProgress}%`;
      
      if (currentProgress === 100) {
        progressBar.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        setTimeout(() => {
          progressBar.style.background = 'linear-gradient(45deg, #3b82f6, #10b981)';
        }, 1000);
      }
    }

    // Dropdown Functions
    function toggleDropdown() {
      const dropdown = document.getElementById('dropdown-menu');
      dropdown.classList.toggle('show');
    }

    function handleDropdownAction(action) {
      const feedback = document.getElementById('dropdown-feedback');
      const actionMap = {
        'save': 'Project saved successfully! 💾',
        'export': 'Data exported to downloads folder 📤',
        'import': 'File import dialog opened 📥',
        'settings': 'Settings panel opened ⚙️'
      };
      
      feedback.style.display = 'block';
      feedback.innerHTML = `<strong>${actionMap[action]}</strong>`;
      
      // Close dropdown
      document.getElementById('dropdown-menu').classList.remove('show');
      
      // Hide feedback after 3 seconds
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 3000);
    }

    // Color Game Functions
    function startColorGame() {
      colorGameSequence = [];
      playerSequence = [];
      gameStep = 0;
      gameActive = true;
      
      document.getElementById('color-game-status').textContent = 'Watch the sequence...';
      
      // Add first color to sequence
      addColorToSequence();
      playSequence();
    }

    function addColorToSequence() {
      const colors = ['red', 'blue', 'green', 'yellow'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      colorGameSequence.push(randomColor);
    }

    function playSequence() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < colorGameSequence.length) {
          flashColor(colorGameSequence[i]);
          i++;
        } else {
          clearInterval(interval);
          document.getElementById('color-game-status').textContent = 'Now repeat the sequence!';
        }
      }, 600);
    }

    function flashColor(color) {
      const button = document.querySelector(`[data-color="${color}"]`);
      button.style.opacity = '0.5';
      button.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
      }, 300);
    }

    function colorGameClick(color) {
      if (!gameActive) return;
      
      flashColor(color);
      playerSequence.push(color);
      
      // Check if current input is correct
      if (playerSequence[playerSequence.length - 1] !== colorGameSequence[playerSequence.length - 1]) {
        // Wrong color
        document.getElementById('color-game-status').textContent = 'Wrong! Game Over. Try again!';
        gameActive = false;
        return;
      }
      
      // Check if sequence is complete
      if (playerSequence.length === colorGameSequence.length) {
        // Level complete
        document.getElementById('color-game-status').textContent = `Level ${colorGameSequence.length} complete! Next level...`;
        playerSequence = [];
        
        setTimeout(() => {
          addColorToSequence();
          playSequence();
        }, 1000);
      }
    }

    // Form Validation Functions
    function validateField(fieldName) {
      const field = document.getElementById(fieldName);
      const value = field.value.trim();
      const errorElement = document.getElementById(`${fieldName}-error`);
      const successElement = document.getElementById(`${fieldName}-success`);
      
      let isValid = false;
      let errorMessage = '';
      let successMessage = '';
      
      switch (fieldName) {
        case 'fullname':
          if (value.length < 2) {
            errorMessage = 'Full name must be at least 2 characters long';
          } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            errorMessage = 'Full name can only contain letters and spaces';
          } else {
            isValid = true;
            successMessage = 'Valid name';
          }
          break;
          
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
          } else {
            isValid = true;
            successMessage = 'Valid email address';
          }
          break;
          
        case 'phone':
          if (value === '') {
            isValid = true; // Phone is optional
          } else {
            const phoneRegex = /^(\+254|0)?[7][0-9]{8}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
              errorMessage = 'Please enter a valid Kenyan phone number';
            } else {
              isValid = true;
              successMessage = 'Valid phone number';
            }
          }
          break;
          
        case 'password':
          if (value.length < 8) {
            errorMessage = 'Password must be at least 8 characters long';
          } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
            errorMessage = 'Password must contain uppercase, lowercase, number, and special character';
          } else {
            isValid = true;
            successMessage = 'Strong password';
          }
          // Re-validate confirm password if it has a value
          const confirmField = document.getElementById('confirm-password');
          if (confirmField.value) {
            setTimeout(() => validateField('confirm-password'), 100);
          }
          break;
          
        case 'confirm-password':
          const password = document.getElementById('password').value;
          if (value !== password) {
            errorMessage = 'Passwords do not match';
          } else if (value === '') {
            errorMessage = 'Please confirm your password';
          } else {
            isValid = true;
            successMessage = 'Passwords match';
          }
          break;
          
        case 'age':
          if (value === '') {
            isValid = true; // Age is optional
          } else {
            const age = parseInt(value);
            if (age < 13) {
              errorMessage = 'You must be at least 13 years old';
            } else if (age > 120) {
              errorMessage = 'Please enter a valid age';
            } else {
              isValid = true;
              successMessage = 'Valid age';
            }
          }
          break;
      }
      
      // Update field appearance and messages
      if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.style.display = 'none';
        if (successMessage) {
          successElement.textContent = successMessage;
          successElement.style.display = 'block';
        }
      } else {
        field.classList.remove('success');
        field.classList.add('error');
        successElement.style.display = 'none';
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
      }
      
      return isValid;
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      
      // Validate all required fields
      const requiredFields = ['fullname', 'email', 'password', 'confirm-password'];
      const optionalFields = ['phone', 'age'];
      
      let allValid = true;
      
      // Check required fields
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          allValid = false;
        }
      });
      
      // Check optional fields only if they have values
      optionalFields.forEach(field => {
        const fieldElement = document.getElementById(field);
        if (fieldElement.value.trim() !== '') {
          if (!validateField(field)) {
            allValid = false;
          }
        }
      });
      
      if (allValid) {
        // Hide form and show success message
        document.getElementById('registration-form').style.display = 'none';
        document.getElementById('form-success-message').style.display = 'block';
        
        // Scroll to success message
        document.getElementById('form-success-message').scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      const dropdown = document.querySelector('.dropdown');
      if (!dropdown.contains(event.target)) {
        document.getElementById('dropdown-menu').classList.remove('show');
      }
    });

    // Initialize progress bar
    updateProgress(0, true);
