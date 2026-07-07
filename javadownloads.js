window.addEventListener('error', (e) => {
    fetch('/error?msg=' + encodeURIComponent(e.message + ' at ' + e.filename + ':' + e.lineno));
});

const filterBtn = document.getElementById("filterBtn");
const filterBox = document.getElementById("filterBox");

filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterBox.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
    const isInsideFilterContent = filterBox.contains(e.target) && e.target !== filterBox;
    const isInsideFilterBtn = filterBtn.contains(e.target);
    fetch(`/log?msg=docClick_target_${e.target.tagName}_id_${e.target.id}_insideContent_${isInsideFilterContent}_insideBtn_${isInsideFilterBtn}`);
    if (
        !isInsideFilterContent &&
        !isInsideFilterBtn
    ) {
        filterBox.classList.add("hidden");
    }
});


// Simple micro-interaction for document cards
document.querySelectorAll('.group').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Potential for more advanced GSAP or Framer-like animations if needed
    });
});

// Search filtering logic simulation
const searchInput = document.querySelector('input[placeholder*="Search documents"]');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.grid > div');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
});


const sortBtn = document.getElementById("sortLatestBtn");
const grid = document.getElementById("downloadsGrid");

// Store the original order
const originalCards = Array.from(grid.children);

let latestFirstOn = false;

sortBtn.addEventListener("click", () => {
    latestFirstOn = !latestFirstOn;

    if (latestFirstOn) {
        // Sort latest first
        const cards = Array.from(grid.children);

        cards.sort((a, b) => {
            const dateA = new Date(
                a.querySelector(".text-on-surface-variant.font-label-md").textContent.trim()
            );
            const dateB = new Date(
                b.querySelector(".text-on-surface-variant.font-label-md").textContent.trim()
            );

            return dateB - dateA;
        });

        cards.forEach(card => grid.appendChild(card));

        // Turn button red
        sortBtn.classList.remove(
            "bg-surface-muted",
            "border-outline-variant",
            "text-on-surface"
        );
        sortBtn.classList.add(
            "bg-primary",
            "text-on-primary",
            "border-primary",
            "hover:bg-rose-500"
        );

    } else {
        // Restore original order
        originalCards.forEach(card => grid.appendChild(card));

        // Restore original button color
        sortBtn.classList.remove(
            "bg-primary",
            "text-on-primary",
            "border-primary",
            "hover:bg-rose-500"
        );
        sortBtn.classList.add(
            "bg-surface-muted",
            "border-outline-variant",
            "text-on-surface"
        );
    }
});




function updateFilterButton() {

    const hasCategory =
        document.querySelectorAll(".category:checked").length > 0;

    const hasSession =
        document.querySelectorAll(".session:checked").length > 0;

    const active = hasCategory || hasSession;

    if (active) {

        filterBtn.classList.remove(
            "bg-surface-muted",
            "border-outline-variant",
            "text-on-surface"
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
            "border-outline-variant",
            "text-on-surface"
        );

    }
}


const selectedCategories = [
    ...document.querySelectorAll(".category:checked")
].map(item => item.value);

const selectedSessions = [
    ...document.querySelectorAll(".session:checked")
].map(item => item.value);

document.querySelectorAll("#downloadsGrid > div").forEach(card => {

    const category = card.dataset.category;
    const session = card.dataset.session;

    const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(category);

    const sessionMatch =
        selectedSessions.length === 0 ||
        selectedSessions.includes(session);

    card.style.display =
        categoryMatch && sessionMatch ? "flex" : "none";
});

document.getElementById("applyFilter").addEventListener("click", () => {

    const selectedCategories =
        [...document.querySelectorAll(".category:checked")]
            .map(item => item.value);

    const selectedSessions =
        [...document.querySelectorAll(".session:checked")]
            .map(item => item.value);

    document.querySelectorAll("#downloadsGrid > div").forEach(card => {

        const category = card.dataset.category;
        const session = card.dataset.session;

        const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(category);

        const sessionMatch =
            selectedSessions.length === 0 ||
            selectedSessions.includes(session);

        card.style.display =
            categoryMatch && sessionMatch ? "flex" : "none";
    });

    filterBox.classList.add("hidden");
});

updateFilterButton();

document.getElementById("clearFilter").addEventListener("click", () => {

    document.querySelectorAll(".category").forEach(c => c.checked = false);

    document.querySelectorAll(".session").forEach(c => c.checked = false);

    document.querySelectorAll("#downloadsGrid > div").forEach(card => {
        card.style.display = "flex";
    });

    updateFilterButton();
});

updateFilterButton();

document.querySelectorAll(".category, .session").forEach(input => {
    input.addEventListener("change", updateFilterButton);
});



const closeFilter = document.getElementById("closeFilter");

if (closeFilter) {
    closeFilter.addEventListener("click", (e) => {
        e.stopPropagation();
        fetch('/log?msg=closeFilter_clicked');
        filterBox.classList.add("hidden");
    });
}

















fetch("api/get_downloads.php")
    .then(r => r.json())
    .then(files => {

        const grid = document.getElementById("downloadsGrid");

        grid.innerHTML = "";

        files.forEach(file => {

            grid.innerHTML += `

<div class="group bg-white rounded-xl border border-outline-variant/30 p-6 flex flex-col">

<div class="flex justify-between mb-4">

<span class="material-symbols-outlined text-red-600 text-5xl">
picture_as_pdf
</span>

</div>

<h3 class="font-bold text-lg mb-3">
${file.title}
</h3>

<a href="${file.url}" target="_blank">

<button class="w-full bg-primary text-white py-3 rounded-lg">

Download PDF

</button>

</a>

</div>

`;

        });

    });



setInterval(() => {

    fetch("api/get_downloads.php");

}, 3600000);