import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeDetail, resetDetail } from '../../redux/actions/actions.js';
import NotFound from '../NotFound/NotFound.jsx';
import CreateRecipe from '../CreateRecipe/CreateRecipe.jsx';
import "./EditRecipe.css"

// componente padre del form
export default function EditRecipe() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const toEdit = useSelector(state => state.recipeDetail);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // despacho solo si es "UUIDV4"
        if(isNaN(Number(id))){
            dispatch(getRecipeDetail(id, setLoading));
        }

        return () => dispatch(resetDetail());
    }, [dispatch, id, setLoading]);

    if(loading){
        return <></>
    }

    if(!toEdit || !Object.keys(toEdit).length){
        return <NotFound/>
    }
    
    return (
        <div className="edtContainer">
            <CreateRecipe id={id} toEdit={toEdit}/>
        </div>
    );
};
