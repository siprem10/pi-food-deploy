import React from 'react';
import "./Pagination.css";

export default function Pagination({ cardsPerPage, totalCards, setPaginate, currentPage }) {

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    function changePaginate(id){      
        setPaginate(Number(id));
    }

    function changeBack(){ 
        const back = currentPage-1;
        /* console.log(back); */
        if(back >= pageNumbers[0]){
            changePaginate(back);
        }     
    }

    function changeNext(){      
        const next = currentPage+1;
        /* console.log(next); */
        if(next <= pageNumbers[pageNumbers.length-1]){
            changePaginate(next);
        }   
    }

    // si el item select coincide con la pág 
    // lo hice para que se ponga active
    function isItemSelect(numItem){
        return (numItem === currentPage);
    }

    // si la pag actual no es la primera
    function isItemFirst(){
        return (currentPage === pageNumbers[0]);
    }

    // si la pag actual no es la ultima
    function isItemLast(){
        return (currentPage === pageNumbers[pageNumbers.length-1]);
    }

    /* function generateId(id){
        if(!id || isNaN(id)) return -1;
        return id;
    } */

    function generateId(id, iteration){
        if(iteration === 0) return 1;
        if(iteration > 0 && isNaN(id)) return pageNumbers[pageNumbers.length-1];
        return id;
    }

    // desde donde estoy parado muestro 4 hacia adelante
    function limitPag(item, items){
        let window = 5, more = "...", //configs
            nothin = [], //util
            limit = items.length - window,
            i = Math.max(0, Math.min(limit, items.indexOf(item) - (window>>1)));


            if(i>0 && i<limit){
                //console.log("a");
                return nothin.concat(
                    i > 0? more: nothin,
                    items.slice(i+1, i + window-1),
                    i < limit? more: nothin
                );
            }

            if(i>0){
                //console.log("b");
                return nothin.concat(
                    i > 0? more: nothin,
                    i > 0? items.slice(i+1, i + window) : items.slice(i, i + window),
                );
            }

            if(i < limit){
                //console.log("c");
                return nothin.concat(  
                    i < limit? items.slice(i, i + window-1) : items.slice(i, i + window),
                    i < limit? more: nothin
                );
            }
    }
  
    return (
        <div>
            {pageNumbers.length > 1 &&
                <div className="pagination">
                    {<p className={!isItemFirst() ? "active" : "disabled"} onClick={changeBack}>{"<-"}</p>}
                    {limitPag((currentPage), pageNumbers)?.map((num, i) => (
                        <p className={isItemSelect(num)? "active" : ""} key={i} id={generateId(num, i)} onClick={(e) => changePaginate(e.target.id)}>
                            {num}
                        </p>                
                    ))}
                    {<p className={!isItemLast() ? "active" : "disabled"} onClick={changeNext}>{"->"}</p>}
                </div>
            }
        </div>
    );
};

