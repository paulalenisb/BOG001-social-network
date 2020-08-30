// import Login from './dom-login';

// jest.mock('./login.html', () => {
//   const fs = require('fs');
//   const path = require('path');
//   return fs.readFileSync(path.resolve('./src/2.login/login.html'), 'utf8');
// });

// describe('Login', () => {
//   it('...', () => {
//     const el = Login();
//     expect(el.querySelector('form')).toBeTruthy();
//     const emailInput = el.querySelector('#email');
//     expect(emailInput.placeholder).toBe('correo@correo.com');

//     expect(emailInput.classList.contains('form-group-wrong')).toBe(false);

//     emailInput.dispatchEvent(new Event('blur'));

//     expect(emailInput.classList.contains('form-group-wrong')).toBe(true);
//   });
// });
