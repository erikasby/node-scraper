const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    secondaryTitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
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

articleSchema.index({title: 'text', category: 'text'});

module.exports = mongoose.model('Article', articleSchema);
