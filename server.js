const Meme = require("./db");

const express = require("express");
const scrapImage = require("./index");
const app = express();

app.get("/image", async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { count, rows } = await Meme.findAndCountAll({ limit, offset });
    res.status(200).json(rows);
  } catch (error) {
    res.json({ error: error.message });
  }
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
