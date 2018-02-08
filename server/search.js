const puppeteer = require('puppeteer');
const config = require('../config');
const axios = require('axios');

exports.netflix = async (title) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://www.netflix.com/login');

  await page.waitForSelector('#email');
  await page.type('#email', 'alexjohnwells@gmail.com', { delay: 100 });
  await page.type('#password', config.netflixPassword, { delay: 100 });
  await page.click('.login-button');

  await page.waitForNavigation();
  await page.click('#appMountPoint > div > div > div.profiles-gate-container > div > div > ul > li:nth-child(1)');

  await page.waitForSelector('.icon-search');
  await page.click('.icon-search');
  await page.waitForSelector('.searchBox');
  await page.type('.searchBox', title, { delay: 100 });

  await page.waitFor(250);
  const result = await page.evaluate(() => {
    const anchor = document.querySelector('#title-card-0-0 > div > div > div');

    return anchor ? anchor.innerText : 'notfound';
  });

  browser.close();

  return title.toUpperCase() === result.toUpperCase();
};

exports.hulu = async (title) => {
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

exports.amazon = async (title) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto(`https://www.amazon.com/s/ref=nb_sb_noss_1/136-6058734-2156620?url=search-alias%3Dprime-instant-video&field-keywords=${title}`);
  await page.waitFor(1000);
  const result = await page.evaluate(() => {
    const anchor = document.querySelector('#result_0 .s-access-detail-page');

    return anchor ? anchor.innerText : 'notfound';
  });

  browser.close();

  return title.toUpperCase() === result.toUpperCase();
};

exports.itunes = async (title) => {
  const foundMovie = await itunesSearch(title, 'movie');
  const foundShow = await itunesSearch(title, 'tvShow');

  return foundMovie || foundShow;
};

const itunesSearch = async (term, media) => {
  const url = `https://itunes.apple.com/search?`;
  const query = { term, media };
  const promise = await axios(generateURL(url, query));
  const results = promise.data.results;
  const result = results.length ? results[0].trackName : 'notFound';

  return result.toUpperCase() === term.toUpperCase();
};

function generateURL(baseURL, options) {
  let optionsString = Object.keys(options).map(item => {
    return item + '=' + encodeURIComponent(options[item])
  }).join('&');

  optionsString = optionsString.replace(/%20/g, '+');
    
  return baseURL + optionsString;
}

exports.youtube = async (title) => {
  const baseUrl = 'https://www.googleapis.com/youtube/v3/search?';
  const query = {
    q: title,
    type: 'video',
    part: 'snippet',
    videoType: 'movie',
    key: config.youtubeApiKey,
  };
  const promise = await axios(generateURL(baseUrl, query));
  const uppercaseResults = promise.data.items.map(item => item.snippet.title.toUpperCase());

  return uppercaseResults.includes(title.toUpperCase());
};

exports.googlePlay = async (title) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://play.google.com/store/search?q=${title}&c=movies`);
  await page.waitFor(1000);
  const result = await page.evaluate(() => {
    const anchor1 = document.querySelector('#body-content > div.outer-container > div > div.main-content > div > div:nth-child(1) > div > div > div > div > div:nth-child(3) > a');
    const anchor2 = document.querySelector('#body-content > div.outer-container > div > div.main-content > div > div:nth-child(1) > div > div.id-card-list.card-list.two-cards > div:nth-child(1) > div > div.details > a.title');
    
    if (anchor1) {
      return anchor1.innerText;
    } else if (anchor2) {
      return anchor2.innerText;
    } else {
      return 'notFound';
    }
  });

  browser.close();

  return title.toUpperCase() === result.toUpperCase();
};
