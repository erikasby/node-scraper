'use strict';

const articlesComponent = document.querySelector('.articles__articles');

articlesComponent.addEventListener('click', async (e) => {
    const reactionButton = e.target;
    const article = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    const learnMoreButton = article.children[3];
    const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];

    console.log(documentId);

    if (reactionButton.className.includes('heart')) {
        const url = `/api/like?articleId=${documentId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data === 'Added') {
            reactionButton.className = 'fa-solid fa-heart';
        } else if (data === 'Removed') {
            reactionButton.className = 'fa-regular fa-heart';
        }
    } else if (reactionButton.className.includes('star')) {
        const url = `/api/favorite?articleId=${documentId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data === 'Added') {
            reactionButton.className = 'fa-solid fa-star';
        } else if (data === 'Removed') {
            reactionButton.className = 'fa-regular fa-star';
        }
    }
});
