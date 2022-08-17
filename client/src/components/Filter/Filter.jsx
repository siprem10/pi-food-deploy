import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets } from '../../redux/actions/actions.js';
import "./Filter.css";

export default function Filter({setFilter, filter}) {

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);

    const [option, setOption] = useState("All");

    // hago la petición
    React.useEffect(() => {
        dispatch(getAllDiets());
    }, [dispatch]);

    // seteo el nuevo state en header
    function onFilter(e){

        const value = e.target.value;

        // solo cambio la opción si no esta seleccionada
        if(option !== value){
            setOption(value);
            setFilter(e.target.name, value);
        }          
    }
        
    return (        
        <div className="filterContainer">
            <div className="filterDiv">
                <select value={filter} onChange={onFilter} name="filter">
                    <option value={""}>All</option>
                    {diets && diets?.map((diet, i) =>
                        <option key={i} value={diet.name}>{diet.name}</option>                    
                    )}                
                </select>
            </div>           
        </div>
    );
}