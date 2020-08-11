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
      exit();
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
        window.location.hash = "#/post";
      } else {
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
  const config = {
    url: "http://localhost:8080/#/welcome",
  };
  let user = firebase.auth().currentUser;
  user
    .sendEmailVerification(config)
    .then(function () {
      sendEmailMessage();
      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
    });
};


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        
        console.log(displayName,email)
}
  });

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
    setupUI(user);
  } else {
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

