/* eslint-disable max-len */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-use-before-define */
const popup = () => {
  const allPopupElements = [...document.querySelectorAll("[data-popup]")];
  const popups = [...document.querySelectorAll("._popup")];
  // храним имена Popup'ов;
  const popupNames = {
    callUs: "callUs",
  };
  if (allPopupElements && popups) {
    allPopupElements.forEach((popupEl) => {
      popupEl.addEventListener("click", popupHandler);
    });
    popups.forEach((popupEl) => {
      popupEl.addEventListener("click", popupClose);
    });

    function popupHandler(event) {
      event.preventDefault();

      const target = event.currentTarget;
      const attributePopup = target.getAttribute("data-popup");

      // Получаем имена Popup'ов
      const {
        callUs,
      } = popupNames;

      // Проверяем успешен ли ответ от сервера
      // Условия
      if (attributePopup === callUs) {
        const requestPopup = document.querySelector(".request-popup");
        popupOpen(requestPopup);
        // window.dataLayer = window.dataLayer || [];
        // window.dataLayer.push({ event: "event-name" });
        if (requestPopup.classList.contains("._open")) {
          popupClose(event);
        }
      }
    }

    function popupClose(event) {
      if (event.target.classList.contains("_popup-close") || event.target.classList.contains("_popup-close-area")) {
        const popupContainer = searchParent(event.target, "._popup");
        popupContainer.classList.remove("_open");
      } else if (event.target.attributes.type !== undefined && (event.target.attributes.type.value === "submit")) {
        // const popupContainer = searchParent(event.target, "._popup");
        // popupContainer.classList.remove("_open");
        // window.dataLayer = window.dataLayer || [];
        // window.dataLayer.push({ event: "event-name" });
      }
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
