// --- FORM SUBMIT ---
const form = document.getElementById("applicationForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbxsRnkXfELRgEnmaaPeJ64Lsz5ViAN64pceh_pAtXC-IfXsqbYVwugKMm0UTaNZV9ur9g/exec", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((text) => {
                if (text !== "OK") throw new Error("Server error");

                window.top.location.href =
                    "https://www.bernamaja.lv/resursi/paldies-atbalsta-grupa";
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

const phoneInput = document.querySelector('input[name="phone"]');

if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\s{2,}/g, " ");
  });
}

function sendHeight() {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  window.parent.postMessage(
    { type: "yae:resize", height },
    "*"
  );
}

window.addEventListener("load", sendHeight);
window.addEventListener("resize", sendHeight);

if (document.fonts) {
  document.fonts.ready.then(sendHeight);
}

const observer = new MutationObserver(() => {
  requestAnimationFrame(sendHeight);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
});