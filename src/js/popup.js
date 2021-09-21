/* eslint-disable no-inner-declarations */
/* eslint-disable no-use-before-define */
const popup = (request = true) => {
  const allPopupElements = [...document.querySelectorAll("[data-popup]")];
  const poupButtonArray = [...document.querySelectorAll("._popup-close")];

  const popupNames = {
    successful: "successful",
    callUs: "callUs",
  };
  if (allPopupElements && poupButtonArray) {
    allPopupElements.forEach((popupEl) => {
      popupEl.addEventListener("click", popupHandler);
    });
    poupButtonArray.forEach((popupEl) => {
      popupEl.addEventListener("click", popupClose);
    });

    function popupHandler(event) {
      event.preventDefault();

      const target = event.currentTarget;
      const attributePopup = target.getAttribute("data-popup");

      const {
        successful,
        callUs,
      } = popupNames;

      // Проверяем успешен ли ответ от сервера
      if (attributePopup === successful && request) {
        const successfulPopup = document.querySelector(".successful-popup");
        popupOpen(successfulPopup);
        popupClose(event);
      }
      if (attributePopup === callUs) {
        const requestPopup = document.querySelector(".request-popup");
        popupOpen(requestPopup);
      }
    }

    function popupClose(event) {
      const popupContainer = searchParent(event.target, "._popup");
      popupContainer.classList.remove("_open");
    }

    function popupOpen(elementOpen) {
      elementOpen.classList.add("_open");
    }

    function searchParent(el, selector) {
      if (Element.prototype.closest) {
        return el.closest(selector);
      }

      let parent = el;

      while (parent) {
        if (parent.matches(selector)) {
          return parent;
        }

        parent = parent.parentElement;
      }

      return null;
    }
  }
};
document.addEventListener("DOMContentLoaded", () => {
  popup();
});