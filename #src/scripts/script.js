'use strict'

let body = document.body;
let doc = document;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;


// ? If you see an error here, it's normal.
@@include('_modalWindow.js');


// ? Use this if you have scroll buttons.
function scrollToElement(eventData) {
    let scrollElement = doc.querySelector('.' + eventData.target.dataset.scrollTo);

    if (scrollElement !== undefined) {
        let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;

        window.scrollTo({
            top: scrolltop,
            behavior: "smooth"
        });
    }
}
let scrollButtons = doc.querySelectorAll('[data-scroll-to]');
for (let scrollButton of scrollButtons) {
    scrollButton.addEventListener('click', scrollToElement);
}

function closeSlideInfo(eArgs) {
    let infoBlock = eArgs.currentTarget.offsetParent;
    infoBlock.remove();
}
const closeButtons = document.querySelectorAll('.slide-info__close');
for (const closeButton of closeButtons) {
    closeButton.addEventListener('click', closeSlideInfo);
}