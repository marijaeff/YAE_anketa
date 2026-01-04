const form = document.getElementById("applicationForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("https://script.google.com/macros/s/AKfycbxvJZfzZlSGxxJyhsj5AtWKpuPYDXaSuWlLm8bAdTDXPbp2Zo73Oqh6mBUxj0n3l8UqNQ/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Server error");
            }
        })
        .then(() => {
            alert("Paldies! Jūsu pieteikums ir nosūtīts.");
            form.reset();
            submitButton.disabled = false;
        })
        .catch(() => {
            alert("Radās kļūda. Lūdzu, mēģiniet vēlreiz.");
            submitButton.disabled = false;
        });

});



const offenderSelect = document.getElementById("offenderSelect");
const offenderOtherWrapper = document.getElementById("offenderOtherWrapper");
const offenderOtherInput = document.getElementById("offenderOtherInput");

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