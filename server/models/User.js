const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    favorites: {
        type: Array,
    },
    liked: {
        type: Array,
    },
    pictureLink: {
        type: String,
    },
    age: {
        type: String,
    },
    gender: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
    lastLogin: {
        type: Date,
    },
});

userSchema.index({username: 'text', email: 'text'});

module.exports = mongoose.model('User', userSchema);
