'use strict';

const TurndownService = require('turndown');

const marked = require('marked');
const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');

marked.setOptions({
    breaks: true,
});

exports.getDateAndTime = (currentDate = new Date()) => {
    const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    const time = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
    return `${date} ${time}`;
};

exports.parseAndSanitizeMarkdownToHTML = (markdown) => {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const cleanHTML = DOMPurify.sanitize(marked.parse(markdown));
    return cleanHTML;
};

exports.parseHTMLToMarkdown = (html) => {
    const turndownService = new TurndownService({headingStyle: 'atx'});
    const markdown = turndownService.turndown(html);
    return markdown;
};
