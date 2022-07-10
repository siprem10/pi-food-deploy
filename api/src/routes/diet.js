const { Router } = require("express");
const { Diet } = require("../db.js"); // La saco de la db ya que esta inyectada
const router = Router();
/*
[ ] GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, 
deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
*/

/*
router.get("/", (req, res) => {

    axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    .then(result => {
         let diets = result.data.results.map(data => data.diets);
        let unique = [];
        
        diets.forEach(element => {  
            element.forEach(diet => {            
                unique.push(diet);
            });          
        });        
        unique = new Set(unique);
        
        res.status(200).send([...unique]);

        const diets = result.data.results.map(data => data.diets);
        let unique = [];
        
        diets.forEach(element => {  
            unique.push(...element);         
        }); 
        unique = new Set(unique);       
        
        res.status(200).send([...unique]);

        let unique = [];

        result.data.results.forEach(data => {
   
            data.diets.forEach(element => {
                
                unique.push(element)
            })
        })
        unique = new Set(unique);  
        let diets = [...unique];
        //diets = [...unique].map(diet => {return {name: diet}});
        
        res.status(200).send(diets);
    })        
    .catch (error =>  { 
        throw new Error(error.message); 
    });
}); 
*/

// Obtengo tipos de dieta cargadas en la db
router.get("/", (req, res) => {

    Diet.findAll()
        .then(dietsDB => {

        // si no encuentro nada
        if(!dietsDB.length){
            return res.status(404).send({error: "Diets not found!"});
        }

        return res.status(200).send(dietsDB);
    })      
    .catch (error =>  {
        return res.status(404).send({error: error.message});      
    });
});

module.exports = router;