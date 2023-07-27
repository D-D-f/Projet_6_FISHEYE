function displayModal() {
  const modal = document.getElementById("contact_modal");
  const pages = document.querySelector(".pages");
  pages.style.display = "none";
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const pages = document.querySelector(".pages");
  pages.style.display = "block";
  modal.style.display = "none";
}
