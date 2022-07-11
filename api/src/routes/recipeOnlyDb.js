const { Router } = require("express");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db.js"); // La saco de la db ya que esta inyectada

const router = Router();

router.get("/", async (req, res) => {

    const {name} = req.query;

    try {        
        let recipesDB; 
        
        // si tengo query filtro sobre ella
        if(name){
            recipesDB = await Recipe.findAll({ where: { name: {[Op.iLike]: `%${name}%`} }, include: [{model: Diet }] }); 
        } else {
            recipesDB = await Recipe.findAll({ include: [{model: Diet }] }); 
        }        

        if(!recipesDB.length){
            return res.status(404).send({error: "Recipe not found!"});
        }

        return res.status(200).send(recipesDB);

    } catch (error) {
        return res.status(400).send({error: error.message});
    }
});

// obtiene una reseta por id + summary + diets asociados
router.get("/:id", (req, res) => {

    const {id} = req.params; 
        
    Recipe.findByPk(id, { include: [{ model: Diet }] }).then(recipeDB => { 
        
        if(!recipeDB){
            return res.status(404).send({error: "Recipe not found!!"});  
        }
        
        return res.status(200).send(recipeDB);
    })    
    .catch (error =>  {
        return res.status(404).send({error: "Recipe not found!"});      
    });
});


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