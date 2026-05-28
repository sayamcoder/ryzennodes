class RyzenCaptcha {
    constructor(containerId, successCallback) {
        this.container = document.getElementById(containerId);
        this.callback = successCallback;
        if (this.container) this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="captcha-wrapper" style="
                display: flex; align-items: center; justify-content: space-between;
                border: 1px solid var(--border-light); padding: 12px 16px;
                border-radius: 12px; background: #fff; margin: 16px 0;
                font-family: inherit; font-size: 0.9rem;
            ">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="checkbox" id="captcha-checkbox" style="
                        width: 20px; height: 20px; border: 2px solid var(--border-light);
                        border-radius: 4px; cursor: pointer; accent-color: #2b34f2;
                    ">
                    <label for="captcha-checkbox" style="color: var(--text-gray); user-select: none; cursor: pointer;">
                        Verify you are human
                    </label>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; color: var(--text-gray); font-size: 0.75rem;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 8s linear infinite;">
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                    </svg>
                    <span>Secure Shield</span>
                </div>
            </div>
            <style>
                @keyframes spin { 100% { transform: rotate(360deg); } }
            </style>
        `;

        document.getElementById('captcha-checkbox').addEventListener('change', (e) => {
            if (e.target.checked) {
                e.target.disabled = true;
                e.target.parentElement.querySelector('label').innerText = 'Verification Success';
                e.target.parentElement.querySelector('label').style.color = 'var(--success)';
                if (this.callback) this.callback(true);
            }
        });
    }
}