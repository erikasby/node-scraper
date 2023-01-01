'use strict';

const articlesComponent = document.querySelector('.articles__articles');

articlesComponent.addEventListener('click', async (e) => {
    const clickedButton = e.target;

    if (clickedButton.className.includes('heart')) {
        const article = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const learnMoreButton = article.children[3];
        const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];

        const url = `/api/like?articleId=${documentId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data === 'Added') {
            clickedButton.className = 'fa-solid fa-heart';
        } else if (data === 'Removed') {
            clickedButton.className = 'fa-regular fa-heart';
        }
    } else if (clickedButton.className.includes('star')) {
        const article = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const learnMoreButton = article.children[3];
        const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];

        const url = `/api/favorite?articleId=${documentId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data === 'Added') {
            clickedButton.className = 'fa-solid fa-star';
        } else if (data === 'Removed') {
            clickedButton.className = 'fa-regular fa-star';
        }
    } else if (clickedButton.className.includes('button__comments')) {
        const article = e.target.parentElement;
        const learnMoreButton = article.children[3];
        const modal = article.children[5];
        const commentsComponent = modal.children[1];
        const overlay = article.children[6];
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
    } else if (clickedButton.className.includes('modal__close')) {
        const article = e.target.parentElement.parentElement;
        const modal = article.children[5];
        const overlay = article.children[6];

        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow');
    } else if (clickedButton.className.includes('overlay')) {
        const article = e.target.parentElement;
        const modal = article.children[5];
        const overlay = article.children[6];

        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow');
    } else if (clickedButton.className.includes('modal__new_comment')) {
        const article = e.target.parentElement.parentElement.parentElement;
        const commentsComponent = e.target.parentElement.parentElement.children[1];
        const learnMoreButton = article.children[3];
        const documentId = learnMoreButton.className.split(' ')[0].split('-')[1];
        const commentValue = e.target.parentElement.children[0].value;

        console.log(commentsComponent);

        if (commentValue.length <= 50) {
            const url = `/api/comment?articleId=${documentId}&comment=${commentValue}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data == 'User not found') {
            } else if (data == 'Length overflow') {
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
    }
});

function generateHtmlForComments(commentsComponent, comments) {
    // <div class="comment">
    //             <div class="comment__user">
    //                 <div class="comment__username">Erikas1</div>
    //             </div>
    //             <div class="comment__comment">
    //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio odit pariatur nemo dolores maxime,
    //                 quos officiis consequuntur. Magni ipsum explicabo non, vel eum voluptate.
    //             </div>
    //         </div>

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
