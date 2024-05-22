const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const axios = require("axios");

app.use(express.json());

require("./routes/routesMobile.js")(app);
require("./routes/routesAdmin.js")(app);
require("./routes/routesConnection.js")(app);

const sequelize = new Sequelize({
  sync: false,
  dialect: "sqlite",
  storage: "db.sqlite",
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models/index.js");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = server;