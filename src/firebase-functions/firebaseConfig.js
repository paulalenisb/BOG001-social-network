import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCODu2k1AxjuhiU9zdTtFk5_gfFEGGfvgk',
  authDomain: 'leratto-sn3.firebaseapp.com',
  databaseURL: 'https://leratto-sn3.firebaseio.com',
  projectId: 'leratto-sn3',
  storageBucket: 'leratto-sn3.appspot.com',
  messagingSenderId: '954740746531',
  appId: '1:954740746531:web:0bf18fbcea8c8842980496',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
