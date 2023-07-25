const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const fixed = (like, price) => {
  const prices = document.querySelector(".price");
  const likes = document.querySelector(".like");

  likes.textContent = `${like} ♥`;
  prices.textContent = `${price}€/ jour`;
};

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

const filtreAllTitle = (title1, title2) => {
  const titleA = title1.title.toUpperCase();
  const titleB = title2.title.toUpperCase();
  if (titleB < titleA) {
    return 1;
  }
  if (titleB > titleA) {
    return -1;
  }
  return 0;
};

const filtres = (media) => {
  const filtre = document.querySelector("#filtre");
  let containerImg = document.querySelector(".allImages");

  filtre.addEventListener("change", () => {
    containerImg.innerHTML = "";

    if (filtre.options.selectedIndex === 1) {
      const filtreDate = media.sort(filtreAllDate);
      filtreDate.forEach((element) => {
        return allImage(
          element.image,
          element.likes,
          element.title,
          element.video,
          id
        );
      });
    } else if (filtre.options.selectedIndex === 2) {
      const filtreTitle = media.sort(filtreAllTitle);
      filtreTitle.forEach((element) => {
        return allImage(
          element.image,
          element.likes,
          element.title,
          element.video,
          id
        );
      });
    } else {
      const filtrePopular = media.sort(filtreAllPopular);
      filtrePopular.forEach((element) => {
        return allImage(
          element.image,
          element.likes,
          element.title,
          element.video,
          id
        );
      });
    }
  });
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
  const filtrePopular = media.sort(filtreAllPopular);
  let resultLike = 0;

  //spiner
  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "block";
  loading.style.display = "none";

  // affichage profil
  profil(name, portrait, city, country, tagline);

  // affichages image
  filtrePopular.forEach((element) => {
    allImage(element.image, element.likes, element.title, element.video, id);
    resultLike += element.likes;
  });

  //filtrage des données
  filtres(media);

  //barre fixé en bas
  fixed(resultLike, media[0].price);
};

spiner();
setTimeout(init, 2000);
