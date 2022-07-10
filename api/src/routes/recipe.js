const { Router } = require("express");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db.js"); // La saco de la db ya que esta inyectada
const axios = require("axios");

require("dotenv").config();
const { API_KEY } = process.env;

const router = Router();

/*
[ ] GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado

[ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados

[ ] POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas.
*/

// obtiene la lista de recetas que coincidan con query
// si no encuentra nada devuelve un mensaje
router.get("/", async (req, res) => {

    const {name} = req.query;

    try {        
        const allRecipes = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        let filterRecipes;
        let recipesDB; 
        
        // si tengo query filtro sobre ella
        if(name){
            filterRecipes = allRecipes.data.results.filter(r => r.title.toLowerCase().includes(name.toLowerCase()));
            recipesDB = await Recipe.findAll({ where: { name: {[Op.iLike]: `%${name}%`} }, include: [{model: Diet }] }); 
        } else {
            filterRecipes = allRecipes.data.results;
            recipesDB = await Recipe.findAll({ include: [{model: Diet }] }); 
        }
        
        // formatea todas los elem filtrados de la api
        const recipesApi = filterRecipes.map(result => {

            // formateo en un obj lo necesario
            const recipeFormat = {
                id: result.id, 
                name: result.title,
                summary: result.summary?.replace(/<\/?[^>]+(>|$)/g, ""),
                healthScore: result.healthScore,
                steps: result.analyzedInstructions[0]?.steps.map(data => data.step), // lo agrega solo si existe
                imgUri: result.image,
                diets: (result.diets && result.diets.length) ? result.diets : ["Not specified"]
            };
            return recipeFormat;
        });

        const recipesConcat = [...recipesApi, ...recipesDB];

        if(!recipesConcat.length){
            return res.status(404).send({error: "Recipe not found!"});
        }

        return res.status(200).send(recipesConcat);

    } catch (error) {
        return res.status(400).send({error: error.message});
    }
});

// obtiene una reseta por id + summary + diets asociados
router.get("/:id", (req, res) => {

    const {id} = req.params; 
    
    // Si el parametro no es un numero
    if(isNaN(Number(id))){
        
        Recipe.findByPk(id, { include: [{ model: Diet }] }).then(recipeDB => { 
            
            if(!recipeDB){
                return res.status(404).send({error: "Recipe not found!!"});  
            }
            
            return res.status(200).send(recipeDB);
        })    
        .catch (error =>  {
            return res.status(404).send({error: "Recipe not found!"});      
        });
    }
    else {
    
        //axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        .then(result => {
            
            result = result.data.results.find(r => r.id === Number(id));
            
            // formateo en un obj lo necesario
            const recipeApi = {
                id: result.id, 
                name: result.title,
                summary: result.summary?.replace(/<\/?[^>]+(>|$)/g, ""),
                healthScore: result.healthScore,
                steps: result.analyzedInstructions[0]?.steps.map(data => data.step), // lo agrega solo si existe
                imgUri: result.image,
                diets: (result.diets && result.diets.length) ? result.diets : ["Not specified"]
            };
    
            return res.status(200).send(recipeApi);
        })      
        .catch (error =>  {
            return res.status(404).send({error: "Recipe not found!"});      
        }) 
    }    
});

// con el endpoint del readme
/* router.get("/:id", (req, res) => {

    const {id} = req.params; 
    
    // Si el parametro no es un numero
    if(isNaN(Number(id))){
        Recipe.findByPk(id, { include: [{ model: Diet }] }).then(recipeDB => { 
            
            if(!recipeDB){
                return res.status(404).send({error: "Recipe not found!!"});  
            }
            
            return res.status(200).send(recipeDB);
        })    
        .catch (error =>  {
            return res.status(404).send({error: "Recipe not found!"});      
        });
    }
    else {
    
        axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(result => {
       
            // formateo en un obj lo necesario
            const recipeApi = {
                id: result.data.id, 
                name: result.data.title,
                summary: result.data.summary?.replace(/<\/?[^>]+(>|$)/g, ""),
                healthScore: result.data.healthScore,
                steps: result.data.analyzedInstructions[0]?.steps.map(data => data.step), // lo agrega solo si existe
                imgUri: result.data.image,
                diets: result.data.diets
            };
    
            return res.status(200).send(recipeApi);
        })      
        .catch (error =>  {
            return res.status(404).send({error: "Recipe not found!"});      
        }) 
    }    
}); */

