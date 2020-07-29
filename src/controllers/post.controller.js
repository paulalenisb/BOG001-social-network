import view from '../views/post.html';

const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json();
};

export default async () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const postsElement = divElement.querySelector("#posts");
  const totalPosts = divElement.querySelector('#total');

  const posts = await getPosts();

  posts.forEach((post) => {
    postsElement.innerHTML += `
      <li>
      <h5>${post.title}</h5>
      <p>
      ${post.body}
      </p>
      </li>
    `;
  });

  totalPosts.innerHTML += posts.length;

  return divElement;
};




// export default () => {
//     const divElement = document.createElement('div')
//     divElement.innerHTMl = view;
//       fetch
//     return divElement;
// }