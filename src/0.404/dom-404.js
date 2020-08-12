import view from './404.html';
import './estilos-404.scss';
/* import '../firebase/firebaseConfig'; */

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
};
