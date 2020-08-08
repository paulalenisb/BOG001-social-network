import view from './post.html';
import './estilos-post.scss';
import '../firebase/firebaseConfig';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
};

const navRoutes = document.getElementById('nav-routes');
navRoutes.classList.add('hide');