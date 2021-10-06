/* eslint-disable class-methods-use-this */
document.addEventListener("DOMContentLoaded", () => {
  const { largeForm } = document.forms;
  const { averageForm } = document.forms;
  const { mediumForm } = document.forms;
  const { popupForm } = document.forms;

  class FormValidator {
    constructor({
      inputs,
      form,
      button,
    }) {
      this.inputs = inputs;
      this.button = button;
      this.form = form;
      this.listener();
    }

    statusForm() {
      let flag = true;
      this.inputs.forEach((input) => {
        if (!this.checkInputValidity(input)) flag = false;
        return flag;
      });
      this.setSubmitButtonState(flag, this.button);
    }

    checkInputValidity(input) {
      if (input.value.length <= 0) {
        input.previousElementSibling.classList.add("_required");
        return false;
      }
      if (input.validity.tooShort === true) {
        input.previousElementSibling.classList.add("_error");
        return false;
      }
      if (input.validity.valueMissing === true) {
        input.previousElementSibling.classList.add("_error");
        return false;
      }
      if (input.validity.patternMismatch === true) {
        input.previousElementSibling.classList.add("_error");
        return false;
      }
      input.previousElementSibling.classList.remove("_error");
      input.previousElementSibling.classList.remove("_required");
      return true;
    }

    setSubmitButtonState(flag, button) {
      if (flag === true) {
        button.removeAttribute("disabled");
      } else {
        button.setAttribute("disabled", true);
      }
    }

    listener() {
      this.form.addEventListener("input", this.statusForm.bind(this));
    }
  }

  if (largeForm) {
    const VALIDATOR_LARGE = {
      inputs: [...largeForm.getElementsByTagName("input")],
      form: largeForm,
      button: largeForm.querySelector("button[type=\"submit\"]"),
    };
    const validationLarge = new FormValidator(VALIDATOR_LARGE);
    validationLarge.statusForm();
  }
  if (averageForm) {
    const VALIDATOR_AVERAGE = {
      inputs: [...averageForm.getElementsByTagName("input")],
      form: averageForm,
      button: averageForm.querySelector("button[type=\"submit\"]"),
    };
    const validationAverage = new FormValidator(VALIDATOR_AVERAGE);
    validationAverage.statusForm();
  }
  if (mediumForm) {
    const VALIDATOR_MEDIUM = {
      inputs: [...mediumForm.getElementsByTagName("input")],
      form: mediumForm,
      button: mediumForm.querySelector("button[type=\"submit\"]"),
    };
    const validationMedium = new FormValidator(VALIDATOR_MEDIUM);
    validationMedium.statusForm();
  }
  if (popupForm) {
    const VALIDATION_POPUP_FORM = {
      inputs: [...popupForm.getElementsByTagName("input")],
      form: popupForm,
      button: popupForm.querySelector("button[type=\"submit\"]"),
    };
    const validationPopup = new FormValidator(VALIDATION_POPUP_FORM);
    validationPopup.statusForm();
  }
});
