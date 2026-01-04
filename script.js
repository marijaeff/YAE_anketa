document.getElementById("applicationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Pieteikums nosūtīts (testa režīms)");
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