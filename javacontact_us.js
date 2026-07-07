
// Micro-interaction for form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Sending...';

    setTimeout(() => {
        btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Inquiry Received';
        btn.classList.replace('bg-primary', 'bg-green-700');

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
            btn.classList.replace('bg-green-700', 'bg-primary');
            this.reset();
        }, 3000);
    }, 1500);
});
