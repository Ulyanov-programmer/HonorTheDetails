'use strict'

let body = document.body;
let doc = document;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;


// ? If you see an error here, it's normal.
// Variables for work modal window 
// ! I don`t recommend to use references for open and close modal windows.

let modalLinks = doc.querySelectorAll('[data-modal-link]');

for (let modalLink of modalLinks) {
    modalLink.addEventListener("click", () => {
        let modalId = modalLink.dataset.modalLink;

        if (modalId !== undefined) {
            let modal = doc.getElementById(modalId);
            showOrHideModal(modal);
        }
    });
}

let modalClosers = doc.querySelectorAll('.modal-closer');
for (const modalCloser of modalClosers) {
    modalCloser.addEventListener("click", () => {
        closeModal(modalCloser.closest('.modal-window'), true);
    });
}

// When the body loses scrolling, the page may shift.
// To fix this, it will be padded in the size of the scrollbar.
function returnScrollbarWidth() {
    let scrollbarWidth = innerWindowWidth() - doc.querySelector('html').clientWidth;

    return scrollbarWidth;
}

// This is to prevent the new modal from opening too quickly.
let unlock = true;

// Transition time FROM modal window style (in seconds or .number).
const transitionTimeout = 0.5;


function showOrHideModal(modalElement) {
    if (modalElement && unlock) {
        let activeModal = doc.querySelector('.modal-window.active');

        if (activeModal) {
            closeModal(activeModal, false);
        } else {
            toggleBodyScroll(false);
        }

        modalElement.classList.add("active");
    }
    modalElement.addEventListener("click", (e) => {

        // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
        if (!e.target.closest('.modal-window__content')) {
            closeModal(modalElement, true);
        }
    })
}

function closeModal(modalWindow, bodyIsScrollable) {
    if (unlock) {
        let video = document.querySelector('iframe');
        let videoClone = video.cloneNode(true);

        modalWindow.classList.remove("active");
        setTimeout(() => {
            video.insertAdjacentElement('afterend', videoClone);
            video.remove();
        }, 300);

        if (bodyIsScrollable) {
            toggleBodyScroll(true);
        }
    }
}
function toggleBodyScroll(toggleScrollOn) {

    if (toggleScrollOn) {
        body.style.paddingRight = 0;
        body.classList.remove("fixed");
    } else {
        body.style.paddingRight = returnScrollbarWidth() + 'px';
        body.classList.add('fixed');
    }

    unlock = false;
    // Prevents a new window from opening too quickly.
    setTimeout(function () {
        unlock = true;
    }, transitionTimeout * 1000);
}

doc.addEventListener('keydown', (key) => {

    if (key.code === 'Escape') {
        let activeModal = doc.querySelector('.modal-window.active');
        closeModal(activeModal, true);
    }
});;


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