const Meme = require("./db");

const express = require("express");
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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App started listening at ${PORT}`);
});
