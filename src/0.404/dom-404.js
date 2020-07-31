import view from './404.html';
import './estilos-404.css';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const btnClick = divElement.querySelector('#btnClick');
  btnClick.addEventListener('click', () => {
    alert('click');
  });

  return divElement;
};
