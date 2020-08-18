import view from "./home.html";
import "./estilos-home.scss";
import "../firebase-functions/firebaseConfig";
import { onGetPosts, deletePost, savePost } from "../firebase-functions/firebaseStore";


export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const postContainer = divElement.querySelector("#post-container");
  const id = "";

  // Cuando la ventana cargue, traer el contenido del DOM, se ejecuta el evento de getEditPosts
  // window.addEventListener('Load', async (e) => {
  // console.log('DOMContentLoaded');
  onGetPosts(async (querySnapshot) => {
    postContainer.innerHTML = "";

    // Con querySnapshot recorremos los objetos que hemos creado en docs
    querySnapshot.forEach((doc) => {
      const post = doc.data();
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

      if (post.quality === "1") {
        post.quality = "★☆☆";
      }
      if (post.quality === "2") {
        post.quality = "★★☆";
      }
      if (post.quality === "3") {
        post.quality = "★★★";
      }
      if (post.price === "1") {
        post.price = "$ 0 - 20k";
      }
      if (post.price === "2") {
        post.price = "$$ 21k - 50k";
      }
      if (post.price === "3") {
        post.price = "$$$ 51k +";
      }

      // Mostrar los post//
      postContainer.innerHTML += `
      <div class="post-container">
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
      <img src="${post.foodPhoto}" class="post-food-photo" />
      <div class="post-user-info">
        <div class="post-user-data">
          <img src="${post.userPhoto}" class="post-user-data-photo"/>
          <h3 class="post-user-data-name">${post.name} </h3>
        </div>
        <div class="post-container-likes">
          <p class="post-container-likes-icon"></p>
          <i type="button" id="btn-like" class="far fa-heart"></i>
        </div>
      </div>
      <div>
        <p class="post-description">${post.description}</p>
      </div>
      <div>
      <select name="options" id="user-options" class="post-options">
      <option value="..." class="post-options-main">...</option>
      <option value="Editar" id="post-delete" class="post-options-delete">Editar</option>
      <option value="Eliminar" class="post-options-info">Eliminar</option>
    </select>  
      </div>
    </div>
    <!-- Los atributos data-*  permiten almacenar información adicional sobre un elemento HTML -->
    <button class='btn-delete' data-id="${doc.id}"> Eliminar </button>
    <button class='btn-edit' data-id="${doc.id}"> Editar </button>
    </div>`;
    });


// let count = 0;
// const textHolderlikes =postContainer.querySelectorAll('.post-container-likes-icon')

    // Función para cambiar el estado de los likes
    // const deletePost = () =>{
    //   savePost.uid
      
    // }
    const btnLike = postContainer.querySelectorAll(".fa-heart");

    btnLike.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let count = 0;
        e.target.classList.toggle("fill-heart");
        e.target.textContent = ++count;
    })
  });
    // Función para eliminar post
    const btnDelete = postContainer.querySelectorAll(".btn-delete");

    btnDelete.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          await deletePost(e.target.dataset.id);
          // console.log(e.target.dataset.id)
        } catch (error) {
          alert(error);
        }
      });
    });

    const btnEdit = postContainer.querySelectorAll(".btn-edit");

    //   btnEdit.forEach((btn) => {
    //     btn.addEventListener('click', async (e) => {
    //       try {
    //         const doc = await getEditPost(e.target.dataset.id);
    //         const post = doc.data();
    //         postForm['post-title'].value = post.title;
    //         postForm['post-description'].value = post.description;

    //         // El estado del post es true porque ya lo vamos a editar
    //         editPostStatus = true;
    //         id = doc.id;
    //         postForm['btn-post-form'].innerText = 'Actualizar';
    //       } catch (error) {
    //       }
    //     });
    //   });
    // });
  });

  return divElement;
};
