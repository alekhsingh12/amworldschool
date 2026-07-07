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