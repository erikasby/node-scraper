'use strict';

const textarea = document.getElementById('articleContent');

textarea.addEventListener('input', (event) => {
    textarea.style.height = textarea.scrollHeight + 'px';
});
