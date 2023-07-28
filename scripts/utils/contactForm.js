// permet d'ouvrir le formulaire
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const pages = document.querySelector(".pages");
  pages.style.display = "none";
  modal.style.display = "block";
}
// permet de fermer le formulaire
function closeModal() {
  const modal = document.getElementById("contact_modal");
  const pages = document.querySelector(".pages");
  pages.style.display = "block";
  modal.style.display = "none";
}

const form = document.querySelector("form");
// Événéments qui permet de récupérer les informations du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const formValues = {};

  for (const [name, value] of formData.entries()) {
    formValues[name] = value;
  }

  console.log(formValues);
  closeModal();
});
