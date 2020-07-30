import * as firebase from 'firebase';
import {auth} from "./firebaseConfig"

export const createNewUser = (email, password) => {
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => { }) 
}

export const createGoogleAccount = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then(result => {
            console.log('¡Se creó un nuevo usuario con Google!');
            form.reset();
            })
        .catch(err => {
            console.log(err);
            })

}

