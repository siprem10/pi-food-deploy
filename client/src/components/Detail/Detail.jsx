import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail, resetDetail} from '../../redux/actions/actions.js';
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import "./Detail.css"

// componente padre del detail
export default function Detail() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const recipe = useSelector(state => state.recipeDetail);
    const [loading, setLoading] = useState(false); // renderizo loading hasta que termine la petición

    // Equivale a ComponentDidMount()
    useEffect(() => {
        dispatch(getRecipeDetail(id, setLoading));

        // Equivale a ComponentDidUnmount()
        return () => dispatch(resetDetail());
    }, [dispatch, id]);
    
    return (
        <div className="detailContainer">
            <RecipeDetail recipe={recipe} loading={loading}/>
        </div>
    );
};
