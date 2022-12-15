const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();

const db = require('./server/models/database');
const User = require('./server/models/User');

const csrfProtection = csrf();

const app = express();
const port = process.env.PORT || 3000;

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
});

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    }),
);

app.use(csrfProtection);

app.use(async (req, res, next) => {
    if (!req.session.user) return next();

    try {
        const user = User.findById(req.session.user._id);
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
    }
});

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/', require('./server/routes/router'));

app.use((req, res, next) => {
    res.render('404', {
        title: '404',
        path: '/404',
        active: '',
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
