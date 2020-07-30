import { pages } from '../views.js'

let content = document.getElementById('root');

const router = (route) => {
    content.innerHTML = '';
    let nodeDomPages = '';
    switch (route) {
        case "#/welcome":
            nodeDomPages = pages.welcome()
        break;    
        case "#/start":
            nodeDomPages= pages.start();
        break;
        case "#/login":
            nodeDomPages= pages.login();
        break;    
        case "#/sign-up":
            nodeDomPages = pages.signup();
        break; 
        default:
            nodeDomPages = pages.notFound();
    }
    return content.appendChild(nodeDomPages)
};

export { router };