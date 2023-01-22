const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/db.sqlite",
});
sequelize
  .sync()
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const Meme = sequelize.define("meme", {
  id: { type: DataTypes.STRING, primaryKey: true },
  imageUrl: DataTypes.STRING,
});

module.exports = Meme;
