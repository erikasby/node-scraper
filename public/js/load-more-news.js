'use strict';

const button = document.querySelector('.load-more');
const articles = document.querySelector('.articles__articles');
const articlesLoadContainer = document.querySelector('.articles__load-container');

button.addEventListener('click', () => loadMoreNews());

async function loadMoreNews() {
    try {
        // This variable holds ID of the last article on the page, it is needed for fetching next 9 articles
        const lastArticleId = getClassNameFromButton(button, 'doc-');

        console.log(lastArticleId);

        const url = `/api/load-more-news?doc=${lastArticleId}`;

        await fetch(url);
        const res = await fetch(url);
        const data = await res.json();

        data.forEach((article) => generateHtmlForArticle(articles, article));

        const newLastArticleId = data[data.length - 1]._id;

        if (data.length >= 9) changeClassNameForButton(button, `doc-${lastArticleId}`, `doc-${newLastArticleId}`);
        else articlesLoadContainer.innerHTML = `<p class="articles__nothing"><em>Yet to be more articles.</em></p>`;
    } catch (error) {
        console.error(error);
    }
}

function changeClassNameForButton(button, oldClassName, newClassName) {
    const buttonClassName = button.classList.value
        .split(' ')
        .filter((word) => word.includes(oldClassName))[0]
        .split('-')[1];

    button.classList.remove(buttonClassName);
    button.classList.add(newClassName);
}

function getClassNameFromButton(button, className) {
    return button.classList.value
        .split(' ')
        .filter((word) => word.includes(className))[0]
        .split('-')[1];
}

function generateHtmlForArticle(articles, article) {
    const newArticle = document.createElement('article');
    newArticle.classList.add('articles__article');

    article.updatedAt = new Date(article.updatedAt).toDateString();

    newArticle.innerHTML = `
    <div class="article__header">
    ${
        article.author.pictureLink
            ? '<img class="article__pictureLink" src="${article.author.pictureLink}" alt="Profile picture" />'
            : '<div class="article__pictureLink"></div>'
    }
        <div class="article__data">
            <div class="article__split">
                <p class="article__username">${article.author.username}</p>
                <div class="article__watches"><i class="fa-solid fa-eye"></i> ${article.watchCount}</div>
                <div class="article__likes"><i class="fa-solid fa-heart"></i> ${article.likesCount}</div>
            </div>
            <div class="article__split">
                <p class="article__updatedAt">${article.updatedAt}</p>
                <p class="article__sub-category">${article.subCategory}</p>
            </div>
        </div>
    </div>
    <img class="articles__img" src="${article.imageLink}" alt="" />
    <h2 href="#" class="articles__article-title">${article.title}</h2>
    <h3 href="#" class="articles__article-secondary-title">${article.secondaryTitle}</h3>
    <a href="/news/press/${article._id}" class="articles__link button button--small doc-${article._id}">Learn more</a>
        `;

    articles.appendChild(newArticle);
}
