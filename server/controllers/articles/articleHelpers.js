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
    const document = await User.findOne({_id: req.session.user._id, favorites: {articleId: documentId}});

    if (req.session.user && document) {
        await User.updateOne({_id: req.session.user._id}, {$pull: {favorites: {articleId: documentId}}});

        res.json('Removed');
    } else if (req.session.user && !document) {
        await User.updateOne({_id: req.session.user._id}, {$push: {favorites: {articleId: documentId}}});

        res.json('Added');
    } else {
        res.json('User is not logged in');
    }
};

exports.likeArticle = async (req, res, next) => {
    const documentId = req.query.articleId;
    const document = await User.findOne({_id: req.session.user._id, liked: {articleId: documentId}});

    console.log(document);

    if (req.session.user && document) {
        await User.updateOne({_id: req.session.user._id}, {$pull: {liked: {articleId: documentId}}});

        res.json('Removed');
    } else if (req.session.user && !document) {
        await User.updateOne({_id: req.session.user._id}, {$push: {liked: {articleId: documentId}}});

        res.json('Added');
    } else {
        res.json('User is not logged in');
    }
};

exports.getComments = async (req, res, next) => {
    const documentId = req.query.articleId;
    const document = await NewsArticle.findOne({_id: documentId})
        .populate({
            path: 'comments.author',
            model: 'User',
        })
        .exec();

    res.json(document.comments);
};

exports.comment = async (req, res, next) => {
    const documentId = req.query.articleId;
    const comment = req.query.comment;

    if (!req.session.user) {
        res.json('User not found');
    } else if (comment.length > 50) {
        res.json('Length overflow');
    } else {
        const commentObject = {
            author: req.session.user._id,
            value: comment,
        };

        await NewsArticle.updateOne({_id: documentId}, {$push: {comments: commentObject}});
        res.json('Added');
    }
};
