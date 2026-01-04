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


(function () {
  let lastHeight = 0;

  function sendHeight() {
    const height = document.documentElement.scrollHeight;

    // 🔑 защита от бесконечного роста
    if (Math.abs(height - lastHeight) < 4) return;

    lastHeight = height;

    window.parent.postMessage(
      { type: "resize-iframe", height },
      "*"
    );
  }

  function init() {
    sendHeight();
    setTimeout(sendHeight, 200);
    setTimeout(sendHeight, 600);

    window.addEventListener("resize", () => {
      setTimeout(sendHeight, 100);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", () => {
    setTimeout(sendHeight, 100);
  });
})();