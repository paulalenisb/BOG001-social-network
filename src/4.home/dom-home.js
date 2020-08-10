import view from './home.html';
import './estilos-home.scss';
/* import {  } from './funciones-home'; */

export default () => {

  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
};
