'use strict';

const Article = require('../../models/Article');
const User = require('../../models/User');

exports.loadMoreNews = async (req, res, next) => {
    let lastArticleId = req.query.doc;

    const category = req.headers.referer.split('/').pop();
    const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);

    const articles = await Article.find({category: categoryCapitalized, _id: {$lt: lastArticleId}})
        .sort({_id: -1})
        .populate({
            path: 'author',
            model: 'User',
        })
        .limit(9)
        .exec();

    res.json(articles);
};
