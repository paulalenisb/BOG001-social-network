import view from './home.html';
import './estilos-home.scss';
import { auth } from '../firebase-functions/firebaseConfig';
import {
  onGetPosts, deletePost, getEditPost, updatePost,
} from '../firebase-functions/firebaseStore';
import { headerTemplate, footerTemplate } from '../header-footer/header-footer';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const postContainer = divElement.querySelector('#post-container');

  onGetPosts(async (querySnapshot) => {
    postContainer.innerHTML = '';
    const userId = auth.currentUser.uid;

    // Con querySnapshot recorremos los objetos que hemos creado en docs
    querySnapshot.forEach((doc) => {
      const post = doc.data();

      /* ------ Impresión Calidad -------*/
      const changeValueQuality = (value) => {
        let stars = '';
        switch (value) {
          case '1':
            stars = '★☆☆';
            break;
          case '2':
            stars = '★★☆';
            break;
          case '3':
            stars = '★★★';
            break;
          default:
            alert('campo no válido');
        }
        return stars;
      };

      /* ------ Impresión Precio -------*/
      const changeValuePrice = (value) => {
        let pesos = '';
        switch (value) {
          case '1':
            pesos = '$ 0 - 20k';
            break;
          case '2':
            pesos = '$$ 21k - 50k';
            break;
          case '3':
            pesos = '$$$ 51k +';
            break;
          default:
            alert('campo no válido');
        }
        return pesos;
      };

      /* ------ Mostrar icon de like según el usuario -------*/
      const usersLike = post.users;
      let likeIconFill = '';
      let likeIconStroke = ''; // Corazoncito vacío

      if (usersLike.includes(userId)) {
        likeIconFill = `
            <i type="button" class="far fa-heart fill-heart" id="${post.uid}" data-id="${doc.id}">${post.likes}</i>
          `;
      } else {
        likeIconStroke = `
            <i type="button" class="far fa-heart stroke-heart" id="${post.uid}" data-id="${doc.id}">${post.likes}</i>
        `;
      }

      /* ------ userPhoto Default -------*/
      const userProfile = (photoURL) => {
        if (photoURL) {
          return photoURL;
        }
        return 'https://firebasestorage.googleapis.com/v0/b/leratto-sn3.appspot.com/o/assets%2FuserDefault.png?alt=media&token=64b42670-1445-4ff7-8216-5a8093b6fb9e';
      };

      /* ------ Literal Select Eliminar/Borrar post -------*/
      let selectOptions = '';
      if (userId === post.uid) {
        selectOptions = `
        <select name="options" id="${post.uid}" data-id="${doc.id}"class="post-options">
          <option value="" class="post-options-main">...</option>
          <option value="Editar" class="post-options-edit" id="${post.uid}" data-id="${doc.id}">Editar</option>
          <option value="Eliminar" class="post-options-delete">Eliminar</option>
        </select>  
        `;
      }

      /* ------ Literal post -------*/
      postContainer.innerHTML += `
      <div class="post-container">
      <div class="post-food-photo-web" style= "background-image:url('${post.foodPhoto}')"></div>
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
            <p class="post-price">${changeValuePrice(post.price)}</p>
          </div>
          <div class="post-container-quality">
            <p class="post-quality">${changeValueQuality(post.quality)}</p>
          </div>
        </div>
        <div class="post-food-photo-mobile" style= "background-image:url('${post.foodPhoto}')"></div>
        <div class="post-user-info">
          <div class="post-user-data">
            <img src="${userProfile(post.userPhoto)}" class="post-user-data-photo"/>
            <h3 class="post-user-data-name">${post.name} </h3>
          </div>
          <div class="post-container-likes">
            ${likeIconFill}
            ${likeIconStroke}
          </div>
        </div>
          <p class="post-description">${post.description}</p>
        ${selectOptions} 
      </div>
      </div>
      </div>`;
    });

    /* ------ Funcionalidad like -------*/
    const btnLike = postContainer.querySelectorAll('.stroke-heart');
    btnLike.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getEditPost(e.target.dataset.id);
        const post = doc.data();
        const idDoc = doc.id;
        let users = post.users;
        let likes = post.likes;
        users.push(userId);
        e.target.classList.add('fill-heart');
        e.target.textContent = ++likes;
        updatePost(idDoc, {
          likes,
          users
        });
      });
    });

    /* ------ Funcionalidad dislike -------*/
    const btnDislike = postContainer.querySelectorAll('.fill-heart');
    btnDislike.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getEditPost(e.target.dataset.id);
        e.target.classList.remove('fill-heart');
        const post = doc.data();
        const idDoc = doc.id;
        let users = post.users;
        let likes = post.likes;
        e.target.textContent = --likes;
        const userPosition = users.indexOf(userId);
        if (userPosition > -1) {
        users.splice(userPosition, 1);
          }
        updatePost(idDoc, {
          likes,
          users
        });
      });
    });


    /* ------ Función eliminar/editar post -------*/
    const editDeletePost = () => {
      const btnOptions = divElement.querySelectorAll('.post-options');
      const modalDeletePost = divElement.querySelector('.modal-delete');

      btnOptions.forEach((btn) => {
        btn.addEventListener('change', async (e) => {
          modalDeletePost.innerHTML = '';

          /* ------ Borrar post -------*/
          if (btn.value === 'Eliminar') {
            const dataId = e.target.dataset.id;

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
            
            // Opción borrar en modal
            const btnModalDelete = modalDeletePost.querySelector('.modal-delete');
            btnModalDelete.addEventListener('click', async () => {
              try {
                await deletePost(dataId);
                modalDeletePost.innerHTML = '';
              } catch (error) {
                alert(error);
              }
            });

            // Opción cancelar en modal
            const btnModalCancel = modalDeletePost.querySelector('.modal-cancel');
            btnModalCancel.addEventListener('click', () => {
              modalDeletePost.innerHTML = '';
            });

            /* ------ Editar post -------*/
          } else if (btn.value === 'Editar') {
            const doc = await getEditPost(e.target.dataset.id);
            const post = doc.data();
            localStorage.setItem('docID', JSON.stringify(post));
            localStorage.setItem('id', doc.id);
            window.location.hash = '#/post';
          }
        });
      });
    };

    editDeletePost();
  });

  divElement.insertAdjacentElement('afterbegin', headerTemplate());
  divElement.insertAdjacentElement('beforeend', footerTemplate());

  return divElement;
};
