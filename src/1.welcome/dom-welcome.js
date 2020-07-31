import view from './welcome.html';
import './estilos-welcome.css';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const btnClick = divElement.querySelector('#btnClick');
  btnClick.addEventListener('click', () => {
    alert('click');
  });

  return divElement;
};
