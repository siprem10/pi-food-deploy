import React from "react";
import ic_recipe from "../../assets/ic_recipe.png";
import ic_linkedin from "../../assets/ic_linkedin.png";
import { Link } from "react-router-dom";
import "./HeaderLoading.css";

export default function HeaderLoading() {

    return (
        <div className="headerContainerFake">     
            <div className="headerColDivFake">              
                <div className="imgHeaderDivFake">
                    <Link className="notLine" to={"/about"}>
                        <div className="headerAboutFake">
                            <img src={ic_recipe} alt="not found"></img>
                            <h2>About</h2>  
                        </div>
                    </Link>                        
                    <a className="notLine" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/rami-dominguez-b92a08233/">
                        <div className="headerDevFake">
                            <img src={ic_linkedin} alt="not found"></img>
                            <h2>{"Ramiro Domínguez"}</h2>
                        </div>   
                    </a>                     
                </div>
            </div>
        </div>
    );
};
