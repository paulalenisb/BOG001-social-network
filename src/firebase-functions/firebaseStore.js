import * as firebase from 'firebase';

export const db = firebase.firestore();

// Creamos el post en firebase con su colecciones y el objeto del doc
export const savePost = (title, description) => db.collection('review').doc().set({
  title,
  description,
  /* details: {
    typeFood: ['#FastFood', '#DeMar'],
    price: [1, 2, 3],
    starts: [1, 2, 3],
    ubication: ['Zonat', 'ZonaG']
    }, */
});

// De mi colección de reviews traeme todo
export const getPosts = () => db.collection('review').get();

// Cada vez que mis posts se actualicen, agreguen o borren, actualizar en tiempo real el timeline con el metodo onSnapshot()
export const onGetPosts = callback => db.collection('review').onSnapshot(callback);

// Para eliminar un post necesito su id
export const deletePost = id => db.collection('review').doc(id).delete();

// Editar el post con su respectivo id
export const getEditPost = id => db.collection('review').doc(id).get();

// Actualizar la tarea, con los datos del id que me esta pasando la const
export const updatePost = (id, updatePost) => db.collection('review').doc(id).update(updatePost);
