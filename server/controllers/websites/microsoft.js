const puppeteer = require('puppeteer');
const NewsArticle = require('../../models/NewsArticle');

exports.getData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://devblogs.microsoft.com/engineering-at-microsoft/', {
        waitUntil: 'load',
    });

    await page.waitForSelector('.post .lazyloaded');

    const newsArticles = await page.$$eval('.post', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.entry-title a').href,
            date: e.querySelector('.entry-post-date').innerText,
            title: e.querySelector('.entry-title a').innerText,
            image: e.querySelector('.entry-image img').src,
            company: 'Microsoft',
        })),
    );

    newsArticles.forEach(async (newsArticle) => {
        try {
            const found = await NewsArticle.exists({title: newsArticle.title});

            if (!found) {
                // articleContent = parseAndSanitizeMarkdownToHTML(articleContent);

                if (newsArticle.image.includes(',') || newsArticle.image.includes(';'))
                    newsArticle.image = '/img/einstein-0.jpg';

                    console.log(newsArticle.image);

                const newNewsArticle = NewsArticle.create(
                    {
                        href: newsArticle.href,
                        date: newsArticle.date,
                        title: newsArticle.title,
                        image: newsArticle.image,
                        company: newsArticle.company,
                    },
                    (error, doc) => {
                        // if (error) res.redirect('/');
                        // else res.redirect(`/`);
                    },
                );
            } else {
                // res.redirect('/');
                // console.log('Found');
            }
        } catch (error) {
            console.log(error);
        }
    });

    await browser.close();
};
