import view from './filtro.html';
import './estilos-filtro.scss';
/* import {  } from './funciones-filtro'; */

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
};
