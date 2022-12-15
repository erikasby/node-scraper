const puppeteer = require('puppeteer');
const NewsArticle = require('../../models/NewsArticle');

exports.getData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://aws.amazon.com/blogs/architecture/');

    const newsArticles = await page.$$eval('.blog-post', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.lb-row .lb-snap a').href,
            date: e.querySelector('.blog-post-meta time').innerText,
            title: e.querySelector('.blog-post-title span').innerText,
            image: e.querySelector('.attachment-large').src,
            company: 'Amazon',
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
