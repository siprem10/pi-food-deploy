import React, {useState} from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { getAllRecipes, saveAppPrefs} from '../../redux/actions/actions.js';
import Header from '../Header/Header.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import RecipeCards from "../RecipeCards/RecipeCards.jsx";
import "./Home.css";

export default function Home() {

    const dispatch = useDispatch();
    const mount = useRef(false);
    const query = useLocation().search;
    /* console.log(query); */

    // Me traigo 
    const recipesAll = useSelector(state => state.recipes);
    const appPrefs = useSelector(state => state.appPrefs);
   
    const [loading, setLoading] = useState(false); // renderizo loading hasta que termine la petición
    const [currentPage, setCurrentPage] = useState(appPrefs.pageNum); // pág actual (donde estoy parado)
    const [cardsPerPage/* , setCardsPerPage */] = useState(9); // cant máx de cards por pág

    // Equivale a ComponentDidMount()
    React.useEffect(() => {
        if(!recipesAll || !recipesAll.length){
            dispatch(getAllRecipes(setLoading, query));
        }
        
        if(!mount.current){
            mount.current = true;
            window.scrollTo(0, appPrefs.scrollY);
        }

        // Equivale a ComponentDidUnmount()
        // return () => dispatch(resetRecipes());
    }, [dispatch, recipesAll, query, appPrefs]);

    // Obtengo tarjetas actuales (pág)
    const indexOfLastCard = currentPage * cardsPerPage; // ultimo elm tarjeta (2 * 9 = 18 total tarjetas)
    /* console.log(indexOfLastCard) */
    const indexOfFirstCard = indexOfLastCard - cardsPerPage; // primer elm tarjeta (18 - 9 = 9)
   /*  console.log(indexOfFirstCard) */
    const currentRecipes = recipesAll.slice(indexOfFirstCard, indexOfLastCard); /* el array que tiene todo devuelvo una copia con lo de ese rango*/

    // Cambiar de pág
    function setPaginate(newPageNum){
        // seteo solo si no es la misma
        if(newPageNum !== -1 && newPageNum !== currentPage){
            setCurrentPage(newPageNum);
            dispatch(saveAppPrefs({pageNum: newPageNum})); /* guardo la pref */
        }
    }
    
    return (        
        <div className="homeContainer">
            <div className="headerDiv">
                <Header 
                    loading={loading} 
                    setPaginate={setPaginate}/>  
            </div>     
            <div className="PagDiv">
                <Pagination 
                    cardsPerPage={cardsPerPage}
                    totalCards={recipesAll.length}
                    setPaginate={setPaginate}
                    currentPage={currentPage}>                
                </Pagination>
            </div>
            <div className="CardsDiv">
                <RecipeCards recipes={currentRecipes} loading={loading} />
            </div>
        </div>
    );
}