const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
        required: true,
    },
    likedBy: {
        type: Array,
        default: [],
        required: true,
    },
    commentsCount: {
        type: String,
        default: 0,
        required: true,
    },
    comments: {
        type: Array,
        default: [],
        required: true,
    },
    watchCount: {
        type: Number,
        default: 0,
        required: true,
    },
});

newsArticleSchema.index({title: 'text', company: 'text'});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);
