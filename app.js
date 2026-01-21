const appContainer = document.getElementById('app');
import {initLogin} from "./public/pages/login.js"
import {initSignup} from "../public/pages/signup.js" 
import { initHome } from "./public/pages/home.js";

/*
* @param {string} page 
*/
export async function loadPage(page){
    console.log("on the loadPage");
    try{
        const response = await fetch(`./views/${page}.html`);
        console.log(response);
        if(!response.ok) throw new Error("Page not found");
        const html =  await response.text();
        appContainer.innerHTML = html ;

        if (page === 'login') initLogin(loadPage);
        if (page === 'signup') initSignup(loadPage);
        if (page === 'home') initHome(loadPage);
        
    }catch(error){
        console.log(error);
    }
}

loadPage('login');




