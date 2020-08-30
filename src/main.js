// Este es el punto de entrada de tu aplicacion

import { router } from './router/index.routes.js';
import './main.scss';

router(window.location.hash);
window.addEventListener('hashchange', () => {
  router(window.location.hash);
});

/* ------ Button active -------*/

/* const routerNav = (route) => {
  switch (route) {
    case '#/home':
      window.location = "#/home"
      break;
    case '#/filtro':
      window.location = "#/filtro"
      break;
    case '#/post':
      window.location = "#/post"
      break;
    case '#/profile':
      window.location = "#/profile";
      break;
    default:
      window.location = "#/home";
  }
}; */

/* const header = document.getElementById("nav-desktop");
const btns = header.getElementsByClassName("btn");
console.log(btns); */

/* for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    console.log(this.value);

    /* routerNav(this.value) */
/* router(this.value) */

/*   if(this.value == "#/home"){
      window.location = "#/home"
    } */
/* if(this.value == "#/filtro"){
      window.location = "#/filtro"
    }
    if(this.value == "#/post"){
      window.location = "#/post"
    }
    if(this.value == "#/profile"){
      window.location = "#/profile"
    }
  });
} */
