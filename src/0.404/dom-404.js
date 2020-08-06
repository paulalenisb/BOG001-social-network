import view from './404.html';
import '../firebase/firebaseConfig';
import './estilos-404.css';
import { dataBase } from '../Firebase/firebaseStore'

export default () => {

  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  // const btnClick = divElement.querySelector('#btnClick');
  // btnClick.addEventListener('click', () => {
  //   alert('click');
  // });

  const savePost = (postTitle, postDescription) =>
  dataBase.collection("recomendaciones").doc().set({
    postTitle,
    postDescription,
  });

  const postForm = divElement.querySelector('#post-form');

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    //Capturar el nombre del restaurante
    const postTitle = postForm['post-title'].value;
    const postDescription = postForm['post-description'].value;

    await savePost(postTitle,postDescription);
    postForm.reset();

  })

  return divElement;
};

//min 25 https://www.youtube.com/watch?v=itNsRn1kjLU&t=1s
