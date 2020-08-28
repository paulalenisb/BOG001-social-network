// Este es el punto de entrada de tu aplicacion

import { router } from './router/index.routes.js';
import './main.scss';

router(window.location.hash);
window.addEventListener('hashchange', () => {
  router(window.location.hash)
});

/* ------ Button active -------*/
/* const header = document.getElementById("nav-desktop");
const btns = header.getElementsByClassName("btn");
console.log(btns);

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  const current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
} */