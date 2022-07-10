import React, { useEffect, useState } from "react";
import ic_menu from "../../assets/ic_menu.png";
import ic_az from "../../assets/ic_az.png";
import ic_za from "../../assets/ic_za.png";
import ic_heart_plus from "../../assets/ic_heart_plus.png";
import ic_heart_minus from "../../assets/ic_heart_minus.png";
import "./Sort.css";
import { useDispatch } from "react-redux";
import { sortRecipes } from "../../redux/actions/actions";

export default function Sort() {
  
    const sorts = [
        {
            id: 0,
            option: "Ascending",
            value: "A-Z",
            img: ic_az,
            id_rel: [2, 3]
        },
        {
            id: 1,
            option: "Descending",
            value: "Z-A",
            img: ic_za,
            id_rel: [2, 3]
        },
        {
            id: 2,
            option: "Healthier",
            value: "+HS",
            img: ic_heart_plus,
            id_rel: [0, 1]
        },
        {
            id: 3,
            option: "Less healthy",
            value: "-HS",
            img: ic_heart_minus,
            id_rel: [0, 1]
        }
    ]; 

    const dispatch = useDispatch();
    const [menu, setMenu] = useState({
        selectOption: "Sort",
        selectOptionsId: [0,2],
        selectIc: [],
        toggle: false
    }); 

    const [sort, setSort] = useState("");

    // hago la petición
    useEffect(() => {
        dispatch(sortRecipes(sort));
    }, [dispatch, sort]);

    // estado para ver/ocultar menu
    function toggle(){
        setMenu({...menu, toggle: !menu.toggle});
        console.log("toggle");
    }

    function isSelected(array, id){

        for(let i=0; i<array.length; i++){
            const idArr = array[i];
            if(id === idArr){
                return true;
            }
        }
        return false;
    }

    function isRelation(array, id){
        return isSelected(array, id);
    }

    // al clickear en una opcion
    function optionClick(e){

        const id = Number(e.target.id);
        console.log(id);

        // si no es un id válido
        if(!sorts[id]){
            return;
        }

        // si la opción no está seleccionada
        if(!isSelected(...menu.selectOptionsId, id)){

            //y si se puede relacionar
            if(isRelation(sorts[id].id_rel, id)){
            
               /*  setMenu({
                    ...menu,
                    selectOption: sorts[id].option,
                    selectOptionsId: [...menu.selectOptionsId, id],
                    selectIc: [...menu.selectIc, sorts[id].img],
                    toggle: false
                }); */
                console.log("update2");
            } else {

                /* setMenu({
                    ...menu,
                    selectOption: sorts[id].option,
                    selectOptionsId: [...menu.selectOptionsId, id],
                    selectIc: [...menu.selectIc, sorts[id].img],
                    toggle: false
                }); */
                console.log("update3");
            }
        }
        else {

            /* setMenu({
                ...menu,
                selectOption: sorts[id].option,
                selectOptionsId: [...menu.selectOptionsId, id],
                selectIc: [...menu.selectIc, sorts[id].img],
                toggle: false
            }); */
            console.log("update4");
        }
        toggle(); 
    }
    return (
        <div className="sortContainer">

            <div className={!menu.toggle ? "sortDiv" : "sortDiv active"}>

                <div onClick={toggle} className="sortHead">
                    <div className="sortHeadTxt">
                        <span className="optionTxt">{menu.selectOption}</span>
                        {menu.selectIc.length && <img src={menu.selectIc[0]} alt="not found"></img>}
                        {menu.selectIc.length && <img src={menu.selectIc[1]} alt="not found"></img>}
                    </div>
                    <div className="sortHeadIc">
                        <img src={ic_menu} alt="not found"></img>
                    </div>                  
                </div>

                <div className="options">
                    {sorts && sorts?.map((sort) => 
                        <div key={sort.id} id={sort.id} onClick={optionClick} className={menu.selectOptionsId.find(id => id === sort.id) ? "option active" : "option"}>
                            <img src={sort.img} id={sort.id} className="sortImg" alt="not found"></img>
                            <span id={sort.id} className="optionTxt">{sort.option}</span>
                        </div>                        
                    )}                    
                </div>

            </div>

        </div>
        
    );
};