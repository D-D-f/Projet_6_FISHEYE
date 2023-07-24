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

const allImage = (image, likes, title, video, name) => {
  let containerImg = document.querySelector(".allImages");
  if (video !== undefined) {
    const videos = document.createElement("video");
    const div = document.createElement("div");
    const blockDiv = document.createElement("div");
    const imgTitle = document.createElement("span");
    const like = document.createElement("span");
    like.textContent = `${likes} ♥`;
    imgTitle.textContent = title;
    videos.setAttribute("src", `assets/photo/${name}/${video}`);
    videos.setAttribute("controls", "");
    div.append(videos, blockDiv);
    div.classList.add("containerVideo");
    blockDiv.append(imgTitle, like);
    containerImg.append(div);
  } else {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");
    const imgTitle = document.createElement("span");
    const like = document.createElement("span");
    like.setAttribute("aria-label", "likes");
    img.setAttribute("src", `./assets/photo/${name}/${image}`);
    containerImg.appendChild(figure);
    figure.append(img, figCaption);
    figCaption.append(imgTitle, like);
    like.textContent = `${likes} ♥`;
    imgTitle.textContent = title;
  }
};
