import React from 'react';
import { Link } from 'react-router-dom';
import ic_recipe from "../../assets/ic_recipe.png";
import { SetBodyImg } from '../methods.js';
import "./NotFound.css";

export default function NotFound({subtitle}) {

    SetBodyImg("notFoundBackground");
    
    return (        
        <div className="notFoundDiv">
            <div className="notFoundFlex">
                <div className="notFoundRow">
                    <img src={ic_recipe} alt="Not found"></img>
                    <h1>Recipes YA</h1>
                </div>
                <h2>{subtitle ? subtitle : "The recipe was not found!"}</h2>
                <h3>Back to menu</h3>
                <Link to="/home">
                    <button>Home</button>
                </Link>
            </div>
        </div>
    );
}