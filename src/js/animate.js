/* eslint-disable no-inner-declarations */
/* eslint-disable max-len */
const animation = () => {
  const animateBloks = document.querySelectorAll("._animation");
  const durationToStart = 300;
  let isScrolling = false;

  if (animateBloks.length > 0) {
    const offset = (element) => {
      const rect = element.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
      };
    };

    const elementOnFocus = () => {
      for (let i = 0; i < animateBloks.length; i++) {
        const animateElement = animateBloks[i];
        const animateElementHeight = animateElement.getBoundingClientRect().height;
        const animateElementOffset = offset(animateElement).top;
        const animateStart = 4;

        let animationGo = window.innerHeight - animateElementHeight / animateStart;

        if (animateElementHeight > window.innerHeight) {
          animationGo = window.innerHeight - window.innerHeight / animateStart;
        }
        if ((window.pageYOffset > animateElementOffset - animationGo) && window.pageYOffset < (animateElementOffset + animateElementHeight)) {
          animateElement.classList.add("_active-animation");
        } else if (animateElement.classList.contains("_animation-repeat")) {
          animateElement.classList.remove("_active-animation");
        }
      }
    };

    function throttleScroll() {
      if (isScrolling === false) {
        window.requestAnimationFrame(() => {
          elementOnFocus();
          isScrolling = false;
        });
      }
      isScrolling = true;
    }

    window.addEventListener("scroll", throttleScroll);

    document.addEventListener("DOMContentLoaded", () => setTimeout(() => {
      elementOnFocus();
    }, durationToStart));
  }
};
document.addEventListener("DOMContentLoaded", () => {
  animation();
});