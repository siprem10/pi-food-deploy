const { Router } = require('express'); // express
//const express = require("express"); // express

// Importo las rutas
/* const recipesRouter = require('./recipe.js'); */
const recipesRouter = require('./recipeOnlyDb.js');
const dietsRouter = require('./diet.js');

const router = Router();
//const router = express.Router();
//router.use(express.json()); 

//router.use(express.json()); // convierte send a json (auto, middleware)
// Middlewares (config rutas)
router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);

module.exports = router;
