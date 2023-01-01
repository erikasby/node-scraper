'use strict';

const express = require('express');

const mainController = require('../controllers/mainController');
const articleController = require('../controllers/articles/articleController');
const articleAdminController = require('../controllers/articles/articleAdminController');
const articleHelpers = require('../controllers/articles/articleHelpers');
const authController = require('../controllers/authController');
const websitesController = require('../controllers/websitesController');

const isLoggedIn = require('../middlewares/isLoggedIn');
const isLoggedOut = require('../middlewares/isLoggedOut');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', mainController.getIndex);

// Auth routes
router.get('/login', isLoggedIn, authController.getLogin);
router.post('/login', isLoggedIn, authController.postLogin);
router.get('/register', isLoggedIn, authController.getRegister);
router.post('/register', isLoggedIn, authController.postRegister);
router.post('/logout', isLoggedOut, authController.postLogout);

// Article main routes
router.get('/news/press', articleController.getPress);
router.get('/news/press/:articleId', articleController.getPressArticle);
router.get('/news/business', articleController.getBusiness);
router.get('/news/business/:articleId', articleController.getBusinessArticle);
router.get('/news/technology', articleController.getTechnology);
router.get('/news/technology/:articleId', articleController.getTechnologyArticle);
router.get('/news/lifestyle', articleController.getLifestyle);
router.get('/news/lifestyle/:articleId', articleController.getLifestyleArticle);

router.get('/news/', websitesController.getNewsArticles);

// Article interactions
// router.get('/news/:articleId/likes', articleController.getArticleLikes);
// router.post('/news/:articleId/likes/:userId', articleController.postArticleLikeByUserId);
// router.get('/news/:articleId/comments', articleController.getArticleComments);
// router.post('/news/:articleId/comments/:commentId/:userId', articleController.postArticleCommentByUserId);

// Article admin routes
router.get('/news/new', isLoggedOut, isAdmin, articleAdminController.getCreateArticle);
router.post('/news/new', isLoggedOut, isAdmin, articleAdminController.postCreateArticle);
router.get('/news/:id/edit', isLoggedOut, isAdmin, articleAdminController.getEditArticle);
router.post('/news/:id/edit', isLoggedOut, isAdmin, articleAdminController.postEditArticle);

// APIs
router.get('/api/load-more-news', articleHelpers.loadMoreNews);
router.get('/api/get-user-info', articleHelpers.getUserInfo);
router.get('/api/like', articleHelpers.likeArticle);
router.get('/api/favorite', articleHelpers.favoriteArticle);
router.get('/api/get-comments', articleHelpers.getComments);
router.get('/api/comment', articleHelpers.comment);

module.exports = router;
