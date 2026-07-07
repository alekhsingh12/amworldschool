const phone = document.getElementById("phoneCard");

phone.addEventListener("click", function (e) {

    // If the Download button was clicked, let the link work normally.
    if (e.target.closest("a")) {
        return;
    }

    // Otherwise toggle the flip.
    phone.classList.toggle("flipped");
});
