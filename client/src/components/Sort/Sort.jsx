import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveAppPrefs, sortRecipes } from "../../redux/actions/actions";
import ic_menu from "../../assets/ic_menu.png";
import ic_az from "../../assets/ic_az.png";
import ic_za from "../../assets/ic_za.png";
import ic_heart_plus from "../../assets/ic_heart_plus.png";
import ic_heart_minus from "../../assets/ic_heart_minus.png";
import "./Sort.css";

export default function Sort({sortPref}) {
  
    const sorts = [
        {
            id: 0,
            option: "Ascending",
            value: "A-Z",
            img: ic_az,
        },
        {
            id: 1,
            option: "Descending",
            value: "Z-A",
            img: ic_za,
        },
        {
            id: 2,
            option: "Healthier",
            value: "+HS",
            img: ic_heart_plus,
        },
        {
            id: 3,
            option: "Less healthy",
            value: "-HS",
            img: ic_heart_minus,
        }
    ];

    const dispatch = useDispatch();
    const [menu, setMenu] = useState(findId()); 
    const [sort, setSort] = useState(sortPref.value);

    // hago la petición
    useEffect(() => {
        dispatch(sortRecipes(sort));
    }, [dispatch, sort]);
     
    function findId(){
        const find = sorts.find(e => e.option === sortPref.option);

        if(!find){
            return {
                selectOption: "Sort",
                selectOptionId: -1,
                selectIc: "",
                toggle: false
            }
        }

        return {
            selectOption: find.option,
            selectOptionId: find.id,
            selectIc: find.img,
            toggle: false
        };
    }

    // estado para ver/ocultar menu
    function toggle(){
        setMenu({...menu, toggle: !menu.toggle});
        //console.log("toggle");
    }

    // al clickear en una opcion
    function optionClick(e){

        const id = Number(e.target.id);
        //console.log(id);

        // si la opción no está seleccionada
        if(menu.selectOptionId !== id){
            setMenu({
                ...menu,
                selectOption: sorts[id].option,
                selectOptionId: id,
                selectIc: sorts[id].img, /* el id es el indice (asi lo hice)*/
                toggle: false
            });

            setSort(sorts[id].value);
            dispatch(saveAppPrefs({sort: {option: sorts[id].option, value: sorts[id].value}}));
            //console.log("update");
        } else {
            toggle();
        }        
    }
    return (
        <div className="sortContainer">

            <div className={!menu.toggle ? "sortDiv" : "sortDiv active"}>

                <div onClick={toggle} className="sortHead">
                    <div className="sortHeadTxt">
                        <span className="optionTxt">{menu.selectOption}</span>
                        {menu.selectIc && <img src={menu.selectIc} alt="not found"></img>}
                    </div>
                    <div className="sortHeadIc">
                        <img src={ic_menu} alt="not found"></img>
                    </div>                  
                </div>

                <div className="options">
                    {sorts && sorts?.map((sort, i) => 
                        <div key={sort.id} id={i} onClick={optionClick} className={menu.selectOptionId !== sort.id ? "option" : "option active"}>
                            <img src={sort.img} id={i} className="sortImg" alt="not found"></img>
                            <span id={i} className="optionTxt">{sort.option}</span>
                        </div>                        
                    )}                    
                </div>

            </div>

        </div>
        
    );
};