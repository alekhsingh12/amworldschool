async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();

    document.getElementById(id).innerHTML = html;

    // Re-run scripts inside the loaded HTML
    document.querySelectorAll(`#${id} script`).forEach(oldScript => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.textContent = oldScript.textContent;
        }

        document.body.appendChild(newScript);
        oldScript.remove();
    });
}

loadComponent("navbar", "navbar.html");
loadComponent("footer", "footer.html");





async function loadComponent(id, file) {

    const response = await fetch(file);
    document.getElementById(id).innerHTML = await response.text();

    if (id === "navbar") {
        initializeMobileMenu();
        activateCurrentPage();
    }

}

function activateCurrentPage() {

    let currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "") {
        currentPage = "index.html";
    }

    // Highlight the current page link
    document.querySelectorAll(".nav-link").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });

    // Highlight the More button if one of its pages is active
    if (["gallery.html", "news.html", "events.html"].includes(currentPage)) {
        document.getElementById("moreBtn")?.classList.add("active");
    }



    const pageNames = {
        "index.html": "Home",
        "about_us.html": "About Us",
        "academic.html": "Academic",
        "admission.html": "Admissions",
        "facilities.html": "Facilities",
        "gallery.html": "Gallery",
        "downloads.html": "Downloads",
        "news.html": "News",
        "events.html": "Events",
        "contact.html": "Contact",
        "login.html": "Login"
    };

    const mobileTitle = document.getElementById("mobilePageTitle");

    if (mobileTitle) {
        mobileTitle.textContent = pageNames[currentPage] || "AM World School";
    }

}