const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://aws.amazon.com/blogs/architecture/');

    const articles = await page.$$eval('.blog-post', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.lb-row .lb-snap a').href,
            date: e.querySelector('.blog-post-meta time').innerText,
            title: e.querySelector('.blog-post-title span').innerText,
            image: e.querySelector('.attachment-large').src,
            company: 'Amazon',
        })),
    );

    console.log(articles);

    await browser.close();
})();
