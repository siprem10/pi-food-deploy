// Importo mis actions
import {
    GET_ALL_RECIPES,
    GET_RECIPE_DETAIL,
    RESET_DETAIL,
    ADD_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE,
    GET_ALL_DIETS,
    SORT_RECIPES,
    FILTER_RECIPES,
    SAVE_APP_PREFS
}
from "../actions/actions.js"

// estado global inicial
const initialState = {
    recipesAll: [], /* es una copia que contiene todo */
    recipes: [],
    recipeDetail: {},
    diets: [],
    appPrefs: {pageNum: 1, filter: "", search: "", sort: {option: "", value: ""}, scrollY: 0}
};

// reducer
const rootReducer = (state = initialState, action) => {

  switch (action.type){    
    case GET_ALL_RECIPES: {
        return {
            ...state,
            recipesAll: action.payload,
            recipes: action.payload
        }
    }
    case GET_RECIPE_DETAIL: {
        return { 
            ...state,
            recipeDetail: action.payload
        }
    }
    case RESET_DETAIL: {
        return { 
            ...state,
            recipeDetail: {}
        }
    }
    case ADD_RECIPE: {
        return {
            ...state,
            recipesAll: state.recipesAll.concat(action.payload),
            recipes: state.recipes.concat(action.payload)
        }
    } 
    case DELETE_RECIPE: {
        return {
            ...state,
            recipesAll: state.recipesAll.filter(e => e.id !== action.payload),
            recipes: state.recipes.filter(e => e.id !== action.payload)
        }
    }
    case UPDATE_RECIPE: {
        return {
            ...state //?            
        }
    } 
    
    case GET_ALL_DIETS: {
        return {
            ...state,
            diets: action.payload
        }
    }
    case SORT_RECIPES: {

        const sort = action.payload;
        // primero ordeno todo --> recipesAll
        // despues, ordeno al actual --> recipesCurrent
        if(sort && sort.length){
            return {
                ...state,
                recipesAll: [...sortArray(state.recipesAll, sort)],
                recipes: [...sortArray(state.recipes, sort)]
            }
        } else {
            return {...state}
        }

    }
    case FILTER_RECIPES: {
        const filter = action.payload.filter.toLowerCase();
        const search = action.payload.search.toLowerCase();

        // si no tengo filtro
        if(!filter || filter === ""){ 

            // y si no tengo busqueda
            if(!search || !search.length){
                return {
                    ...state,
                    recipes: [...state.recipesAll]
                }
            } 

            return {
                ...state,
                recipes: state.recipesAll.filter(e => e.name.toLowerCase().includes(search)) 
            }
            
        }
        else{  // si tengo filtro (manejo filtro y search juntos)        

            // filtro sobre el recipesAll, modifica al current (es parecido a una busqueda) 

            return {
                ...state,
                recipes: filterArray(state.recipesAll, filter, search)
            }            
        }
    } 
    case SAVE_APP_PREFS: {
        return {
            ...state,
            appPrefs: {...state.appPrefs, ...action.payload}            
        }
    } 
    default: return state;
    }
};

function filterArray(array, filter, search){

    // sólo si tengo busqueda saco los que no coincidan
    if(search && search.length){
        /* console.log("adsads") */
        array = array.filter(e => e.name.toLowerCase().includes(search));
    }

    const filters = [];
    // retorno las coincidencias
    for(let i=0; i<array.length; i++){

        const receta = array[i]; 

        for(let j=0; j<receta.diets.length; j++){

            // si es de la db
            if(isNaN(Number(receta.id))){
                if(receta.diets[j].name.toLowerCase().includes(filter)){
                    filters.push(receta);
                    break;
                }
                //console.log(receta.diets[j].name);
            } else { // si es de la api
                
                if(receta.diets[j].toLowerCase().includes(filter)){
                    filters.push(receta);
                    break;
                }
                //console.log(receta.diets[j]);
            }
        }
    }
    return filters;

    /* // retorno las coincidencias //? advertencia
    return array.filter(e => {

        for(let j=0; j<e.diets.length; j++){

            // si es de la db
            if(isNaN(Number(e.id))){
                if(e.diets[j].name.toLowerCase().includes(filter)){
                    return true;
                }
                //console.log(e.diets[j].name);
            } else { // si es de la api
                
                if(e.diets[j].toLowerCase().includes(filter)){
                    return true;
                }
                //console.log(e.diets[j]);
            }
        }
    }); */
}

function sortArray(array, sort){

    if(sort === "A-Z"){
        return array.sort((a, b) => sortAZ(a.name, b.name));
    }
    if(sort === "Z-A"){
        return array.sort((a, b) => sortZA(a.name, b.name));
    } 

    if(sort === "+HS" ){
        return array.sort((a, b) => sortMajor(a.healthScore, b.healthScore));
    }    
    if(sort === "-HS"){
        return array.sort((a, b) => sortMinor(a.healthScore, b.healthScore));
    }
}

function sortAZ(a, b){
    if(a > b){
        return 1;
    }
    if(a < b){
        return -1;
    }
    return 0;
} 

function sortZA(a, b){
    return sortAZ(b, a);
} 

function sortMinor(a, b){  
    return a - b;
} 

function sortMajor(a, b){  
    return sortMinor(b, a);
} 

export default rootReducer;
