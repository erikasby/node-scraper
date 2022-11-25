const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://engineering.linkedin.com/blog');

    const articles = await page.$$eval('.post-li', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.post-thumb a').href,
            date: e.querySelector('.timestamp').innerText,
            title: e.querySelector('.heading-link').innerText,
            image: e.querySelector('.post-thumb img').src,
            company: 'LinkedIn',
        })),
    );

    console.log(articles);

    await browser.close();
})();
