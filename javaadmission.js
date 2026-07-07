// Simple micro-interaction for form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Processing...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<span class="material-symbols-outlined">check</span> Inquiry Sent!';
        btn.style.backgroundColor = '#16a34a'; // Success green
        e.target.reset();
    }, 1500);
});
// Scroll to apply online when click on apply online button in index.html
window.addEventListener("load", function () {
    if (window.location.hash === "#apply") {
        const target = document.getElementById("apply");

        if (target) {
            const offset = -120; // Negative = scroll up, Positive = scroll down

            const top = target.getBoundingClientRect().top + window.pageYOffset + offset;

            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
    }
});
