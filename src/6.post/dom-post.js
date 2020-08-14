import view from './post.html';
import './estilos-post.scss';
import '../firebase-functions/firebaseConfig';
import { savePost } from '../firebase-functions/firebaseStore';
/* import { lerattoUser } from '../firebase-functions/firebaseAuth'; */

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const postForm = divElement.querySelector('#post-form');


  // El estado para editar el post es false porque al empezar la vista nuestro
  // formulario no se va actualizar todavía

  const editPostStatus = false;
  const id = '';

  // Cuando la ventana cargue, traer el contenido del DOM, se ejecuta el evento de getEditPosts


  // const btnEdit = postContainer.querySelectorAll('.btn-edit');

  //   btnEdit.forEach((btn) => {
  //     btn.addEventListener('click', async (e) => {
  //       try {
  //         const doc = await getEditPost(e.target.dataset.id)
  //         const post = doc.data();
  //         postForm['post-title'].value = post.title;
  //         postForm['post-description'].value = post.description;

  //         //El estado del post es true porque ya lo vamos a editar
  //         editPostStatus = true;
  //         id = doc.id;
  //         postForm['btn-post-form'].innerText = 'Actualizar';

  //       } catch (error) {

  //       }
  //     });
  //   });
  // });

  // onst createEvent = async () => {
  //   const infLocalStorage = localStorage.getItem('session');
  //   const convetInfoJson = JSON.parse(infLocalStorage);
  //   const IdUser = convetInfoJson.user.uid;
  //   const nameUser = convetInfoJson.user.displayName;
  //   const photoURL = convetInfoJson.user.photoURL;
  //   const hour = document.getElementById('time').value;
  //   const date = document.getElementById('date').value;
  //   const sport = document.getElementById('sport').value;
  //   const place = document.getElementById('place').value;
  //   const description = document.getElementById('description').value;

  //   const file = container.querySelector('#image').files;
  //   let imgURL = '';
  //   if (file.length) {
  //     imgURL = await saveImg(file[0]);
  //   }

  //   const eventToCreate = {
  //     id: IdUser,
  //     nombre: nameUser,
  //     photo: photoURL,
  //     fechaPublicacion: timeStamp,
  //     hora: hour,
  //     fechaEvento: date,
  //     deporte: sport,
  //     lugar: place,
  //     descripcion: description,
  //   };
  
  const userName = postForm['post-user-name']; 
  const userPhoto = postForm['post-user-photo'];
  userName.textContent = lerattoUser.email;
  console.log(lerattoUser.email) 

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturar el nombre y la descripción del restaurante
    const title = postForm['post-title'];
    const description = postForm['post-description'];
    const typeOfFood = postForm['post-type-food'];
    const price = postForm['post-price'];
    const quality = postForm['post-quality'];
    const location = postForm['post-location'];


    

    try {
      // Si no se esta editando el post, realiza la promesa
      // if (!editPostStatus){
      await savePost(title.value, description.value, typeOfFood.value, price.value, quality.value, location.value);
      // } //Si se edita el post
      // else {
      //     await updatePost(id, {
      //       title: title.value,
      //       description: description.value,
      //     })

      //     editPostStatus = false;
      //     id = '';
      //     postForm['btn-post-form'].innerText = 'Publicar';
      // };

      // await getPosts();
      postForm.reset();
      window.location.hash = '#/home';
    } catch (error) {
      alert(error);
    }
  });

  return divElement;
};
