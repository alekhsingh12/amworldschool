
function initializeMobileMenu() {

    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !closeBtn || !mobileMenu) return;

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

    // const loginToggle = document.getElementById("loginToggle");
    // const loginMenu = document.getElementById("loginMenu");
    // const loginArrow = document.getElementById("loginArrow");

    // loginToggle.addEventListener("click", () => {
    //     loginMenu.classList.toggle("hidden");
    //     loginMenu.classList.toggle("flex");
    //     loginArrow.classList.toggle("rotate-180");
    // });

    // const moreToggle = document.getElementById("moreToggle");
    // const moreMenu = document.getElementById("moreMenu");
    // const moreArrow = document.getElementById("moreArrow");

    // moreToggle.addEventListener("click", () => {
    //     moreMenu.classList.toggle("hidden");
    //     moreMenu.classList.toggle("flex");
    //     moreArrow.classList.toggle("rotate-180");
    // });


    // About Us
    const aboutToggle = document.getElementById("aboutToggle");
    const aboutMenu = document.getElementById("aboutMenu");
    const aboutArrow = document.getElementById("aboutArrow");

    if (aboutToggle) {
        aboutToggle.addEventListener("click", () => {
            aboutMenu.classList.toggle("hidden");
            aboutMenu.classList.toggle("flex");
            aboutArrow.classList.toggle("rotate-180");
        });
    }

    // Admission
    const admissionToggle = document.getElementById("admissionToggle");
    const admissionMenu = document.getElementById("admissionMenu");
    const admissionArrow = document.getElementById("admissionArrow");

    if (admissionToggle) {
        admissionToggle.addEventListener("click", () => {
            admissionMenu.classList.toggle("hidden");
            admissionMenu.classList.toggle("flex");
            admissionArrow.classList.toggle("rotate-180");
        });
    }

    // Academic
    const academicToggle = document.getElementById("academicToggle");
    const academicMenu = document.getElementById("academicMenu");
    const academicArrow = document.getElementById("academicArrow");

    if (academicToggle) {
        academicToggle.addEventListener("click", () => {
            academicMenu.classList.toggle("hidden");
            academicMenu.classList.toggle("flex");
            academicArrow.classList.toggle("rotate-180");
        });
    }

    // Downloads
    const downloadsToggle = document.getElementById("downloadsToggle");
    const downloadsMenu = document.getElementById("downloadsMenu");
    const downloadsArrow = document.getElementById("downloadsArrow");

    if (downloadsToggle) {
        downloadsToggle.addEventListener("click", () => {
            downloadsMenu.classList.toggle("hidden");
            downloadsMenu.classList.toggle("flex");
            downloadsArrow.classList.toggle("rotate-180");
        });
    }

    // Facilities
    const facilitiesToggle = document.getElementById("facilitiesToggle");
    const facilitiesMenu = document.getElementById("facilitiesMenu");
    const facilitiesArrow = document.getElementById("facilitiesArrow");

    if (facilitiesToggle) {
        facilitiesToggle.addEventListener("click", () => {
            facilitiesMenu.classList.toggle("hidden");
            facilitiesMenu.classList.toggle("flex");
            facilitiesArrow.classList.toggle("rotate-180");
        });
    }

    if (loginToggle) {
        loginToggle.addEventListener("click", () => {
            loginMenu.classList.toggle("hidden");
            loginMenu.classList.toggle("flex");
            loginArrow.classList.toggle("rotate-180");
        });
    }

    if (moreToggle) {
        moreToggle.addEventListener("click", () => {
            moreMenu.classList.toggle("hidden");
            moreMenu.classList.toggle("flex");
            moreArrow.classList.toggle("rotate-180");
        });
    }


    // Active parent tab in mobile menu
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "about_us.html") {
        document.getElementById("aboutToggle")?.classList.add("active");
    }

    if (currentPage === "admission.html") {
        document.getElementById("admissionToggle")?.classList.add("active");
    }

    if (currentPage === "academic.html") {
        document.getElementById("academicToggle")?.classList.add("active");
    }

    if (currentPage === "facilities.html") {
        document.getElementById("facilitiesToggle")?.classList.add("active");
    }

    if (currentPage === "downloads.html") {
        document.getElementById("downloadsToggle")?.classList.add("active");
    }


    if (currentPage === "contact_us.html") {
        document.querySelector('#mobileMenu a[href="contact_us.html"]')?.classList.add("active");
    }

    if (
        currentPage === "gallery.html" ||
        currentPage === "news.html" ||
        currentPage === "events.html"
    ) {
        document.getElementById("moreToggle")?.classList.add("active");
    }

}
