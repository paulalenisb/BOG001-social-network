
import view from './signup.html';
// import firebase from './firebase-signup';
// import functions from './funciones-signup';
import './estilos-signup.css'
import {firebaseConfig} from '../firebaseConfig'
import * as firebase from 'firebase';




export default () => {
   
    const divElement = document.createElement('div');
    divElement.innerHTML= view;

    

let form = divElement.querySelector('#form');
// querySelectorAll nos devuelve un array con cada uno de los inputs
let inputs = divElement.querySelectorAll('#form input'); 
console.log(inputs)


let regularExpressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,12}$/, // 8 a 12 dígitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

let fields ={
    username: false,
    email: false,
    password: false,
 
}

let messageError ={
    name: 'El nombre debe contener solo letras.',
    email: 'El correo es invalido',
    password: 'La contraseña tiene que ser de 8 dígitos.',
    password2: 'Ambas contraseñas deben ser iguales',
}



// Función para  comprobar los fields cuando presionemos la tecla o cuando se haga click por fuera 
// con target accedemos a la propiedad  name de cada input ()
let validateForm = (e) => {
    switch(e.target.name){  // Valor a comprobar
    case "username" :
        validateField(regularExpressions.name, e.target, 'name')
    break;
    case "email":
		validateField(regularExpressions.email, e.target, 'email');
	break;
    case "password":
		validateField(regularExpressions.password, e.target, 'password');
	break;
	case "password2":
        
	break;
		
	
	}
}

 
// Comprobamos con las expresiones regulares si los valores digitados por el usuario son verdaderos o falsos
const validateField = (regularExpressions, input, field) => {
	if(regularExpressions.test(input.value)){
		divElement.querySelector(`#${field}`).classList.remove('form-group-wrong');
        divElement.querySelector(`#group-${field} .form-input-error`).textContent = "";
        fields[field] = true;
	} else {
		divElement.querySelector(`#${field}`).classList.add('form-group-wrong');
		divElement.querySelector(`#group-${field} .form-input-error`).textContent = messageError[field];
		fields[field] = false;
	}
}



//Por cada input del formulario me  ejecuta un eventlistener
inputs.forEach((input) => {
    input.addEventListener('blur', validateForm)
});


   
	

let togglePassword1 = () =>{
	
	let pwd= divElement.querySelector('#password-input')
	let eyeOpen= divElement.querySelector('#eye-open')
	let eyeClose= divElement.querySelector('#eye-close')
	

	if (pwd.type === 'password'){
		pwd.type = 'text';
		eyeOpen.style.display ='block';
		eyeClose.style.display ='none';
	}
	else{
		pwd.type = 'password';
		eyeOpen.style.display ="none"
		eyeClose.style.display ="block";

	}	 

}



let eyeIcons= divElement.querySelector('.eye')


eyeIcons.addEventListener('click', togglePassword1)



/*------ SIGNUP (REGISTRARSE) -------*/


const auth = firebase.auth();

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Para que no se reinicie el form

    const email = divElement.querySelector('#email').value;
    const password = divElement.querySelector('#password-input').value;

    if (fields.name && fields.email && fields.password && fields.password2) {
        form.reset();

        divElement.querySelector('#form-message-successful').classList.add('form-message-successful-active');
        setTimeout(() => {
            divElement.querySelector('#form-message-successful').classList.remove('form-message-successful-active');
        }, 5000);

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredential => { console.log('¡Se creó un nuevo usario!'); })
    } else {
        divElement.querySelector('#form-message').classList.add('form-message-active');
    }
})

/*------ SIGNUP (REGISTRARSE) GOOGLE -------*/
const googleButtonSignUp = divElement.querySelector('#sign-in-google');

googleButtonSignUp.addEventListener('click', (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('¡Se creó un nuevo usario con Google!');
            form.reset();
        })
        .catch(err => {
            console.log(err);
        })
})

    return divElement;

    };
