import { pages } from '../views.js';

const content = document.getElementById('root');

const router = (route) => {
  content.innerHTML = '';
  let nodeDomPages = '';
  switch (route) {
    case '':
      nodeDomPages = pages.welcome();
      break;
    case '#/login':
      nodeDomPages = pages.login();
      break;
    case '#/sign-up':
      nodeDomPages = pages.signup();
      break;
    case '#/home':
      nodeDomPages = pages.home();
      break;
    case '#/filtro':
      nodeDomPages = pages.filtro();
      break;
    case '#/post':
      nodeDomPages = pages.post();
      break;
    case '#/profile':
      nodeDomPages = pages.profile();
      break;
    default:
      nodeDomPages = pages.notFound();
  }
  return content.appendChild(nodeDomPages);
};

export { router };
