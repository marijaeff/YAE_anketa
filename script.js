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
  function sendHeight() {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: "resize-iframe", height }, "*");
  }

  function initAutoResize() {
  
    sendHeight();
    setTimeout(sendHeight, 100);
    setTimeout(sendHeight, 300);
    setTimeout(sendHeight, 800);

   
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => sendHeight());
      ro.observe(document.documentElement);
    } else {
      const mo = new MutationObserver(() => sendHeight());
      mo.observe(document.documentElement, { childList: true, subtree: true });
    }

    window.addEventListener("resize", () => {
     
      setTimeout(sendHeight, 50);
    });
  }

  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAutoResize);
  } else {
    initAutoResize();
  }


  window.addEventListener("load", () => setTimeout(sendHeight, 50));
})();