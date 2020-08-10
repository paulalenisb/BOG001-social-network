import view from './profile.html';
import { exit,} from '../firebase-functions/firebaseAuth'


export default () => {
  const divElement = document.createElement('div');
  divElement.className = "logged-in";
  divElement.innerHTML = view;

  const btnClick = divElement.querySelector('#btn-sign-out');
  const userName = divElement.querySelector('#user-name');
  // const profilepicture= divElement.querySelector('#profile-picture');
   const userInfo = (user) => {
     username.innerHTML=`${user.displayName}`
   }

  btnClick.addEventListener('click', () => {
    exit();
    window.location.hash = '#/login';

  });

  return divElement;
};
