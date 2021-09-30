/* eslint-disable class-methods-use-this */

document.addEventListener("DOMContentLoaded", () => {
  const VALIDATOR_LARGE = {
    inputs: [...document.forms.largeForm.getElementsByTagName("input")],
    form: document.forms.largeForm,
    button: document.forms.largeForm.querySelector("button[type=\"submit\"]"),
  };

  const VALIDATOR_AVERAGE = {
    inputs: [...document.forms.averageForm.getElementsByTagName("input")],
    form: document.forms.averageForm,
    button: document.forms.averageForm.querySelector("button[type=\"submit\"]"),
  };

  const VALIDATOR_MEDIUM = {
    inputs: [...document.forms.mediumForm.getElementsByTagName("input")],
    form: document.forms.mediumForm,
    button: document.forms.mediumForm.querySelector("button[type=\"submit\"]"),
  };

  const VALIDATION_POPUP_FORM = {
    inputs: [...document.forms.popupForm.getElementsByTagName("input")],
    form: document.forms.popupForm,
    button: document.forms.popupForm.querySelector("button[type=\"submit\"]"),
  };

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

    resetForm() {
      this.form.reset();
      this.setSubmitButtonState(false, this.button);
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
      this.button.addEventListener("click", this.resetForm.bind(this));
    }
  }
  const validationLarge = new FormValidator(VALIDATOR_LARGE);
  const validationAverage = new FormValidator(VALIDATOR_AVERAGE);
  const validationMedium = new FormValidator(VALIDATOR_MEDIUM);
  const validationPopup = new FormValidator(VALIDATION_POPUP_FORM);
  validationLarge.statusForm();
  validationAverage.statusForm();
  validationMedium.statusForm();
  validationPopup.statusForm();
});
