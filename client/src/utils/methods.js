import img_err_recipe from "../assets/img_err_recipe.jpg";
import { useEffect } from "react";
import Swal from "sweetalert2";

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

export const myLinkedin = "https://www.linkedin.com/in/rami-dominguez-full-stack/";

export function alert(title, text, icon = 'success') {    
  Swal.fire({
      icon: icon ?? "error",
      title: title,
      text: text,
      confirmButtonColor: '#ff714e'
   })
}