
import view from './login.html';

import{regularExpressions, fields,validateInputsValue} from '../4.sign-up/funciones-signup'
import {loginUser} from '../Firebase/firebaseAuth'


export default () => {
   
    const divElement =document.createElement('div');
    divElement.innerHTML= view;
    let form = divElement.querySelector('#form');
    // querySelectorAll nos devuelve un array con cada uno de los inputs
    let inputs = divElement.querySelectorAll('#form input');
    console.log(inputs)


   

    let messageError = {
        email: 'El correo es inválido',
        password: 'La contraseña tiene que ser de 8 dígitos.',
    }

    // Función para  comprobar los fields cuando presionemos la tecla o cuando se haga click por fuera 
    // con target accedemos a la propiedad  name de cada input ()
    let validateForm = (e) => {
        switch (e.target.name) {  // Valor a comprobar
            case "email":
                validateInputs(regularExpressions.email, e.target, 'email');
                break;
            case "password":
                validateInputs(regularExpressions.password, e.target, 'password');
                break;
        }
    }



    let validateInputs = (regularExpressions, input, field) => {
        console.log(validateInputsValue(regularExpressions, input, field))
    if (validateInputsValue(regularExpressions, input, field)) {
        divElement.querySelector(`#${field}`).classList.remove('form-group-wrong');
        divElement.querySelector(`#group-${field} .form-input-error`).textContent = "";
    }else {
        divElement.querySelector(`#${field}`).classList.add('form-group-wrong');
        divElement.querySelector(`#group-${field} .form-input-error`).textContent = messageError[field];
    }
    }
    // Comprobamos con las expresiones regulares si los valores digitados por el usuario son verdaderos o falsos
    

    //Por cada input del formulario me  ejecuta un eventlistener
    inputs.forEach((input) => {
        input.addEventListener('blur', validateForm)
    });

    let togglePassword1 = () => {

        let pwd = divElement.querySelector('#password-input')
        let eyeOpen = divElement.querySelector('#eye-open')
        let eyeClose = divElement.querySelector('#eye-close')

        if (pwd.type === 'password') {
            pwd.type = 'text';
            eyeOpen.style.display = 'block';
            eyeClose.style.display = 'none';
        }
        else {
            pwd.type = 'password';
            eyeOpen.style.display = "none"
            eyeClose.style.display = "block";
        }
    }

    let eyeIcons = divElement.querySelector('.eye')

    eyeIcons.addEventListener('click', togglePassword1)

    /*------ SIGNUP (REGISTRARSE) -------*/
    // const auth = firebase.auth();

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Para que no se reinicie el form

        const email = divElement.querySelector('#email').value;
        const password = divElement.querySelector('#password-input').value;

        if (fields.email && fields.password) {
            
            
            loginUser (email,password) 
            window.location.hash = "#/start"
            form.reset();

            //Redireccionar a otra vista
        } else {
            alert("no estas registrado")
            //divElement.querySelector('#form-message').classList.add('form-message-active');
        }
    })

    
    return divElement;
};





// function acceso() {
//     var emailA = document.getElementById('emailA').value;
//     var passA = document.getElementById('passwordA').value;
//     firebase.auth().signInWithEmailAndPassword(emailA, passA)
//         .catch(function (error) {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             alert(errorMessage);
// 		});
// 		firebase.auth().signInWithEmailAndPassword(emailA, passwordA).catch(function(error) {
// 			// Handle Errors here.
// 			var errorCode = error.code;
// 			var errorMessage = error.message;
// 			alert(errorMessage);
// 			// ...
// 		  });
// }

//   // Initialize Firebase



 
