const errorAuth = {
  'auth/email-already-in-use': 'El correo ya existe, inicia sesión',
  'auth/user-not-found': 'El usuario no existe, regístrate',
  // 'auth/email-not-verified': 'Valida tu correo para poder ingresar',
  'auth/wrong-password': 'Tu contraseña es incorrecta',
};

const errorMessageAuth = (code) => {
  if (errorAuth[code]) {git a
    return errorAuth[code];
  }
  return 'Surgió un error, intenta nuevamente';
};

export const revealErrorMessage = (code) => {
  const errorMessage = errorMessageAuth(code);
  const errorContainer = document.querySelector('#alerts');
  if (errorContainer) {
    errorContainer.innerText = errorMessage;
    errorContainer.classList.add('error-message-auth');
  }
};
