@@include("../js/accordion.js");
/* eslint-disable max-len */

// ANIMATION
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
				left: rect.left + scrollLeft
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
			if (isScrolling == false) {
				window.requestAnimationFrame(function () {
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
}


// HEADER
const menuHandler = () => {
	const burgerButtom = document.querySelector('.burger');
	const changeClass = (event) => {
		event.preventDefault()
		const target = event.target;
		const header = target.closest('.header')
		const html = document.getElementsByTagName('html')[0];

		if (header) {
			header.classList.toggle('_menu-open');
			html.classList.toggle('_fixed');
		}
	}

	burgerButtom.addEventListener('click', changeClass)
}

// VALIDATION
const VALIDATOR_LARGE = {
	inputs: [...document.forms.largeForm.getElementsByTagName('input')],
	form: document.forms.largeForm,
	button: document.forms.largeForm.querySelector('button[type="submit"]'),
}

const VALIDATOR_AVERAGE = {
	inputs: [...document.forms.averageForm.getElementsByTagName('input')],
	form: document.forms.averageForm,
	button: document.forms.averageForm.querySelector('button[type="submit"]'),
}

const VALIDATOR_MEDIUM = {
	inputs: [...document.forms.mediumForm.getElementsByTagName('input')],
	form: document.forms.mediumForm,
	button: document.forms.mediumForm.querySelector('button[type="submit"]'),
}

const VALIDATION_POPUP_FORM = {
	inputs: [...document.forms.popupForm.getElementsByTagName('input')],
	form: document.forms.popupForm,
	button: document.forms.popupForm.querySelector('button[type="submit"]'),
}

class FormValidator {
	constructor({
		inputs,
		form,
		button
	}) {
		this.inputs = inputs;
		this.button = button;
		this.form = form;
		this.listener()
	}

	statusForm() {
		let flag = true;
		this.inputs.forEach((input) => {
			if (!this.checkInputValidity(input)) flag = false;
			return flag;
		});
		this.setSubmitButtonState(flag, this.button)
	}

	checkInputValidity(input) {
		if (input.validity.tooShort === true) {
			return false;
		}
		if (input.validity.valueMissing === true) {
			return false;
		}
		if (input.validity.patternMismatch === true) {
			return false;
		}
		return true;
	}

	setSubmitButtonState(flag, button) {
		if (flag === true) {
			button.removeAttribute('disabled');
		} else {
			button.setAttribute('disabled', true);
		}
	}
	listener() {
		this.form.addEventListener('input', this.statusForm.bind(this))
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


// POPUP
// Изменять request при невалидных запросах
const popup = (request = true) => {
	const allPopupElements = [...document.querySelectorAll('[data-popup]')];
	const poupButtonArray = [...document.querySelectorAll('._popup-close')];


	const popupNames = {
		successful: "successful",
		callUs: "callUs"
	}
	if (allPopupElements && poupButtonArray) {
		allPopupElements.forEach(popupEl => {
			popupEl.addEventListener('click', popupHandler)
		});
		poupButtonArray.forEach(popupEl => {
			popupEl.addEventListener('click', popupClose)
		});

		function popupHandler(event) {
			event.preventDefault();

			const target = event.currentTarget
			const attributePopup = target.getAttribute('data-popup');

			const {
				successful,
				callUs
			} = popupNames

			// Проверяем успешен ли ответ от сервера
			if (attributePopup === successful && request) {
				const successfulPopup = document.querySelector('.successful-popup')
				popupOpen(successfulPopup);
				popupClose(event);
			}
			if (attributePopup === callUs) {
				const requestPopup = document.querySelector('.request-popup')
				popupOpen(requestPopup)
			}
		}

		function popupClose(event) {
			const popupContainer = searchParent(event.target, '._popup')
			popupContainer.classList.remove('_open');
		}

		function popupOpen(elementOpen) {
			elementOpen.classList.add('_open');
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
}

// stikyBlock
const stikyBlock = () => {
	const mainContainer = document.querySelector('._stickyContainer');
	const numberOfElements = 5;
	if (mainContainer) {
    getClass()
		const offset = (element) => {
			const rect = element.getBoundingClientRect();
			const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return {
				top: rect.top + scrollTop,
				left: rect.left + scrollLeft
			};
		};

		const mainContainerHeight = mainContainer.offsetHeight;
		const heightToStartSwiping = mainContainerHeight / numberOfElements;
    const endPointAnimation = mainContainerHeight - heightToStartSwiping;
		let counter = 0;
		let index = 0;
		let oldScrollTopPosition = 0;
		let flag = true;

		function scrollWatcher() {
      const mainContainerOffset = offset(mainContainer).top;
			if ((window.pageYOffset > mainContainerOffset) && window.pageYOffset < (mainContainerOffset + mainContainerHeight)) {
				watch()
			} else return

			function onScroll() {
				const scrollTopPosition = document.documentElement.scrollTop;
				if (oldScrollTopPosition > scrollTopPosition) {
					flag = false;
				} else {
					flag = true;
				}
				oldScrollTopPosition = scrollTopPosition;
				return flag
			}

			function watch() {
        onScroll()
				if (window.pageYOffset - mainContainerOffset > counter && flag === true && counter < endPointAnimation) {
					index++;
					counter += heightToStartSwiping;
					if (index <= numberOfElements && index >= 0) {
						getClass(index)
					}
				} else if (window.pageYOffset - mainContainerOffset < counter && flag === false) {
					index--;
					counter -= heightToStartSwiping;
					if (index <= numberOfElements && index >= 0) {
						getClass(index)
					}
				}
			}
		}

		function getClass(indexEl = 0) {
			const swipeBloks = mainContainer.querySelectorAll('._stickySwipeElement');
			swipeBloks.forEach((block, index) => {
				if (index === indexEl) {
					block.classList.add('_active')
				} else {
					block.classList.remove('_active')
				}
			});
		}
		window.addEventListener('scroll', scrollWatcher)
	}
}

document.addEventListener("DOMContentLoaded", () => {
	menuHandler();
	animation();
	popup();
	stikyBlock();
})