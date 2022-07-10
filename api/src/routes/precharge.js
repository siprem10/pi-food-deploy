const { Diet } = require("../db.js"); // La saco de la db ya que esta inyectada
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

function preCharge(){

    axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    .then(result => {

        let unique = [];

        result.data.results.forEach(data => {
   
            data.diets.forEach(element => {
                
                unique.push(element);
            })
        })
        unique = new Set(unique);  

        /* la formateo c/e en un obj */
        let diets = [...unique].map(diet => {
            return {name: diet}
        });

        // almaceno en la db los tipos de dieta que no existan (sin duplicarlos)
        Diet.bulkCreate(diets, {
            ignoreDuplicates: true
        });
    })      
    .catch (error =>  { 
        throw new Error(error.message); 
    });
}

module.exports = {
    preCharge
};