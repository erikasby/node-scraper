'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = async (req, res, next) => {
    try {
        res.render('login', {
            title: 'Login' + ' | BayBank - the best solution for both individuals and companies',
            path: '/login',
            active: 'Login',
        });
    } catch (error) {
        res.render('404', {
            title: '404' + ' | BayBank - the best solution for both individuals and companies',
            path: '/404',
            active: '',
        });
    }
};

exports.getRegister = async (req, res, next) => {
    try {
        res.render('register', {
            title: 'Register',
            path: '/register',
            active: 'Register',
        });
    } catch (error) {
        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};

exports.postLogin = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const isValidated = validateLogin(username, password);

        if (isValidated) {
            const user = await User.findOne({username: username});
            const doMatch = await bcrypt.compare(password, user.password);

            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;

                req.session.save((error) => {
                    console.log(error);

                    res.redirect('/');
                });
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error);

        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};

exports.postRegister = async (req, res, next) => {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const repeatedPassword = req.body.repeatedPassword;

        const isValidated = validateRegister(email, username, password, repeatedPassword);

        if (isValidated) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const isUser = await User.findOne({email: email, username: username});

            if (!isUser) {
                const currentDate = new Date().toUTCString();

                const user = await User.create({
                    email: email,
                    username: username,
                    password: hashedPassword,
                    role: 'basic',
                    createdAt: currentDate,
                    updatedAt: currentDate,
                });

                res.redirect('/login');
            } else {
                res.redirect('/register');
            }
        } else res.redirect('/register');
    } catch (error) {
        console.log(error);

        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((error) => {
        console.error(error);

        res.redirect('/');
    });
};

// Helpers
function validateLogin(username, password) {
    const isValidatedUsername = validateUsername(username);
    const isValidatedPassword = validatePassword(password);

    if (isValidatedUsername && isValidatedPassword) return true;
    else return false;
}

function validateRegister(email, username, password, repeatedPassword) {
    const isValidatedEmail = validateEmail(email);
    const isValidatedUsername = validateUsername(username);
    const isValidatedPassword = validatePassword(password);
    const isValidatedRepeatedPassword = password === repeatedPassword;

    if (isValidatedEmail && isValidatedUsername && isValidatedPassword && isValidatedRepeatedPassword) return true;
    else return false;
}

function validateEmail(email) {
    const regex = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');

    return regex.test(email);
}

function validateUsername(username) {
    const regex = new RegExp('[A-Za-z0-9]{3,20}');

    return regex.test(username);
}

function validatePassword(password) {
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,30}$');

    return regex.test(password);
}
