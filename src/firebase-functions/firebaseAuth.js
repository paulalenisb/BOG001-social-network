import * as firebase from 'firebase';
import { auth } from './firebaseConfig';
import { revealErrorMessage, sendEmailMessage } from './firebaseErrors';
import { setupUI } from '../views';

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
        window.location.hash = '#/home';
      } else {
        exit();
      }
    })
    .catch((error) => {
      revealErrorMessage(error.code);
      throw error;
    });
};

export const authGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      window.location.hash = '#/home';
    })
    .catch((err) => {});
};

export const authWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      window.location.hash = '#/home';
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendEmail = () => {
  const config = {
    url: 'http://localhost:8080/#/welcome',
  };
  const user = firebase.auth().currentUser;
  user
    .sendEmailVerification(config)
    .then(() => {
      sendEmailMessage();
      // Email sent.
    })
    .catch((error) => {
      // An error happened.
    });
};


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const photoURL = user.photoURL;
    const isAnonymous = user.isAnonymous;
    const uid = user.uid;

    console.log(displayName, email);
  }
});

export const exit = () => {
  auth
    .signOut()
    .then(() => {
      console.log('logOut');
    })
    .catch((error) => {
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
