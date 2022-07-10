import React from 'react';
import "./Pagination.css";

export default function Pagination({ cardsPerPage, totalCards, setPaginate, currentPage }) {


    //pageNumbers = [1, 2, 3, 4, 5, 6 , 7 , 8 , 9 ,10, 11]
    //pageNumbers[0]; // primer elem
    //pageNumbers[pageNumbers.length - 1]; // ultimo elem
        
    /* let prueba = [1, 2, 3, 4, 5, 6 , 7 , 8 , 9 ,10, 11];
    for(let i=0; i<prueba.length; i++){

        if(i > 8){
            break;
        }
        console.log(prueba[i]);
    } */

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
  
    return (
        <div>
            <div className="pagination">
                {!isItemFirst() && pageNumbers.length > 0 && <p className="active" onClick={changeBack}>{"<-"}</p>}
                {pageNumbers.map((num) => (
                    <p className={isItemSelect(num)? "active" : ""} key={num} id={num} onClick={(e) => changePaginate(e.target.id)}>
                        {num}
                    </p>                
                ))}
                {!isItemLast() && pageNumbers.length > 0 && <p className="active" onClick={changeNext}>{"->"}</p>}
            </div>
        </div>
    );
};

/*return (      
    // aca veo si uso li en vez de a
    // aca los elementos se deberian mapear hasta maximo 9 por pagina  
    <div className="pagination">
        { <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a class="active" href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a> }
    </div>
);  
}*/

