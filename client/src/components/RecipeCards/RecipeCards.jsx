import React from 'react';
import LoadingCard from '../LoadingCard/LoadingCard.jsx';
import NotSearch from '../NotSearch/NotSearch.jsx';
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import "./RecipeCards.css";

export default function RecipeCards({recipes, loading}) {

    if(loading) {
        return (
            <div className="recipeCards">          
                <LoadingCard key={"0"} ></LoadingCard>
                <LoadingCard key={"1"} ></LoadingCard>
                <LoadingCard key={"2"} ></LoadingCard>
                <LoadingCard key={"3"} ></LoadingCard>
                <LoadingCard key={"4"} ></LoadingCard>
                <LoadingCard key={"5"} ></LoadingCard>
                <LoadingCard key={"6"} ></LoadingCard>
                <LoadingCard key={"7"} ></LoadingCard>
                <LoadingCard key={"8"} ></LoadingCard>
            </div>
        );
    }

    if(!recipes || !recipes.length){
        
        return (        
            <div className="recipeCards">
                <NotSearch/>
            </div>
        );
    }
    
    return (        
        <div className="recipeCards">
            {recipes?.map(recipe =>               
                <RecipeCard props={
                    {
                        id: recipe.id,
                        name: recipe.name,
                        imgUri: recipe.imgUri,
                        healthScore: recipe.healthScore,
                        diets: recipe.diets
                    }
                } 
                key={recipe.id} ></RecipeCard>
            )}
        </div>
    );
}