const form = document.getElementById("applicationForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbxpN7q1q2Elpj83vNhMy1ogQzWCM3YZ6O1J_XhD8YySqIjo004sknITe2a205jT_ixxxA/exec", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Server error");
            }
        })
        .then(() => {
            window.location.href = "thank-you.html";
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

function sendHeight() {
  const height = document.body.scrollHeight;
  window.parent.postMessage(
    { type: "resize-iframe", height },
    "*"
  );
}

window.addEventListener("load", sendHeight);


window.addEventListener("resize", sendHeight);