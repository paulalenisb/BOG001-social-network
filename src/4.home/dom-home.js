import view from './home.html';
import './estilos-home.scss';
import '../firebase/firebaseConfig';
import { onGetPosts, deletePost } from '../firebase/firebaseStore';
/* import {  } from './funciones-home'; */

export default () => {

    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const postContainer = divElement.querySelector('#post-container');
    let id = '';

    //Cuando la ventana cargue, traer el contenido del DOM, se ejecuta el evento de getEditPosts
    window.addEventListener('DOMContentLoaded', async (e) => {
      onGetPosts((querySnapshot) => {
        postContainer.innerHTML = '';
        
        //Con querySnapshot recorremos los objetos que hemos creado en docs
        querySnapshot.forEach((doc) => {
          const post = doc.data();
  
          //Mostrar los post 
          postContainer.innerHTML += `
            <div class="post-container"> 
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              <!-- Los atributos data-*  permiten almacenar información adicional sobre un elemento HTML -->
              <button class='btn-delete' data-id="${doc.id}"> Eliminar </button>
              <button class='btn-edit' data-id="${doc.id}"> Editar </button>
            </div>`;
  
          });
  
            //Función para eliminar post
            const btnDelete = postContainer.querySelectorAll('.btn-delete');
          
            btnDelete.forEach((btn) => {
              btn.addEventListener('click', async (e) =>{
                try {
                  await deletePost(e.target.dataset.id)
                  // console.log(e.target.dataset.id)
                } catch (error) {
  
                }
            })
          });

          const btnEdit = postContainer.querySelectorAll('.btn-edit');

          btnEdit.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              try {
                const doc = await getEditPost(e.target.dataset.id)
                const post = doc.data();
                postForm['post-title'].value = post.title;
                postForm['post-description'].value = post.description;
  
                //El estado del post es true porque ya lo vamos a editar
                editPostStatus = true;
                id = doc.id;
                postForm['btn-post-form'].innerText = 'Actualizar';
              
              } catch (error) {

              }
            });
          });
        });
      });
      

    return divElement;
};
