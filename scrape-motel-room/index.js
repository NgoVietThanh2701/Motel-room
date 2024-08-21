import startBrowser from './browser.js';
import scraperController from './scrapeController.js';

let browser = startBrowser();
scraperController(browser);