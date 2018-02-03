const puppeteer = require('puppeteer');
const passwords = require('../config/passwords')

let scrape = async (title) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://www.netflix.com/login');

  await page.waitForSelector('#email');
  await page.type('#email', 'alexjohnwells@gmail.com');
  await page.type('#password', passwords.NETFLIX);
  await page.click('.login-button');

  await page.waitForNavigation();
  await page.click('#appMountPoint > div > div > div.profiles-gate-container > div > div > ul > li:nth-child(1)');

  await page.waitForSelector('.icon-search');
  await page.click('.icon-search');
  await page.waitForSelector('.searchBox');
  await page.type('.searchBox', title);

  await page.waitForSelector('#title-card-0-0 > div > div > div');
  const result = await page.evaluate(() => {
    return document.querySelector('#title-card-0-0 > div > div > div').innerText;
  });

  browser.close();

  return title.toUpperCase() === result.toUpperCase();
};

scrape('Naruto').then((value) => {
  console.log(value);
});
