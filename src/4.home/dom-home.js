import view from "./home.html";
import "./estilos-home.scss";
import "../firebase-functions/firebaseConfig";
import {
  db,
  onGetPosts,
  deletePost,
  savePost,
} from "../firebase-functions/firebaseStore";
import * as firebase from "firebase";
import { auth } from "../firebase-functions/firebaseConfig";

// const userId = auth.currentUser.uid

// const db = firebase.firestore();
export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const postContainer = divElement.querySelector("#post-container");
  const id = "";

  // Cuando la ventana cargue, traer el contenido del DOM, se ejecuta el evento de getEditPosts

  onGetPosts(async (querySnapshot) => {
    postContainer.innerHTML = "";
    let selectOptions = "";
    const userId = auth.currentUser.uid;

    // Con querySnapshot recorremos los objetos que hemos creado en docs
    querySnapshot.forEach((doc) => {
      const post = doc.data();

      /* ------ Impresión Calidad -------*/
      if (post.quality === "1") {
        post.quality = "★☆☆";
      }
      if (post.quality === "2") {
        post.quality = "★★☆";
      }
      if (post.quality === "3") {
        post.quality = "★★★";
      }

      /* ------ Impresión Precio -------*/
      if (post.price === "1") {
        post.price = "$ 0 - 20k";
      }
      if (post.price === "2") {
        post.price = "$$ 21k - 50k";
      }
      if (post.price === "3") {
        post.price = "$$$ 51k +";
      }

      //   const changeValueQuality= () => {
      //   let stars= "";
      //   switch (post.quality) {
      //     case '1':
      //       stars = '★☆☆'
      //       break;
      //     case '2':
      //       stars ='★★☆'
      //       break;
      //     case '3':
      //       stars='★★★'
      //         break;
      //     default:
      //       '';
      //   }
      //   return stars
      // }

      /* ------ userPhoto Default -------*/
      const userProfile = (userPhotoURL) => {
        if (userPhotoURL) {
          return userPhotoURL;
        }
        return "src/images/userDefault.png";
      };

      /* ------ Literal Select Eliminar/Borrar post -------*/
      let selectOptions = "";
      if (userId === post.uid) {
        selectOptions = `
        <select name="options" id="${post.uid}" data-id="${doc.id}"class="post-options">
          <option value="" class="post-options-main">...</option>
          <option value="Editar"  class="post-options-edit" id="${post.uid}" data-id="${doc.id}" onclick>Editar</option>
          <option value="Eliminar" class="post-options-delete">Eliminar</option>
        </select>  
        `;
      }

      /* ------ Mostrar los post -------*/
      postContainer.innerHTML += `
        <div class="post-container">
        <img src="${post.foodPhoto}" class="post-food-photo-web"/>
        <div class="post-allinfo">
        <div class="post-container-info" id="post-main-info">
          <div class="post-container-info-main">
            <h3 class="post-title">${post.title}</h3>
            <div class="post-location">
              <i class="fas fa-map-marker-alt"></i>
              <p class="post-location-info">${post.location}</p> 
            </div>
          </div>
          <div class="post-container-food">
            <p class="post-type-food">${post.typeOfFood}</p>
          </div>
          <div class="post-container-price">
            <p class="post-price">${post.price}</p>
          </div>
          <div class="post-container-quality">
            <p class="post-quality">${post.quality}</p>
          </div>
        </div>
        <img src="${post.foodPhoto}" class="post-food-photo-mobile"/>
        <div class="post-user-info">
          <div class="post-user-data">
            <img src="${userProfile(
              post.userPhoto
            )}" class="post-user-data-photo"/>
            <h3 class="post-user-data-name">${post.name} </h3>
          </div>
          <div class="post-container-likes">
            <p class="post-container-likes-icon"></p>
            <i type="button" id="btn-like" class="far fa-heart"></i>
          </div>
        </div>
          <p class="post-description">${post.description}</p>
        ${selectOptions} 
      </div>
      </div>
      </div>`;

      /* ------ Eliminar/Borrar post -------*/
      const btnOptions = postContainer.querySelectorAll(".post-options");
      const modalDeletePost = divElement.querySelector(".modal-delete");

      btnOptions.forEach((btn) => {
        btn.addEventListener("change", () => {
          console.log('Holi');
          modalDeletePost.innerHTML = "";

          if (btn.value === "Eliminar") {
            if (userId === post.uid) {

            modalDeletePost.innerHTML += `
            <div class="overlay">
              <div class="modal">
                <p class="modal-text"> ¿Eliminar publicación? </p>
                  <div class="btn-modal-confirm-delete">
                    <button class="btn-modal modal-delete" id="delete${post.uid}" data-id="${doc.id}">Eliminar</button>
                    <button class="btn-modal modal-cancel">Cancelar</button>
                  </div>
              </div>
            </div> `;

            const btnModalDelete = modalDeletePost.querySelector(
              ".modal-delete"
            );
              btnModalDelete.addEventListener("click",  async(e) => {
                try {
                  await deletePost(e.target.dataset.id);
                  modalDeletePost.style.display = 'none';
                } catch (error) {
                  alert(error);
                }
              });
            
            const btnModalCancel = modalDeletePost.querySelector(".modal-cancel");

            btnModalCancel.addEventListener('click', () => {
              modalDeletePost.style.display = 'none';
            });

            };

          }else if (btn.value === "Editar") {
            console.log("chevre");
          }
        });
      });
    });

    /* ------ Likes -------*/
    const btnLike = postContainer.querySelectorAll(".fa-heart");

    btnLike.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let count = 0;
        e.target.classList.toggle("fill-heart");
        e.target.textContent = ++count;
      });
    });

    // btnOptions.forEach((btn) => {
    //   btn.addEventListener("change", async (e) => {
    //     if (btn.value === "Editar" && e.target.id == userId) {
    //       // window.location.hash= '#/post'
    //     }

    // try {
    //   const doc = await getEditPost(e.target.dataset.id);
    //   const post = doc.data();
    //   postForm['post-title'].value = post.title;
    //   postForm['post-description'].value = post.description;

    //   // El estado del post es true porque ya lo vamos a editar
    //   editPostStatus = true;
    //   id = doc.id;
    //   postForm['btn-post-form'].innerText = 'Actualizar';
    // } catch (error) {
    // }
    //   });
    // });
  });

  return divElement;
};
