const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getPhotographer = async () => {
  try {
    const requete = await fetch("./data/photographers.json", {
      method: "GET",
    });

    if (requete.ok) {
      const data = await requete.json();
      const { media, photographers } = data;
      const mediaPhotographer = media.filter(
        (user) => user.photographerId === Number(id)
      );
      const photographerId = photographers.filter(
        (user) => user.id === Number(id)
      );

      return {
        media: [...mediaPhotographer],
        photographer: [...photographerId],
      };
    }
  } catch (e) {
    console.log(e);
  }
};

const filtreAllDate = (date1, date2) => {
  const dateA = new Date(date1.date);
  const dateB = new Date(date2.date);
  return dateB - dateA;
};

const filtreAllPopular = (like1, like2) => {
  const likeA = like1.likes;
  const likeB = like2.likes;
  return likeB - likeA;
};

const filtres = (media) => {
  const filtre = document.querySelector("#filtre");
  const filtreDate = media.sort(filtreAllDate);
  const filtrePopular = media.sort(filtreAllPopular);

  filtre.addEventListener("change", (e) => {});
};

const spiner = () => {
  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "none";
  loading.style.display = "flex";
};

const init = async () => {
  const data = await getPhotographer();
  const { photographer, media } = data;
  const { city, country, name, portrait, tagline } = photographer[0];
  console.log(media);

  //spiner
  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "block";
  loading.style.display = "none";

  // affichage profil
  profil(name, portrait, city, country, tagline);

  //filtrage des données
  filtres(media);
};

spiner();
setTimeout(init, 1500);
