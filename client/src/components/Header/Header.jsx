import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes, saveAppPrefs } from '../../redux/actions/actions.js';
import { Link } from "react-router-dom";
import ic_recipe from "../../assets/ic_recipe.png";
import ic_linkedin from "../../assets/ic_linkedin2.png";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sort from "../Sort/Sort.jsx";
import Filter from "../Filter/Filter.jsx";
import HeaderLoading from "../HeaderLoading/HeaderLoading.jsx";
import { myLinkedin } from "../methods.js";
import "./Header.css";

export default function Header({loading, setPaginate}) {

    const dispatch = useDispatch();
    const mount = useRef(false);
    const appPrefs = useSelector(state => state.appPrefs);

    const [filters, setFilters] = useState({
        search:  appPrefs.search, // algun string
        filter: appPrefs.filter // algunaDieta
    });

    function setFilter(name, value){  
        setFilters({...filters, [name]: value});
    }

    useEffect(()=>{
        if(!mount.current){
            mount.current = true;
        } else if(filters){
            setPaginate(1);          
            dispatch(saveAppPrefs(filters));
            dispatch(filterRecipes(filters));
        }
        //eslint-disable-next-line
    }, [dispatch, filters]);

    if(loading){
        return <HeaderLoading/>
    }

    return (
        <div className="headerContainer">     
            <div className="headerColDiv">                   
                <div className="imgHeaderDiv">
                    <Link className="notLine" to={"/about"}>
                        <div className="headerAbout">
                            <img src={ic_recipe} alt="not found"></img>
                            <h2>About</h2>  
                        </div>
                    </Link>                        
                    <a className="notLine" target="_blank" rel="noreferrer" href={myLinkedin}>
                        <div className="headerDev">
                            <img src={ic_linkedin} alt="not found"></img>
                            <h2>{"Ramiro Domínguez"}</h2>
                        </div>   
                    </a>                        
                </div>
                <div className="headerWorkDiv">
                    <div className="headerCenter">
                        <SearchBar setFilter={setFilter} search={filters.search} className="seachbara" /* onSearch={} *//>
                    </div>  
                    <div className="headerNav">
                        <div className="headerNav2">
                            <div className="headerSort">
                                <Sort sortOption={appPrefs.sort}/>
                            </div>
                            <div className="headerFilter">
                                <Filter setFilter={setFilter} filter={filters.filter}/>
                            </div>
                            <Link to={"/form"}>
                                <div className="btnNewRecipe">
                                    <button>New recipe</button>
                                </div>
                            </Link>
                        </div>
                    </div> 
                </div>  
            </div>
        </div>
    );
};
