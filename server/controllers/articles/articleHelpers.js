'use strict';

const NewsArticle = require('../../models/NewsArticle');
const User = require('../../models/User');

exports.loadMoreNews = async (req, res, next) => {
    let lastArticleId = req.query.doc;

    // const category = req.headers.split('/').pop();
    // const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);

    //
    // I should safe all needed ids and search by Not equals mongoose and sort by date afterwards
    //

    const newsArticles = await NewsArticle.find({date: {$lte: lastArticleId}})
        .sort({date: -1})
        .limit(9)
        .exec();

    res.json(newsArticles);
};
