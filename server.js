const express = require("express");

const app = express();

app.use(express.json());

require("./routes/routesConnection.js")(app);

const PORT = process.env.PORT || 8081;
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