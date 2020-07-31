import view from './signup.html';
import './estilos-signup.css';
import '../Firebase/firebaseConfig';
import { regularExpressions, fields, validateInputsValue } from './funciones-signup';
import { createNewUser, createGoogleAccount } from '../Firebase/firebaseAuth';
// import * as firebase from 'firebase';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const form = divElement.querySelector('#form');
  const inputs = divElement.querySelectorAll('#form input');
  // console.log(inputs)

  const messageError = {
    name: 'El nombre debe contener solo letras.',
    email: 'El correo es inválido',
    password: 'La contraseña tiene que ser de 8 dígitos.',
  };

  /* ------ VALIDACIÓN INPUTS FORMULARIO -------*/
  const validateForm = (e) => {
    switch (e.target.name) { // Valor a comproba * Con target accedemos a la propiedad  name de cada input ()
      case 'username':
        validateInputs(regularExpressions.name, e.target, 'name');
        break;
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

    if (fields.name && fields.email && fields.password) {
      form.reset();

      divElement.querySelector('#form-message-successful').classList.add('form-message-successful-active');
      setTimeout(() => {
        divElement.querySelector('#form-message-successful').classList.remove('form-message-successful-active');
      }, 5000);

      createNewUser(email, password);
      window.location.hash = '#/welcome';
    } else {
      divElement.querySelector('#form-message').classList.add('form-message-active');
    }
  });

  /* ------ SIGNUP (REGISTRARSE) GOOGLE -------*/
  const googleButtonSignUp = divElement.querySelector('#sign-in-google');

  googleButtonSignUp.addEventListener('click', (e) => {
    createGoogleAccount();
  });

  return divElement;
};
