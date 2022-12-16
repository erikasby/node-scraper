'use strict';

const NewsArticle = require('../../models/NewsArticle');
const User = require('../../models/User');

exports.loadMoreNews = async (req, res, next) => {
    let currentArticleNumber = req.query.currentArticleNumber;

    // const category = req.headers.split('/').pop();
    // const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);

    //
    // Saving the count number at the frontend load-more-news.js file
    //

    // db.collection.find().skip(db.collection.count() - 10);

    const newsArticles = await NewsArticle.find().sort({date: -1}).skip(currentArticleNumber).limit(15).exec();

    res.json(newsArticles);
};
