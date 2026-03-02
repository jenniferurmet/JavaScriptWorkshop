const form = document.getElementById("signupForm");
const errorSummary = document.getElementById("errorSummary");
const phoneInput = document.getElementById("phone");

// Restore saved draft
window.addEventListener("load", () => {
  const savedData = localStorage.getItem("formDraft");
  if (savedData) {
    const data = JSON.parse(savedData);
    form.fullName.value = data.fullName || "";
    form.email.value = data.email || "";
    form.phone.value = data.phone || "";
    console.log("Restored Draft");
  }
});

// Autosave on input
form.addEventListener("input", () => {
  const formData = {
    fullName: form.fullName.value,
    email: form.email.value,
    phone: form.phone.value
  };
  localStorage.setItem("formDraft", JSON.stringify(formData));
  console.log("Saved Draft");
});

// Custom validation on submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorSummary.textContent = "";

  if (!form.checkValidity()) {
    errorSummary.textContent = "Please fill out all required fields correctly.";
    return;
  }

  alert("Form submitted successfully!");

  localStorage.removeItem("formDraft");
  form.reset();
});

// Phone normalisation on blur
phoneInput.addEventListener("blur", () => {
  let cleaned = phoneInput.value.replace(/\D/g, "");
  if (cleaned.length === 10) {
    phoneInput.value = cleaned.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
  }
});