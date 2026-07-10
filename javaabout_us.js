const menuBtn = document.getElementById("menuBtn");

const closeBtn = document.getElementById("closeMenu");

const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.remove("translate-y-[-100%]", "opacity-0");

    mobileMenu.classList.add("translate-y-0", "opacity-100");

    document.body.style.overflow = "hidden";

});

closeBtn.addEventListener("click", () => {

    mobileMenu.classList.add("translate-y-[-100%]", "opacity-0");

    mobileMenu.classList.remove("translate-y-0", "opacity-100");

    document.body.style.overflow = "";

});

document.querySelectorAll("#mobileMenu a.mobile-link").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.add("translate-y-[-100%]", "opacity-0");
        mobileMenu.classList.remove("translate-y-0", "opacity-100");
        document.body.style.overflow = "";

    });

});


const loginToggle = document.getElementById("loginToggle");
const loginMenu = document.getElementById("loginMenu");
const loginArrow = document.getElementById("loginArrow");

loginToggle.addEventListener("click", () => {

    loginMenu.classList.toggle("hidden");

    loginMenu.classList.toggle("flex");

    loginArrow.classList.toggle("rotate-180");

});


const moreToggle = document.getElementById("moreToggle");
const moreMenu = document.getElementById("moreMenu");
const moreArrow = document.getElementById("moreArrow");

moreToggle.addEventListener("click", () => {
    moreMenu.classList.toggle("hidden");
    moreMenu.classList.toggle("flex");
    moreArrow.classList.toggle("rotate-180");
});










// Simple intersection observer for subtle fade-in effects
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
    });
}, observerOptions);

// Apply to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-4');
    observer.observe(section);
});

// Scroll to director message when click on read full message in index.html
window.addEventListener("load", function () {
    if (window.location.hash === "#director_message") {
        const target = document.getElementById("director_message");

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

// Scroll to principal message when click on read full message in index.html
window.addEventListener("load", function () {
    if (window.location.hash === "#principal_message") {
        const target = document.getElementById("principal_message");

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