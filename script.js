// Tab Switching
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const btns = document.querySelectorAll('.pricing-tabs .btn');
    if (tabs.length === 0) return;

    tabs.forEach(tab => tab.classList.remove('active'));
    btns.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// FAQ Toggle
function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    if (!isActive) {
        element.classList.add('active');
    }
}

// Global Fade-in observer
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

// Tab Switching
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const btns = document.querySelectorAll('.pricing-tabs .btn');
    if (tabs.length === 0) return;

    tabs.forEach(tab => tab.classList.remove('active'));
    btns.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// FAQ Toggle
function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    if (!isActive) {
        element.classList.add('active');
    }
}

// Global Operations & State Check
document.addEventListener("DOMContentLoaded", () => {
    // Fade-in Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Handle Authentication Display Change
    const authContainer = document.getElementById('auth-buttons-container');
    if (authContainer) {
        const storedUser = localStorage.getItem('ryzenUser');
        if (storedUser) {
            authContainer.innerHTML = `
                <div class="user-profile-menu">
                    <span class="user-name">Welcome, ${storedUser}</span>
                    <button class="btn-logout" id="logout-btn">Log Out</button>
                </div>
            `;

            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('ryzenUser');
                window.location.reload();
            });
        }
    }
});