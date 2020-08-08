import * as firebase from 'firebase';
import { auth } from './firebaseConfig';
import { revealErrorMessage, sendEmailMessage } from './firebaseErrors';
// import {setupUI} from '../main'


export const createNewUser = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      sendEmail ();
        })
    
    .catch((error) => {
      revealErrorMessage(error.code);
      throw error;
    });
};

export const loginUser = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {})
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

const sendEmail = () => {
  let user = firebase.auth().currentUser;
user.sendEmailVerification().then(function () {
sendEmailMessage();
// Email sent.
}).catch(function (error) {
// An error happened.
})
}
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
//                   
//         }
// else {
//       ;
// }
// }
//   });



export const exit = () => {
  auth
    .signOut()
    .then( function () {
      console.log("logOut")
    })
    .catch( function (error){
      // An error happened.
    });
};



auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    // setupUI(user);
   
  } else {
    console.log('user logged out');
    // setupUI();
  }
   
})
