const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://devblogs.microsoft.com/engineering-at-microsoft/');

    const articles = await page.$$eval('.post', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.entry-title a').href,
            date: e.querySelector('.entry-post-date').innerText,
            title: e.querySelector('.entry-title a').innerText,
            image: e.querySelector('.lp-default-image-blog').src,
            company: 'Microsoft',
        })),
    );

    console.log(articles);

    await browser.close();
})();
