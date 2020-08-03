import view from './login.html';
import { regularExpressions, fields, validateInputsValue } from '../4.sign-up/funciones-signup';
import { loginUser } from '../Firebase/firebaseAuth';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const form = divElement.querySelector('#form');
  const inputs = divElement.querySelectorAll('#form input');
  // console.log(inputs)

  const messageError = {
    email: 'El correo es inválido',
    password: 'La contraseña tiene que ser de 8 dígitos.',
  };

  /* ------ VALIDACIÓN INPUTS FORMULARIO -------*/
  const validateForm = (e) => {
    switch (e.target.name) { // Valor a comproba * Con target accedemos a la propiedad  name de cada input ()
      case 'email':
        validateInputs(regularExpressions.email, e.target, 'email');
        break;
      case 'password':
        validateInputs(regularExpressions.password, e.target, 'password');
        break;
    }
  };

  let validateInputs = (regularExpressions, input, field) => {
    console.log(validateInputsValue(regularExpressions, input, field));
    if (validateInputsValue(regularExpressions, input, field)) {
      divElement.querySelector(`#${field}`).classList.remove('form-group-wrong');
      divElement.querySelector(`#group-${field} .form-input-error`).textContent = '';
    } else {
      divElement.querySelector(`#${field}`).classList.add('form-group-wrong');
      divElement.querySelector(`#group-${field} .form-input-error`).textContent = messageError[field];
    }
  };

  // Por cada input del formulario ejecuta un eventlistener
  inputs.forEach((input) => {
    input.addEventListener('blur', validateForm);
  });

  /* ------ OCULTAR/MOSTRAR CONTRASEÑA -------*/
  const togglePassword1 = () => {
    const pwd = divElement.querySelector('#password-input');
    const eyeOpen = divElement.querySelector('#eye-open');
    const eyeClose = divElement.querySelector('#eye-close');

    if (pwd.type === 'password') {
      pwd.type = 'text';
      eyeOpen.style.display = 'block';
      eyeClose.style.display = 'none';
    } else {
      pwd.type = 'password';
      eyeOpen.style.display = 'none';
      eyeClose.style.display = 'block';
    }
  };

  const eyeIcons = divElement.querySelector('.eye');
  eyeIcons.addEventListener('click', togglePassword1);

  /* ------ SIGNUP (REGISTRARSE) -------*/
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Para que no se reinicie el form

    const email = divElement.querySelector('#email').value;
    const password = divElement.querySelector('#password-input').value;

    if (fields.email && fields.password) {
      loginUser(email, password);
      window.location.hash = '#/login';
      form.reset();
    } else {
      alert('no estas registrado');
      // divElement.querySelector('#form-message').classList.add('form-message-active');
    }
  });

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
