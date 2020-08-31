import view from './home.html';
import './estilos-home.scss';
import { auth } from '../firebase-functions/firebaseConfig';
import { onGetPosts, deletePost } from '../firebase-functions/firebaseStore.js';

import { headerTemplate, footerTemplate } from '../header-footer/header-footer';
// const userId = auth.currentUser.uid;

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const postContainer = divElement.querySelector('#post-container');
  // const id = '';

  // Cuando la ventana cargue, traer el contenido del DOM, se ejecuta el evento de getEditPosts

  onGetPosts(async (doc) => {
    postContainer.innerHTML = '';
    const userId = auth.currentUser.uid;

    // Con querySnapshot recorremos los objetos que hemos creado en docs
    querySnapshot.forEach((doc) => {
    const post = doc.data();

    /* ------ Impresión Calidad -------*/
    if (post.quality === '1') {
      post.quality = '★☆☆';
    }
    if (post.quality === '2') {
      post.quality = '★★☆';
    }
    if (post.quality === '3') {
      post.quality = '★★★';
    }

    /* ------ Impresión Precio -------*/
    if (post.price === '1') {
      post.price = '$ 0 - 20k';
    }
    if (post.price === '2') {
      post.price = '$$ 21k - 50k';
    }
    if (post.price === '3') {
      post.price = '$$$ 51k +';
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
      return 'src/images/userDefault.png';
    };

    /* ------ Literal Select Eliminar/Borrar post -------*/
    let selectOptions = '';
    if (userId === post.uid) {
      selectOptions = `
        <select name="options" id="${post.uid}" data-id="${doc.id}"class="post-options">
          <option value="" class="post-options-main">...</option>
          <option value="Editar"  class="post-options-edit" id="${post.uid}" data-id="${doc.id}" onclick>Editar</option>
          <option value="Eliminar" class="post-options-delete">Eliminar</option>
        </select>  
        `;
    }

    /* ------ Literal post -------*/
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
    post.userPhoto,
  )}" class="post-user-data-photo"/>
            <h3 class="post-user-data-name">${post.name} </h3>
          </div>
          <div class="post-container-likes">
            <p class="post-container-likes-icon"></p>
            <i type="button" class="far fa-heart" id="${post.uid}" data-id="${doc.id}">${post.likes}</i>
          </div>
        </div>
          <p class="post-description">${post.description}</p>
        ${selectOptions} 
      </div>
      </div>
      </div>`;
    });

    // const btnLike = postContainer.querySelectorAll(".fa-heart");

    // btnLike.forEach((btn) => {
    //     btn.addEventListener("click", (e) => {
    //       let count = 0;
    //       let idDoc= "";
    //       e.target.classList.toggle("fill-heart");
    //       e.target.textContent = ++count;

    //       idDoc= e.target.dataset.id
    //       updatePost(idDoc,{
    //       likes:count
    //       })

    //     });
    //   });

    const homeAddEvent = () => {
    /* ------ Eliminar/Borrar post -------*/
      const btnOptions = divElement.querySelectorAll('.post-options');
      const modalDeletePost = divElement.querySelector('.modal-delete');

      btnOptions.forEach((btn) => {
        btn.addEventListener('change', async (e) => {
        // console.log('Holi');
          modalDeletePost.innerHTML = '';

          if (btn.value === 'Eliminar') {
          // Si es eliminar, crear modal
            const dataId = e.target.dataset.id;

            // if (userId === post.uid) {

            modalDeletePost.innerHTML = `
            <div class="overlay">
              <div class="modal">
                <p class="modal-text"> ¿Eliminar publicación? </p>
                  <div class="btn-modal-confirm-delete">
                    <button class="btn-modal modal-delete">Eliminar</button>
                    <button class="btn-modal modal-cancel">Cancelar</button>
                  </div>
              </div>
            </div> `;

            const btnModalDelete = modalDeletePost.querySelector('.modal-delete');
            btnModalDelete.addEventListener('click', async () => {
              try {
                await deletePost(dataId);

                modalDeletePost.innerHTML = '';
              } catch (error) {
                alert('error');
              }
            });

            const btnModalCancel = modalDeletePost.querySelector('.modal-cancel');

            btnModalCancel.addEventListener('click', () => {
              modalDeletePost.innerHTML = '';
            });
          } else if (btn.value === 'Editar') {
            // const doc = await getEditPost(e.target.dataset.id);
            // const post = doc.data();
            // localStorage.setItem('docID', JSON.stringify(post));
            // localStorage.setItem('id', doc.id);
            // window.location.hash = '#/post';
          }
        });
      });
    };

    homeAddEvent();
  });

  divElement.insertAdjacentElement('afterbegin', headerTemplate());
  divElement.insertAdjacentElement('beforeend', footerTemplate());

  return divElement;
};

/* ------ Likes -------*/
// const btnLike = postContainer.querySelectorAll(".fa-heart");

// btnLike.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     let count = 0;
//     e.target.classList.toggle("fill-heart");
//     e.target.textContent = ++count;
//   });
// });
