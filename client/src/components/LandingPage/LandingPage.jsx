import React from 'react';
import { Link } from 'react-router-dom';
import ic_recipe from "../../assets/ic_recipe.png";
import { SetBodyImg } from '../methods.js';
import "./LandingPage.css";

export default function LandingPage() {

    SetBodyImg("landingBackground");
    
    return (        
        <div className="landingDiv">
            <div className="landingFlex">
                <div className="landingRow">
                    <img src={ic_recipe} alt="Not found"></img>
                    <h1>Recipes YA</h1>
                </div>
                <h2>Cook something delicious today</h2>
                <h3>Gluten Free, Dairy Free, Lacto Ovo, Vegetarian, Vegan, Paleolithic...</h3>
                <Link to="/home">
                    <button>Home</button>
                </Link>
            </div>
        </div>
    );
}