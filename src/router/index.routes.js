import {pages} from '../controllers/index.js'

let content = document.getElementById('root');


const router = async (route) => {
    content.innerHTML ='';
    switch(route) {
        case "#/home": 
        return content.appendChild(pages.home());
        case "#/post": 
        return content.appendChild(await pages.post());
        case "#/products": 
        return console.log('products!!!')
        default: 
        return content.appendChild(pages.notFound())
         
        
    }
};



export { router };