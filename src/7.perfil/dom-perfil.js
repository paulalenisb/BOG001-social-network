import view from './perfil.html';
import './estilos-perfil.scss';
/* import {  } from './funciones-perfil'; */

export default () => {

  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
};
