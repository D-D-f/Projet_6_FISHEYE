const photographerTemplate = (data) => {
  const { name, portrait, city, country, price, tagline } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const spanReside = document.createElement("span");
    const spanCitation = document.createElement("span");
    const spanPrice = document.createElement("span");
    img.setAttribute("src", picture);
    a.setAttribute("href", "#");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    spanReside.textContent = `${city}, ${country}`;
    spanCitation.textContent = tagline;
    spanPrice.textContent = `${price}€/ jour`;
    article.appendChild(a);
    a.appendChild(img);
    a.append(h2, spanReside, spanCitation, spanPrice);
    return article;
  }
  return { name, picture, getUserCardDOM };
};
