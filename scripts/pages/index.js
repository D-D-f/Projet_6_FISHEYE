const getPhotographers = async () => {
  try {
    const requete = await fetch("./data/photographers.json", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
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

const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "block"; // Afficher le contenu une fois que tout est prêt
  loading.style.display = "none";
};

const spiner = () => {
  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "none";
  loading.style.display = "flex";
};

const init = async () => {
  const { photographers } = await getPhotographers();
  await displayData(photographers);
};

spiner();

setTimeout(() => {
  init();
}, 1000);
