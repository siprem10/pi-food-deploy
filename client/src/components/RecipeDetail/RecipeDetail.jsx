import React from 'react';
import { Link } from 'react-router-dom';
import LoadingDetail from '../LoadingDetail/LoadingDetail';
import NotFound from '../NotFound/NotFound';
import { addDefaultSrc } from "../methods.js"
import "./RecipeDetail.css";

export default function RecipeDetail({recipe, loading}){

    if(loading || loading) {
        return <LoadingDetail></LoadingDetail>;
    }

    if(!recipe || !Object.keys(recipe).length){
        return <NotFound></NotFound>
    }

    let dietsFormat;

    // db
    /* if(isNaN(Number(recipe.id))){        
        dietsFormat = recipe.diets?.map((e, i) => formatDiets(e.name, i, recipe.diets.length));
    } else { // api
        dietsFormat = recipe.diets?.map((e, i) => formatDiets(e, i, recipe.diets.length));
    } */

    dietsFormat = recipe.diets?.map((e, i) => formatDiets(e.name, i, recipe.diets.length));
    
    if(!dietsFormat.length){
        dietsFormat = ["Not specified"];
    }

    function formatDiets(diet, i, long){
        if(i < long-1){
            return `${diet} - `
        }
        return diet;
    }

    return (
        <div className="recipeCardD">      
            <div className="recipeHeaderD"> 
                <img src={recipe.imgUri} onError={addDefaultSrc} alt="Img not found"></img>
            </div>
            <div className="recipeContainerTitleD">
                <h3>{recipe.name}</h3>
            </div>
            <div className="recipeRowD">              
                <div className="recipeDietsD">                           
                    <p className="txtTitleDietsD">{dietsFormat.length > 1 ? "Types of diet" : "Type of diet"}</p>
                        {dietsFormat.map((diet, i) =>
                            <p className="txtDietsD" key={i}>{diet}</p>
                        )} 
                </div> 
                <div className="recipeHsD">
                    <p className="txtTitleDietsD">{"HealthScore"}</p>
                    <p className="txtTitleHs">{`${recipe.healthScore}%`}</p>  
                </div>
            </div>                
            <div>
            <div className="recipeSummaryD">
                <p>{recipe.summary}</p>
            </div>             
            {recipe.steps && recipe.steps.length &&        
                <div className="recipeStepD">
                    <p className="txtTitleDietsD">{"Steps"}</p>
                    {recipe.steps?.map((step, i) => 
                        <p className="txtDietsD" key={i}>{`${i+1}. ${step}`}</p>            
                    )}
                </div>
            } 
            </div>
            <Link className='notLineD' to={`/home/`}>
                <footer className="recipeFooterD">            
                    <p>Back</p>
                </footer>
            </Link>
        </div>
    );
}