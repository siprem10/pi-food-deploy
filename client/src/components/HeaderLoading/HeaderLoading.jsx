import React from "react";
import ic_recipe from "../../assets/ic_recipe.png";
import "./HeaderLoading.css";

export default function HeaderLoading() {

    return (
        <div className="headerContainerFake">     
            <div className="headerColDivFake">                   
                <div className="imgHeaderDivFake">
                    <img src={ic_recipe} alt="not found"></img>                              
                </div>
            </div>
        </div>
    );
};
