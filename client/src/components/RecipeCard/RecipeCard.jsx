import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteRecipe, saveAppPrefs } from '../../redux/actions/actions';
import ic_delete from "../../assets/ic_delete.png"
import ic_edit from "../../assets/ic_edit.png"
import ic_heart from "../../assets/ic_heart4.png"
import { addDefaultSrc, alert } from '../../utils/methods.js';
import Swal from 'sweetalert2';

import "./RecipeCard.css";

export default function RecipeCard({props}){
    //console.log(props);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    let dietsFormat;

    // db
    /* if(isDB()){        
        dietsFormat = props.diets?.map((e, i) => formatDiets(e.name, i, props.diets.length));
    } else { // api
        dietsFormat = props.diets?.map((e, i) => formatDiets(e, i, props.diets.length));
    } */

    dietsFormat = props.diets?.map((e, i) => formatDiets(e.name, i, props.diets.length));

    if(!dietsFormat.length){
        dietsFormat = ["Not specified"];
    }

    function isDB(){
        return (isNaN(Number(props.id)));
    }

    function formatDiets(diet, i, long){
        if(i < long-1){
            return `${diet} - `
        }
        return diet;
    }
    
    // borrar un elemento
    function deleteItem(){
        Swal.fire({
            title: `${props.name}`,
            text: "Are you sure you want to delete recipe?",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            cancelButtonColor: '#ff714e',
          }).then((result) => {
        
            if(result.isConfirmed) {
                dispatch(deleteRecipe(props.id));
                alert('Recipe deleted!');
            }
          })
    }

    function saveScrollY(){
        dispatch(saveAppPrefs({scrollY: window.scrollY}));
    }

    // editar un elemento
    function editItem(){
        saveScrollY();
        navigate(`/edit/${props.id}`);
    }

    return (
        <div className="recipeCard">
            <div className="recipeHeader">
                <div className="recipeHsFlex">
                    <div className="recipeHsDiv">
                        <img src={ic_heart} alt="img not found"></img>
                        <p>{`${props.healthScore}%`}</p>
                    </div>
                </div>
                {isDB() && 
                    <div className="recipeButtons">
                        <button className="recipeBtnDel" onClick={deleteItem}>
                            <img src={ic_delete} alt="img not found"></img>
                        </button>
                        <button className="recipeBtnEdt" onClick={editItem}>
                            <img src={ic_edit} alt="img not found"></img>
                        </button>
                    </div>
                }
                <img className="recipeImg" src={props.imgUri} onError={addDefaultSrc} alt="Img not found"></img>
            </div>
            <div className="recipeContainerTitle">
                <h3 className={props.name.length < 50 ? "normalH3" : "normalH3 fixTitle"}>{props.name}</h3>
            </div>              
            <div className="recipeDiets">                           
                <p className="txtTitleDiets">{dietsFormat.length > 1 ? "Types of diet" : "Type of diet"}</p>
                    {dietsFormat.map((diet, i) =>
                        <p className={dietsFormat.length < 7 ? "txtDiets" : "txtDiets fixDiet"} key={props.id + i}>{diet}</p>
                    )} 
            </div>        
            <Link className='notLine' to={`/home/${props.id}`} onClick={saveScrollY}>
                <footer className="recipeFooter">            
                    <p>Details</p>
                </footer>
            </Link>
        </div>
    );
}