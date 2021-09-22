const videoFunction = () => {
  const videoMainContainer = document.querySelector(".video__container");

  if (videoMainContainer) {
    const playButton = videoMainContainer.querySelector(".video__button");
    const video = videoMainContainer.querySelector(".video__player");

    playButton.addEventListener("click", () => {
      video.play();
      video.setAttribute("controls", true);
      playButton.classList.add("_hide");
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  videoFunction();
});
