import * as firebase from 'firebase';
import { auth } from './firebaseConfig';
import { revealErrorMessage } from './firebaseErrors';

export const createNewUser = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    })
    .catch((error) => {
      revealErrorMessage(error.code);
      throw error;
    });
};

export const loginUser = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => { })
    .catch((error) => {
      revealErrorMessage(error.code);
      throw error;
    });
};

export const createGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      form.reset();
    })
    .catch((err) => {
    });
};

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var photoURL = user.photoURL;
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         // var textoVerificado = '';
//         if (emailVerified === false) {
//             alert( 'Email no verificado');
//         }
// else {
//            alert( 'Email verificado');
// }
// }
//   });

//   function sendEmail () {
//     var user = firebase.auth().currentUser;
// user.sendEmailVerification().then(function () {
// // Email sent.
// }).catch(function (error) {
// // An error happened.
// })
// }
