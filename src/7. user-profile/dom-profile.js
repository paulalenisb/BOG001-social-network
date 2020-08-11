import view from './profile.html';
import { exit,} from '../firebase/firebaseAuth'
import './estilos-profile.scss'


export default () => {
  const divElement = document.createElement('div');
  divElement.className = "logged-in";
  divElement.innerHTML = view;

  const btnClick = divElement.querySelector('#btn-sign-out');
  const userName = divElement.querySelector('#user-name');
 
   
  btnClick.addEventListener('click', () => {
    exit();
    window.location.hash = '#/login';

  });

  return divElement;
};
