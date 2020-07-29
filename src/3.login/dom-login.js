
import view from './login.html';
import firebase from './firebase-login'
import functions from './funciones-login'
import './estilos-login.css'


export default () => {
   
    const divElement =document.createElement('div');
    divElement.innerHTML= view;

    const btnClick = divElement.querySelector('#btnClick');
    btnClick.addEventListener('click', ()=>{
        alert('click')
    })
    
    return divElement;
};

console.log(firebase,functions)