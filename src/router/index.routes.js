import { pages } from '../views.js';

const content = document.getElementById('root');

const router = (route) => {
  content.innerHTML = '';
  let nodeDomPages = '';
  switch (route) {
    case '#/welcome':
      nodeDomPages = pages.welcome();
      break;
    case '#/login':
      nodeDomPages = pages.login();
      break;
    case '#/sign-up':
      nodeDomPages = pages.signup();
      break;
    case '#/post':
      nodeDomPages = pages.post();
      break;
    default:
      nodeDomPages = pages.notFound();
  }
  return content.appendChild(nodeDomPages);
};

export { router };
