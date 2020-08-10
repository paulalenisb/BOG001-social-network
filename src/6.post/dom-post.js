import view from './post.html';
import './estilos-post.scss';
import '../firebase/firebaseConfig';
import { db } from '../firebase/firebaseStore'


export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const postForm = divElement.querySelector('#post-form');
  const postContainer = divElement.querySelector('#post-container');

  //El estado para editar el post es false porque al empezar la vista nuestro formulario no se va actualizar todavia
  let editPostStatus = false;
  let id = '';

  //Creamos el post en firebase con su colecciones y el objeto del doc
  const savePost = (title, description) =>
    db.collection('review').doc().set({
      title,
      description,
      /* details: {
        typeFood: ['#FastFood', '#DeMar'],
        price: [1, 2, 3],
        starts: [1, 2, 3],
        ubication: ['Zonat', 'ZonaG']
      }, */
  });
  
  //De mi colección de reviews traeme todo
  const getPosts = () => db.collection('review').get();

  //Cada vez que mis posts se actualicen, agreguen o borren, actualizar en tiempo real el timeline con el metodo onSnapshot()
  const onGetPosts = (callback) => db.collection('review').onSnapshot(callback);

  //Para eliminar un post necesito su id
  const deletePost = id => db.collection('review').doc(id).delete();

  //Editar el post con su respectivo id
  const getEditPost = (id) => db.collection('review').doc(id).get();

  //Actualizar la tarea, con los datos del id que me esta pasando la const
  const updatePost = (id, updatePost) => db.collection('review').doc(id).update(updatePost);
  

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
  
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //Capturar el nombre y la descripción del restaurante
    const title = postForm['post-title'];
    const description = postForm['post-description'];

    try{
            //Si no se esta editando el post, realiza la promesa
      if (!editPostStatus){
        await savePost(title.value,description.value);
      } //Si se edita el post
      else {
          await updatePost(id, {
            title: title.value,
            description: description.value,
          })

          editPostStatus = false;
          id = '';
          postForm['btn-post-form'].innerText = 'Publicar';
      };

      await getPosts();
      postForm.reset();

    } catch (error) {

    }

    });

  return divElement;
};

const navRoutes = document.getElementById('nav-routes');
navRoutes.classList.add('hide');