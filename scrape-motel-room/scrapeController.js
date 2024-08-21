import { scrapeCategory, scraper } from './scraper.js'
import fs from 'fs/promises';

const scraperController = async (browserInstance) => {
   const url = 'https://phongtro123.com/';
   try {
      let browser = await browserInstance
      /* call scrape function in scrape file */
      const categories = await scrapeCategory(browser, url)
      const selectedCate = categories.filter((category, index) => [1, 2, 3, 4].some(i => i === index));
      /* */

      for (let i = 0; i < selectedCate.length; i++) {
         const nameFile = ['chothuephongtro.json', 'nhachothue.json', 'chothuecanho.json', 'chothuematbang.json'];
         let result = await scraper(browser, selectedCate[i].link)
         await fs.writeFile(nameFile[i], JSON.stringify(result));
         console.log('wrote data successfully: ' + nameFile[i]);
      }

      await browser.close();
      console.log('>> Closed browser')
   } catch (error) {
      console.log('Error occurred on scrape controller file' + error)
      reject(error)
   }
}
export default scraperController