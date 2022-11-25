const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://engineering.atspotify.com/');

    const articles = await page.$$eval('article', (elements) =>
        elements.map((e) => ({
            href: e.querySelector('.image-holder a').href,
            date: e.querySelector('.date').innerText,
            title: e.querySelector('h2 a').innerText,
            image: e.querySelector('.attachment-post-thumbnail').src,
            company: 'Spotify',
        })),
    );

    console.log(articles);

    await browser.close();
})();
