/* eslint-disable max-len */
const animateBloks = document.querySelectorAll("._animation");
const durationToStart = 300;

if (animateBloks.length > 0) {
  const offset = (element) => {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  const elementOnFocus = () => {
    for (let i = 0; i < animateBloks.length; i++) {
      const animateElement = animateBloks[i];
      const animateElementHeight = animateElement.offsetHight;
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
  window.addEventListener("scroll", elementOnFocus);
  setTimeout(() => {
    elementOnFocus();
  }, durationToStart);
}
