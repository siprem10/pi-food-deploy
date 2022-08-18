import axios from 'axios';

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const RESET_DETAIL = "RESET_DETAIL";
export const ADD_RECIPE = "ADD_RECIPE";
export const GET_ALL_DIETS = "GET_ALL_DIETS";

// ORDEN Y FILTRO
export const SORT_RECIPES = "SORT_RECIPES";
export const FILTER_RECIPES = "FILTER_RECIPES";

// EXTRAS
export const DELETE_RECIPE = "DELETE_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";

export const SAVE_APP_PREFS = "SAVE_APP_PREFS";

export const getAllRecipes = (setLoading, query) => {

    setLoading(true);
    return function (dispatch) {
      axios.get(`/recipes${query}`)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: GET_ALL_RECIPES, payload: response });
        })
        .catch(error => console.log(new Error(error)))
        .finally(()=> setLoading(false));  
    };
};

export const getAllWithFilter = (setLoading, query, filter) => {

    setLoading(true);
    return function (dispatch) {
      axios.get(`/recipes${query}`)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: GET_ALL_RECIPES, payload: response });
            dispatch({ type: FILTER_RECIPES, payload: filter });
        })
        .catch(error => console.log(new Error(error)))
        .finally(()=> setLoading(false));  
    };
};

/* export const refreshRecipes = () => {

    return function (dispatch) {
      axios.get(`/recipes`)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: GET_ALL_RECIPES, payload: response });
        })
        .catch(error => console.log(new Error(error)))
    };
}; */
 
/*
return async
let result = await axios(`/recipes`);
dispatch({ type: GET_ALL_RECIPES, payload: result.data }); 
*/ 

export const getRecipeDetail = (id, setLoading) => {

    setLoading(true);
    return function (dispatch) {
        axios.get(`/recipes/${id}`)
            .then(response => response.data)
            .then(response => {
                dispatch({ type: GET_RECIPE_DETAIL, payload: response });
            })
            .catch(error => console.log(new Error(error)))
            .finally(()=> setLoading(false));  
        };
};

export const resetDetail = () => {
  
    return {type: RESET_DETAIL};
};

// le paso un obj con la data del form
export const addRecipe = (data) => {
  
    return function (dispatch) {
      axios.post(`/recipes/`, data)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: ADD_RECIPE, payload: response});
        })
        .catch(error => console.log(new Error(error)));  
    };
};

export const deleteRecipe = (id) => {

    return function (dispatch) {
      axios.delete(`/recipes/${id}`)
        .then(response => response.data)
        .then(id => {
            dispatch({ type: DELETE_RECIPE, payload: id });
        })
        .catch(error => console.log(new Error(error)));  
    };
};
/* export const deleteRecipe = (id) => {

    return function (dispatch) {
      axios.delete(`/recipes/`, { data: { id: id } })
        .then(response => response.data)
        .then(id => {
            dispatch({ type: DELETE_RECIPE, payload: id });
        })
        .catch(error => console.log(new Error(error)));  
    };
}; */

export const updateRecipe = (id, data) => {

    return function (dispatch) {
      axios.put(`/recipes/${id}`, data)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: UPDATE_RECIPE, payload: response });
        })
        .catch(error => console.log(new Error(error)));  
    };
};

export const getAllDiets = () => {

    return function (dispatch) {
      axios.get(`/diets/`)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: GET_ALL_DIETS, payload: response });
        })
        .catch(error => console.log(new Error(error)));  
    };
};

export const sortRecipes = (sort) => {
    return {type: SORT_RECIPES, payload: sort};        
};

export const filterRecipes = (filter) => {
    return {type: FILTER_RECIPES, payload: filter};        
};

export const saveAppPrefs = (pref) => {
    return {type: SAVE_APP_PREFS, payload: pref};        
};
