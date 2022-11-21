'use strict';

const Article = require('../../models/Article');

const {parseAndSanitizeMarkdownToHTML, parseHTMLToMarkdown} = require('../../helpers');

exports.getCreateArticle = async (req, res, next) => {
    try {
        res.render('article-form', {
            title: 'New article' + ' | BayBank - the best solution for both individuals and companies',
            path: '/news/new',
            active: 'New article',
            isEdit: false,
        });
    } catch (error) {
        console.log(error);
        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};

exports.postCreateArticle = async (req, res, next) => {
    try {
        const title = req.body.title;
        const secondaryTitle = req.body.secondaryTitle;
        const category = req.body.category;
        const subCategory = req.body.subCategory;
        const imageLink = req.body.imageLink;
        let articleContent = req.body.articleContent;

        // Leaving for next time:
        // Create server side validation
        // if validation fails, redirect to same page with previous data filled in
        const isValidated = validateArticleForm(
            title,
            secondaryTitle,
            category,
            subCategory,
            imageLink,
            articleContent,
        );

        if (isValidated) {
            const currentDate = new Date().toUTCString();

            articleContent = parseAndSanitizeMarkdownToHTML(articleContent);

            const article = Article.create(
                {
                    author: req.session.user._id,
                    title: title,
                    secondaryTitle: secondaryTitle,
                    category: category,
                    subCategory: subCategory,
                    imageLink: imageLink,
                    content: articleContent,
                    createdAt: currentDate,
                    updatedAt: currentDate,
                },
                (error, doc) => {
                    if (error) res.redirect('/');
                    else res.redirect(`/news/${doc.category}/${doc._id.toHexString()}`);
                },
            );
        } else {
            // Add back content to the page
            res.redirect('/news/new');
        }
    } catch (error) {
        console.log(error);

        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};

exports.getEditArticle = async (req, res, next) => {
    try {
        const id = req.params.id;
        const article = await Article.findOne({_id: id});

        // Render article content from html as markdown
        article.content = parseHTMLToMarkdown(article.content);

        res.render('article-form', {
            title: 'Edit article' + ' | BayBank - the best solution for both individuals and companies',
            path: `/news/${id}/edit`,
            active: 'Edit article',
            isEdit: true,
            article: article,
        });
    } catch (error) {
        console.log(error);
        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};

exports.postEditArticle = async (req, res, next) => {
    try {
        const id = req.params.id;

        const title = req.body.title;
        const secondaryTitle = req.body.secondaryTitle;
        const category = req.body.category;
        const subCategory = req.body.subCategory;
        const imageLink = req.body.imageLink;
        let articleContent = req.body.articleContent;

        const isValidated = validateArticleForm(
            title,
            secondaryTitle,
            category,
            subCategory,
            imageLink,
            articleContent,
        );

        if (isValidated) {
            const currentDate = new Date().toUTCString();

            articleContent = parseAndSanitizeMarkdownToHTML(articleContent);

            Article.findOneAndUpdate(
                {_id: id},
                {
                    title: title,
                    secondaryTitle: secondaryTitle,
                    category: category,
                    subCategory: subCategory,
                    imageLink: imageLink,
                    content: articleContent,
                    updatedAt: currentDate,
                },
                (error, doc) => {
                    if (error) res.redirect('/');
                    else res.redirect(`/news/${doc.category}/${doc._id.toHexString()}`);
                },
            );
        } else {
            // Add back content to the page
            res.redirect('/news/new');
        }
    } catch (error) {
        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};

// Helper functions
function validateArticleForm(title, secondaryTitle, category, subCategory, imageLink, articleContent) {
    const isValidatedTitle = validateTitle(title);
    const isValidatedSecondaryTitle = validateSecondaryTitle(secondaryTitle);
    const isValidatedCategory = validateCategory(category);
    const isValidatedSubCategory = validateSubCategory(subCategory);
    const isValidatedImageLink = validateImageLink(imageLink);
    const isValidatedArticleContent = validateArticleContent(articleContent);

    if (isValidatedTitle && isValidatedSecondaryTitle && isValidatedImageLink && isValidatedArticleContent) return true;
    else return false;
}

const validateTitle = (title) => {
    if (title.length < 10) return false;

    return true;
};

const validateSecondaryTitle = (secondaryTitle) => {
    if (secondaryTitle.length < 10) return false;

    return true;
};

const validateCategory = (category) => {
    // If this array is getting changed, then it should be also changed on the frontend validation
    const categories = ['Technology', 'Business', 'Press', 'Lifestyle'];

    for (const cat of categories) {
        if (category === cat) return true;
    }

    return;
};

const validateSubCategory = (subCategory) => {
    if (subCategory.length < 3) return false;

    return true;
};

const validateImageLink = (imageLink) => {
    if (imageLink.length < 10 || imageLink.includes('http') === false) return false;

    return true;
};

const validateArticleContent = (articleContent) => {
    if (articleContent.length < 10) return false;

    return true;
};
