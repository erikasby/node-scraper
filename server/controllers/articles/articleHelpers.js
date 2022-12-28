'use strict';

const NewsArticle = require('../../models/NewsArticle');
const User = require('../../models/User');

exports.loadMoreNews = async (req, res, next) => {
    let currentArticleNumber = req.query.currentArticleNumber;
    let currentSortMethod = req.query.sort;

    // const category = req.headers.split('/').pop();
    // const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);

    //
    // Saving the count number at the frontend load-more-news.js file
    //

    // db.collection.find().skip(db.collection.count() - 10);

    let newsArticles;

    if (currentSortMethod === 'date')
        newsArticles = await NewsArticle.find().sort({date: -1}).skip(currentArticleNumber).limit(15).exec();
    else if (currentSortMethod === 'name')
        newsArticles = await NewsArticle.find().sort({company: 1}).skip(currentArticleNumber).limit(15).exec();

    res.json(newsArticles);
};

exports.getUserInfo = async (req, res, next) => {
    if (!req.session.user) res.json('User not found');
    else {
        const user = await User.findOne({_id: req.session.user._id});
        res.json(user);
    }
};

exports.favoriteArticle = async (req, res, next) => {
    const documentId = req.query.articleId;
    const document = await User.findOne({favorites: {articleId: documentId}});

    if (req.session.user && document) {
        await User.updateOne({$pull: {favorites: {articleId: documentId}}});

        res.json('Removed');
    } else if (req.session.user && !document) {
        await User.updateOne({$push: {favorites: {articleId: documentId}}});

        res.json('Added');
    } else {
        res.json('User is not logged in');
    }
};

exports.likeArticle = async (req, res, next) => {
    const documentId = req.query.articleId;
    const document = await User.findOne({liked: {articleId: documentId}});

    if (req.session.user && document) {
        await User.updateOne({$pull: {liked: {articleId: documentId}}});

        res.json('Removed');
    } else if (req.session.user && !document) {
        await User.updateOne({$push: {liked: {articleId: documentId}}});

        res.json('Added');
    } else {
        res.json('User is not logged in');
    }
};
