// import * as firebase from 'firebase';



export const userSave = user => firebase.firestore().collection('users').doc(user.id).set(user);

export const createUserProfile = async () => {
  const userLocalStorage = localStorage.getItem('userSession');
  const convertObjJson = JSON.parse(userLocalStorage);
  const userId = convertObjJson.user.uid;

  return firebase.firestore().collection('users').where('id', '==', userId).get();
};

export const updateUserInfo = async user => firebase.firestore().collection('users').doc(user.id).update(user);

// export const updateUserInfo = async (user) => db.collection('users').doc(user.id).update(user);

// Creamos el post en firebase con su colecciones y el objeto del doc
export const savePost = (uid, name, userPhoto, title, description, typeOfFood, price, quality, location, foodPhoto, likes, users) => firebase.firestore().collection('review').doc().set({

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
  //date: firebase.firestore.Timestamp.now(),
  likes,
  users,
});

// De mi colección de reviews traeme todo

// export const getPosts = () => db.collection('review').get();

/* Cada vez que mis posts se actualicen, agreguen o borren, actualizar 
en tiempo real el timeline con el método onSnapshot() */
export const onGetPosts = (callback) => firebase.firestore().collection('review').orderBy('date', 'desc').onSnapshot(callback);

// Para eliminar un post necesito su id
export const deletePost = (id) => firebase.firestore().collection('review').doc(id).delete();

// Editar el post con su respectivo id
// Obtener el post segun el id(documento segun id que se le asigna)
export const getEditPost = (id) => firebase.firestore().collection('review').doc(id).get();

// Actualizar la tarea, con los datos del id que me esta pasando la const
export const updatePost = (id, updatePostFood) => firebase.firestore().collection('review').doc(id).update(updatePostFood);

export const uploadImgFood = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgsPosts/${uid}/${file.name}`);
  const task = refStorage.put(file);

  task.on(
    'state_changed',
    (snapshot) => {
      const porcentaje = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
