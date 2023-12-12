const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
    return res.render('index');
});

app.use( '/static', express.static('public'));

app.get('/screenshot', async (req, res) => {
    const url = req.query.url;
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.setViewport({
        width:1280,
        height:720
    });

    await page.goto(url);
    await page.waitForTimeout(1500);
    const buffer = await page.screenshot();

    res.header('Content-Type', 'image/png');
    res.header('Content-Disposition', 'inline; filename=screenshot.png');

    return res.send(buffer);  
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log("Listening to port 4000...");
});