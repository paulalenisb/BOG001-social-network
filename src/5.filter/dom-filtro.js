import view from './filtro.html';
import './estilos-filtro.scss';
/* import {  } from './funciones-filtro'; */
import { headerTemplate, footerTemplate } from '../header-footer/header-footer';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  divElement.insertAdjacentElement('afterbegin', headerTemplate());
  divElement.insertAdjacentElement('beforeend', footerTemplate());

  return divElement;
};
