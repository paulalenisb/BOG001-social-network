// importamos la funcion que vamos a testear
// import mockFirebase from '../_mocks_/firebase-mock.js';
// global.firebase = mockFirebase();
import MockFirebase from 'mock-cloud-firestore';
const fixtureData = {
  _collection_: {
    

  }

}
global.firebase = new MockFirebase(fixtureData);

import { savePost } from '../src/firebase-functions/firebaseStore.js';

describe('savePost', () => {
  it('Deberia poder agregar un post ', () => savePost('Deli la pizza').then((data) => {
    expect(data).toBe('El post fue agregado');
  }));
});

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });
