const amazon = require('./websites/amazon');
const facebook = require('./websites/facebook');
const linkedin = require('./websites/linkedin');
const microsoft = require('./websites/microsoft');
const spotify = require('./websites/spotify');
const zalando = require('./websites/zalando');

const NewsArticle = require('../models/NewsArticle');
const User = require('../models/User');

// GET Articles
exports.getNewsArticles = async (req, res, next) => renderArticles(req, res, next, '/news/', 'News');

// Helper functions
const renderArticles = async (req, res, next, path, category) => {
    try {
        const newsArticles = await NewsArticle.find().sort({date: -1}).limit(9).exec();

        let lastArticleId;
        if (newsArticles.length > 0) lastArticleId = newsArticles[newsArticles.length - 1].date;

        // TO DELETE
        // amazon.getData();
        // facebook.getData();
        // linkedin.getData();
        // microsoft.getData();
        // spotify.getData();
        // zalando.getData();

        res.render('articles', {
            title: category + ' | BayBank - the best solution for both individuals and companies',
            path: path,
            active: category,
            articles: newsArticles,
            lastArticleId: lastArticleId,
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
