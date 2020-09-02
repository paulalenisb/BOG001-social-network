import { exit } from '../firebase-functions/firebaseAuth';
import view from './profile.html';
import './estilos-profile.scss';
import { headerTemplate, footerTemplate } from '../header-footer/header-footer';

export default () => {
  const divElement = document.createElement('div');
  divElement.className = 'logged-in';
  divElement.innerHTML = view;

  const userNameProfile = divElement.querySelector('#user-name-profile');
  const userPhotoProfile = divElement.querySelector('#user-picture');

  const userLocalStorage = localStorage.getItem('userSession');
  const convertObjJson = JSON.parse(userLocalStorage);
  const userName = convertObjJson.displayName;
  const userPhotoURL = convertObjJson.photoURL;

  /* ------ userPhoto Default -------*/
  const userProfile = (photoURL) => {
    if (photoURL) {
      return photoURL;
    }
    return 'https://firebasestorage.googleapis.com/v0/b/leratto-sn3.appspot.com/o/assets%2FuserDefault.png?alt=media&token=64b42670-1445-4ff7-8216-5a8093b6fb9e';
  };

  userNameProfile.textContent = userName;
  userPhotoProfile.src = userProfile(userPhotoURL);

  /* ------ Cerrar sesión -------*/
  const btnClick = divElement.querySelector('#btn-sign-out');

  btnClick.addEventListener('click', () => {
    exit();
    window.location.hash = '#/login';
  });

  divElement.insertAdjacentElement('afterbegin', headerTemplate());
  divElement.insertAdjacentElement('beforeend', footerTemplate());

  return divElement;
};
