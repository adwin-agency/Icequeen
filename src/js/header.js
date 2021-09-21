const menuHandler = () => {
  const burgerButtom = document.querySelector(".burger");
  const changeClass = (event) => {
    event.preventDefault();
    const { target } = event;
    const header = target.closest(".header");
    const html = document.getElementsByTagName("html")[0];

    if (header) {
      header.classList.toggle("_menu-open");
      html.classList.toggle("_fixed");
    }
  };

  burgerButtom.addEventListener("click", changeClass);
};
document.addEventListener("DOMContentLoaded", () => {
  menuHandler();
});