// Récupération des données
const getPhotographers = async () => {
  try {
    const requete = await fetch("./data/photographers.json", {
      method: "GET",
    });

    if (requete.ok) {
      const data = await requete.json();

      return {
        photographers: [...data.photographers],
      };
    }
  } catch (e) {
    console.log(e);
  }
};

// Affichage des données sur la page d'accueil
const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "block";
  loading.style.display = "none";
};
// Lancement d'un spiner
const spiner = () => {
  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "none";
  loading.style.display = "flex";
};
// Container des fonction ainsi qu'un time out avant delancer l'affichage
const init = async () => {
  const { photographers } = await getPhotographers();
  setTimeout(() => {
    displayData(photographers);
  }, 1000);
};

spiner();
init();
