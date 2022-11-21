'use strict';

const hero = document.querySelector('.hero__container');
const infoCards = document.querySelectorAll('.info-card__container');

setInterval(() => {
    hero.classList.add('unhidden');

    infoCards.forEach((infoCard) => {
        if (isInViewport(infoCard)) infoCard.classList.add('unhidden');
    });
}, 50);

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();

    if (window.innerWidth >= '1072')
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom - 200 <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    else {
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom - 400 <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};
