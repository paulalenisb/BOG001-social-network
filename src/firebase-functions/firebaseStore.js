// import * as firebase from 'firebase';

// export const db = firebase.firestore();

export const userSave = (user) => firebase.firestore().collection('users').doc(user.id).set(user);

export const createUserProfile = async () => {
  const userLocalStorage = localStorage.getItem('userSession');
  const convertObjJson = JSON.parse(userLocalStorage);
  const userId = convertObjJson.user.uid;

  return firebase.firestore.collection('users').where('id', '==', userId).get();
};

export const updateUserInfo = async (user) => firebase.firestore().collection('users').doc(user.id).update(user);

// Creamos el post en firebase con su colecciones y el objeto del doc
export const savePost = (uid, name, userPhoto, title, description, typeOfFood, price, quality, location, foodPhoto, likes) => firebase.firestore().collection('review').doc().set({
  uid,
  name,
  userPhoto,
  title,
  description,
  typeOfFood,
  price,
  quality,
  location,
  foodPhoto,
  // date: firebase.firestore().Timestamp.now(),
  likes,
});

// De mi colección de reviews traeme todo
export const getPosts = () => firebase.firestore().collection('review').get();

/* Cada vez que mis posts se actualicen, agreguen o borren, actualizar en tiempo real
el timeline con el método onSnapshot() */
export const onGetPosts = (callback) => firebase.firestore().collection('review').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  callback(data);
});

// Para eliminar un post necesito su id
export const deletePost = (id) => firebase.firestore().collection('review').doc(id).delete();

// Editar el post con su respectivo id
// Obtener el post segun el id(documento segun id que se le asigna)
export const getEditPost = (id) => firebase.firestore().collection('review').doc(id).get();

// Actualizar la tarea, con los datos del id que me esta pasando la const
export const updatePost = (id) => firebase.firestore().collection('review').doc(id).update(updatePost);

export const uploadImgFood = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgsPosts/${uid}/${file.name}`);
  const task = refStorage.put(file);

  task.on(
    'state_changed',
    (snapshot) => {
      const porcentaje = (snapshot.bytesTransferred / (snapshot.totalBytes * 100));
      localStorage.setItem('uploadImage', porcentaje);
    },
    (error) => {
      alert(error);
    },
    () => {
      task.snapshot.ref
        .getDownloadURL()
        .then((url) => {
          localStorage.setItem('imgNewPost', url);
        })
        .catch((error) => {
          alert(error);
        });
    },
  );
};

// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.(doc) => {
//       console.log(`${doc.id}`);
//   // });
// });

// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.data().id}`);
//   });
// });

// var docRef = db.collection("users").doc().id;

// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });

// db.collection("stories").where("author", "==", user.uid).get()

// var user = firebase.auth().currentUser;

// db.collectionGroup("posts").where("author", "==", user.uid).get()
