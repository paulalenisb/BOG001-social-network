import view from "./signup.html";
import "./estilos-signup.css";
import "../Firebase/firebaseConfig";
import {
  regularExpressions,
  fields,
  validateInputsValue,
} from "./funciones-signup";
import * as firebase from "firebase";
import { createNewUser, createGoogleAccount } from "../Firebase/firebaseAuth";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  let form = divElement.querySelector("#form");
  // querySelectorAll nos devuelve un array con cada uno de los inputs
  let inputs = divElement.querySelectorAll("#form input");
  console.log(inputs);

  let messageError = {
    name: "El nombre debe contener solo letras.",
    email: "El correo es inválido",
    password: "La contraseña tiene que ser de 8 dígitos.",
  };

  // Función para  comprobar los fields cuando presionemos la tecla o cuando se haga click por fuera
  // con target accedemos a la propiedad  name de cada input ()
  let validateForm = (e) => {
    switch (
      e.target.name // Valor a comprobar
    ) {
      case "username":
        validateInputs(regularExpressions.name, e.target, "name");
        break;
      case "email":
        validateInputs(regularExpressions.email, e.target, "email");
        break;
      case "password":
        validateInputs(regularExpressions.password, e.target, "password");
        break;
    }
  };

  let validateInputs = (regularExpressions, input, field) => {
    console.log(validateInputsValue(regularExpressions, input, field));
    if (validateInputsValue(regularExpressions, input, field)) {
      divElement
        .querySelector(`#${field}`)
        .classList.remove("form-group-wrong");
      divElement.querySelector(
        `#group-${field} .form-input-error`
      ).textContent = "";
    } else {
      divElement.querySelector(`#${field}`).classList.add("form-group-wrong");
      divElement.querySelector(
        `#group-${field} .form-input-error`
      ).textContent = messageError[field];
    }
  };
  // Comprobamos con las expresiones regulares si los valores digitados por el usuario son verdaderos o falsos

  //Por cada input del formulario me  ejecuta un eventlistener
  inputs.forEach((input) => {
    input.addEventListener("blur", validateForm);
  });

  let togglePassword1 = () => {
    let pwd = divElement.querySelector("#password-input");
    let eyeOpen = divElement.querySelector("#eye-open");
    let eyeClose = divElement.querySelector("#eye-close");

    if (pwd.type === "password") {
      pwd.type = "text";
      eyeOpen.style.display = "block";
      eyeClose.style.display = "none";
    } else {
      pwd.type = "password";
      eyeOpen.style.display = "none";
      eyeClose.style.display = "block";
    }
  };

  let eyeIcons = divElement.querySelector(".eye");

  eyeIcons.addEventListener("click", togglePassword1);

  /*------ SIGNUP (REGISTRARSE) -------*/
  // const auth = firebase.auth();

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Para que no se reinicie el form

    const email = divElement.querySelector("#email").value;
    const password = divElement.querySelector("#password-input").value;

    if (fields.name && fields.email && fields.password) {
      form.reset();

      divElement
        .querySelector("#form-message-successful")
        .classList.add("form-message-successful-active");
      setTimeout(() => {
        divElement
          .querySelector("#form-message-successful")
          .classList.remove("form-message-successful-active");
      }, 5000);

      createNewUser(email, password);
      window.location.hash = "#/welcome";
    } else {
      divElement
        .querySelector("#form-message")
        .classList.add("form-message-active");
    }
  });

  /*------ SIGNUP (REGISTRARSE) GOOGLE -------*/
  const googleButtonSignUp = divElement.querySelector("#sign-in-google");

  googleButtonSignUp.addEventListener("click", (e) => {
    createGoogleAccount();
  });

  return divElement;
};
