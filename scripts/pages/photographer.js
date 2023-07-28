const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const select = document.querySelector("#filter");
const container = document.querySelector(".container_media");

const getPhotographers = async () => {
  try {
    const requete = await fetch("./data/photographers.json", {
      method: "GET",
    });

    if (requete.ok) {
      const data = await requete.json();
      const photographers = data.photographers.filter(
        (profil) => profil.id === Number(id)
      );
      const media = data.media.filter(
        (profil) => profil.photographerId === Number(id)
      );
      return {
        photographers: [...photographers],
        media: [...media],
      };
    }
  } catch (e) {
    console.log(e);
  }
};
// filtre des dates
const filtreAllDate = (date1, date2) => {
  const dateA = new Date(date1.date);
  const dateB = new Date(date2.date);
  return dateB - dateA;
};
// filtre des popularité
const filtreAllPopular = (like1, like2) => {
  const likeA = like1.likes;
  const likeB = like2.likes;
  return likeB - likeA;
};
// filtre des titres
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
// Affichage des données selon le filtre
const display = (array, index) => {
  if (index === 0) {
    array.sort(filtreAllPopular);
  } else if (index === 1) {
    array.sort(filtreAllDate);
  } else if (index === 2) {
    array.sort(filtreAllTitle);
  }
  array.forEach((element, index) => {
    profilMedia(
      element.video,
      element.image,
      element.title,
      element.likes,
      id,
      index,
      array
    );
  });
};
// Permet de faire fonctionner le caroussel
const caroussel = (array, index) => {
  let images = [];
  const imgCaroussel = document.querySelector("#imgCaroussel");
  const closeCaroussel = document.querySelector("#closeCarou");
  const caroussel = document.querySelector(".caroussel");
  const pages = document.querySelector(".pages");
  const video = document.querySelector("#video");
  const left = document.querySelector(".arrowLeft > img");
  const right = document.querySelector(".arrowRight > img");
  const mp4Links = images.filter((link) => link.endsWith(".mp4"));
  const indexVideo = images.indexOf(...mp4Links);

  right.addEventListener("click", () => {
    const mp4Links = images.filter((link) => link.endsWith(".mp4"));
    const indexVideo = images.indexOf(...mp4Links);
    if (index === images.length - 1) {
      index = 0;
      if (indexVideo === index) {
        imgCaroussel.style.display = "none";
        video.style.display = "block";
        video.src = `./assets/photo/${id}/${images[index]}`;
      } else {
        imgCaroussel.style.display = "block";
        video.style.display = "none";
        console.log(imgCaroussel);
        imgCaroussel.src = `./assets/photo/${id}/${images[index]}`;
      }
    } else {
      index++;
      if (indexVideo === index) {
        imgCaroussel.style.display = "none";
        video.style.display = "block";
        video.src = `./assets/photo/${id}/${images[index]}`;
      } else {
        imgCaroussel.style.display = "block";
        video.style.display = "none";
        console.log(imgCaroussel);
        imgCaroussel.src = `./assets/photo/${id}/${images[index]}`;
      }
    }
  });

  left.addEventListener("click", () => {
    const mp4Links = images.filter((link) => link.endsWith(".mp4"));
    const indexVideo = images.indexOf(...mp4Links);
    if (index === 0) {
      index = images.length - 1;
      if (indexVideo === index) {
        imgCaroussel.style.display = "none";
        video.style.display = "block";
        video.src = `./assets/photo/${id}/${images[index]}`;
      } else {
        imgCaroussel.style.display = "block";
        video.style.display = "none";
        console.log(imgCaroussel);
        imgCaroussel.src = `./assets/photo/${id}/${images[index]}`;
      }
    } else {
      index--;
      if (indexVideo === index) {
        imgCaroussel.style.display = "none";
        video.style.display = "block";
        video.src = `./assets/photo/${id}/${images[index]}`;
      } else {
        imgCaroussel.style.display = "block";
        video.style.display = "none";
        console.log(imgCaroussel);
        imgCaroussel.src = `./assets/photo/${id}/${images[index]}`;
      }
    }
  });

  closeCaroussel.addEventListener("click", () => {
    pages.style.display = "block";
    caroussel.style.display = "none";
  });

  array.forEach((item) => {
    if (item.video !== undefined) {
      images.push(item.video);
    } else {
      images.push(item.image);
    }
  });

  if (indexVideo === index) {
    imgCaroussel.style.display = "none";
    video.style.display = "block";
    video.src = `./assets/photo/${id}/${images[index]}`;
  } else {
    imgCaroussel.style.display = "block";
    video.style.display = "none";
    console.log(imgCaroussel);
    imgCaroussel.src = `./assets/photo/${id}/${images[index]}`;
  }
};
// Permet d'ouvrir le caroussel
const openCaroussel = (array, index) => {
  const pages = document.querySelector(".pages");
  const carousel = document.querySelector(".caroussel");
  pages.style.display = "none";
  carousel.style.display = "block";
  caroussel(array, index);
};
// Permet de gérer les likes
const addLike = (element, like) => {
  const allLikes = document.querySelector(".alllikes");

  element.addEventListener("click", function addCount() {
    const getLike = allLikes.textContent.split(" ");
    let nblike = like;
    let allLike = Number(getLike[0]);

    if (nblike === like) {
      nblike++;
      allLike += 1;
      allLikes.textContent = `${allLike} ♥`;
      element.textContent = `${nblike} ♥`;
    }
    this.removeEventListener("click", addCount);
  });
};

const displayProfil = async () => {
  const getProfil = await getPhotographers();
  const { photographers } = getProfil;

  photographers.forEach((information) => {
    profil(
      information.name,
      information.portrait,
      information.city,
      information.country,
      information.tagline
    );
  });
};

const displayMediaProfil = async () => {
  const getMedia = await getPhotographers();
  const { media, photographers } = getMedia;
  const container = document.querySelector(".container_media");
  const allLikes = document.querySelector(".alllikes");
  const priceDay = document.querySelector(".priceday");
  media.sort(filtreAllPopular);
  let arrayLikes = [];
  media.forEach((item, index) => {
    arrayLikes.push(item.likes);
    profilMedia(
      item.video,
      item.image,
      item.title,
      item.likes,
      id,
      index,
      media
    );
  });

  const resultLikes = arrayLikes.reduce((acc, resultat) => acc + resultat);
  allLikes.innerHTML = `${resultLikes} <span>♥</span>`;
  priceDay.textContent = `${photographers[0].price}€/ jour`;
  select.addEventListener("change", () => {
    container.innerHTML = "";
    display(media, select.options.selectedIndex);
  });
};

const spiner = () => {
  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "none";
  loading.style.display = "flex";
};

const init = () => {
  displayProfil();
  displayMediaProfil();

  const body = document.querySelector(".pages");
  const loading = document.querySelector(".lds-roller");
  body.style.display = "block";
  loading.style.display = "none";
};

spiner();
setTimeout(init, 1000);
