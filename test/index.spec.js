// importamos la funcion que vamos a testear
// import mockFirebase from '../_mocks_/firebase-mock.js';
import MockFirebase from 'mock-cloud-firestore';

import { savePost, onGetPosts} from '../src/firebase-functions/firebaseStore.js';

// global.firebase = mockFirebase();

const fixtureData = {
  _collection_: {
    review: {
      _doc_: {
        abc123: {
          title: 'Deli la pasta',
        },
        abc124: {
          title: 'Me encanto el helado',
        },
      },
    },
  },

};
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

// describe('savePost', () => {
//   it('Deberia agregar un post', () => savePost('Deli la pizza').then((data) => {
//     console.log(data);
//     expect(data).toBe('El post fue agregado');
//   }));
// });

describe('savePost', () => {
  it('Deberia agregar un post', async() => {
    await savePost('1234', 'Paula', '4321', 'Pizza', 'Deli la pizza', 'Fast Foof', '1', '3', 'Mi Casa', 'pizza.png', 1);
    const getReviews = await onGetPosts()
    console.log(getReviews);
    // ((data) => {
    //   const callback = (review) => {
    //     const result = review.find((elemento) => elemento.title === 'Deli la pizza');
    //     expect(result.title).toBe('Deli la pizza');
    //     done();
    //   };
    //   onGetPosts(callback);
    // })
  });
});

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });
