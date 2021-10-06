/* eslint-disable max-len */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-plusplus */
const stikyBlock = () => {
  const mainContainer = document.querySelector("._stickyContainer");
  if (mainContainer) {
    const numberOfElements = mainContainer.getAttribute("data-count");
    function getClass(indexEl = 0) {
      const swipeBloks = mainContainer.querySelectorAll("._stickySwipeElement");
      const anotherSwipeBlocks = mainContainer.querySelectorAll("._anotherStickySwipeElement");
      swipeBloks.forEach((block, index) => {
        if (index === indexEl) {
          block.classList.add("_active");
        } else {
          block.classList.remove("_active");
        }
      });
      anotherSwipeBlocks.forEach((block, index) => {
        if (index === indexEl) {
          block.classList.add("_active");
        } else {
          block.classList.remove("_active");
        }
      });
    }
    getClass();
    const offset = (element) => {
      const rect = element.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
      };
    };

    const mainContainerHeight = mainContainer.offsetHeight;
    let heightToStartSwiping = mainContainerHeight / numberOfElements;
    const endPointAnimation = mainContainerHeight - heightToStartSwiping;
    heightToStartSwiping = endPointAnimation / numberOfElements;
    let counter = 0;
    let index = -1;
    let oldScrollTopPosition = 0;
    let flag = true;

    function scrollWatcher() {
      const mainContainerOffset = offset(mainContainer).top;

      function onScroll() {
        const scrollTopPosition = document.documentElement.scrollTop;
        if (oldScrollTopPosition > scrollTopPosition) {
          flag = false;
        } else {
          flag = true;
        }
        oldScrollTopPosition = scrollTopPosition;
        return flag;
      }

      function watch() {
        onScroll();
        if ((window.pageYOffset - mainContainerOffset) + heightToStartSwiping > counter + heightToStartSwiping && flag === true && counter < endPointAnimation) {
          index++;
          counter += heightToStartSwiping;
          if (index <= numberOfElements && index >= 0) {
            getClass(index);
          }
        } else if ((window.pageYOffset - mainContainerOffset) + heightToStartSwiping < counter && flag === false) {
          index--;
          counter -= heightToStartSwiping;
          if (index <= numberOfElements && index >= 0) {
            getClass(index);
          }
        }
      }
      if ((window.pageYOffset > mainContainerOffset) && window.pageYOffset < (mainContainerOffset + mainContainerHeight)) {
        watch();
      }
    }
    window.addEventListener("scroll", scrollWatcher);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  stikyBlock();
});
