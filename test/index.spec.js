import MockFirebase from 'mock-cloud-firestore';

import { savePost, onGetPosts} from '../src/firebase-functions/firebaseStore.js';

// global.firebase = mockFirebase();

const fixtureData = {
  _collection_: {
    review: {
      _doc_: {
        abc123: {
          uid: '136048',
          name: 'Ana Rátiva', 
          userPhoto: '268493',
          title: 'Spoletto', 
          description: 'Deli la pasta', 
          typeOfFood: 'Italiana', 
          price: '2', 
          quality: '3', 
          location: 'LaCandelaria',
          foodPhoto: 'pizza.png', 
          likes: 2
        },
        abc124: {
          uid: '78835',
          name: 'Tatiana G', 
          userPhoto: '346032',
          title: 'Sushi Now', 
          description: 'Deli el sushi', 
          typeOfFood: 'DelMar', 
          price: '3', 
          quality: '2', 
          location: 'Usaquén',
          foodPhoto: 'Sushito.png', 
          likes: 5
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
  it('Deberia agregar un post', async(done) => {
    await savePost('1234', 'Paula', '4321', 'Pizza Now', 'Deli la pizza', 'Fast Foof', '1', '3', 'Mi Casa', 'pizza.png', 1);
    const callback = (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = doc.data()
        // console.log(post);
        let postTitle = post.title;
        // console.log(post.title);
        const result = postTitle.includes('Pizza Now');

        expect(result).toBe(true);
        console.log(result);
        done()
    });
  };
  const getReviews = await onGetPosts(callback)
  getReviews;
});
})



// describe('savePost', () => {
//   it('Deberia agregar un post', async(done) => {
//     await savePost('1234', 'Paula', '4321', 'Pizza Now', 'Deli la pizza', 'Fast Foof', '1', '3', 'Mi Casa', 'pizza.png', 1);
//     const callback = () => {
//       // querySnapshot.forEach((doc) => {
//         // const post = doc.data()
//         // console.log(post);
//         // let postTitle = post.title;
//         // console.log(post.title);
//         const result = review.find((elemento) => {
//           return elemento.title === 'Pizza Now';
//         });
//         console.log(review);

//         expect(result.title).toBe('Pizza Now');
//         // console.log(result);
//         done()
//       // })
//     }
//     const getReviews = await onGetPosts(callback)

//       // const callback = (review) => {
        
//         // done();
//       // };
//       getReviews;
  
//   });
// });