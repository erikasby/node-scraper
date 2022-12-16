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
            image: e.querySelector('.img-facade').getAttribute('data-background-src'),
            company: 'LinkedIn',
        })),
    );

    console.log(newsArticles);

    newsArticles.forEach(async (newsArticle) => {
        try {
            const found = await NewsArticle.exists({title: newsArticle.title});

            console.log(newsArticles.image);

            if (!found) {
                // articleContent = parseAndSanitizeMarkdownToHTML(articleContent);

                if (newsArticle.image.includes(',') || newsArticle.image.includes(';'))
                    newsArticle.image = '/img/einstein-0.jpg';

                const newNewsArticle = NewsArticle.create(
                    {
                        href: newsArticle.href,
                        date: newsArticle.date,
                        title: newsArticle.title,
                        image: `https://engineering.linkedin.com${newsArticle.image}`,
                        company: newsArticle.company,
                    },
                    (error, doc) => {
                        // if (error) res.redirect('/');
                        // else res.redirect(`/`);
                        console.log(error);
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
