const puppeteer = require('puppeteer');
const NewsArticle = require('../../models/NewsArticle');

exports.getData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://engineering.linkedin.com/blog');

    const newsArticles = await page.$$eval('.post-li', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.post-thumb a').href,
            date: e.querySelector('.timestamp').innerText,
            title: e.querySelector('.heading-link').innerText,
            image: e.querySelector('.img-facade').dataBackgroundSrc,
            company: 'LinkedIn',
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
