import notFound from './0.404/dom-404'
import welcome from './1.welcome/dom-welcome'
import start from './2.start/dom-start'
import login from './3.login/dom-login'
import signup from './4.sign-up/dom-signup'



const pages = {
   welcome: welcome,
   start: start,
   login: login,
   signup: signup,
   notFound:notFound,

}

export {pages};