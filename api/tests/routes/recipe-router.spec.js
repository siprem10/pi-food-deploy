const app = require('../../src/app.js');
const request = require('supertest'); /* peticiones al backend */
const { conn, /*Recipe , Diet */ } = require('../../src/db.js');

/* const agent = request(app); */
describe('Recipe Routes', () => {
    // config por incicial x c/ describe
    beforeAll(async () => {
        await conn.sync({ force: false });
        console.log('Ok!');
    });

    describe('[GET] /recipe and /recipe?name=name', () => {
      it('return status 200 '/*  and the list of all recipes */, async () => {
        await process.nextTick(() => {});
        const res = await request(app).get('/recipes');
        expect(res.statusCode).toBe(200);
        expect(res.type).toEqual('application/json');
        expect(JSON.parse(res.text)).toEqual(res.body);
        //expect(res.body).toEqual([]);
      });
  
      // no es perfecto si agrego una receta con un nombre parecido
      // ya no funcionaria el toEquals
      it('return list all characters that match with the name filter', async () => {
        await process.nextTick(() => {});
        const res = await request(app).get('/recipes?name=Cauliflower, Brown Rice, and Vegetable Fried Rice');
        expect(res.statusCode).toBe(200);
        expect(res.type).toEqual('application/json');
        expect(res.body).toEqual([
          expect.objectContaining({
                "id": 716426,
                "name": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
                "summary": "Cauliflower, Brown Rice, and Vegetable Fried Rice might be a good recipe to expand your side dish recipe box. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has 192 calories, 7g of protein, and 6g of fat per serving. For $1.12 per serving, this recipe covers 19% of your daily requirements of vitamins and minerals. This recipe serves 8. This recipe from fullbellysisters.blogspot.com has 3689 fans. This recipe is typical of Chinese cuisine. From preparation to the plate, this recipe takes about 30 minutes. Head to the store and pick up peas, broccoli, salt, and a few other things to make it today. Overall, this recipe earns an awesome spoonacular score of 100%. Users who liked this recipe also liked Vegetable Fried Brown Rice, Vegetable Fried Cauliflower Rice, and Easy Vegetable Fried Brown Rice with Egg.",
                "healthScore": 76,
                "steps": [
                    "Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of \"cauliflower rice.\"",
                    "Heat 1T butter and 1T oil in a large skillet over medium heat.",
                    "Add garlic and the white and light green pieces of scallion. Sauté about a minute.",
                    "Add the cauliflower to the pan. Stir to coat with oil, then spread out in pan and let sit; you want it cook a bit and to caramelize (get a bit brown), which will bring out the sweetness. After a couple of minutes, stir and spread out again.",
                    "Add cold rice (it separates easily, so it won't clump up during cooking), plus the additional grapeseed and coconut oil or butter. Raise heat to medium-high. Toss everything together and, again, spread the mixture out over the whole pan and press a bit into the bottom.",
                    "Let it sit for about two minutes—so the rice can get toasted and a little crispy.",
                    "Add the peas and broccoli and stir again.",
                    "Drizzle soy sauce and toasted sesame oil over rice.Cook for another minute or so and turn off heat.",
                    "Add chopped scallion tops and toss.I like to toast some sesame seeds in a dry pan; I sprinkle these and some more raw, chopped scallion over the top of the rice for added flavor and crunch.Season to taste with salt and, if you'd like, more soy sauce. Keep in mind that if you're serving this with something salty and saucy (ie. teriyaki chicken) you may want to hold off on adding too much salt to the fried rice."
                ],
                "imgUri": "https://spoonacular.com/recipeImages/716426-312x231.jpg",
                "diets": [
                    "gluten free",
                    "dairy free",
                    "lacto ovo vegetarian",
                    "vegan"
                ]
            }),
        ]);
      });
    })

    describe('[GET] /recipe/:id', () => {
        
        it('return the correct recipe search by id', async () => {
            await process.nextTick(() => {});
            const res = await request(app).get('/recipes/715594');
            expect(res.statusCode).toBe(200);
            expect(res.type).toEqual('application/json');
            expect(res.body).toEqual({
                "id": 715594,
                "name": "Homemade Garlic and Basil French Fries",
                "summary": "The recipe Homemade Garlic and Basil French Fries is ready in roughly 45 minutes and is definitely a super vegan option for lovers of American food. One serving contains 596 calories, 18g of protein, and 15g of fat. For 83 cents per serving, you get a side dish that serves 2. Several people made this recipe, and 1669 would say it hit the spot. If you have garlic salt, flour, garlic powder, and a few other ingredients on hand, you can make it. All things considered, we decided this recipe deserves a spoonacular score of 100%. This score is outstanding. Try Homemade French Fries with Fresh Garlic and Dill, Roasted Garlic French Fries, and Sweet Potato Fries With Basil Salt and Garlic Mayonnaise for similar recipes.",
                "healthScore": 77,
                "imgUri": "https://spoonacular.com/recipeImages/715594-312x231.jpg",
                "diets": [
                    "dairy free",
                    "lacto ovo vegetarian",
                    "vegan"
                ]
            });
          });

      it('return status 404 and the correct message if recipe id is invalid', async () => {
        const res = await request(app).get('/recipes/idASDASDSA');
        expect(res.statusCode).toBe(404);
        expect(res.type).toEqual('application/json');
        expect(JSON.parse(res.text)).toEqual({error: "Recipe not found!"});
      });
    })

    describe('[POST] /recipe', () => {
        it('return status 400 and corresponding text if any parameter is not send', async () => {
          const res = await request(app).post('/recipes');
          expect(res.statusCode).toBe(400);
          expect(res.type).toEqual('application/json');
          expect(JSON.parse(res.text)).toEqual({error: "Missing required fields!"});
        });

        describe('Steps invalid!', () => {
            
            it('return status 400 and corresponding text if steps is not array', async () => {
                const res = await request(app)
                    .post('/recipes')
                    .send({
                        name: "milanesa",
                        summary: "The milanesa is a thin fillet, usually beef, dipped in beaten egg and then in breadcrumbs, which is cooked fried or baked and is usually accompanied by a side dish, such as French fries.",
                        steps: {},
                        imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                        healthScore: 100,
                        diets: [1]
                });
                expect(res.statusCode).toBe(400);
                expect(res.type).toEqual('application/json');
                expect(JSON.parse(res.text)).toEqual({error: "Invalid steps!"});
            });

            it('return status 400 and corresponding text if steps is empty array', async () => {
                const res = await request(app)
                    .post('/recipes')
                    .send({
                        name: "milanesa",
                        summary: "The milanesa is a thin fillet, usually beef, dipped in beaten egg and then in breadcrumbs, which is cooked fried or baked and is usually accompanied by a side dish, such as French fries.",
                        steps: [],
                        imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                        healthScore: 100,
                        diets: [1]
                });
                expect(res.statusCode).toBe(400);
                expect(res.type).toEqual('application/json');
                expect(JSON.parse(res.text)).toEqual({error: "Invalid steps!"});
            });
        });     
        
        describe('Diet invalid!', () => {
            
            it('return status 400 and corresponding text if diets is not array', async () => {
                const res = await request(app)
                    .post('/recipes')
                    .send({
                        name: "milanesa",
                        summary: "The milanesa is a thin fillet, usually beef, dipped in beaten egg and then in breadcrumbs, which is cooked fried or baked and is usually accompanied by a side dish, such as French fries.",
                        steps: ["hacer esto", "otra cosa"],
                        imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                        healthScore: 100,
                        diets: {}
                });
                expect(res.statusCode).toBe(400);
                expect(res.type).toEqual('application/json');
                expect(JSON.parse(res.text)).toEqual({error: "Invalid diets!"});
            });

            it('return status 400 and corresponding text if diets is empty array', async () => {
                const res = await request(app)
                    .post('/recipes')
                    .send({
                        name: "milanesa",
                        summary: "The milanesa is a thin fillet, usually beef, dipped in beaten egg and then in breadcrumbs, which is cooked fried or baked and is usually accompanied by a side dish, such as French fries.",
                        steps: ["hacer esto", "otra cosa"],
                        imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                        healthScore: 100,
                        diets: []
                });
                expect(res.statusCode).toBe(400);
                expect(res.type).toEqual('application/json');
                expect(JSON.parse(res.text)).toEqual({error: "Invalid diets!"});
            });            
        });  

        describe('Creation', () => {

            it('return status 201 and object if the recipe was succesfully created', async () => {
                const res = await request(app)
                    .post('/recipes')
                    .send({
                        name: "milanesa",
                        summary: "The milanesa is a thin fillet...",
                        steps: ["hacer esto", "otra cosa"],
                        imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                        healthScore: 100,
                        diets: [1, 3, 6]
                    });
                    expect(res.statusCode).toBe(201);
                    expect(res.type).toEqual('application/json');
                    expect(JSON.parse(res.text)).toEqual(res.body);

                    /* podria haber verificado si tiene c/u de las props */
            });

            it('return status 400 and corresponding text if the diet does not exist', async () => {
                const res = await request(app)
                    .post('/recipes')
                    .send({
                        name: "milanesa",
                        summary: "The milanesa is a thin fillet, usually beef, dipped in beaten egg and then in breadcrumbs, which is cooked fried or baked and is usually accompanied by a side dish, such as French fries.",
                        steps: ["hacer esto", "otra cosa"],
                        imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                        healthScore: 100,
                        diets: [999] /* id inexistente */
                });
                expect(res.statusCode).toBe(400);
                expect(res.type).toEqual('application/json');
                expect(JSON.parse(res.text)).toEqual({error: `Diet with id 999 not exists!`});
            });
        })
    });

    afterAll(async () => {// config por final x c/ describe
        await conn.sync({ force: false });
        conn.close();
    })
})



