import view from './post.html';
import './estilos-post.css';
import '../firebase/firebaseConfig';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
};
