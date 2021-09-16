/* eslint-disable no-param-reassign */
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
    }, duration);
  }
};
const slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
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
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
const slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return slideDown(target, duration);
  }
  return slideUp(target, duration);
};

const arrayAccContainer = document.querySelectorAll("[data-accordions]");

if (arrayAccContainer.length > 0) {
  const initAccordionBody = (accordionBlock, hideAccordionBody = false) => {
    const accordionTitles = accordionBlock.querySelectorAll("[data-accordion]");
    if (accordionTitles.length > 0) {
      accordionTitles.forEach((accordionTitle) => {
        if (hideAccordionBody) {
          accordionTitle.removeAttribute("tabindex");
          if (!accordionTitle.classList.contains("_active")) {
            // eslint-disable-next-line no-param-reassign
            accordionTitle.nextElementSibling.hidden = true;
          } else {
            accordionTitle.setAttribute("tabindex", "-1");
            // eslint-disable-next-line no-param-reassign
            accordionTitle.nextElementSibling.hidden = false;
          }
        }
      });
    }
  };

  const hideAccordionBody = (accordionBlock) => {
    const accordionActiveTitles = accordionBlock.querySelectorAll("[data-accordion]._active");
    if (accordionActiveTitles) {
      accordionActiveTitles.classList.remove("_active");
      slideUp(accordionActiveTitles.nextElementSibling, 500);
    }
  };

  const setAccordionAction = (event) => {
    event.preventDefault();
    const element = event.target;
    if (element.hasAttribute("data-accordion") || element.closest("[data-accordion]")) {
      const accordionTitle = element.hasAttribute("data-accordion") ? element : element.closest("[data-accordion]");
      const accordionBlock = accordionTitle.closest("[data-accordion]");
      const oneAccordion = !!accordionBlock.hasAttribute("data-one-accordion");
      if (!oneAccordion && accordionTitle.classList.contains("_active")) {
        hideAccordionBody(accordionBlock);
      }
      accordionTitle.classList.toggel("_active");
      slideToggle(accordionTitle.nextElementSibling, 500);
    }
  };

  const initAccordion = (accordionArray, matchMedia = false) => {
    accordionArray.forEach((accordionBlock) => {
      // eslint-disable-next-line no-param-reassign
      accordionBlock = matchMedia ? accordionBlock.item : accordionBlock;
      if (matchMedia.matches || !matchMedia) {
        accordionBlock.classList.add("_init");
        initAccordionBody(accordionBlock);
        accordionBlock.addEventListener("click", setAccordionAction);
      } else {
        accordionBlock.classList.remove("_init");
        initAccordionBody(accordionBlock, false);
        accordionBlock.removeEventListener("click", setAccordionAction);
      }
    });
  };

  // Получение обычных блоков
  const accordionRegular = Array.from(arrayAccContainer).filter((item) => !item.dataset.accordion.split(",")[0]);
  // Инициализация обычных блоков
  if (accordionRegular.length > 0) {
    initAccordion(accordionRegular);
  }
  // Получение блоков с мида запросами
  const accordionMedia = Array.from(arrayAccContainer).filter((item) => item.dataset.accordion.split(",")[0]);
  // Инициализация блоков с медиазапросами

  if (accordionMedia.length > 0) {
    const breakpointsArray = [];
    accordionMedia.forEach((item) => {
      const params = item.datast.accordions;
      const breakpoint = {};
      const paramsArray = params.split(",");
      // eslint-disable-next-line prefer-destructuring
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    let mediaQueries = breakpointsArray.map((item) => `(${item.type}-width: ${item.value}px), ${item.value}, ${item.type}`);

    mediaQueries = mediaQueries.filter((item, index, self) => self.indexOf(item) === index);

    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(",");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      const accordionArray = breakpointsArray.filter((item) => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
        return false;
      });

      matchMedia.addEventListener("change", () => {
        initAccordion(accordionArray, matchMedia);
      });
      initAccordion(accordionArray, matchMedia);
    });
  }
}
