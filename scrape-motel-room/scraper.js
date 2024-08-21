
export const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
   try {
      let page = await browser.newPage();
      /* navigate the page to a URL*/
      await page.goto(url);
      /* await for web load all data */
      await page.waitForSelector('#webpage');
      /* > children direct  */
      const dataCategory = await page.$$eval('#navbar-menu > ul > li', els => {
         return els.map(el => {
            return {
               category: el.querySelector('a').innerText,
               link: el.querySelector('a').href
            };
         });
      });
      await page.close();
      resolve(dataCategory);
   } catch (error) {
      console.log('Error occurred scrape category')
      reject(error)
   }
});

export const scraper = (browser, url) => new Promise(async (resolve, reject) => {
   try {
      let newPage = await browser.newPage();
      await newPage.goto(url);
      await newPage.waitForSelector('#main')

      const scrapeData = {};

      /* get header for detail page: 'cho thue phong tro' */
      const headerData = await newPage.$eval('header', (el) => {
         return {
            title: el.querySelector('h1').innerText,
            description: el.querySelector('p').innerText
         }
      });
      scrapeData.header = headerData

      /* get link detail item: section.section-post : chỉ lấy phần tử section có class là section-post  */
      const detailLinks = await newPage.$$eval('#left-col > section.section-post-listing > ul > li', (els) => {
         return els.map(el => {
            return el.querySelector('.post-meta > h3 > a').href
         });
      })

      const scraperDetail = async (link) => new Promise(async (resolve, reject) => {
         try {
            let pageDetail = await browser.newPage();
            await pageDetail.goto(link)
            await pageDetail.waitForSelector('#main');

            const detailData = {}
            /* start scrape */
            const images = await pageDetail.$$eval('#left-col > article > div.post-images > div > div.swiper-wrapper > div.swiper-slide', (els) => {
               images = els.map(el => {
                  return el.querySelector('img')?.src
               });
               return images.filter(i => !i === false)
            })

            detailData.images = images

            /* get header detail */
            const header = await pageDetail.$eval('header.page-header', (el) => {
               return {
                  title: el.querySelector('h1 > a').innerText,
                  star: el.querySelector('h1 > span')?.className?.replace(/^\D+/g, ''),
                  class: {
                     content: el.querySelector('p').innerText,
                     classType: el.querySelector('p > a > strong').innerText
                  },
                  address: el.querySelector('address').innerText,
                  attributes: {
                     price: el.querySelector('div.post-attributes > .price > span').innerText,
                     acreage: el.querySelector('div.post-attributes > .acreage > span').innerText,
                     published: el.querySelector('div.post-attributes > .published > span').innerText,
                     hashtag: el.querySelector('div.post-attributes > .hashtag > span').innerText,
                  },
               }
            });
            detailData.header = header
            /* get description infomation data*/
            const mainContentHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-main-content', (el) => {
               return el.querySelector('div.section-header > h2').innerText
            });
            const mainContentContent = await pageDetail.$$eval('#left-col > article.the-post > section.post-main-content > .section-content > p', (els) => {
               return els.map(el => el.innerText)
            });
            detailData.mainContent = {
               header: mainContentHeader,
               content: mainContentContent
            }
            /* propreties post */
            const overviewHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-overview', (el) => {
               return el.querySelector('div.section-header > h3').innerText
            });
            const overviewContent = await pageDetail.$$eval('#left-col > article.the-post > section.post-overview > .section-content > table.table > tbody > tr', (els) => {
               return els.map(el => {
                  return {
                     name: el.querySelector('td:first-child').innerText,
                     content: el.querySelector('td:last-child').innerText
                  }
               })
            });
            detailData.overview = {
               header: overviewHeader,
               content: overviewContent
            }

            /* get info contact*/
            const contactHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-contact', (el) => {
               return el.querySelector('div.section-header > h3').innerText
            });
            const contactContent = await pageDetail.$$eval('#left-col > article.the-post > section.post-contact > .section-content > table.table > tbody > tr', (els) => {
               return els.map(el => {
                  return {
                     name: el.querySelector('td:first-child').innerText,
                     content: el.querySelector('td:last-child').innerText
                  }
               })
            });
            detailData.contact = {
               header: contactHeader,
               content: contactContent
            }

            await pageDetail.close();
            console.log('>> Closed tab: ' + link)
            resolve(detailData)
         } catch (error) {
            console.log('Error occurred while detail')
            reject(error)
         }
      })
      const details = [];
      for (let link of detailLinks) {
         const detail = await scraperDetail(link);
         details.push(detail)
      }

      scrapeData.body = details;
      resolve(scrapeData)
   } catch (err) {
      reject(err)
   }
})
