import * as firebase from "firebase";
import { auth } from "./firebaseConfig";
import { revealErrorMessage, sendEmailMessage } from "./firebaseErrors";
import { setupUI } from "../views";

export const createNewUser = (email, password, names) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      result.user.updateProfile({
        displayName: names,
      });
      sendEmail();
      signOut();
    })

    .catch((error) => {
      revealErrorMessage(error.code);
      throw error;
    });
};

export const loginUser = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      if (result.user.emailVerified) {
        //  const userName = divElement.querySelector('#user-name');
        //  username.innerHTML=`${result.user.displayName}`
        console.log(user.displayName);
        window.location.hash = "#/post";
      } else {
        console.log("por favor realice la verificacion");
        exit();
      }
    })
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
      window.location.hash = "#/post";
    })
    .catch((err) => {});
};

const sendEmail = () => {
  const configuration = {
    url: "http://localhost:8080",
  };
  let user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      sendEmailMessage();
      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
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
    .then(function () {
      console.log("logOut");
    })
    .catch(function (error) {
      // An error happened.
    });
};

auth.onAuthStateChanged((user) => {
  console.log(user);
  if (user) {
    // console.log('user logged in: ', user);
    setupUI(user);
  } else {
    // console.log('user logged out');
    setupUI();
  }
});

export const authWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
    auth
    .signInWithPopup(provider)
    .then((result) => {
      window.location.hash = "#/post";
    })
    .catch((error) => {
      console.error(error);
    });
};

// auth.onAuthStateChanged((user) => {
//   if (user) {
//     console.log("signin");
//     fs.collection("posts")
//       .get()
//       .then((snapshot) => {
//         setupPosts(snapshot.docs);
//         loginCheck(user);
//       });
//   } else {
//     console.log("signout");
//     setupPosts([]);
//     loginCheck(user);
//   }
// });

