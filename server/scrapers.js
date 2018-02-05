const puppeteer = require('puppeteer');
const passwords = require('../config/passwords')

let netflix = async (title) => {
  const browser = await puppeteer.launch();
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

  await page.waitFor(250);
  const result = await page.evaluate(() => {
    const anchor = document.querySelector('#title-card-0-0 > div > div > div');

    return anchor ? anchor.innerText : 'notfound';
  });

  browser.close();

  return title.toUpperCase() === result.toUpperCase();
};

let hulu = async (title) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.hulu.com/search?q=${title}`);
  await page.waitForSelector('#banner > div.extra-header-wrapper > div.filter-bar.page-width > div.left-side > table > tbody > tr > td:nth-child(3) > div > div > a.btn.active');
  const result = await page.evaluate(() => {
    const anchor = document.querySelector('.promo-middle .promo-title-link');

    return anchor ? anchor.innerText : 'notfound';
  });

  browser.close();

  return title.toUpperCase() === result.toUpperCase();
};

let amazon = async (title) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.amazon.com/s/ref=nb_sb_noss_1/136-6058734-2156620?url=search-alias%3Dprime-instant-video&field-keywords=${title}`);
  await page.waitForSelector('#result_0 .s-access-detail-page');
  const result = await page.evaluate(() => {
    const anchor = document.querySelector('#result_0 .s-access-detail-page');

    return anchor ? anchor.innerText : 'notfound';
  });

  browser.close();

  return title.toUpperCase() === result.toUpperCase();
};

exports.netflix = netflix;
exports.hulu = hulu;
exports.amazon = amazon;
