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

const init = async () => {
  const data = await getPhotographer();
};

init();
