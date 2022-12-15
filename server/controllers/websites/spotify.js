const puppeteer = require('puppeteer');
const NewsArticle = require('../../models/NewsArticle');

exports.getData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://engineering.atspotify.com/');

    const newsArticles = await page.$$eval('article', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.image-holder a').href,
            date: e.querySelector('.date').innerText,
            title: e.querySelector('h2 a').innerText,
            image: e.querySelector('.attachment-post-thumbnail').src,
            company: 'Spotify',
        })),
    );

    newsArticles.forEach(async (newsArticle) => {
        try {
            const found = await NewsArticle.exists({title: newsArticle.title});

            if (!found) {
                // articleContent = parseAndSanitizeMarkdownToHTML(articleContent);

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
