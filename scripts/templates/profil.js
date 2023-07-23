const profil = (name, link, city, country, citation) => {
  const linkImg = `./assets/photographers/${link}`;
  const parentProfil = document.querySelector(".photograph-header");
  const btnProfil = document.querySelector(".contact_button");
  const h1 = document.createElement("h1");
  const img = document.createElement("img");
  const divName = document.createElement("div");
  const spanReside = document.createElement("span");
  const spanCitation = document.createElement("span");
  img.setAttribute("src", linkImg);
  divName.append(h1, spanReside, spanCitation);
  parentProfil.insertBefore(divName, btnProfil);
  parentProfil.append(img);
  h1.textContent = name;
  spanReside.textContent = `${city}, ${country}`;
  spanCitation.textContent = citation;
};
