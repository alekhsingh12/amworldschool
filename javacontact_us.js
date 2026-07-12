const scriptURL = "https://script.google.com/macros/s/AKfycbwPjaAZOAdv2vcwaXbjEMlAUBTv_FSMmSHFRFi8MEeXJRy857lafNiStNCe8r-OImLn/exec";

const form = document.getElementById("contact-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const btn = form.querySelector("button");
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML =
        '<span class="material-symbols-outlined animate-spin">progress_activity</span> Sending...';

    const data = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.status === "success") {
            btn.innerHTML =
                '<span class="material-symbols-outlined">check_circle</span> Inquiry Received';

            btn.classList.replace("bg-primary", "bg-green-700");

            form.reset();

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                btn.classList.replace("bg-green-700", "bg-primary");
            }, 3000);

        } else {
            throw new Error(result.message);
        }

    } catch (err) {
        alert("Failed to submit inquiry.");

        btn.disabled = false;
        btn.innerHTML = originalText;
    }
});
