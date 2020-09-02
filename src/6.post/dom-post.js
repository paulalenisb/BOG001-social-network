import firebase from "firebase";
import view from "./post.html";
import "./estilos-post.scss";
import { auth } from "../firebase-functions/firebaseConfig";
import {
  savePost,
  uploadImgFood,
  updatePost,
} from "../firebase-functions/firebaseStore";
import { headerTemplate, footerTemplate } from "../header-footer/header-footer";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const postForm = divElement.querySelector("#post-form");
  const image = divElement.querySelector("#post-image");
  const recommendationTittle = divElement.querySelector(
    "#post-form-title-main");
  const uploadImage = divElement.querySelector("#upload-image");
  const progressPercentage = localStorage.getItem("uploadImage");
  
  // El estado para editar el post es false porque al empezar la vista nuestro
  // formulario no se va actualizar todavía
  let editPostStatus = false;
  let id = "";

  /* ------ Subir foto gastronómica a la colección de imágenes -------*/
  const btnUploadFile = divElement.querySelector("#btn-upload-file");
  btnUploadFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const user = auth.currentUser;
    uploadImgFood(file, user.uid);
    uploadImage.setAttribute("value", progressPercentage);
  });

  // Obtener campos del form
  const idPostStorageEditing = localStorage.getItem("id");
  id = idPostStorageEditing;

  const postStorageEditing = localStorage.getItem("docID");
  const title = postForm["post-title"];
  const description = postForm["post-description"];
  const typeOfFood = postForm["post-type-food"];
  const price = postForm["post-price"];
  const quality = postForm["post-quality"];
  const location = postForm["post-location"];
  const date = firebase.firestore.Timestamp.now();

  /* ------ Obtener valores del post a editar -------*/
  //  El estado del post es true porque ya lo vamos a editar
  const getValuesToEdit = (postEditing) => {
    if (postEditing) {
      const convertObjToJson = JSON.parse(postEditing);
      title.value = convertObjToJson.title;
      description.value = convertObjToJson.description;
      typeOfFood.value = convertObjToJson.typeOfFood;
      price.value = convertObjToJson.price;
      quality.value = convertObjToJson.quality;
      location.value = convertObjToJson.location;
      recommendationTittle.innerText = "Edita tu recomendación";
      postForm["btn-post-form"].innerText = "Actualizar";
      btnUploadFile.removeAttribute("required");
      image.classList.add("hide");
      uploadImage.classList.add("hide");
      editPostStatus = true;
    } else {
      console.log("Todavía no se puede editar");
    }
  };

  getValuesToEdit(postStorageEditing);

  /* ------ Obtener datos del usuario del localStorage -------*/
  const userLocalStorage = localStorage.getItem("userSession");
  const convertObjJson = JSON.parse(userLocalStorage);
  const userId = convertObjJson.uid;
  const userName = convertObjJson.displayName;
  const userPhotoURL = convertObjJson.photoURL;

  /* ------ userPhoto Default -------*/
  const userProfile = (photoURL) => {
    if (photoURL) {
      return photoURL;
    }
    return "https://firebasestorage.googleapis.com/v0/b/leratto-sn3.appspot.com/o/assets%2FuserDefault.png?alt=media&token=64b42670-1445-4ff7-8216-5a8093b6fb9e";
  };

  const userNameDom = divElement.querySelector("#post-user-name");
  const userPhotoDom = divElement.querySelector("#post-user-photo");

  userNameDom.textContent = `${userName}`;
  userPhotoDom.src = userProfile(userPhotoURL);
  
  const likes = 0;
  const users = [];

  /* ------ Enviar para crear/editar post -------*/
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener imagen del plato gastronómico del localStorage
    const urlFood = localStorage.getItem("imgNewPost");

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
          date,
          likes,
          users
        );
      } else {
        await updatePost(id, {
          title: title.value,
          description: description.value,
          typeOfFood: typeOfFood.value,
          price: price.value,
          quality: quality.value,
          location: location.value
        });

        editPostStatus = false;
        id = "";
        localStorage.removeItem("docID");
        localStorage.removeItem("id");
      }
      postForm.reset();
      window.location.hash = "#/home";
    } catch (error) {
      alert("error");
    }
  });

  divElement.insertAdjacentElement("afterbegin", headerTemplate());
  divElement.insertAdjacentElement("beforeend", footerTemplate());

  return divElement;
};
