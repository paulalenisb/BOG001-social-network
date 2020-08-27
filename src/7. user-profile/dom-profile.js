import view from './profile.html';
import { exit } from '../firebase-functions/firebaseAuth';
import './estilos-profile.scss';
import { headerTemplate, footerTemplate} from "../header/header-footer";

export default () => {
  const divElement = document.createElement('div');
  divElement.className = 'logged-in';
  divElement.innerHTML = view;

  const btnClick = divElement.querySelector('#btn-sign-out');

  btnClick.addEventListener('click', () => {
    exit();
    window.location.hash = '#/login';
  });

  divElement.insertAdjacentElement('afterbegin', headerTemplate());
  divElement.insertAdjacentElement('beforeend', footerTemplate());

  return divElement;
};
