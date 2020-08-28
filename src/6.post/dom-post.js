import view from "./post.html";
import "./estilos-post.scss";
import "../firebase-functions/firebaseConfig";
import firebase from "firebase";
import { auth } from "../firebase-functions/firebaseConfig";
import { savePost, uploadImgFood, updatePost,} from "../firebase-functions/firebaseStore";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const postForm = divElement.querySelector("#post-form");
  const image = divElement.querySelector("#post-image");
  const recommendationTittle= divElement.querySelector("#post-form-title-main");
  const uploadImage = divElement.querySelector("#upload-image"); 
  const progressPercentage= localStorage.getItem("uploadImage")
  // El estado para editar el post es false porque al empezar la vista nuestro
  // formulario no se va actualizar todavía
  console.log(image )
  let editPostStatus = false;
  let id = "";

  /* ------ Subir foto gastronómica a la colección de imágenes -------*/
  const btnUploadFile = divElement.querySelector("#btn-upload-file");
  btnUploadFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const user = auth.currentUser;
    uploadImgFood(file, user.uid);
    uploadImage.setAttribute("value", progressPercentage)
  });
  

  const idPostStorageEditing = localStorage.getItem("id");
  id = idPostStorageEditing;

  const postStorageEditing = localStorage.getItem("docID");
  const title = postForm["post-title"];
  // const foodPhotolabel = postForm["post-image"];
  // console.log(foodPhotolabel);
  const description = postForm["post-description"];
  const typeOfFood = postForm["post-type-food"];
  const price = postForm["post-price"];
  const quality = postForm["post-quality"];
  const location = postForm["post-location"];
  let date = firebase.firestore.Timestamp.now();

  /* ------ Obtener valores del post a editar -------*/
  //  El estado del post es true porque ya lo vamos a editar
const getValuesToEdit= (postStorageEditing) => { 
  if (postStorageEditing) {
    const convertObjToJson = JSON.parse(postStorageEditing);
    title.value = convertObjToJson.title;
    description.value = convertObjToJson.description;
    typeOfFood.value = convertObjToJson.typeOfFood;
    price.value = convertObjToJson.price;
    quality.value = convertObjToJson.quality;
    location.value = convertObjToJson.location;
    recommendationTittle.innerText = "Edita tu recomendación";
    postForm["btn-post-form"].innerText = "Actualizar";
    btnUploadFile.removeAttribute("required");
    image.classList.add("hide")
    editPostStatus = true;
    
  } else {
    console.log("deli");
  }
}

getValuesToEdit(postStorageEditing)
  

  /* ------ Obtener datos del usuario del localStorage -------*/
  const userLocalStorage = localStorage.getItem("userSession");
  const convertObjJson = JSON.parse(userLocalStorage);
  const userId = convertObjJson.uid;
  const userName = convertObjJson.displayName;
  const userPhotoURL = convertObjJson.photoURL;

  const userProfile = (userPhotoURL) => {
    if (userPhotoURL) {
      return userPhotoURL;
    }
    return "src/images/userDefault.png";
  };

  const userNameDom = divElement.querySelector("#post-user-name");
  const userPhotoDom = divElement.querySelector("#post-user-photo");

  userNameDom.textContent = `${userName}`;
  userPhotoDom.src = userProfile(
    userPhotoURL
  ); /* userProfile(userPhotoURL) */ /* 'https://i.pinimg.com/originals/74/8d/ab/748dab62c4448f6d50cb92981e6f2708.jpg' */
 
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* ------ Obtener imagen del plato gastronómico del localStorage -------*/
  const urlFood = localStorage.getItem("imgNewPost");
  const urlImgFoodJson = JSON.stringify(urlFood)
  console.log(urlImgFoodJson)

    let likes = 0;

    try {
      // Si no se esta editando el post, realiza la promesa
      if (!editPostStatus) {

        await savePost(
          userId,
          userName,
          userPhotoURL,
          title.value,
          description.value,
          typeOfFood.value,
          price.value,
          quality.value,
          location.value,
          urlFood,
          likes,
          date
        );
      } //Si se edita el post
      else {
        await updatePost(id, {
          title: title.value,
          description: description.value,
          typeOfFood: typeOfFood.value,
          price: price.value,
          quality: quality.value,
          location: location.value,
          urlFood: urlFood,
          // foodPhoto:foodPhoto.value,
        });

        editPostStatus = false;
        id = "";
        localStorage.removeItem("docID");
        localStorage.removeItem("id");
      }
      // await getPosts();
      postForm.reset();
      window.location.hash = "#/home";
    } catch (error) {
      alert(error);
    }
  });

  return divElement;
};
