// Fonction qui permet d'afficher les informations du photographe dans la page d'accueil
const photographerTemplate = (data) => {
  const { name, portrait, city, country, price, tagline, id } = data;
  const picture = `./assets/photographers/${portrait}`;

  const getUserCardDOM = () => {
    const article = document.createElement("article");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const spanReside = document.createElement("span");
    const spanCitation = document.createElement("span");
    const spanPrice = document.createElement("span");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    a.setAttribute("href", `photographer.html?id=${id}`);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    spanReside.textContent = `${city}, ${country}`;
    spanCitation.textContent = tagline;
    spanPrice.textContent = `${price}€/ jour`;
    article.appendChild(a);
    a.appendChild(img);
    a.append(h2, spanReside, spanCitation, spanPrice);
    return article;
  };
  return { name, picture, getUserCardDOM };
};
