const { Recipe, Diet } = require("../db.js"); // La saco de la db ya que esta inyectada
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

async function preChargeRecipes(){

    try {
        const recipes = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

        // formatea todas los elem filtrados de la api
        const recipesApi = recipes.data.results.map(result => {

            // formateo en un obj lo necesario
            const recipeFormat = {
                id: result.id, 
                name: result.title,
                summary: result.summary?.replace(/<\/?[^>]+(>|$)/g, ""),
                healthScore: result.healthScore,
                steps: result.analyzedInstructions[0] ? result.analyzedInstructions[0].steps.map(data => data.step) : ["..."], // lo agrega solo si existe
                imgUri: result.image,
                diets: (result.diets && result.diets.length) ? result.diets : ["Gluten Free"]
            };
            return recipeFormat;
        });

        let dietsFound = [];

        for(let i=0; i < recipesApi.length; i++){

            const api = recipesApi[i];

            // me fijo que no exista
            const exists = await Recipe.findOne({where: {name: api.name}}); 

            if(!exists){
                // creo en la db la nueva Receta
                const newRecipe = await Recipe.create({
                    /* id: api.id, */ // si comento el id lo podria autogenerar y hacer que todas sean editables          
                    name: api.name, 
                    summary: api.summary, 
                    healthScore: api.healthScore, 
                    steps: api.steps,
                    imgUri: api.imgUri
                });        

                for(let j=0; j < api.diets.length; j++){
                    const diet = api.diets[j]; // nombre de dieta
                    const findDiet = await Diet.findOne({where: {name: diet}}); // busco en la db

                    if(findDiet && findDiet.id){
                        console.log(findDiet.id); // id
                        dietsFound.push(findDiet.id); // guardo los id 
                    }        
                } 
                // relaciono la receta con la/las dieta/s 
                if(dietsFound.length){
                    newRecipe.addDiets(dietsFound);
                    dietsFound = [];
                }
            }  
        }         
        console.log("Recipes preloaded!");
    } catch (error) {        
        console.log(error); 
    }
}

function preChargeDiets(){

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

        console.log("Diets preloaded!");
    })      
    .catch (error =>  {  
        console.log(error.message); 
    });
}

module.exports = {
    preChargeRecipes,
    preChargeDiets
};