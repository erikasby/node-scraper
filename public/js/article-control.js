'use strict';

const articlesComponent = document.querySelector('.articles__articles');

articlesComponent.addEventListener('click', async (e) => {
    const clickedButton = e.target;

    const userUrl = `/api/get-user-info`;
    const userResponse = await fetch(userUrl);
    const userData = await userResponse.json();

    if (clickedButton.className.includes('heart')) {
        const article = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        let learnMoreButton;

        if (userData == 'User not found') {
            fixedErrorMessage('User is not logged in');
        } else {
            if (userData.role == 'admin') learnMoreButton = article.children[4];
            else learnMoreButton = article.children[3];
            const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];

            const url = `/api/like?articleId=${documentId}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data === 'Added') {
                clickedButton.className = 'fa-solid fa-heart';
                fixedErrorMessage('Liked');
            } else if (data === 'Removed') {
                clickedButton.className = 'fa-regular fa-heart';
                fixedErrorMessage('Unliked');
            }
        }
    } else if (clickedButton.className.includes('star')) {
        const article = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        let learnMoreButton;

        if (userData == 'User not found') {
            fixedErrorMessage('User is not logged in');
        } else {
            if (userData.role == 'admin') learnMoreButton = article.children[4];
            else learnMoreButton = article.children[3];
            const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];

            const url = `/api/favorite?articleId=${documentId}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data === 'Added') {
                clickedButton.className = 'fa-solid fa-star';
                fixedErrorMessage('Favorited');
            } else if (data === 'Removed') {
                clickedButton.className = 'fa-regular fa-star';
                fixedErrorMessage('Unfavorited');
            }
        }
    } else if (clickedButton.className.includes('button__comments')) {
        const article = e.target.parentElement;
        let learnMoreButton;
        let modal;
        let overlay;
        if (userData.role == 'admin') {
            learnMoreButton = article.children[4];
            modal = article.children[6];
            overlay = article.children[7];
        } else {
            learnMoreButton = article.children[3];
            modal = article.children[5];
            overlay = article.children[6];
        }
        const commentsComponent = modal.children[1];
        const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];

        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow');

        if (!modal.className.includes('hidden')) {
            const url = `/api/get-comments?articleId=${documentId}`;
            const res = await fetch(url);
            const data = await res.json();

            data.reverse();

            generateHtmlForComments(commentsComponent, data);
        }
    } else if (clickedButton.className.includes('comment_modal__close')) {
        const article = e.target.parentElement.parentElement;
        let modal;
        let overlay;
        if (userData.role == 'admin') {
            modal = article.children[6];
            overlay = article.children[7];
        } else {
            modal = article.children[5];
            overlay = article.children[6];
        }

        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow');
    } else if (clickedButton.className.includes('comment_overlay')) {
        const article = e.target.parentElement;
        let modal;
        let overlay;
        if (userData.role == 'admin') {
            modal = article.children[6];
            overlay = article.children[7];
        } else {
            modal = article.children[5];
            overlay = article.children[6];
        }

        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow');
    } else if (clickedButton.className.includes('edit_modal__close')) {
        const article = e.target.parentElement.parentElement.parentElement;
        const modal = article.children[0].children[2];
        const overlay = article.children[0].children[3];

        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow');
    } else if (clickedButton.className.includes('edit_overlay')) {
        const article = e.target.parentElement.parentElement;
        const modal = article.children[0].children[2];
        const overlay = article.children[0].children[3];

        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow');
    } else if (clickedButton.className.includes('modal__new_comment')) {
        const article = e.target.parentElement.parentElement.parentElement;
        const commentsComponent = e.target.parentElement.parentElement.children[1];
        let learnMoreButton;
        if (userData.role == 'admin') learnMoreButton = article.children[4];
        else learnMoreButton = article.children[3];
        const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];
        const commentValue = e.target.parentElement.children[0].value;

        console.log(commentValue);

        if (commentValue.length > 0 && commentValue.length <= 50) {
            const url = `/api/comment?articleId=${documentId}&comment=${commentValue}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data == 'User not found') {
                fixedErrorMessage('User is not logged in');
            } else if (data == 'Length overflow') {
                fixedErrorMessage('Comment can be min 1 or max 50 characters');
            } else if (data == 'Added') {
                const url = `/api/get-user-info`;
                const res = await fetch(url);
                const data = await res.json();

                let div = document.createElement('div');

                div.innerHTML = `
                <div class="comment">
                    <div class="comment_user">
                        <div class="comment__username">${data.username}</div>
                    </div>
                    <div class="comment__comment">${commentValue}</div>
                </div>
                `;

                commentsComponent.prepend(div);
            }
        }
    } else if (clickedButton.className.includes('pen-to-square')) {
        const article = e.target.parentElement.parentElement.parentElement;
        const modal = article.children[0].children[2];
        const overlay = article.children[0].children[3];

        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow');
    } else if (clickedButton.className.includes('modal__update')) {
        const article = e.target.parentElement.parentElement.parentElement;
        console.log(article);
        let learnMoreButton;
        if (userData.role == 'admin') learnMoreButton = article.children[4];
        else learnMoreButton = article.children[3];
        const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];
        const modal = article.children[0].children[2];
        const overlay = article.children[0].children[3];
        const title = article.children[3];
        let newTitle = modal.children[1].children[3].value;
        const image = article.children[2];
        let newImage = modal.children[1].children[1].value;

        console.log(modal);

        const url = `/api/update-article?articleId=${documentId}&image=${newImage}&title=${newTitle}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data == 'User not found') {
            fixedErrorMessage('User is not logged in');
        } else if (data == 'User is not admin') {
            fixedErrorMessage('User is not logged in as admin');
        } else if (data == 'Updated') {
            title.innerText = newTitle;
            image.src = newImage;

            fixedErrorMessage('Updated');

            modal.classList.toggle('hidden');
            overlay.classList.toggle('hidden');
            document.body.classList.toggle('overflow');
        }
    }
});

function generateHtmlForComments(commentsComponent, comments) {
    let html = '';

    comments.forEach((comment) => {
        html += `
        <div class="comment">
            <div class="comment_user">
                <div class="comment__username">${comment.author.username}</div>
            </div>
            <div class="comment__comment">${comment.value}</div>
        </div>
        `;
    });

    commentsComponent.innerHTML = html;
}

function fixedErrorMessage(message) {
    const errorComponent = document.querySelector('.fixed_error_message');

    console.log(errorComponent);

    errorComponent.innerText = message;
    errorComponent.classList.toggle('hidden');

    setTimeout(() => errorComponent.classList.toggle('hidden'), 2000);
}
