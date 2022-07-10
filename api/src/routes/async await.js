// PERFECTO
router.post("/", async (req, res) => {

    const {name, summary, healthScore, steps, imgSrc, diets} = req.body;

    if(!name || !summary){
        return res.status(400).send({error: "Missing required fields!"})
    }

    try {
        // creo en la db la nueva Receta
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            imgSrc
        });

        // si se especifican dietas
        if(diets && diets.length){

            // relaciono la receta con la/las dieta/s
            await newRecipe.addDiets(diets); 

            // busco la nueva receta incluyendo la relación
            const recipeRelation = await Recipe.findByPk(newRecipe.id, { include: [{ model: Diet }] });
            return res.status(200).send(recipeRelation);
        }
        return res.status(200).send(newRecipe);

    } catch (error) {
        return res.status(400).send({error: error.message});
    }
});

router.get("/:id", async (req, res) => {

    const {id} = req.params;


    // Si el parametro no es un numero
    if(isNaN(Number(id))){
        return res.status(400).send({error: "Param is invalid!"});
    }

    try {
        
        const recipeById = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${PROVISORIA_API_KEY}`);
    
        // re al pedo (entra por el catch si no devuelve nada)
        if(!recipeById.data){
            return res.status(404).send("Recipe summary not found data!");
        }        
        
        const recipe = {
            id: recipeById.data.id, 
            name: recipeById.data.title,
            summary: recipeById.data.summary,
            healthScore: recipeById.data.healthScore,
            steps: result.data.analyzedInstructions[0]?.steps.map(data => data.step),
            imgSrc: recipeById.data.image,
            diets: recipeById.data.diets
        };

        return res.status(200).send(recipe);
    } catch (error) {
        //return res.status(404).send({error: error.message});  
        return res.status(404).send({error: "Recipe summary not found!"});      
    }
});



 // busco la nueva receta incluyendo la relación
            //const recipeRelation = await Recipe.findByPk(newRecipe.id, { include: [{ model: Diet, through: { attributes: { exclude: ["createdAt", "updatedAt"] } } }] });
            //const recipeRelation = await Recipe.findByPk(newRecipe.id, { include: [{ model: Diet, through: { attributes: [] } }] });
 //const recipeRelation = await Recipe.findByPk(newRecipe.id, { include: [{ model: Diet, }] });
           