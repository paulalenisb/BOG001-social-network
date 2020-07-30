import { pages } from '../views.js'

let content = document.getElementById('root');

const router = (route) => {
    content.innerHTML = '';
    switch (route) {
        case "#/":
            return content.appendChild(pages.welcome());
        case "#/start":
            return content.appendChild(pages.start());
        case "#/login":
            return content.appendChild(pages.login());
        case "#/sign-up":
            return content.appendChild(pages.signup());
        default:
            return content.appendChild(pages.notFound());
    }
};

export { router };