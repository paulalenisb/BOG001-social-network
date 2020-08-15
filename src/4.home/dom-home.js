import view from './home.html';
import './estilos-home.scss';
import '../firebase-functions/firebaseConfig';
import { onGetPosts, deletePost } from '../firebase-functions/firebaseStore';


export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const postContainer = divElement.querySelector('#post-container');
  const id = '';

  // Cuando la ventana cargue, traer el contenido del DOM, se ejecuta el evento de getEditPosts
  // window.addEventListener('Load', async (e) => {
  // console.log('DOMContentLoaded');
  onGetPosts(async (querySnapshot) => {
    postContainer.innerHTML = '';

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
    
      if(post.quality === "1"){
        post.quality = "★☆☆";
      }if(post.quality === "2"){
          post.quality = "★★☆";
      }if(post.quality === "3"){
          post.quality = "★★★";
      }
      // Mostrar los post//
      postContainer.innerHTML += `
            <div class="post-container"> 
              <img src="${post.userPhoto}" class="user-photo">
              <h3>${post.name}</h3>
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              <p>${post.typeOfFood}</p>
              <p>${post.price}</p>
              <p>${post.quality}</p>
              <p>${post.location}</p>
              <img src="${post.foodPhoto}" class="food-photo" >
              <!-- Los atributos data-*  permiten almacenar información adicional sobre un elemento HTML -->
              <button class='btn-delete' data-id="${doc.id}"> Eliminar </button>
              <button class='btn-edit' data-id="${doc.id}"> Editar </button>
            </div>`;
    });

    // Función para eliminar post
    const btnDelete = postContainer.querySelectorAll('.btn-delete');

    btnDelete.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        try {
          await deletePost(e.target.dataset.id);
          // console.log(e.target.dataset.id)
        } catch (error) {
          alert(error);
        }
      });
    });

    const btnEdit = postContainer.querySelectorAll('.btn-edit');

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
