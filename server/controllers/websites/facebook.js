const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://engineering.fb.com/');

    const articles = await page.$$eval('.article-grid', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.entry-title a').href,
            date: e.querySelector('.entry-date').innerText,
            title: e.querySelector('.entry-title a').innerText,
            image: e.querySelector('.attachment-thumbnail').src,
            company: 'Facebook',
        })),
    );

    console.log(articles);

    await browser.close();
})();
