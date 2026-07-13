// =========================
// CONFIG
// =========================

const API_URL = "https://script.google.com/macros/s/AKfycbzXCnkmq7xRj1_Wf3GXboZiF9O1qKIVgBD-YYMkUmSlygnExXrxG49OyKCqETv6rF7K/exec";

// =========================
// GLOBAL VARIABLES
// =========================

let allDocuments = [];
let filteredDocuments = [];

let currentSearch = "";
let currentSort = "latest";

let selectedCategories = [];
let selectedSessions = [];


// =========================
// DOM
// =========================

const downloadsGrid = document.getElementById("downloadsGrid");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

const searchInput =
    document.querySelector('input[placeholder*="Search"]');

const sortBtn =
    document.getElementById("sortLatestBtn");

const filterBtn =
    document.getElementById("filterBtn");

const filterBox =
    document.getElementById("filterBox");


// =========================
// LOAD DOCUMENTS
// =========================

async function loadDocuments() {

    try {

        const response = await fetch(API_URL);

        allDocuments = await response.json();

        filteredDocuments = [...allDocuments];

        document.getElementById("loadingCards").remove();



        // Navbar category support
        const params = new URLSearchParams(window.location.search);
        const navbarCategory = params.get("category");

        if (navbarCategory) {

            const checkbox = document.querySelector(
                `.category[value="${navbarCategory}"]`
            );

            if (checkbox) {
                checkbox.checked = true;
                selectedCategories = [navbarCategory];
                updateFilterButton();
            }
        }



        applyFilters();



        console.log(allDocuments);

    }

    catch (err) {

        console.error(err);

        downloadsGrid.innerHTML = `
        <div class="col-span-full text-center py-20">

            <span class="material-symbols-outlined text-6xl text-red-500">
                error
            </span>

            <h3 class="text-2xl font-bold mt-6">
                Unable to load documents
            </h3>

            <p class="text-gray-500 mt-2">
                Please check your internet connection and try again.
            </p>

        </div>
    `;

    }

}

loadDocuments();




function createCard(doc) {

    const uploadDate = new Date(doc.Date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    return `

    <div class="group bg-surface rounded-xl border border-outline-variant p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"

        data-category="${doc.Category}"
        data-session="${doc.Session || ""}"
        data-date="${doc.Date}">

        <div class="flex items-start gap-4">

            <!-- PDF Icon -->
            <div class="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">

                <span class="material-symbols-outlined text-red-600 text-3xl">
                    description
                </span>

            </div>

            <!-- Content -->
            <div class="flex-1">

                <h3 class="font-heading-lg text-on-surface font-bold mb-2">
                    ${doc.Title}
                </h3>

                <p class="font-body-md text-on-surface-variant mb-4">
                    ${doc.Description}
                </p>

                <div class="flex items-center gap-2 text-on-surface-variant mb-5">

                    <span class="material-symbols-outlined text-base">
                        calendar_today
                    </span>

                    <span class="font-label-md">
                        ${uploadDate}
                    </span>

                </div>

                <a
                    href="${doc["Download Link"]}"
                    target="_blank"
                    class="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-primary text-on-primary hover:bg-rose-700 transition">

                    <span class="material-symbols-outlined">
                        download
                    </span>

                    Download

                </a>

            </div>

        </div>

    </div>

    `;
}


function renderCards(data) {

    downloadsGrid.innerHTML = "";

    data.forEach(doc => {

        downloadsGrid.innerHTML += createCard(doc);

    });

}

function applyFilters() {

    filteredDocuments = allDocuments.filter(doc => {

        // Search
        const matchesSearch =
            currentSearch === "" ||
            doc.Title.toLowerCase().includes(currentSearch) ||
            doc.Description.toLowerCase().includes(currentSearch);

        // Category
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(doc.Category);

        // Session
        const matchesSession =
            selectedSessions.length === 0 ||
            selectedSessions.includes(doc.Session);

        return matchesSearch &&
            matchesCategory &&
            matchesSession;

    });

    // Sorting
    switch (currentSort) {

        case "latest":

            filteredDocuments.sort((a, b) =>
                new Date(b.Date) - new Date(a.Date));

            break;

        case "oldest":

            filteredDocuments.sort((a, b) =>
                new Date(a.Date) - new Date(b.Date));

            break;

        case "az":

            filteredDocuments.sort((a, b) =>
                a.Title.localeCompare(b.Title));

            break;

        case "za":

            filteredDocuments.sort((a, b) =>
                b.Title.localeCompare(a.Title));

            break;

    }

    renderCards(filteredDocuments);

    resultCount.textContent =
        `Showing ${filteredDocuments.length} of ${allDocuments.length} documents`;

    noResults.classList.toggle(
        "hidden",
        filteredDocuments.length !== 0
    );

}


searchInput.addEventListener("input", (e) => {

    currentSearch =
        e.target.value.trim().toLowerCase();

    applyFilters();

});

sortBtn.addEventListener("click", () => {

    const order = ["latest", "oldest", "az", "za"];

    const labels = {
        latest: "Latest First",
        oldest: "Oldest First",
        az: "A - Z",
        za: "Z - A"
    };

    let index = order.indexOf(currentSort);
    index = (index + 1) % order.length;

    currentSort = order[index];

    // Change button text
    sortBtn.textContent = labels[currentSort];

    // Active styling
    sortBtn.classList.add(
        "bg-primary",
        "text-on-primary",
        "border-primary",
        "hover:bg-rose-500"
    );

    applyFilters();

});



// =========================
// FILTER POPUP
// =========================

const closeFilter = document.getElementById("closeFilter");
const applyFilterBtn = document.getElementById("applyFilter");
const clearFilterBtn = document.getElementById("clearFilter");

// Open popup
filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterBox.classList.remove("hidden");
});

// Close popup
closeFilter.addEventListener("click", () => {
    filterBox.classList.add("hidden");
});

// Close when clicking outside
filterBox.addEventListener("click", (e) => {
    if (e.target === filterBox) {
        filterBox.classList.add("hidden");
    }
});

// Highlight Filter button when active
function updateFilterButton() {

    const active =
        selectedCategories.length > 0 ||
        selectedSessions.length > 0;

    if (active) {

        filterBtn.classList.remove(
            "bg-surface-muted",
            "border-outline-variant"
        );

        filterBtn.classList.add(
            "bg-primary",
            "text-on-primary",
            "border-primary",
            "hover:bg-rose-500"
        );

    } else {

        filterBtn.classList.remove(
            "bg-primary",
            "text-on-primary",
            "border-primary",
            "hover:bg-rose-500"
        );

        filterBtn.classList.add(
            "bg-surface-muted",
            "border-outline-variant"
        );
    }
}

// Apply Filters
applyFilterBtn.addEventListener("click", () => {

    selectedCategories =
        [...document.querySelectorAll(".category:checked")]
            .map(item => item.value);

    selectedSessions =
        [...document.querySelectorAll(".session:checked")]
            .map(item => item.value);

    updateFilterButton();

    applyFilters();

    filterBox.classList.add("hidden");
});

// Clear Filters
clearFilterBtn.addEventListener("click", () => {

    document
        .querySelectorAll(".category")
        .forEach(c => c.checked = false);

    document
        .querySelectorAll(".session")
        .forEach(c => c.checked = false);

    selectedCategories = [];
    selectedSessions = [];

    updateFilterButton();

    applyFilters();
});

