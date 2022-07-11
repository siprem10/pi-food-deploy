const server = require('./src/app.js');
const { conn } = require('./src/db.js');
// const { preChargeRecipes, preChargeDiets } = require("./src/routes/precharge.js");
require("dotenv").config();


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    /* preChargeDiets(); // lo desactivo
    preChargeRecipes(); // lo desactivo */
    server.listen(process.env.PORT, () => {
        console.log(`%s listening at ${process.env.PORT}`);
    });
});