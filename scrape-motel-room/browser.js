import puppeteer from "puppeteer";

const startBrowser = async () => {
   let browser;
   try {
      browser = await puppeteer.launch({
         headless: true, /* false: have ui browser */
         /* browser use multiple layers of sandbox for avoid content unreliable*/
         args: ["--disable-setuid-sandbox"],
         // ignore error http secure
         'ignoreHTTPSErrors': true 
      })
   } catch(error) {
      console.log('No browser created: ' + error);
   }
   return browser
}

export default startBrowser