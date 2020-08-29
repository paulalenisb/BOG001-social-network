import { router } from './router/index.routes.js';
import './main.scss';

/*------ Router views -------*/
router(window.location.hash);
window.addEventListener('hashchange', () => {
  router(window.location.hash)
});

window.addEventListener('hashchange', () => {
  /*------ Button active mobile -------*/
  const iconHomeMob = document.querySelector('#icon-home-mob');
  const iconFilterMob = document.querySelector('#icon-filter-mob');
  const iconPostMob = document.querySelector('#icon-post-mob');
  const iconProfileMob = document.querySelector('#icon-user-mob');
  
  if(window.location.hash == '#/home'){
    iconHomeMob.classList.add('active')
  } 
  if(window.location.hash == '#/filtro'){
    iconFilterMob.classList.add('active')
    iconHomeMob.classList.remove('active')
  } 
  if(window.location.hash == '#/post'){
    iconPostMob.classList.add('active')
    iconHomeMob.classList.remove('active')
  } 
  if(window.location.hash == '#/profile'){
    iconProfileMob.classList.add('active')
    iconHomeMob.classList.remove('active')
  } 

  /*------ Button active desktop -------*/
  const iconHome = document.querySelector('#icon-home-desk');
  const iconFilter = document.querySelector('#icon-filter-desk');
  const iconPost = document.querySelector('#icon-post-desk');
  const iconProfile = document.querySelector('#icon-user-desk');
  

  if(window.location.hash == '#/home'){
    iconHome.classList.add('active')
  } 
  if(window.location.hash == '#/filtro'){
    iconFilter.classList.add('active')
    iconHome.classList.remove('active')
  } 
  if(window.location.hash == '#/post'){
    iconPost.classList.add('active')
    iconHome.classList.remove('active')
  } 
  if(window.location.hash == '#/profile'){
    iconProfile.classList.add('active')
    iconHome.classList.remove('active')
  } 
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
console.log(btns);

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    console.log(this.value); */

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
    } */


/*   });
} */

