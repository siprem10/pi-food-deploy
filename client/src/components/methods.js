import img_err_recipe from "../assets/img_err_recipe.png"
import { useEffect } from "react";

export function addDefaultSrc(e){
    e.target.src = img_err_recipe;
}

// me pide escribirlo en mayusculas
export function SetBodyImg(newImg){
    useEffect(() => {
        document.body.className = newImg;
        return () => document.body.className = 'transparent'; 
    }, [newImg]);
}