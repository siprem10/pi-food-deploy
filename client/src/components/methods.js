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


export async function postImageToCloudinary(e) {
    try {
      const files = e.target.files;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'henryspf');
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/henrysburgers/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
  
      const userImage = await res.json();
      const imgUri = userImage.secure_url;
  
      return imgUri;
    } catch (error) {
      return undefined;
    }
}