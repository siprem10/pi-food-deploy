const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preCharge } = require("./src/routes/precharge.js");
require("dotenv").config();

const {PORT} = process.env;


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  preCharge();
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`);
  });
});