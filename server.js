const { Meme } = require("./db");

const express = require("express");
const scrapImage = require("./index");
const bodyParser = require("body-parser");
const cosrs = require("cors");
const app = express();

app.use(cosrs());
app.use(bodyParser.json());

app.get("/image", async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const { count, rows } = await Meme.findAndCountAll({ limit, offset });
    res.status(200).json(rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/newLink", (req, res) => {
  try {
    const { id, pageUrl } = req.body;
  } catch (error) {}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App started listening at ${PORT}`);
  setInterval(() => {
    scrapImage([
      "https://www.facebook.com/media/set/?set=a.860635874288770&type=3",
      "https://www.facebook.com/media/set/?set=a.527860673898191&type=3",
    ]);
  }, 15 * 60 * 1000);
});
