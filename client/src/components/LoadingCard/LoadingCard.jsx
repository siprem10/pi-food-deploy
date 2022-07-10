import React from 'react';
import "./LoadingCard.css";

export default function LoadingCard(){

    return (
        <div className="recipeCardFake">            
            <div className="recipeHeaderFake animFake"></div>      
            <div className="recipeContainerTitleFake animFake"></div>   
            <div className="recipeDietsDiv">                 
                <div className="recipeDietsTitleFake animFake"></div>   
                <div className="recipeDietsFake animFake"></div>                                            
            </div> 
            <div className="recipeFooterFake animFake"></div> 
        </div>
    );
}