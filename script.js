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


(() => {
  let last = 0;

  function getHeight() {
    const b = document.body?.scrollHeight || 0;
    const d = document.documentElement?.scrollHeight || 0;
    return Math.max(b, d);
  }

  function sendHeight() {
    const h = getHeight();
    if (!h) return;

  
    if (Math.abs(h - last) <= 2) return;
    last = h;

 
    window.parent.postMessage({ type: "yae:resize", height: h }, "*");
 
    console.log("[YAE] send height:", h);
  }

  function burst() {
 
    sendHeight();
    let i = 0;
    const t = setInterval(() => {
      sendHeight();
      i += 1;
      if (i >= 10) clearInterval(t);
    }, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", burst);
  } else {
    burst();
  }

  window.addEventListener("load", burst);
  window.addEventListener("pageshow", burst);


  window.addEventListener("resize", () => setTimeout(sendHeight, 150));
})();