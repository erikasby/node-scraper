'use strict';

const hamburger = document.querySelector('.header__hamburger');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const user = document.querySelector('.user');

hamburger.addEventListener('click', (event) => toggleHamburger(event));

const toggleHamburger = (event) => {
    nav.classList.toggle('nav--active');
    user.classList.toggle('user--active');
    hamburger.innerHTML === '☰' ? (hamburger.textContent = '✕') : (hamburger.textContent = '☰');
};
