// Simple micro-interaction for form submission
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxBNNoZbP0UvIBUUMXBUKCM6xl2hneB4OSD8VsJzMLA3Hyw7ECoA9E7Vxf9sEAg2EPF/exec";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("submitBtn");

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
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain"
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









const dobText = document.getElementById("dobText");
const dobPicker = document.getElementById("dobPicker");
const calendarBtn = document.getElementById("calendarBtn");

// Prevent future dates in calendar
const today = new Date();
today.setHours(0, 0, 0, 0);
dobPicker.max = today.toISOString().split("T")[0];

// Open native calendar
calendarBtn.addEventListener("click", () => {
    if (dobPicker.showPicker) {
        dobPicker.showPicker();
    } else {
        dobPicker.click();
    }
});

// When a date is selected from the calendar
dobPicker.addEventListener("change", () => {
    if (!dobPicker.value) return;

    const selectedDate = new Date(dobPicker.value);
    selectedDate.setHours(0, 0, 0, 0);

    // Don't allow future dates
    if (selectedDate > today) {
        dobPicker.value = "";
        dobText.value = "";
        alert("Future dates are not allowed.");
        return;
    }

    const [year, month, day] = dobPicker.value.split("-");
    dobText.value = `${day}/${month}/${year}`;
});

// Auto-format while typing
dobText.addEventListener("input", function () {

    // Keep only digits
    let value = this.value.replace(/\D/g, "");

    // Limit to 8 digits (ddmmyyyy)
    value = value.substring(0, 8);

    // Auto add slashes
    if (value.length > 2)
        value = value.slice(0, 2) + "/" + value.slice(2);

    if (value.length > 5)
        value = value.slice(0, 5) + "/" + value.slice(5);

    this.value = value;

    // Reset until full date is entered
    dobPicker.value = "";
    this.setCustomValidity("");

    // Validate only when complete
    if (value.length === 10) {

        const [day, month, year] = value.split("/").map(Number);

        const enteredDate = new Date(year, month - 1, day);
        enteredDate.setHours(0, 0, 0, 0);

        const valid =
            year >= 1900 &&
            enteredDate <= today &&
            enteredDate.getFullYear() === year &&
            enteredDate.getMonth() === month - 1 &&
            enteredDate.getDate() === day;

        if (valid) {
            dobPicker.value =
                `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            this.setCustomValidity("");
        } else {
            dobPicker.value = "";
            this.setCustomValidity("Please enter a valid date of birth.");
            this.reportValidity();
        }
    }
});



document.querySelectorAll(".phone-input").forEach(input => {

    // Allow only digits and max 10 digits
    input.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
        this.setCustomValidity("");
    });

    // Show error when leaving the field
    input.addEventListener("blur", function () {
        if (this.value !== "" && this.value.length < 10) {
            this.setCustomValidity("Mobile number must be exactly 10 digits.");
            this.reportValidity();   // Shows the error bubble only
        } else {
            this.setCustomValidity("");
        }
    });
});
