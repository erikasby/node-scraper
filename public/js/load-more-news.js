'use strict';

const button = document.querySelector('.load-more');
const articles = document.querySelector('.articles__articles');
const articlesLoadContainer = document.querySelector('.articles__load-container');
const sortButton = document.querySelector('select');

// Count this number before every rest api call
let currentArticleNumber = 15;
let currentSortMethod = sortButton.value;
// There should be a variable responsible for showing which method is used
// let sortingBy = "Date"

sortButton.addEventListener('change', () => loadMoreNews());
button.addEventListener('click', () => loadMoreNews());

async function loadMoreNews() {
    try {
        // This variable holds ID of the last article on the page, it is needed for fetching next 9 articles
        // const lastArticleId = getClassNameFromButton(button, 'doc-');

        if (currentSortMethod !== sortButton.value) currentArticleNumber = 0;

        const articlesUrl = `/api/load-more-news?currentArticleNumber=${currentArticleNumber}&sort=${sortButton.value}`;
        const articlesResponse = await fetch(articlesUrl);
        const articlesData = await articlesResponse.json();

        const userUrl = `/api/get-user-info`;
        const userResponse = await fetch(userUrl);
        const userData = await userResponse.json();

        console.log(userData);

        if (currentSortMethod !== sortButton.value) {
            articles.innerHTML = '';

            articlesData.forEach((article) => {
                generateHtmlForArticle(articles, article, userData);
                currentArticleNumber++;
            });
        } else {
            articlesData.forEach((article) => {
                generateHtmlForArticle(articles, article, userData);
                currentArticleNumber++;
            });
        }

        currentSortMethod = sortButton.value;

        // const newLastArticleId = data[data.length - 1]._id;
        // changeClassNameForButton(button, `doc-${lastArticleId}`, `doc-${newLastArticleId}`);
        // else

        if (articlesData.length < 15)
            articlesLoadContainer.innerHTML = `<p class="articles__nothing"><em>Yet to be more articles.</em></p>`;
    } catch (error) {
        console.error(error);
    }
}

// function changeClassNameForButton(button, oldClassName, newClassName) {
//     const buttonClassName = button.classList.value
//         .split(' ')
//         .filter((word) => word.includes(oldClassName))[0]
//         .split('-')[1];

//     button.classList.remove(buttonClassName);
//     button.classList.add(newClassName);
// }

// function getClassNameFromButton(button, className) {
//     return button.classList.value
//         .split(' ')
//         .filter((word) => word.includes(className))[0]
//         .split('-')[1];
// }

function generateHtmlForArticle(articles, article, userData) {
    const newArticle = document.createElement('article');
    newArticle.classList.add('articles__article');

    article.date = new Date(article.date).toDateString();

    /*
<!-- prettier-ignore -->
                    <% if (user && user.favorites.includes(article._id)) {%>
                    <button type="button" class="article__likes"><i class="fa-solid fa-heart"></i></button>
                    <% } else { %>
                    <button type="button" class="article__likes"><i class="fa-regular fa-heart"></i></button>
                    <% } %>
                    <!-- prettier-ignore -->
                    <% if (user && user.liked.includes(article._id)) {%>
                    <button type="button" class="article__favorites"><i class="fa-solid fa-star"></i></button>
                    <% } else { %>
                    <button type="button" class="article__favorites"><i class="fa-regular fa-star"></i></button>
                    <% } %>
    */

    // <% if (user && user.liked.some(id => id.articleId == article.id)) {%>

    newArticle.innerHTML = `
    <div class="article__header">
    ${article.image ? '<img class="article__pictureLink"/>' : '<div class="article__pictureLink"></div>'}
        <div class="article__data">
            <div class="article__split article__options">
                <p class="article__username">${article.company}</p>
                <div class="article__additionals">
                    ${
                        userData !== 'User not found' && userData.liked.some((id) => id.articleId == article._id)
                            ? '<button type="button" class="article__likes"><i class="fa-solid fa-heart"></i></button>'
                            : '<button type="button" class="article__likes"><i class="fa-regular fa-heart"></i></button>'
                    }
                    ${
                        userData !== 'User not found' && userData.favorites.some((id) => id.articleId == article._id)
                            ? '<button type="button" class="article__favorites"><i class="fa-solid fa-star"></i></button>'
                            : '<button type="button" class="article__favorites"><i class="fa-regular fa-star"></i></button>'
                    }
                </div>
            </div>
            <div class="article__split">
                <p class="article__updatedAt">${article.date}</p>
            </div>
        </div>
    </div>
    <img class="articles__img" src="${article.image}" alt="" />
    <h2 href="#" class="articles__article-title">${article.title}</h2>
    <a href="${article.href}" class="doc-${article._id} articles__link button button--small">Learn more</a>
        `;

    articles.appendChild(newArticle);
}
