import view from './welcome.html';
import './estilos-welcome.scss';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  window.addEventListener("load", function () {
    setTimeout(() => {
    window.location.hash = '#/login';  
    }, 6000); 
    
    
});

  return divElement;
};
