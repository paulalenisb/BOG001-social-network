import * as firebase from 'firebase';
import { auth } from './firebaseConfig';

export const createNewUser = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == 'auth/email-already-in-use') {
        alert('El correo ya esta registrado')
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
};

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // [START_EXCLUDE]
//   if (errorCode == 'The email address is already in use by another account.') {
//     alert('The password is too weak.');
//   } else {
//     alert(errorMessage);
//   }
//   console.log(error);
//   // [END_EXCLUDE]
// });






export const loginUser = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => { })
    .catch((error) => {
      // let errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

export const createGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log('¡Se creó un nuevo usuario con Google!');
      form.reset();
    })
    .catch((err) => {
      console.log(err);
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
// 	   else {
//            alert( 'Email verificado');
// 		}
// 	}
//   });


//   function sendEmail () {
//     var user = firebase.auth().currentUser;
// user.sendEmailVerification().then(function () {
// // Email sent.
// }).catch(function (error) {
// // An error happened.
// })

// }
