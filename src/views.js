import notFound from './0.404/dom-404';
import welcome from './1.welcome/dom-welcome';
import login from './2.login/dom-login';
import signup from './3.sign-up/dom-signup';
import post from './5.post/dom-post';
import profile from './7. user-profile/dom-profile'

const pages = {
  welcome,
  login,
  signup,
  notFound,
  post,
  profile,
};

export { pages };

const loggedOutviews = document.querySelector('.log-in')

console.log(loggedOutviews)

// export const setupUI = (user) => {
//   if (user) {
//     signUpSection.style.display = "block";
//     logInSection.style.display = "block";
//     PostSection.style.display = "none";
//     ProfileSection.style.display = "none";
//   }else{
//     signUpSection.style.display = "none";
//     logInSection.style.display = "none";
//     PostSection.style.display = "block";
//     ProfileSection.style.display = "block";
//   }

// };