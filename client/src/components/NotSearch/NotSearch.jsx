import React from 'react';
import notSearch from "../../assets/notSearch.gif"
import "./NotSearch.css";

export default function NotSearch() {
    
    return (        
        <div className="notSearchDiv">
            <div className="notSearchFlex">
                <img src={notSearch} alt="404 not found"></img>
                <p>Recipes not found</p>
            </div>
        </div>
    );
}