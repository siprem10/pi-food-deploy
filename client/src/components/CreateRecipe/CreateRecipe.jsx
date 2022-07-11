import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addRecipe, getAllDiets, updateRecipe } from '../../redux/actions/actions.js';
import "./CreateRecipe.css"

/* deberia ser form */
export default function CreateRecipe({id, toEdit}) {

    // los carteles de error deberian aparecer/desaparecer con alguna anim
    // el alert podria ser reemplazado con un txt debajo (color verde)

    // Relacionado a editar
    const [edit] = useState(isEdit());
    const isPrefs = useRef(false);
    const summaryRef = useRef(null);
    const stepsRef = useRef([]);
    const [updateSteps, setUpdateSteps] = useState(false);
    
    /* Estado menu */
    const [menu, setMenu] = useState({
        title: "Create Recipe",
        btn: "Send"
    });

    /* Estado de inputs */
    const [inputState, setInputState] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: [], // pasos para la reseta
        imgUri: "",
        diets: [] // posiciones
    });    

    /* Estado de errores */
    const [inputError, setInputError] = React.useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        imgUri: "",
        diets: "",
    });

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    const history = useHistory();

    useEffect(()=> {
        dispatch(getAllDiets());

        if(edit && !isPrefs.current){
            restorePrefs();

            // Solo se llama 1 vez, luego de dibujar el render
            onNextFrame(()=> autoSizeInput(summaryRef.current));
            onNextFrame(()=> updateSizeSteps());
        }

        if(updateSteps){
            //console.log(stepsRef.current);
            updateSizeSteps();
            setUpdateSteps(false);
        } 
        
        //eslint-disable-next-line
    }, [dispatch/* , inputState, inputError */, edit, toEdit, isPrefs, updateSteps]);

    function isEdit(){
        return (id && Object.keys(toEdit).length);
    }

    function restorePrefs(){
        setInputState({
            ...toEdit,
            diets: toEdit.diets.map(diet => diet.id)
        });
        setMenu({
            title: "Edit Recipe",
            btn: "Send"
        });
        isPrefs.current = true;
    }

    function updateSizeSteps(){
        const scrollY = window.scrollY;
        stepsRef.current.forEach(step => autoSizeInput(step, scrollY));    
    }

    function onNextFrame(callback) {
        setTimeout(function () {
            requestAnimationFrame(callback);
        });
    }

    /* function isValidImage(e){
        console.log(e);
    } */

    function isButtonDisabled(){

        return (
            !inputState.name ||
            !inputState.summary ||
            !inputState.healthScore ||
            !inputState.imgUri ||
            /* !(inputState.steps || inputState.steps.length) ||
            !(inputState.diets || inputState.diets.length) || */
            inputError.name ||
            inputError.summary ||
            inputError.healthScore ||
            inputError.steps ||
            inputError.imgUri ||
            inputError.diets);
    }

    function validateErrs(input){

        //console.log(input); // es el objeto el input
        let errors = {};
        const maxName = 60;
        const minSummary = 10;
        const maxSummary = 1500;
        const maxHs = 100;
        const minHs = 0;
      
            if(!input.name){
                errors.name = 'Name is required'; 
            } else if(input.name.replaceAll(" ", "").length === 0){
                errors.name = 'Name is required'; 
            }
            else if(input.name.length > maxName){
                errors.name = `Name is too long (${input.name.length}/${maxName})`; 
            }

            if(!input.summary){ 
                errors.summary = 'Summary is required'; 
            } else if(input.summary.replaceAll(" ", "").length === 0){
                errors.summary = 'Summary is required'; 
            }
            else if(input.summary.length < minSummary){
                errors.summary = `Summary is too short (${input.summary.length}/${minSummary})`; 
            } else if(input.summary.length > maxSummary){
                errors.summary = `Summary is too long (${input.summary.length}/${maxSummary})`; 
            }

            if(!input.healthScore){
                errors.healthScore = 'Health Score is required'; 
            } else if(input.healthScore <= minHs || input.healthScore > maxHs || typeof(Number(input.healthScore)) !== "number"){
                errors.healthScore = 'Health Score is invalid (1-100)'; 
            }

            if(!input.steps || !input.steps.length){
                errors.steps = 'At least one step is required';
            } else {
                // reviso que todos los pasos no esten vacios
                for(let i=0; i<input.steps.length; i++){
                    if(input.steps[i].replaceAll(" ", "").length === 0){
                        //console.log(input.steps[i])
                        errors.steps = 'Steps cannot be empty';
                        break;
                    }
                }
            }    

            if(!input.imgUri){
                errors.imgUri = 'Image is required'; 
            } else if(input.summary.length > maxSummary){
                errors.summary = `Summary is too long (${input.summary.length}/${maxSummary})`; 
            }

            if(!input.diets || !input.diets.length){
                errors.diets = 'At least one diet is required'; 
            }        
        
        return errors;
    }

    function isValidHs(name, value){
        
        if(name === "healthScore"){
            if(value && value.length > 3) return true;
            if(typeof(Number(value)) !== "number") return true;        
            if(value < 0 || value > 100)  return true;       
            if(value.includes("."))  return true;
        }
                 
        return false;
    }

    function updateState(name, value){
        
        setInputState({
            ...inputState,     
            [name]: value
        });
    }

    function updateStateErr(name, value){     
        const objErrors = validateErrs({...inputState, [name]: value});
        setInputError(objErrors);
    }

    function handleOnChange(e){

        const name = e.target.name;
        const value = e.target.value;

        if(isValidHs(e.target.name, e.target.value)){
            return;
        }
        //console.log("pase");

        // actualizo los estados
        updateState(name, value);
        updateStateErr(name, value);
    }

    // guardo las dietas en el array
    function handleOnCheck(e){
  
        const name = e.target.name;
        const value = e.target.value;
        let diets = inputState.diets.map(e => e);
        
        // actualizo los estados
        if(!diets.find(diet => diet === Number(value))){
            updateState(name, [...diets, Number(value)]);
            updateStateErr(name, value);
            //console.log("x")
        } else{ 

            // solo hago el checkeo si dieta tiene elementos
            if(diets.length){
                // si el elemento ya existe lo borro
                diets = diets.filter(diet => diet !== Number(value));

                updateState(name, [...diets]);
                updateStateErr(e.target.name, diets);
            }
            //console.log("y")
        }
    }

    function autoSizeInput(target, scrollY) {
        if(!target) return;

        target.style.height = 'inherit';
        target.style.height = `${target.scrollHeight}px`;
        
        if(scrollY){
            window.scrollTo(window.scrollX, scrollY);
        }
        //console.log(scrollY);
        //console.log(window.scrollY);
    }

    function handleSummaryInput(e) {
        autoSizeInput(e.target);
        handleOnChange(e); // actualizo el state
    }

    function updateStateCard(e){

        const name = e.target.name;
        const id = Number(e.target.id);
        const steps = inputState.steps.map(e => e);

        steps[id] = e.target.value;

        updateState(name, [...steps]);
        // reviso todos los elem no esten vacios      
        updateStateErr(e.target.name, steps);
    }

    function handleStepInput(e) {
        autoSizeInput(e.target);
        updateStateCard(e); // actualizo el state
    }

    function handleStepBtn(e) {
       
        const steps = inputState.steps ? inputState.steps.map(e => e) : [];
        const id = Number(e.target.id);
        const posNext = id + 1;  

        if(e.target.name === "add"){
            
            // si el elemento que sigue existe
            if(typeof(steps[posNext]) !== "undefined"){                
                steps.splice(posNext, 0, ""); // creo un nuevo elemento "entre medio"
                updateState("steps", [...steps]);
                //console.log("a");
                setUpdateSteps(true);
            } else {  
                // creo un nuevo elemento al final 
                steps.push("");         
                updateState("steps", [...steps]);
                //console.log("b");
            }
        } else {
            steps.splice(id, 1); // borro el elemento clickeado
            updateState("steps", [...steps]);
            //console.log("c");
            setUpdateSteps(true);
        }
        updateStateErr("steps", steps);
    }

    function resetStates(){
        setInputState({
            name: "",
            summary: "",
            healthScore: "",
            steps: [],
            imgUri: "",
            diets: []
        }); 
        setInputError({
            name: "",
            summary: "",
            healthScore: "",
            steps: "",
            imgUri: "",
            diets: "",
        }); 
    }

    function redirectTo(path){ 
        if(path){
            history.push(path);
        }       
    }

    function handleOnSubmit(e){
        e.preventDefault(); // evito que se recarge la pág

        if(!edit){
            dispatch(addRecipe(inputState));
            alert(`Recipe ${inputState.name} created sucessfully!`);
            resetStates();
        } else {
            dispatch(updateRecipe(toEdit.id, inputState));
            alert(`Recipe ${inputState.name} edited sucessfully!`);
            redirectTo("/home");
        }
    }

  return (
    <div className="createContainer">
      <div className="createRecipe">
         <form onSubmit={e=> e.preventDefault()}>

            <div className="createTitle">
                <h1>{menu.title}</h1>
            </div>
            
            <label>Name</label>
            <div className="col">
                <input
                    placeholder="Name"
                    type="text" 
                    name="name" 
                    value={inputState.name} 
                    onChange={(e)=> handleOnChange(e)}>                
                </input>
                <div className="divErr">
                    {inputError.name && <p className="error">{inputError.name}</p>} 
                </div>
            </div> 

            <label>Summary</label>
            <div className="col">
                <textarea
                    ref={summaryRef}
                    className="summaryInput"
                    placeholder="Summary"
                    name="summary"
                    value={inputState.summary}
                    onChange={(e)=> handleSummaryInput(e)}>                    
                </textarea>
                <div className="divErr">
                    {inputError.summary && <p className="error">{inputError.summary}</p>} 
                </div>
            </div> 

            <label>Health Score (%)</label>
            <div className="col">
                <input 
                    placeholder="Health Score (%)"
                    type="number"
                    min="1"
                    max="100"
                    name="healthScore"
                    value={inputState.healthScore}
                    onChange={(e)=> handleOnChange(e)}>
                </input>
                <div className="divErr">
                    {inputError.healthScore && <p className="error">{inputError.healthScore}</p>}
                </div> 
            </div> 

            <label>Image</label>
            <div className="col">
                <input 
                    placeholder="Image"
                    type="text"
                    name="imgUri"
                    value={inputState.imgUri}
                    onChange={(e)=> handleOnChange(e)}>                    
                </input>
                {/* <img src={inputState.imgUri} onError={isValidImage}></img> */}
                <div className="divErr">
                    {inputError.imgUri && <p className="error">{inputError.imgUri}</p>}    
                </div>        
            </div> 
        
            {/* <label>Steps</label> */}

                <div className="col offLabel">
                    <div className="stepHeader">
                        <div className="rowStepHeader">
                            <h1 className="numStep">{"Steps"}</h1>
                        </div>
                        <div className="rowStepHeaderBtn">
                            <button onClick={(e)=> handleStepBtn(e)} id={-1} name="add" className="btnStep btnAddStep">Add First</button>                            
                        </div>
                    </div>
                </div>
                
                {inputState.steps && inputState.steps.length > 0 && inputState.steps.map((step, i) => 
                <div key={i} className="col">
                    <div className="textareaHeader">
                        <div className="rowStep">
                            <h1 className="numStep">{`${i+1}`}</h1>
                        </div>
                        <div className="rowStepBtn">
                            <button onClick={(e)=> handleStepBtn(e)} id={i} name="add" className="btnStep">Add</button>
                            <button onClick={(e)=> handleStepBtn(e)} id={i} name="remove" className="btnStep">Delete</button>
                        </div>
                    </div>                
                    <textarea
                        ref={(ref) => (stepsRef.current[i] = ref)}
                        id={i}
                        placeholder="Write a new step..."
                        name="steps"
                        value={`${step}`}
                        className="textarea"
                        onChange={(e)=> handleStepInput(e)}>
                    </textarea>
                </div>)}  

                <div className="divErr">
                    {inputError.steps && <p className="error">{inputError.steps}</p>}
                </div>           

            <div className='col'>
                {diets && diets.length > 0 &&  
                    <>
                        <h1 className="createTitleDiet">Types of diet</h1>           
                        <div className='rowPrueba'>               
                            {diets.map(diet =>
                                <div key={diet.id} className="rowDiet"> 
                                    <input
                                        type="checkbox"
                                        name="diets"
                                        value={diet.id}
                                        onChange={(e)=> handleOnCheck(e)}                                        
                                        checked={inputState.diets.find((id) => id === diet.id) ? true : false}>                    
                                    </input>   
                                    <p>{diet.name}</p>
                                </div>                   
                            )}   
                        </div>
                    </>
                }
                <div className="divErrDiet">
                    {inputError.diets && <p className="errorDiet">{inputError.diets}</p>}
                </div> 
            </div>
                

            <button
                onClick={(e)=> handleOnSubmit(e)}
                className="btnSubmit"
                disabled={isButtonDisabled()}
                type='submit'>{menu.btn}
            </button>
         </form>
      </div>
    </div>
   );
};
