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
    modalLink.addEventListener("click", function (e) {
        let popupId = modalLink.dataset.modalLink;

        if (popupId !== undefined) {
            let modal = doc.getElementById(popupId);
            showOrHideModal(modal);
        }
    });
}

let modalClosers = doc.querySelectorAll('.modal-closer');
for (const modalCloser of modalClosers) {
    modalCloser.addEventListener("click", function (e) {
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
    modalElement.addEventListener("click", function (e) {

        // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
        if (!e.target.closest('.modal-window__content')) {
            closeModal(modalElement, true);
        }
    })
}

function closeModal(modalWindow, bodyIsScrollable) {
    if (unlock) {
        modalWindow.classList.remove("active");

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

doc.addEventListener('keydown', function (key) {
    if (key.code === 'Escape') {
        let activeModal = doc.querySelector('.modal-window.active');
        closeModal(activeModal, true);
    }
});

;
function showOrHideFullscreenNav(e) {
    const fsNavmenu = doc.querySelector('.fullscreen-navmenu');
    let sbWidth = innerWindowWidth() - doc.querySelector('html').clientWidth;
    let header = doc.querySelector('header');

    if (fsNavmenu !== undefined) {
        burger.classList.toggle('active');
        
        body.classList.toggle('fixed');
        body.style.paddingRight = sbWidth + 'px';

        header.classList.toggle('fixed-header');
        header.style.paddingRight = sbWidth + 'px';

        fsNavmenu.classList.toggle('active');
    }
}
const burger = doc.getElementById('burgerButton');
burger.addEventListener('click', showOrHideFullscreenNav);;


function showOrHideSubmenu(e) {
    const menuButton = e.target;
    const allSubmenu = doc.querySelectorAll('.navmenu__submenu');
    const allMenuButtons = doc.querySelectorAll('.submenu-open-button');

    // Hides all previously active menus and menu buttons.
    for (let i = 0; i < allSubmenu.length; i++) {

        if (allSubmenu[i] !== menuButton.firstElementChild &&
            allMenuButtons[i] !== menuButton) {

            allMenuButtons[i].classList.remove('show');
            allSubmenu[i].classList.remove('show');
        }
    }

    if (menuButton.firstElementChild !== undefined) {
        menuButton.classList.toggle('active');
        menuButton.firstElementChild.classList.toggle('show');
    }
}
const activateSubmenuButtons = doc.querySelectorAll('.submenu-open-button');
for (let submenuButton of activateSubmenuButtons) {
    submenuButton.addEventListener('click', showOrHideSubmenu);
}

// ? Use this if you have scroll buttons.
function scrollToElement(eventData) {
    let scrollElement = doc.querySelector('.' + eventData.target.dataset.scrollTo);

    if (scrollElement !== undefined) {
        let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;

        window.scrollTo({
            top: scrolltop - 50,
            behavior: "smooth"
        });
    }
}
let scrollButtons = doc.querySelectorAll('[data-scroll-to]');
for (let scrollButton of scrollButtons) {
    scrollButton.addEventListener('click', scrollToElement);
}

/* ? the headerToFixed function
function headerToFixed(e) {
    // Calculating the degree of scrolling in pixels,
    // multiply the innerWindowHeight by the desired scrolling percentage as 0.percent.
    // Example:
    //  25 percent of innerWindowHeight = innerWindowHeight * 0.25
    //  5 percent of 700 = 700 * 0.05

    var scrollPercentage = innerWindowHeight * 0.15;

    if (pageYOffset > scrollPercentage) {
        burger.classList.add('burger-black');
        header.classList.add('fixed-header');
    } else {
        burger.classList.remove('burger-black');
        header.classList.remove('fixed-header');
    }
}
const header = doc.querySelector('.header__body');
window.addEventListener('scroll', headerToFixed);
*/
