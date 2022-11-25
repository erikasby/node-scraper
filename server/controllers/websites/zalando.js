const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://engineering.zalando.com/');

    const articles = await page.$$eval('.article', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.title a').href,
            date: e.querySelector('abbr').title,
            title: e.querySelector('.title a').innerText,
            company: 'Zalando',
        })),
    );

    console.log(articles);

    await browser.close();
})();
