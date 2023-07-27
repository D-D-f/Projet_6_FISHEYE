const profil = (name, link, city, country, citation) => {
  const parentProfil = document.querySelector(".photograph-header");
  const btnProfil = document.querySelector(".contact_button");
  const h1 = document.createElement("h1");
  const img = document.createElement("img");
  const divName = document.createElement("div");
  const spanReside = document.createElement("span");
  const spanCitation = document.createElement("span");
  img.setAttribute("src", `./assets/photographers/${link}`);
  img.setAttribute("alt", name);
  divName.append(h1, spanReside, spanCitation);
  parentProfil.insertBefore(divName, btnProfil);
  parentProfil.append(img);
  h1.textContent = name;
  spanReside.textContent = `${city}, ${country}`;
  spanCitation.textContent = citation;
};

const profilMedia = (video, linkImg, title, likes, id, index, array) => {
  const container = document.querySelector(".container_media ");

  if (video === undefined) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");
    const divCaption = document.createElement("div");
    const spanTitle = document.createElement("span");
    const spanLike = document.createElement("span");
    img.setAttribute("src", `./assets/photo/${id}/${linkImg}`);
    img.setAttribute("alt", name);
    img.addEventListener("click", () => openCaroussel(array, index));
    container.appendChild(img);
    spanTitle.textContent = title;
    spanLike.textContent = `${likes} ♥`;
    container.appendChild(figure);
    divCaption.append(spanTitle, spanLike);
    figCaption.appendChild(divCaption);
    figure.append(img, figCaption);
    addLike(spanLike, likes);
    spanLike.style.cursor = "pointer";
  } else {
    const videos = document.createElement("video");
    const div = document.createElement("div");
    const blockDiv = document.createElement("div");
    const imgTitle = document.createElement("span");
    const like = document.createElement("span");
    like.textContent = `${likes} ♥`;
    imgTitle.textContent = title;
    videos.setAttribute("src", `assets/photo/${id}/${video}`);
    videos.setAttribute("controls", "");
    div.append(videos, blockDiv);
    div.classList.add("containerVideo");
    blockDiv.append(imgTitle, like);
    container.append(div);
    addLike(like, likes);
    like.style.cursor = "pointer";
  }
};
