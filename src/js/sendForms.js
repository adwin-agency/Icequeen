function sendForms() {
  const { forms } = document;

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

  function apiPostForm(event) {
    const form = searchParent(event.target, "form");
    if (form) {
      const url = "https://icequeen-cryo.com";
      return fetch(`${url}/send.php`, {
        method: "POST",
        body: new FormData(form),
      })
        .then((res) => {
          if (res.ok) {
            console.log(event.target);
            const successfulPopup = document.querySelector(".successful-popup");
            const formTarget = searchParent(event.target, "form");
            if (formTarget) {
              const name = formTarget.getAttribute("name");
              if (name) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: name });
              }
            }
            if (successfulPopup) {
              successfulPopup.classList.add("_open");
            }
            const popupContainer = searchParent(form, "._popup._open");
            if (popupContainer) {
              popupContainer.classList.remove("_open");
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  Array.from(forms).forEach((form) => {
    const formSubmitButton = form.querySelector("button[type=\"submit\"]");
    formSubmitButton.addEventListener("click", apiPostForm);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  sendForms();
});
