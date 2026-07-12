// Simple micro-interaction for form submission
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQBylSNRc8lda7PX2XofN9rT9LTG36_i2kvjfXtLmovrLidqLFcZVTT6aPN9mcXUerYQ/exec";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");

    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Submitting...';

    const data = {
        studentName: form.studentName.value,
        fatherName: form.fatherName.value,
        motherName: form.motherName.value,
        dob: form.dob.value,
        fatherPhone: form.fatherPhone.value,
        motherPhone: form.motherPhone.value,
        gender: form.gender.value,
        religion: form.religion.value,
        category: form.category.value,
        admissionClass: form.admissionClass.value,
        previousSchool: form.previousSchool.value,
        medium: form.medium.value,
        previousClass: form.previousClass.value,
        address: form.address.value
    };

    try {

        await fetch(SCRIPT_URL, {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Application Submitted!';
        btn.classList.remove("bg-primary-container");
        btn.classList.add("bg-green-600");

        form.reset();

    } catch (err) {

        btn.innerHTML = "Submission Failed";
        btn.classList.add("bg-red-600");

        console.error(err);

    }

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = 'Submit Application <span class="material-symbols-outlined">send</span>';
        btn.classList.remove("bg-green-600", "bg-red-600");
        btn.classList.add("bg-primary-container");
    }, 3000);
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
