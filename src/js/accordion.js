const duration = 500;
const accordion = () => {
  // const accordions = document.querySelectorAll('[data-accordions]');
  const buttons = document.querySelectorAll("[data-accordion-button]");
  const contents = document.querySelectorAll("[data-accordion-content]");
  const items = document.querySelectorAll("[data-accordion]");

  setAccListener(buttons);
  accordionInit(items, contents);
};
const setAccordionAction = (event) => {
  event.preventDefault();
  const element = event.target;
  if (element.hasAttribute("data-accordion") || element.closest("[data-accordion]")) {
    const accordionBlock = element.hasAttribute("data-accordion") ? element : element.closest("[data-accordion]");
    const accordionContent = accordionBlock.querySelector("[data-accordion-content]");
    const mainContainer = accordionBlock.closest("[data-accordions]");
    if (mainContainer.hasAttribute("data-one-accordion") && !accordionBlock.classList.contains("_active") && !mainContainer.classList.contains("_slide")) {
      hideAccordionBody(mainContainer);
    }
    if (!accordionContent.classList.contains("_slide") && !mainContainer.classList.contains("_slide")) {
      accordionBlock.classList.toggle("_active");
      mainContainer.classList.add('_slide');
      slideToggle(accordionContent, duration);
    }
  }
};
const hideAccordionBody = (accordionBlock) => {
  const accordionActiveBlock = accordionBlock.querySelector("[data-accordion]._active");
  if (accordionActiveBlock) {
    accordionActiveBlock.classList.remove("_active");
    const accordionContent = accordionActiveBlock.querySelector("[data-accordion-content]");
    slideUp(accordionContent, 500);
  }
};
const setAccListener = (buttonArray) => {
  if (buttonArray.length > 0) {
    buttonArray.forEach((button) => {
      button.addEventListener("click", setAccordionAction);
    });
  } else return;
};
const accordionInit = (accItemsArray, contentArray) => {
  if (contentArray.length > 0) {
    contentArray.forEach((contentItem) => {
      slideToggle(contentItem);
    });
  }
  if (accItemsArray.length > 0) {
    accItemsArray.forEach((accItem) => {
      accItem.classList.add("_init");
    });
  }
};
const slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${target.offsetHeight}px`;
    // eslint-disable-next-line no-unused-expressions
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      target.closest("[data-accordions]").classList.remove("_slide");
    }, duration);
  }
};
const slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    const height = target.offsetHeight;
    // eslint-disable-next-line no-unused-expressions
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      target.closest("[data-accordions]").classList.remove("_slide");
    }, duration);
  }
};
const slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return slideDown(target, duration);
  }
  return slideUp(target, duration);
};

document.addEventListener("DOMContentLoaded", () => {
  accordion();
});