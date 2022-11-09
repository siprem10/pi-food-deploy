import React from 'react';
import { Link } from 'react-router-dom';
import ic_recipe from "../../assets/ic_recipe.png";
import ic_react from "../../assets/ic_react.png";
import ic_redux from "../../assets/ic_redux.png";
import ic_javascript from "../../assets/ic_javascript.png";
import ic_sequelize from "../../assets/ic_sequelize.png";
import ic_postgresql from "../../assets/ic_postgresql.png";
import ic_html from "../../assets/ic_html.png";
import ic_css from "../../assets/ic_css.png";
import ic_express from "../../assets/ic_express.png";
import ic_nodejs from "../../assets/ic_nodejs.png";
import ic_linkedin from "../../assets/ic_linkedin.png";
import { myLinkedin, SetBodyImg } from '../../utils/methods.js';
import "./About.css";

export default function About() {

    const techs = [
        {name: "JavaScript", icon: ic_javascript},
        {name: "React", icon: ic_react},
        {name: "Redux", icon: ic_redux},
        {name: "HTML", icon: ic_html},
        {name: "CSS", icon: ic_css},
        {name: "Node.js", icon: ic_nodejs},
        {name: "Express", icon: ic_express},
        {name: "Sequelize", icon: ic_sequelize},
        {name: "PostgreSQL", icon: ic_postgresql},
    ];    

    SetBodyImg("aboutBackground");

    return (        
        <div className="aboutDiv">
            <a className="notLine" target="_blank" rel="noreferrer" href={myLinkedin}>
                <div className="aboutCreator">
                        <h1>Created by</h1>
                        <h2>Ramiro Dominguez</h2>
                        <img src={ic_linkedin} alt="not found"></img>
                </div>
            </a>
            <div className="aboutFlex">
                <div className="aboutRow">
                    <img src={ic_recipe} alt="Not found"></img>
                    <h1>About</h1>
                </div>
                {techs && techs.length > 0 && 
                <div className="aboutTechsDiv">
                    <h1>Technologies used in this project</h1>
                    {techs && techs?.map((t, i) =>
                        <div key={i} className="aboutTechs">
                            <img className="about" src={t.icon} alt="not found"></img>
                            <h2>{t.name}</h2>
                        </div>                    
                    )}
                </div>}                
                <Link to="/home">
                    <button>Home</button>
                </Link>
            </div>
        </div>
    );
}