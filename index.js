// const { Chromeless } = require("chromeless");

const puppeteer = require("puppeteer");
const Meme = require("./db");

const scrapImage = async (urls) => {
  const browser = await puppeteer.launch();
  try {
    const imageList = await Promise.all(
      urls.map(async (url) => {
        const page = await browser.newPage();

        await page.setCacheEnabled(false);
        await page.goto(url);

        await page.waitForSelector("img", 1);

        // Find all of the image elements on the page
        const imageElements = await page.evaluate(() => {
          // console.log({ images });
          // return images;
          return [...document.querySelectorAll("img")]?.map((anchor) => {
            const title = anchor.getAttribute("src");
            return `${title}`;
          });
        });
        // console.log({ imageElements });
        return imageElements.slice(0, 10);
      })
    );

    const flatImage = imageList.flat().map((image) => {
      const imageId = image.match(/\/\w+(.jpg)/);
      return { id: imageId[0], imageUrl: image };
    });

    const filteredImage = await Promise.all(
      flatImage.filter(async (image) => {
        const existingImage = await Meme.findByPk(image.id);
        return existingImage === null;
      })
    );
    //-------------------
    await Meme.bulkCreate(filteredImage);
    console.log(imageList?.length);
  } catch (err) {
    console.log(err);
  }
  await browser.close();
  // Send the image URLs as the response
};

// scrapImage("https://www.facebook.com/media/set/?set=a.860635874288770&type=3");

setInterval(() => {
  scrapImage([
    "https://www.facebook.com/media/set/?set=a.860635874288770&type=3",
    "https://www.facebook.com/media/set/?set=a.527860673898191&type=3",
  ]);
}, 15 * 60 * 1000);
