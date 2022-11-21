'use strict';

const likesButton = document.querySelector('.article__likesCount');
const likes = document.querySelector('.article__likes');
const likesCount = likesButton.textContent.trim();

const iconHTML = `<i class="fa-solid fa-heart"></i>`;

// Fix the whole evalutation system

likesButton.addEventListener('click', (event) => {
    useButton(likes, likesButton, temporaryLikeCountButton, 'like');
});

// Fix this function
const useButton = (articleId, userId) => {
    // if (buttonType === 'like') {
    //     countButton.classList.toggle('button--liked');
    //     countButton.classList.toggle('button--unliked');
    //     buttonToCheckValues = +countButton.textContent.trim();
    //     if (buttonToCheckValues === temporaryButton) {
    //         countButton.innerHTML = `<i class="fa-solid fa-heart"></i> ${++buttonToCheckValues}`;
    //         count.innerHTML = `<i class="fa-solid fa-heart"></i> ${buttonToCheckValues}`;
    //     } else {
    //         countButton.innerHTML = `<i class="fa-solid fa-heart"></i> ${--buttonToCheckValues}`;
    //         count.innerHTML = `<i class="fa-solid fa-heart"></i> ${buttonToCheckValues}`;
    //     }
    // }
};

const postButton = (button, buttonType) => {};

// const getLikesByArticleId = (articleId) => {
//     const articlesCount = document.querySelectorAll('.articles__article').length;

//     const url = `/api/load-likes?id=${articlesCount}`;

//     fetch(url)
//         .then((res) => res.text())
//         .then((data) => console.log(data))
//         .catch((error) => console.error(error));
// };

const postLike = (articleId, userId, button, counter) => {
    countButton.classList.toggle('button--liked');
    countButton.classList.toggle('button--unliked');
};

console.log(window.location.pathname.split('/').shift());
