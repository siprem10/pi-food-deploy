const { conn, Recipe/* , Diet */ } = require('../../src/db.js');

describe('Recipe Model', () => {
  beforeAll(async () => {
    await conn.sync({ force: false });
    /* console.log('Ok!'); */
  });

describe('Validations', () => {

    it('should not create the Recipe if name is not send', async () => {
        expect.assertions(1);
        try {
            await Recipe.create({
                summary: "The milanesa is a thin fillet....",
                steps: ["hacer esto", "otra cosa"],
                imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                healthScore: 100,
            })
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should not create the Recipe if summary is not send', async () => {
        expect.assertions(1);
        try {
            await Recipe.create({
                name: "Milanesa",
                steps: ["hacer esto", "otra cosa"],
                imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                healthScore: 100,
            })
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should not create the Recipe if steps is not send', async () => {
        expect.assertions(1);
        try {
            await Recipe.create({
                name: "Milanesa",
                summary: "The milanesa is a thin fillet....",
                imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                healthScore: 100,
            })
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should not create the Recipe if imgUri is not send', async () => {
        expect.assertions(1);
        try {
            await Recipe.create({
                name: "Milanesa",
                summary: "The milanesa is a thin fillet....",
                steps: ["hacer esto", "otra cosa"],
                healthScore: 100,
            })
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    describe('HealthScore Range', () => {

        it('should not create the Recipe if healthScore is not send', async () => {
            expect.assertions(1);
            try {
                await Recipe.create({
                    name: "Milanesa",
                    summary: "The milanesa is a thin fillet....",
                    steps: ["hacer esto", "otra cosa"],
                    imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                })
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });

        it('should not create the Recipe if healthScore is invalid nagative range', async () => {
            expect.assertions(1);
            try {
                await Recipe.create({
                    name: "Milanesa",
                    summary: "The milanesa is a thin fillet....",
                    steps: ["hacer esto", "otra cosa"],
                    imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                    healthScore: 0
                })
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });

        it('should not create the Recipe if healthScore is invalid positive range', async () => {
            
                expect.assertions(1);
                try {
                    await Recipe.create({
                        name: "Milanesa",
                        summary: "The milanesa is a thin fillet....",
                        steps: ["hacer esto", "otra cosa"],
                        imgUri: "https://cdn7.kiwilimon.com/recetaimagen/1654/13219.jpg",
                        healthScore: 101
                    })
                } catch (error) {
                    expect(error.message).toBeDefined();
                }
            });
        });  
    })

    afterAll(async () => {
        await conn.sync({ force: false });
        conn.close();
    })
});