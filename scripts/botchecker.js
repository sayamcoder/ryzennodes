class RyzenBotChecker {
    constructor() {
        this.score = 100;
        this.typingTimes = [];
        this.initListeners();
    }

    initListeners() {
        // Honeypot check
        const honeypot = document.getElementById('auth_user_middle_name');
        if (honeypot) {
            honeypot.addEventListener('change', () => {
                this.score = 0; // Filled hidden field
                console.warn("Security Alert: Honeypot field filled.");
            });
        }

        // Action speed check
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keydown', () => {
                this.typingTimes.push(Date.now());
            });
        });
    }

    verify() {
        if (this.score < 20) return false;
        
        // Check for inhuman keystroke intervals
        if (this.typingTimes.length > 3) {
            let directKeystrokeIntervals = [];
            for (let i = 1; i < this.typingTimes.length; i++) {
                directKeystrokeIntervals.push(this.typingTimes[i] - this.typingTimes[i - 1]);
            }
            const instantTyping = directKeystrokeIntervals.every(interval => interval < 5);
            if (instantTyping) {
                this.score -= 60; // Flag script copy-pastes
            }
        }
        return this.score >= 40;
    }
}

window.botChecker = new RyzenBotChecker();