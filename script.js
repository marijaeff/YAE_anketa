// --- FORM SUBMIT ---
const form = document.getElementById("applicationForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbzrs7Jn39ctmo3y5hYtWsqTzwbWZDHVNc7gGQgzkcSuII8IZLDNdF42vh_4BJ91A-UTEw/exec", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) throw new Error("Server error");
            })
            .then(() => {
                window.location.href = "thank-you.html";
            })
            .catch(() => {
                alert("Radās kļūda. Lūdzu, mēģiniet vēlreiz.");
                submitButton.disabled = false;
            });
    });
}


// --- OFFENDER SELECT ---
const offenderSelect = document.getElementById("offenderSelect");
const offenderOtherWrapper = document.getElementById("offenderOtherWrapper");
const offenderOtherInput = document.getElementById("offenderOtherInput");

if (offenderSelect && offenderOtherWrapper && offenderOtherInput) {
    offenderSelect.addEventListener("change", function () {
        if (this.value === "Cits") {
            offenderOtherWrapper.style.display = "block";
            offenderOtherInput.required = true;
        } else {
            offenderOtherWrapper.style.display = "none";
            offenderOtherInput.required = false;
            offenderOtherInput.value = "";
        }
    });
}
