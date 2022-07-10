import React from 'react';
import CreateRecipe from '../CreateRecipe/CreateRecipe';
import "./Form.css"

// componente padre del form
export default function Form() {
    
    return (
        <div className="formContainer">
            <CreateRecipe/>
        </div>
    );
};