/* router.get("/:id", async(req, res) => {

    const {id} = req.params; 
    
    // Si el parametro no es un numero
    if(isNaN(Number(id))){
        Recipe.findByPk(id, { include: [{ model: Diet }] }).then(recipeDB => { 
            
            if(!recipeDB){
                return res.status(404).send({error: "Recipe not found!!"});  
            }
            
            return res.status(200).send(recipeDB);
        })    
        .catch (error =>  {
            return res.status(404).send({error: "Recipe not found!"});      
        });
    }
    else {

        try {
            const allRecipes = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
       
            // formateo en un obj lo necesario
            const recipeApi = {
                id: allRecipes.data.id, 
                name: allRecipes.data.title,
                summary: allRecipes.data.summary,
                healthScore: allRecipes.data.healthScore,
                steps: allRecipes.data.analyzedInstructions[0]?.steps.map(data => data.step), // lo agrega solo si existe
                imgUri: allRecipes.data.image,
                diets: allRecipes.data.diets
            };    
            return res.status(200).send(recipeApi); 
             
        } catch (error) {
            return res.status(404).send({error: "Recipe not found!"});
        } 
    }    
}); */

// recibo los datos del form controlado (body) y los inserto en la db
// crea una receta relacionada con sus tipos de dietas
/* router.post("/", (req, res) => {

    const {name, summary, healthScore, steps, imgUri, diets} = req.body;

    if(!name || !summary){
        return res.status(400).send({error: "Missing required fields!"})
    }

    Recipe.create({
        name,
        summary,
        healthScore,
        steps,
        imgUri
    })
    .then(result => {
        //console.log(result.__proto__);
        if(diets && diets.length){
            return result.addDiets(diets); // Relaciono la receta con la/las dietas

            
        }
        return res.status(200).send(result);
    })
    .catch(error => res.status(400).send({error: error.message}));
}); */

router.post("/", async (req, res) => {

    const {name, summary, healthScore, steps, imgUri, diets} = req.body;

    try {

        if(!name || !summary || !healthScore || !steps || !imgUri || !diets){
            throw new Error("Missing required fields!");
        }
    
        if(!Array.isArray(steps) || !steps.length){
            throw new Error("Invalid steps!");
        }
        
        if(!Array.isArray(diets) || !diets.length){
            throw new Error("Invalid diets!");
        }

        for(let i=0; i<diets.length; i++){

            const id = diets[i];
            const dietFound = await Diet.findByPk(id);

            if(!dietFound){
                throw new Error(`Diet with id ${id} not exists!`);
            }            
        }        

        // creo en la db la nueva Receta
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            imgUri
        });
            /* console.log(newRecipe.__proto__); */
            // relaciono la receta con la/las dieta/s
            await newRecipe.addDiets(diets); 
           
            const recipeRelation = await Recipe.findByPk(newRecipe.id, { include: [{ model: Diet, attributes: ["name"] }] });
            return res.status(201).send(recipeRelation);

    } catch (error) {
        return res.status(400).send({error: error.message});
    }
});

router.delete("/:id", (req, res) => {

    const {id} = req.params;

    try {
        if(!id){
            throw new Error("Id is missing!");
        }
        if(!isUUIDV4(id)){
            throw new Error("Id is invalid!");
        }
    } catch (error) {
        return res.status(400).send({error: error.message});
    }

    Recipe.destroy({where: {id: id}})
    .then(response => {
        //console.log(response);
        if(!response){
            return res.status(400).send(`Recipe with ${id} not found!`);
        }
        return res.status(200).send(id);
    })
    .catch((err) => res.status(500).send({err: err})); // err interno
    //console.log(response); 
});

router.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {name, summary, healthScore, steps, imgUri, diets} = req.body;

    try {
        
        if(!id){
            throw new Error("Id is missing!");
        }

        if(!isUUIDV4(id)){
            throw new Error("Id is invalid!");
        }

        if(!name || !summary || !healthScore || !steps || !imgUri || !diets){
            throw new Error("Missing required fields!");
        }
    
        if(!Array.isArray(steps) || !steps.length){
            throw new Error("Invalid steps!");
        }
        
        if(!Array.isArray(diets) || !diets.length){
            throw new Error("Invalid diets!");
        }

        for(let i=0; i<diets.length; i++){

            const id = diets[i];
            const dietFound = await Diet.findByPk(id);

            if(!dietFound){
                throw new Error(`Diet with id ${id} not exists!`);
            }            
        }        

        // lo actualizo en la db
        /* const updateRecipe =  */await Recipe.update({
            name,
            summary,
            healthScore,
            steps,
            imgUri
        }, { where: {id: id}});        
        //console.log(updateRecipe); // devuelve cant de actualizaciones

        // lo busco
        const recipe = await Recipe.findByPk(id);
        
        // lo relaciono
        if(recipe){
            await recipe.setDiets(diets); // set, que pise todo y lo reemplace

            const recipeRelation = await Recipe.findByPk(id, { include: [{ model: Diet, attributes: ["name"] }] });
            return res.status(200).send(recipeRelation);
        }       
        return res.status(404).send({error: `Recipe with id ${id} not exists!`});

    } catch (error) {
        return res.status(400).send({error: error.message});
    } 
});

/* 
Los UUIDV4 tiene el formato xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
donde "x" es cualquier dígito hexadecimal 
e "y" es uno de 8, 9, A o B. */
function isUUIDV4(id){
    // rango y cant, ascii
    return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id);
}

module.exports = router;