document.addEventListener("DOMContentLoaded", () => {
    // Password visibility toggle action
    const toggleEye = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (toggleEye && passwordInput) {
        toggleEye.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            
            // Switch SVG vectors dynamically based on current visibility state
            toggleEye.innerHTML = isPassword ? `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
            ` : `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
            `;
        });
    }

    // Initialize custom interactive captcha widget
    let captchaSolved = false;
    const captchaContainer = document.getElementById('captcha-injection-box');
    
    if (captchaContainer && typeof RyzenCaptcha !== 'undefined') {
        new RyzenCaptcha('captcha-injection-box', (isVerified) => {
            captchaSolved = isVerified;
        });
    }

    // Form submission processing pipeline
    const authForm = document.getElementById('auth-action-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Execute bot checking modules
            if (window.botChecker && !window.botChecker.verify()) {
                alert("Suspicious automated client behavior detected. Session terminated.");
                return;
            }

            // Execute explicit captcha solving verification
            if (captchaContainer && !captchaSolved) {
                alert("Please check the verification box to prove you are a human user.");
                return;
            }

            // Extract display credentials safely
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            let displayName = "User";

            if (nameInput && nameInput.value.trim() !== "") {
                displayName = nameInput.value.trim();
            } else if (emailInput && emailInput.value.trim() !== "") {
                // Parse cleanly formatted default placeholder username from email handle
                const parsedUser = emailInput.value.split('@')[0];
                displayName = parsedUser.charAt(0).toUpperCase() + parsedUser.slice(1);
            }

            // Persist the user session in the local browser state
            localStorage.setItem('ryzenUser', displayName);

            alert("Authorization success. Loading your system preferences...");
            window.location.href = "../../index.html"; // Route configuration back to Root Homepage
        });
    }
});