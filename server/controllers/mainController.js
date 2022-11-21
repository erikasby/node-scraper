'use strict';

const headings = [
    'Control your environment',
    'Stable high performance',
    'Make your transactions secure',
    'Perform your task anywhere, anytime',
];
const paragraphs = [
    'Our plugin system give you ability to see and perform tasks how you want in many different ways.',
    'Only 0.3% of the time in a year BayBank has low performance or is down completely. Other 99.7% of the time there is only pure speed!',
    'All transactions have history of who, when, why and how they were made all the time. There is simply no possibility of your funds getting hijacked.',
    'Want to get money transferred to your account on Sunday night in Seychelles? Let us make that happen in a matter of seconds.',
];
const img = ['team_work.svg', 'fast_working.svg', 'money_transfer.svg', 'relaxing.svg'];

const cards = [];

for (let i = 0; i < headings.length; i++) {
    cards.push({heading: headings[i], paragraph: paragraphs[i], img: img[i]});
}

// GET Home
exports.getIndex = async (req, res, next) => {
    try {
        res.render('index', {
            title: 'Home' + ' | BayBank - the best solution for both individuals and companies',
            path: '/',
            active: 'Home',
            cards: cards,
        });
    } catch (error) {
        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};
